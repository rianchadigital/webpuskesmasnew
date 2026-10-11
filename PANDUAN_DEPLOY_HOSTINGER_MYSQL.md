# PANDUAN DEPLOY HOSTINGER & DATABASE MYSQL RESMI
## Puskesmas Kepulauan Seribu Selatan

Panduan teknis resmi ini disusun untuk memudahkan administrator, staf IT, dan pengelola sistem dalam menaikkan (*UP / Deploy*) website resmi **Puskesmas Kepulauan Seribu Selatan** ke hosting publik **Hostinger** menggunakan **Database MySQL / MariaDB**, terintegrasi dengan folder **`asset/`** dan **`dokumen/`**.

---

## 📑 DAFTAR ISI
1. [Struktur Paket Deploy](#1-struktur-paket-deploy)
2. [Langkah 1: Membuat Database MySQL di Hostinger hPanel](#2-langkah-1-membuat-database-mysql-di-hostinger-hpanel)
3. [Langkah 2: Impor Skema SQL `puskesmas_hostinger.sql` di phpMyAdmin](#3-langkah-2-impor-skema-sql-puskesmas_hostingersql-di-phpmyadmin)
4. [Langkah 3: Menyesuaikan Kredensial Database di `api/config.php`](#4-langkah-3-menyesuaikan-kredensial-database-di-apiconfigphp)
5. [Langkah 4: Struktur & Pengelolaan Folder `asset/` dan `dokumen/`](#5-langkah-4-struktur--pengelolaan-folder-asset-dan-dokumen)
6. [Langkah 5: Build Website & Upload ke Hostinger (`public_html`)](#6-langkah-5-build-website--upload-ke-hostinger-public_html)
7. [Langkah 6: Pengujian Koneksi API & Validasi Data](#7-langkah-6-pengujian-koneksi-api--validasi-data)
8. [Aturan Pengelolaan SDM: 5 Status Kepegawaian](#8-aturan-pengelolaan-sdm-5-status-kepegawaian)

---

## 1. STRUKTUR PAKET DEPLOY

Dalam proyek ini telah disiapkan berkas siap pakai untuk lingkungan Hostinger:

```
├── asset/                          <- Folder pengumpulan gambar & media visual
│   ├── gambar/                     <- Foto gedung faskes, rawat inap, dermaga ambulans
│   ├── foto-kegiatan/              <- Dokumentasi posyandu, penyuluhan, skrining
│   ├── nakes/                      <- Pas foto dokter, perawat, bidan, staf nakes
│   ├── slider/                     <- Banner carousel beranda website
│   └── icons/                      <- Logo & ikon resmi
├── dokumen/                        <- Folder pengumpulan berkas dokumen resmi
│   ├── sk/                         <- SK Kepala Puskesmas, Pergub DKI 14, Kepgub 755/2024
│   ├── sop/                        <- SOP IGD 24 Jam, SOP rawat jalan, SOP evakuasi laut
│   ├── laporan/                    <- Laporan bulanan/tahunan, rekap ABK & formasi SDM
│   └── formulir/                   <- Formulir pendaftaran, survei kepuasan, pengaduan
├── database/
│   └── puskesmas_hostinger.sql     <- Skema SQL MySQL lengkap (17 tabel + data awal)
├── api/                            <- Backend REST API PHP untuk Hostinger
│   ├── config.php                  <- Pengaturan koneksi MySQL
│   ├── db.php                      <- Koneksi PDO & fungsi respons JSON
│   ├── sdm.php                     <- CRUD SDM 5 Status Kepegawaian & validasi eksisting
│   ├── kesehatan.php               <- CRUD 10 besar penyakit & kunjungan faskes bulanan
│   ├── upload.php                  <- Endpoint upload file media & dokumen
│   └── test_db.php                 <- 1-Click test koneksi MySQL Hostinger
└── public/
    └── .htaccess                   <- Konfigurasi routing Apache SPA (mencegah error 404)
```

---

## 2. LANGKAH 1: MEMBUAT DATABASE MYSQL DI HOSTINGER HPANEL

1. Login ke akun Hostinger Anda di [hpanel.hostinger.com](https://hpanel.hostinger.com).
2. Pilih paket hosting website Anda & klik **Kelola (Manage)**.
3. Di bilah menu kiri, navigasi ke **Databases** > klik **MySQL Databases**.
4. Di bagian *Create a New MySQL Database and Database User*:
   - **MySQL Database Name**: Masukkan nama database, misal: `puskesmas` (Hasilnya menjadi `u123456789_puskesmas`).
   - **MySQL Username**: Masukkan username, misal: `admin` (Hasilnya menjadi `u123456789_admin`).
   - **Password**: Masukkan kata sandi yang kuat (simpan kata sandi ini!).
5. Klik **Create** (Buat). Catat detail Database Name, Username, dan Password yang dihasilkan.

---

## 3. LANGKAH 2: IMPOR SKEMA SQL `puskesmas_hostinger.sql` DI PHPMYADMIN

1. Di halaman **MySQL Databases** Hostinger yang sama, cari database yang baru saja dibuat.
2. Klik tombol **Enter phpMyAdmin** di sebelah kanan nama database.
3. Setelah jendela phpMyAdmin terbuka:
   - Klik tab **Import** di bagian atas menu.
   - Klik tombol **Choose File (Pilih Berkas)**.
   - Pilih berkas `database/puskesmas_hostinger.sql` dari komputer Anda (atau unduh langsung melalui Dashboard Admin tab *Database Hostinger*).
   - Pastikan Character set disetel ke **utf-8**.
   - Gulir ke bawah dan klik tombol **Import (Kirim)**.
4. Anda akan melihat pesan sukses hijau bahwa 17 tabel berhasil dibuat beserta data awal (Profil Puskesmas, SDM 5 Status, 10 Besar Penyakit 2026, Fasilitas Pulau, Jadwal, dan Dokumen).

---

## 4. LANGKAH 3: MENYESUAIKAN KREDENSIAL DATABASE DI `api/config.php`

Buka berkas `api/config.php` dan sesuaikan nilainya:

```php
<?php
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'u123456789_puskesmas');      // Ganti dengan Nama DB Hostinger Anda
define('DB_USER', 'u123456789_admin');          // Ganti dengan Username DB Hostinger Anda
define('DB_PASS', 'KataSandiHostinger123#');    // Ganti dengan Password DB Hostinger Anda
define('DB_CHARSET', 'utf8mb4');
```

---

## 5. LANGKAH 4: STRUKTUR & PENGELOLAAN FOLDER `asset/` DAN `dokumen/`

### A. Folder `asset/` (Gambar & Foto)
Folder ini digunakan untuk menampung gambar agar rapi dan tidak tercecer:
- **`asset/gambar/`**: Letakkan foto fisik bangunan (Gedung baru Pulau Tidung, Dermaga Kapal Ambulans Medis, ruang rawat inap).
- **`asset/nakes/`**: Letakkan pas foto resmi tenaga dokter umum, dokter gigi, perawat, bidan, sanitarian, nutrisionis, dan staf TU.
- **`asset/foto-kegiatan/`**: Letakkan foto dokumentasi Posyandu Siklus Hidup ILP, penyuluhan, vaksinasi, dan fogging/PSN.
- **`asset/slider/`**: Letakkan gambar banner layar penuh beranda website (disarankan rasio 16:9, ukuran 1920x1080 px).

### B. Folder `dokumen/` (PDF & Arsip)
- **`dokumen/sk/`**: Berkas Surat Keputusan, SK Standar Pelayanan Publik, SK Maklumat Pelayanan, dan salinan PDF Pergub DKI No. 14.
- **`dokumen/sop/`**: Berkas SOP pelayanan medis, triase IGD 24 jam, dan alur rujukan laut.
- **`dokumen/laporan/`**: Berkas profil kesehatan tahunan, rekapitulasi data ABK SDMK.
- **`dokumen/formulir/`**: Berkas formulir berobat, survei kepuasan masyarakat (SKM), dan formulir aduan.

*Tips Upload*: Anda dapat mengunggah berkas langsung melalui File Manager Hostinger atau menggunakan endpoint `/api/upload.php` melalui dashboard.

---

## 6. LANGKAH 5: BUILD WEBSITE & UPLOAD KE HOSTINGER (`public_html`)

1. Di komputer lokal Anda, buka terminal dan jalankan perintah:
   ```bash
   npm run build
   ```
2. Hasil build produksi yang optimal akan terbentuk di dalam folder `dist/`.
3. Masuk ke dalam folder `dist/`:
   - Kompres seluruh isi folder `dist/` menjadi `dist.zip` (pastikan `index.html`, `.htaccess`, folder `assets/`, `api/`, `dokumen/`, dan `asset/` berada di tingkat utama arsip zip).
4. Login ke **Hostinger hPanel** > buka **File Manager**.
5. Buka folder **`public_html`**.
6. Upload berkas `dist.zip` ke dalam `public_html`, lalu klik kanan dan pilih **Extract**.
7. Verifikasi file `.htaccess` telah berada di `public_html` untuk memastikan routing Single Page App (SPA) berjalan lancar saat pengguna merefresh halaman poli/jadwal/berita.

---

## 7. LANGKAH 6: PENGUJIAN KONEKSI API & VALIDASI DATA

Setelah upload selesai, uji fungsionalitas hosting melalui browser Anda:

1. **Tes Koneksi MySQL**:
   Buka URL: `https://domain-anda.com/api/test_db.php`
   - Respons yang diharapkan:
     ```json
     {
       "status": "success",
       "message": "Koneksi ke Database MySQL Hostinger BERHASIL!",
       "data": {
         "database_name": "u123456789_puskesmas",
         "total_tabel": 17,
         "total_sdm_nakes": 11
       }
     }
     ```

2. **Tes API SDM Formasi**:
   Buka URL: `https://domain-anda.com/api/sdm.php`
   - Akan menampilkan 11 data formasi SDM dengan 5 rincian status kepegawaian (PNS, PPPK, PPPK PW, NON PNS, PJLP).

3. **Tes API Data Kesehatan**:
   Buka URL: `https://domain-anda.com/api/kesehatan.php?tahun=2026`
   - Akan menampilkan 10 Besar Penyakit dan Rekapitulasi Kunjungan Faskes Bulanan.

---

## 8. ATURAN PENGELOLAAN SDM: 5 STATUS KEPEGAWAIAN

Sesuai instruksi dan standar kepegawaian Puskesmas Kepulauan Seribu Selatan, setiap formasi jabatan memiliki rincian **5 Status Kepegawaian**:

1. **PNS** : Pegawai Negeri Sipil
2. **PPPK** : Pegawai Pemerintah dengan Perjanjian Kerja (Penuh Waktu)
3. **PPPK PW** : PPPK Paruh Waktu
4. **NON PNS** : Tenaga Kontrak Daerah / Non-PNS
5. **PJLP** : Penyedia Jasa Lainnya Perorangan (Teknis / Penunjang)

### ⚠️ RUMUS KONSISTENSI DATA MUTLAK:
$$\text{Status PNS} + \text{Status PPPK} + \text{Status PPPK PW} + \text{Status NON PNS} + \text{Status PJLP} = \text{Jumlah Eksisting}$$

- Sistem di backend (`/api/sdm.php`) maupun di antarmuka Admin (`AdminStaffDataTab.tsx`) secara otomatis memvalidasi rumus ini secara langsung.
- Apabila terjadi selisih, sistem akan memunculkan peringatan banner dan menyediakan tombol praktis **"Samakan Eksisting = Total Status"** agar integritas data tetap 100% akurat.

---

*Puskesmas Kepulauan Seribu Selatan — Dinas Kesehatan Provinsi DKI Jakarta*
