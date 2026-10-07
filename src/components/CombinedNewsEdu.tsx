import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { NewsSection } from './NewsSection';
import { AnnouncementSection } from './AnnouncementSection';
import { HealthEduSection } from './HealthEduSection';
import { ActivityDocumentationSection } from './ActivityDocumentationSection';
import { Newspaper, BookOpen, Sparkles, Layers, Camera, Megaphone } from 'lucide-react';

interface Props {
  initialSubTab?: 'berita' | 'pengumuman' | 'edukasi' | 'dokumentasi' | 'semua';
}

export const CombinedNewsEdu: React.FC<Props> = ({ initialSubTab = 'berita' }) => {
  const { activeTab } = useData();
  const [subTab, setSubTab] = useState<'berita' | 'pengumuman' | 'edukasi' | 'dokumentasi' | 'semua'>(
    activeTab === 'pengumuman' 
      ? 'pengumuman' 
      : activeTab === 'dokumentasi' 
      ? 'dokumentasi' 
      : (activeTab === 'edukasi' ? 'edukasi' : initialSubTab)
  );

  useEffect(() => {
    if (activeTab === 'pengumuman') {
      setSubTab('pengumuman');
    } else if (activeTab === 'dokumentasi') {
      setSubTab('dokumentasi');
    } else if (activeTab === 'edukasi') {
      setSubTab('edukasi');
    } else if (activeTab === 'berita') {
      setSubTab('berita');
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Premium Hero Header */}
      <div className="pt-10 pb-8 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white text-center border-b border-indigo-900/40 shadow-inner">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Pusat Publikasi & Informasi Warga
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight mt-1">
            Warta, Pengumuman & Informasi Edukasi
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2 font-serif-elegant italic max-w-2xl mx-auto">
            "Kabar kegiatan pelayanan kesehatan, pengumuman rekrutmen pegawai, informasi darurat dadakan, dan artikel panduan hidup bersih sehat (PHBS)."
          </p>

          {/* Unified Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg max-w-full overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSubTab('berita')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                subTab === 'berita'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 scale-[1.02]'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Warta & Berita Terkini</span>
            </button>

            <button
              onClick={() => setSubTab('pengumuman')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                subTab === 'pengumuman'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md shadow-rose-600/40 scale-[1.02]'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Megaphone className="w-4 h-4 text-amber-300" />
              <span>Pengumuman & Rekrutmen</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-500 text-white leading-none">
                Penting
              </span>
            </button>

            <button
              onClick={() => setSubTab('edukasi')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                subTab === 'edukasi'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 scale-[1.02]'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Edukasi Kesehatan</span>
            </button>

            <button
              onClick={() => setSubTab('dokumentasi')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                subTab === 'dokumentasi'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40 scale-[1.02]'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Camera className="w-4 h-4 text-emerald-300" />
              <span>Dokumentasi (Drive)</span>
            </button>

            <button
              onClick={() => setSubTab('semua')}
              className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                subTab === 'semua'
                  ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Semua</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div>
        {subTab === 'berita' && (
          <div className="animate-in fade-in-50 duration-300">
            <NewsSection />
          </div>
        )}

        {subTab === 'pengumuman' && (
          <div className="animate-in fade-in-50 duration-300">
            <AnnouncementSection />
          </div>
        )}

        {subTab === 'edukasi' && (
          <div className="animate-in fade-in-50 duration-300">
            <HealthEduSection />
          </div>
        )}

        {subTab === 'dokumentasi' && (
          <div className="animate-in fade-in-50 duration-300">
            <ActivityDocumentationSection />
          </div>
        )}

        {subTab === 'semua' && (
          <div className="animate-in fade-in-50 duration-300 space-y-12 pb-16">
            <AnnouncementSection />
            <div className="border-t border-slate-200 dark:border-slate-800" />
            <NewsSection />
            <div className="border-t border-slate-200 dark:border-slate-800" />
            <ActivityDocumentationSection />
            <div className="border-t border-slate-200 dark:border-slate-800" />
            <HealthEduSection />
          </div>
        )}
      </div>
    </div>
  );
};
