import fs from 'fs';
import path from 'path';
import {
  initialProfile,
  initialIslands,
  initialHealthServices,
  initialILPClusters,
  initialSchedules,
  initialNews,
  initialAgenda,
  initialStaff,
  initialDocuments,
  initialFaqs,
  initialStatistics
} from '../src/data/initialData';

function escapeSql(val: any): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val.toString();
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (typeof val === 'object') {
    const jsonStr = JSON.stringify(val);
    return `'${jsonStr.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
  }
  const str = String(val);
  return `'${str.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

function generateSql(): string {
  let sql = `-- ==============================================================================
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
DROP TABLE IF EXISTS \`admin_users\`;
CREATE TABLE \`admin_users\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL COMMENT 'Bcrypt / hash kata sandi',
  \`nama_lengkap\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`role\` VARCHAR(50) NOT NULL DEFAULT 'super_admin',
  \`status\` ENUM('aktif','nonaktif') NOT NULL DEFAULT 'aktif',
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`admin_users\` (\`id\`, \`username\`, \`password_hash\`, \`nama_lengkap\`, \`email\`, \`role\`, \`status\`) VALUES
(1, 'admin', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Administrator Resmi Puskesmas', 'admin@puskesmasseribuselatan.com', 'super_admin', 'aktif'),
(2, 'petugas_tidung', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Operator Pos Pulau Tidung', 'tidung@puskesmasseribuselatan.com', 'operator', 'aktif'),
(3, 'petugas_pari', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Operator Pos Pulau Pari', 'pari@puskesmasseribuselatan.com', 'operator', 'aktif');

-- ------------------------------------------------------------------------------
-- 2. TABEL PROFIL PUSKESMAS (profil_puskesmas)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`profil_puskesmas\`;
CREATE TABLE \`profil_puskesmas\` (
  \`id\` INT(11) NOT NULL,
  \`nama_puskesmas\` VARCHAR(200) NOT NULL,
  \`sub_judul\` VARCHAR(255) DEFAULT NULL,
  \`motto\` VARCHAR(255) DEFAULT NULL,
  \`kepala_nama\` VARCHAR(150) DEFAULT NULL,
  \`kepala_jabatan\` VARCHAR(200) DEFAULT NULL,
  \`kepala_nip\` VARCHAR(50) DEFAULT NULL,
  \`kepala_foto\` VARCHAR(255) DEFAULT NULL,
  \`sambutan_kepala\` LONGTEXT DEFAULT NULL,
  \`visi\` LONGTEXT DEFAULT NULL,
  \`misi_json\` JSON DEFAULT NULL,
  \`tata_nilai_json\` JSON DEFAULT NULL,
  \`alamat\` LONGTEXT DEFAULT NULL,
  \`telepon\` VARCHAR(100) DEFAULT NULL,
  \`whatsapp\` VARCHAR(100) DEFAULT NULL,
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`hotline_igd\` VARCHAR(100) DEFAULT NULL,
  \`hotline_ambulans\` VARCHAR(100) DEFAULT NULL,
  \`jam_layanan_json\` JSON DEFAULT NULL,
  \`deskripsi_wilayah\` LONGTEXT DEFAULT NULL,
  \`koordinat_lat\` DECIMAL(10,7) DEFAULT NULL,
  \`koordinat_lng\` DECIMAL(10,7) DEFAULT NULL,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`profil_puskesmas\` (
  \`id\`, \`nama_puskesmas\`, \`sub_judul\`, \`motto\`, \`kepala_nama\`, \`kepala_jabatan\`, \`kepala_nip\`, \`kepala_foto\`,
  \`sambutan_kepala\`, \`visi\`, \`misi_json\`, \`tata_nilai_json\`, \`alamat\`, \`telepon\`, \`whatsapp\`, \`email\`,
  \`hotline_igd\`, \`hotline_ambulans\`, \`jam_layanan_json\`, \`deskripsi_wilayah\`, \`koordinat_lat\`, \`koordinat_lng\`
) VALUES (
  1,
  ${escapeSql(initialProfile.name)},
  ${escapeSql(initialProfile.subTitle)},
  ${escapeSql(initialProfile.motto)},
  ${escapeSql(initialProfile.headOfPuskesmasName)},
  ${escapeSql(initialProfile.headOfPuskesmasTitle)},
  ${escapeSql(initialProfile.headOfPuskesmasNip)},
  ${escapeSql(initialProfile.headOfPuskesmasPhoto)},
  ${escapeSql(initialProfile.welcomeSpeech)},
  ${escapeSql(initialProfile.vision)},
  ${escapeSql(initialProfile.mission)},
  ${escapeSql(initialProfile.values)},
  ${escapeSql(initialProfile.address)},
  ${escapeSql(initialProfile.phone)},
  ${escapeSql(initialProfile.whatsapp)},
  ${escapeSql(initialProfile.email)},
  ${escapeSql(initialProfile.emergencyHotline)},
  ${escapeSql(initialProfile.seaAmbulanceHotline)},
  ${escapeSql(initialProfile.operatingHours)},
  ${escapeSql(initialProfile.workingAreaDescription)},
  -5.801642,
  106.524388
);

-- ------------------------------------------------------------------------------
-- 3. TABEL FASILITAS & FASKES PULAU (fasilitas_pulau)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`fasilitas_pulau\`;
CREATE TABLE \`fasilitas_pulau\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`nama_pulau\` VARCHAR(100) NOT NULL,
  \`kelurahan\` VARCHAR(100) DEFAULT NULL,
  \`jenis_faskes\` VARCHAR(100) NOT NULL,
  \`status_operasional\` VARCHAR(50) NOT NULL DEFAULT 'Buka 24 Jam',
  \`alamat\` LONGTEXT DEFAULT NULL,
  \`kontak_telepon\` VARCHAR(100) DEFAULT NULL,
  \`whatsapp\` VARCHAR(100) DEFAULT NULL,
  \`kepala_pos\` VARCHAR(150) DEFAULT NULL,
  \`foto_url\` VARCHAR(255) DEFAULT NULL,
  \`koordinat_lat\` DECIMAL(10,7) DEFAULT NULL,
  \`koordinat_lng\` DECIMAL(10,7) DEFAULT NULL,
  \`deskripsi\` LONGTEXT DEFAULT NULL,
  \`layanan_json\` JSON DEFAULT NULL,
  \`aktif\` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  for (const isl of initialIslands) {
    sql += `INSERT INTO \`fasilitas_pulau\` (\`id\`, \`nama_pulau\`, \`kelurahan\`, \`jenis_faskes\`, \`status_operasional\`, \`alamat\`, \`kontak_telepon\`, \`whatsapp\`, \`kepala_pos\`, \`foto_url\`, \`koordinat_lat\`, \`koordinat_lng\`, \`deskripsi\`, \`layanan_json\`, \`aktif\`) VALUES (
  ${escapeSql(isl.id)},
  ${escapeSql(isl.name)},
  ${escapeSql(isl.kelurahan)},
  ${escapeSql(isl.facilityType)},
  ${escapeSql(isl.status)},
  ${escapeSql(isl.address)},
  ${escapeSql(isl.contactNumber)},
  ${escapeSql(isl.whatsapp)},
  ${escapeSql(isl.headOfPost)},
  ${escapeSql(isl.photo)},
  ${escapeSql(isl.coordinates.lat)},
  ${escapeSql(isl.coordinates.lng)},
  ${escapeSql(isl.description)},
  ${escapeSql(isl.services)},
  1
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 4. TABEL LAYANAN KESEHATAN & POLIKLINIK (layanan_poliklinik)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`layanan_poliklinik\`;
CREATE TABLE \`layanan_poliklinik\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`nama_layanan\` VARCHAR(150) NOT NULL,
  \`kategori\` VARCHAR(100) NOT NULL,
  \`klaster_id\` VARCHAR(50) DEFAULT NULL,
  \`deskripsi\` LONGTEXT DEFAULT NULL,
  \`jadwal\` VARCHAR(150) DEFAULT NULL,
  \`biaya\` VARCHAR(100) NOT NULL DEFAULT 'Gratis (KTP DKI / BPJS)',
  \`persyaratan_json\` JSON DEFAULT NULL,
  \`alur_json\` JSON DEFAULT NULL,
  \`kontak\` VARCHAR(100) DEFAULT NULL,
  \`icon_name\` VARCHAR(50) DEFAULT 'Stethoscope',
  \`populer\` TINYINT(1) NOT NULL DEFAULT 0,
  \`urutan\` INT(11) NOT NULL DEFAULT 0,
  \`aktif\` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  let sIdx = 1;
  for (const s of initialHealthServices) {
    sql += `INSERT INTO \`layanan_poliklinik\` (\`id\`, \`nama_layanan\`, \`kategori\`, \`klaster_id\`, \`deskripsi\`, \`jadwal\`, \`biaya\`, \`persyaratan_json\`, \`alur_json\`, \`kontak\`, \`icon_name\`, \`populer\`, \`urutan\`, \`aktif\`) VALUES (
  ${escapeSql(s.id)},
  ${escapeSql(s.name)},
  ${escapeSql(s.category)},
  ${escapeSql(s.clusterId || null)},
  ${escapeSql(s.description)},
  ${escapeSql(s.schedule)},
  ${escapeSql(s.fee)},
  ${escapeSql(s.requirements)},
  ${escapeSql(s.flow)},
  ${escapeSql(s.contact)},
  ${escapeSql(s.icon)},
  ${s.popular ? 1 : 0},
  ${sIdx++},
  1
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 5. TABEL INTEGRASI LAYANAN PRIMER / ILP (klaster_ilp)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`klaster_ilp\`;
CREATE TABLE \`klaster_ilp\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`nomor_klaster\` INT(11) NOT NULL,
  \`judul_klaster\` VARCHAR(150) NOT NULL,
  \`sasaran_siklus_hidup\` VARCHAR(200) NOT NULL,
  \`koordinator\` VARCHAR(150) DEFAULT NULL,
  \`warna\` VARCHAR(50) DEFAULT 'sky',
  \`deskripsi\` LONGTEXT DEFAULT NULL,
  \`ruang_lingkup_json\` JSON DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  for (const ilp of initialILPClusters) {
    sql += `INSERT INTO \`klaster_ilp\` (\`id\`, \`nomor_klaster\`, \`judul_klaster\`, \`sasaran_siklus_hidup\`, \`koordinator\`, \`warna\`, \`deskripsi\`, \`ruang_lingkup_json\`) VALUES (
  ${escapeSql(ilp.id)},
  ${ilp.clusterNumber},
  ${escapeSql(ilp.title)},
  ${escapeSql(ilp.target)},
  ${escapeSql(ilp.leader)},
  ${escapeSql(ilp.color)},
  ${escapeSql(ilp.description)},
  ${escapeSql(ilp.servicesScope)}
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 6. TABEL JADWAL PELAYANAN DOKTER (jadwal_pelayanan)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`jadwal_pelayanan\`;
CREATE TABLE \`jadwal_pelayanan\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`nama_layanan\` VARCHAR(150) NOT NULL,
  \`faskes_pulau\` VARCHAR(100) NOT NULL,
  \`hari\` VARCHAR(100) NOT NULL,
  \`jam_layanan\` VARCHAR(100) NOT NULL,
  \`dokter_petugas\` VARCHAR(150) NOT NULL,
  \`kuota\` INT(11) NOT NULL DEFAULT 30,
  \`keterangan\` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  for (const sch of initialSchedules) {
    sql += `INSERT INTO \`jadwal_pelayanan\` (\`id\`, \`nama_layanan\`, \`faskes_pulau\`, \`hari\`, \`jam_layanan\`, \`dokter_petugas\`, \`kuota\`, \`keterangan\`) VALUES (
  ${escapeSql(sch.id)},
  ${escapeSql(sch.serviceName)},
  ${escapeSql(sch.location)},
  ${escapeSql(sch.day)},
  ${escapeSql(sch.time)},
  ${escapeSql(sch.doctorName)},
  ${sch.quota},
  ${escapeSql(sch.note)}
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 7. TABEL BERITA & KEGIATAN KESEHATAN (berita_kegiatan)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`berita_kegiatan\`;
CREATE TABLE \`berita_kegiatan\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`judul\` VARCHAR(255) NOT NULL,
  \`kategori\` VARCHAR(100) NOT NULL,
  \`ringkasan\` LONGTEXT DEFAULT NULL,
  \`konten\` LONGTEXT NOT NULL,
  \`penulis\` VARCHAR(100) NOT NULL,
  \`tanggal\` DATE NOT NULL,
  \`foto_url\` VARCHAR(255) DEFAULT NULL,
  \`dibaca\` INT(11) NOT NULL DEFAULT 0,
  \`tags_json\` JSON DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  for (const n of initialNews) {
    sql += `INSERT INTO \`berita_kegiatan\` (\`id\`, \`judul\`, \`kategori\`, \`ringkasan\`, \`konten\`, \`penulis\`, \`tanggal\`, \`foto_url\`, \`dibaca\`, \`tags_json\`) VALUES (
  ${escapeSql(n.id)},
  ${escapeSql(n.title)},
  ${escapeSql(n.category)},
  ${escapeSql(n.summary)},
  ${escapeSql(n.content)},
  ${escapeSql(n.author)},
  ${escapeSql(n.date)},
  ${escapeSql(n.imageUrl)},
  ${n.viewsCount || 0},
  ${escapeSql(n.tags)}
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 8. TABEL AGENDA KEGIATAN (agenda_kegiatan)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`agenda_kegiatan\`;
CREATE TABLE \`agenda_kegiatan\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`judul\` VARCHAR(255) NOT NULL,
  \`tanggal\` DATE NOT NULL,
  \`waktu\` VARCHAR(100) NOT NULL,
  \`lokasi\` VARCHAR(200) NOT NULL,
  \`pelaksana\` VARCHAR(150) NOT NULL,
  \`target_peserta\` VARCHAR(200) NOT NULL,
  \`status\` VARCHAR(50) NOT NULL DEFAULT 'Akan Datang',
  \`deskripsi\` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  for (const a of initialAgenda) {
    sql += `INSERT INTO \`agenda_kegiatan\` (\`id\`, \`judul\`, \`tanggal\`, \`waktu\`, \`lokasi\`, \`pelaksana\`, \`target_peserta\`, \`status\`, \`deskripsi\`) VALUES (
  ${escapeSql(a.id)},
  ${escapeSql(a.title)},
  ${escapeSql(a.date)},
  ${escapeSql(a.time)},
  ${escapeSql(a.location)},
  ${escapeSql(a.organizer)},
  ${escapeSql(a.targetAudience)},
  ${escapeSql(a.status)},
  ${escapeSql(a.description)}
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 9. TABEL TENAGA KESEHATAN & PEGAWAI (pegawai_nakes)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`pegawai_nakes\`;
CREATE TABLE \`pegawai_nakes\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`nama\` VARCHAR(150) NOT NULL,
  \`role\` VARCHAR(100) NOT NULL,
  \`kategori\` VARCHAR(100) NOT NULL,
  \`nip\` VARCHAR(50) DEFAULT NULL,
  \`sip_str\` VARCHAR(100) DEFAULT NULL,
  \`penempatan\` VARCHAR(150) NOT NULL,
  \`kualifikasi\` VARCHAR(200) DEFAULT NULL,
  \`foto_url\` VARCHAR(255) DEFAULT NULL,
  \`status\` VARCHAR(50) NOT NULL DEFAULT 'Aktif Bertugas',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  for (const st of initialStaff) {
    sql += `INSERT INTO \`pegawai_nakes\` (\`id\`, \`nama\`, \`role\`, \`kategori\`, \`nip\`, \`sip_str\`, \`penempatan\`, \`kualifikasi\`, \`foto_url\`, \`status\`) VALUES (
  ${escapeSql(st.id)},
  ${escapeSql(st.name)},
  ${escapeSql(st.role)},
  ${escapeSql(st.category)},
  ${escapeSql(st.nip)},
  ${escapeSql(st.sipOrStr)},
  ${escapeSql(st.placement)},
  ${escapeSql(st.qualification)},
  ${escapeSql(st.photo)},
  ${escapeSql(st.status)}
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 10. TABEL DOKUMEN & STANDAR PELAYANAN (dokumen_publik)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`dokumen_publik\`;
CREATE TABLE \`dokumen_publik\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`nama\` VARCHAR(255) NOT NULL,
  \`kategori\` VARCHAR(100) NOT NULL,
  \`tanggal\` DATE NOT NULL,
  \`ukuran_berkas\` VARCHAR(50) NOT NULL,
  \`tipe_berkas\` VARCHAR(50) NOT NULL,
  \`url_berkas\` VARCHAR(255) NOT NULL,
  \`deskripsi\` LONGTEXT DEFAULT NULL,
  \`jumlah_unduhan\` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  for (const doc of initialDocuments) {
    sql += `INSERT INTO \`dokumen_publik\` (\`id\`, \`nama\`, \`kategori\`, \`tanggal\`, \`ukuran_berkas\`, \`tipe_berkas\`, \`url_berkas\`, \`deskripsi\`, \`jumlah_unduhan\`) VALUES (
  ${escapeSql(doc.id)},
  ${escapeSql(doc.name)},
  ${escapeSql(doc.category)},
  ${escapeSql(doc.date)},
  ${escapeSql(doc.fileSize)},
  ${escapeSql(doc.fileType)},
  ${escapeSql(doc.fileUrl || '')},
  ${escapeSql(doc.description)},
  ${doc.downloadsCount || 0}
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 11. TABEL FAQ / TANYA JAWAB UMUM (faq_kesehatan)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`faq_kesehatan\`;
CREATE TABLE \`faq_kesehatan\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`kategori\` VARCHAR(100) NOT NULL,
  \`pertanyaan\` LONGTEXT NOT NULL,
  \`jawaban\` LONGTEXT NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  for (const f of initialFaqs) {
    sql += `INSERT INTO \`faq_kesehatan\` (\`id\`, \`kategori\`, \`pertanyaan\`, \`jawaban\`) VALUES (
  ${escapeSql(f.id)},
  ${escapeSql(f.category)},
  ${escapeSql(f.question)},
  ${escapeSql(f.answer)}
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 12. TABEL STATISTIK INDIKATOR FASKES (statistik_faskes)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`statistik_faskes\`;
CREATE TABLE \`statistik_faskes\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`label\` VARCHAR(150) NOT NULL,
  \`nilai\` VARCHAR(50) NOT NULL,
  \`subtext\` VARCHAR(150) NOT NULL,
  \`ikon\` VARCHAR(50) NOT NULL,
  \`urutan\` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  let statIdx = 1;
  for (const st of initialStatistics) {
    sql += `INSERT INTO \`statistik_faskes\` (\`id\`, \`label\`, \`nilai\`, \`subtext\`, \`ikon\`, \`urutan\`) VALUES (
  ${escapeSql(st.id)},
  ${escapeSql(st.label)},
  ${escapeSql(st.value)},
  ${escapeSql(st.subtext)},
  ${escapeSql(st.icon)},
  ${statIdx++}
);\n`;
  }

  sql += `
-- ------------------------------------------------------------------------------
-- 13. TABEL PENDAFTARAN ANTREAN ONLINE PASIEN (antrean_online)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`antrean_online\`;
CREATE TABLE \`antrean_online\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`nomor_antrean\` VARCHAR(50) NOT NULL,
  \`nik\` VARCHAR(20) NOT NULL,
  \`nama_pasien\` VARCHAR(150) NOT NULL,
  \`no_telepon\` VARCHAR(50) NOT NULL,
  \`faskes_tujuan\` VARCHAR(100) NOT NULL,
  \`poli_tujuan\` VARCHAR(100) NOT NULL,
  \`tanggal_kunjungan\` DATE NOT NULL,
  \`status\` ENUM('menunggu','dipanggil','selesai','dibatalkan') NOT NULL DEFAULT 'menunggu',
  \`waktu_daftar\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_tanggal_poli\` (\`tanggal_kunjungan\`, \`poli_tujuan\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`antrean_online\` (\`nomor_antrean\`, \`nik\`, \`nama_pasien\`, \`no_telepon\`, \`faskes_tujuan\`, \`poli_tujuan\`, \`tanggal_kunjungan\`, \`status\`) VALUES
('A-001', '3101015504890001', 'Bapak Suryadi', '081298765432', 'Puskesmas Kecamatan (Pulau Tidung)', 'Poli Umum', CURDATE(), 'selesai'),
('A-002', '3101016208950003', 'Ibu Nurhasanah', '081387654321', 'Puskesmas Kecamatan (Pulau Tidung)', 'Poli KIA / KB', CURDATE(), 'dipanggil'),
('A-003', '3101024501920002', 'Ahmad Fadillah', '085712345678', 'Puskesmas Kelurahan Pulau Pari', 'Poli Gigi & Mulut', CURDATE(), 'menunggu');

-- ------------------------------------------------------------------------------
-- 14. TABEL PENGADUAN & ASPIRASI MASYARAKAT (pengaduan_masyarakat)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`pengaduan_masyarakat\`;
CREATE TABLE \`pengaduan_masyarakat\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`nomor_tiket\` VARCHAR(50) NOT NULL UNIQUE,
  \`nama_pelapor\` VARCHAR(150) NOT NULL,
  \`kontak_hp\` VARCHAR(50) NOT NULL,
  \`pulau\` VARCHAR(100) NOT NULL,
  \`kategori\` VARCHAR(100) NOT NULL,
  \`isi_laporan\` LONGTEXT NOT NULL,
  \`status\` ENUM('diterima','diproses','selesai','ditolak') NOT NULL DEFAULT 'diterima',
  \`tanggapan\` LONGTEXT DEFAULT NULL,
  \`tanggal_lapor\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`pengaduan_masyarakat\` (\`nomor_tiket\`, \`nama_pelapor\`, \`kontak_hp\`, \`pulau\`, \`kategori\`, \`isi_laporan\`, \`status\`, \`tanggapan\`) VALUES
('TKT-2026-001', 'Hendra Setiawan', '081234567890', 'Pulau Tidung', 'Pelayanan', 'Apresiasi untuk pelayanan cepat dokter jaga IGD dan perawat yang sigap saat malam hari.', 'selesai', 'Terima kasih banyak atas apresiasi yang diberikan. Salam sehat selalu!'),
('TKT-2026-002', 'Siti Rahmawati', '081987654321', 'Pulau Pari', 'Fasilitas', 'Mohon penambahan stok vitamin anak di poskesdes saat kegiatan Posyandu.', 'diproses', 'Laporan telah dikoordinasikan dengan bagian Farmasi & Logistik Klaster 1.');

SET FOREIGN_KEY_CHECKS = 1;

-- ==============================================================================
-- AKHIR DARI FILE SQL PUSKESMAS KECAMATAN KEPULAUAN SERIBU SELATAN
-- ==============================================================================
`;

  return sql;
}

const sqlContent = generateSql();
const outPath1 = path.join(process.cwd(), 'database', 'puskesmas_niagahoster.sql');
const outPath2 = path.join(process.cwd(), 'public', 'assets', 'database', 'puskesmas_niagahoster.sql');

fs.writeFileSync(outPath1, sqlContent, 'utf-8');
fs.writeFileSync(outPath2, sqlContent, 'utf-8');

console.log('Berhasil membuat file SQL Niagahoster:');
console.log('1. ' + outPath1 + ' (' + Buffer.byteLength(sqlContent) + ' bytes)');
console.log('2. ' + outPath2 + ' (' + Buffer.byteLength(sqlContent) + ' bytes)');
