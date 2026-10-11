# PANDUAN PRAKTIS PEMULA: HOSTING HOSTINGER + GITHUB AUTO-UPDATE + MYSQL 1-KLIK
## Puskesmas Kepulauan Seribu Selatan

Panduan ini ditulis khusus dengan bahasa yang sangat mudah dipahami untuk Anda yang masih awam. Setelah mengikuti panduan ini:
1. **Setiap kali Anda push kode di GitHub**, website di Hostinger akan **otomatis terupdate** dalam hitungan menit.
2. **Database MySQL** dapat diaktifkan dan disinkronkan hanya dengan **1-Klik** dari Dashboard Admin Website.

---

## 🌟 RINGKASAN CARA KERJA (ALUR OTOMATIS)
```
[Komputer Anda / GitHub] 
       ⬇  (Anda cukup 'git push')
[GitHub Actions (.github/workflows/deploy-hostinger.yml)] 
       ⬇  (Otomatis build & kirim berkas)
[Hosting Hostinger (public_html)] 
       ⬇  (Website live terupdate)
[Dashboard Admin Website] 
       ⬇  (Klik tombol '1-Klik Sinkronisasi MySQL')
[Database MySQL Hostinger Aktif & Data Siap Tampil]
```

---

## 🚀 BAGIAN 1: CARA MENGHUBUNGKAN GITHUB KE HOSTINGER (AGAR OTOMATIS TERUPDATE)

Kami telah menyiapkan berkas otomatisasi **`.github/workflows/deploy-hostinger.yml`** di dalam proyek ini. Anda hanya perlu menyetel 3 data rahasia (*Secrets*) di GitHub sekali saja.

### Langkah 1: Dapatkan Akun FTP dari Hostinger (1 Menit)
1. Buka dan login ke akun Hostinger: [hpanel.hostinger.com](https://hpanel.hostinger.com).
2. Klik **Kelola (Manage)** pada website Anda.
3. Di menu sebelah kiri, cari menu **Files** > klik **FTP Accounts**.
4. Di sana Anda akan melihat:
   - **FTP IP / Host**: (Contoh: `185.199.108.153` atau `ftp.domainanda.com`)
   - **FTP Username**: (Contoh: `u123456789`)
   - **FTP Password**: (Kata sandi FTP Anda. Jika lupa, klik *Change Password*).

### Langkah 2: Masukkan Data FTP ke Repositori GitHub Anda (2 Menit)
1. Buka repositori proyek website Anda di [github.com](https://github.com).
2. Klik tab **Settings** (Pengaturan di bagian kanan atas halaman repositori).
3. Di bilah menu kiri, klik **Secrets and variables** > pilih **Actions**.
4. Klik tombol hijau **New repository secret**.
5. Masukkan 3 data berikut satu per satu:
   - **Secret 1**:
     - Name: `FTP_SERVER`
     - Secret: *Isi dengan FTP IP / Host dari Hostinger*
     - Klik **Add secret**.
   - **Secret 2**:
     - Name: `FTP_USERNAME`
     - Secret: *Isi dengan FTP Username dari Hostinger*
     - Klik **Add secret**.
   - **Secret 3**:
     - Name: `FTP_PASSWORD`
     - Secret: *Isi dengan Password FTP Anda*
     - Klik **Add secret**.

### Langkah 3: Tes Push ke GitHub!
Sekarang setiap kali Anda atau tim melakukan `git push` ke branch `main`, GitHub akan otomatis:
- Menjalankan build Vite (`npm run build`).
- Mengunggah file website ke folder `public_html` di Hostinger.
- Anda bisa melihat proses berjalannya di tab **Actions** di GitHub dengan tanda centang hijau (✅).

---

## 🗄️ BAGIAN 2: CARA MEMBUAT DATABASE MYSQL DI HOSTINGER

### Langkah 1: Buat Database di Hostinger (1 Menit)
1. Di hPanel Hostinger, buka menu **Databases** > klik **MySQL Databases**.
2. Di formulir *Create a New MySQL Database and Database User*:
   - **MySQL Database Name**: misal ketik `puskesmas` (hasilnya menjadi `u123456789_puskesmas`).
   - **MySQL Username**: misal ketik `admin` (hasilnya menjadi `u123456789_admin`).
   - **Password**: Buat password yang kuat, misalnya `Puskesmas@2026!`.
3. Klik tombol **Create (Buat)**.

### Langkah 2: Cocokkan Kredensial di Berkas `api/config.php`
Buka berkas `api/config.php` (bisa lewat GitHub atau File Manager Hostinger):
```php
define('DB_HOST', 'localhost');                  // Di Hostinger selalu 'localhost'
define('DB_PORT', '3306');
define('DB_NAME', 'u123456789_puskesmas');      // Ganti dengan Nama Database Hostinger Anda
define('DB_USER', 'u123456789_admin');          // Ganti dengan Username Database Anda
define('DB_PASS', 'Puskesmas@2026!');            // Ganti dengan Password yang Anda buat
```

---

## ⚡ BAGIAN 3: 1-KLIK SINKRONISASI DATABASE (TINGGAL KLIK LANGSUNG TAMPIL)

Setelah website Anda terupload di Hostinger, Anda tidak perlu repot-repot mengetik kode SQL atau membuka database manual:

1. Buka website Anda di browser, masuk ke menu **Admin Website** (URL: `https://domainanda.com` lalu klik Login Admin).
2. Masukkan kata sandi admin: **`Pkm@123456`**.
3. Klik tab **Database & Hosting** > pilih sub-tab **1-Klik Sinkronisasi MySQL**.
4. Klik tombol besar berwarna ungu:
   👉 **[ ⚡ SINKRONISASI DATABASE MYSQL SEKARANG ]**
5. Sistem di balik layar (endpoint `/api/sync.php`) akan otomatis:
   - Menghubungkan ke MySQL Hostinger.
   - Membuat 17 tabel resmi sistem puskesmas jika belum ada.
   - Mengisi data awal (Profil Puskesmas, 11 Formasi SDM Nakes 5 Status Kepegawaian, Fasilitas Pulau, Layanan Poli, dan Jadwal).
   - Menampilkan laporan sukses hijau:
     `✅ Status: TERHUBUNG KE MYSQL HOSTINGER (17 Tabel Aktif, SDM Siap Tampil)`

---

## 📂 CARA KERJA FOLDER GAMBAR & DOKUMEN DI HOSTINGER

Agar foto gedung, tenaga kesehatan, dan dokumen SK/SOP tidak hilang saat update:
- **`asset/gambar/`** : Foto fisik gedung faskes & dermaga ambulans laut.
- **`asset/nakes/`** : Pas foto dokter, perawat, bidan, sanitarian, nutrisionis.
- **`asset/slider/`** : Banner gambar berjalan di beranda.
- **`dokumen/sk/`** : Berkas PDF SK, Pergub DKI 14, Maklumat Pelayanan.
- **`dokumen/sop/`** : SOP Pelayanan, SOP Triase IGD 24 Jam, SOP Rujukan Laut.

---

## 💡 PERTANYAAN UMUM (FAQ UNTUK ORANG AWAM)

### 1. Bagaimana jika saya ingin mengubah isi pengumuman atau foto?
Masuk ke **Admin Dashboard Website** (kata sandi: `Pkm@123456`), pilih tab **Pengumuman & Rekrutmen** atau **Dokumentasi & Galeri**. Semua perubahan otomatis tersimpan seketika tanpa perlu coding!

### 2. Apakah saya harus bayar database MySQL di Hostinger?
Tidak. Database MySQL sudah termasuk gratis dalam paket hosting Hostinger yang Anda beli.

### 3. Jika saya salah edit atau ingin kembali ke awal?
Di Dashboard Admin tersedia tombol **Reset Default** untuk mengembalikan data awal resmi kapan saja dengan aman.
