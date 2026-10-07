import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Building2, 
  Ship, 
  Activity, 
  MapPin,
  ExternalLink
} from 'lucide-react';

interface BannerSlide {
  id: string;
  bannerNumber: number;
  image: string;
  title: string;
  highlight: string;
  subtitle: string;
  category: string;
  badgeColor: string;
  categoryIcon: React.ReactNode;
  description: string;
  actionText: string;
  actionTab: any;
  actionSubTab?: string;
  secondaryActionText?: string;
  secondaryActionTab?: any;
}

export const HeaderSlider: React.FC = () => {
  const { navigateToTab } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s per slide

  const bannerSlides: BannerSlide[] = [
    {
      id: 'spanduk-1',
      bannerNumber: 1,
      image: '/banners/banner-1.png',
      title: 'Puskesmas',
      highlight: 'Kepulauan Seribu Selatan',
      subtitle: 'Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami',
      category: 'Fasilitas Layanan Utama & Rawat Inap',
      badgeColor: 'bg-emerald-500/90 text-white border-emerald-400',
      categoryIcon: <Building2 className="w-3.5 h-3.5" />,
      description: 'Pusat pelayanan kesehatan representatif di Kepulauan Seribu Selatan dengan Rawat Inap 24 Jam, IGD Siaga, 9 Poliklinik Spesialis & Layanan Rujukan Medis Terpadu.',
      actionText: 'Lihat Jadwal Pelayanan',
      actionTab: 'jadwal',
      secondaryActionText: 'Jejaring Wilayah Faskes',
      secondaryActionTab: 'wilayah'
    },
    {
      id: 'spanduk-2',
      bannerNumber: 2,
      image: '/banners/banner-2.png',
      title: 'Transformasi',
      highlight: 'Integrasi Layanan Primer (ILP)',
      subtitle: 'Pelayanan Kesehatan Siklus Hidup Holistik 5 Klaster Kemenkes RI',
      category: 'Inovasi Program Kemenkes RI',
      badgeColor: 'bg-sky-500/90 text-white border-sky-400',
      categoryIcon: <Sparkles className="w-3.5 h-3.5" />,
      description: 'Menata layanan kesehatan komprehensif bagi Ibu Hamil, Balita, Remaja, Usia Produktif hingga Lansia terintegrasi di seluruh pulau pemukiman.',
      actionText: 'Pelajari 5 Klaster ILP',
      actionTab: 'ilp',
      secondaryActionText: 'Standar Pelayanan',
      secondaryActionTab: 'dokumen-pelayanan'
    },
    {
      id: 'spanduk-3',
      bannerNumber: 3,
      image: '/banners/banner-3.png',
      title: 'Kesiapsiagaan Maritim &',
      highlight: 'Layanan Rujukan Darurat 24 Jam',
      subtitle: 'Sistem Rujukan Medis Bebas Biaya Antar Pulau (SISRUTE)',
      category: 'Kedaruratan & Rujukan Maritim',
      badgeColor: 'bg-rose-500/90 text-white border-rose-400',
      categoryIcon: <Ship className="w-3.5 h-3.5" />,
      description: 'Sistem rujukan medis terpadu (SISRUTE) antar pulau pemukiman menuju rumah sakit rujukan daratan Jakarta didukung tim medis terlatih siaga 24 jam.',
      actionText: 'Kontak & Call Center Darurat',
      actionTab: 'kontak',
      secondaryActionText: 'Alur Rujukan Pasien',
      secondaryActionTab: 'pelayanan'
    },
    {
      id: 'spanduk-4',
      bannerNumber: 4,
      image: '/banners/banner-4.png',
      title: 'Jejaring Pelayanan',
      highlight: '5 Pulau Pemukiman Siaga',
      subtitle: 'Pulau Tidung, Pulau Pari, Pulau Lancang, Pulau Untung Jawa, & Pulau Payung',
      category: 'Jejaring Faskes Pesisir',
      badgeColor: 'bg-teal-500/90 text-white border-teal-400',
      categoryIcon: <MapPin className="w-3.5 h-3.5" />,
      description: 'Puskesmas hadir lebih dekat dengan warga pesisir melalui Pos Kesehatan Pembantu (Pustu), skrining rutin Posyandu ILP, dan kunjungan rumah berkala.',
      actionText: 'Peta Wilayah & Pustu',
      actionTab: 'wilayah',
      secondaryActionText: 'Warta & Edukasi Sehat',
      secondaryActionTab: 'berita'
    }
  ];

  // Auto sliding logic with progress bar
  useEffect(() => {
    if (isPaused || zoomModalOpen) return;

    const stepMs = 50;
    const progressStep = (stepMs / SLIDE_DURATION) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % bannerSlides.length);
          return 0;
        }
        return prev + progressStep;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, zoomModalOpen, bannerSlides.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    setProgress(0);
  };

  const active = bannerSlides[currentSlide];

  return (
    <section className="relative w-full bg-slate-950 overflow-hidden">
      {/* Running Text di Bawah Menu & di Antara Header Spanduk - Kecepatan Normal, Satu Baris Saja */}
      <div className="w-full bg-gradient-to-r from-teal-950 via-slate-900 to-sky-950 border-b border-teal-500/25 py-2 sm:py-2.5 overflow-hidden shadow-xs relative select-none">
        {/* Subtle Edge Gradients for Smooth In/Out Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-teal-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-sky-950 to-transparent z-10" />

        <div className="overflow-hidden relative w-full">
          <div className="inline-flex flex-nowrap shrink-0 whitespace-nowrap items-center animate-marquee-normal text-xs sm:text-sm font-extrabold tracking-widest uppercase text-white drop-shadow-xs">
            {/* Set 1 */}
            {[...Array(4)].map((_, i) => (
              <span key={`set1-${i}`} className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap mx-6 sm:mx-10 leading-none">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 inline shrink-0 animate-pulse" />
                <span className="whitespace-nowrap shrink-0 text-white font-extrabold tracking-wider">SELAMAT DATANG DI PUSKESMAS KEPULAUAN SERIBU SELATAN</span>
                <span className="text-teal-400 font-normal shrink-0">✦</span>
              </span>
            ))}
            {/* Set 2 (Duplikasi untuk Seamless Infinite Loop yang Halus & Normal) */}
            {[...Array(4)].map((_, i) => (
              <span key={`set2-${i}`} className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap mx-6 sm:mx-10 leading-none">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 inline shrink-0 animate-pulse" />
                <span className="whitespace-nowrap shrink-0 text-white font-extrabold tracking-wider">SELAMAT DATANG DI PUSKESMAS KEPULAUAN SERIBU SELATAN</span>
                <span className="text-teal-400 font-normal shrink-0">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Main Banner Slider Container (Ukuran Disesuaikan dengan Aplikasi) */}
        <div 
          className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Aspect-Ratio Box Sized For App Spanduk (Responsive: 16:9 on mobile, 21:9 on desktop) */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] lg:aspect-[21/9] max-h-[520px] bg-slate-950 overflow-hidden">
            
            {/* The 4 Banner Images Stack */}
            {bannerSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={`${slide.title} ${slide.highlight} - Spanduk Informasi Puskesmas Kepulauan Seribu Selatan`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Subtle gradient overlay at bottom & sides for editorial readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
              </div>
            ))}

            {/* Top Toolbar: Slide Badge, Zoom Modal Button, Pause/Play */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-6 right-3 sm:right-6 z-20 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border backdrop-blur-md shadow-md ${active.badgeColor}`}>
                  {active.categoryIcon}
                  <span>{active.category}</span>
                </span>

                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/10 shadow-xs">
                  <span>Spanduk 0{currentSlide + 1}</span>
                  <span className="text-slate-400">/ 04</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Button to view full banner zoom */}
                <button
                  onClick={() => setZoomModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 text-xs font-semibold flex items-center gap-1.5 shadow-md transition hover:scale-105 active:scale-95 cursor-pointer"
                  title="Perbesar Spanduk Informasi Penuh"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline text-[11px]">Lihat Gambar Penuh</span>
                </button>

                {/* Pause/Play Toggle */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-slate-300 hover:text-white border border-white/20 transition active:scale-95 cursor-pointer shadow-md"
                  title={isPaused ? 'Lanjutkan Auto-Slide' : 'Jeda Auto-Slide'}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </div>
            </div>

            {/* Previous & Next Navigation Arrows (Floating) */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-2xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl hidden sm:flex items-center justify-center"
              aria-label="Spanduk Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-2xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl hidden sm:flex items-center justify-center"
              aria-label="Spanduk Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Caption & Interactive Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 lg:p-7 text-white">
              <div className="max-w-3xl space-y-2 sm:space-y-2.5">
                
                {/* Slide Headline */}
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight drop-shadow-md leading-tight">
                  {active.title}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-200 to-amber-200">
                    {active.highlight}
                  </span>
                </h2>

                {/* Subtitle / Motto */}
                <p className="text-xs sm:text-sm font-medium text-sky-200/90 font-serif-elegant italic drop-shadow-sm line-clamp-1">
                  "{active.subtitle}"
                </p>

                {/* Description - visible on tablet and desktop */}
                <p className="hidden md:block text-xs sm:text-sm text-slate-200/90 max-w-2xl drop-shadow-sm leading-relaxed">
                  {active.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:pt-2">
                  <button
                    onClick={() => navigateToTab(active.actionTab, active.actionSubTab)}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-400 hover:via-teal-400 hover:to-emerald-400 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-sky-500/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    <span>{active.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {active.secondaryActionText && (
                    <button
                      onClick={() => navigateToTab(active.secondaryActionTab)}
                      className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                      <span>{active.secondaryActionText}</span>
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Slider Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>

          {/* 4 Interactive Banner Thumbnail Switchers Below */}
          <div className="bg-slate-900/95 border-t border-slate-800 p-2 sm:p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {bannerSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`group/thumb relative rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-left transition-all duration-300 border flex items-center gap-2.5 sm:gap-3 cursor-pointer ${
                  idx === currentSlide
                    ? 'bg-sky-500/15 border-sky-400/80 shadow-md ring-1 ring-sky-400/30'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                {/* Mini Image Preview */}
                <div className="relative w-12 sm:w-16 h-8 sm:h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-slate-950">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {idx === currentSlide && (
                    <div className="absolute inset-0 bg-sky-500/20 ring-1 ring-inset ring-sky-400" />
                  )}
                </div>

                {/* Text Label */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-mono font-bold ${idx === currentSlide ? 'text-sky-300' : 'text-slate-400'}`}>
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-bold truncate text-slate-300 group-hover/thumb:text-white">
                      {slide.title}
                    </span>
                  </div>
                  <p className="text-[11px] font-extrabold text-white truncate">
                    {slide.highlight}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Lightbox Modal: Inspect Full High-Res Spanduk without overlays */}
      {zoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setZoomModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl space-y-3 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-400">
                  SPANDUK 0{currentSlide + 1} DARI 04
                </span>
                <span className="text-slate-400 text-xs">|</span>
                <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                  {active.title} {active.highlight}
                </h3>
              </div>

              <button
                onClick={() => setZoomModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black">
              <img
                src={active.image}
                alt={`${active.title} ${active.highlight}`}
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <p className="text-slate-300 font-medium max-w-xl">
                {active.description}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>
                <button
                  onClick={nextSlide}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
