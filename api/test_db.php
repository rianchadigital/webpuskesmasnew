<?php
/**
 * ==============================================================================
 * TEST KONEKSI DATABASE MYSQL HOSTINGER
 * Puskesmas Kepulauan Seribu Selatan
 * ==============================================================================
 * Akses via Browser: https://domain-anda.com/api/test_db.php
 */

require_once __DIR__ . '/db.php';

try {
    $pdo = getDb();
    
    // Cek versi MySQL
    $version = $pdo->query('SELECT VERSION()')->fetchColumn();
    
    // Cek daftar tabel
    $tablesStmt = $pdo->query('SHOW TABLES');
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);

    // Cek jumlah baris formasi SDM jika tabel ada
    $sdmCount = 0;
    if (in_array('sdm_formasi_kesehatan', $tables)) {
        $sdmCount = $pdo->query('SELECT COUNT(*) FROM sdm_formasi_kesehatan')->fetchColumn();
    }

    // Cek status kepegawaian
    $statusSample = [];
    if ($sdmCount > 0) {
        $statusSample = $pdo->query('SELECT jabatan, status_pns, status_pppk, status_pppk_pw, status_non_pns, status_pjlp, jumlah_eksisting FROM sdm_formasi_kesehatan LIMIT 3')->fetchAll();
    }

    jsonResponse('success', 'Koneksi ke Database MySQL Hostinger BERHASIL!', [
        'database_name'   => DB_NAME,
        'mysql_version'   => $version,
        'total_tabel'     => count($tables),
        'daftar_tabel'    => $tables,
        'total_sdm_nakes' => (int)$sdmCount,
        'sampel_status_sdm' => $statusSample
    ]);

} catch (Exception $e) {
    jsonResponse('error', 'Koneksi GAGAL: ' . $e->getMessage(), null, 500);
}
