import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Stethoscope, 
  Building2, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  Compass, 
  LifeBuoy, 
  ArrowRight,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile, navigateToTab } = useData();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-blue-900 to-slate-900 text-white">
      {/* Decorative Tropical Ocean & Island Wave Background Gradients */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-16 md:pb-28">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-semibold backdrop-blur-sm shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Portal Informasi Resmi Pelayanan Kesehatan Maritim</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Integrasi Layanan Primer (ILP) 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-200 to-cyan-300">Puskesmas Kepulauan Seribu Selatan</span>
              </h1>
              
              <h2 className="text-base sm:text-lg text-sky-100 font-semibold flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-300 shrink-0" />
                {profile.subtitle}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              "{profile.motto}" — Memberikan pelayanan kesehatan yang mudah diakses, berkualitas, terintegrasi dan berorientasi pada kebutuhan masyarakat di seluruh pulau pemukiman.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => navigateToTab('pelayanan')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition transform active:scale-95"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Lihat Pelayanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToTab('profil')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition"
              >
                <Building2 className="w-4 h-4 text-sky-300" />
                <span>Profil Puskesmas</span>
              </button>

              <button
                onClick={() => navigateToTab('ilp')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-400/40 text-white font-semibold text-sm backdrop-blur-sm transition"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>5 Klaster ILP</span>
              </button>
            </div>

            {/* Quick Feature Tickers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Gratis Peserta BPJS / KTP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Layanan Rujukan 24 Jam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>5 Pustu Siaga Pulau</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Highlights Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Visual Island Healthcare Highlight Card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 p-6 backdrop-blur-md shadow-2xl space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/30 border border-teal-400/40 flex items-center justify-center text-teal-300">
                    <LifeBuoy className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Kesiapsiagaan Maritim</h3>
                    <p className="text-[11px] text-sky-200">Wilayah Kepulauan Seribu Selatan</p>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-500/30 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
                  SIAGA 24 JAM
                </span>
              </div>

              {/* Island Coverage Pill List */}
              <div className="space-y-2 text-xs">
                <p className="text-slate-300 font-medium">Jejaring Fasilitas Kesehatan Pulau:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div 
                    onClick={() => navigateToTab('wilayah', 'tidung')}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 cursor-pointer transition flex items-center justify-between"
                  >
                    <span className="font-semibold text-white">Pulau Tidung</span>
                    <span className="text-[10px] text-teal-300">Induk</span>
                  </div>
                  <div 
                    onClick={() => navigateToTab('wilayah', 'pustu-pari')}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 cursor-pointer transition flex items-center justify-between"
                  >
                    <span className="font-semibold text-white">Pulau Pari</span>
                    <span className="text-[10px] text-sky-300">Pustu</span>
                  </div>
                  <div 
                    onClick={() => navigateToTab('wilayah', 'pustu-lancang')}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 cursor-pointer transition flex items-center justify-between"
                  >
                    <span className="font-semibold text-white">Pulau Lancang</span>
                    <span className="text-[10px] text-sky-300">Pustu</span>
                  </div>
                  <div 
                    onClick={() => navigateToTab('wilayah', 'pustu-untung-jawa')}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 cursor-pointer transition flex items-center justify-between"
                  >
                    <span className="font-semibold text-white">P. Untung Jawa</span>
                    <span className="text-[10px] text-sky-300">Pustu</span>
                  </div>
                </div>
              </div>

              {/* Information & Contact Banner inside Card */}
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-600 rounded-lg text-white">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-300 font-medium">Layanan Informasi & Kontak</p>
                    <p className="text-sm font-extrabold text-white tracking-wide">{profile.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigateToTab('kontak')}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold transition shrink-0"
                >
                  Kontak
                </button>
              </div>

              {/* Slogan pill */}
              <div className="text-center pt-1 text-[11px] text-sky-200 italic flex items-center justify-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                <span>Pelayanan Prima, Terintegrasi & Berkeadilan untuk Warga Kepulauan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Sea Wave SVG Divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-8 sm:h-12 text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
