import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { DownloadSection } from './DownloadSection';
import { StaffDataSection } from './StaffDataSection';
import { StatsCounter } from './StatsCounter';
import { ActivityDocumentationSection } from './ActivityDocumentationSection';
import { HealthDataSection } from './HealthDataSection';
import { 
  DownloadCloud, 
  Users, 
  BarChart3, 
  Sparkles, 
  Layers, 
  ShieldCheck,
  FileCheck2,
  Camera,
  Activity
} from 'lucide-react';

interface Props {
  initialSubTab?: 'kesehatan' | 'dokumentasi' | 'unduhan' | 'sdm' | 'statistik' | 'semua';
}

export const CombinedDataSection: React.FC<Props> = ({ initialSubTab = 'kesehatan' }) => {
  const { activeTab } = useData();
  const [subTab, setSubTab] = useState<'kesehatan' | 'dokumentasi' | 'unduhan' | 'sdm' | 'statistik' | 'semua'>(
    activeTab === 'dokumentasi' 
      ? 'dokumentasi' 
      : activeTab === 'data-kesehatan' 
      ? 'kesehatan' 
      : activeTab === 'sdm' 
      ? 'sdm' 
      : activeTab === 'unduhan' 
      ? 'unduhan' 
      : initialSubTab
  );

  useEffect(() => {
    if (activeTab === 'dokumentasi') {
      setSubTab('dokumentasi');
    } else if (activeTab === 'data-kesehatan') {
      setSubTab('kesehatan');
    } else if (activeTab === 'sdm') {
      setSubTab('sdm');
    } else if (activeTab === 'unduhan') {
      setSubTab('unduhan');
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Premium Hero Header */}
      <div className="pt-10 pb-8 bg-gradient-to-r from-slate-950 via-sky-950 to-blue-950 text-white text-center border-b border-sky-900/40 shadow-inner">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Portal Satu Data & Keterbukaan Informasi Publik
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight mt-1">
            Pusat Data Kesehatan, Dokumentasi & Informasi Faskes
          </h1>
          <p className="text-xs sm:text-sm text-sky-200 mt-2 font-serif-elegant italic max-w-2xl mx-auto">
            "Akses visual grafik 10 penyakit terbanyak, rekapitulasi kunjungan rawat jalan antar pulau, album dokumentasi kegiatan, formasi SDM kesehatan, dan unduhan SOP resmi."
          </p>

          {/* Unified Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg max-w-full overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSubTab('kesehatan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'kesehatan'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/40 scale-[1.02]'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Activity className="w-4 h-4 text-rose-300" />
              <span>Data Kesehatan & Grafik</span>
            </button>

            <button
              onClick={() => setSubTab('dokumentasi')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'dokumentasi'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/40 scale-[1.02]'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Dokumentasi Kegiatan</span>
            </button>

            <button
              onClick={() => setSubTab('unduhan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'unduhan'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/40 scale-[1.02]'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <DownloadCloud className="w-4 h-4" />
              <span>Unduhan SOP</span>
            </button>

            <button
              onClick={() => setSubTab('sdm')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'sdm'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 scale-[1.02]'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Data SDM</span>
            </button>

            <button
              onClick={() => setSubTab('statistik')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'statistik'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40 scale-[1.02]'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Indikator Mutu</span>
            </button>

            <button
              onClick={() => setSubTab('semua')}
              className={`hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'semua'
                  ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                  : 'text-sky-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Lihat Semua</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div>
        {subTab === 'kesehatan' && (
          <div className="animate-in fade-in-50 duration-300">
            <HealthDataSection />
          </div>
        )}

        {subTab === 'dokumentasi' && (
          <div className="animate-in fade-in-50 duration-300">
            <ActivityDocumentationSection />
          </div>
        )}

        {subTab === 'unduhan' && (
          <div className="animate-in fade-in-50 duration-300">
            <DownloadSection />
          </div>
        )}

        {subTab === 'sdm' && (
          <div className="animate-in fade-in-50 duration-300">
            <StaffDataSection />
          </div>
        )}

        {subTab === 'statistik' && (
          <div className="animate-in fade-in-50 duration-300 py-6">
            <StatsCounter />
            <div className="max-w-4xl mx-auto px-4 mt-8">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-sky-800 font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Komitmen Keterbukaan Informasi Publik (KIP)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Puskesmas Kepulauan Seribu Selatan berkomitmen menyajikan data faskes, profil ketenagaan, dan standar operasional secara transparan, akuntabel, dan dapat diakses oleh seluruh lapisan masyarakat sesuai UU KIP No. 14 Tahun 2008.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Regulasi & SOP Standar Pelayanan Minimal (SPM)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Formasi 64 Nakes & Staf Tersebar di Faskes Kepulauan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {subTab === 'semua' && (
          <div className="animate-in fade-in-50 duration-300 space-y-12">
            <HealthDataSection />
            <div className="border-t border-slate-200" />
            <ActivityDocumentationSection />
            <div className="border-t border-slate-200" />
            <DownloadSection />
            <div className="border-t border-slate-200" />
            <StaffDataSection />
            <div className="border-t border-slate-200" />
            <StatsCounter />
          </div>
        )}
      </div>
    </div>
  );
};
