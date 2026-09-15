-- ==============================================================================
-- DATABASE SQL RESMI PUSKESMAS KECAMATAN KEPULAUAN SERIBU SELATAN
-- Target Hosting: cPanel Niagahoster (MySQL 5.7+ / MySQL 8.0+ / MariaDB)
-- Dibuat Otomatis & Teruji untuk Lingkungan Produksi & phpMyAdmin
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
  `password_hash` VARCHAR(255) NOT NULL COMMENT 'Bcrypt / hash kata sandi',
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
  NULL,
  'Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami',
  'dr. Ignatius Dendy Purnama',
  'Kepala Puskesmas Kecamatan Kepulauan Seribu Selatan',
  '198503222010012031',
  '/assets/kepala-puskesmas.svg',
  'Assalamu''alaikum Wr. Wb.

Puji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas segala rahmat dan karunia-Nya sehingga kita dapat menjalankan tugas pelayanan kesehatan kepada masyarakat dengan sebaik-baiknya.

Selamat datang di website resmi Puskesmas Kepulauan Seribu Selatan. Website ini merupakan salah satu media informasi dan komunikasi kami kepada masyarakat dalam rangka meningkatkan transparansi dan akuntabilitas pelayanan publik.

Puskesmas Kepulauan Seribu Selatan berkomitmen untuk memberikan pelayanan kesehatan yang berkualitas, profesional, dan terjangkau bagi seluruh masyarakat di wilayah kerja kami. Kami terus berupaya meningkatkan kualitas pelayanan melalui peningkatan kompetensi sumber daya manusia, perbaikan sarana dan prasarana, serta penerapan sistem manajemen mutu.

Kami menyadari bahwa kesehatan merupakan investasi berharga bagi setiap individu dan masyarakat. Oleh karena itu, kami mengajak seluruh masyarakat untuk berpartisipasi aktif dalam menjaga dan meningkatkan status kesehatan melalui perilaku hidup bersih dan sehat serta pemanfaatan fasilitas pelayanan kesehatan yang tersedia.

Akhir kata, kami mengucapkan terima kasih atas kepercayaan yang diberikan kepada Puskesmas Kepulauan Seribu Selatan. Kritik dan saran dari masyarakat sangat kami harapkan demi perbaikan pelayanan kesehatan di masa mendatang.

Wassalamu''alaikum Wr. Wb.

Kepala Puskesmas Kepulauan Seribu Selatan

dr. Ignatius Dendy Purnama
NIP. 198503222010012031',
  'Menjadi Puskesmas Terdepan dalam mewujudkan pelayanan PRIMA menuju Kecamatan Kepulauan Seribu Selatan Sehat.',
  NULL,
  '[{"code":"P","title":"Profesional","desc":"Bekerja dengan integritas tinggi, kompeten, dan senantiasa berpedoman pada standar operasional prosedur (SOP) profesi medis.","detail":"Menjunjung tinggi kode etik profesi kesehatan, memperbarui keilmuan berkala, dan mengutamakan keselamatan pasien (patient safety)."},{"code":"R","title":"Ramah","desc":"Memberikan pelayanan dengan senyum, salam, sapa, sopan, dan santun serta kepedulian yang tulus kepada pasien dan keluarga.","detail":"Membangun komunikasi terapeutik yang menenangkan, berempati terhadap kesulitan warga pulau, dan bersikap inklusif."},{"code":"I","title":"Inovatif","desc":"Mampu beradaptasi secara kreatif menciptakan terobosan layanan kesehatan maritim terpadu dan kemudahan akses publik.","detail":"Memanfaatkan digitalisasi rekam medis (RME), penjangkauan home care kepulauan, dan edukasi kesehatan kreatif pesisir."},{"code":"M","title":"Melayani","desc":"Menempatkan kebutuhan dan kepuasan masyarakat pesisir sebagai prioritas utama dengan kesungguhan hati.","detail":"Cepat tanggap merespons keluhan, memberikan solusi terbaik, dan memastikan tidak ada warga pulau yang tertinggal dalam layanan."},{"code":"A","title":"Akuntabel","desc":"Bertanggung jawab atas setiap tindakan medis, tata kelola fasilitas, dan keterbukaan informasi kepada masyarakat.","detail":"Setiap proses pelayanan, pelaporan, dan penggunaan anggaran dapat dipertanggungjawabkan secara transparan dan berlandaskan hukum."}]',
  'Dermaga Pulau Tidung, Jl. Pantai Selatan RT 007/RW 001, Kelurahan Pulau Tidung, Kecamatan Kepulauan Seribu Selatan, Kabupaten Administrasi Kepulauan Seribu, Provinsi DKI Jakarta 14520',
  '(021) 7552-3010 / 0859-6100-0003',
  '0859-6100-0003',
  'puskesmasseribuselatan@jakarta.go.id',
  '119 / 0859-6100-0003',
  '0859-6100-0003 (24 Jam Non-Stop)',
  'Senin: 12.00 - 18.00 WIB | Selasa - Kamis: 07.30 - 16.00 WIB | Jumat: 07.30 - 16.30 WIB (Kepgub DKI No. 755/2024)',
  'Wilayah kerja Puskesmas Kepulauan Seribu Selatan mencakup 3 kelurahan administratif yaitu Kelurahan Pulau Tidung, Kelurahan Pulau Pari, dan Kelurahan Pulau Untung Jawa, melayani pulau-pulau berpenghuni meliputi Pulau Tidung, Pulau Pari, Pulau Lancang, Pulau Untung Jawa, dan Pulau Payung dengan jejaring 2 Puskesmas Kelurahan dan 2 Pos Kesehatan terintegrasi.',
  -5.801642,
  106.524388
);

-- ------------------------------------------------------------------------------
-- 3. TABEL FASILITAS & FASKES PULAU (fasilitas_pulau)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `fasilitas_pulau`;
CREATE TABLE `fasilitas_pulau` (
  `id` VARCHAR(50) NOT NULL,
  `nama_pulau` VARCHAR(100) NOT NULL,
  `kelurahan` VARCHAR(100) DEFAULT NULL,
  `jenis_faskes` VARCHAR(100) NOT NULL,
  `status_operasional` VARCHAR(50) NOT NULL DEFAULT 'Buka 24 Jam',
  `alamat` LONGTEXT DEFAULT NULL,
  `kontak_telepon` VARCHAR(100) DEFAULT NULL,
  `whatsapp` VARCHAR(100) DEFAULT NULL,
  `kepala_pos` VARCHAR(150) DEFAULT NULL,
  `foto_url` VARCHAR(255) DEFAULT NULL,
  `koordinat_lat` DECIMAL(10,7) DEFAULT NULL,
  `koordinat_lng` DECIMAL(10,7) DEFAULT NULL,
  `deskripsi` LONGTEXT DEFAULT NULL,
  `layanan_json` JSON DEFAULT NULL,
  `aktif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `fasilitas_pulau` (`id`, `nama_pulau`, `kelurahan`, `jenis_faskes`, `status_operasional`, `alamat`, `kontak_telepon`, `whatsapp`, `kepala_pos`, `foto_url`, `koordinat_lat`, `koordinat_lng`, `deskripsi`, `layanan_json`, `aktif`) VALUES (
  'puskesmas-induk',
  'Puskesmas Kepulauan Seribu Selatan',
  NULL,
  NULL,
  NULL,
  'Dermaga Pulau Tidung, Jl. Pantai Selatan RT 007/RW 001, Kelurahan Pulau Tidung',
  '(021) 7552-3010',
  '0859-6100-0003',
  NULL,
  NULL,
  -5.7997,
  106.5235,
  'Pusat pelayanan kesehatan induk kecamatan berlokasi strategis di Dermaga Pulau Tidung dengan fasilitas gedung baru representatif, poliklinik rawat jalan terintegrasi, rawat inap 24 jam, dan pelayanan persalinan.',
  '["Pelayanan Umum","Pelayanan Gigi","Pelayanan KIA (Kesehatan Ibu & Anak)","Pelayanan Imunisasi","Pelayanan TB (Tuberkulosis)","Pelayanan MTBS (Manajemen Terpadu Balita Sakit)","Pelayanan Gizi","Pelayanan Lansia","Pelayanan Keswa (Kesehatan Jiwa)","Pelayanan Rawat Inap — 24 Jam","Pelayanan Siaga — 24 Jam","Pelayanan Ruang Bersalin — 24 Jam","Pelayanan Gawat Darurat — 24 Jam"]',
  1
);
INSERT INTO `fasilitas_pulau` (`id`, `nama_pulau`, `kelurahan`, `jenis_faskes`, `status_operasional`, `alamat`, `kontak_telepon`, `whatsapp`, `kepala_pos`, `foto_url`, `koordinat_lat`, `koordinat_lng`, `deskripsi`, `layanan_json`, `aktif`) VALUES (
  'pustu-lancang',
  'Pustu Pulau Lancang',
  NULL,
  NULL,
  NULL,
  'Kompleks Pemukiman Warga, RW 01, Kelurahan Pulau Pari',
  '0859-6100-0003',
  '0859-6100-0003',
  NULL,
  NULL,
  -5.8792,
  106.5911,
  'Puskesmas Pembantu di Pulau Lancang melayani masyarakat nelayan dan keluarga pulau dengan pelayanan rawat jalan terpadu, posyandu siklus hidup, dan siaga 24 jam.',
  '["Pelayanan Umum","Pelayanan KIA & KB","Pelayanan Imunisasi","Pelayanan Gizi & Lansia","Pelayanan MTBS & Balita","Pelayanan Siaga — 24 Jam"]',
  1
);
INSERT INTO `fasilitas_pulau` (`id`, `nama_pulau`, `kelurahan`, `jenis_faskes`, `status_operasional`, `alamat`, `kontak_telepon`, `whatsapp`, `kepala_pos`, `foto_url`, `koordinat_lat`, `koordinat_lng`, `deskripsi`, `layanan_json`, `aktif`) VALUES (
  'pustu-pari',
  'Pustu Pulau Pari',
  NULL,
  NULL,
  NULL,
  'Jl. Dermaga Utama, RT 01/RW 04, Kelurahan Pulau Pari',
  '0859-6100-0003',
  '0859-6100-0003',
  NULL,
  NULL,
  -5.8611,
  106.6186,
  'Puskesmas Pembantu di Pulau Pari melayani kesehatan warga pesisir serta pengunjung dan wisatawan bahari Pantai Pasir Perawan.',
  '["Pelayanan Umum","Pelayanan KIA & KB","Pelayanan Imunisasi","Pelayanan Gizi & MTBS","Pelayanan Lansia & PTM","Pelayanan Siaga — 24 Jam"]',
  1
);
INSERT INTO `fasilitas_pulau` (`id`, `nama_pulau`, `kelurahan`, `jenis_faskes`, `status_operasional`, `alamat`, `kontak_telepon`, `whatsapp`, `kepala_pos`, `foto_url`, `koordinat_lat`, `koordinat_lng`, `deskripsi`, `layanan_json`, `aktif`) VALUES (
  'pustu-untung-jawa',
  'Pustu Pulau Untung Jawa',
  NULL,
  NULL,
  NULL,
  'Jl. Sakura No. 12, RW 02, Kelurahan Pulau Untung Jawa',
  '0859-6100-0003',
  '0859-6100-0003',
  NULL,
  NULL,
  -5.9774,
  106.7058,
  'Puskesmas Pembantu di Pulau Untung Jawa, pintu gerbang pariwisata bahari terdekat dengan daratan Tangerang dan Jakarta Utara.',
  '["Pelayanan Umum","Pelayanan Gigi","Pelayanan KIA & Anak","Pelayanan Imunisasi","Pelayanan Lansia & Gizi","Pelayanan Siaga — 24 Jam"]',
  1
);

-- ------------------------------------------------------------------------------
-- 4. TABEL LAYANAN KESEHATAN & POLIKLINIK (layanan_poliklinik)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `layanan_poliklinik`;
CREATE TABLE `layanan_poliklinik` (
  `id` VARCHAR(50) NOT NULL,
  `nama_layanan` VARCHAR(150) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `klaster_id` VARCHAR(50) DEFAULT NULL,
  `deskripsi` LONGTEXT DEFAULT NULL,
  `jadwal` VARCHAR(150) DEFAULT NULL,
  `biaya` VARCHAR(100) NOT NULL DEFAULT 'Gratis (KTP DKI / BPJS)',
  `persyaratan_json` JSON DEFAULT NULL,
  `alur_json` JSON DEFAULT NULL,
  `kontak` VARCHAR(100) DEFAULT NULL,
  `icon_name` VARCHAR(50) DEFAULT 'Stethoscope',
  `populer` TINYINT(1) NOT NULL DEFAULT 0,
  `urutan` INT(11) NOT NULL DEFAULT 0,
  `aktif` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-1',
  'Pendaftaran & Rekam Medis Elektronik',
  'Dalam Gedung',
  'klaster-1',
  'Pelayanan registrasi pasien baru dan lama menggunakan sistem online/offline terhubung SatuSehat Kemenkes dan BPJS Kesehatan Mobile JKN.',
  'Senin - Jumat: 07.30 - 14.00 WIB',
  'Gratis bagi peserta BPJS Kesehatan / Warga DKI Jakarta ber-KTP',
  '["KTP / Kartu Keluarga","Kartu BPJS Kesehatan / KIS (bila ada)","Buku KIA bagi ibu hamil/anak"]',
  '["Ambil nomor antrean","Loket pendaftaran & verifikasi data","Menuju ruang tunggu poli/klaster tujuan"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'ClipboardList',
  1,
  1,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-2',
  'Pemeriksaan Dokter Umum',
  'Dalam Gedung',
  'klaster-3',
  'Pemeriksaan kesehatan menyeluruh, diagnosa penyakit akut dan kronis, penatalaksanaan medis, dan rujukan terarah.',
  'Senin - Jumat: 08.00 - 15.00 WIB',
  'Gratis (BPJS) / Sesuai Perda Retribusi Daerah',
  '["Kartu identitas","Kartu BPJS","Nomor rekam medis"]',
  '["Skrining tanda vital","Konsultasi & pemeriksaan dokter","Tindakan/Pemeriksaan penunjang","Resep obat farmasi"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Stethoscope',
  1,
  2,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-3',
  'Kesehatan Ibu dan Anak (KIA / KB)',
  'Dalam Gedung',
  'klaster-2',
  'Pemeriksaan kehamilan terpadu (ANC), USG dasar, pasca salin, pelayanan KB, dan kesehatan reproduksi wanita.',
  'Senin - Jumat: 08.00 - 14.30 WIB',
  'Gratis bagi peserta BPJS Kesehatan',
  '["Buku KIA (Pink)","KTP & BPJS","Buku nikah (bagi catin)"]',
  '["Penimbangan & tensi","Pemeriksaan fisik oleh bidan/dokter","Pemeriksaan laboratorium lab triple eliminasi","Konseling gizi & edukasi"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'HeartHandshake',
  1,
  3,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-4',
  'Pelayanan Imunisasi Bayi & Anak',
  'Dalam Gedung',
  'klaster-2',
  'Pemberian vaksinasi program nasional lengkap mulai dari BCG, Polio, DPT-HB-Hib, PCV, Rotavirus, Campak-Rubella, hingga HPV.',
  'Setiap Selasa & Kamis: 08.30 - 12.00 WIB',
  'Gratis (Program Pemerintah)',
  '["Buku KIA / Kartu Imunisasi","KTP Orang Tua / KK","Anak dalam kondisi sehat"]',
  '["Skrining suhu & kelayakan vaksin","Penyuntikan vaksin oleh petugas","Observasi pasca imunisasi 15 menit"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Syringe',
  1,
  4,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-5',
  'Kesehatan Gigi dan Mulut',
  'Dalam Gedung',
  'lintas-klaster',
  'Pemeriksaan kesehatan gigi, pembersihan karang gigi (scaling ringan), penambalan gigi, pencabutan gigi sulung/tetap sederhana, dan edukasi kebersihan gigi.',
  'Senin - Jumat: 08.00 - 14.00 WIB',
  'Gratis bagi peserta BPJS Kesehatan',
  '["KTP & Kartu BPJS","Buku rekam medis Puskesmas"]',
  '["Pemeriksaan intraoral gigi","Tindakan medis gigi","Edukasi perawatan gigi & peresepan"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Smile',
  0,
  5,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-6',
  'Laboratorium Medis',
  'Dalam Gedung',
  'lintas-klaster',
  'Pemeriksaan diagnostik darah lengkap, urine rutin, glukosa, asam urat, kolesterol, tes kehamilan, TCM dahak TBC, malaria, dan rapid test.',
  'Senin - Jumat: 08.00 - 14.30 WIB',
  'Gratis dengan rujukan dokter Puskesmas (BPJS)',
  '["Formulir permintaan lab dari dokter Puskesmas","Puasa 8-10 jam (khusus cek gula darah puasa & lipid)"]',
  '["Penyerahan formulir lab","Pengambilan sampel darah/urin/dahak","Tunggu hasil analisa laboratorium"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'FlaskConical',
  1,
  6,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-7',
  'Farmasi & Pelayanan Informasi Obat',
  'Dalam Gedung',
  'lintas-klaster',
  'Penyediaan obat-obatan esensial bermutu, peracikan resep dokter, rekonsiliasi obat, dan konseling penggunaan obat yang benar.',
  'Senin - Jumat: 08.00 - 16.00 WIB | Kedaruratan 24 Jam',
  'Gratis untuk seluruh pasien BPJS terdaftar',
  '["Lembar resep resmi dokter Puskesmas"]',
  '["Penyerahan resep","Skrining farmasi & peracikan","Penyerahan obat disertai Penjelasan Informasi Obat (PIO)"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Pill',
  0,
  7,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-8',
  'Pelayanan Penyakit Tidak Menular & Lansia',
  'Dalam Gedung',
  'klaster-3',
  'Poli khusus terpadu bagi pasien hipertensi, diabetes melitus, penyakit jantung, dan lansia dengan fasilitas ramah geriatri.',
  'Senin, Rabu, Jumat: 08.00 - 14.00 WIB',
  'Gratis bagi peserta BPJS Kesehatan',
  '["Buku Prolanis / KTP & BPJS"]',
  '["Pemeriksaan antropometri & tekanan darah","Konsultasi dokter spesialis/umum","Pemberian obat kronis 30 hari"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Accessibility',
  0,
  8,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-9',
  'Konseling Terpadu (Gizi, Sanitasi & Jiwa)',
  'Dalam Gedung',
  'lintas-klaster',
  'Layanan konsultasi dietetik gizi, pencegahan stunting, penilaian sanitasi rumah sehat, dan pendampingan konseling kesehatan mental.',
  'Senin - Kamis: 09.00 - 14.00 WIB',
  'Gratis',
  '["Rujukan internal klaster / inisiatif mandiri"]',
  '["Pengkajian awal","Sesi konseling mendalam","Pemberian rencana tindak lanjut mandiri"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'MessageSquare',
  0,
  9,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-10',
  'Instalasi Gawat Darurat (IGD) 24 Jam & PONED',
  'Dalam Gedung',
  'lintas-klaster',
  'Pertolongan pertama pada kondisi gawat darurat medis, kecelakaan laut, sengatan biota laut, trauma fisik, stabilisasi pasien, dan persalinan 24 jam.',
  '24 Jam Non-Stop Setiap Hari',
  'Ditanggung BPJS / Kedaruratan Publik',
  '["Segera bawa pasien ke IGD (Administrasi menyusul)"]',
  '["Triase kegawatdaruratan","Tindakan penyelamatan jiwa / resusitasi","Observasi di ruang rawat sementara atau persiapan rujukan kapal"]',
  'Hotline IGD: 0813-[DATA AKAN DIISI ADMIN]',
  'Ambulance',
  1,
  10,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-11',
  'Posyandu Integrasi Layanan Primer (ILP)',
  'Luar Gedung',
  'klaster-2',
  'Pelayanan posyandu siklus hidup di setiap RW pulau untuk bayi, balita, remaja, dewasa, hingga lansia dalam satu hari terpadu.',
  'Sesuai jadwal bulanan RW di masing-masing pulau',
  'Gratis untuk seluruh masyarakat',
  '["Membawa Buku KIA / KTP","Datang ke balai warga / pos posyandu pulau"]',
  '["Pendaftaran","Penimbangan & Pengukuran","Pencatatan","Pelayanan Kesehatan & Imunisasi","Penyuluhan & PMT"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Users2',
  1,
  11,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-12',
  'Kunjungan Rumah (Home Care / PIS-PK)',
  'Luar Gedung',
  'klaster-3',
  'Kunjungan tenaga kesehatan ke rumah warga untuk pemantauan lansia tirah baring, pasien pasca rawat inap, penderita TBC, dan ibu nifas berisiko.',
  'Setiap Hari Selasa & Kamis Sore',
  'Gratis',
  '["Hasil skrining atau laporan kader kesehatan"]',
  '["Penjadwalan tim medis","Kunjungan langsung ke rumah warga","Pemeriksaan & pemberian edukasi keluarga"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Home',
  0,
  12,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-13',
  'Pembinaan & Gerakan Masyarakat Hidup Sehat (GERMAS)',
  'Luar Gedung',
  'lintas-klaster',
  'Aktivitas fisik senam bersama di tepi pantai, edukasi makan buah dan sayur, kampanye tidak merokok, dan pemeriksaan kesehatan berkala.',
  'Setiap Jumat Pagi di Lapangan Pulau',
  'Gratis',
  '["Terbuka untuk seluruh warga dan komunitas"]',
  '["Hadir di lokasi kegiatan publik pulau","Mengikuti rangkaian senam & pemeriksaan"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Footprints',
  0,
  13,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-14',
  'Skrining Kesehatan Pesisir & Nelayan',
  'Luar Gedung',
  'klaster-3',
  'Deteksi dini faktor risiko penyakit pada kelompok nelayan, penyelam tradisional, pekerja kapal, dan pedagang di dermaga pulau.',
  'Terjadwal bulanan di dermaga utama',
  'Gratis',
  '["KTP / Identitas diri"]',
  '["Pemeriksaan di pos dermaga","Pemeriksaan pendengaran, tensi, dan gula darah","Konseling keselamatan kerja melaut"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Anchor',
  0,
  14,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-15',
  'Surveilans Vektor & Jumantik Pulau',
  'Luar Gedung',
  'klaster-4',
  'Pemeriksaan jentik berkala di rumah warga, bak mandi penampungan air hujan, dan lingkungan pesisir untuk mencegah penularan DBD.',
  'Setiap Jumat Pagi (Jumantik Mandiri)',
  'Gratis',
  '["Kesiapan warga menerima kunjungan kader"]',
  '["Pemeriksaan tempat perindukan nyamuk","Pemberian abate & edukasi 3M Plus"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'Bug',
  0,
  15,
  1
);
INSERT INTO `layanan_poliklinik` (`id`, `nama_layanan`, `kategori`, `klaster_id`, `deskripsi`, `jadwal`, `biaya`, `persyaratan_json`, `alur_json`, `kontak`, `icon_name`, `populer`, `urutan`, `aktif`) VALUES (
  'srv-16',
  'Usaha Kesehatan Sekolah (UKS) & Skrining Anak',
  'Luar Gedung',
  'klaster-2',
  'Pemeriksaan berkala ketajaman penglihatan, pendengaran, kebersihan gigi, status gizi anak di SD, SMP, dan SMA di Kepulauan Seribu Selatan.',
  'Awal tahun ajaran & semester genap',
  'Gratis',
  '["Siswa terdaftar di sekolah setempat"]',
  '["Pemeriksaan terstruktur oleh tim dokter kecil dan nakes Puskesmas"]',
  '0812-[DATA AKAN DIISI ADMIN]',
  'GraduationCap',
  0,
  16,
  1
);

-- ------------------------------------------------------------------------------
-- 5. TABEL INTEGRASI LAYANAN PRIMER / ILP (klaster_ilp)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `klaster_ilp`;
CREATE TABLE `klaster_ilp` (
  `id` VARCHAR(50) NOT NULL,
  `nomor_klaster` INT(11) NOT NULL,
  `judul_klaster` VARCHAR(150) NOT NULL,
  `sasaran_siklus_hidup` VARCHAR(200) NOT NULL,
  `koordinator` VARCHAR(150) DEFAULT NULL,
  `warna` VARCHAR(50) DEFAULT 'sky',
  `deskripsi` LONGTEXT DEFAULT NULL,
  `ruang_lingkup_json` JSON DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `klaster_ilp` (`id`, `nomor_klaster`, `judul_klaster`, `sasaran_siklus_hidup`, `koordinator`, `warna`, `deskripsi`, `ruang_lingkup_json`) VALUES (
  'klaster-1',
  1,
  'Klaster 1: Manajemen',
  NULL,
  NULL,
  'from-blue-600 to-indigo-700',
  'Klaster 1 bertanggung jawab atas perencanaan terpadu, administrasi faskes, manajemen kepegawaian nakes di pulau-pulau, keuangan, pengadaan logistik obat/alat kesehatan bahari, manajemen mutu, keselamatan pasien, serta monitoring evaluasi berkala.',
  NULL
);
INSERT INTO `klaster_ilp` (`id`, `nomor_klaster`, `judul_klaster`, `sasaran_siklus_hidup`, `koordinator`, `warna`, `deskripsi`, `ruang_lingkup_json`) VALUES (
  'klaster-2',
  2,
  'Klaster 2: Ibu dan Anak',
  NULL,
  NULL,
  'from-pink-500 to-rose-600',
  'Klaster 2 menyelenggarakan pelayanan komprehensif bagi siklus hidup ibu dan anak, mulai dari calon pengantin, pemeriksaan kehamilan (ANC terpadu), persalinan aman 24 jam, perawatan nifas, kesehatan bayi baru lahir, imunisasi dasar lengkap, pemantauan tumbuh kembang balita bebas stunting, hingga kesehatan remaja.',
  NULL
);
INSERT INTO `klaster_ilp` (`id`, `nomor_klaster`, `judul_klaster`, `sasaran_siklus_hidup`, `koordinator`, `warna`, `deskripsi`, `ruang_lingkup_json`) VALUES (
  'klaster-3',
  3,
  'Klaster 3: Usia Dewasa & Lansia',
  NULL,
  NULL,
  'from-emerald-600 to-teal-700',
  'Klaster 3 memprioritaskan pelayanan promotif, preventif, kuratif, dan rehabilitatif bagi penduduk usia produktif (15-59 tahun) dan lanjut usia (≥60 tahun). Fokus pada pencegahan dan pengendalian Penyakit Tidak Menular (hipertensi, diabetes melitus, jantung, stroke, kanker), kesehatan kerja nelayan, kesehatan jiwa, serta pelayanan santun lansia.',
  NULL
);
INSERT INTO `klaster_ilp` (`id`, `nomor_klaster`, `judul_klaster`, `sasaran_siklus_hidup`, `koordinator`, `warna`, `deskripsi`, `ruang_lingkup_json`) VALUES (
  'klaster-4',
  4,
  'Klaster 4: Penanggulangan Penyakit Menular',
  NULL,
  NULL,
  'from-amber-600 to-orange-600',
  'Klaster 4 bertugas melakukan pencegahan, penemuan kasus dini, pengobatan tuntas, penyelidikan epidemiologi cepat, surveilans aktif kejadian luar biasa (KLB), dan pengendalian vektor penyakit menular (nyamuk Aedes aegypti, malaria, jentik) di pulau-pulau pemukiman.',
  NULL
);
INSERT INTO `klaster_ilp` (`id`, `nomor_klaster`, `judul_klaster`, `sasaran_siklus_hidup`, `koordinator`, `warna`, `deskripsi`, `ruang_lingkup_json`) VALUES (
  'lintas-klaster',
  Lintas,
  'Lintas Klaster: Pelayanan Penunjang',
  NULL,
  NULL,
  'from-cyan-600 to-blue-700',
  'Unit Lintas Klaster memberikan dukungan diagnostik, terapi farmasi, gizi klinis, penyehatan sanitasi air/lingkungan pulau, rekam medis elektronik (RME), serta sistem rujukan gawat darurat 24 jam dengan armada Kapal Ambulans Laut terpadu.',
  NULL
);

-- ------------------------------------------------------------------------------
-- 6. TABEL JADWAL PELAYANAN DOKTER (jadwal_pelayanan)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `jadwal_pelayanan`;
CREATE TABLE `jadwal_pelayanan` (
  `id` VARCHAR(50) NOT NULL,
  `nama_layanan` VARCHAR(150) NOT NULL,
  `faskes_pulau` VARCHAR(100) NOT NULL,
  `hari` VARCHAR(100) NOT NULL,
  `jam_layanan` VARCHAR(100) NOT NULL,
  `dokter_petugas` VARCHAR(150) NOT NULL,
  `kuota` INT(11) NOT NULL DEFAULT 30,
  `keterangan` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-1',
  'Pemeriksaan Umum & Lansia',
  'Puskesmas Pulau Tidung',
  'Senin',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-2',
  'Poli KIA & ANC Terpadu',
  'Pustu Pulau Pari & Untung Jawa',
  'Senin',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-3',
  'Imunisasi Rutin Bayi & Baduta',
  'Puskesmas Tidung & Seluruh Pustu',
  'Selasa',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-4',
  'Poli Gigi & Mulut',
  'Puskesmas Pulau Tidung',
  'Selasa',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-5',
  'Pelayanan Prolanis & Skrining PTM',
  'Puskesmas Pulau Tidung & Pustu Lancang',
  'Rabu',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-6',
  'Poli TB DOTS & Konseling VCT',
  'Puskesmas Pulau Tidung',
  'Rabu',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-7',
  'USG Ibu Hamil & Konsultasi Dokter',
  'Puskesmas Pulau Tidung',
  'Kamis',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-8',
  'Kunjungan Home Care Lansia Pesisir',
  'Pulau Pari & Pulau Payung',
  'Kamis',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-9',
  'Senam GERMAS & Konseling Gizi/Sanitasi',
  'Halaman Puskesmas Tidung & Pustu Untung Jawa',
  'Jumat',
  NULL,
  NULL,
  undefined,
  NULL
);
INSERT INTO `jadwal_pelayanan` (`id`, `nama_layanan`, `faskes_pulau`, `hari`, `jam_layanan`, `dokter_petugas`, `kuota`, `keterangan`) VALUES (
  'sch-10',
  'IGD 24 Jam, Persalinan & Ambulans Laut',
  'Puskesmas Induk & Dermaga Utama',
  'Setiap Hari (Senin - Minggu)',
  NULL,
  NULL,
  undefined,
  NULL
);

-- ------------------------------------------------------------------------------
-- 7. TABEL BERITA & KEGIATAN KESEHATAN (berita_kegiatan)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `berita_kegiatan`;
CREATE TABLE `berita_kegiatan` (
  `id` VARCHAR(50) NOT NULL,
  `judul` VARCHAR(255) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `ringkasan` LONGTEXT DEFAULT NULL,
  `konten` LONGTEXT NOT NULL,
  `penulis` VARCHAR(100) NOT NULL,
  `tanggal` DATE NOT NULL,
  `foto_url` VARCHAR(255) DEFAULT NULL,
  `dibaca` INT(11) NOT NULL DEFAULT 0,
  `tags_json` JSON DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `berita_kegiatan` (`id`, `judul`, `kategori`, `ringkasan`, `konten`, `penulis`, `tanggal`, `foto_url`, `dibaca`, `tags_json`) VALUES (
  'news-1',
  'Penerapan Integrasi Layanan Primer (ILP) di Seluruh Pustu Kepulauan Seribu Selatan',
  'ILP',
  'Transformasi pelayanan kesehatan primer kini menjangkau seluruh pulau permukiman dengan pendekatan siklus hidup terintegrasi.',
  'Puskesmas Kepulauan Seribu Selatan resmi mengoptimalkan implementasi Integrasi Layanan Primer (ILP) di 5 pulau wilayah kerja. Langkah ini merupakan bagian dari transformasi kesehatan Kemenkes RI yang mengelompokkan layanan menjadi 4 klaster utama dan 1 lintas klaster untuk memastikan masyarakat mulai dari ibu hamil, balita, remaja, dewasa hingga lansia mendapatkan pemantauan kesehatan proaktif.',
  'Tim Humas Puskesmas',
  '2026-08-25',
  NULL,
  0,
  NULL
);
INSERT INTO `berita_kegiatan` (`id`, `judul`, `kategori`, `ringkasan`, `konten`, `penulis`, `tanggal`, `foto_url`, `dibaca`, `tags_json`) VALUES (
  'news-2',
  'Kesiapsiagaan Kapal Ambulans Laut Terpadu Hadapi Kondisi Cuaca dan Rujukan Pasien Pesisir',
  'Kegiatan Puskesmas',
  'Armada ambulans laut Puskesmas Kepulauan Seribu Selatan dilengkapi fasilitas penanganan medis darurat berstandar tinggi.',
  'Untuk memastikan tidak ada keterlambatan penanganan pasien darurat di pulau, Puskesmas Kepulauan Seribu Selatan terus melakukan pemeliharaan rutin dan pelatihan simulasi evakuasi medis laut. Dilengkapi tabung oksigen, AED, brankar khusus, dan navigasi radar, kapal ambulans laut ini beroperasi 24 jam penuh untuk menghubungkan pulau-pulau dengan rumah sakit rujukan di darat.',
  'Koordinator Pelayanan Rujukan',
  '2026-08-20',
  NULL,
  0,
  NULL
);
INSERT INTO `berita_kegiatan` (`id`, `judul`, `kategori`, `ringkasan`, `konten`, `penulis`, `tanggal`, `foto_url`, `dibaca`, `tags_json`) VALUES (
  'news-3',
  'Gebyar Posyandu Siklus Hidup dan Pemberian Makanan Tambahan Berbasis Ikan Segar',
  'Posyandu',
  'Kader posyandu di Pulau Untung Jawa dan Pulau Pari memanfaatkan kekayaan laut untuk mencegah stunting pada balita.',
  'Inovasi menu PMT berbahan dasar ikan laut segar kaya Omega-3 diperkenalkan pada Posyandu Balita bulan ini. Selain penimbangan dan imunisasi lengkap, para orang tua mendapatkan edukasi pengolahan makanan bergizi untuk mencetak generasi cerdas bebas stunting di wilayah kepulauan.',
  'Pokja Gizi & KIA',
  '2026-08-15',
  NULL,
  0,
  NULL
);
INSERT INTO `berita_kegiatan` (`id`, `judul`, `kategori`, `ringkasan`, `konten`, `penulis`, `tanggal`, `foto_url`, `dibaca`, `tags_json`) VALUES (
  'news-4',
  'Skrining Penyakit Tidak Menular (PTM) Massal Bagi Nelayan dan Pelaku Wisata Bahari',
  'Program',
  'Ratusan nelayan dan pengemudi perahu wisata mendapatkan pemeriksaan tensi, gula darah, dan kolesterol gratis.',
  'Tim Klaster 3 Puskesmas mengadakan skrining kesehatan mobile di dermaga Pulau Tidung dan Pulau Pari. Mengingat tingginya aktivitas fisik dan risiko dehidrasi serta kebiasaan merokok pada profesi pelaut, deteksi dini hipertensi menjadi kunci pencegahan komplikasi jantung dan stroke.',
  'dr. [DATA AKAN DIISI ADMIN]',
  '2026-08-10',
  NULL,
  0,
  NULL
);
INSERT INTO `berita_kegiatan` (`id`, `judul`, `kategori`, `ringkasan`, `konten`, `penulis`, `tanggal`, `foto_url`, `dibaca`, `tags_json`) VALUES (
  'news-5',
  'Pengumuman Jadwal Pelayanan Vaksinasi dan Pemeriksaan Laboratorium Berkala',
  'Pengumuman',
  'Jadwal operasional poli spesifik dan layanan laboratorium terpadu untuk masyarakat wilayah Kepulauan Seribu Selatan.',
  'Diberitahukan kepada seluruh warga Kepulauan Seribu Selatan bahwa pelayanan laboratorium patologi darah dan TCM dahak TB beroperasi setiap hari kerja mulai pukul 08.00 WIB. Warga dimohon membawa kartu BPJS dan identitas diri saat berkunjung.',
  'Tata Usaha Puskesmas',
  '2026-08-05',
  NULL,
  0,
  NULL
);

-- ------------------------------------------------------------------------------
-- 8. TABEL AGENDA KEGIATAN (agenda_kegiatan)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `agenda_kegiatan`;
CREATE TABLE `agenda_kegiatan` (
  `id` VARCHAR(50) NOT NULL,
  `judul` VARCHAR(255) NOT NULL,
  `tanggal` DATE NOT NULL,
  `waktu` VARCHAR(100) NOT NULL,
  `lokasi` VARCHAR(200) NOT NULL,
  `pelaksana` VARCHAR(150) NOT NULL,
  `target_peserta` VARCHAR(200) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Akan Datang',
  `deskripsi` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `agenda_kegiatan` (`id`, `judul`, `tanggal`, `waktu`, `lokasi`, `pelaksana`, `target_peserta`, `status`, `deskripsi`) VALUES (
  'agenda-1',
  'Rembuk Stunting dan Lokakarya Mini Lintas Sektor Triwulan III',
  '2026-09-08',
  '09.00 - 13.00 WIB',
  'Aula Kantor Camat Kepulauan Seribu Selatan',
  'Manajemen Klaster 1 & Tim Stunting',
  NULL,
  'Akan Datang',
  'Evaluasi program percepatan penurunan stunting dan koordinasi terpadu bersama Kecamatan, Kelurahan, TNI AL, Kepolisian, dan Tokoh Masyarakat.'
);
INSERT INTO `agenda_kegiatan` (`id`, `judul`, `tanggal`, `waktu`, `lokasi`, `pelaksana`, `target_peserta`, `status`, `deskripsi`) VALUES (
  'agenda-2',
  'Posyandu ILP Serentak & Skrining Tumbuh Kembang Balita',
  '2026-09-12',
  '08.30 - 11.30 WIB',
  'Pos RW 01 & RW 02 Pulau Pari',
  'Pokja Klaster 2 (Ibu & Anak)',
  NULL,
  'Akan Datang',
  'Pelayanan penimbangan antropometri digital, imunisasi dasar lengkap, pembagian vitamin A, dan konsultasi dokter anak berkala.'
);
INSERT INTO `agenda_kegiatan` (`id`, `judul`, `tanggal`, `waktu`, `lokasi`, `pelaksana`, `target_peserta`, `status`, `deskripsi`) VALUES (
  'agenda-3',
  'Skrining Kebugaran & Pemeriksaan Kesehatan Nelayan Tradisional',
  '2026-09-16',
  '07.30 - 12.00 WIB',
  'Dermaga Pulau Tidung',
  'Tim Klaster 3 & Kesehatan Kerja',
  NULL,
  'Akan Datang',
  'Pemeriksaan tensi darah, gula darah sewaktu, tes tajam penglihatan, dan penyuluhan ergonomi bagi para nelayan dan nahkoda kapal perikanan.'
);
INSERT INTO `agenda_kegiatan` (`id`, `judul`, `tanggal`, `waktu`, `lokasi`, `pelaksana`, `target_peserta`, `status`, `deskripsi`) VALUES (
  'agenda-4',
  'Gerakan PSN 3M Plus Serentak Bersama Kader Jumantik Pulau',
  '2026-09-19',
  '07.00 - 09.00 WIB',
  'Seluruh RW Pulau Untung Jawa & Pulau Lancang',
  'Tim Klaster 4 (P2P)',
  NULL,
  'Akan Datang',
  'Aksi serentak pemberantasan sarang nyamuk, pembagian bubuk larvasida abate, dan pembersihan drainase pesisir pantai.'
);
INSERT INTO `agenda_kegiatan` (`id`, `judul`, `tanggal`, `waktu`, `lokasi`, `pelaksana`, `target_peserta`, `status`, `deskripsi`) VALUES (
  'agenda-5',
  'Penyuluhan Bahaya TBC dan Pemeriksaan Dahak Massal',
  '2026-09-24',
  '09.00 - 12.00 WIB',
  'Balai Warga Pulau Payung',
  'Petugas TB DOTS & Promkes',
  NULL,
  'Akan Datang',
  'Edukasi gejala batuk lebih dari 2 minggu, cara pengambilan dahak yang benar, dan penapisan kontak erat penderita TBC di pulau.'
);

-- ------------------------------------------------------------------------------
-- 9. TABEL TENAGA KESEHATAN & PEGAWAI (pegawai_nakes)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `pegawai_nakes`;
CREATE TABLE `pegawai_nakes` (
  `id` VARCHAR(50) NOT NULL,
  `nama` VARCHAR(150) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `nip` VARCHAR(50) DEFAULT NULL,
  `sip_str` VARCHAR(100) DEFAULT NULL,
  `penempatan` VARCHAR(150) NOT NULL,
  `kualifikasi` VARCHAR(200) DEFAULT NULL,
  `foto_url` VARCHAR(255) DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Aktif Bertugas',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-1',
  'dr. Ignatius Dendy Purnama',
  'Kepala Puskesmas',
  'Medis',
  '19850322 201001 1 031',
  'STR: 31.1.1.100.2.16.145820',
  'Puskesmas Kecamatan (Pulau Tidung)',
  'Dokter Umum - Universitas Indonesia',
  '/assets/kepala-puskesmas.svg',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-2',
  'Achmad Syarif, S.AP',
  'Kepala Subbagian Tata Usaha',
  'Penunjang & Manajemen',
  '19800412 200801 1 012',
  NULL,
  'Puskesmas Kecamatan (Pulau Tidung)',
  'S1 Administrasi Publik',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-3',
  'dr. Rizki Pratama',
  'Dokter Penanggung Jawab IGD & Ambulans Laut',
  'Medis',
  '19900218 201802 1 004',
  'SIP: 446/012/DS/Dinkes/2022',
  'Puskesmas Kecamatan (Pulau Tidung)',
  'Dokter Umum - Sertifikasi ATLS, ACLS & Penyelamatan Bahari',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
  'Siaga On-Call'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-4',
  'dr. Nurul Fitriani',
  'Dokter Koordinator Klaster Dewasa & Lansia',
  'Medis',
  '19920725 201903 2 008',
  'SIP: 446/058/DS/Dinkes/2023',
  'Puskesmas Kecamatan (Pulau Tidung)',
  'Dokter Umum - Pelatihan Hipertensi, DM & Prolanis Kemenkes',
  'https://images.unsplash.com/photo-1594824813590-7813a30b77b1?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-5',
  'drg. Amanda Putri',
  'Dokter Gigi Pelayanan Rawat Jalan',
  'Medis',
  '19940315 202012 2 011',
  'SIP: 446/099/DG/Dinkes/2024',
  'Puskesmas Kecamatan (Pulau Tidung)',
  'Dokter Gigi - FKG Universitas Padjadjaran',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-6',
  'Bdn. Sri Wahyuni, S.Tr.Keb',
  'Bidan Koordinator KIA, KB & PONED',
  'Kebidanan',
  '19871109 201001 2 015',
  'SIPB: 503/044/Bdn/2021',
  'Ruang Bersalin PONED Pulau Tidung',
  'Sarjana Terapan Kebidanan - Pelatihan APN & CTU',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-7',
  'Bdn. Siti Rahmawati, A.Md.Keb',
  'Bidan Pembina Posyandu & Pustu Pulau Payung',
  'Kebidanan',
  '19930814 201902 2 006',
  'SIPB: 503/089/Bdn/2022',
  'Pustu Pulau Payung & Posyandu Siklus Hidup',
  'D3 Kebidanan - Pelatihan Resusitasi Bayi Baru Lahir',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  'Pelayanan Terjadwal'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-8',
  'Ns. Ahmad Fauzi, S.Kep',
  'Perawat Koordinator P2P & Surveilans Maritim',
  'Keperawatan',
  '19890620 201402 1 003',
  'SIPP: 446/077/Per/2020',
  'Puskesmas Kecamatan & Pustu Pulau Lancang',
  'Ners Keperawatan - Pelatihan Surveilans Epidemiologi & TB DOTS',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-9',
  'Ns. Eko Prasetyo, S.Kep',
  'Perawat Manajemen Mutu & SatuSehat RME',
  'Keperawatan',
  '19881005 201201 1 009',
  NULL,
  'Puskesmas Kecamatan (Pulau Tidung)',
  'Ners Keperawatan - Auditor Internal Akreditasi Puskesmas',
  'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-10',
  'Ns. Hendra Wijaya, S.Kep',
  'Perawat Pelaksana Pustu Pulau Pari',
  'Keperawatan',
  '19910403 201503 1 007',
  'SIPP: 446/112/Per/2023',
  'Puskesmas Kelurahan Pulau Pari',
  'Ners Keperawatan - Pelatihan Bantuan Hidup Dasar (BHD)',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-11',
  'apt. Dina Mariana, S.Farm',
  'Apoteker Penanggung Jawab Farmasi & Logistik Obat',
  'Kefarmasian',
  '19920117 201701 2 007',
  'SIPA: 446/033/Apt/2021',
  'Puskesmas Kecamatan (Pulau Tidung)',
  'Apoteker - Pelatihan Cold Chain & Distribusi Obat Maritim',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-12',
  'Rina Anggraini, S.Gz',
  'Nutrisionis / Konselor Gizi & Pencegahan Stunting',
  'Gizi & Kesmas',
  '19950522 202102 2 014',
  NULL,
  'Puskesmas Kecamatan & Posyandu 5 Pulau',
  'S1 Ilmu Gizi - Pelatihan Pemberian Makanan Tambahan (PMT) Berbahan Lokal',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
  'Pelayanan Terjadwal'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-13',
  'Joko Susilo, A.Md.AK',
  'Pranata Laboratorium Kesehatan',
  'Penunjang & Manajemen',
  '19930310 201801 1 005',
  NULL,
  'Laboratorium Pulau Tidung',
  'D3 Analis Kesehatan - Ahli Pemeriksaan Hematologi, Kimia Darah & Mikrobiologi',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-14',
  'Budi Santoso, S.KM',
  'Sanitarian / Ahli Kesehatan Lingkungan',
  'Gizi & Kesmas',
  '19870919 201101 1 008',
  NULL,
  'Puskesmas Kecamatan (Wilayah 5 Pulau)',
  'Sarjana Kesehatan Masyarakat (S.KM) - Uji Kualitas Air Bersih & Sanitasi Total',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
  'Aktif Bertugas'
);
INSERT INTO `pegawai_nakes` (`id`, `nama`, `role`, `kategori`, `nip`, `sip_str`, `penempatan`, `kualifikasi`, `foto_url`, `status`) VALUES (
  'staff-15',
  'Capt. M. Ridwan',
  'Nahkoda Kapal Ambulans Laut Evakuasi 24 Jam',
  'Penunjang & Manajemen',
  '19820415 200902 1 006',
  NULL,
  'Dermaga Khusus Ambulans Laut Pulau Tidung',
  'Sertifikasi Pelaut ANT-IV & Navigasi Radar Kedaruratan Maritim',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'Siaga On-Call'
);

-- ------------------------------------------------------------------------------
-- 10. TABEL DOKUMEN & STANDAR PELAYANAN (dokumen_publik)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `dokumen_publik`;
CREATE TABLE `dokumen_publik` (
  `id` VARCHAR(50) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `tanggal` DATE NOT NULL,
  `ukuran_berkas` VARCHAR(50) NOT NULL,
  `tipe_berkas` VARCHAR(50) NOT NULL,
  `url_berkas` VARCHAR(255) NOT NULL,
  `deskripsi` LONGTEXT DEFAULT NULL,
  `jumlah_unduhan` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-standar-pelayanan',
  'Dokumen Standar Pelayanan Publik Puskesmas Kecamatan Kepulauan Seribu Selatan',
  'Informasi pelayanan',
  '2026-08-15',
  '180 KB',
  'PDF / Vektor',
  '/assets/dokumen/standar-pelayanan.svg',
  'Keputusan resmi standar persyaratan, mekanisme, tarif gratis BPJS/DKI, waktu respon IGD 24 jam, dan sarana fasilitas.',
  1450
);
INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-maklumat-pelayanan',
  'Dokumen Maklumat Pelayanan Resmi Puskesmas Kepulauan Seribu Selatan',
  'SOP publik',
  '2026-08-15',
  '120 KB',
  'PDF / Vektor',
  '/assets/dokumen/maklumat-pelayanan.svg',
  'Pernyataan kesanggupan resmi seluruh jajaran Puskesmas dalam menyelenggarakan pelayanan prima dan siap menerima sanksi apabila melanggar.',
  1820
);
INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-hak-kewajiban',
  'Dokumen 12 Hak Pasien dan 4 Kewajiban Pasien Resmi',
  'Informasi pelayanan',
  '2026-08-15',
  '210 KB',
  'PDF / Vektor',
  '/assets/dokumen/hak-dan-kewajiban-pasien.svg',
  'Pedoman hak-hak pasien dalam memperoleh pelayanan medis yang manusiawi, adil, bermutu, serta 4 kewajiban pasien saat berobat.',
  2310
);
INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-1',
  'Formulir Pendaftaran Pasien Baru & Skrining Riwayat Kesehatan',
  'Formulir pelayanan',
  '2026-08-01',
  '420 KB',
  'PDF',
  '',
  'Formulir isian data identitas sosial, riwayat alergi obat, dan jaminan kesehatan untuk pendaftaran pertama kali.',
  342
);
INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-2',
  'Standar Operasional Prosedur (SOP) Rujukan Pasien & Ambulans Laut 24 Jam',
  'SOP publik',
  '2026-07-15',
  '1.2 MB',
  'PDF',
  '',
  'Pedoman alur tata cara evakuasi medis darurat maritim dari pulau pemukiman ke rumah sakit rujukan darat.',
  512
);
INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-3',
  'Brosur Informasi Integrasi Layanan Primer (ILP) Siklus Hidup Puskesmas',
  'Brosur kesehatan',
  '2026-08-10',
  '2.4 MB',
  'PDF',
  '',
  'Panduan visual lengkap pembagian 4 klaster pelayanan kesehatan berbasis siklus hidup keluarga.',
  820
);
INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-4',
  'Jadwal Lengkap Posyandu ILP & Skrining PTM Seluruh Pulau Tahun 2026',
  'Informasi pelayanan',
  '2026-08-05',
  '650 KB',
  'PDF',
  '',
  'Kalender jadwal posyandu balita, remaja, lansia di Pulau Tidung, Pari, Lancang, Untung Jawa, dan Payung.',
  680
);
INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-5',
  'Panduan Germas & Menu Pemberian Makanan Tambahan (PMT) Balita Pesisir',
  'Panduan',
  '2026-07-20',
  '3.1 MB',
  'PDF',
  '',
  'Buku saku resep gizi seimbang berbahan baku hasil laut untuk pencegahan stunting pada anak.',
  440
);
INSERT INTO `dokumen_publik` (`id`, `nama`, `kategori`, `tanggal`, `ukuran_berkas`, `tipe_berkas`, `url_berkas`, `deskripsi`, `jumlah_unduhan`) VALUES (
  'doc-6',
  'Maklumat Pelayanan & Hak Kewajiban Pasien Puskesmas',
  'Informasi pelayanan',
  '2026-06-30',
  '510 KB',
  'PDF',
  '',
  'Komitmen mutu pelayanan resmi dan hak-hak yang diterima pasien selama berobat di Puskesmas.',
  290
);

-- ------------------------------------------------------------------------------
-- 11. TABEL FAQ / TANYA JAWAB UMUM (faq_kesehatan)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `faq_kesehatan`;
CREATE TABLE `faq_kesehatan` (
  `id` VARCHAR(50) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `pertanyaan` LONGTEXT NOT NULL,
  `jawaban` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `faq_kesehatan` (`id`, `kategori`, `pertanyaan`, `jawaban`) VALUES (
  'faq-1',
  'Umum',
  'Berapa jam operasional pelayanan di Puskesmas Kepulauan Seribu Selatan?',
  'Pelayanan Poliklinik Rawat Jalan dan Administrasi buka Senin - Jumat pukul 07.30 - 16.00 WIB. Untuk Instalasi Gawat Darurat (IGD), Pertolongan Persalinan (PONED), dan Kapal Ambulans Laut siaga 24 Jam Non-Stop setiap hari.'
);
INSERT INTO `faq_kesehatan` (`id`, `kategori`, `pertanyaan`, `jawaban`) VALUES (
  'faq-2',
  'Pelayanan',
  'Bagaimana cara mendapatkan pelayanan kesehatan di Puskesmas dan Pustu?',
  'Masyarakat cukup datang ke loket pendaftaran Puskesmas atau Pustu pulau terdekat dengan membawa KTP/KK dan Kartu BPJS Kesehatan/KIS. Pasien juga dapat mengambil nomor antrean melalui aplikasi Mobile JKN.'
);
INSERT INTO `faq_kesehatan` (`id`, `kategori`, `pertanyaan`, `jawaban`) VALUES (
  'faq-3',
  'Pustu Kepulauan',
  'Apa saja fasilitas yang tersedia di setiap Pustu (Puskesmas Pembantu) Pulau?',
  'Setiap Pustu di Pulau Lancang, Pulau Pari, dan Pulau Untung Jawa dilengkapi nakes perawat dan bidan siaga, pemeriksaan umum, pemeriksaan ibu dan anak, obat dasar, penimbangan posyandu, dan jalur evakuasi kedaruratan medis.'
);
INSERT INTO `faq_kesehatan` (`id`, `kategori`, `pertanyaan`, `jawaban`) VALUES (
  'faq-4',
  'Rujukan & Ambulans',
  'Bagaimana prosedur evakuasi rujukan medis gawat darurat menggunakan Ambulans Laut?',
  'Jika dokter/nakes menentukan pasien memerlukan rujukan darurat, tim medis Puskesmas akan menginput SISRUTE ke RS tujuan, menyiapkan pasien di brankar kapal ambulans laut dengan pendampingan dokter/perawat, dan berlayar langsung menuju dermaga darat terdekat (misal Marina Ancol / Muara Angke / Pantai Mutiara) untuk dilanjutkan ambulans darat.'
);
INSERT INTO `faq_kesehatan` (`id`, `kategori`, `pertanyaan`, `jawaban`) VALUES (
  'faq-5',
  'BPJS & Administrasi',
  'Apakah seluruh pelayanan kesehatan di Puskesmas gratis?',
  'Ya, seluruh pelayanan kesehatan primer, obat, laboratorium dasar, rawat inap sementara, persalinan, dan rujukan ambulans laut ditanggung 100% GRATIS bagi peserta aktif BPJS Kesehatan dan warga ber-KTP DKI Jakarta.'
);
INSERT INTO `faq_kesehatan` (`id`, `kategori`, `pertanyaan`, `jawaban`) VALUES (
  'faq-6',
  'ILP',
  'Apa itu Integrasi Layanan Primer (ILP) yang diterapkan di Puskesmas?',
  'ILP adalah penataan pelayanan kesehatan yang fokus pada siklus hidup manusia (Klaster 1: Manajemen, Klaster 2: Ibu dan Anak, Klaster 3: Usia Dewasa & Lansia, Klaster 4: Penanggulangan Penyakit Menular, dan Lintas Klaster). Tujuannya agar setiap anggota keluarga dipantau kesehatannya secara menyeluruh.'
);
INSERT INTO `faq_kesehatan` (`id`, `kategori`, `pertanyaan`, `jawaban`) VALUES (
  'faq-7',
  'Pelayanan',
  'Bagaimana cara mendapatkan informasi jadwal pelayanan dokter gigi atau USG kehamilan?',
  'Jadwal pelayanan lengkap dapat dilihat di menu "Jadwal & Agenda" pada website ini, atau menghubungi layanan WhatsApp resmi Puskesmas di nomor 0859-6100-0003.'
);

-- ------------------------------------------------------------------------------
-- 12. TABEL STATISTIK INDIKATOR FASKES (statistik_faskes)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `statistik_faskes`;
CREATE TABLE `statistik_faskes` (
  `id` VARCHAR(50) NOT NULL,
  `label` VARCHAR(150) NOT NULL,
  `nilai` VARCHAR(50) NOT NULL,
  `subtext` VARCHAR(150) NOT NULL,
  `ikon` VARCHAR(50) NOT NULL,
  `urutan` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `statistik_faskes` (`id`, `label`, `nilai`, `subtext`, `ikon`, `urutan`) VALUES (
  'stat-1',
  'Unit Pelayanan',
  4,
  NULL,
  'Building2',
  1
);
INSERT INTO `statistik_faskes` (`id`, `label`, `nilai`, `subtext`, `ikon`, `urutan`) VALUES (
  'stat-2',
  'Klaster ILP',
  5,
  NULL,
  'Layers',
  2
);
INSERT INTO `statistik_faskes` (`id`, `label`, `nilai`, `subtext`, `ikon`, `urutan`) VALUES (
  'stat-3',
  'Tenaga Kesehatan',
  54,
  NULL,
  'UserCheck',
  3
);
INSERT INTO `statistik_faskes` (`id`, `label`, `nilai`, `subtext`, `ikon`, `urutan`) VALUES (
  'stat-4',
  'Masyarakat Terlayani',
  12500,
  NULL,
  'Users',
  4
);

-- ------------------------------------------------------------------------------
-- 13. TABEL PENDAFTARAN ANTREAN ONLINE PASIEN (antrean_online)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `antrean_online`;
CREATE TABLE `antrean_online` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nomor_antrean` VARCHAR(50) NOT NULL,
  `nik` VARCHAR(20) NOT NULL,
  `nama_pasien` VARCHAR(150) NOT NULL,
  `no_telepon` VARCHAR(50) NOT NULL,
  `faskes_tujuan` VARCHAR(100) NOT NULL,
  `poli_tujuan` VARCHAR(100) NOT NULL,
  `tanggal_kunjungan` DATE NOT NULL,
  `status` ENUM('menunggu','dipanggil','selesai','dibatalkan') NOT NULL DEFAULT 'menunggu',
  `waktu_daftar` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_tanggal_poli` (`tanggal_kunjungan`, `poli_tujuan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `antrean_online` (`nomor_antrean`, `nik`, `nama_pasien`, `no_telepon`, `faskes_tujuan`, `poli_tujuan`, `tanggal_kunjungan`, `status`) VALUES
('A-001', '3101015504890001', 'Bapak Suryadi', '081298765432', 'Puskesmas Kecamatan (Pulau Tidung)', 'Poli Umum', CURDATE(), 'selesai'),
('A-002', '3101016208950003', 'Ibu Nurhasanah', '081387654321', 'Puskesmas Kecamatan (Pulau Tidung)', 'Poli KIA / KB', CURDATE(), 'dipanggil'),
('A-003', '3101024501920002', 'Ahmad Fadillah', '085712345678', 'Puskesmas Kelurahan Pulau Pari', 'Poli Gigi & Mulut', CURDATE(), 'menunggu');

-- ------------------------------------------------------------------------------
-- 14. TABEL PENGADUAN & ASPIRASI MASYARAKAT (pengaduan_masyarakat)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `pengaduan_masyarakat`;
CREATE TABLE `pengaduan_masyarakat` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nomor_tiket` VARCHAR(50) NOT NULL UNIQUE,
  `nama_pelapor` VARCHAR(150) NOT NULL,
  `kontak_hp` VARCHAR(50) NOT NULL,
  `pulau` VARCHAR(100) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `isi_laporan` LONGTEXT NOT NULL,
  `status` ENUM('diterima','diproses','selesai','ditolak') NOT NULL DEFAULT 'diterima',
  `tanggapan` LONGTEXT DEFAULT NULL,
  `tanggal_lapor` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pengaduan_masyarakat` (`nomor_tiket`, `nama_pelapor`, `kontak_hp`, `pulau`, `kategori`, `isi_laporan`, `status`, `tanggapan`) VALUES
('TKT-2026-001', 'Hendra Setiawan', '081234567890', 'Pulau Tidung', 'Pelayanan', 'Apresiasi untuk pelayanan cepat dokter jaga IGD dan perawat yang sigap saat malam hari.', 'selesai', 'Terima kasih banyak atas apresiasi yang diberikan. Salam sehat selalu!'),
('TKT-2026-002', 'Siti Rahmawati', '081987654321', 'Pulau Pari', 'Fasilitas', 'Mohon penambahan stok vitamin anak di poskesdes saat kegiatan Posyandu.', 'diproses', 'Laporan telah dikoordinasikan dengan bagian Farmasi & Logistik Klaster 1.');

SET FOREIGN_KEY_CHECKS = 1;

-- ==============================================================================
-- AKHIR DARI FILE SQL PUSKESMAS KECAMATAN KEPULAUAN SERIBU SELATAN
-- ==============================================================================
