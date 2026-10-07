import React from 'react';
import { useData } from '../context/DataContext';
import { Volume2, Sparkles, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const RunningTicker: React.FC = () => {
  const { profile } = useData();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-900 to-sky-950 text-white border-b border-emerald-800/40 shadow-xs z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-10 sm:h-11">
        {/* Static Left Label Badge (High-Contrast & Clean) */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 text-[11px] font-extrabold uppercase tracking-wider mr-3 sm:mr-4 shadow-xs">
          <Volume2 className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
          <span className="hidden sm:inline">PENGUMUMAN</span>
          <span className="sm:hidden">INFO</span>
        </div>

        {/* Marquee Content Track */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-medium tracking-wide flex items-center gap-8 text-emerald-50">
            {/* Primary User-Requested Text */}
            <span className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 inline shrink-0" />
              <span>Selamat Datang di website Puskesmas Kepulauan Seribu Selatan</span>
            </span>

            <span className="text-emerald-400/80">✦</span>

            <span className="flex items-center gap-1.5 text-emerald-100">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400 shrink-0" />
              <span>Motto: "{profile.motto}"</span>
            </span>

            <span className="text-emerald-400/80">✦</span>

            <span className="flex items-center gap-1.5 text-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <span>Layanan Terpadu Integrasi Layanan Primer (ILP) Siklus Hidup & Kesiapsiagaan Maritim 24 Jam</span>
            </span>

            <span className="text-emerald-400/80">✦</span>

            <span className="flex items-center gap-1.5 text-emerald-100">
              <MapPin className="w-3.5 h-3.5 text-sky-300 shrink-0" />
              <span>Melayani 5 Pulau Pemukiman: Pulau Tidung, Pulau Pari, Pulau Lancang, Pulau Untung Jawa, & Pulau Payung</span>
            </span>

            <span className="text-emerald-400/80">✦</span>

            {/* Repeat for continuous visual flow */}
            <span className="font-bold text-amber-200 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 inline shrink-0" />
              <span>Selamat Datang di website Puskesmas Kepulauan Seribu Selatan</span>
            </span>
          </div>
        </div>

        {/* Right Subtle Pill Indicator */}
        <div className="hidden lg:flex shrink-0 items-center gap-1.5 pl-3 border-l border-emerald-800/60 text-[10px] text-emerald-300 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>PORTAL RESMI</span>
        </div>
      </div>
    </div>
  );
};
