# PANDUAN PALING MUDAH UNTUK PEMULA
## CARA KONEKSI GITHUB KE HOSTINGER MENGGUNAKAN FITUR "GIT" & 1-KLIK SINKRONISASI MYSQL
**Website Resmi Puskesmas Kepulauan Seribu Selatan**

---

Halo! Jika Anda masih sangat awam terkait hosting, coding, GitHub, dan database MySQL, **jangan khawatir**. Panduan ini dibuat seringkas dan semudah mungkin dengan bahasa sehari-hari. 

Cukup ikuti **4 Tahap Singkat** berikut:
1. Simpan kode ke GitHub Anda.
2. Di Hostinger, klik menu **Git** & hubungkan ke GitHub (Website langsung tampil!).
3. Buat database MySQL di Hostinger (cuma butuh 1 menit).
4. Di website, klik tombol ungu **"1-Klik Sinkronisasi"** (semua data langsung masuk & tampil sempurna!).

---

## 🌟 TAHAP 1: UPLOAD / PUSH KODE KE GITHUB ANDA (2 Menit)

1. Buka [github.com](https://github.com) dan buat repositori baru (misal diberi nama: `puskesmas-seribu-selatan`).
2. Masukkan seluruh berkas proyek ini ke repositori GitHub tersebut.
   *(Bisa lewat aplikasi GitHub Desktop, atau perintah Git biasa: `git add .`, `git commit -m "Update web"`, `git push origin main`)*.
3. Begitu Anda push ke branch `main`, sistem robot otomatis kami di `.github/workflows/deploy-hostinger.yml` akan bekerja otomatis:
   - Robot GitHub akan mengompilasi website menjadi file siap tayang.
   - Robot GitHub otomatis membuatkan branch khusus bernama **`production`**.
   *(Branch `production` inilah kunci rahasia agar Hostinger Anda langsung bisa menampilkan website tanpa layar putih/blank!)*

---

## 🚀 TAHAP 2: DI HOSTINGER, KLIK MENU "GIT" LALU KONEKSIKAN (WEBSITE LANGSUNG TAMPIL!)

Di Hostinger hPanel, terdapat fitur bawaan bernama **Git**. Cara menghubungkannya sangat mudah:

1. **Login ke Hostinger**:
   Buka [hpanel.hostinger.com](https://hpanel.hostinger.com), lalu klik tombol **Kelola (Manage)** di samping nama domain/website Anda.
2. **Buka Menu Git**:
   Di bilah menu sebelah kiri, gulir ke bawah ke bagian **Tingkat Lanjut (Advanced)** > klik menu **Git**.
3. **Isi Formulir Git (Cukup 3 Kolom Saja)**:
   - **Repository**: Masukkan alamat URL GitHub Anda (contoh: `https://github.com/username-anda/puskesmas-seribu-selatan.git`).
   - **Branch**: Ketik atau pilih **`production`** *(PENTING: Pilih `production`, jangan `main`, karena branch `production` sudah berisi file website yang siap tampil!)*.
   - **Install directory**: Ketik **`public_html`** (atau biarkan default).
4. **Klik Tombol "Create" (Buat)**:
   Hostinger akan langsung menarik berkas dari GitHub ke folder `public_html`.
5. **🎉 SELESAI! Buka nama domain Anda di browser:**
   Website Puskesmas Kepulauan Seribu Selatan **LANGSUNG TAMPIL LIVE** dengan tampilan modern, lengkap, dan responsif!

### 🔄 Agar Setiap Anda Push di GitHub, Hostinger Otomatis Terupdate (Auto-Deploy):
1. Masih di halaman menu **Git** Hostinger tadi, di bagian bawah akan muncul tabel repositori Anda.
2. Di sana ada kolom **Webhook URL** (berupa link panjang). Klik tombol **Salin (Copy)**.
3. Buka repositori Anda di **GitHub.com** > klik tab **Settings** > di bilah kiri klik **Webhooks** > klik **Add webhook**.
4. Tempelkan link tadi di kolom **Payload URL**, lalu klik tombol hijau **Add webhook**.
5. **Beres!** Mulai detik ini, setiap kali Anda push kode di GitHub, Hostinger akan otomatis menyedot update terbaru dalam hitungan detik!

---

## 🗄️ TAHAP 3: MEMBUAT DATABASE MYSQL DI HOSTINGER (1 Menit)

Sekarang, kita siapkan database MySQL untuk menyimpan data puskesmas di Hostinger:

1. Di **hPanel Hostinger**, pada bilah menu sebelah kiri, klik **Databases** > pilih **MySQL Databases**.
2. Di bagian *Create a New MySQL Database and Database User*:
   - **MySQL Database Name**: Ketik misalnya `puskesmas` (hasil akhirnya menjadi `u123456789_puskesmas`).
   - **MySQL Username**: Ketik misalnya `admin` (hasil akhirnya menjadi `u123456789_admin`).
   - **Password**: Masukkan kata sandi yang Anda inginkan (misal: `Puskesmas@2026!`).
3. Klik tombol **Create (Buat)**.
4. Catat 3 hal tadi: **Nama Database**, **Username**, dan **Password**.

---

## ⚡ TAHAP 4: TINGGAL KLIK "1-KLIK SINKRONISASI" (DATA LANGSUNG TAMPIL!)

Anda **tidak perlu** repot-repot membuka phpMyAdmin atau mengetik perintah SQL yang membingungkan:

1. Buka website Anda yang sudah tampil di browser (contoh: `https://domainanda.com`).
2. Masuk ke halaman **Admin Website** (klik tombol Login Admin atau navigasi ke panel admin).
3. Masukkan kata sandi admin resmi: **`Pkm@123456`**.
4. Di panel admin, klik tab menu **Database & Hosting** > pilih sub-tab **1-Klik Sinkronisasi MySQL**.
5. Masukkan **Nama Database**, **Username**, dan **Password** yang Anda buat di Tahap 3 tadi.
6. Klik tombol besar berwarna gradasi ungu:
   👉 **[ ⚡ SINKRONISASI DATABASE MYSQL SEKARANG (1-KLIK) ]**
7. **Selesai!** Sistem secara otomatis:
   - Terhubung ke MySQL Hostinger Anda.
   - Membuat **17 tabel resmi sistem puskesmas**.
   - Mengisikan seluruh data awal: Profil Puskesmas, 11 Formasi SDM Nakes (5 status kepegawaian), Data 10 Besar Penyakit, Fasilitas Pulau, Jadwal Dokter, Berita, Pengumuman, dan Tautan Bermanfaat.
   - Menampilkan tanda centang hijau: **`✅ TERHUBUNG KE MYSQL HOSTINGER (17 Tabel Aktif & Siap Digunakan)`**.

---

## 📌 RINGKASAN DATA PENTING

| Keterangan | Nilai / Petunjuk |
|---|---|
| **Kata Sandi Admin Web** | `Pkm@123456` |
| **Branch untuk Menu Git Hostinger** | `production` *(Hasil build otomatis oleh GitHub Actions)* |
| **Folder Instalasi Hostinger** | `public_html` |
| **Host Database MySQL Hostinger** | `localhost` |
| **Endpoint Sinkronisasi Otomatis** | `/api/sync.php` |
| **Uji Cepat Koneksi DB** | `https://domainanda.com/api/test_db.php` |

---

### 🎉 Selamat!
Website Puskesmas Anda kini telah aktif di Hostinger, terhubung otomatis ke GitHub, dan database MySQL telah tersinkronisasi 100%!
