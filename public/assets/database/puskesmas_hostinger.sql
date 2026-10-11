-- ==============================================================================
-- DATABASE SQL RESMI PUSKESMAS KEPULAUAN SERIBU SELATAN
-- Target Hosting: Hostinger (hPanel / cPanel / Cloud Hosting / VPS)
-- Engine: MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.4+
-- Karakter: utf8mb4_unicode_ci (Mendukung Huruf Lengkap, Simbol & Emoji)
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+07:00";

-- ------------------------------------------------------------------------------
-- 1. TABEL ADMIN & PENGELOLA SISTEM (admin_users)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL COMMENT 'Bcrypt hash password',
  `nama_lengkap` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'super_admin',
  `status` ENUM('aktif','nonaktif') NOT NULL DEFAULT 'aktif',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `nama_lengkap`, `email`, `role`, `status`) VALUES
(1, 'admin', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Administrator Resmi Puskesmas', 'admin@puskesmasseribuselatan.com', 'super_admin', 'aktif'),
(2, 'petugas_tidung', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Operator Pos Pulau Tidung', 'tidung@puskesmasseribuselatan.com', 'operator', 'aktif'),
(3, 'petugas_pari', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Operator Pos Pulau Pari', 'pari@puskesmasseribuselatan.com', 'operator', 'aktif');

-- ------------------------------------------------------------------------------
-- 2. TABEL PROFIL PUSKESMAS (profil_puskesmas)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `profil_puskesmas`;
CREATE TABLE `profil_puskesmas` (
  `id` INT(11) NOT NULL,
  `nama_puskesmas` VARCHAR(200) NOT NULL,
  `sub_judul` VARCHAR(255) DEFAULT NULL,
  `motto` VARCHAR(255) DEFAULT NULL,
  `kepala_nama` VARCHAR(150) DEFAULT NULL,
  `kepala_jabatan` VARCHAR(200) DEFAULT NULL,
  `kepala_nip` VARCHAR(50) DEFAULT NULL,
  `kepala_foto` VARCHAR(255) DEFAULT NULL,
  `sambutan_kepala` LONGTEXT DEFAULT NULL,
  `visi` LONGTEXT DEFAULT NULL,
  `misi_json` JSON DEFAULT NULL,
  `tata_nilai_json` JSON DEFAULT NULL,
  `alamat` LONGTEXT DEFAULT NULL,
  `telepon` VARCHAR(100) DEFAULT NULL,
  `whatsapp` VARCHAR(100) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `hotline_igd` VARCHAR(100) DEFAULT NULL,
  `hotline_ambulans` VARCHAR(100) DEFAULT NULL,
  `jam_layanan_json` JSON DEFAULT NULL,
  `deskripsi_wilayah` LONGTEXT DEFAULT NULL,
  `koordinat_lat` DECIMAL(10,7) DEFAULT NULL,
  `koordinat_lng` DECIMAL(10,7) DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `profil_puskesmas` (
  `id`, `nama_puskesmas`, `sub_judul`, `motto`, `kepala_nama`, `kepala_jabatan`, `kepala_nip`, `kepala_foto`,
  `sambutan_kepala`, `visi`, `misi_json`, `tata_nilai_json`, `alamat`, `telepon`, `whatsapp`, `email`,
  `hotline_igd`, `hotline_ambulans`, `jam_layanan_json`, `deskripsi_wilayah`, `koordinat_lat`, `koordinat_lng`
) VALUES (
  1,
  'Puskesmas Kepulauan Seribu Selatan',
  'Pusat Informasi dan Pelayanan Kesehatan Masyarakat Kepulauan Seribu Selatan',
  'Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami',
  'dr. Ignatius Dendy Purnama',
  'Kepala Puskesmas Kepulauan Seribu Selatan',
  '198503222010012031',
  '/assets/kepala-puskesmas.svg',
  'Assalamu''alaikum Wr. Wb.\n\nPuji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas segala rahmat dan karunia-Nya sehingga kita dapat menjalankan tugas pelayanan kesehatan kepada masyarakat dengan sebaik-baiknya.\n\nSelamat datang di website resmi Puskesmas Kepulauan Seribu Selatan. Website ini merupakan media informasi dan komunikasi kami kepada masyarakat dalam rangka meningkatkan transparansi, kemudahan akses informasi, dan akuntabilitas pelayanan publik.\n\nPuskesmas Kepulauan Seribu Selatan berkomitmen untuk memberikan pelayanan kesehatan yang berkualitas, profesional, dan merata bagi seluruh masyarakat pesisir di pulau-pulau wilayah kerja kami.\n\nWassalamu''alaikum Wr. Wb.\n\ndr. Ignatius Dendy Purnama\nKepala Puskesmas Kepulauan Seribu Selatan',
  'Menjadi Puskesmas Terdepan dalam mewujudkan pelayanan PRIMA menuju Kecamatan Kepulauan Seribu Selatan Sehat.',
  '["Meningkatkan Kompetensi SDM kesehatan secara berkelanjutan.", "Meningkatkan Kenyamanan Pelayanan bagi seluruh pasien dan keluarga.", "Meningkatkan sarana dan prasarana fasilitas kesehatan serta ambulans laut 24 jam.", "Meningkatkan integrasi UKM dan UKP melalui 5 Klaster Siklus Hidup ILP.", "Meningkatkan kualitas perencanaan dan pemecahan masalah kesehatan masyarakat pesisir.", "Meningkatkan mutu pelayanan secara terus menerus dan berkesinambungan."]',
  '[{"code":"P","title":"Profesional","desc":"Bekerja dengan integritas tinggi dan berpedoman pada SOP medis."},{"code":"R","title":"Ramah","desc":"Melayani dengan 5S: Senyum, Salam, Sapa, Sopan, dan Santun."},{"code":"I","title":"Inovatif","desc":"Terobosan digitalisasi pelayanan dan jangkauan kepulauan."},{"code":"M","title":"Melayani","desc":"Mengutamakan kebutuhan masyarakat pulau sepenuh hati."},{"code":"A","title":"Akuntabel","desc":"Bertanggung jawab dan transparan dalam tata kelola faskes."}]',
  'Dermaga Pulau Tidung, Jl. Pantai Selatan RT 007/RW 001, Kelurahan Pulau Tidung, Kecamatan Kepulauan Seribu Selatan, Kabupaten Administrasi Kepulauan Seribu, Provinsi DKI Jakarta 14520',
  '(021) 7552-3010 / 0859-6100-0003',
  '0859-6100-0003',
  'puskesmasseribuselatan@jakarta.go.id',
  '119 / 0859-6100-0003',
  '0859-6100-0003 (24 Jam Non-Stop Ambulans Kapal Laut)',
  '{"poliklinik":"Senin: 12.00-18.00 WIB | Selasa-Kamis: 07.30-16.00 WIB | Jumat: 07.30-16.30 WIB","emergency":"Setiap Hari 24 Jam Non-Stop (Rawat Inap, Ruang Bersalin, IGD & Kapal Ambulans)"}',
  'Wilayah kerja Puskesmas Kepulauan Seribu Selatan mencakup 3 kelurahan administratif yaitu Kelurahan Pulau Tidung, Kelurahan Pulau Pari, dan Kelurahan Pulau Untung Jawa, melayani pulau berpenghuni Pulau Tidung, Pulau Pari, Pulau Lancang, Pulau Untung Jawa, dan Pulau Payung.',
  -5.8038890,
  106.5255560
);

-- ------------------------------------------------------------------------------
-- 3. TABEL FORMASI SDM KESEHATAN (sdm_formasi_kesehatan)
-- Dilengkapi 5 Rincian Status Kepegawaian (PNS, PPPK, PPPK PW, NON PNS, PJLP)
-- Aturan: (status_pns + status_pppk + status_pppk_pw + status_non_pns + status_pjlp = jumlah_eksisting)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `sdm_formasi_kesehatan`;
CREATE TABLE `sdm_formasi_kesehatan` (
  `id` VARCHAR(50) NOT NULL,
  `jabatan` VARCHAR(150) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `kualifikasi` VARCHAR(255) NOT NULL,
  `standar_abk` INT(11) NOT NULL DEFAULT 0,
  `jumlah_eksisting` INT(11) NOT NULL DEFAULT 0,
  `status_pns` INT(11) NOT NULL DEFAULT 0,
  `status_pppk` INT(11) NOT NULL DEFAULT 0,
  `status_pppk_pw` INT(11) NOT NULL DEFAULT 0 COMMENT 'PPPK Paruh Waktu',
  `status_non_pns` INT(11) NOT NULL DEFAULT 0 COMMENT 'Non PNS / Kontrak Daerah',
  `status_pjlp` INT(11) NOT NULL DEFAULT 0 COMMENT 'Penyedia Jasa Lainnya Perorangan',
  `lokasi_induk` INT(11) NOT NULL DEFAULT 0 COMMENT 'Puskesmas Induk Pulau Tidung',
  `lokasi_lancang` INT(11) NOT NULL DEFAULT 0 COMMENT 'Pustu Pulau Lancang',
  `lokasi_pari` INT(11) NOT NULL DEFAULT 0 COMMENT 'Pustu Pulau Pari',
  `lokasi_untung_jawa` INT(11) NOT NULL DEFAULT 0 COMMENT 'Pustu Pulau Untung Jawa',
  `keterangan` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sdm_formasi_kesehatan` 
(`id`, `jabatan`, `kategori`, `kualifikasi`, `standar_abk`, `jumlah_eksisting`, `status_pns`, `status_pppk`, `status_pppk_pw`, `status_non_pns`, `status_pjlp`, `lokasi_induk`, `lokasi_lancang`, `lokasi_pari`, `lokasi_untung_jawa`, `keterangan`) 
VALUES
('sdmk-1', 'Dokter Umum', 'Tenaga Medis', 'Profesi Dokter (S.Ked + dr.)', 8, 8, 5, 2, 0, 1, 0, 5, 1, 1, 1, 'Terpenuhi 100% (Standar ABK Kemenkes)'),
('sdmk-2', 'Dokter Gigi', 'Tenaga Medis', 'Profesi Dokter Gigi (SKG + drg.)', 3, 3, 2, 1, 0, 0, 0, 2, 0, 0, 1, 'Terpenuhi 100% (Pelayanan Poli Gigi Terjadwal)'),
('sdmk-3', 'Perawat (Ners & Vokasi D3)', 'Tenaga Keperawatan', 'S.Kep, Ners / D3 Keperawatan', 16, 16, 8, 5, 1, 2, 0, 10, 2, 2, 2, 'Terpenuhi 100% (Siaga 24 Jam & Rawat Inap)'),
('sdmk-4', 'Bidan (Kebidanan)', 'Tenaga Kebidanan', 'D3 / D4 / S.Tr.Keb / Profesi Bidan', 12, 12, 6, 4, 0, 2, 0, 6, 2, 2, 2, 'Terpenuhi 100% (Persalinan 24 Jam & KIA-KB)'),
('sdmk-5', 'Apoteker & Tenaga Teknis Kefarmasian', 'Tenaga Kefarmasian', 'Profesi Apoteker (Apt.) / D3 Farmasi', 4, 4, 2, 1, 0, 1, 0, 3, 0, 1, 0, 'Terpenuhi 100% (Pengelolaan Farmasi & Gudang Obat)'),
('sdmk-6', 'Pranata Laboratorium Kesehatan (ATLM)', 'Tenaga Biomedis & Lab', 'D3 / D4 Analis Kesehatan (A.Md.AK / S.Tr.Kes)', 3, 3, 1, 1, 0, 1, 0, 3, 0, 0, 0, 'Terpenuhi 100% (Lab Diagnostik & Skrining Darah)'),
('sdmk-7', 'Nutrisionis (Tenaga Gizi)', 'Tenaga Gizi', 'D3 / S1 Gizi (S.Gz / A.Md.Gz)', 3, 3, 2, 1, 0, 0, 0, 2, 0, 1, 0, 'Terpenuhi 100% (Konseling Gizi & Intervensi Stunting)'),
('sdmk-8', 'Sanitarian & Epidemiolog Kesehatan', 'Tenaga Kesmas & Lingkungan', 'S.KM / D3 Kesehatan Lingkungan', 3, 3, 2, 1, 0, 0, 0, 2, 0, 0, 1, 'Terpenuhi 100% (Surveilans P2P & Sanitasi Kepulauan)'),
('sdmk-9', 'Radiografer (Penata Rontgen)', 'Tenaga Keteknisian Medis', 'D3 / D4 Radiologi (A.Md.Rad)', 2, 2, 1, 1, 0, 0, 0, 2, 0, 0, 0, 'Terpenuhi 100% (Rontgen Digital & USG Diagnostik)'),
('sdmk-10', 'Perekam Medis & Informasi Kesehatan (RME)', 'Tenaga Keteknisian Medis', 'D3 Rekam Medis (A.Md.RMIK)', 3, 3, 1, 2, 0, 0, 0, 3, 0, 0, 0, 'Terpenuhi 100% (Integrasi SATUSEHAT & ePuskesmas)'),
('sdmk-11', 'Tenaga Administrasi, IT, Pengemudi & PJLP', 'Tenaga Administrasi & Penunjang', 'D3 / S1 Komputer / Manajemen / Sertifikat Pelaut', 8, 8, 2, 2, 1, 0, 3, 5, 1, 1, 1, 'Terpenuhi 100% (Dukungan Manajemen & Operasional)');

-- ------------------------------------------------------------------------------
-- 4. TABEL MORBIDITAS 10 BESAR PENYAKIT (kesehatan_10_penyakit)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `kesehatan_10_penyakit`;
CREATE TABLE `kesehatan_10_penyakit` (
  `id` VARCHAR(50) NOT NULL,
  `tahun` INT(11) NOT NULL DEFAULT 2026,
  `peringkat` INT(11) NOT NULL,
  `kode_icd10` VARCHAR(20) NOT NULL,
  `nama_penyakit` VARCHAR(200) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `jumlah_kasus` INT(11) NOT NULL DEFAULT 0,
  `kasus_pria` INT(11) NOT NULL DEFAULT 0,
  `kasus_wanita` INT(11) NOT NULL DEFAULT 0,
  `persentase` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `tren` ENUM('up','down','stable') NOT NULL DEFAULT 'stable',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kesehatan_10_penyakit` 
(`id`, `tahun`, `peringkat`, `kode_icd10`, `nama_penyakit`, `kategori`, `jumlah_kasus`, `kasus_pria`, `kasus_wanita`, `persentase`, `tren`) 
VALUES
('pny-2026-1', 2026, 1, 'J06.9', 'Infeksi Saluran Pernapasan Akut (ISPA)', 'Respirasi', 1420, 710, 710, 24.80, 'stable'),
('pny-2026-2', 2026, 2, 'I10', 'Hipertensi Primer (Esensial)', 'Kardiovaskular', 980, 420, 560, 17.10, 'up'),
('pny-2026-3', 2026, 3, 'E11', 'Diabetes Melitus Tipe 2', 'Endokrin / Metabolik', 640, 270, 370, 11.20, 'up'),
('pny-2026-4', 2026, 4, 'K29.7', 'Gastritis & Dispepsia', 'Gastrointestinal', 580, 260, 320, 10.10, 'stable'),
('pny-2026-5', 2026, 5, 'L23', 'Dermatitis Alergi & Infeksi Kulit Bahari', 'Dermatologi', 460, 280, 180, 8.00, 'down'),
('pny-2026-6', 2026, 6, 'M79.1', 'Mialgia / Nyeri Otot & Sendi Nelayan', 'Muskuloskeletal', 410, 310, 100, 7.20, 'stable'),
('pny-2026-7', 2026, 7, 'J00', 'Nasofaringitis Akut (Common Cold)', 'Respirasi', 390, 195, 195, 6.80, 'down'),
('pny-2026-8', 2026, 8, 'R50.9', 'Febris (Demam Tanpa Sebab Spesifik)', 'Gejala Umum', 310, 160, 150, 5.40, 'down'),
('pny-2026-9', 2026, 9, 'A09', 'Diare & Gastroenteritis Infeksius', 'Gastrointestinal', 280, 145, 135, 4.90, 'down'),
('pny-2026-10', 2026, 10, 'K02.9', 'Karies Gigi & Penyakit Pulpa', 'Kesehatan Gigi', 255, 120, 135, 4.50, 'stable');

-- ------------------------------------------------------------------------------
-- 5. TABEL KUNJUNGAN FASKES BULANAN (kesehatan_kunjungan_faskes)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `kesehatan_kunjungan_faskes`;
CREATE TABLE `kesehatan_kunjungan_faskes` (
  `id` VARCHAR(50) NOT NULL,
  `tahun` INT(11) NOT NULL DEFAULT 2026,
  `bulan` VARCHAR(50) NOT NULL,
  `bulan_index` INT(11) NOT NULL,
  `puskesmas_induk` INT(11) NOT NULL DEFAULT 0,
  `pustu_pari` INT(11) NOT NULL DEFAULT 0,
  `pustu_lancang` INT(11) NOT NULL DEFAULT 0,
  `pustu_untung_jawa` INT(11) NOT NULL DEFAULT 0,
  `poskes_payung` INT(11) NOT NULL DEFAULT 0,
  `total_kunjungan` INT(11) NOT NULL DEFAULT 0,
  `peserta_bpjs` INT(11) NOT NULL DEFAULT 0,
  `non_bpjs` INT(11) NOT NULL DEFAULT 0,
  `rujukan_rsud` INT(11) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kesehatan_kunjungan_faskes`
(`id`, `tahun`, `bulan`, `bulan_index`, `puskesmas_induk`, `pustu_pari`, `pustu_lancang`, `pustu_untung_jawa`, `poskes_payung`, `total_kunjungan`, `peserta_bpjs`, `non_bpjs`, `rujukan_rsud`)
VALUES
('kj-2026-01', 2026, 'Januari', 1, 1850, 480, 320, 610, 85, 3345, 3120, 225, 42),
('kj-2026-02', 2026, 'Februari', 2, 1790, 460, 310, 590, 78, 3228, 3010, 218, 38),
('kj-2026-03', 2026, 'Maret', 3, 1920, 510, 340, 640, 92, 3502, 3290, 212, 45),
('kj-2026-04', 2026, 'April', 4, 1880, 490, 330, 620, 88, 3408, 3195, 213, 40),
('kj-2026-05', 2026, 'Mei', 5, 2010, 540, 360, 680, 95, 3685, 3460, 225, 48),
('kj-2026-06', 2026, 'Juni', 6, 2150, 580, 390, 720, 105, 3945, 3710, 235, 52),
('kj-2026-07', 2026, 'Juli', 7, 2240, 610, 410, 750, 110, 4120, 3880, 240, 55),
('kj-2026-08', 2026, 'Agustus', 8, 2180, 590, 400, 730, 102, 4002, 3770, 232, 50);

-- ------------------------------------------------------------------------------
-- 6. TABEL FASILITAS PULAU (fasilitas_pulau)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `fasilitas_pulau`;
CREATE TABLE `fasilitas_pulau` (
  `id` VARCHAR(50) NOT NULL,
  `nama_pulau` VARCHAR(100) NOT NULL,
  `kelurahan` VARCHAR(100) NOT NULL,
  `jenis_faskes` VARCHAR(100) NOT NULL,
  `status_operasional` VARCHAR(100) NOT NULL,
  `alamat` LONGTEXT DEFAULT NULL,
  `kontak_telepon` VARCHAR(100) DEFAULT NULL,
  `whatsapp` VARCHAR(100) DEFAULT NULL,
  `kepala_pos` VARCHAR(150) DEFAULT NULL,
  `jumlah_nakes` INT(11) DEFAULT 0,
  `fasilitas_unggulan_json` JSON DEFAULT NULL,
  `gambar_url` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `fasilitas_pulau` (`id`, `nama_pulau`, `kelurahan`, `jenis_faskes`, `status_operasional`, `alamat`, `kontak_telepon`, `whatsapp`, `kepala_pos`, `jumlah_nakes`, `fasilitas_unggulan_json`, `gambar_url`) VALUES
('tidung', 'Pulau Tidung', 'Kelurahan Pulau Tidung', 'Puskesmas Kecamatan (Faskes Induk)', '24 Jam Non-Stop (Rawat Inap & IGD)', 'Dermaga Pulau Tidung, Jl. Pantai Selatan RT 007/RW 001', '(021) 7552-3010', '0859-6100-0003', 'dr. Ignatius Dendy Purnama', 41, '["Gedung Baru 2 Lantai 1.019 m²", "Rawat Inap Pria, Wanita & Anak", "Laboratorium Terpadu & Rontgen", "Dermaga Kapal Ambulans 24 Jam", "Ruang Bersalin (VK) 24 Jam"]', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'),
('untung_jawa', 'Pulau Untung Jawa', 'Kelurahan Pulau Untung Jawa', 'Puskesmas Kelurahan (Pustu)', 'Senin - Jumat (Siaga 24 Jam)', 'Jl. Sakura RT 002/RW 001, Pulau Untung Jawa', '0859-6100-0003', '0859-6100-0003', 'dr. Hendra Wijaya', 8, '["Poli Umum & Poli Gigi", "Ruang Tindakan & Stabilisasi", "Pelayanan KIA-KB & Imunisasi", "Ambulans Siaga Rujukan Cepat"]', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'),
('pari', 'Pulau Pari', 'Kelurahan Pulau Pari', 'Puskesmas Kelurahan (Pustu)', 'Senin - Jumat (Siaga 24 Jam)', 'Jl. Bahari RT 001/RW 002, Pulau Pari', '0859-6100-0003', '0859-6100-0003', 'dr. Rina Anggraini', 7, '["Poli Pengobatan Umum", "Ruang Bersalin & Konseling Gizi", "Farmasi Obat Esensial", "Pos Siaga Evakuasi Laut"]', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'),
('lancang', 'Pulau Lancang', 'Kelurahan Pulau Pari', 'Pos Kesehatan Pulau', 'Senin - Jumat (Siaga 24 Jam)', 'RT 003/RW 003, Pulau Lancang Besar', '0859-6100-0003', '0859-6100-0003', 'Ns. Asep Sunandar, S.Kep', 4, '["Pemeriksaan Kesehatan Dasar", "Persalinan Normal Siaga Bidan", "Penyuluhan & Imunisasi Balita"]', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80');

-- ------------------------------------------------------------------------------
-- 7. TABEL DOKUMEN PUBLIK (dokumen_publik)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `dokumen_publik`;
CREATE TABLE `dokumen_publik` (
  `id` VARCHAR(50) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `tanggal` DATE NOT NULL,
  `ukuran_berkas` VARCHAR(50) DEFAULT NULL,
  `tipe_berkas` VARCHAR(50) DEFAULT 'PDF',
  `url_berkas` VARCHAR(255) NOT NULL,
  `jumlah_unduhan` INT(11) DEFAULT 0,
  `deskripsi` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `jumlah_unduhan`, `deskripsi`) VALUES
('doc-standar-pelayanan', 'Dokumen Standar Pelayanan Publik Puskesmas Kepulauan Seribu Selatan', 'Informasi pelayanan', '2026-08-15', '480 KB', 'PDF / Drive', 'https://drive.google.com/file/d/1Gxi3_fT5c2a-hjM5S9BAzRdbybdMtq7Y/view?usp=sharing', 1450, 'Keputusan resmi standar persyaratan, mekanisme, tarif gratis BPJS/DKI, waktu respon IGD 24 jam, dan sarana fasilitas.'),
('doc-maklumat-pelayanan', 'Dokumen Maklumat Pelayanan Resmi Puskesmas Kepulauan Seribu Selatan', 'SOP publik', '2026-08-15', '320 KB', 'PDF / Drive', 'https://drive.google.com/file/d/1DFcUjFAhLsJuFs4pvv5WMtxnd651NXvS/view?usp=drive_link', 1820, 'Pernyataan kesanggupan resmi seluruh jajaran Puskesmas dalam menyelenggarakan pelayanan prima dan siap menerima sanksi apabila melanggar.'),
('doc-hak-kewajiban', 'Dokumen 12 Hak Pasien dan 4 Kewajiban Pasien Resmi', 'Informasi pelayanan', '2026-08-15', '390 KB', 'PDF / Drive', 'https://drive.google.com/file/d/1FwoMOjldKvUK6pXmDxSP0r-QfVvJcqXy/view?usp=sharing', 2310, 'Pedoman hak-hak pasien dalam memperoleh pelayanan medis yang manusiawi, adil, bermutu, serta 4 kewajiban pasien saat berobat.'),
('doc-struktur-pergub14', 'Dokumen Bagan Struktur Organisasi Pergub DKI No. 14 Puskesmas Kepulauan Seribu Selatan', 'Informasi pelayanan', '2026-08-15', '540 KB', 'PDF / Drive', 'https://drive.google.com/file/d/1IMRc04HIo3QhOGZXbRHUlQ-P1dRGusZN/view?usp=sharing', 2240, 'Bagan dan tata kerja struktur organisasi Puskesmas Kepulauan Seribu Selatan berdasarkan Peraturan Gubernur Provinsi DKI Jakarta Nomor 14.'),
('doc-struktur-ilp', 'Dokumen Struktur Organisasi Integrasi Layanan Primer (ILP) 2026', 'Tata kelola', '2026-08-15', '510 KB', 'PDF / Drive', 'https://drive.google.com/file/d/1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W/view?usp=sharing', 1980, 'SK Tim Kerja 5 Klaster Integrasi Layanan Primer (ILP) berdasarkan Kepmenkes RI No. 2014/2023.');

SET FOREIGN_KEY_CHECKS = 1;
-- ==============================================================================
-- AKHIR DARI FILE SQL PUSKESMAS KEPULAUAN SERIBU SELATAN (HOSTINGER)
-- ==============================================================================
