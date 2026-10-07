import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Briefcase, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  Download, 
  Share2, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  X, 
  ExternalLink, 
  Phone, 
  Mail, 
  Sparkles,
  Info,
  ShieldAlert,
  Building,
  Award
} from 'lucide-react';

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'Rekrutmen' | 'Info Dadakan' | 'Pengumuman Resmi' | 'Jadwal Khusus';
  urgency: 'Tinggi' | 'Sedang' | 'Biasa';
  date: string;
  validUntil?: string;
  officialNumber: string;
  author: string;
  summary: string;
  content: string;
  positions?: {
    name: string;
    quota: string;
    qualification: string;
  }[];
  requirements?: string[];
  documents?: string[];
  contactPerson?: {
    name: string;
    phone: string;
    email: string;
  };
  fileAttachment?: {
    name: string;
    size: string;
  };
  isUrgentBanner?: boolean;
}

export const AnnouncementSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<AnnouncementItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const announcements: AnnouncementItem[] = [
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

  const categories = ['Semua', 'Rekrutmen', 'Info Dadakan', 'Pengumuman Resmi'];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.officialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.positions && item.positions.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const urgentAlert = announcements.find(a => a.isUrgentBanner);

  const handleShare = (item: AnnouncementItem) => {
    const shareText = `*PENGUMUMAN PUSKESMAS KEPULAUAN SERIBU SELATAN*\n\n*${item.title}*\nNo: ${item.officialNumber}\nTanggal: ${item.date}\n\n${item.summary}\n\nInfo selengkapnya: https://darlink.puskesmasseribuselatan.com`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleWhatsAppContact = (item: AnnouncementItem) => {
    const phone = item.contactPerson?.phone.replace(/[^0-9]/g, '') || '6281318187299';
    const text = encodeURIComponent(`Halo Tim Puskesmas Kepulauan Seribu Selatan, saya ingin menanyakan perihal informasi: ${item.title} (No: ${item.officialNumber})`);
    window.open(`https://wa.me/${phone.startsWith('0') ? '62' + phone.slice(1) : phone}?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgent Announcement Alert Banner (Top Highlight) */}
        {urgentAlert && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white shadow-xl shadow-red-500/15 border border-red-400/40 relative overflow-hidden animate-pulse-subtle">
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/10 skew-x-12 pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md shrink-0">
                  <ShieldAlert className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-rose-700 text-[10px] font-black uppercase tracking-wider">
                      INFO DADAKAN MENDESAK
                    </span>
                    <span className="text-xs text-rose-100 font-mono">
                      {urgentAlert.date}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold mt-1 text-white leading-snug">
                    {urgentAlert.title}
                  </h3>
                  <p className="text-xs text-rose-100 mt-1 line-clamp-2 max-w-3xl">
                    {urgentAlert.summary}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalItem(urgentAlert)}
                className="px-4 py-2 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-black shadow-md shrink-0 transition hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Baca Lengkap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-extrabold uppercase tracking-wider border border-blue-200 dark:border-blue-900">
            <Megaphone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Papan Pengumuman Resmi & Lowongan Kerja
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pengumuman & Informasi Rekrutmen
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            Portal resmi pemberitahuan rekrutmen tenaga kesehatan, pengumuman dadakan terkait kondisi maritim, serta informasi kedaruratan yang perlu segera diketahui warga Kepulauan Seribu Selatan.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700'
                }`}
              >
                {cat === 'Rekrutmen' && <Briefcase className="w-3.5 h-3.5" />}
                {cat === 'Info Dadakan' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                {cat === 'Pengumuman Resmi' && <FileText className="w-3.5 h-3.5 text-sky-500" />}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari pengumuman / posisi rekrutmen..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Announcement Grid */}
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
            <Megaphone className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">Tidak ada pengumuman yang sesuai</h3>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnouncements.map((item) => {
              const isRecruitment = item.category === 'Rekrutmen';
              const isUrgent = item.category === 'Info Dadakan';

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${
                    isUrgent
                      ? 'border-red-300 dark:border-red-900/60 shadow-sm'
                      : isRecruitment
                      ? 'border-emerald-200 dark:border-emerald-900/60 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  {/* Top Category Header Badge */}
                  <div className={`p-4 border-b flex items-center justify-between gap-2 ${
                    isUrgent
                      ? 'bg-red-50/70 dark:bg-red-950/40 border-red-100 dark:border-red-900/40'
                      : isRecruitment
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/40'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                        isUrgent
                          ? 'bg-red-600 text-white'
                          : isRecruitment
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {isUrgent ? (
                          <AlertTriangle className="w-3 h-3" />
                        ) : isRecruitment ? (
                          <Briefcase className="w-3 h-3" />
                        ) : (
                          <Megaphone className="w-3 h-3" />
                        )}
                        <span>{item.category}</span>
                      </span>

                      {item.urgency === 'Tinggi' && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold border border-amber-300 dark:border-amber-800">
                          Prioritas Tinggi
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                      {item.date}
                    </span>
                  </div>

                  {/* Card Main Body */}
                  <div className="p-5 flex-1 space-y-3">
                    {/* Official Document Number */}
                    <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <span>No:</span>
                      <span className="font-semibold text-slate-600 dark:text-slate-400">{item.officialNumber}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>

                    {/* Recruitment Positions Preview */}
                    {item.positions && item.positions.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                          Formasi Tersedia:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.positions.slice(0, 3).map((pos, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800"
                            >
                              {pos.name} ({pos.quota})
                            </span>
                          ))}
                          {item.positions.length > 3 && (
                            <span className="px-1.5 py-1 text-[10px] font-bold text-slate-500">
                              +{item.positions.length - 3} lainnya
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Validity / Deadline */}
                    {item.validUntil && (
                      <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-semibold bg-amber-50/60 dark:bg-amber-950/30 px-3 py-1.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>Batas Waktu: {item.validUntil}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <span>Lihat Rincian</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleShare(item)}
                        title="Bagikan Pengumuman"
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs transition active:scale-95 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleWhatsAppContact(item)}
                        title="Tanya Panitia via WhatsApp"
                        className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs transition active:scale-95 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Detail Modal Dialog */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            
            {/* Modal Top Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-800/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                    activeModalItem.category === 'Rekrutmen'
                      ? 'bg-emerald-600 text-white'
                      : activeModalItem.category === 'Info Dadakan'
                      ? 'bg-red-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {activeModalItem.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    No: {activeModalItem.officialNumber}
                  </span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {activeModalItem.date}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {activeModalItem.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm">
              
              {/* Official Issuer */}
              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-semibold">
                  <Building className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Diterbitkan Oleh: {activeModalItem.author}</span>
                </div>
                {activeModalItem.validUntil && (
                  <span className="font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg">
                    Berlaku s/d: {activeModalItem.validUntil}
                  </span>
                )}
              </div>

              {/* Main Content Text */}
              <div className="space-y-3 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p>{activeModalItem.content}</p>
              </div>

              {/* Positions Table (If Recruitment) */}
              {activeModalItem.positions && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>Daftar Formasi Jabatan yang Dibuka</span>
                  </h4>
                  <div className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    {activeModalItem.positions.map((pos, i) => (
                      <div key={i} className="p-3.5 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{pos.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{pos.qualification}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black shrink-0 self-start sm:self-center">
                          Kuota: {pos.quota}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements List */}
              {activeModalItem.requirements && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Persyaratan & Kriteria Pelamar</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {activeModalItem.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Documents Required */}
              {activeModalItem.documents && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>Berkas Lamaran yang Harus Disiapkan</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeModalItem.documents.map((doc, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Helpdesk & Contact Person */}
              {activeModalItem.contactPerson && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Pusat Informasi & Layanan Tanya Jawab (Helpdesk)</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-4 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Kontak Panitia:</span>
                      <span className="font-bold">{activeModalItem.contactPerson.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">WhatsApp Hotline:</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{activeModalItem.contactPerson.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Email Resmi:</span>
                      <span className="font-mono">{activeModalItem.contactPerson.email}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWhatsAppContact(activeModalItem)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hubungi Panitia / Tanya Info</span>
                </button>

                <button
                  onClick={() => handleShare(activeModalItem)}
                  className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedId === activeModalItem.id ? 'Tersalin!' : 'Bagikan'}</span>
                </button>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition cursor-pointer ml-auto"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
