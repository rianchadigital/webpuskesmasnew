import { ActivityAlbum, MorbidityItem, FacilityMonthlyVisit } from '../types';

export const INITIAL_ACTIVITY_ALBUMS: ActivityAlbum[] = [
  {
    id: 'alb-1',
    title: 'Pelaksanaan Posyandu Integrasi Layanan Primer (ILP) Balita & Ibu Hamil',
    category: 'Posyandu & ILP',
    date: '12 September 2026',
    island: 'Pulau Tidung',
    location: 'RPTRA Tidung Ceria, Kelurahan Pulau Tidung',
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    description: 'Pelayanan penimbangan rutin, pengukuran antropometri digital, imunisasi lengkap, skrining anemia bagi ibu hamil, dan konsultasi gizi terpadu siklus hidup dengan nakes Puskesmas Kecamatan.',
    organizer: 'Tim Klaster 2 (Ibu & Anak) Puskesmas Kec. Kep. Seribu Selatan',
    participantCount: 84,
    highlights: [
      '84 balita & 16 ibu hamil mendapatkan pemeriksaan berkala',
      'Pemberian Makanan Tambahan (PMT) berbasis ikan laut lokal',
      'Skrining tumbuh kembang KPSP dan edukasi pencegahan stunting',
      'Pencatatan data terintegrasi ke ASIK (Aplikasi Sehat IndonesiaKu)'
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemeriksaan antropometri balita menggunakan infantometer dan timbangan digital berstandar Kemenkes.'
      },
      {
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemberian imunisasi PCV dan Polio tetes oleh bidan desa Puskesmas.'
      },
      {
        url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
        caption: 'Penyuluhan gizi seimbang dan demonstrasi pengolahan MP-ASI ikan tongkol dan kelor bersama ibu balita.'
      },
      {
        url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Konsultasi dokter umum bagi ibu hamil risiko tinggi dan pemeriksaan tensi darah.'
      }
    ]
  },
  {
    id: 'alb-2',
    title: 'Pemeriksaan Kesehatan Skrining PTM & Lansia Bahari Pulau Pari',
    category: 'Lansia & PTM',
    date: '04 September 2026',
    island: 'Pulau Pari',
    location: 'Gedung Serbaguna RW 01, Pulau Pari',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    description: 'Pemeriksaan tensi darah, gula darah sewaktu (GDS), kolesterol, asam urat, serta konseling gaya hidup sehat dan senam jantung sehat untuk warga lansia pesisir.',
    organizer: 'Tim Klaster 3 (Usia Dewasa & Lanjut Usia) Puskesmas Kelurahan Pulau Pari',
    participantCount: 68,
    highlights: [
      '68 lansia dan pra-lansia menjalani pemeriksaan laboratorium sederhana',
      'Skrining demensia dan kognitif mandiri lansia',
      'Senam Kebugaran Lansia Bahari di tepi pantai',
      'Pemberian paket nutrisi susu lansia dan multivitamin'
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemeriksaan gula darah dan tekanan darah rutin bagi peserta posyandu lansia.'
      },
      {
        url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Konseling pola makan rendah garam bersama nutrisionis Puskesmas.'
      },
      {
        url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemberian obat kronis hipertensi untuk kepatuhan terapi minum obat lansia.'
      }
    ]
  },
  {
    id: 'alb-3',
    title: 'Layanan Dokter Keliling (Pusling) Apung ke Pulau Payung & Lancang',
    category: 'Pusling Apung',
    date: '28 Agustus 2026',
    island: 'Pulau Payung',
    location: 'Dermaga & Pos Kesehatan Pulau Payung',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'Kunjungan pelayanan medis mobile dengan kapal ambulans dan speed boat tim medis gabungan ke pulau berpenduduk kecil untuk menjamin kesetaraan akses kesehatan perairan.',
    organizer: 'Tim Reaksi Cepat & Pelayanan Luar Gedung Puskesmas Kec. Kepulauan Seribu Selatan',
    participantCount: 52,
    highlights: [
      'Menjangkau 52 warga nelayan dan keluarga di Pulau Payung',
      'Pemeriksaan USG portabel bagi ibu hamil trimester 3',
      'Pengantaran logistik farmasi, vaksinasi, dan reagen lab',
      'Pemeriksaan kesehatan gigi dan mulut keliling'
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
        caption: 'Kapal tenaga kesehatan tiba di dermaga Pulau Payung membawa logistik medis dan obat.'
      },
      {
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemeriksaan kesehatan nelayan di posko darurat tepi dermaga.'
      },
      {
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemeriksaan USG mobile oleh dokter umum terlatih untuk deteksi letak janin.'
      }
    ]
  },
  {
    id: 'alb-4',
    title: 'Penjaringan Kesehatan Anak Sekolah (UKS) & Imunisasi BIAS',
    category: 'UKS & Sekolah',
    date: '19 Agustus 2026',
    island: 'Pulau Untung Jawa',
    location: 'SDN 01 & SMPN 285 Pulau Untung Jawa',
    coverImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
    description: 'Pemeriksaan ketajaman penglihatan, kesehatan telinga, kebersihan gigi, status gizi antropometri anak sekolah dasar, serta pemberian imunisasi Campak-Rubella dan HPV.',
    organizer: 'Pembina UKS Puskesmas Kelurahan Pulau Untung Jawa',
    participantCount: 130,
    highlights: [
      '130 siswa-siswi SD dan SMP mendapatkan pemeriksaan kesehatan berkala',
      'Skrining kelainan refraksi mata dan pemberian rekomendasi kacamata',
      'Demonstrasi sikat gigi massal dan edukasi cuci tangan pakai sabun (CTPS)',
      '100% target imunisasi BIAS sekolah dasar tercapai'
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemeriksaan mata menggunakan Snellen Chart pada siswa kelas 4 SD.'
      },
      {
        url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemeriksaan gigi dan mulut oleh perawat gigi puskesmas.'
      },
      {
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemberian piagam Sekolah Sehat Bebas Jentik bersama kepala sekolah.'
      }
    ]
  },
  {
    id: 'alb-5',
    title: 'Simulasi Tanggap Darurat Evakuasi Medis Maritim & Kode Merah Bencana Laut',
    category: 'Kedaruratan & Pelatihan',
    date: '10 Juli 2026',
    island: 'Pulau Tidung',
    location: 'Dermaga Utama & Perairan Pulau Tidung',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    description: 'Latihan gabungan simulasi triase korban tenggelam, resusitasi jantung paru (RJP), stabilisasi spinal cervical, dan protokol transfer pasien kritis menggunakan kapal ambulans ke RSUD Kepulauan Seribu.',
    organizer: 'Tim IGD, Damkar, Basarnas & Polairud Kepulauan Seribu',
    participantCount: 45,
    highlights: [
      'Simulasi respon darurat evakuasi laut dalam waktu < 7 menit',
      'Uji kesiapan peralatan defibrillator (AED) portabel dan suction di kapal',
      'Sinkronisasi komunikasi radio satelit maritim dengan Call Center 112 / 119',
      'Sertifikasi BHD (Bantuan Hidup Dasar) untuk awak kapal dan relawan pulau'
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
        caption: 'Simulasi penanganan henti napas korban kecelakaan air dengan BHD kompresi dada.'
      },
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
        caption: 'Proses evakuasi tandu scoop stretcher ke atas dek ambulans laut.'
      },
      {
        url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
        caption: 'Briefing evaluasi standar keselamatan bersama tim gabungan lintas sektor.'
      }
    ]
  },
  {
    id: 'alb-6',
    title: 'Pemberantasan Sarang Nyamuk (PSN 3M Plus) & Aksi Jumantik Mandiri',
    category: 'Imunisasi & Gizi',
    date: '25 Juni 2026',
    island: 'Pulau Lancang',
    location: 'Lingkungan RW 01 - RW 03 Pulau Lancang',
    coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    description: 'Gerakan serentak pemeriksaan tempat penampungan air tawar, sumur pulau, pembagian bubuk abate, serta penyuluhan pencegahan Demam Berdarah Dengue (DBD) di kawasan permukiman pesisir.',
    organizer: 'Sanitarian & Kader Jumantik Pustu Pulau Lancang',
    participantCount: 110,
    highlights: [
      'Pemeriksaan 145 bak penampungan air keluarga nelayan',
      'Angka Bebas Jentik (ABJ) Pulau Lancang mencapai 96,8%',
      'Penyebaran ikan cupang pemakan jentik di penampungan air umum',
      'Pemberian apresiasi RW Terbersih dan Sadar Sanitasi'
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemeriksaan jentik nyamuk pada drum penampungan air hujan dengan senter.'
      },
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Kader Jumantik mencatat hasil inspeksi ke lembar pantau digital SILACAK.'
      }
    ]
  }
];

// 10 Penyakit Terbanyak (Top 10 Morbidity) untuk 2024, 2025, 2026
export const MORBIDITY_DATA_BY_YEAR: Record<number, MorbidityItem[]> = {
  2026: [
    { rank: 1, code: 'J06.9', name: 'Infeksi Saluran Pernapasan Akut (ISPA)', category: 'Respirasi', cases: 1420, maleCases: 710, femaleCases: 710, percentage: 24.8, trend: 'stable' },
    { rank: 2, code: 'I10', name: 'Hipertensi Primer (Esensial)', category: 'Kardiovaskular', cases: 980, maleCases: 420, femaleCases: 560, percentage: 17.1, trend: 'up' },
    { rank: 3, code: 'E11', name: 'Diabetes Melitus Tipe 2', category: 'Endokrin / Metabolik', cases: 640, maleCases: 270, femaleCases: 370, percentage: 11.2, trend: 'up' },
    { rank: 4, code: 'K29.7', name: 'Gastritis & Dispepsia', category: 'Gastrointestinal', cases: 580, maleCases: 260, femaleCases: 320, percentage: 10.1, trend: 'stable' },
    { rank: 5, code: 'L23', name: 'Dermatitis Alergi & Infeksi Kulit Bahari', category: 'Dermatologi', cases: 460, maleCases: 280, femaleCases: 180, percentage: 8.0, trend: 'down' },
    { rank: 6, code: 'M79.1', name: 'Mialgia / Nyeri Otot & Sendi Nelayan', category: 'Muskuloskeletal', cases: 410, maleCases: 310, femaleCases: 100, percentage: 7.2, trend: 'stable' },
    { rank: 7, code: 'J00', name: 'Nasofaringitis Akut (Common Cold)', category: 'Respirasi', cases: 390, maleCases: 195, femaleCases: 195, percentage: 6.8, trend: 'down' },
    { rank: 8, code: 'R50.9', name: 'Febris (Demam Tanpa Sebab Spesifik)', category: 'Gejala Umum', cases: 310, maleCases: 160, femaleCases: 150, percentage: 5.4, trend: 'down' },
    { rank: 9, code: 'A09', name: 'Diare & Gastroenteritis Infeksius', category: 'Gastrointestinal', cases: 280, maleCases: 145, femaleCases: 135, percentage: 4.9, trend: 'down' },
    { rank: 10, code: 'K02.9', name: 'Karies Gigi & Penyakit Pulpa', category: 'Kesehatan Gigi', cases: 255, maleCases: 120, femaleCases: 135, percentage: 4.5, trend: 'stable' }
  ],
  2025: [
    { rank: 1, code: 'J06.9', name: 'Infeksi Saluran Pernapasan Akut (ISPA)', category: 'Respirasi', cases: 1540, maleCases: 780, femaleCases: 760, percentage: 26.2, trend: 'up' },
    { rank: 2, code: 'I10', name: 'Hipertensi Primer (Esensial)', category: 'Kardiovaskular', cases: 910, maleCases: 390, femaleCases: 520, percentage: 15.5, trend: 'up' },
    { rank: 3, code: 'K29.7', name: 'Gastritis & Dispepsia', category: 'Gastrointestinal', cases: 620, maleCases: 275, femaleCases: 345, percentage: 10.6, trend: 'stable' },
    { rank: 4, code: 'E11', name: 'Diabetes Melitus Tipe 2', category: 'Endokrin / Metabolik', cases: 590, maleCases: 250, femaleCases: 340, percentage: 10.1, trend: 'up' },
    { rank: 5, code: 'L23', name: 'Dermatitis Alergi & Infeksi Kulit Bahari', category: 'Dermatologi', cases: 490, maleCases: 295, femaleCases: 195, percentage: 8.3, trend: 'stable' },
    { rank: 6, code: 'M79.1', name: 'Mialgia / Nyeri Otot & Sendi Nelayan', category: 'Muskuloskeletal', cases: 440, maleCases: 330, femaleCases: 110, percentage: 7.5, trend: 'up' },
    { rank: 7, code: 'J00', name: 'Nasofaringitis Akut (Common Cold)', category: 'Respirasi', cases: 420, maleCases: 210, femaleCases: 210, percentage: 7.2, trend: 'stable' },
    { rank: 8, code: 'A09', name: 'Diare & Gastroenteritis Infeksius', category: 'Gastrointestinal', cases: 330, maleCases: 170, femaleCases: 160, percentage: 5.6, trend: 'stable' },
    { rank: 9, code: 'R50.9', name: 'Febris (Demam Tanpa Sebab Spesifik)', category: 'Gejala Umum', cases: 305, maleCases: 155, femaleCases: 150, percentage: 5.2, trend: 'down' },
    { rank: 10, code: 'K02.9', name: 'Karies Gigi & Penyakit Pulpa', category: 'Kesehatan Gigi', cases: 230, maleCases: 110, femaleCases: 120, percentage: 3.9, trend: 'stable' }
  ],
  2024: [
    { rank: 1, code: 'J06.9', name: 'Infeksi Saluran Pernapasan Akut (ISPA)', category: 'Respirasi', cases: 1620, maleCases: 830, femaleCases: 790, percentage: 27.8, trend: 'up' },
    { rank: 2, code: 'I10', name: 'Hipertensi Primer (Esensial)', category: 'Kardiovaskular', cases: 840, maleCases: 360, femaleCases: 480, percentage: 14.4, trend: 'up' },
    { rank: 3, code: 'K29.7', name: 'Gastritis & Dispepsia', category: 'Gastrointestinal', cases: 650, maleCases: 290, femaleCases: 360, percentage: 11.2, trend: 'up' },
    { rank: 4, code: 'E11', name: 'Diabetes Melitus Tipe 2', category: 'Endokrin / Metabolik', cases: 530, maleCases: 220, femaleCases: 310, percentage: 9.1, trend: 'up' },
    { rank: 5, code: 'L23', name: 'Dermatitis Alergi & Infeksi Kulit Bahari', category: 'Dermatologi', cases: 510, maleCases: 310, femaleCases: 200, percentage: 8.8, trend: 'stable' },
    { rank: 6, code: 'M79.1', name: 'Mialgia / Nyeri Otot & Sendi Nelayan', category: 'Muskuloskeletal', cases: 460, maleCases: 345, femaleCases: 115, percentage: 7.9, trend: 'stable' },
    { rank: 7, code: 'J00', name: 'Nasofaringitis Akut (Common Cold)', category: 'Respirasi', cases: 440, maleCases: 220, femaleCases: 220, percentage: 7.6, trend: 'stable' },
    { rank: 8, code: 'A09', name: 'Diare & Gastroenteritis Infeksius', category: 'Gastrointestinal', cases: 360, maleCases: 185, femaleCases: 175, percentage: 6.2, trend: 'up' },
    { rank: 9, code: 'R50.9', name: 'Febris (Demam Tanpa Sebab Spesifik)', category: 'Gejala Umum', cases: 290, maleCases: 150, femaleCases: 140, percentage: 5.0, trend: 'stable' },
    { rank: 10, code: 'K02.9', name: 'Karies Gigi & Penyakit Pulpa', category: 'Kesehatan Gigi', cases: 210, maleCases: 100, femaleCases: 110, percentage: 3.6, trend: 'stable' }
  ]
};

// Data Kunjungan Rawat Jalan Bulanan per Faskes untuk 2024, 2025, 2026
export const MONTHLY_VISITS_BY_YEAR: Record<number, FacilityMonthlyVisit[]> = {
  2026: [
    { month: 'Jan', monthIndex: 1, monthName: 'Januari', puskesmasKecamatan: 680, pustuPari: 240, pustuLancang: 180, pustuUntungJawa: 290, poskesPayung: 45, total: 1435, bpjs: 1260, nonBpjs: 175, rujukanRsud: 18 },
    { month: 'Feb', monthIndex: 2, monthName: 'Februari', puskesmasKecamatan: 650, pustuPari: 225, pustuLancang: 175, pustuUntungJawa: 280, poskesPayung: 40, total: 1370, bpjs: 1210, nonBpjs: 160, rujukanRsud: 14 },
    { month: 'Mar', monthIndex: 3, monthName: 'Maret', puskesmasKecamatan: 710, pustuPari: 250, pustuLancang: 190, pustuUntungJawa: 305, poskesPayung: 48, total: 1503, bpjs: 1320, nonBpjs: 183, rujukanRsud: 22 },
    { month: 'Apr', monthIndex: 4, monthName: 'April', puskesmasKecamatan: 695, pustuPari: 235, pustuLancang: 185, pustuUntungJawa: 295, poskesPayung: 42, total: 1452, bpjs: 1285, nonBpjs: 167, rujukanRsud: 16 },
    { month: 'Mei', monthIndex: 5, monthName: 'Mei', puskesmasKecamatan: 730, pustuPari: 260, pustuLancang: 195, pustuUntungJawa: 315, poskesPayung: 50, total: 1550, bpjs: 1375, nonBpjs: 175, rujukanRsud: 20 },
    { month: 'Jun', monthIndex: 6, monthName: 'Juni', puskesmasKecamatan: 720, pustuPari: 255, pustuLancang: 190, pustuUntungJawa: 310, poskesPayung: 47, total: 1522, bpjs: 1345, nonBpjs: 177, rujukanRsud: 19 },
    { month: 'Jul', monthIndex: 7, monthName: 'Juli', puskesmasKecamatan: 760, pustuPari: 275, pustuLancang: 205, pustuUntungJawa: 330, poskesPayung: 52, total: 1622, bpjs: 1440, nonBpjs: 182, rujukanRsud: 24 },
    { month: 'Agu', monthIndex: 8, monthName: 'Agustus', puskesmasKecamatan: 745, pustuPari: 265, pustuLancang: 200, pustuUntungJawa: 325, poskesPayung: 49, total: 1584, bpjs: 1400, nonBpjs: 184, rujukanRsud: 21 },
    { month: 'Sep', monthIndex: 9, monthName: 'September (Berjalan)', puskesmasKecamatan: 715, pustuPari: 250, pustuLancang: 190, pustuUntungJawa: 300, poskesPayung: 44, total: 1499, bpjs: 1325, nonBpjs: 174, rujukanRsud: 17 },
    { month: 'Okt', monthIndex: 10, monthName: 'Oktober (Proyeksi)', puskesmasKecamatan: 700, pustuPari: 245, pustuLancang: 185, pustuUntungJawa: 300, poskesPayung: 45, total: 1475, bpjs: 1300, nonBpjs: 175, rujukanRsud: 18 },
    { month: 'Nov', monthIndex: 11, monthName: 'November (Proyeksi)', puskesmasKecamatan: 690, pustuPari: 240, pustuLancang: 180, pustuUntungJawa: 295, poskesPayung: 43, total: 1448, bpjs: 1280, nonBpjs: 168, rujukanRsud: 16 },
    { month: 'Des', monthIndex: 12, monthName: 'Desember (Proyeksi)', puskesmasKecamatan: 740, pustuPari: 270, pustuLancang: 195, pustuUntungJawa: 320, poskesPayung: 51, total: 1576, bpjs: 1390, nonBpjs: 186, rujukanRsud: 23 }
  ],
  2025: [
    { month: 'Jan', monthIndex: 1, monthName: 'Januari', puskesmasKecamatan: 640, pustuPari: 220, pustuLancang: 165, pustuUntungJawa: 270, poskesPayung: 38, total: 1333, bpjs: 1160, nonBpjs: 173, rujukanRsud: 16 },
    { month: 'Feb', monthIndex: 2, monthName: 'Februari', puskesmasKecamatan: 610, pustuPari: 210, pustuLancang: 160, pustuUntungJawa: 260, poskesPayung: 35, total: 1275, bpjs: 1110, nonBpjs: 165, rujukanRsud: 14 },
    { month: 'Mar', monthIndex: 3, monthName: 'Maret', puskesmasKecamatan: 670, pustuPari: 230, pustuLancang: 175, pustuUntungJawa: 285, poskesPayung: 42, total: 1402, bpjs: 1225, nonBpjs: 177, rujukanRsud: 19 },
    { month: 'Apr', monthIndex: 4, monthName: 'April', puskesmasKecamatan: 660, pustuPari: 225, pustuLancang: 170, pustuUntungJawa: 280, poskesPayung: 40, total: 1375, bpjs: 1205, nonBpjs: 170, rujukanRsud: 17 },
    { month: 'Mei', monthIndex: 5, monthName: 'Mei', puskesmasKecamatan: 690, pustuPari: 245, pustuLancang: 180, pustuUntungJawa: 295, poskesPayung: 44, total: 1454, bpjs: 1275, nonBpjs: 179, rujukanRsud: 20 },
    { month: 'Jun', monthIndex: 6, monthName: 'Juni', puskesmasKecamatan: 685, pustuPari: 240, pustuLancang: 178, pustuUntungJawa: 290, poskesPayung: 43, total: 1436, bpjs: 1260, nonBpjs: 176, rujukanRsud: 18 },
    { month: 'Jul', monthIndex: 7, monthName: 'Juli', puskesmasKecamatan: 720, pustuPari: 255, pustuLancang: 190, pustuUntungJawa: 310, poskesPayung: 48, total: 1523, bpjs: 1340, nonBpjs: 183, rujukanRsud: 22 },
    { month: 'Agu', monthIndex: 8, monthName: 'Agustus', puskesmasKecamatan: 710, pustuPari: 250, pustuLancang: 185, pustuUntungJawa: 305, poskesPayung: 46, total: 1496, bpjs: 1315, nonBpjs: 181, rujukanRsud: 20 },
    { month: 'Sep', monthIndex: 9, monthName: 'September', puskesmasKecamatan: 675, pustuPari: 235, pustuLancang: 175, pustuUntungJawa: 285, poskesPayung: 41, total: 1411, bpjs: 1240, nonBpjs: 171, rujukanRsud: 17 },
    { month: 'Okt', monthIndex: 10, monthName: 'Oktober', puskesmasKecamatan: 665, pustuPari: 230, pustuLancang: 170, pustuUntungJawa: 280, poskesPayung: 40, total: 1385, bpjs: 1215, nonBpjs: 170, rujukanRsud: 16 },
    { month: 'Nov', monthIndex: 11, monthName: 'November', puskesmasKecamatan: 655, pustuPari: 225, pustuLancang: 168, pustuUntungJawa: 275, poskesPayung: 39, total: 1362, bpjs: 1195, nonBpjs: 167, rujukanRsud: 15 },
    { month: 'Des', monthIndex: 12, monthName: 'Desember', puskesmasKecamatan: 705, pustuPari: 250, pustuLancang: 185, pustuUntungJawa: 305, poskesPayung: 47, total: 1492, bpjs: 1310, nonBpjs: 182, rujukanRsud: 21 }
  ],
  2024: [
    { month: 'Jan', monthIndex: 1, monthName: 'Januari', puskesmasKecamatan: 590, pustuPari: 205, pustuLancang: 150, pustuUntungJawa: 250, poskesPayung: 32, total: 1227, bpjs: 1050, nonBpjs: 177, rujukanRsud: 15 },
    { month: 'Feb', monthIndex: 2, monthName: 'Februari', puskesmasKecamatan: 565, pustuPari: 195, pustuLancang: 145, pustuUntungJawa: 240, poskesPayung: 30, total: 1175, bpjs: 1005, nonBpjs: 170, rujukanRsud: 13 },
    { month: 'Mar', monthIndex: 3, monthName: 'Maret', puskesmasKecamatan: 620, pustuPari: 215, pustuLancang: 160, pustuUntungJawa: 265, poskesPayung: 36, total: 1296, bpjs: 1115, nonBpjs: 181, rujukanRsud: 18 },
    { month: 'Apr', monthIndex: 4, monthName: 'April', puskesmasKecamatan: 610, pustuPari: 210, pustuLancang: 155, pustuUntungJawa: 260, poskesPayung: 35, total: 1270, bpjs: 1095, nonBpjs: 175, rujukanRsud: 16 },
    { month: 'Mei', monthIndex: 5, monthName: 'Mei', puskesmasKecamatan: 640, pustuPari: 225, pustuLancang: 165, pustuUntungJawa: 275, poskesPayung: 39, total: 1344, bpjs: 1160, nonBpjs: 184, rujukanRsud: 19 },
    { month: 'Jun', monthIndex: 6, monthName: 'Juni', puskesmasKecamatan: 635, pustuPari: 220, pustuLancang: 162, pustuUntungJawa: 270, poskesPayung: 38, total: 1325, bpjs: 1145, nonBpjs: 180, rujukanRsud: 17 },
    { month: 'Jul', monthIndex: 7, monthName: 'Juli', puskesmasKecamatan: 670, pustuPari: 235, pustuLancang: 175, pustuUntungJawa: 285, poskesPayung: 42, total: 1407, bpjs: 1220, nonBpjs: 187, rujukanRsud: 20 },
    { month: 'Agu', monthIndex: 8, monthName: 'Agustus', puskesmasKecamatan: 660, pustuPari: 230, pustuLancang: 170, pustuUntungJawa: 280, poskesPayung: 40, total: 1380, bpjs: 1195, nonBpjs: 185, rujukanRsud: 19 },
    { month: 'Sep', monthIndex: 9, monthName: 'September', puskesmasKecamatan: 625, pustuPari: 215, pustuLancang: 160, pustuUntungJawa: 265, poskesPayung: 36, total: 1301, bpjs: 1125, nonBpjs: 176, rujukanRsud: 15 },
    { month: 'Okt', monthIndex: 10, monthName: 'Oktober', puskesmasKecamatan: 615, pustuPari: 210, pustuLancang: 158, pustuUntungJawa: 260, poskesPayung: 35, total: 1278, bpjs: 1105, nonBpjs: 173, rujukanRsud: 14 },
    { month: 'Nov', monthIndex: 11, monthName: 'November', puskesmasKecamatan: 605, pustuPari: 208, pustuLancang: 155, pustuUntungJawa: 255, poskesPayung: 34, total: 1257, bpjs: 1085, nonBpjs: 172, rujukanRsud: 14 },
    { month: 'Des', monthIndex: 12, monthName: 'Desember', puskesmasKecamatan: 655, pustuPari: 230, pustuLancang: 170, pustuUntungJawa: 280, poskesPayung: 41, total: 1376, bpjs: 1190, nonBpjs: 186, rujukanRsud: 19 }
  ]
};
