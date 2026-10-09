import { 
  PuskesmasProfile, 
  StatisticItem, 
  IslandFacility, 
  HealthService, 
  ILPCluster, 
  ServiceSchedule, 
  NewsItem, 
  AgendaEvent, 
  HealthArticle, 
  DocumentItem, 
  FaqItem,
  StaffMember,
  OrgPerson,
  OrgCluster,
  SDMKItem
} from '../types';

export const initialProfile: PuskesmasProfile = {
  name: 'Puskesmas Kepulauan Seribu Selatan',
  subtitle: 'Pusat Informasi dan Pelayanan Kesehatan Masyarakat Kepulauan Seribu Selatan',
  motto: 'Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami',
  headOfPuskesmas: 'dr. Ignatius Dendy Purnama',
  headOfPuskesmasName: 'dr. Ignatius Dendy Purnama',
  headOfPuskesmasTitle: 'Kepala Puskesmas Kecamatan Kepulauan Seribu Selatan',
  headOfPuskesmasNip: '198503222010012031',
  headOfPuskesmasPhoto: '/assets/kepala-puskesmas.svg',
  welcomeSpeech: `Assalamu'alaikum Wr. Wb.

Puji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas segala rahmat dan karunia-Nya sehingga kita dapat menjalankan tugas pelayanan kesehatan kepada masyarakat dengan sebaik-baiknya.

Selamat datang di website resmi Puskesmas Kepulauan Seribu Selatan. Website ini merupakan salah satu media informasi dan komunikasi kami kepada masyarakat dalam rangka meningkatkan transparansi dan akuntabilitas pelayanan publik.

Puskesmas Kepulauan Seribu Selatan berkomitmen untuk memberikan pelayanan kesehatan yang berkualitas, profesional, dan terjangkau bagi seluruh masyarakat di wilayah kerja kami. Kami terus berupaya meningkatkan kualitas pelayanan melalui peningkatan kompetensi sumber daya manusia, perbaikan sarana dan prasarana, serta penerapan sistem manajemen mutu.

Kami menyadari bahwa kesehatan merupakan investasi berharga bagi setiap individu dan masyarakat. Oleh karena itu, kami mengajak seluruh masyarakat untuk berpartisipasi aktif dalam menjaga dan meningkatkan status kesehatan melalui perilaku hidup bersih dan sehat serta pemanfaatan fasilitas pelayanan kesehatan yang tersedia.

Akhir kata, kami mengucapkan terima kasih atas kepercayaan yang diberikan kepada Puskesmas Kepulauan Seribu Selatan. Kritik dan saran dari masyarakat sangat kami harapkan demi perbaikan pelayanan kesehatan di masa mendatang.

Wassalamu'alaikum Wr. Wb.

Kepala Puskesmas Kepulauan Seribu Selatan

dr. Ignatius Dendy Purnama
NIP. 198503222010012031`,
  welcomeSpeechHighlights: [
    'Penerapan penuh Integrasi Layanan Primer (ILP) 5 Klaster Siklus Hidup',
    'Gedung Baru Representatif dengan Fasilitas Rawat Inap & Laboratorium Lengkap',
    'Kesiapsiagaan Layanan Rujukan Medis & IGD 24 Jam Non-Stop Antar Pulau',
    'Budaya Kerja Berlandaskan Tata Nilai PRIMA dan Kepuasan Masyarakat Pesisir'
  ],
  vision: 'Menjadi Puskesmas Terdepan dalam mewujudkan pelayanan PRIMA menuju Kecamatan Kepulauan Seribu Selatan Sehat.',
  missions: [
    'Meningkatkan **Kompetensi SDM** (Sumber Daya Manusia) kesehatan.',
    'Meningkatkan **Kenyamanan Pelayanan** bagi pasien.',
    'Meningkatkan **sarana dan pra sarana** fasilitas kesehatan.',
    'Meningkatkan **integrasi UKM dan UKP**, kerjasama lintas program dan lintas sektor.',
    'Meningkatkan kualitas **perencanaan dan pemecahan masalah** berdasarkan kebutuhan masyarakat.',
    'Meningkatkan **mutu secara terus menerus** dan berkesinambungan.'
  ],
  values: [
    {
      code: 'P',
      title: 'Profesional',
      desc: 'Bekerja dengan integritas tinggi, kompeten, dan senantiasa berpedoman pada standar operasional prosedur (SOP) profesi medis.',
      detail: 'Menjunjung tinggi kode etik profesi kesehatan, memperbarui keilmuan berkala, dan mengutamakan keselamatan pasien (patient safety).'
    },
    {
      code: 'R',
      title: 'Ramah',
      desc: 'Memberikan pelayanan dengan senyum, salam, sapa, sopan, dan santun serta kepedulian yang tulus kepada pasien dan keluarga.',
      detail: 'Membangun komunikasi terapeutik yang menenangkan, berempati terhadap kesulitan warga pulau, dan bersikap inklusif.'
    },
    {
      code: 'I',
      title: 'Inovatif',
      desc: 'Mampu beradaptasi secara kreatif menciptakan terobosan layanan kesehatan maritim terpadu dan kemudahan akses publik.',
      detail: 'Memanfaatkan digitalisasi rekam medis (RME), penjangkauan home care kepulauan, dan edukasi kesehatan kreatif pesisir.'
    },
    {
      code: 'M',
      title: 'Melayani',
      desc: 'Menempatkan kebutuhan dan kepuasan masyarakat pesisir sebagai prioritas utama dengan kesungguhan hati.',
      detail: 'Cepat tanggap merespons keluhan, memberikan solusi terbaik, dan memastikan tidak ada warga pulau yang tertinggal dalam layanan.'
    },
    {
      code: 'A',
      title: 'Akuntabel',
      desc: 'Bertanggung jawab atas setiap tindakan medis, tata kelola fasilitas, dan keterbukaan informasi kepada masyarakat.',
      detail: 'Setiap proses pelayanan, pelaporan, dan penggunaan anggaran dapat dipertanggungjawabkan secara transparan dan berlandaskan hukum.'
    }
  ],
  history: 'Puskesmas Kecamatan Kepulauan Seribu Selatan berdiri pada tahun 2002 seiring dengan terbentuknya Kabupaten Administrasi Kepulauan Seribu di Provinsi DKI Jakarta. Dulunya, puskesmas ini merupakan Puskesmas Kelurahan Pulau Tidung. Puskesmas berlokasi di Dermaga Pulau Tidung dan merupakan fasilitas puskesmas rawat inap utama. Puskesmas membawahi 2 Puskesmas Kelurahan (Puskesmas Kel. Pulau Pari dan Puskesmas Kel. Pulau Untung Jawa), serta 2 Pos Kesehatan di Pulau Payung dan Pulau Lancang. Pada Mei 2023, Puskesmas Kepulauan Seribu Selatan resmi beroperasi di gedung baru 2 lantai yang diperluas dari 520 m² menjadi 1.019 m², dengan penambahan ruang rawat inap laki-laki, perempuan, dan anak-anak, ruang isolasi, ruang pascapersalinan, laboratorium terpadu, dan dermaga kapal rujukan medis 24 jam.',
  workingAreaDescription: 'Wilayah kerja Puskesmas Kepulauan Seribu Selatan mencakup 3 kelurahan administratif yaitu Kelurahan Pulau Tidung, Kelurahan Pulau Pari, dan Kelurahan Pulau Untung Jawa, melayani pulau-pulau berpenghuni meliputi Pulau Tidung, Pulau Pari, Pulau Lancang, Pulau Untung Jawa, dan Pulau Payung dengan jejaring 2 Puskesmas Kelurahan dan 2 Pos Kesehatan terintegrasi.',
  address: 'Dermaga Pulau Tidung, Jl. Pantai Selatan RT 007/RW 001, Kelurahan Pulau Tidung, Kecamatan Kepulauan Seribu Selatan, Kabupaten Administrasi Kepulauan Seribu, Provinsi DKI Jakarta 14520',
  phone: '(021) 7552-3010 / 0859-6100-0003',
  emergencyHotline: '119 / 0859-6100-0003',
  seaAmbulanceHotline: '0859-6100-0003 (24 Jam Non-Stop)',
  whatsapp: '0859-6100-0003',
  email: 'puskesmasseribuselatan@jakarta.go.id',
  operatingHours: 'Senin: 12.00 - 18.00 WIB | Selasa - Kamis: 07.30 - 16.00 WIB | Jumat: 07.30 - 16.30 WIB (Kepgub DKI No. 755/2024)',
  emergencyHours: 'Setiap Hari: 24 Jam Non-Stop (Rawat Inap, Siaga, Ruang Bersalin & Gawat Darurat)',
  serviceHoursRegulation: {
    regulationTitle: 'Keputusan Gubernur Provinsi DKI Jakarta Nomor 755 Tahun 2024',
    regulationDesc: 'Hari Kerja dan Jam Kerja pada Perangkat Daerah / Unit Kerja yang Memberikan Pelayanan Langsung kepada Masyarakat di Lingkungan Pemerintah Provinsi DKI Jakarta.',
    poliklinikMonThu: 'Senin: 12.00 - 18.00 WIB | Selasa - Kamis: 07.30 - 16.00 WIB',
    poliklinikFri: 'Jumat: 07.30 - 16.30 WIB (Istirahat Sholat Jumat: 11.45 - 13.00 WIB)',
    registrationMonThu: 'Senin: 11.30 - 17.30 WIB | Selasa - Kamis: 07.30 - 15.00 WIB',
    registrationFri: 'Jumat: 07.30 - 15.30 WIB',
    emergencyHours: 'Setiap Hari: 24 Jam Non-Stop (Pelayanan Rawat Inap, Pelayanan Siaga, Pelayanan Ruang Bersalin, Pelayanan Gawat Darurat)',
    seaAmbulanceHours: '24 Jam Siaga Antar Pulau (Respon Cepat Evakuasi Rujukan Maritim)',
    posyanduHours: '08.30 - 12.00 WIB (Sesuai Kalender Agenda Siklus Hidup ILP di Setiap RW)',
    extendedHours: 'Layanan Siaga 24 Jam di Seluruh Fasilitas',
    notes: 'Berdasarkan Kepgub DKI No. 755 Tahun 2024: Jam Rawat Jalan (Poli) hari Senin beroperasi 12.00 - 18.00 WIB, Selasa - Kamis 07.30 - 16.00 WIB, Jumat 07.30 - 16.30 WIB. Layanan 24 Jam (Rawat Inap, Siaga, Ruang Bersalin, Gawat Darurat) beroperasi Setiap Hari 24 Jam.'
  },
  organizationStructureImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  organizationStructureCaption: 'Bagan Struktur Organisasi Integrasi Layanan Primer (ILP) Puskesmas Kecamatan Kepulauan Seribu Selatan Sesuai Kepmenkes RI No. 2014/2023',
  organizationStructureUpdated: 'Tahun 2025/2026',
  websiteUrl: 'https://puskesmasseribuselatan.com/',
  instagram: 'https://instagram.com/puskesmaskepulauanseribuselatan',
  facebook: 'https://www.facebook.com/puskesmas.kepulauanseribuselatan',
  youtube: 'Puskesmas Kepulauan Seribu Selatan'
};

export const initialStatistics: StatisticItem[] = [
  {
    id: 'stat-1',
    label: 'Unit Pelayanan',
    value: 4,
    suffix: '',
    description: 'Puskesmas Induk & 3 Pustu Pulau (Lancang, Pari, Untung Jawa)',
    icon: 'Building2'
  },
  {
    id: 'stat-2',
    label: 'Klaster ILP',
    value: 5,
    suffix: '',
    description: '4 Klaster Siklus Hidup + 1 Lintas Klaster',
    icon: 'Layers'
  },
  {
    id: 'stat-3',
    label: 'Tenaga Kesehatan',
    value: 54,
    suffix: '+',
    description: 'Dokter, Dokter Gigi, Bidan, Perawat & Nakes Terpadu',
    icon: 'UserCheck'
  },
  {
    id: 'stat-4',
    label: 'Masyarakat Terlayani',
    value: 12500,
    suffix: '+',
    description: 'Warga Pulau & Wisatawan Pesisir',
    icon: 'Users'
  }
];

export const initialIslands: IslandFacility[] = [
  {
    id: 'puskesmas-induk',
    name: 'Puskesmas Kepulauan Seribu Selatan',
    type: 'Puskesmas',
    islandName: 'Pulau Tidung',
    address: 'Dermaga Pulau Tidung, Jl. Pantai Selatan RT 007/RW 001, Kelurahan Pulau Tidung',
    operatingHours: 'Senin: 12.00 - 18.00 WIB | Selasa - Kamis: 07.30 - 16.00 WIB | Jumat: 07.30 - 16.30 WIB | Layanan 24 Jam: Setiap Hari',
    emergencyService: 'Layanan 24 Jam: Rawat Inap, Siaga, Ruang Bersalin, Gawat Darurat & Layanan Rujukan',
    services: [
      'Pelayanan Umum',
      'Pelayanan Gigi',
      'Pelayanan KIA (Kesehatan Ibu & Anak)',
      'Pelayanan Imunisasi',
      'Pelayanan TB (Tuberkulosis)',
      'Pelayanan MTBS (Manajemen Terpadu Balita Sakit)',
      'Pelayanan Gizi',
      'Pelayanan Lansia',
      'Pelayanan Keswa (Kesehatan Jiwa)',
      'Pelayanan Rawat Inap — 24 Jam',
      'Pelayanan Siaga — 24 Jam',
      'Pelayanan Ruang Bersalin — 24 Jam',
      'Pelayanan Gawat Darurat — 24 Jam'
    ],
    contactNumber: '(021) 7552-3010',
    whatsapp: '0859-6100-0003',
    headOfficer: 'dr. Ignatius Dendy Purnama',
    image: '/slider.png',
    coordinates: { lat: -5.7997, lng: 106.5235 },
    description: 'Pusat pelayanan kesehatan induk kecamatan berlokasi strategis di Dermaga Pulau Tidung dengan fasilitas gedung baru representatif, poliklinik rawat jalan terintegrasi, rawat inap 24 jam, dan pelayanan persalinan.'
  },
  {
    id: 'pustu-lancang',
    name: 'Pustu Pulau Lancang',
    type: 'Pustu',
    islandName: 'Pulau Lancang',
    address: 'Kompleks Pemukiman Warga, RW 01, Kelurahan Pulau Pari',
    operatingHours: 'Rawat Jalan (Poli) Sesuai Kepgub DKI No. 755/2024 | Pelayanan Siaga 24 Jam',
    emergencyService: 'Pelayanan Siaga Bidan & Perawat Desa 24 Jam',
    services: [
      'Pelayanan Umum',
      'Pelayanan KIA & KB',
      'Pelayanan Imunisasi',
      'Pelayanan Gizi & Lansia',
      'Pelayanan MTBS & Balita',
      'Pelayanan Siaga — 24 Jam'
    ],
    contactNumber: '0859-6100-0003',
    whatsapp: '0859-6100-0003',
    headOfficer: 'Ns. Ahmad Fauzi, S.Kep',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: -5.8792, lng: 106.5911 },
    description: 'Puskesmas Pembantu di Pulau Lancang melayani masyarakat nelayan dan keluarga pulau dengan pelayanan rawat jalan terpadu, posyandu siklus hidup, dan siaga 24 jam.'
  },
  {
    id: 'pustu-pari',
    name: 'Pustu Pulau Pari',
    type: 'Pustu',
    islandName: 'Pulau Pari',
    address: 'Jl. Dermaga Utama, RT 01/RW 04, Kelurahan Pulau Pari',
    operatingHours: 'Rawat Jalan (Poli) Sesuai Kepgub DKI No. 755/2024 | Pelayanan Siaga 24 Jam',
    emergencyService: 'Pelayanan Siaga Nakes 24 Jam & Evakuasi Medis Laut',
    services: [
      'Pelayanan Umum',
      'Pelayanan KIA & KB',
      'Pelayanan Imunisasi',
      'Pelayanan Gizi & MTBS',
      'Pelayanan Lansia & PTM',
      'Pelayanan Siaga — 24 Jam'
    ],
    contactNumber: '0859-6100-0003',
    whatsapp: '0859-6100-0003',
    headOfficer: 'dr. Rizki Pratama',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: -5.8611, lng: 106.6186 },
    description: 'Puskesmas Pembantu di Pulau Pari melayani kesehatan warga pesisir serta pengunjung dan wisatawan bahari Pantai Pasir Perawan.'
  },
  {
    id: 'pustu-untung-jawa',
    name: 'Pustu Pulau Untung Jawa',
    type: 'Pustu',
    islandName: 'Pulau Untung Jawa',
    address: 'Jl. Sakura No. 12, RW 02, Kelurahan Pulau Untung Jawa',
    operatingHours: 'Rawat Jalan (Poli) Sesuai Kepgub DKI No. 755/2024 | Pelayanan Siaga 24 Jam',
    emergencyService: 'Pelayanan Siaga Medis 24 Jam',
    services: [
      'Pelayanan Umum',
      'Pelayanan Gigi',
      'Pelayanan KIA & Anak',
      'Pelayanan Imunisasi',
      'Pelayanan Lansia & Gizi',
      'Pelayanan Siaga — 24 Jam'
    ],
    contactNumber: '0859-6100-0003',
    whatsapp: '0859-6100-0003',
    headOfficer: 'dr. Nurul Fitriani',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: -5.9774, lng: 106.7058 },
    description: 'Puskesmas Pembantu di Pulau Untung Jawa, pintu gerbang pariwisata bahari terdekat dengan daratan Tangerang dan Jakarta Utara.'
  }
];

export const initialILPClusters: ILPCluster[] = [
  {
    id: 'klaster-1',
    clusterNumber: 1,
    title: 'Klaster 1: Manajemen',
    subtitle: 'Tata Kelola, Perencanaan, Mutu & Keselamatan',
    icon: 'Building2',
    color: 'from-blue-600 to-indigo-700',
    description: 'Klaster 1 bertanggung jawab atas perencanaan terpadu, administrasi faskes, manajemen kepegawaian nakes di pulau-pulau, keuangan, pengadaan logistik obat/alat kesehatan bahari, manajemen mutu, keselamatan pasien, serta monitoring evaluasi berkala.',
    objectives: [
      'Menjamin ketersediaan obat, vaksin, dan alat medis di Puskesmas dan seluruh Pustu pulau.',
      'Memastikan standar operasional prosedur keselamatan pasien dan mutu faskes maritim.',
      'Mengkoordinasikan sistem informasi kesehatan dan laporan epidemiologi wilayah kepulauan.',
      'Mengelola alokasi SDM kesehatan nakes yang merata di 5 pulau pemukiman.'
    ],
    services: [
      'Manajemen Puskesmas & Ketatausahaan',
      'Administrasi Umum & Surat Rekomendasi Kesehatan',
      'Perencanaan Program Kesehatan Tahunan (PTP/RUK/RPK)',
      'Manajemen Kepegawaian & Peningkatan Kapasitas Nakes',
      'Manajemen Keuangan & Pertanggungjawaban APBD/BLUD',
      'Pengadaan & Distribusi Logistik Medis Kepulauan',
      'Pelaporan SP2TP & SatuData Kesehatan',
      'Monitoring, Evaluasi, dan Audit Internal Faskes',
      'Manajemen Mutu, PPI, dan Manajemen Risiko Keselamatan Pasien'
    ],
    targetAudience: 'Seluruh unit pelayanan Puskesmas, Pustu, Pegawai, Pemangku Kepentingan, dan Lintas Sektor',
    serviceFlow: 'Permohonan / Dokumen Masuk → Verifikasi Administrasi → Koordinasi Teknis Tim Klaster → Penerbitan Dokumen / Tindak Lanjut Mutu',
    schedule: 'Senin - Jumat: 07.30 - 16.00 WIB',
    picName: 'Penanggung Jawab: Kasubag TU / [DATA AKAN DIISI ADMIN]',
    relatedDocs: [
      'SOP Tata Naskah Dinas Puskesmas',
      'Manual Mutu & Keselamatan Pasien',
      'Pedoman Pengelolaan Logistik Antar-Pulau'
    ],
    faq: [
      {
        q: 'Bagaimana Puskesmas mengelola distribusi obat ke pulau-pulau terluar?',
        a: 'Distribusi logistik farmasi dilakukan secara terjadwal setiap minggu dan bulan menggunakan kapal dinas operasional dengan pengawasan ketat rantai dingin (cold chain) untuk vaksin.'
      },
      {
        q: 'Apakah masyarakat bisa menyampaikan kritik dan saran untuk perbaikan mutu?',
        a: 'Sangat bisa, masyarakat dapat mengisi kotak saran di Puskesmas/Pustu, formulir kepuasan online di website ini, atau langsung melalui WhatsApp resmi Puskesmas.'
      }
    ],
    contact: 'Email: tu.puskesmas.seribuselatan@[DATA AKAN DIISI ADMIN].go.id'
  },
  {
    id: 'klaster-2',
    clusterNumber: 2,
    title: 'Klaster 2: Ibu dan Anak',
    subtitle: 'Kesehatan Ibu Hamil, Bayi, Balita, Remaja & Reproduksi',
    icon: 'Baby',
    color: 'from-pink-500 to-rose-600',
    description: 'Klaster 2 menyelenggarakan pelayanan komprehensif bagi siklus hidup ibu dan anak, mulai dari calon pengantin, pemeriksaan kehamilan (ANC terpadu), persalinan aman 24 jam, perawatan nifas, kesehatan bayi baru lahir, imunisasi dasar lengkap, pemantauan tumbuh kembang balita bebas stunting, hingga kesehatan remaja.',
    objectives: [
      'Menurunkan angka kematian ibu (AKI) dan angka kematian bayi (AKB) di wilayah kepulauan.',
      'Mencegah dan mengentaskan kejadian stunting serta wasting pada balita pesisir.',
      'Mencapai cakupan imunisasi dasar lengkap (IDL) 100% pada anak di seluruh pulau.',
      'Memberikan edukasi kesehatan reproduksi dan gizi remaja sejak dini.'
    ],
    services: [
      'Pemeriksaan Kesehatan Ibu Hamil (ANC 6 Kali + USG Dokter)',
      'Pertolongan Persalinan Normal 24 Jam (PONED)',
      'Pelayanan Nifas & Konseling Menyusui / ASI Eksklusif',
      'Pelayanan Neonatus & Skrining Hipotiroid Kongenital (SHK)',
      'Pelayanan Imunisasi Rutin Lengkap (Bayi, Baduta, WUS & Anak Sekolah)',
      'Pemantauan Tumbuh Kembang Balita & Skrining SDIDTK di Posyandu',
      'Penanganan Gizi Kurang & Intervensi PMT Pemulihan Stunting',
      'Pemeriksaan Kesehatan Calon Pengantin (Catin)',
      'Pelayanan Keluarga Berencana (KB) IUD, Implan, Suntik, Pil',
      'Posyandu Remaja & Edukasi Kesehatan Reproduksi Sekolah'
    ],
    targetAudience: 'Ibu Hamil, Ibu Bersalin, Ibu Menyusui, Bayi, Balita, Anak Prasekolah, Anak Usia Sekolah, Remaja & Calon Pengantin',
    serviceFlow: 'Pendaftaran → Skrining Buku KIA/Buku Catin → Pemeriksaan Fisik & Kebidanan → Laboratorium (bila perlu) → Edukasi/Resep → Konseling Gizi/Pustu Terpadu',
    schedule: 'Poli KIA: Senin - Jumat (08.00 - 15.00 WIB) | Persalinan: 24 Jam Siaga',
    picName: 'Penanggung Jawab: Bdn. [DATA AKAN DIISI ADMIN]',
    relatedDocs: [
      'Buku Panduan KIA & Imunisasi Nasional',
      'SOP Rujukan Emergensi Maternal Neonatal Maritim',
      'Pedoman Pemberian Makanan Tambahan Berbasis Pangan Lokal Kepulauan'
    ],
    faq: [
      {
        q: 'Apakah USG kehamilan tersedia di Puskesmas Kepulauan Seribu Selatan?',
        a: 'Ya, pemeriksaan USG kehamilan trimester 1 dan trimester 3 dilakukan oleh dokter umum terlatih dan dokter spesialis berkala secara gratis bagi peserta BPJS.'
      },
      {
        q: 'Bagaimana jika ibu hamil membutuhkan rujukan persalinan berisiko tinggi?',
        a: 'Puskesmas menyiagakan kapal rujukan berstandar medis untuk merujuk ibu hamil ke RSUD Kepulauan Seribu (Pulau Pramuka) atau RS Rujukan Darat Jakarta.'
      }
    ],
    contact: 'Hotline KIA & Kebidanan: 0812-[DATA AKAN DIISI ADMIN]'
  },
  {
    id: 'klaster-3',
    clusterNumber: 3,
    title: 'Klaster 3: Usia Dewasa & Lansia',
    subtitle: 'Skrining PTM, Kesehatan Kerja, Jiwa & Geriatri Terpadu',
    icon: 'Users',
    color: 'from-emerald-600 to-teal-700',
    description: 'Klaster 3 memprioritaskan pelayanan promotif, preventif, kuratif, dan rehabilitatif bagi penduduk usia produktif (15-59 tahun) dan lanjut usia (≥60 tahun). Fokus pada pencegahan dan pengendalian Penyakit Tidak Menular (hipertensi, diabetes melitus, jantung, stroke, kanker), kesehatan kerja nelayan, kesehatan jiwa, serta pelayanan santun lansia.',
    objectives: [
      'Meningkatkan cakupan deteksi dini dan skrining PTM pada seluruh warga dewasa kepulauan.',
      'Mengendalikan kadar gula darah dan tekanan darah penderita diabetes dan hipertensi secara terkontrol.',
      'Mewujudkan lansia mandiri, bugar, aktif, dan produktif melalui Posyandu Lansia & Program Geriatri.',
      'Menyediakan layanan konseling dan deteksi dini kesehatan jiwa masyarakat pesisir.'
    ],
    services: [
      'Skrining Terpadu PTM (Tensi, Gula Darah, Kolesterol, Asam Urat, Lingkar Perut)',
      'Pelayanan Pengendalian Hipertensi & Diabetes Mellitus (Prolanis)',
      'Skrining Kanker Leher Rahim (IVA Test) & Kanker Payudara (SADANIS)',
      'Pemeriksaan Kesehatan Kerja Nelayan & Pekerja Pariwisata',
      'Skrining & Konseling Kesehatan Jiwa (SRQ-20)',
      'Pelayanan Poli Santun Lansia & Skrining Geriatri Komprehensif',
      'Home Care Lansia Risti (Kunjungan Rumah Nakes)',
      'Senam Kebugaran Lansia & Posyandu Lansia Rutin di Setiap Pulau',
      'Konseling Berhenti Merokok (KBM)'
    ],
    targetAudience: 'Masyarakat Usia Produktif (15 - 59 Tahun) dan Warga Lanjut Usia (≥ 60 Tahun)',
    serviceFlow: 'Pendaftaran Jalur Ramah Lansia/Umum → Skrining Faktor Risiko PTM → Pemeriksaan Dokter → Laboratorium PTM → Penyerahan Obat Kronis 30 Hari → Konseling Gaya Hidup',
    schedule: 'Poli Umum & Lansia: Setiap Hari Kerja (08.00 - 15.00 WIB)',
    picName: 'Penanggung Jawab: dr. [DATA AKAN DIISI ADMIN]',
    relatedDocs: [
      'Pedoman Skrining PTM Siklus Hidup Kemenkes',
      'SOP Pelayanan Santun Lansia Terpadu',
      'Format Instrumen Pengkajian Paripurna Pasien Geriatri (P3G)'
    ],
    faq: [
      {
        q: 'Berapa kali sebaiknya masyarakat usia produktif melakukan skrining PTM?',
        a: 'Setiap warga usia 15 tahun ke atas dianjurkan melakukan skrining kesehatan minimal 1 kali setiap tahun di Puskesmas atau Posyandu ILP terdekat.'
      },
      {
        q: 'Apakah obat darah tinggi dan diabetes bisa diambil rutin setiap bulan?',
        a: 'Ya, pasien dengan penyakit kronis terkontrol berhak mendapatkan obat rutin bulanan secara gratis dengan jaminan BPJS Kesehatan.'
      }
    ],
    contact: 'Konsultasi Klaster Dewasa & Lansia: 0813-[DATA AKAN DIISI ADMIN]'
  },
  {
    id: 'klaster-4',
    clusterNumber: 4,
    title: 'Klaster 4: Penanggulangan Penyakit Menular',
    subtitle: 'Surveilans, TB, DBD, HIV-IMS, Kusta & Pengendalian Vektor Pesisir',
    icon: 'ShieldAlert',
    color: 'from-amber-600 to-orange-600',
    description: 'Klaster 4 bertugas melakukan pencegahan, penemuan kasus dini, pengobatan tuntas, penyelidikan epidemiologi cepat, surveilans aktif kejadian luar biasa (KLB), dan pengendalian vektor penyakit menular (nyamuk Aedes aegypti, malaria, jentik) di pulau-pulau pemukiman.',
    objectives: [
      'Memutus mata rantai penularan Tuberkulosis (TBC) dengan terapi OAT hingga sembuh tuntas.',
      'Mencegah KLB Demam Berdarah Dengue (DBD) melalui Gerakan 1 Rumah 1 Jumantik pulau.',
      'Melakukan skrining dini dan pendampingan pengobatan HIV, IMS, Hepatitis B/C, dan Kusta.',
      'Melaksanakan sistem kewaspadaan dini dan respons (SKDR) potensi penyakit menular kepulauan.'
    ],
    services: [
      'Pemeriksaan & Pengobatan Tuberkulosis (Poli TB DOTS)',
      'Pemeriksaan Dahak Tes Cepat Molekuler (TCM TB)',
      'Skrining & Konseling HIV/IMS Sukarela (VCT/PITC)',
      'Penanganan & Pemantauan Pasien Kusta dan Filariasis',
      'Penyelidikan Epidemiologi (PE) Kasus DBD dalam 1x24 Jam',
      'Surveilans Vektor Nyamuk & Pembinaan Kader Jumantik Pulau',
      'Pengendalian ISPA, Diare Akut, dan Penyakit Menular Pesisir',
      'Kesiapsiagaan Posko Tanggap Bencana & KLB Maritim'
    ],
    targetAudience: 'Masyarakat Umum, Kontak Erat Penderita, Kelompok Berisiko, dan Seluruh Lingkungan Pemukiman Pulau',
    serviceFlow: 'Pendaftaran / Rujukan Skrining → Triase Ruang Isolasi/DOTS → Pemeriksaan Laboratorium Cepat (TCM/Rapid/Darah) → Konseling & Edukasi Kepatuhan Minum Obat → Pelacakan Kontak Erat',
    schedule: 'Poli DOTS / P2P: Senin - Jumat (08.30 - 14.30 WIB)',
    picName: 'Penanggung Jawab: Ns. [DATA AKAN DIISI ADMIN]',
    relatedDocs: [
      'Pedoman Nasional Pengendalian Tuberkulosis',
      'Juknis Pemberantasan Sarang Nyamuk (PSN) 3M Plus Lingkungan Pesisir',
      'Formulir Pelaporan SKDR Mingguan Penyakit Menular'
    ],
    faq: [
      {
        q: 'Apakah obat TBC di Puskesmas berbayar?',
        a: 'Tidak berbayar (100% Gratis dari Kementerian Kesehatan RI) termasuk pemeriksaan dahak TCM dan pendampingan minum obat hingga sembuh.'
      },
      {
        q: 'Bagaimana tindakan Puskesmas jika ada warga yang terkonfirmasi DBD di pulau?',
        a: 'Tim Klaster 4 segera turun melakukan PE (Penyelidikan Epidemiologi) dalam radius 100 meter, pemeriksaan jentik, abatisasi, dan fogging fokus bila memenuhi kriteria.'
      }
    ],
    contact: 'Posko Siaga P2P & Surveilans: 0877-[DATA AKAN DIISI ADMIN]'
  },
  {
    id: 'lintas-klaster',
    clusterNumber: 'Lintas',
    title: 'Lintas Klaster: Pelayanan Penunjang',
    subtitle: 'Laboratorium, Farmasi, Gizi, Kesling, Layanan Rujukan Terpadu',
    icon: 'Activity',
    color: 'from-cyan-600 to-blue-700',
    description: 'Unit Lintas Klaster memberikan dukungan diagnostik, terapi farmasi, gizi klinis, penyehatan sanitasi air/lingkungan pulau, rekam medis elektronik (RME), serta sistem rujukan gawat darurat 24 jam dengan sistem rujukan medis terpadu.',
    objectives: [
      'Menyediakan hasil pemeriksaan laboratorium yang presisi, cepat, dan terstandarisasi.',
      'Menjamin ketersediaan obat bermutu tinggi dan konseling farmasi yang ramah pasien.',
      'Memastikan kesiapan 100% sistem rujukan pasien untuk evakuasi darurat pasien antar-pulau ke darat.',
      'Meningkatkan sanitasi kepulauan, akses air bersih, dan sertifikasi kantin/warung sehat.'
    ],
    services: [
      'Laboratorium Patologi Klinik & Mikrobiologi Dasar',
      'Farmasi / Pelayanan Informasi Obat (PIO) & Konseling Obat Pasien Kronis',
      'Konseling Gizi Klinis & Terapi Diet Penyakit',
      'Inspeksi Kesehatan Lingkungan (IKL), Depot Air Minum & Sanitasi Pulau',
      'Rekam Medis Elektronik (RME) Terintegrasi SatuSehat',
      'Pelayanan Gawat Darurat (IGD) & Tindakan Bedah Minor 24 Jam',
      'Layanan Evakuasi & Rujukan Medis Maritim 24 Jam',
      'Sistem Rujukan Terpadu (SISRUTE) ke RSUD Kepulauan Seribu & RS DKI Jakarta'
    ],
    targetAudience: 'Seluruh Pasien Puskesmas, Faskes Pustu Jejaring, Masyarakat Pesisir & Tamu Wisata',
    serviceFlow: 'Pengantar Dokter Klaster 1/2/3/4 → Pengambilan Sampel / Resep / Order Rujukan → Pemrosesan Standar Medis → Penyerahan Hasil & Edukasi / Mobilisasi Evakuasi',
    schedule: 'IGD & Layanan Rujukan: 24 Jam | Lab & Farmasi: 07.30 - 16.00 WIB (Siaga Darurat 24 Jam)',
    picName: 'Penanggung Jawab: dr. [DATA AKAN DIISI ADMIN]',
    relatedDocs: [
      'SOP Prosedur Evakuasi & Rujukan Medis Kepulauan',
      'Daftar Formularium Obat Puskesmas',
      'Pedoman Pengelolaan Sampah Medis B3 Pesisir'
    ],
    faq: [
      {
        q: 'Bagaimana cara menghubungi Layanan Rujukan Darurat saat terjadi keadaan darurat di pulau?',
        a: 'Hubungi langsung hotline darurat Puskesmas 24 jam atau lapor ke nakes di Pustu pulau terdekat. Tim medis dan awak kapal rujukan akan segera meluncur ke dermaga penjemputan.'
      },
      {
        q: 'Apakah Puskesmas melayani tes darah lengkap dan kimia darah?',
        a: 'Ya, laboratorium Puskesmas melayani hematologi rutin, gula darah, fungsi ginjal/asam urat, profil lipid, urine rutin, rapid diagnostik, dan tes dahak.'
      }
    ],
    contact: 'Call Center Layanan Rujukan & IGD 24 Jam: 0813-[DATA AKAN DIISI ADMIN]'
  }
];

export const initialHealthServices: HealthService[] = [
  // Dalam Gedung
  {
    id: 'srv-1',
    name: 'Pendaftaran & Rekam Medis Elektronik',
    category: 'Dalam Gedung',
    clusterId: 'klaster-1',
    description: 'Pelayanan registrasi pasien baru dan lama menggunakan sistem online/offline terhubung SatuSehat Kemenkes dan BPJS Kesehatan Mobile JKN.',
    requirements: ['KTP / Kartu Keluarga', 'Kartu BPJS Kesehatan / KIS (bila ada)', 'Buku KIA bagi ibu hamil/anak'],
    flow: ['Ambil nomor antrean', 'Loket pendaftaran & verifikasi data', 'Menuju ruang tunggu poli/klaster tujuan'],
    fee: 'Gratis bagi peserta BPJS Kesehatan / Warga DKI Jakarta ber-KTP',
    schedule: 'Senin - Jumat: 07.30 - 14.00 WIB',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'ClipboardList',
    popular: true
  },
  {
    id: 'srv-2',
    name: 'Pemeriksaan Dokter Umum',
    category: 'Dalam Gedung',
    clusterId: 'klaster-3',
    description: 'Pemeriksaan kesehatan menyeluruh, diagnosa penyakit akut dan kronis, penatalaksanaan medis, dan rujukan terarah.',
    requirements: ['Kartu identitas', 'Kartu BPJS', 'Nomor rekam medis'],
    flow: ['Skrining tanda vital', 'Konsultasi & pemeriksaan dokter', 'Tindakan/Pemeriksaan penunjang', 'Resep obat farmasi'],
    fee: 'Gratis (BPJS) / Sesuai Perda Retribusi Daerah',
    schedule: 'Senin - Jumat: 08.00 - 15.00 WIB',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Stethoscope',
    popular: true
  },
  {
    id: 'srv-3',
    name: 'Kesehatan Ibu dan Anak (KIA / KB)',
    category: 'Dalam Gedung',
    clusterId: 'klaster-2',
    description: 'Pemeriksaan kehamilan terpadu (ANC), USG dasar, pasca salin, pelayanan KB, dan kesehatan reproduksi wanita.',
    requirements: ['Buku KIA (Pink)', 'KTP & BPJS', 'Buku nikah (bagi catin)'],
    flow: ['Penimbangan & tensi', 'Pemeriksaan fisik oleh bidan/dokter', 'Pemeriksaan laboratorium lab triple eliminasi', 'Konseling gizi & edukasi'],
    fee: 'Gratis bagi peserta BPJS Kesehatan',
    schedule: 'Senin - Jumat: 08.00 - 14.30 WIB',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'HeartHandshake',
    popular: true
  },
  {
    id: 'srv-4',
    name: 'Pelayanan Imunisasi Bayi & Anak',
    category: 'Dalam Gedung',
    clusterId: 'klaster-2',
    description: 'Pemberian vaksinasi program nasional lengkap mulai dari BCG, Polio, DPT-HB-Hib, PCV, Rotavirus, Campak-Rubella, hingga HPV.',
    requirements: ['Buku KIA / Kartu Imunisasi', 'KTP Orang Tua / KK', 'Anak dalam kondisi sehat'],
    flow: ['Skrining suhu & kelayakan vaksin', 'Penyuntikan vaksin oleh petugas', 'Observasi pasca imunisasi 15 menit'],
    fee: 'Gratis (Program Pemerintah)',
    schedule: 'Setiap Selasa & Kamis: 08.30 - 12.00 WIB',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Syringe',
    popular: true
  },
  {
    id: 'srv-5',
    name: 'Kesehatan Gigi dan Mulut',
    category: 'Dalam Gedung',
    clusterId: 'lintas-klaster',
    description: 'Pemeriksaan kesehatan gigi, pembersihan karang gigi (scaling ringan), penambalan gigi, pencabutan gigi sulung/tetap sederhana, dan edukasi kebersihan gigi.',
    requirements: ['KTP & Kartu BPJS', 'Buku rekam medis Puskesmas'],
    flow: ['Pemeriksaan intraoral gigi', 'Tindakan medis gigi', 'Edukasi perawatan gigi & peresepan'],
    fee: 'Gratis bagi peserta BPJS Kesehatan',
    schedule: 'Senin - Jumat: 08.00 - 14.00 WIB',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Smile'
  },
  {
    id: 'srv-6',
    name: 'Laboratorium Medis',
    category: 'Dalam Gedung',
    clusterId: 'lintas-klaster',
    description: 'Pemeriksaan diagnostik darah lengkap, urine rutin, glukosa, asam urat, kolesterol, tes kehamilan, TCM dahak TBC, malaria, dan rapid test.',
    requirements: ['Formulir permintaan lab dari dokter Puskesmas', 'Puasa 8-10 jam (khusus cek gula darah puasa & lipid)'],
    flow: ['Penyerahan formulir lab', 'Pengambilan sampel darah/urin/dahak', 'Tunggu hasil analisa laboratorium'],
    fee: 'Gratis dengan rujukan dokter Puskesmas (BPJS)',
    schedule: 'Senin - Jumat: 08.00 - 14.30 WIB',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'FlaskConical',
    popular: true
  },
  {
    id: 'srv-7',
    name: 'Farmasi & Pelayanan Informasi Obat',
    category: 'Dalam Gedung',
    clusterId: 'lintas-klaster',
    description: 'Penyediaan obat-obatan esensial bermutu, peracikan resep dokter, rekonsiliasi obat, dan konseling penggunaan obat yang benar.',
    requirements: ['Lembar resep resmi dokter Puskesmas'],
    flow: ['Penyerahan resep', 'Skrining farmasi & peracikan', 'Penyerahan obat disertai Penjelasan Informasi Obat (PIO)'],
    fee: 'Gratis untuk seluruh pasien BPJS terdaftar',
    schedule: 'Senin - Jumat: 08.00 - 16.00 WIB | Kedaruratan 24 Jam',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Pill'
  },
  {
    id: 'srv-8',
    name: 'Pelayanan Penyakit Tidak Menular & Lansia',
    category: 'Dalam Gedung',
    clusterId: 'klaster-3',
    description: 'Poli khusus terpadu bagi pasien hipertensi, diabetes melitus, penyakit jantung, dan lansia dengan fasilitas ramah geriatri.',
    requirements: ['Buku Prolanis / KTP & BPJS'],
    flow: ['Pemeriksaan antropometri & tekanan darah', 'Konsultasi dokter spesialis/umum', 'Pemberian obat kronis 30 hari'],
    fee: 'Gratis bagi peserta BPJS Kesehatan',
    schedule: 'Senin, Rabu, Jumat: 08.00 - 14.00 WIB',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Accessibility'
  },
  {
    id: 'srv-9',
    name: 'Konseling Terpadu (Gizi, Sanitasi & Jiwa)',
    category: 'Dalam Gedung',
    clusterId: 'lintas-klaster',
    description: 'Layanan konsultasi dietetik gizi, pencegahan stunting, penilaian sanitasi rumah sehat, dan pendampingan konseling kesehatan mental.',
    requirements: ['Rujukan internal klaster / inisiatif mandiri'],
    flow: ['Pengkajian awal', 'Sesi konseling mendalam', 'Pemberian rencana tindak lanjut mandiri'],
    fee: 'Gratis',
    schedule: 'Senin - Kamis: 09.00 - 14.00 WIB',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'MessageSquare'
  },
  {
    id: 'srv-10',
    name: 'Instalasi Gawat Darurat (IGD) 24 Jam & PONED',
    category: 'Dalam Gedung',
    clusterId: 'lintas-klaster',
    description: 'Pertolongan pertama pada kondisi gawat darurat medis, kecelakaan laut, sengatan biota laut, trauma fisik, stabilisasi pasien, dan persalinan 24 jam.',
    requirements: ['Segera bawa pasien ke IGD (Administrasi menyusul)'],
    flow: ['Triase kegawatdaruratan', 'Tindakan penyelamatan jiwa / resusitasi', 'Observasi di ruang rawat sementara atau persiapan rujukan kapal'],
    fee: 'Ditanggung BPJS / Kedaruratan Publik',
    schedule: '24 Jam Non-Stop Setiap Hari',
    contact: 'Hotline IGD: 0813-[DATA AKAN DIISI ADMIN]',
    icon: 'ShieldCheck',
    popular: true
  },

  // Luar Gedung
  {
    id: 'srv-11',
    name: 'Posyandu Integrasi Layanan Primer (ILP)',
    category: 'Luar Gedung',
    clusterId: 'klaster-2',
    description: 'Pelayanan posyandu siklus hidup di setiap RW pulau untuk bayi, balita, remaja, dewasa, hingga lansia dalam satu hari terpadu.',
    requirements: ['Membawa Buku KIA / KTP', 'Datang ke balai warga / pos posyandu pulau'],
    flow: ['Pendaftaran', 'Penimbangan & Pengukuran', 'Pencatatan', 'Pelayanan Kesehatan & Imunisasi', 'Penyuluhan & PMT'],
    fee: 'Gratis untuk seluruh masyarakat',
    schedule: 'Sesuai jadwal bulanan RW di masing-masing pulau',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Users2',
    popular: true
  },
  {
    id: 'srv-12',
    name: 'Kunjungan Rumah (Home Care / PIS-PK)',
    category: 'Luar Gedung',
    clusterId: 'klaster-3',
    description: 'Kunjungan tenaga kesehatan ke rumah warga untuk pemantauan lansia tirah baring, pasien pasca rawat inap, penderita TBC, dan ibu nifas berisiko.',
    requirements: ['Hasil skrining atau laporan kader kesehatan'],
    flow: ['Penjadwalan tim medis', 'Kunjungan langsung ke rumah warga', 'Pemeriksaan & pemberian edukasi keluarga'],
    fee: 'Gratis',
    schedule: 'Setiap Hari Selasa & Kamis Sore',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Home'
  },
  {
    id: 'srv-13',
    name: 'Pembinaan & Gerakan Masyarakat Hidup Sehat (GERMAS)',
    category: 'Luar Gedung',
    clusterId: 'lintas-klaster',
    description: 'Aktivitas fisik senam bersama di tepi pantai, edukasi makan buah dan sayur, kampanye tidak merokok, dan pemeriksaan kesehatan berkala.',
    requirements: ['Terbuka untuk seluruh warga dan komunitas'],
    flow: ['Hadir di lokasi kegiatan publik pulau', 'Mengikuti rangkaian senam & pemeriksaan'],
    fee: 'Gratis',
    schedule: 'Setiap Jumat Pagi di Lapangan Pulau',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Footprints'
  },
  {
    id: 'srv-14',
    name: 'Skrining Kesehatan Pesisir & Nelayan',
    category: 'Luar Gedung',
    clusterId: 'klaster-3',
    description: 'Deteksi dini faktor risiko penyakit pada kelompok nelayan, penyelam tradisional, pekerja kapal, dan pedagang di dermaga pulau.',
    requirements: ['KTP / Identitas diri'],
    flow: ['Pemeriksaan di pos dermaga', 'Pemeriksaan pendengaran, tensi, dan gula darah', 'Konseling keselamatan kerja melaut'],
    fee: 'Gratis',
    schedule: 'Terjadwal bulanan di dermaga utama',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Anchor'
  },
  {
    id: 'srv-15',
    name: 'Surveilans Vektor & Jumantik Pulau',
    category: 'Luar Gedung',
    clusterId: 'klaster-4',
    description: 'Pemeriksaan jentik berkala di rumah warga, bak mandi penampungan air hujan, dan lingkungan pesisir untuk mencegah penularan DBD.',
    requirements: ['Kesiapan warga menerima kunjungan kader'],
    flow: ['Pemeriksaan tempat perindukan nyamuk', 'Pemberian abate & edukasi 3M Plus'],
    fee: 'Gratis',
    schedule: 'Setiap Jumat Pagi (Jumantik Mandiri)',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'Bug'
  },
  {
    id: 'srv-16',
    name: 'Usaha Kesehatan Sekolah (UKS) & Skrining Anak',
    category: 'Luar Gedung',
    clusterId: 'klaster-2',
    description: 'Pemeriksaan berkala ketajaman penglihatan, pendengaran, kebersihan gigi, status gizi anak di SD, SMP, dan SMA di Kepulauan Seribu Selatan.',
    requirements: ['Siswa terdaftar di sekolah setempat'],
    flow: ['Pemeriksaan terstruktur oleh tim dokter kecil dan nakes Puskesmas'],
    fee: 'Gratis',
    schedule: 'Awal tahun ajaran & semester genap',
    contact: '0812-[DATA AKAN DIISI ADMIN]',
    icon: 'GraduationCap'
  }
];

export const initialSchedules: ServiceSchedule[] = [
  {
    id: 'sch-1',
    day: 'Senin',
    serviceName: 'Pemeriksaan Umum & Lansia',
    hours: '08.00 - 14.30 WIB',
    location: 'Puskesmas Pulau Tidung',
    cluster: 'Klaster 3 (Dewasa & Lansia)',
    doctorOrOfficer: 'dr. [DATA AKAN DIISI ADMIN]',
    status: 'Aktif'
  },
  {
    id: 'sch-2',
    day: 'Senin',
    serviceName: 'Poli KIA & ANC Terpadu',
    hours: '08.00 - 14.00 WIB',
    location: 'Pustu Pulau Pari & Untung Jawa',
    cluster: 'Klaster 2 (Ibu dan Anak)',
    doctorOrOfficer: 'Bdn. [DATA AKAN DIISI ADMIN]',
    status: 'Aktif'
  },
  {
    id: 'sch-3',
    day: 'Selasa',
    serviceName: 'Imunisasi Rutin Bayi & Baduta',
    hours: '08.30 - 12.00 WIB',
    location: 'Puskesmas Tidung & Seluruh Pustu',
    cluster: 'Klaster 2 (Ibu dan Anak)',
    doctorOrOfficer: 'Tim Imunisasi Puskesmas',
    status: 'Aktif'
  },
  {
    id: 'sch-4',
    day: 'Selasa',
    serviceName: 'Poli Gigi & Mulut',
    hours: '08.00 - 14.00 WIB',
    location: 'Puskesmas Pulau Tidung',
    cluster: 'Lintas Klaster',
    doctorOrOfficer: 'drg. [DATA AKAN DIISI ADMIN]',
    status: 'Aktif'
  },
  {
    id: 'sch-5',
    day: 'Rabu',
    serviceName: 'Pelayanan Prolanis & Skrining PTM',
    hours: '08.00 - 13.00 WIB',
    location: 'Puskesmas Pulau Tidung & Pustu Lancang',
    cluster: 'Klaster 3 (Dewasa & Lansia)',
    doctorOrOfficer: 'dr. [DATA AKAN DIISI ADMIN]',
    status: 'Aktif'
  },
  {
    id: 'sch-6',
    day: 'Rabu',
    serviceName: 'Poli TB DOTS & Konseling VCT',
    hours: '09.00 - 14.00 WIB',
    location: 'Puskesmas Pulau Tidung',
    cluster: 'Klaster 4 (Penyakit Menular)',
    doctorOrOfficer: 'Ns. [DATA AKAN DIISI ADMIN]',
    status: 'Aktif'
  },
  {
    id: 'sch-7',
    day: 'Kamis',
    serviceName: 'USG Ibu Hamil & Konsultasi Dokter',
    hours: '08.30 - 13.30 WIB',
    location: 'Puskesmas Pulau Tidung',
    cluster: 'Klaster 2 (Ibu dan Anak)',
    doctorOrOfficer: 'dr. [DATA AKAN DIISI ADMIN]',
    status: 'Aktif'
  },
  {
    id: 'sch-8',
    day: 'Kamis',
    serviceName: 'Kunjungan Home Care Lansia Pesisir',
    hours: '13.30 - 16.00 WIB',
    location: 'Pulau Pari & Pulau Payung',
    cluster: 'Klaster 3 (Dewasa & Lansia)',
    doctorOrOfficer: 'Tim Nakes Keliling',
    status: 'Aktif'
  },
  {
    id: 'sch-9',
    day: 'Jumat',
    serviceName: 'Senam GERMAS & Konseling Gizi/Sanitasi',
    hours: '07.00 - 11.00 WIB',
    location: 'Halaman Puskesmas Tidung & Pustu Untung Jawa',
    cluster: 'Lintas Klaster',
    doctorOrOfficer: 'Nutrisionis & Sanitarian',
    status: 'Aktif'
  },
  {
    id: 'sch-10',
    day: 'Setiap Hari (Senin - Minggu)',
    serviceName: 'IGD 24 Jam, Persalinan & Layanan Rujukan Medis',
    hours: '24 Jam Non-Stop',
    location: 'Puskesmas Induk & Dermaga Utama',
    cluster: 'Lintas Klaster',
    doctorOrOfficer: 'Dokter Jaga & Tim Maritim Siaga',
    status: 'Aktif'
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Penerapan Integrasi Layanan Primer (ILP) di Seluruh Pustu Kepulauan Seribu Selatan',
    date: '2026-08-25',
    category: 'ILP',
    summary: 'Transformasi pelayanan kesehatan primer kini menjangkau seluruh pulau permukiman dengan pendekatan siklus hidup terintegrasi.',
    content: 'Puskesmas Kepulauan Seribu Selatan resmi mengoptimalkan implementasi Integrasi Layanan Primer (ILP) di 5 pulau wilayah kerja. Langkah ini merupakan bagian dari transformasi kesehatan Kemenkes RI yang mengelompokkan layanan menjadi 4 klaster utama dan 1 lintas klaster untuk memastikan masyarakat mulai dari ibu hamil, balita, remaja, dewasa hingga lansia mendapatkan pemantauan kesehatan proaktif.',
    author: 'Tim Humas Puskesmas',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'news-2',
    title: 'Kesiapsiagaan Sistem Rujukan Medis Terpadu Hadapi Kondisi Cuaca dan Pasien Pesisir',
    date: '2026-08-20',
    category: 'Kegiatan Puskesmas',
    summary: 'Sistem rujukan medis Puskesmas Kepulauan Seribu Selatan dilengkapi fasilitas penanganan medis darurat berstandar tinggi.',
    content: 'Untuk memastikan tidak ada keterlambatan penanganan pasien darurat di pulau, Puskesmas Kepulauan Seribu Selatan terus melakukan pemeliharaan rutin dan pelatihan simulasi evakuasi medis laut. Dilengkapi tabung oksigen, AED, brankar khusus, dan navigasi radar, kapal rujukan medis ini beroperasi 24 jam penuh untuk menghubungkan pulau-pulau dengan rumah sakit rujukan di darat.',
    author: 'Koordinator Pelayanan Rujukan',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'news-3',
    title: 'Gebyar Posyandu Siklus Hidup dan Pemberian Makanan Tambahan Berbasis Ikan Segar',
    date: '2026-08-15',
    category: 'Posyandu',
    summary: 'Kader posyandu di Pulau Untung Jawa dan Pulau Pari memanfaatkan kekayaan laut untuk mencegah stunting pada balita.',
    content: 'Inovasi menu PMT berbahan dasar ikan laut segar kaya Omega-3 diperkenalkan pada Posyandu Balita bulan ini. Selain penimbangan dan imunisasi lengkap, para orang tua mendapatkan edukasi pengolahan makanan bergizi untuk mencetak generasi cerdas bebas stunting di wilayah kepulauan.',
    author: 'Pokja Gizi & KIA',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-4',
    title: 'Skrining Penyakit Tidak Menular (PTM) Massal Bagi Nelayan dan Pelaku Wisata Bahari',
    date: '2026-08-10',
    category: 'Program',
    summary: 'Ratusan nelayan dan pengemudi perahu wisata mendapatkan pemeriksaan tensi, gula darah, dan kolesterol gratis.',
    content: 'Tim Klaster 3 Puskesmas mengadakan skrining kesehatan mobile di dermaga Pulau Tidung dan Pulau Pari. Mengingat tingginya aktivitas fisik dan risiko dehidrasi serta kebiasaan merokok pada profesi pelaut, deteksi dini hipertensi menjadi kunci pencegahan komplikasi jantung dan stroke.',
    author: 'dr. [DATA AKAN DIISI ADMIN]',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-5',
    title: 'Pengumuman Jadwal Pelayanan Vaksinasi dan Pemeriksaan Laboratorium Berkala',
    date: '2026-08-05',
    category: 'Pengumuman',
    summary: 'Jadwal operasional poli spesifik dan layanan laboratorium terpadu untuk masyarakat wilayah Kepulauan Seribu Selatan.',
    content: 'Diberitahukan kepada seluruh warga Kepulauan Seribu Selatan bahwa pelayanan laboratorium patologi darah dan TCM dahak TB beroperasi setiap hari kerja mulai pukul 08.00 WIB. Warga dimohon membawa kartu BPJS dan identitas diri saat berkunjung.',
    author: 'Tata Usaha Puskesmas',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialAgenda: AgendaEvent[] = [
  {
    id: 'agenda-1',
    title: 'Rembuk Stunting dan Lokakarya Mini Lintas Sektor Triwulan III',
    date: '2026-09-08',
    time: '09.00 - 13.00 WIB',
    location: 'Aula Kantor Camat Kepulauan Seribu Selatan',
    category: 'Kegiatan Lintas Sektor',
    description: 'Evaluasi program percepatan penurunan stunting dan koordinasi terpadu bersama Kecamatan, Kelurahan, TNI AL, Kepolisian, dan Tokoh Masyarakat.',
    organizer: 'Manajemen Klaster 1 & Tim Stunting',
    status: 'Akan Datang'
  },
  {
    id: 'agenda-2',
    title: 'Posyandu ILP Serentak & Skrining Tumbuh Kembang Balita',
    date: '2026-09-12',
    time: '08.30 - 11.30 WIB',
    location: 'Pos RW 01 & RW 02 Pulau Pari',
    category: 'Posyandu',
    description: 'Pelayanan penimbangan antropometri digital, imunisasi dasar lengkap, pembagian vitamin A, dan konsultasi dokter anak berkala.',
    organizer: 'Pokja Klaster 2 (Ibu & Anak)',
    status: 'Akan Datang'
  },
  {
    id: 'agenda-3',
    title: 'Skrining Kebugaran & Pemeriksaan Kesehatan Nelayan Tradisional',
    date: '2026-09-16',
    time: '07.30 - 12.00 WIB',
    location: 'Dermaga Pulau Tidung',
    category: 'Skrining',
    description: 'Pemeriksaan tensi darah, gula darah sewaktu, tes tajam penglihatan, dan penyuluhan ergonomi bagi para nelayan dan nahkoda kapal perikanan.',
    organizer: 'Tim Klaster 3 & Kesehatan Kerja',
    status: 'Akan Datang'
  },
  {
    id: 'agenda-4',
    title: 'Gerakan PSN 3M Plus Serentak Bersama Kader Jumantik Pulau',
    date: '2026-09-19',
    time: '07.00 - 09.00 WIB',
    location: 'Seluruh RW Pulau Untung Jawa & Pulau Lancang',
    category: 'Kegiatan Masyarakat',
    description: 'Aksi serentak pemberantasan sarang nyamuk, pembagian bubuk larvasida abate, dan pembersihan drainase pesisir pantai.',
    organizer: 'Tim Klaster 4 (P2P)',
    status: 'Akan Datang'
  },
  {
    id: 'agenda-5',
    title: 'Penyuluhan Bahaya TBC dan Pemeriksaan Dahak Massal',
    date: '2026-09-24',
    time: '09.00 - 12.00 WIB',
    location: 'Balai Warga Pulau Payung',
    category: 'Penyuluhan',
    description: 'Edukasi gejala batuk lebih dari 2 minggu, cara pengambilan dahak yang benar, dan penapisan kontak erat penderita TBC di pulau.',
    organizer: 'Petugas TB DOTS & Promkes',
    status: 'Akan Datang'
  }
];

export const initialHealthArticles: HealthArticle[] = [
  {
    id: 'art-1',
    title: 'Panduan Mencegah Demam Berdarah (DBD) di Daerah Kepulauan & Pesisir',
    category: 'Pencegahan DBD',
    summary: 'Penampungan air hujan sering menjadi sarang nyamuk Aedes aegypti di pulau. Simak langkah praktis 3M Plus pesisir.',
    content: [
      'Di daerah kepulauan yang mengandalkan penampungan air tawar atau air hujan (PAH), risiko perkembangbiakan nyamuk Aedes aegypti menjadi sangat tinggi jika bak tidak ditutup rapat.',
      'Lakukan pengurasan bak penampungan air minimal 1 minggu sekali dengan menyikat dinding wadah agar telur nyamuk yang menempel rontok.',
      'Tutup rapat semua drum, toren, dan gentong penampungan air. Untuk wadah yang sulit dikuras, taburkan bubuk larvasida (abate) sesuai takaran.',
      'Manfaatkan ikan pemakan jentik seperti ikan cupang atau guppy di kolam-kolam penampungan air terbuka.',
      'Bila mengalami demam mendadak tinggi disertai nyeri sendi dan bintik merah, segera periksakan diri ke Puskesmas atau Pustu terdekat.'
    ],
    author: 'Tim Promosi Kesehatan Puskesmas',
    date: '2026-08-28',
    readTime: '3 Menit',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80',
    tags: ['DBD', 'Kesehatan Lingkungan', 'Kepulauan', 'PSN 3M']
  },
  {
    id: 'art-2',
    title: 'Pentingnya Imunisasi Dasar Lengkap untuk Masa Depan Anak Pulau',
    category: 'Imunisasi',
    summary: 'Kekebalan kelompok melindungi anak dari penyakit berbahaya seperti polio, difteri, campak, dan pneumonia.',
    content: [
      'Imunisasi adalah hak setiap anak untuk tumbuh sehat dan terlindung dari Penyakit yang Dapat Dicegah Dengan Imunisasi (PD3I).',
      'Pemberian vaksin dilakukan bertahap sesuai usia: Hepatitis B 0 (0-24 jam), BCG dan Polio 1 (1 bulan), DPT-HB-Hib, Polio 2, PCV 1, Rotavirus 1 (2 bulan), hingga Campak Rubella (9 bulan).',
      'Puskesmas Kepulauan Seribu Selatan memastikan rantai dingin vaksin (cold chain) selalu terjaga dengan temperatur standar 2-8°C hingga ke pulau terluar.',
      'Jangan ragu membawa anak ke Posyandu atau Puskesmas saat jadwal imunisasi rutin setiap bulannya.'
    ],
    author: 'Pokja KIA & Imunisasi',
    date: '2026-08-22',
    readTime: '4 Menit',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80',
    tags: ['Imunisasi', 'KIA', 'Balita Sehat', 'Vaksin']
  },
  {
    id: 'art-3',
    title: 'Mengendalikan Hipertensi & Diabetes bagi Masyarakat Pesisir',
    category: 'Penyakit Tidak Menular',
    summary: 'Konsumsi ikan asin, asupan garam berlebih, dan kurang minum air putih dapat memicu tekanan darah tinggi.',
    content: [
      'Pola makan masyarakat pesisir yang kerap mengonsumsi olahan hasil laut berpengawet garam memerlukan perhatian khusus terhadap risiko hipertensi.',
      'Terapkan rumus CERDIK: Cek kesehatan berkala, Enyahkan asap rokok, Rajin aktivitas fisik, Diet seimbang, Istirahat cukup, dan Kelola stres.',
      'Batasi konsumsi garam maksimal 1 sendok teh (5 gram) per hari dan perbanyak konsumsi sayur serta buah segar.',
      'Minum obat secara rutin bagi penderita hipertensi dan diabetes sesuai petunjuk dokter, jangan menghentikan obat tanpa konsultasi medis.'
    ],
    author: 'dr. [DATA AKAN DIISI ADMIN]',
    date: '2026-08-18',
    readTime: '4 Menit',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    tags: ['Hipertensi', 'Diabetes', 'PTM', 'CERDIK']
  },
  {
    id: 'art-4',
    title: 'Mengenal Gejala Tuberkulosis (TBC) dan Cara Pengobatannya Hingga Tuntas',
    category: 'Pencegahan TB',
    summary: 'TBC dapat disembuhkan total dengan pengobatan teratur selama 6 bulan secara gratis di Puskesmas.',
    content: [
      'Tuberkulosis (TBC) disebabkan oleh bakteri Mycobacterium tuberculosis yang menyerang paru-paru dan dapat menular melalui percikan dahak saat batuk atau bersin.',
      'Gejala utama: Batuk berdahak terus-menerus selama 2 minggu atau lebih, demam meriang, berkeringat malam tanpa aktivitas fisik, penurunan berat badan, dan nafsu makan berkurang.',
      'Puskesmas menyediakan pemeriksaan Tes Cepat Molekuler (TCM) dahak dengan hasil cepat dan akurat.',
      'Pasien TBC wajib meminum Obat Anti Tuberkulosis (OAT) secara disiplin tanpa putus dengan pendampingan Pengawas Menelan Obat (PMO).'
    ],
    author: 'Tim TB DOTS Klaster 4',
    date: '2026-08-12',
    readTime: '5 Menit',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    tags: ['TBC', 'DOTS', 'Penyakit Menular', 'Sehat']
  },
  {
    id: 'art-5',
    title: 'Menjaga Kesehatan Jiwa dan Mengatasi Stres di Lingkungan Kerja Maritim',
    category: 'Kesehatan Jiwa',
    summary: 'Kondisi cuaca laut yang menantang dan rutinitas melaut membutuhkan kebugaran psikologis yang stabil.',
    content: [
      'Kesehatan jiwa sama pentingnya dengan kesehatan fisik. Beban ekonomi, kecemasan terhadap cuaca melaut, dan kelelahan dapat memicu stres berkepanjangan.',
      'Luangkan waktu untuk relaksasi bersama keluarga, bercerita kepada orang yang dipercaya, dan istirahat yang cukup.',
      'Puskesmas menyediakan layanan skrining kesehatan jiwa dan konseling ramah tanpa stigma bagi seluruh warga yang membutuhkan.'
    ],
    author: 'Konselor Kesehatan Jiwa',
    date: '2026-08-08',
    readTime: '3 Menit',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    tags: ['Kesehatan Jiwa', 'Konseling', 'Mindfulness']
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-standar-pelayanan',
    name: 'Dokumen Standar Pelayanan Publik Puskesmas Kecamatan Kepulauan Seribu Selatan',
    category: 'Informasi pelayanan',
    date: '2026-08-15',
    fileSize: '480 KB',
    fileType: 'PDF / Drive',
    downloadsCount: 1450,
    description: 'Keputusan resmi standar persyaratan, mekanisme, tarif gratis BPJS/DKI, waktu respon IGD 24 jam, dan sarana fasilitas.',
    fileUrl: 'https://drive.google.com/file/d/1Gxi3_fT5c2a-hjM5S9BAzRdbybdMtq7Y/view?usp=sharing'
  },
  {
    id: 'doc-maklumat-pelayanan',
    name: 'Dokumen Maklumat Pelayanan Resmi Puskesmas Kepulauan Seribu Selatan',
    category: 'SOP publik',
    date: '2026-08-15',
    fileSize: '320 KB',
    fileType: 'PDF / Drive',
    downloadsCount: 1820,
    description: 'Pernyataan kesanggupan resmi seluruh jajaran Puskesmas dalam menyelenggarakan pelayanan prima dan siap menerima sanksi apabila melanggar.',
    fileUrl: 'https://drive.google.com/file/d/1DFcUjFAhLsJuFs4pvv5WMtxnd651NXvS/view?usp=drive_link'
  },
  {
    id: 'doc-hak-kewajiban',
    name: 'Dokumen 12 Hak Pasien dan 4 Kewajiban Pasien Resmi',
    category: 'Informasi pelayanan',
    date: '2026-08-15',
    fileSize: '390 KB',
    fileType: 'PDF / Drive',
    downloadsCount: 2310,
    description: 'Pedoman hak-hak pasien dalam memperoleh pelayanan medis yang manusiawi, adil, bermutu, serta 4 kewajiban pasien saat berobat.',
    fileUrl: 'https://drive.google.com/file/d/1FwoMOjldKvUK6pXmDxSP0r-QfVvJcqXy/view?usp=sharing'
  },
  {
    id: 'doc-struktur-ilp',
    name: 'Dokumen Struktur Organisasi Integrasi Layanan Primer (ILP) 2026',
    category: 'Informasi pelayanan',
    date: '2026-08-15',
    fileSize: '520 KB',
    fileType: 'PDF / Drive',
    downloadsCount: 1980,
    description: 'Bagan dan tata kelola struktur organisasi Integrasi Layanan Primer (ILP) 5 Klaster Siklus Hidup Puskesmas Kepulauan Seribu Selatan sesuai Kepmenkes No. 2014/2023.',
    fileUrl: 'https://drive.google.com/file/d/1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W/view?usp=sharing'
  },
  {
    id: 'doc-1',
    name: 'Formulir Pendaftaran Pasien Baru & Skrining Riwayat Kesehatan',
    category: 'Formulir pelayanan',
    date: '2026-08-01',
    fileSize: '420 KB',
    fileType: 'PDF',
    downloadsCount: 342,
    description: 'Formulir isian data identitas sosial, riwayat alergi obat, dan jaminan kesehatan untuk pendaftaran pertama kali.'
  },
  {
    id: 'doc-2',
    name: 'Standar Operasional Prosedur (SOP) Rujukan Pasien Maritim 24 Jam',
    category: 'SOP publik',
    date: '2026-07-15',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    downloadsCount: 512,
    description: 'Pedoman alur tata cara evakuasi medis darurat maritim dari pulau pemukiman ke rumah sakit rujukan darat.'
  },
  {
    id: 'doc-3',
    name: 'Brosur Informasi Integrasi Layanan Primer (ILP) Siklus Hidup Puskesmas',
    category: 'Brosur kesehatan',
    date: '2026-08-10',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    downloadsCount: 820,
    description: 'Panduan visual lengkap pembagian 4 klaster pelayanan kesehatan berbasis siklus hidup keluarga.'
  },
  {
    id: 'doc-4',
    name: 'Jadwal Lengkap Posyandu ILP & Skrining PTM Seluruh Pulau Tahun 2026',
    category: 'Informasi pelayanan',
    date: '2026-08-05',
    fileSize: '650 KB',
    fileType: 'PDF',
    downloadsCount: 680,
    description: 'Kalender jadwal posyandu balita, remaja, lansia di Pulau Tidung, Pari, Lancang, Untung Jawa, dan Payung.'
  },
  {
    id: 'doc-5',
    name: 'Panduan Germas & Menu Pemberian Makanan Tambahan (PMT) Balita Pesisir',
    category: 'Panduan',
    date: '2026-07-20',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    downloadsCount: 440,
    description: 'Buku saku resep gizi seimbang berbahan baku hasil laut untuk pencegahan stunting pada anak.'
  },
  {
    id: 'doc-6',
    name: 'Maklumat Pelayanan & Hak Kewajiban Pasien Puskesmas',
    category: 'Informasi pelayanan',
    date: '2026-06-30',
    fileSize: '510 KB',
    fileType: 'PDF',
    downloadsCount: 290,
    description: 'Komitmen mutu pelayanan resmi dan hak-hak yang diterima pasien selama berobat di Puskesmas.'
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Berapa jam operasional pelayanan di Puskesmas Kepulauan Seribu Selatan?',
    answer: 'Pelayanan Poliklinik Rawat Jalan dan Administrasi buka Senin - Jumat pukul 07.30 - 16.00 WIB. Untuk Instalasi Gawat Darurat (IGD), Pertolongan Persalinan (PONED), dan Layanan Rujukan siaga 24 Jam Non-Stop setiap hari.',
    category: 'Umum'
  },
  {
    id: 'faq-2',
    question: 'Bagaimana cara mendapatkan pelayanan kesehatan di Puskesmas dan Pustu?',
    answer: 'Masyarakat cukup datang ke loket pendaftaran Puskesmas atau Pustu pulau terdekat dengan membawa KTP/KK dan Kartu BPJS Kesehatan/KIS. Pasien juga dapat mengambil nomor antrean melalui aplikasi Mobile JKN.',
    category: 'Pelayanan'
  },
  {
    id: 'faq-3',
    question: 'Apa saja fasilitas yang tersedia di setiap Pustu (Puskesmas Pembantu) Pulau?',
    answer: 'Setiap Pustu di Pulau Lancang, Pulau Pari, dan Pulau Untung Jawa dilengkapi nakes perawat dan bidan siaga, pemeriksaan umum, pemeriksaan ibu dan anak, obat dasar, penimbangan posyandu, dan jalur evakuasi kedaruratan medis.',
    category: 'Pustu Kepulauan'
  },
  {
    id: 'faq-4',
    question: 'Bagaimana prosedur evakuasi rujukan medis gawat darurat menggunakan Layanan Rujukan Maritim?',
    answer: 'Jika dokter/nakes menentukan pasien memerlukan rujukan darurat, tim medis Puskesmas akan menginput SISRUTE ke RS tujuan, menyiapkan pasien di brankar kapal rujukan medis dengan pendampingan dokter/perawat, dan berlayar langsung menuju dermaga darat terdekat (misal Marina Ancol / Muara Angke / Pantai Mutiara) untuk diantar ke rumah sakit rujukan tujuan.',
    category: 'Rujukan & Layanan Medis'
  },
  {
    id: 'faq-5',
    question: 'Apakah seluruh pelayanan kesehatan di Puskesmas gratis?',
    answer: 'Ya, seluruh pelayanan kesehatan primer, obat, laboratorium dasar, rawat inap sementara, persalinan, dan layanan rujukan medis ditanggung 100% GRATIS bagi peserta aktif BPJS Kesehatan dan warga ber-KTP DKI Jakarta.',
    category: 'BPJS & Administrasi'
  },
  {
    id: 'faq-6',
    question: 'Apa itu Integrasi Layanan Primer (ILP) yang diterapkan di Puskesmas?',
    answer: 'ILP adalah penataan pelayanan kesehatan yang fokus pada siklus hidup manusia (Klaster 1: Manajemen, Klaster 2: Ibu dan Anak, Klaster 3: Usia Dewasa & Lansia, Klaster 4: Penanggulangan Penyakit Menular, dan Lintas Klaster). Tujuannya agar setiap anggota keluarga dipantau kesehatannya secara menyeluruh.',
    category: 'ILP'
  },
  {
    id: 'faq-7',
    question: 'Bagaimana cara mendapatkan informasi jadwal pelayanan dokter gigi atau USG kehamilan?',
    answer: 'Jadwal pelayanan lengkap dapat dilihat di menu "Jadwal & Agenda" pada website ini, atau menghubungi layanan WhatsApp resmi Puskesmas di nomor 0859-6100-0003.',
    category: 'Pelayanan'
  }
];

export const initialStaff: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'dr. Ignatius Dendy Purnama',
    role: 'Kepala Puskesmas',
    unit: 'Pimpinan & Manajemen Faskes',
    category: 'Medis',
    nip: '19850322 201001 1 031',
    sipOrStr: 'STR: 31.1.1.100.2.16.145820',
    placement: 'Puskesmas Kecamatan (Pulau Tidung)',
    photo: '/assets/kepala-puskesmas.svg',
    status: 'Aktif Bertugas',
    qualification: 'Dokter Umum - Universitas Indonesia'
  },
  {
    id: 'staff-2',
    name: 'Achmad Syarif, S.AP',
    role: 'Kepala Subbagian Tata Usaha',
    unit: 'Subbagian Tata Usaha',
    category: 'Penunjang & Manajemen',
    nip: '19800412 200801 1 012',
    placement: 'Puskesmas Kecamatan (Pulau Tidung)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'S1 Administrasi Publik'
  },
  {
    id: 'staff-3',
    name: 'dr. Rizki Pratama',
    role: 'Dokter Penanggung Jawab IGD & Rujukan Medis',
    unit: 'Lintas Klaster (Kegawatdaruratan Maritim)',
    category: 'Medis',
    nip: '19900218 201802 1 004',
    sipOrStr: 'SIP: 446/012/DS/Dinkes/2022',
    placement: 'Puskesmas Kecamatan (Pulau Tidung)',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    status: 'Siaga On-Call',
    qualification: 'Dokter Umum - Sertifikasi ATLS, ACLS & Penyelamatan Bahari'
  },
  {
    id: 'staff-4',
    name: 'dr. Nurul Fitriani',
    role: 'Dokter Koordinator Klaster Dewasa & Lansia',
    unit: 'Klaster 3 (Usia Dewasa & Lansia)',
    category: 'Medis',
    nip: '19920725 201903 2 008',
    sipOrStr: 'SIP: 446/058/DS/Dinkes/2023',
    placement: 'Puskesmas Kecamatan (Pulau Tidung)',
    photo: 'https://images.unsplash.com/photo-1594824813590-7813a30b77b1?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'Dokter Umum - Pelatihan Hipertensi, DM & Prolanis Kemenkes'
  },
  {
    id: 'staff-5',
    name: 'drg. Amanda Putri',
    role: 'Dokter Gigi Pelayanan Rawat Jalan',
    unit: 'Poli Gigi & Mulut',
    category: 'Medis',
    nip: '19940315 202012 2 011',
    sipOrStr: 'SIP: 446/099/DG/Dinkes/2024',
    placement: 'Puskesmas Kecamatan (Pulau Tidung)',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'Dokter Gigi - FKG Universitas Padjadjaran'
  },
  {
    id: 'staff-6',
    name: 'Bdn. Sri Wahyuni, S.Tr.Keb',
    role: 'Bidan Koordinator KIA, KB & PONED',
    unit: 'Klaster 2 (Ibu dan Anak)',
    category: 'Kebidanan',
    nip: '19871109 201001 2 015',
    sipOrStr: 'SIPB: 503/044/Bdn/2021',
    placement: 'Ruang Bersalin PONED Pulau Tidung',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'Sarjana Terapan Kebidanan - Pelatihan APN & CTU'
  },
  {
    id: 'staff-7',
    name: 'Bdn. Siti Rahmawati, A.Md.Keb',
    role: 'Bidan Pembina Posyandu & Pustu Pulau Payung',
    unit: 'Jejaring Pustu & Pos Kesehatan Pesisir',
    category: 'Kebidanan',
    nip: '19930814 201902 2 006',
    sipOrStr: 'SIPB: 503/089/Bdn/2022',
    placement: 'Pustu Pulau Payung & Posyandu Siklus Hidup',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    status: 'Pelayanan Terjadwal',
    qualification: 'D3 Kebidanan - Pelatihan Resusitasi Bayi Baru Lahir'
  },
  {
    id: 'staff-8',
    name: 'Ns. Ahmad Fauzi, S.Kep',
    role: 'Perawat Koordinator P2P & Surveilans Maritim',
    unit: 'Klaster 4 (Penanggulangan Penyakit Menular)',
    category: 'Keperawatan',
    nip: '19890620 201402 1 003',
    sipOrStr: 'SIPP: 446/077/Per/2020',
    placement: 'Puskesmas Kecamatan & Pustu Pulau Lancang',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'Ners Keperawatan - Pelatihan Surveilans Epidemiologi & TB DOTS'
  },
  {
    id: 'staff-9',
    name: 'Ns. Eko Prasetyo, S.Kep',
    role: 'Perawat Manajemen Mutu & SatuSehat RME',
    unit: 'Klaster 1 (Manajemen Faskes)',
    category: 'Keperawatan',
    nip: '19881005 201201 1 009',
    placement: 'Puskesmas Kecamatan (Pulau Tidung)',
    photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'Ners Keperawatan - Auditor Internal Akreditasi Puskesmas'
  },
  {
    id: 'staff-10',
    name: 'Ns. Hendra Wijaya, S.Kep',
    role: 'Perawat Pelaksana Pustu Pulau Pari',
    unit: 'Jejaring Pustu Pulau',
    category: 'Keperawatan',
    nip: '19910403 201503 1 007',
    sipOrStr: 'SIPP: 446/112/Per/2023',
    placement: 'Puskesmas Kelurahan Pulau Pari',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'Ners Keperawatan - Pelatihan Bantuan Hidup Dasar (BHD)'
  },
  {
    id: 'staff-11',
    name: 'apt. Dina Mariana, S.Farm',
    role: 'Apoteker Penanggung Jawab Farmasi & Logistik Obat',
    unit: 'Instalasi Farmasi & Gudang Obat Kepulauan',
    category: 'Kefarmasian',
    nip: '19920117 201701 2 007',
    sipOrStr: 'SIPA: 446/033/Apt/2021',
    placement: 'Puskesmas Kecamatan (Pulau Tidung)',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'Apoteker - Pelatihan Cold Chain & Distribusi Obat Maritim'
  },
  {
    id: 'staff-12',
    name: 'Rina Anggraini, S.Gz',
    role: 'Nutrisionis / Konselor Gizi & Pencegahan Stunting',
    unit: 'Klaster 2 (Ibu & Anak)',
    category: 'Gizi & Kesmas',
    nip: '19950522 202102 2 014',
    placement: 'Puskesmas Kecamatan & Posyandu 5 Pulau',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    status: 'Pelayanan Terjadwal',
    qualification: 'S1 Ilmu Gizi - Pelatihan Pemberian Makanan Tambahan (PMT) Berbahan Lokal'
  },
  {
    id: 'staff-13',
    name: 'Joko Susilo, A.Md.AK',
    role: 'Pranata Laboratorium Kesehatan',
    unit: 'Laboratorium Klinik Terpadu',
    category: 'Penunjang & Manajemen',
    nip: '19930310 201801 1 005',
    placement: 'Laboratorium Pulau Tidung',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'D3 Analis Kesehatan - Ahli Pemeriksaan Hematologi, Kimia Darah & Mikrobiologi'
  },
  {
    id: 'staff-14',
    name: 'Budi Santoso, S.KM',
    role: 'Sanitarian / Ahli Kesehatan Lingkungan',
    unit: 'Kesling & Pengawasan Sanitasi Pesisir',
    category: 'Gizi & Kesmas',
    nip: '19870919 201101 1 008',
    placement: 'Puskesmas Kecamatan (Wilayah 5 Pulau)',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    status: 'Aktif Bertugas',
    qualification: 'Sarjana Kesehatan Masyarakat (S.KM) - Uji Kualitas Air Bersih & Sanitasi Total'
  },
  {
    id: 'staff-15',
    name: 'Capt. M. Ridwan',
    role: 'Nahkoda Kapal Rujukan Medis 24 Jam',
    unit: 'Instalasi Transportasi Medis Maritim',
    category: 'Penunjang & Manajemen',
    nip: '19820415 200902 1 006',
    placement: 'Dermaga Khusus Kapal Rujukan Pulau Tidung',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    status: 'Siaga On-Call',
    qualification: 'Sertifikasi Pelaut ANT-IV & Navigasi Radar Kedaruratan Maritim'
  }
];

export const initialOrgLeader: OrgPerson = {
  id: 'leader-1',
  role: 'Kepala Puskesmas',
  name: 'dr. Ignatius Dendy Purnama',
  nip: '198503222010012031',
  photo: '/assets/kepala-puskesmas.svg',
  subRole: 'Penanggung Jawab Wilayah Kerja'
};

export const initialOrgClusters: OrgCluster[] = [
  {
    id: 'org-klaster-1',
    title: 'Klaster 1 (Manajemen)',
    subtitle: 'Tata Kelola, Keuangan, Mutu & Sistem Informasi',
    color: 'from-blue-600 to-indigo-800',
    coordinator: {
      id: 'k1-coord',
      role: 'Koordinator Klaster 1',
      name: 'Saeful Muslimin, SKM',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    members: [
      {
        id: 'k1-m1',
        role: 'Manajemen Inti Puskesmas',
        name: 'Assya Zazhilla, S.K.M',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k1-m2',
        role: 'Manajemen Arsip',
        name: 'Sri Mega, S.Tr.Keb',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k1-m3',
        role: 'Manajemen Sumber Daya Manusia',
        name: 'Pipit Apriyani, A.Md.Kep',
        photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k1-m4',
        role: 'Manajemen Sarana, Prasarana & Perbekalan',
        name: 'Jajul Karomi, A.Md.Kep',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k1-m5',
        role: 'Manajemen Mutu Pelayanan',
        name: 'drg. Putri Ajri Mawadara',
        photo: 'https://images.unsplash.com/photo-1594824813593-1b91bc706eb8?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k1-m6',
        role: 'Manajemen Keuangan & Aset / BMD',
        name: 'Jamaludin, Amkg',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k1-m7',
        role: 'Manajemen Sistem Informasi Digital',
        name: 'Defry Dwi Bastanta, Amd. Rad',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k1-m8',
        role: 'Manajemen Jejaring',
        name: 'dr. Ambro Henri Shite',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k1-m9',
        role: 'Manajemen Pemberdayaan Masyarakat',
        name: 'Masriyah, SKM',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'org-klaster-2',
    title: 'Klaster 2 (Ibu dan Anak)',
    subtitle: 'Kesehatan Ibu, Bayi, Balita, Remaja & Imunisasi',
    color: 'from-rose-600 to-pink-700',
    coordinator: {
      id: 'k2-coord',
      role: 'Koordinator Klaster 2',
      name: 'dr. Tri Wahyu Ningrum',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80'
    },
    members: [
      {
        id: 'k2-m1',
        role: 'Ibu Hamil, Bersalin, atau Nifas',
        name: 'Sunarti, A.Md.Keb',
        photo: 'https://images.unsplash.com/photo-1594824813593-1b91bc706eb8?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k2-m2',
        role: 'Bayi dan Anak Balita',
        name: 'Dwi Putri Hasanah, Amd. Keb',
        photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k2-m3',
        role: 'Anak Pra Sekolah',
        name: 'Ade Inma Rahayu, A.Md.Keb',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k2-m4',
        role: 'Anak Usia Sekolah',
        name: 'drg. Zazkia Zita Zhafira Soni',
        photo: 'https://images.unsplash.com/photo-1594824813593-1b91bc706eb8?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k2-m5',
        role: 'Remaja',
        name: 'Amsir, A.Md. Kep',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'org-klaster-3',
    title: 'Klaster 3 (Usia Dewasa & Lansia)',
    subtitle: 'Skrining Penyakit Tidak Menular & Kesehatan Lanjut Usia',
    color: 'from-amber-600 to-orange-700',
    coordinator: {
      id: 'k3-coord',
      role: 'Koordinator Klaster 3',
      name: 'dr. Ambro Henri Shite',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80'
    },
    members: [
      {
        id: 'k3-m1',
        role: 'Usia Dewasa',
        name: 'Ns. Rahmawati, S.Kep',
        photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k3-m2',
        role: 'Lanjut Usia',
        name: 'Mudawaroh, A. Md. Kep',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'org-klaster-4',
    title: 'Klaster 4 (Penanggulangan P2P)',
    subtitle: 'Pencegahan Penyakit Menular, Surveilans & Kesling',
    color: 'from-emerald-600 to-teal-800',
    coordinator: {
      id: 'k4-coord',
      role: 'Koordinator Klaster 4',
      name: 'Ns. Budiman, S. Kep',
      photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
    },
    members: [
      {
        id: 'k4-m1',
        role: 'Kesehatan Lingkungan',
        name: 'Masriyah, SKM',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k4-m2',
        role: 'Surveilans',
        name: 'Wahyu Indratmoko, SKM',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'org-klaster-5',
    title: 'Lintas Klaster',
    subtitle: 'Pelayanan Gawat Darurat, Rawat Inap, Lab & Farmasi',
    color: 'from-purple-600 to-slate-800',
    coordinator: {
      id: 'k5-coord',
      role: 'Koordinator Lintas Klaster',
      name: 'dr. Dede Hary Irawan',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    members: [
      {
        id: 'k5-m1',
        role: 'Kegawatdaruratan',
        name: 'Rahim, A. Md. Kep',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k5-m2',
        role: 'Rawat Inap',
        name: 'Muntarsih, A. Md. Kep',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k5-m3',
        role: 'Laboratorium',
        name: 'Arifin Widiyanto, AMAK',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'k5-m4',
        role: 'Kefarmasian',
        name: 'Debora, S.Farm, Apt',
        photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export const initialSDMKData: SDMKItem[] = [
  {
    id: 'sdmk-1',
    jabatan: 'Dokter Umum',
    kategori: 'Tenaga Medis',
    kualifikasi: 'Profesi Dokter (S.Ked + dr.)',
    standarABK: 8,
    jumlahEksisting: 8,
    statusPNS: 5,
    statusPPPK: 2,
    statusNonASN: 1,
    lokasiPuskesmasInduk: 5,
    lokasiPustuLancang: 1,
    lokasiPustuPari: 1,
    lokasiPustuUntungJawa: 1,
    keterangan: 'Terpenuhi 100% (Standar ABK Kemenkes)'
  },
  {
    id: 'sdmk-2',
    jabatan: 'Dokter Gigi',
    kategori: 'Tenaga Medis',
    kualifikasi: 'Profesi Dokter Gigi (SKG + drg.)',
    standarABK: 3,
    jumlahEksisting: 3,
    statusPNS: 2,
    statusPPPK: 1,
    statusNonASN: 0,
    lokasiPuskesmasInduk: 2,
    lokasiPustuLancang: 0,
    lokasiPustuPari: 0,
    lokasiPustuUntungJawa: 1,
    keterangan: 'Terpenuhi 100% (Pelayanan Poli Gigi Terjadwal)'
  },
  {
    id: 'sdmk-3',
    jabatan: 'Perawat (Ners & Vokasi D3)',
    kategori: 'Tenaga Keperawatan',
    kualifikasi: 'S.Kep, Ners / D3 Keperawatan',
    standarABK: 16,
    jumlahEksisting: 16,
    statusPNS: 8,
    statusPPPK: 6,
    statusNonASN: 2,
    lokasiPuskesmasInduk: 10,
    lokasiPustuLancang: 2,
    lokasiPustuPari: 2,
    lokasiPustuUntungJawa: 2,
    keterangan: 'Terpenuhi 100% (Siaga 24 Jam & Rawat Inap)'
  },
  {
    id: 'sdmk-4',
    jabatan: 'Bidan (Kebidanan)',
    kategori: 'Tenaga Kebidanan',
    kualifikasi: 'D3 / D4 / S.Tr.Keb / Profesi Bidan',
    standarABK: 12,
    jumlahEksisting: 12,
    statusPNS: 6,
    statusPPPK: 4,
    statusNonASN: 2,
    lokasiPuskesmasInduk: 6,
    lokasiPustuLancang: 2,
    lokasiPustuPari: 2,
    lokasiPustuUntungJawa: 2,
    keterangan: 'Terpenuhi 100% (Persalinan 24 Jam & KIA-KB)'
  },
  {
    id: 'sdmk-5',
    jabatan: 'Apoteker & Tenaga Teknis Kefarmasian',
    kategori: 'Tenaga Kefarmasian',
    kualifikasi: 'Profesi Apoteker (Apt.) / D3 Farmasi',
    standarABK: 4,
    jumlahEksisting: 4,
    statusPNS: 2,
    statusPPPK: 1,
    statusNonASN: 1,
    lokasiPuskesmasInduk: 3,
    lokasiPustuLancang: 0,
    lokasiPustuPari: 1,
    lokasiPustuUntungJawa: 0,
    keterangan: 'Terpenuhi 100% (Pengelolaan Farmasi & Gudang Obat)'
  },
  {
    id: 'sdmk-6',
    jabatan: 'Pranata Laboratorium Kesehatan (ATLM)',
    kategori: 'Tenaga Biomedis & Lab',
    kualifikasi: 'D3 / D4 Analis Kesehatan (A.Md.AK / S.Tr.Kes)',
    standarABK: 3,
    jumlahEksisting: 3,
    statusPNS: 1,
    statusPPPK: 1,
    statusNonASN: 1,
    lokasiPuskesmasInduk: 3,
    lokasiPustuLancang: 0,
    lokasiPustuPari: 0,
    lokasiPustuUntungJawa: 0,
    keterangan: 'Terpenuhi 100% (Lab Diagnostik & Skrining Darah)'
  },
  {
    id: 'sdmk-7',
    jabatan: 'Nutrisionis (Tenaga Gizi)',
    kategori: 'Tenaga Gizi',
    kualifikasi: 'D3 / S1 Gizi (S.Gz / A.Md.Gz)',
    standarABK: 3,
    jumlahEksisting: 3,
    statusPNS: 2,
    statusPPPK: 1,
    statusNonASN: 0,
    lokasiPuskesmasInduk: 2,
    lokasiPustuLancang: 0,
    lokasiPustuPari: 1,
    lokasiPustuUntungJawa: 0,
    keterangan: 'Terpenuhi 100% (Konseling Gizi & Intervensi Stunting)'
  },
  {
    id: 'sdmk-8',
    jabatan: 'Sanitarian & Epidemiolog Kesehatan',
    kategori: 'Tenaga Kesmas & Lingkungan',
    kualifikasi: 'S.KM / D3 Kesehatan Lingkungan',
    standarABK: 3,
    jumlahEksisting: 3,
    statusPNS: 2,
    statusPPPK: 1,
    statusNonASN: 0,
    lokasiPuskesmasInduk: 2,
    lokasiPustuLancang: 0,
    lokasiPustuPari: 0,
    lokasiPustuUntungJawa: 1,
    keterangan: 'Terpenuhi 100% (Surveilans P2P & Sanitasi Kepulauan)'
  },
  {
    id: 'sdmk-9',
    jabatan: 'Radiografer (Penata Rontgen)',
    kategori: 'Tenaga Keteknisian Medis',
    kualifikasi: 'D3 / D4 Radiologi (A.Md.Rad)',
    standarABK: 2,
    jumlahEksisting: 2,
    statusPNS: 1,
    statusPPPK: 1,
    statusNonASN: 0,
    lokasiPuskesmasInduk: 2,
    lokasiPustuLancang: 0,
    lokasiPustuPari: 0,
    lokasiPustuUntungJawa: 0,
    keterangan: 'Terpenuhi 100% (Rontgen Digital & USG Diagnostik)'
  },
  {
    id: 'sdmk-10',
    jabatan: 'Perekam Medis & Informasi Kesehatan (RME)',
    kategori: 'Tenaga Keteknisian Medis',
    kualifikasi: 'D3 Rekam Medis (A.Md.RMIK)',
    standarABK: 3,
    jumlahEksisting: 3,
    statusPNS: 1,
    statusPPPK: 2,
    statusNonASN: 0,
    lokasiPuskesmasInduk: 3,
    lokasiPustuLancang: 0,
    lokasiPustuPari: 0,
    lokasiPustuUntungJawa: 0,
    keterangan: 'Terpenuhi 100% (Integrasi SATUSEHAT & ePuskesmas)'
  },
  {
    id: 'sdmk-11',
    jabatan: 'Tenaga Administrasi, IT, Pengemudi Operasional & PJLP',
    kategori: 'Tenaga Administrasi & Penunjang',
    kualifikasi: 'D3 / S1 Komputer / Manajemen / Sertifikat Pelaut',
    standarABK: 8,
    jumlahEksisting: 8,
    statusPNS: 2,
    statusPPPK: 3,
    statusNonASN: 3,
    lokasiPuskesmasInduk: 5,
    lokasiPustuLancang: 1,
    lokasiPustuPari: 1,
    lokasiPustuUntungJawa: 1,
    keterangan: 'Terpenuhi 100% (Dukungan Manajemen & Operasional)'
  }
];
