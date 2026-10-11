<?php
/**
 * ==============================================================================
 * API PENGELOLAAN FORMASI SDM KESEHATAN
 * Puskesmas Kepulauan Seribu Selatan
 * ==============================================================================
 * Endpoint: /api/sdm.php
 * Methods : GET, POST, PUT, DELETE
 */

require_once __DIR__ . '/db.php';

$pdo = getDb();
$method = $_SERVER['REQUEST_METHOD'];

// Handle GET: Ambil daftar seluruh formasi SDM
if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM sdm_formasi_kesehatan ORDER BY created_at ASC");
        $rows = $stmt->fetchAll();

        // Format mapping ke struktur SDMKItem Frontend
        $items = [];
        foreach ($rows as $row) {
            $pns = (int)$row['status_pns'];
            $pppk = (int)$row['status_pppk'];
            $pw = (int)$row['status_pppk_pw'];
            $non = (int)$row['status_non_pns'];
            $pjlp = (int)$row['status_pjlp'];
            $eksisting = (int)$row['jumlah_eksisting'];

            $items[] = [
                'id'                   => $row['id'],
                'jabatan'              => $row['jabatan'],
                'kategori'             => $row['kategori'],
                'kualifikasi'          => $row['kualifikasi'],
                'standarABK'           => (int)$row['standar_abk'],
                'jumlahEksisting'      => $eksisting,
                'statusPNS'            => $pns,
                'statusPPPK'           => $pppk,
                'statusPPPKPW'         => $pw,
                'statusNonPNS'         => $non,
                'statusPJLP'           => $pjlp,
                'statusNonASN'         => $non + $pjlp,
                'totalStatus'          => $pns + $pppk + $pw + $non + $pjlp,
                'isStatusValid'        => ($pns + $pppk + $pw + $non + $pjlp) === $eksisting,
                'lokasiPuskesmasInduk' => (int)$row['lokasi_induk'],
                'lokasiPustuLancang'   => (int)$row['lokasi_lancang'],
                'lokasiPustuPari'      => (int)$row['lokasi_pari'],
                'lokasiPustuUntungJawa' => (int)$row['lokasi_untung_jawa'],
                'keterangan'           => $row['keterangan'] ?? ''
            ];
        }

        jsonResponse('success', 'Data SDM berhasil diambil', $items);
    } catch (PDOException $e) {
        jsonResponse('error', 'Gagal memuat data SDM: ' . $e->getMessage(), null, 500);
    }
}

// Handle POST: Tambah Formasi Baru atau Batch Sync
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);

    if (!$payload) {
        jsonResponse('error', 'Payload JSON tidak valid', null, 400);
    }

    // Jika berupa Batch Sync (Array)
    if (isset($payload['batch']) && is_array($payload['data'])) {
        try {
            $pdo->beginTransaction();
            $pdo->exec("TRUNCATE TABLE sdm_formasi_kesehatan");

            $sql = "INSERT INTO sdm_formasi_kesehatan 
                    (id, jabatan, kategori, kualifikasi, standar_abk, jumlah_eksisting, 
                     status_pns, status_pppk, status_pppk_pw, status_non_pns, status_pjlp, 
                     lokasi_induk, lokasi_lancang, lokasi_pari, lokasi_untung_jawa, keterangan) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);

            foreach ($payload['data'] as $item) {
                $pns = (int)($item['statusPNS'] ?? 0);
                $pppk = (int)($item['statusPPPK'] ?? 0);
                $pw = (int)($item['statusPPPKPW'] ?? 0);
                $non = (int)($item['statusNonPNS'] ?? 0);
                $pjlp = (int)($item['statusPJLP'] ?? 0);
                $eksisting = (int)($item['jumlahEksisting'] ?? ($pns + $pppk + $pw + $non + $pjlp));

                $stmt->execute([
                    $item['id'] ?? ('sdmk-' . uniqid()),
                    $item['jabatan'] ?? '-',
                    $item['kategori'] ?? 'Tenaga Medis',
                    $item['kualifikasi'] ?? '-',
                    (int)($item['standarABK'] ?? 1),
                    $eksisting,
                    $pns,
                    $pppk,
                    $pw,
                    $non,
                    $pjlp,
                    (int)($item['lokasiPuskesmasInduk'] ?? 0),
                    (int)($item['lokasiPustuLancang'] ?? 0),
                    (int)($item['lokasiPustuPari'] ?? 0),
                    (int)($item['lokasiPustuUntungJawa'] ?? 0),
                    $item['keterangan'] ?? 'Terpenuhi 100%'
                ]);
            }
            $pdo->commit();
            jsonResponse('success', 'Batch sync data formasi SDM berhasil disimpan ke MySQL Hostinger');
        } catch (PDOException $e) {
            $pdo->rollBack();
            jsonResponse('error', 'Gagal batch sync: ' . $e->getMessage(), null, 500);
        }
    }

    // Single Insert
    $id = $payload['id'] ?? ('sdmk-' . uniqid());
    $jabatan = trim($payload['jabatan'] ?? '');
    $kategori = trim($payload['kategori'] ?? 'Tenaga Medis');
    $kualifikasi = trim($payload['kualifikasi'] ?? '');
    $standarABK = (int)($payload['standarABK'] ?? 1);
    $eksisting = (int)($payload['jumlahEksisting'] ?? 1);

    $pns = (int)($payload['statusPNS'] ?? 0);
    $pppk = (int)($payload['statusPPPK'] ?? 0);
    $pw = (int)($payload['statusPPPKPW'] ?? 0);
    $non = (int)($payload['statusNonPNS'] ?? 0);
    $pjlp = (int)($payload['statusPJLP'] ?? 0);

    // Validasi: Total status harus sama dengan Eksisting
    $totalStatus = $pns + $pppk + $pw + $non + $pjlp;
    if ($totalStatus !== $eksisting) {
        jsonResponse('error', "Validasi Gagal: Total rincian status ($totalStatus) tidak sama dengan Jumlah Eksisting ($eksisting)!", null, 422);
    }

    try {
        $sql = "INSERT INTO sdm_formasi_kesehatan 
                (id, jabatan, kategori, kualifikasi, standar_abk, jumlah_eksisting, 
                 status_pns, status_pppk, status_pppk_pw, status_non_pns, status_pjlp, 
                 lokasi_induk, lokasi_lancang, lokasi_pari, lokasi_untung_jawa, keterangan) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $id,
            $jabatan,
            $kategori,
            $kualifikasi,
            $standarABK,
            $eksisting,
            $pns,
            $pppk,
            $pw,
            $non,
            $pjlp,
            (int)($payload['lokasiPuskesmasInduk'] ?? 0),
            (int)($payload['lokasiPustuLancang'] ?? 0),
            (int)($payload['lokasiPustuPari'] ?? 0),
            (int)($payload['lokasiPustuUntungJawa'] ?? 0),
            $payload['keterangan'] ?? 'Terpenuhi 100%'
        ]);

        jsonResponse('success', 'Formasi SDM baru berhasil disimpan', ['id' => $id]);
    } catch (PDOException $e) {
        jsonResponse('error', 'Gagal menyimpan: ' . $e->getMessage(), null, 500);
    }
}

// Handle PUT: Update Formasi
if ($method === 'PUT') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);
    $id = $payload['id'] ?? ($_GET['id'] ?? null);

    if (!$id) {
        jsonResponse('error', 'ID formasi harus dicantumkan', null, 400);
    }

    $pns = (int)($payload['statusPNS'] ?? 0);
    $pppk = (int)($payload['statusPPPK'] ?? 0);
    $pw = (int)($payload['statusPPPKPW'] ?? 0);
    $non = (int)($payload['statusNonPNS'] ?? 0);
    $pjlp = (int)($payload['statusPJLP'] ?? 0);
    $eksisting = (int)($payload['jumlahEksisting'] ?? ($pns + $pppk + $pw + $non + $pjlp));

    $totalStatus = $pns + $pppk + $pw + $non + $pjlp;
    if ($totalStatus !== $eksisting) {
        jsonResponse('error', "Validasi Gagal: Total rincian status ($totalStatus) tidak sama dengan Jumlah Eksisting ($eksisting)!", null, 422);
    }

    try {
        $sql = "UPDATE sdm_formasi_kesehatan SET
                jabatan = ?, kategori = ?, kualifikasi = ?, standar_abk = ?, jumlah_eksisting = ?,
                status_pns = ?, status_pppk = ?, status_pppk_pw = ?, status_non_pns = ?, status_pjlp = ?,
                lokasi_induk = ?, lokasi_lancang = ?, lokasi_pari = ?, lokasi_untung_jawa = ?, keterangan = ?
                WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $payload['jabatan'] ?? '-',
            $payload['kategori'] ?? 'Tenaga Medis',
            $payload['kualifikasi'] ?? '-',
            (int)($payload['standarABK'] ?? 1),
            $eksisting,
            $pns,
            $pppk,
            $pw,
            $non,
            $pjlp,
            (int)($payload['lokasiPuskesmasInduk'] ?? 0),
            (int)($payload['lokasiPustuLancang'] ?? 0),
            (int)($payload['lokasiPustuPari'] ?? 0),
            (int)($payload['lokasiPustuUntungJawa'] ?? 0),
            $payload['keterangan'] ?? '',
            $id
        ]);

        jsonResponse('success', 'Data formasi SDM berhasil diperbarui');
    } catch (PDOException $e) {
        jsonResponse('error', 'Gagal memperbarui: ' . $e->getMessage(), null, 500);
    }
}

// Handle DELETE: Hapus Formasi
if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        $rawInput = file_get_contents('php://input');
        $payload = json_decode($rawInput, true);
        $id = $payload['id'] ?? null;
    }

    if (!$id) {
        jsonResponse('error', 'ID formasi harus disertakan', null, 400);
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM sdm_formasi_kesehatan WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse('success', 'Formasi SDM berhasil dihapus');
    } catch (PDOException $e) {
        jsonResponse('error', 'Gagal menghapus: ' . $e->getMessage(), null, 500);
    }
}
