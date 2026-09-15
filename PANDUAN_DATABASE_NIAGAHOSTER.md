# Panduan Lengkap Import Database MySQL ke Hosting Niagahoster
**Puskesmas Kecamatan Kepulauan Seribu Selatan**

Berkas database SQL resmi telah dibuat dan siap diimport ke server web hosting Niagahoster:
- **Nama Berkas:** `puskesmas_niagahoster.sql`
- **Lokasi Berkas di Proyek:** `/database/puskesmas_niagahoster.sql`
- **Tautan Unduh Langsung di Web/Admin:** `/assets/database/puskesmas_niagahoster.sql`

---

## Langkah 1: Buat Database di cPanel Niagahoster

1. Masuk ke **Member Area Niagahoster** (https://panel.niagahoster.co.id) atau login langsung ke **cPanel** akun hosting Anda.
2. Cari dan klik menu **"MySQL® Database Wizard"** (atau **"MySQL® Databases"**).
3. **Langkah 1 (Create A Database):**
   - Masukkan nama database, contoh: `puskesmas` (hasil akhirnya akan menjadi `usernamecpanel_puskesmas`).
   - Klik **Next Step**.
4. **Langkah 2 (Create Database Users):**
   - Masukkan nama pengguna, contoh: `admin_puskesmas` (hasil akhirnya `usernamecpanel_admin_puskesmas`).
   - Buat kata sandi yang kuat (gunakan **Password Generator** dan simpan kata sandi tersebut).
   - Klik **Create User**.
5. **Langkah 3 (Add User to the Database):**
   - Centang kotak **"ALL PRIVILEGES"** (agar user memiliki akses penuh: SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, INDEX).
   - Klik **Make Changes**.
   - Simpan informasi: **Nama Database**, **Username Database**, dan **Password Database**.

---

## Langkah 2: Import Berkas `puskesmas_niagahoster.sql` via phpMyAdmin

1. Kembali ke halaman utama **cPanel Niagahoster**.
2. Cari bagian **Databases** lalu klik **phpMyAdmin**.
3. Di panel sebelah kiri phpMyAdmin, **klik nama database** yang baru dibuat pada Langkah 1 (misal: `usernamecpanel_puskesmas`).
4. Klik tab menu **"Import"** di bagian atas.
5. Pada bagian **"File to import"**, klik **"Choose File"** (Pilih File) dan pilih berkas `puskesmas_niagahoster.sql` yang telah diunduh.
6. Pastikan format terpilih adalah **SQL**.
7. Gulir ke bawah dan klik tombol **"Import"** atau **"Go / Kirim"**.
8. Tunggu beberapa detik hingga muncul pesan hijau:  
   *`"Import has been successfully finished, queries executed."`*

---

## Langkah 3: Struktur Tabel yang Dihasilkan

Setelah proses import selesai, terdapat 14 tabel database lengkap:
1. `admin_users` — Data akun pengelola / admin Puskesmas.
2. `profil_puskesmas` — Profil, visi misi, jam operasional (Kepgub 755/2024), dan kontak pimpinan.
3. `fasilitas_pulau` — Fasilitas kesehatan di 4 pulau (Tidung, Pari, Untung Jawa, Lancang/Payung).
4. `layanan_poliklinik` — Daftar layanan rawat jalan, IGD, bersalin, dan laboratorium.
5. `klaster_ilp` — 5 Klaster Integrasi Layanan Primer sesuai Kepmenkes No. 2014/2023.
6. `jadwal_pelayanan` — Jadwal dokter dan jadwal pelayanan faskes.
7. `berita_kegiatan` — Warta dan artikel publikasi kesehatan.
8. `agenda_kegiatan` — Kalender kegiatan Posyandu ILP, donor darah, dan penyuluhan.
9. `pegawai_nakes` — Direktori tenaga kesehatan (dokter, perawat, bidan, apoteker).
10. `dokumen_publik` — Arsip dokumen SOP, Standar Pelayanan, dan Maklumat Pelayanan.
11. `antrean_online` — Antrean pendaftaran pasien rawat jalan.
12. `pengaduan_masyarakat` — Tiket pengaduan dan aspirasi warga pulau.
13. `faq_kesehatan` — Tanya jawab kesehatan masyarakat.
14. `statistik_faskes` — Capaian faskes dan indikator mutu pelayanan.

---

## Langkah 4: Hubungkan ke Aplikasi Website

### Jika Menggunakan PHP (cPanel Niagahoster):
Berkas `config/database.php` sudah disediakan. Sesuaikan baris berikut:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'usernamecpanel_puskesmas');
define('DB_USER', 'usernamecpanel_admin_puskesmas');
define('DB_PASS', 'KataSandiAndaYangKuat');
```

### Jika Menggunakan Node.js / Express (.env):
Tambahkan pada berkas `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=usernamecpanel_puskesmas
DB_USER=usernamecpanel_admin_puskesmas
DB_PASSWORD=KataSandiAndaYangKuat
```

---

## Catatan Penting untuk Niagahoster:
- Di Niagahoster shared/cloud hosting, `DB_HOST` default selalu bernilai `localhost`.
- Prefiks nama database dan nama pengguna selalu mengikuti username akun cPanel Anda (contoh: jika username cPanel Anda `u1234567`, maka nama database menjadi `u1234567_puskesmas`).
- Jika Anda ingin mengakses database dari luar hosting (Remote MySQL), aktifkan IP Anda terlebih dahulu di menu **"Remote MySQL®"** di cPanel Niagahoster.
