# PANDUAN LENGKAP DEPLOY PUSKESMAS KEPULAUAN SERIBU SELATAN
## Database Google Apps Script (Spreadsheet) + GitHub & Hostinger Deployment

Panduan ini disusun untuk membantu Anda menaikkan (*UP*) website Puskesmas Kecamatan Kepulauan Seribu Selatan ke hosting publik Hostinger menggunakan GitHub dan Google Apps Script (GAS) dengan Google Spreadsheet sebagai basis data.

---

## BAGIAN 1: SETUP DATABASE GOOGLE APPS SCRIPT (GAS) + SPREADSHEET

Website ini telah dilengkapi sistem backend Google Apps Script yang menggunakan Google Spreadsheet gratis, cepat, dan tanpa biaya server bulanan.

### Langkah-langkah Pembuatan:
1. **Buat Google Spreadsheet Baru**:
   - Buka [Google Sheets](https://sheets.new) di browser Anda.
   - Beri judul spreadsheet: `Database Puskesmas Kepulauan Seribu Selatan`.

2. **Buka Editor Apps Script**:
   - Klik menu **Ekstensi (Extensions)** > **Apps Script**.
   - Hapus seluruh baris kode default yang ada di dalam editor.

3. **Tempelkan Kode Script**:
   - Buka file `google-apps-script/Code.gs` di proyek ini (atau salin dari menu Admin Website > Database GAS & Spreadsheet).
   - Tempel (*Paste*) seluruh kode ke editor Apps Script.
   - Klik ikon simpan (Ctrl+S / Cmd+S).

4. **Jalankan Inisialisasi Database (Setup Otomatis)**:
   - Pada pilihan fungsi di toolbar atas editor, pilih fungsi: `setupDatabaseSheets`.
   - Klik tombol **Jalankan (Run)**.
   - Google akan memunculkan jendela perizinan (*Authorization Required*):
     - Klik **Tinjau Izin (Review permissions)**.
     - Pilih akun Google Anda.
     - Klik **Lanjutan (Advanced)** di kiri bawah > klik **Buka Database Puskesmas (tidak aman)**.
     - Klik **Izinkan (Allow)**.
   - Script akan otomatis membuat 6 tab sheet:
     1. `Pengumuman` (Berita & pengumuman resmi)
     2. `Pengaduan_Saran` (Aspirasi & kritik saran warga)
     3. `Buku_Tamu` (Buku tamu digital pengunjung)
     4. `Statistik_Pengunjung` (Pelacak hit visitor harian)
     5. `Antrean_Online` (Pendaftaran antrean berobat online)
     6. `Layanan` (Katalog tarif & poliklinik)

5. **Deploy sebagai Web App**:
   - Klik tombol biru **Terapkan (Deploy)** di kanan atas > pilih **Deployment baru (New deployment)**.
   - Klik ikon gear (roda gigi) di sebelah kiri > pilih **Aplikasi Web (Web app)**.
   - Konfigurasi formulir:
     - **Deskripsi**: `API Puskesmas v1`
     - **Jalankan sebagai (Execute as)**: `Saya (email Anda)`
     - **Siapa yang memiliki akses (Who has access)**: **Siapa saja (Anyone)** *(Penting agar website publik bisa mengakses)*
   - Klik **Terapkan (Deploy)**.
   - Salin **URL Aplikasi Web (Web app URL)** (contoh: `https://script.google.com/macros/s/AKfycbx.../exec`).

6. **Hubungkan ke Website**:
   - Buka Website Puskesmas > masuk ke menu **Admin** (klik logo dua kali atau klik menu Admin).
   - Masuk ke tab **Database GAS & Spreadsheet**.
   - Tempelkan URL Web App GAS Anda, lalu klik **Simpan & Tes Koneksi**.
   - Status akan berubah menjadi hijau **Terhubung**.

---

## BAGIAN 2: UPLOAD & KEMBANGKAN KE GITHUB

Untuk menyimpan kode sumber di GitHub dan mengaktifkan version control:

1. **Buat Repositori Baru di GitHub**:
   - Masuk ke akun Anda di [GitHub.com](https://github.com).
   - Klik ikon **+** di pojok kanan atas > pilih **New repository**.
   - Beri nama repositori, contoh: `puskesmas-kepulauan-seribu-selatan`.
   - Pilih **Public** atau **Private** > klik **Create repository**.

2. **Inisialisasi & Push Kode dari Komputer Lokal**:
   Buka terminal di folder proyek ini dan jalankan perintah berikut:
   ```bash
   # Inisialisasi git
   git init

   # Tambahkan semua file
   git add .

   # Buat commit pertama
   git commit -m "feat: inisialisasi website puskesmas kepulauan seribu selatan dengan GAS dan view PDF"

   # Ubah branch utama menjadi main
   git branch -M main

   # Hubungkan ke remote GitHub (ganti USERNAME dan REPO dengan milik Anda)
   git remote add origin https://github.com/USERNAME/puskesmas-kepulauan-seribu-selatan.git

   # Push ke GitHub
   git push -u origin main
   ```

---

## BAGIAN 3: CARA DEPLOY KE HOSTINGER (MEMBUAT WEBSITE UP & ONLINE)

Terdapat 2 cara praktis untuk meng-UP website ke Hostinger:

### METODE A: Deploy Manual via File Manager Hostinger (Paling Cepat & Mudah)
1. **Build Proyek**:
   Di terminal lokal Anda, jalankan:
   ```bash
   npm run build
   ```
   Perintah ini akan membuat folder `dist` yang berisi file static produksi (`index.html`, `assets/`, `.htaccess`, dsb.).

2. **Login ke Hostinger**:
   - Masuk ke [hPanel Hostinger](https://hpanel.hostinger.com/).
   - Masuk ke menu **Websites** > klik **Kelola (Manage)** pada domain Anda.

3. **Buka File Manager**:
   - Buka **File Manager** > buka folder `public_html`.
   - Jika ada file bawaan `default.php` dari Hostinger, hapus file tersebut.
   - Kompres isi folder `dist` di komputer Anda menjadi `dist.zip`.
   - Upload `dist.zip` ke folder `public_html` di File Manager Hostinger, lalu ekstrak (*Extract*).
   - Pastikan file `index.html` dan `.htaccess` berada langsung di dalam folder `public_html` (bukan di dalam subfolder).

4. **Selesai**:
   Akses domain Anda (misal: `https://namadomainanda.com`). Website langsung aktif online dengan SSL HTTPS!

---

### METODE B: Deploy Otomatis via GitHub Actions CI/CD (Rekomendasi Developer)
File alur kerja `.github/workflows/deploy-hostinger.yml` telah disediakan di proyek ini. Setiap kali Anda melakukan `git push` ke branch `main`, GitHub akan otomatis meng-compile dan meng-upload file ke Hostinger.

1. **Dapatkan Kredensial FTP dari Hostinger**:
   - Di hPanel Hostinger, cari menu **Akun FTP (FTP Accounts)**.
   - Catat:
     - **FTP Host / Server** (misal: `ftp.namadomainanda.com` atau IP server)
     - **FTP Username** (misal: `u123456789`)
     - **FTP Password**

2. **Simpan Rahasia (Secrets) di GitHub**:
   - Buka repositori GitHub Anda.
   - Masuk ke **Settings** > **Secrets and variables** > **Actions**.
   - Klik **New repository secret** dan tambahkan 3 secret berikut:
     - Name: `FTP_SERVER`, Value: [FTP Host Hostinger Anda]
     - Name: `FTP_USERNAME`, Value: [FTP Username Anda]
     - Name: `FTP_PASSWORD`, Value: [FTP Password Anda]

3. **Trigger Deployment**:
   - Cukup lakukan `git push origin main`.
   - Masuk ke tab **Actions** di GitHub untuk memantau proses build dan upload otomatis hingga selesai bertanda hijau.

---

## BAGIAN 4: FILE .HTACCESS UNTUK SPA DI HOSTINGER

File `public/.htaccess` telah disertakan di proyek ini. File ini memastikan:
1. URL routing tidak error 404 saat pengunjung me-refresh halaman (Rewrite all routes to `index.html`).
2. Seluruh koneksi otomatis dipaksa menggunakan HTTPS (SSL).
3. Kompresi Gzip diaktifkan untuk menghemat kuota internet dan mempercepat loading bagi warga di pulau.

---

## RINGKASAN TAUTAN DOKUMEN RESMI GOOGLE DRIVE
Website ini telah terkonfigurasi dengan 4 dokumen resmi Google Drive PDF:
1. **Standar Pelayanan Publik**:
   - Google Drive ID: `1Gxi3_fT5c2a-hjM5S9BAzRdbybdMtq7Y`
2. **Maklumat Pelayanan**:
   - Google Drive ID: `1DFcUjFAhLsJuFs4pvv5WMtxnd651NXvS`
3. **Hak dan Kewajiban Pasien**:
   - Google Drive ID: `1FwoMOjldKvUK6pXmDxSP0r-QfVvJcqXy`
4. **Struktur Organisasi ILP 2026**:
   - Google Drive ID: `1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W`

Semua dokumen langsung dapat dibuka dalam mode view PDF terintegrasi di dalam website.
