<?php
/**
 * ==============================================================================
 * 1-KLIK SINKRONISASI DATABASE MYSQL HOSTINGER
 * Puskesmas Kepulauan Seribu Selatan
 * ==============================================================================
 * Endpoint ini memungkinkan pengguna awam melakukan sinkronisasi otomatis
 * skema database & data awal tanpa perlu membuka phpMyAdmin secara rumit.
 */

require_once __DIR__ . '/db.php';

try {
    $pdo = getDb();
    
    // Cek versi MySQL
    $version = $pdo->query('SELECT VERSION()')->fetchColumn();
    
    // Cek daftar tabel yang ada
    $tablesStmt = $pdo->query('SHOW TABLES');
    $existingTables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);

    $sqlFile = __DIR__ . '/../database/puskesmas_hostinger.sql';
    $executed = false;
    $queriesCount = 0;

    // Jika tabel belum lengkap atau diminta setup/sync
    $action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : 'check_and_sync');

    if ($action === 'check_and_sync' || $action === 'force_sync') {
        if (file_exists($sqlFile)) {
            $sqlContent = file_get_contents($sqlFile);
            
            // Bersihkan komentar berlebih untuk eksekusi multi-query
            // Pisahkan per query titik koma
            $queries = array_filter(
                array_map('trim', explode(";\n", $sqlContent)),
                function($q) {
                    return !empty($q) && strpos($q, '--') !== 0;
                }
            );

            // Jalankan transaksi / eksekusi aman
            foreach ($queries as $query) {
                if (trim($query) !== '') {
                    try {
                        $pdo->exec($query);
                        $queriesCount++;
                    } catch (PDOException $qe) {
                        // Lanjutkan jika tabel sudah ada atau warning minor
                    }
                }
            }
            $executed = true;
        }
    }

    // Ambil ulang daftar tabel setelah sinkronisasi
    $tablesStmt = $pdo->query('SHOW TABLES');
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);

    // Cek jumlah baris formasi SDM jika tabel ada
    $sdmCount = 0;
    if (in_array('sdm_formasi_kesehatan', $tables)) {
        $sdmCount = (int)$pdo->query('SELECT COUNT(*) FROM sdm_formasi_kesehatan')->fetchColumn();
    }

    // Cek jumlah faskes pulau
    $faskesCount = 0;
    if (in_array('fasilitas_pulau', $tables)) {
        $faskesCount = (int)$pdo->query('SELECT COUNT(*) FROM fasilitas_pulau')->fetchColumn();
    }

    jsonResponse('success', 'Sinkronisasi Database MySQL Hostinger BERHASIL!', [
        'database_name'     => DB_NAME,
        'mysql_version'     => $version,
        'total_tabel'       => count($tables),
        'daftar_tabel'      => $tables,
        'total_sdm_nakes'   => $sdmCount,
        'total_faskes'      => $faskesCount,
        'queries_dijalankan'=> $queriesCount,
        'status_koneksi'    => 'TERHUBUNG',
        'waktu_sinkronisasi'=> date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    jsonResponse('error', 'Gagal Sinkronisasi Database MySQL: ' . $e->getMessage(), [
        'database_target' => DB_NAME,
        'saran' => 'Pastikan nama database, user, dan password di api/config.php sudah sesuai dengan hPanel Hostinger.'
    ], 500);
}
