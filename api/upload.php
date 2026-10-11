<?php
/**
 * ==============================================================================
 * API UPLOAD MEDIA & DOKUMEN KE FOLDER ASSET & DOKUMEN
 * Puskesmas Kepulauan Seribu Selatan
 * ==============================================================================
 * Endpoint: /api/upload.php
 * Method  : POST (multipart/form-data)
 */

require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse('error', 'Hanya menerima request POST multipart/form-data', null, 405);
}

if (!isset($_FILES['file'])) {
    jsonResponse('error', 'Tidak ada file yang diunggah (field: file)', null, 400);
}

$type = $_POST['type'] ?? 'gambar'; // 'gambar', 'nakes', 'kegiatan', 'slider', 'dokumen'
$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    jsonResponse('error', 'Terjadi error saat upload file: kode ' . $file['error'], null, 400);
}

// Tentukan direktori tujuan
$baseDir = dirname(__DIR__); // Root folder website di hosting
if ($type === 'dokumen' || $type === 'pdf') {
    $targetFolder = $baseDir . '/dokumen/';
    $allowedExts = ['pdf', 'xlsx', 'xls', 'docx', 'doc', 'csv'];
    $webPathPrefix = '/dokumen/';
} else {
    // Media / Gambar
    $sub = 'gambar/';
    if ($type === 'nakes') $sub = 'nakes/';
    elseif ($type === 'kegiatan') $sub = 'foto-kegiatan/';
    elseif ($type === 'slider') $sub = 'slider/';

    $targetFolder = $baseDir . '/asset/' . $sub;
    $allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
    $webPathPrefix = '/asset/' . $sub;
}

if (!is_dir($targetFolder)) {
    mkdir($targetFolder, 0755, true);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, $allowedExts)) {
    jsonResponse('error', "Format file tidak diizinkan (.{$ext}). Ekstensi yang didukung: " . implode(', ', $allowedExts), null, 422);
}

// Buat nama file yang aman dan unik
$safeName = preg_replace('/[^a-zA-Z0-9_\-\.]/', '', pathinfo($file['name'], PATHINFO_FILENAME));
$finalFileName = date('Ymd_His') . '_' . $safeName . '.' . $ext;
$destPath = $targetFolder . $finalFileName;

if (move_uploaded_file($file['tmp_name'], $destPath)) {
    $webUrl = $webPathPrefix . $finalFileName;
    jsonResponse('success', 'File berhasil diunggah ke folder ' . $type, [
        'filename' => $finalFileName,
        'path'     => $webUrl,
        'size'     => $file['size'],
        'type'     => $type
    ]);
} else {
    jsonResponse('error', 'Gagal memindahkan file ke direktori tujuan hosting', null, 500);
}
