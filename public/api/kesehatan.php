<?php
/**
 * ==============================================================================
 * API DATA KESEHATAN (MORBIDITAS & KUNJUNGAN FASKES)
 * Puskesmas Kepulauan Seribu Selatan
 * ==============================================================================
 * Endpoint: /api/kesehatan.php
 */

require_once __DIR__ . '/db.php';

$pdo = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$type = $_GET['type'] ?? 'all'; // 'morbiditas', 'kunjungan', or 'all'
$tahun = (int)($_GET['tahun'] ?? 2026);

if ($method === 'GET') {
    try {
        $result = [];

        if ($type === 'all' || $type === 'morbiditas') {
            $stmt = $pdo->prepare("SELECT * FROM kesehatan_10_penyakit WHERE tahun = ? ORDER BY peringkat ASC");
            $stmt->execute([$tahun]);
            $result['morbiditas'] = $stmt->fetchAll();
        }

        if ($type === 'all' || $type === 'kunjungan') {
            $stmt = $pdo->prepare("SELECT * FROM kesehatan_kunjungan_faskes WHERE tahun = ? ORDER BY bulan_index ASC");
            $stmt->execute([$tahun]);
            $result['kunjungan'] = $stmt->fetchAll();
        }

        jsonResponse('success', 'Data kesehatan berhasil dimuat', $result);
    } catch (PDOException $e) {
        jsonResponse('error', 'Gagal memuat data kesehatan: ' . $e->getMessage(), null, 500);
    }
}

if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);

    if (!$payload) {
        jsonResponse('error', 'Payload JSON tidak valid', null, 400);
    }

    try {
        $pdo->beginTransaction();

        // 1. Simpan Morbiditas jika ada
        if (isset($payload['morbiditas']) && is_array($payload['morbiditas'])) {
            $stmtDelete = $pdo->prepare("DELETE FROM kesehatan_10_penyakit WHERE tahun = ?");
            $stmtDelete->execute([$tahun]);

            $sqlM = "INSERT INTO kesehatan_10_penyakit 
                    (id, tahun, peringkat, kode_icd10, nama_penyakit, kategori, jumlah_kasus, kasus_pria, kasus_wanita, persentase, tren)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmtM = $pdo->prepare($sqlM);

            foreach ($payload['morbiditas'] as $idx => $m) {
                $stmtM->execute([
                    $m['id'] ?? ('pny-' . $tahun . '-' . ($idx + 1)),
                    $tahun,
                    (int)($m['rank'] ?? ($idx + 1)),
                    $m['code'] ?? $m['kode_icd10'] ?? '-',
                    $m['name'] ?? $m['nama_penyakit'] ?? '-',
                    $m['category'] ?? $m['kategori'] ?? 'Umum',
                    (int)($m['cases'] ?? $m['jumlah_kasus'] ?? 0),
                    (int)($m['maleCases'] ?? $m['kasus_pria'] ?? 0),
                    (int)($m['femaleCases'] ?? $m['kasus_wanita'] ?? 0),
                    (float)($m['percentage'] ?? $m['persentase'] ?? 0.0),
                    $m['trend'] ?? $m['tren'] ?? 'stable'
                ]);
            }
        }

        // 2. Simpan Kunjungan jika ada
        if (isset($payload['kunjungan']) && is_array($payload['kunjungan'])) {
            $stmtDelK = $pdo->prepare("DELETE FROM kesehatan_kunjungan_faskes WHERE tahun = ?");
            $stmtDelK->execute([$tahun]);

            $sqlK = "INSERT INTO kesehatan_kunjungan_faskes
                    (id, tahun, bulan, bulan_index, puskesmas_induk, pustu_pari, pustu_lancang, pustu_untung_jawa, poskes_payung, total_kunjungan, peserta_bpjs, non_bpjs, rujukan_rsud)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmtK = $pdo->prepare($sqlK);

            foreach ($payload['kunjungan'] as $vIdx => $k) {
                $induk = (int)($k['puskesmasKecamatan'] ?? $k['puskesmas_induk'] ?? 0);
                $pari = (int)($k['pustuPari'] ?? $k['pustu_pari'] ?? 0);
                $lancang = (int)($k['pustuLancang'] ?? $k['pustu_lancang'] ?? 0);
                $uj = (int)($k['pustuUntungJawa'] ?? $k['pustu_untung_jawa'] ?? 0);
                $payung = (int)($k['poskesPayung'] ?? $k['poskes_payung'] ?? 0);
                $total = (int)($k['total'] ?? $k['total_kunjungan'] ?? ($induk + $pari + $lancang + $uj + $payung));

                $stmtK->execute([
                    $k['id'] ?? ('kj-' . $tahun . '-' . sprintf('%02d', $vIdx + 1)),
                    $tahun,
                    $k['month'] ?? $k['bulan'] ?? '-',
                    (int)($k['monthIndex'] ?? $k['bulan_index'] ?? ($vIdx + 1)),
                    $induk,
                    $pari,
                    $lancang,
                    $uj,
                    $payung,
                    $total,
                    (int)($k['bpjs'] ?? $k['peserta_bpjs'] ?? 0),
                    (int)($k['nonBpjs'] ?? $k['non_bpjs'] ?? 0),
                    (int)($k['rujukanRsud'] ?? $k['rujukan_rsud'] ?? 0)
                ]);
            }
        }

        $pdo->commit();
        jsonResponse('success', 'Data kesehatan berhasil disimpan ke MySQL Hostinger');
    } catch (PDOException $e) {
        $pdo->rollBack();
        jsonResponse('error', 'Gagal menyimpan data kesehatan: ' . $e->getMessage(), null, 500);
    }
}
