import { AnnouncementItem } from '../types';

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Penerimaan Tenaga Kesehatan Non-PNS / PJLP Puskesmas Kepulauan Seribu Selatan Formasi Tahun 2026',
    category: 'Rekrutmen',
    urgency: 'Tinggi',
    date: '05 Oktober 2026',
    validUntil: '28 Oktober 2026',
    officialNumber: '800/042/PKM.KSS/X/2026',
    author: 'Sub Bagian Tata Usaha & Tim Seleksi Rekrutmen',
    summary: 'Puskesmas Kepulauan Seribu Selatan membuka kesempatan berkarir bagi putra-putri terbaik bangsa untuk bergabung sebagai tenaga kesehatan dan penunjang medis kepulauan.',
    content: 'Dalam rangka penguatan Integrasi Layanan Primer (ILP) dan pemenuhan standar ketenagaan di Puskesmas Induk Pulau Tidung serta Jejaring Pustu Pulau Lancang, Pulau Pari, dan Pulau Untung Jawa, Puskesmas Kepulauan Seribu Selatan membuka seleksi penerimaan tenaga kontrak dengan dedikasi tinggi mengabdi di wilayah kepulauan bahari.',
    isUrgentBanner: false,
    positions: [
      {
        name: 'Perawat Pelaksana / Terampil',
        quota: '3 Orang',
        qualification: 'D-III / S-1 Ners Keperawatan, STR Aktif, Bersedia dinas rawat inap 24 jam'
      },
      {
        name: 'Bidan Pelaksana',
        quota: '2 Orang',
        qualification: 'D-III / D-IV Kebidanan, STR Aktif, Kompeten dalam penanganan kegawatdaruratan maternal neonatal'
      },
      {
        name: 'Pranata Laboratorium Kesehatan (ATLM)',
        quota: '1 Orang',
        qualification: 'D-III Analis Kesehatan / Laboratorium Medis, STR Aktif, Mampu operasional hematologi analizer & mikroskopis'
      },
      {
        name: 'Tenaga Sanitasi Lingkungan (Kesling)',
        quota: '1 Orang',
        qualification: 'D-III / S-1 Kesehatan Lingkungan / Sanitasi, Memahami pengelolaan limbah B3 medis & pengawasan air bersih'
      }
    ],
    requirements: [
      'Warga Negara Indonesia (WNI) berusia minimal 20 tahun dan maksimal 35 tahun pada saat pendaftaran.',
      'Memiliki kualifikasi pendidikan sesuai dengan formasi yang dilamar dari institusi terakreditasi minimal B.',
      'Memiliki Surat Tanda Registrasi (STR) yang masih berlaku (minimal 6 bulan masa aktif) yang diterbitkan Kemenkes RI / KTKI.',
      'Sehat jasmani dan rohani, tidak memiliki riwayat mabuk laut berat, serta bersedia ditempatkan di pulau pemukiman.',
      'Memiliki sertifikat pelatihan keahlian (BTCLS bagi perawat, APN/MU bagi bidan) merupakan nilai tambah.',
      'Berkelakuan baik dan tidak pernah diberhentikan dengan tidak hormat dari instansi pemerintah/swasta.'
    ],
    documents: [
      'Surat Lamaran Pekerjaan ditujukan kepada Kepala Puskesmas Kepulauan Seribu Selatan.',
      'Curriculum Vitae (CV) lengkap dengan riwayat pengalaman kerja / magang.',
      'Salinan Ijazah dan Transkrip Nilai yang telah dilegalisir.',
      'Salinan STR yang masih berlaku.',
      'Salinan KTP elektronik dan Kartu Keluarga (KK).',
      'Surat Keterangan Sehat dari fasilitas pelayanan kesehatan pemerintah.',
      'Pasfoto terbaru ukuran 4x6 latar belakang warna merah (format JPG/PDF).'
    ],
    contactPerson: {
      name: 'Panitia Seleksi Pegawai Puskesmas Kepulauan Seribu Selatan',
      phone: '0813-1818-7299',
      email: 'rekrutmen.puskesmas1000@jakarta.go.id'
    },
    fileAttachment: {
      name: 'Pengumuman_Seleksi_Nakes_PKM_KSS_2026.pdf',
      size: '1.4 MB'
    }
  },
  {
    id: 'ann-2',
    title: 'PEMBERITAHUAN MENDESAK: Penyesuaian Jadwal Penyeberangan Tim Medis & Layanan Rujukan Terkait Peringatan Cuaca Ekstrem BMKG',
    category: 'Info Dadakan',
    urgency: 'Tinggi',
    date: '07 Oktober 2026',
    validUntil: '10 Oktober 2026',
    officialNumber: '440/118/PKM.KSS/X/2026',
    author: 'Kepala Puskesmas & Tim Siaga Bencana Medis',
    summary: 'Informasi penyesuaian operasional transportasi rujukan maritim antar pulau sehubungan dengan peringatan dini gelombang tinggi BMKG Maritim Jakarta.',
    content: 'Merujuk pada Siaran Pers BMKG Stasiun Meteorologi Maritim Tanjung Priok mengenai potensi angin kencang berkecepatan 20-28 knot dan tinggi gelombang laut 1.5 hingga 2.2 meter di perairan Kepulauan Seribu Selatan, disampaikan hal-hal mendesak sebagai berikut:\n\n1. Seluruh layanan gawat darurat (IGD) dan Rawat Inap Puskesmas Induk Pulau Tidung TETAP SIAGA 24 JAM PENUH dengan dokter dan perawat standby.\n2. Rujukan medis elektif/non-darurat ke rumah sakit daratan Jakarta ditunda sementara demi keselamatan pasien dan nakes sampai cuaca kembali aman.\n3. Kasus rujukan kegawatdaruratan kritis (emergency life-saving) wajib dikoordinasikan langsung melalui Call Center SISRUTE Hotline (0813-1818-7299) dan dikawal tim medis siaga bekerja sama dengan KSOP dan Basarnas.',
    isUrgentBanner: true,
    requirements: [
      'Warga yang membutuhkan layanan medis darurat diimbau segera menghubungi IGD Pulau terdekat tanpa menunda.',
      'Masyarakat nelayan dan transportasi perahu wisata dihimbau senantiasa memantau panduan cuaca sebelum melaut.',
      'Ketersediaan stok obat-obatan darurat dan oksigen medis di Pustu Pulau Pari, Lancang, dan Untung Jawa dipastikan aman dan cukup.'
    ],
    contactPerson: {
      name: 'Pusat Komando Medis & SISRUTE 24 Jam',
      phone: '0813-1818-7299',
      email: 'darurat.puskesmas1000@jakarta.go.id'
    },
    fileAttachment: {
      name: 'Surat_Edaran_Kesiapsiagaan_Cuaca_Maritim.pdf',
      size: '860 KB'
    }
  },
  {
    id: 'ann-3',
    title: 'Seleksi Terbuka Pengemudi Kapal Penunjang Kesehatan & Petugas Pengadministrasi Loket Faskes',
    category: 'Rekrutmen',
    urgency: 'Sedang',
    date: '02 Oktober 2026',
    validUntil: '22 Oktober 2026',
    officialNumber: '800/039/PKM.KSS/X/2026',
    author: 'Sub Bagian Tata Usaha Puskesmas',
    summary: 'Perekrutan tenaga pendukung operasional faskes perairan untuk posisi juru mudi kapal penunjang dan staf administrasi pendaftaran terintegrasi.',
    content: 'Puskesmas Kepulauan Seribu Selatan mengundang warga berintegritas tinggi untuk mengisi formasi tenaga penunjang operasional, guna memperlancar mobilitas dokter keliling (Pusling Apung) dan ketertiban administrasi rekam medis digital SATUSEHAT.',
    positions: [
      {
        name: 'Juru Mudi / Pengemudi Kapal Faskes',
        quota: '1 Orang',
        qualification: 'Pria, usia maks 40 tahun, memiliki sertifikat kelautan (BST/SKK 30/60 Mil), berpengalaman menavigasi perairan Kepulauan Seribu'
      },
      {
        name: 'Petugas Pengadministrasi Loket & Rekam Medis',
        quota: '1 Orang',
        qualification: 'SMA/SMK/D-III, mampu mengoperasikan komputer, aplikasi spreadsheet, dan sistem informasi antrean puskesmas'
      }
    ],
    requirements: [
      'WNI yang berdomisili di wilayah Kepulauan Seribu Selatan dibuktikan dengan KTP diutamakan.',
      'Sehat jasmani dan bebas dari narkoba.',
      'Mampu bekerja sama dalam tim dan bersedia bekerja dalam sistem rotasi piket.'
    ],
    documents: [
      'Surat Lamaran Kerja dan Daftar Riwayat Hidup (CV).',
      'Fotokopi Ijazah terakhir dan transkrip nilai.',
      'Fotokopi KTP dan KK.',
      'Sertifikat keahlian maritim (khusus pelamar pengemudi kapal).',
      'SKCK aktif dari Kepolisian.'
    ],
    contactPerson: {
      name: 'Sekretariat Tim Rekrutmen PJLP',
      phone: '0813-1818-7299',
      email: 'rekrutmen.puskesmas1000@jakarta.go.id'
    },
    fileAttachment: {
      name: 'Formasi_Tenaga_Penunjang_Operasional_2026.pdf',
      size: '950 KB'
    }
  },
  {
    id: 'ann-4',
    title: 'INFO DADAKAN: Pelaksanaan Skrining TB & Pemeriksaan Kesehatan Keliling Terpadu di Dermaga Pulau Lancang',
    category: 'Info Dadakan',
    urgency: 'Sedang',
    date: '06 Oktober 2026',
    validUntil: '12 Oktober 2026',
    officialNumber: '443/095/PKM.KSS/X/2026',
    author: 'Penanggung Jawab Program P2P & Klaster 3',
    summary: 'Pemberitahuan kegiatan pemeriksaan dahak TCM TB, rontgen portable, dan skrining gula darah gratis bagi seluruh warga Pulau Lancang.',
    content: 'Diberitahukan kepada Ketua RW, RT, dan segenap warga Pulau Lancang bahwa Tim P2P Puskesmas Kepulauan Seribu Selatan akan menyelenggarakan kegiatan jemput bola skrining kesehatan aktif pada:\n\n• Hari/Tanggal: Kamis, 08 Oktober 2026\n• Pukul: 08.30 - 13.00 WIB\n• Tempat: Balai Posyandu / Dermaga Utama Pulau Lancang\n• Layanan: Tes Cepat Molekuler (TCM) TB, Skrining Hipertensi, Cek Asam Urat, Kolesterol & Pengobatan Umum Gratis.\n\nWarga dimohon membawa KTP/Kartu BPJS untuk pencatatan rekam medis digital SATUSEHAT.',
    requirements: [
      'Terbuka bagi seluruh warga usia di atas 15 tahun.',
      'Bagi warga yang mengalami batuk lebih dari 2 minggu atau riwayat kontak erat TB diharapkan hadir.',
      'Pelayanan sepenuhnya bebas biaya (GRATIS).'
    ],
    contactPerson: {
      name: 'Bidan / Perawat Pustu Pulau Lancang',
      phone: '0813-1818-7299',
      email: 'pustu.lancang@puskesmasseribuselatan.com'
    }
  },
  {
    id: 'ann-5',
    title: 'Perekrutan & Pelatihan Kader Posyandu ILP Siklus Hidup (25 Keterampilan Dasar) Tahun 2026',
    category: 'Rekrutmen',
    urgency: 'Biasa',
    date: '01 Oktober 2026',
    validUntil: '20 Oktober 2026',
    officialNumber: '441/088/PKM.KSS/X/2026',
    author: 'Koordinator Promkes & Pemberdayaan Masyarakat',
    summary: 'Pendaftaran kader kesehatan masyarakat baru untuk pembinaan 25 keterampilan dasar posyandu integrasi layanan primer.',
    content: 'Dalam rangka mewujudkan pelayanan kesehatan berbasis keluarga dan siklus hidup terpadu di setiap pulau pemukiman, Puskesmas membuka kesempatan bagi warga penggerak masyarakat untuk menjadi Kader Posyandu ILP Berprestasi.',
    requirements: [
      'Wanita/Pria usia 18 - 50 tahun, bertempat tinggal tetap di RW/Pulau setempat.',
      'Mampu membaca, menulis, dan menggunakan smartphone Android untuk aplikasi ASIK Kemenkes.',
      'Memiliki jiwa sosial, komunikatif, dan dipercaya oleh masyarakat sekitar.'
    ],
    contactPerson: {
      name: 'Tim Promkes Puskesmas Kepulauan Seribu Selatan',
      phone: '0813-1818-7299',
      email: 'promkes.pkm1000@jakarta.go.id'
    }
  },
  {
    id: 'ann-6',
    title: 'Pengumuman Jadwal Uji Coba Integrasi Rekam Medis Elektronik (RME) & Antrean Online Mobile JKN',
    category: 'Pengumuman Resmi',
    urgency: 'Biasa',
    date: '28 September 2026',
    officialNumber: '445/079/PKM.KSS/IX/2026',
    author: 'Tim IT & Sistem Informasi Kesehatan',
    summary: 'Sosialisasi implementasi antrean faskes online melalui aplikasi Mobile JKN BPJS Kesehatan dan SATUSEHAT.',
    content: 'Mulai 1 Oktober 2026, seluruh pendaftaran kunjungan poli umum, gigi, dan KIA di Puskesmas Kepulauan Seribu Selatan dapat dilakukan dari rumah melalui menu antrean online di Mobile JKN demi mengurangi waktu tunggu di ruang loket puskesmas.',
    requirements: [
      'Pasien dapat mengunduh aplikasi Mobile JKN di Google Play Store atau App Store.',
      'Pilih menu Pendaftaran Pelayanan (Antrean), tentukan poli dan dokter yang dituju.',
      'Bagi lansia dan pasien darurat tetap diprioritaskan pendaftaran langsung di loket faskes.'
    ],
    contactPerson: {
      name: 'Helpdesk Antrean Digital Puskesmas',
      phone: '0813-1818-7299',
      email: 'info@puskesmasseribuselatan.com'
    }
  }
];
