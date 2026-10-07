/**
 * Konfigurasi Database SQL Niagahoster (MySQL / MariaDB)
 * Puskesmas Kecamatan Kepulauan Seribu Selatan
 */

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password?: string;
  charset: string;
}

export const defaultNiagahosterConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_NAME || 'u1234567_puskesmas',
  user: process.env.DB_USER || 'u1234567_puskesmas_user',
  charset: 'utf8mb4'
};

export const databaseTablesInfo = [
  {
    name: 'admin_users',
    description: 'Data akun pengelola/admin Puskesmas dengan hak akses multi-role (super_admin, operator).',
    columns: ['id', 'username', 'password_hash', 'nama_lengkap', 'email', 'role', 'status', 'created_at']
  },
  {
    name: 'profil_puskesmas',
    description: 'Profil kelembagaan, visi misi, tata nilai, sambutan pimpinan, jam kerja (Kepgub 755/2024), dan kontak resmi.',
    columns: ['id', 'nama_puskesmas', 'sub_judul', 'motto', 'kepala_nama', 'sambutan_kepala', 'visi', 'misi_json', 'telepon', 'whatsapp']
  },
  {
    name: 'fasilitas_pulau',
    description: 'Faskes di 4 pulau (Pulau Tidung, Pulau Pari, Pulau Untung Jawa, Pulau Lancang, Pulau Payung).',
    columns: ['id', 'nama_pulau', 'kelurahan', 'jenis_faskes', 'status_operasional', 'alamat', 'kontak_telepon', 'whatsapp', 'kepala_pos']
  },
  {
    name: 'layanan_poliklinik',
    description: 'Daftar poliklinik dan layanan kesehatan dalam gedung & luar gedung beserta persyaratan dan alur.',
    columns: ['id', 'nama_layanan', 'kategori', 'klaster_id', 'deskripsi', 'jadwal', 'biaya', 'persyaratan_json', 'icon_name']
  },
  {
    name: 'klaster_ilp',
    description: '5 Klaster Integrasi Layanan Primer (ILP) sesuai Kepmenkes RI No. 2014/2023.',
    columns: ['id', 'nomor_klaster', 'judul_klaster', 'sasaran_siklus_hidup', 'koordinator', 'warna', 'ruang_lingkup_json']
  },
  {
    name: 'jadwal_pelayanan',
    description: 'Jadwal dokter spesialis, dokter umum, dan poliklinik di seluruh pulau.',
    columns: ['id', 'nama_layanan', 'faskes_pulau', 'hari', 'jam_layanan', 'dokter_petugas', 'kuota', 'keterangan']
  },
  {
    name: 'berita_kegiatan',
    description: 'Warta berita kesehatan, rilis pers kegiatan lapangan, dan edukasi bahari.',
    columns: ['id', 'judul', 'kategori', 'ringkasan', 'konten', 'penulis', 'tanggal', 'foto_url', 'dibaca']
  },
  {
    name: 'agenda_kegiatan',
    description: 'Jadwal agenda penyuluhan, posyandu siklus hidup, donor darah, dan vaksinasi.',
    columns: ['id', 'judul', 'tanggal', 'waktu', 'lokasi', 'pelaksana', 'target_peserta', 'status']
  },
  {
    name: 'pegawai_nakes',
    description: 'Daftar tenaga kesehatan dokter, bidan, perawat, apoteker, dan staf di seluruh pulau.',
    columns: ['id', 'nama', 'role', 'kategori', 'nip', 'sip_str', 'penempatan', 'kualifikasi', 'status']
  },
  {
    name: 'dokumen_publik',
    description: 'Dokumen SOP, Standar Pelayanan Publik, Maklumat Pelayanan, dan Formulir.',
    columns: ['id', 'nama', 'kategori', 'tanggal', 'ukuran_berkas', 'tipe_berkas', 'url_berkas', 'jumlah_unduhan']
  },
  {
    name: 'antrean_online',
    description: 'Data pendaftaran antrean berobat online masyarakat.',
    columns: ['id', 'nomor_antrean', 'nik', 'nama_pasien', 'no_telepon', 'faskes_tujuan', 'poli_tujuan', 'tanggal_kunjungan', 'status']
  },
  {
    name: 'pengaduan_masyarakat',
    description: 'Tiket pengaduan, masukan, kritik, dan saran masyarakat antar pulau.',
    columns: ['id', 'nomor_tiket', 'nama_pelapor', 'kontak_hp', 'pulau', 'kategori', 'isi_laporan', 'status', 'tanggapan']
  },
  {
    name: 'faq_kesehatan',
    description: 'Tanya jawab umum seputar faskes, rujukan medis terpadu, dan persyaratan BPJS.',
    columns: ['id', 'kategori', 'pertanyaan', 'jawaban']
  },
  {
    name: 'statistik_faskes',
    description: 'Angka capaian, kapasitas rawat inap, jumlah pulau terlayani, dan kepuasan masyarakat.',
    columns: ['id', 'label', 'nilai', 'subtext', 'ikon', 'urutan']
  }
];
