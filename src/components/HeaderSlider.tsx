import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  Sparkles, 
  Ship, 
  MapPin, 
  Stethoscope, 
  CalendarCheck, 
  PhoneCall, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ShieldCheck, 
  Heart, 
  Activity, 
  Users, 
  Waves,
  Clock,
  Compass,
  FileText,
  Building2
} from 'lucide-react';

interface SlideItem {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle: string;
  description: string;
  quote?: string;
  image?: string;
  imageCaption?: string;
  bgGradient: string;
  accentGlow: string;
  primaryBtnText: string;
  primaryBtnTab: any;
  primaryBtnTarget?: string;
  secondaryBtnText: string;
  secondaryBtnTab: any;
  highlightStats: { label: string; value: string; icon: React.ReactNode }[];
  tagPills: string[];
}

export const HeaderSlider: React.FC = () => {
  const { navigateToTab, profile } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  const slides: SlideItem[] = [
    {
      id: 'gedung-puskesmas',
      badge: 'Fasilitas Layanan Utama Kepulauan',
      badgeIcon: <Building2 className="w-3.5 h-3.5 text-emerald-300" />,
      badgeColor: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200',
      titlePrefix: 'Puskesmas',
      titleHighlight: 'Kepulauan Seribu Selatan',
      titleSuffix: '',
      subtitle: 'Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami',
      description: 'Gedung pelayanan kesehatan representatif di Dermaga Pulau Tidung dengan fasilitas Rawat Inap 24 Jam, Ruang Bersalin, IGD, 9 Poliklinik Rawat Jalan, dan Dermaga Kapal Ambulans Laut.',
      quote: 'Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami',
      image: '/slider.png',
      imageCaption: 'Gedung Puskesmas Kepulauan Seribu Selatan - Dermaga Pulau Tidung',
      bgGradient: 'from-slate-950 via-emerald-950 to-slate-900',
      accentGlow: 'bg-emerald-500/20',
      primaryBtnText: 'Lihat Jam Pelayanan',
      primaryBtnTab: 'jadwal',
      secondaryBtnText: 'Jejaring Pustu & Faskes',
      secondaryBtnTab: 'wilayah',
      highlightStats: [
        { label: 'Rawat Inap', value: '24 Jam', icon: <Clock className="w-4 h-4 text-emerald-400" /> },
        { label: 'Poliklinik', value: '9 Poli', icon: <Stethoscope className="w-4 h-4 text-sky-400" /> },
        { label: 'Kedaruratan', value: 'Siaga 24 Jam', icon: <ShieldCheck className="w-4 h-4 text-amber-400" /> }
      ],
      tagPills: ['Puskesmas Kepulauan Seribu Selatan', 'Pustu Pulau Lancang', 'Pustu Pulau Pari', 'Pustu Pulau Untung Jawa', 'Kepgub No. 755/2024']
    },
    {
      id: 'ilp-transformasi',
      badge: 'Transformasi Layanan Primer Kemenkes RI',
      badgeIcon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
      badgeColor: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200',
      titlePrefix: 'Integrasi Layanan Primer',
      titleHighlight: 'Berbasis Siklus Hidup',
      titleSuffix: 'Kepulauan Seribu Selatan',
      subtitle: 'Pelayanan Kesehatan Holistik & Terpadu 5 Klaster',
      description: 'Menata layanan kesehatan masyarakat dari Ibu Hamil, Bayi, Balita, Remaja, Usia Produktif hingga Lansia dalam satu ekosistem terintegrasi di seluruh pulau pemukiman.',
      quote: 'Layanan terstandar, komprehensif, dan menjangkau setiap keluarga pesisir.',
      bgGradient: 'from-slate-950 via-teal-950 to-slate-900',
      accentGlow: 'bg-teal-500/20',
      primaryBtnText: 'Pelajari 5 Klaster ILP',
      primaryBtnTab: 'ilp',
      secondaryBtnText: 'Lihat Alur Pelayanan',
      secondaryBtnTab: 'pelayanan',
      highlightStats: [
        { label: 'Klaster Layanan', value: '5 Klaster', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
        { label: 'Sasaran Usia', value: '0 - 60+ Thn', icon: <Users className="w-4 h-4 text-sky-400" /> },
        { label: 'Standar Akreditasi', value: 'Paripurna', icon: <ShieldCheck className="w-4 h-4 text-amber-400" /> }
      ],
      tagPills: ['Klaster 1: Manajemen', 'Klaster 2: Ibu & Anak', 'Klaster 3: Dewasa & Lansia', 'Klaster 4: P2P', 'Lintas Klaster']
    },
    {
      id: 'ambulans-maritim',
      badge: 'Kesiapsiagaan Maritim & Kedaruratan',
      badgeIcon: <Ship className="w-3.5 h-3.5 text-rose-300 animate-pulse" />,
      badgeColor: 'bg-rose-500/20 border-rose-400/40 text-rose-200',
      titlePrefix: 'Kapal Ambulans Laut &',
      titleHighlight: 'IGD Siaga 24 Jam',
      titleSuffix: 'Respon Cepat Antar Pulau',
      subtitle: 'Sistem Rujukan Gawat Darurat Laut Terpadu (SISRUTE)',
      description: 'Layanan evakuasi medis laut gratis bagi warga dan wisatawan antar pulau di Kepulauan Seribu Selatan menuju Puskesmas Induk Pulau Tidung maupun RSUD / Faskes Rujukan Daratan Jakarta.',
      quote: 'Hotline Siaga 24 Jam Nonstop: 0812-9988-7766.',
      bgGradient: 'from-slate-950 via-blue-950 to-indigo-950',
      accentGlow: 'bg-rose-500/20',
      primaryBtnText: 'Hotline Kedaruratan & Kontak',
      primaryBtnTab: 'kontak',
      secondaryBtnText: 'SOP Ambulans & Rujukan',
      secondaryBtnTab: 'unduhan',
      highlightStats: [
        { label: 'Layanan IGD', value: '24 Jam Nonstop', icon: <Clock className="w-4 h-4 text-rose-400" /> },
        { label: 'Jangkauan Rujukan', value: '5 Pulau & DKI', icon: <Compass className="w-4 h-4 text-blue-400" /> },
        { label: 'Tarif Pasien BPJS/KTP', value: '100% Gratis', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> }
      ],
      tagPills: ['Evakuasi Medis Laut', 'Dokter & Perawat Siaga', 'Oksigen & EKG Portabel', 'SISRUTE Terkoneksi']
    },
    {
      id: 'jejaring-pustu',
      badge: 'Jejaring Pelayanan 5 Pulau Pemukiman',
      badgeIcon: <MapPin className="w-3.5 h-3.5 text-sky-300" />,
      badgeColor: 'bg-sky-500/20 border-sky-400/40 text-sky-200',
      titlePrefix: 'Puskesmas Kecamatan &',
      titleHighlight: '4 Pustu Pulau Siaga',
      titleSuffix: 'Melayani Masyarakat Pesisir',
      subtitle: 'Pulau Tidung, Pulau Pari, Pulau Lancang, Pulau Untung Jawa, & Pulau Payung',
      description: 'Fasilitas kesehatan hadir lebih dekat dengan warga pulau melalui tenaga medis berkompeten, ketersediaan obat esensial, skrining rutin posyandu, dan kunjungan rumah (home care).',
      quote: 'Keadilan akses kesehatan tanpa terkendala jarak perairan laut.',
      bgGradient: 'from-slate-950 via-sky-950 to-slate-900',
      accentGlow: 'bg-sky-500/20',
      primaryBtnText: 'Peta Wilayah & Pustu',
      primaryBtnTab: 'wilayah',
      secondaryBtnText: 'Jadwal Poliklinik Pulau',
      secondaryBtnTab: 'jadwal',
      highlightStats: [
        { label: 'Pulau Berpenghuni', value: '5 Pulau', icon: <MapPin className="w-4 h-4 text-sky-400" /> },
        { label: 'Populasi Terlayani', value: '10.500+ Jiwa', icon: <Users className="w-4 h-4 text-teal-400" /> },
        { label: 'Puskesmas Pembantu', value: '4 Unit Pustu', icon: <ShieldCheck className="w-4 h-4 text-amber-400" /> }
      ],
      tagPills: ['Pustu Pulau Pari', 'Pustu Pulau Lancang', 'Pustu P. Untung Jawa', 'Pustu Pulau Payung', 'Puskesmas P. Tidung']
    },
    {
      id: 'pelayanan-medis',
      badge: 'Fasilitas Pelayanan Lengkap & Modern',
      badgeIcon: <Stethoscope className="w-3.5 h-3.5 text-teal-300" />,
      badgeColor: 'bg-teal-500/20 border-teal-400/40 text-teal-200',
      titlePrefix: 'Pelayanan Medis Rawat Jalan,',
      titleHighlight: 'Poli Gigi, KIA & Farmasi',
      titleSuffix: 'Standar Akreditasi Kemenkes',
      subtitle: 'Poli Umum, KIA-KB, Gigi, Laboratorium, Farmasi, Konseling Gizi & Sanitasi',
      description: 'Didukung dokter umum, dokter gigi, bidan, perawat, analis lab, dan apoteker profesional dengan sistem Rekam Medis Elektronik (RME) yang terhubung SATUSEHAT Kemenkes.',
      quote: 'Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami',
      bgGradient: 'from-slate-950 via-cyan-950 to-slate-900',
      accentGlow: 'bg-cyan-500/20',
      primaryBtnText: 'Daftar Layanan Medis',
      primaryBtnTab: 'pelayanan',
      secondaryBtnText: 'Jadwal Praktik Dokter',
      secondaryBtnTab: 'jadwal',
      highlightStats: [
        { label: 'Unit Pelayanan', value: '14+ Poli & Unit', icon: <Stethoscope className="w-4 h-4 text-teal-400" /> },
        { label: 'Sistem Data', value: 'RME Digital', icon: <FileText className="w-4 h-4 text-blue-400" /> },
        { label: 'Indeks Kepuasan', value: '96.8% Sangat Puas', icon: <Heart className="w-4 h-4 text-rose-400" /> }
      ],
      tagPills: ['Poli Umum & Lansia', 'Poli KIA & KB', 'Poli Gigi & Mulut', 'Laboratorium & Darah', 'Apotek & Konsultasi Obat']
    },
    {
      id: 'edukasi-agenda',
      badge: 'Edukasi Kesehatan & Kegiatan Komunitas',
      badgeIcon: <CalendarCheck className="w-3.5 h-3.5 text-indigo-300" />,
      badgeColor: 'bg-indigo-500/20 border-indigo-400/40 text-indigo-200',
      titlePrefix: 'Gerakan Masyarakat Sehat',
      titleHighlight: 'Pencegahan Penyakit &',
      titleSuffix: 'Edukasi Warga Pesisir',
      subtitle: 'Jadwal Posyandu Pulau, Pencegahan Stunting, Skrining DBD & TBC',
      description: 'Pemberdayaan kader kesehatan pulau, penyuluhan gizi seimbang balita pesisir, skrining penyakit tidak menular (hipertensi & diabetes), dan pemantauan jentik berkala.',
      quote: 'Mewujudkan Kepulauan Seribu Selatan yang Sehat, Mandiri, dan Sejahtera.',
      bgGradient: 'from-slate-950 via-indigo-950 to-slate-900',
      accentGlow: 'bg-indigo-500/20',
      primaryBtnText: 'Baca Edukasi & PHBS',
      primaryBtnTab: 'edukasi',
      secondaryBtnText: 'Kalender Agenda Kegiatan',
      secondaryBtnTab: 'agenda',
      highlightStats: [
        { label: 'Posyandu Terbina', value: '18 Posyandu', icon: <Users className="w-4 h-4 text-indigo-400" /> },
        { label: 'Kader Kesehatan', value: '85+ Kader Aktif', icon: <Heart className="w-4 h-4 text-rose-400" /> },
        { label: 'Program Unggulan', value: 'Bebas Stunting', icon: <Sparkles className="w-4 h-4 text-amber-400" /> }
      ],
      tagPills: ['Posyandu ILP Balita', 'Skrining Lansia Prolanis', 'Cek Jentik Jumantik', 'Penyuluhan Sanitasi']
    }
  ];

  // Auto slide management
  useEffect(() => {
    if (isPaused) return;

    const stepMs = 50;
    const progressStep = (stepMs / SLIDE_DURATION) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + progressStep;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const current = slides[currentSlide];

  return (
    <div 
      className="relative bg-slate-950 text-white overflow-hidden select-none border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Animated Gradient Backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${current.bgGradient} transition-all duration-700`} />
      
      {/* Decorative Glow Spheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${current.accentGlow} transition-all duration-700`} />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full blur-3xl bg-sky-500/20 transition-all duration-700" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full blur-3xl bg-teal-500/20 transition-all duration-700" />
        
        {/* Subtle grid mesh overlay */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      {/* Main Slide Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 md:pt-12 md:pb-16">
        
        {/* Top Control Bar: Slide Index, Progress, Play/Pause */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-300">
              SLIDE 0{currentSlide + 1} <span className="text-slate-500">/ 0{slides.length}</span>
            </span>

            <div className="hidden sm:flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'w-8 bg-gradient-to-r from-sky-400 to-teal-400' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={`Slide ${idx + 1}: ${s.titlePrefix}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition text-xs flex items-center gap-1"
              title={isPaused ? 'Lanjutkan Auto-Slide' : 'Jeda Auto-Slide'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span className="text-[11px] hidden md:inline">{isPaused ? 'Auto: Dijeda' : 'Auto: Berjalan'}</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition active:scale-95"
                aria-label="Slide Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition active:scale-95"
                aria-label="Slide Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Descriptions & Actions */}
          <div className="lg:col-span-7 space-y-5 animate-in fade-in slide-in-from-left-4 duration-500">
            
            {/* Category / Pillar Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm shadow-xs ${current.badgeColor}`}>
                {current.badgeIcon}
                <span>{current.badge}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/10 text-slate-300 text-[11px] font-mono">
                <Waves className="w-3 h-3 text-sky-400" />
                Pesisir & Kepulauan
              </span>
            </div>

            {/* Main Headline with High-End Editorial Typography */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight font-display">
                {current.titlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-200 to-amber-200">
                  {current.titleHighlight}
                </span>{' '}
                {current.titleSuffix}
              </h1>

              <p className="text-sm sm:text-base font-serif-elegant italic text-sky-200/90 font-medium">
                "{current.subtitle}"
              </p>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {current.description}
            </p>

            {/* Interactive Tag Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {current.tagPills.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white text-[11px] font-medium transition cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateToTab(current.primaryBtnTab, current.primaryBtnTarget)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/25 transition-all transform active:scale-95"
              >
                <span>{current.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToTab(current.secondaryBtnTab)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm transition"
              >
                <span>{current.secondaryBtnText}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Highlight Card & Key Metrics */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="relative rounded-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 p-5 sm:p-6 backdrop-blur-md shadow-2xl space-y-5">
              
              {/* Highlight Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/30 border border-sky-400/40 flex items-center justify-center text-sky-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-white leading-snug font-display">Puskesmas Kepulauan Seribu Selatan</h2>
                    <p className="text-[11px] text-sky-200">Kesiapsiagaan Maritim Terpadu</p>
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                  Resmi DKI
                </span>
              </div>

              {/* Featured Image if present */}
              {current.image && (
                <div className="relative rounded-xl overflow-hidden border border-white/20 group shadow-md bg-slate-900">
                  <img 
                    src={current.image} 
                    alt={current.imageCaption || "Gedung Puskesmas Kepulauan Seribu Selatan"}
                    className="w-full h-44 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                    <span className="font-semibold truncate flex items-center gap-1.5 drop-shadow-sm">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      {current.imageCaption || 'Gedung Puskesmas Kepulauan Seribu Selatan'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-[10px] font-bold shrink-0 shadow-xs">
                      Dermaga Tidung
                    </span>
                  </div>
                </div>
              )}

              {/* Metric Highlights */}
              <div className="grid grid-cols-3 gap-2.5">
                {current.highlightStats.map((stat, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center space-y-1">
                    <div className="flex justify-center text-sky-400">
                      {stat.icon}
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white leading-tight font-display">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote / Highlight Note */}
              {current.quote && (
                <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-100 text-xs flex items-start gap-2.5 font-serif-elegant italic">
                  <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="leading-snug">"{current.quote}"</p>
                </div>
              )}

              {/* Quick Contact inside Card */}
              <div className="pt-1 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Informasi & Kontak:</span>
                    <span className="font-bold text-white">{profile.phone}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateToTab('kontak')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition active:scale-95"
                >
                  Hubungi Kami
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Slide Thumbnails / Quick Jump Navigation */}
        <div className="mt-8 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`p-2.5 rounded-xl text-left transition-all border ${
                idx === currentSlide
                  ? 'bg-white/20 border-sky-400/80 text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1 font-mono">
                <span className={idx === currentSlide ? 'text-sky-300 font-bold' : 'text-slate-500'}>
                  0{idx + 1}
                </span>
                {idx === currentSlide && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>
              <p className="text-[11px] font-bold truncate text-white leading-tight font-display">
                {s.titlePrefix}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {s.titleHighlight}
              </p>
            </button>
          ))}
        </div>

      </div>

      {/* Slide Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
};
