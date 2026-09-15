import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ScheduleSection } from './ScheduleSection';
import { AgendaSection } from './AgendaSection';
import { Calendar, Clock, Sparkles, Layers } from 'lucide-react';

interface Props {
  initialSubTab?: 'jadwal' | 'agenda' | 'semua';
}

export const CombinedScheduleAgenda: React.FC<Props> = ({ initialSubTab = 'jadwal' }) => {
  const { activeTab } = useData();
  const [subTab, setSubTab] = useState<'jadwal' | 'agenda' | 'semua'>(
    activeTab === 'agenda' ? 'agenda' : initialSubTab
  );

  useEffect(() => {
    if (activeTab === 'agenda') {
      setSubTab('agenda');
    } else if (activeTab === 'jadwal') {
      setSubTab('jadwal');
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Premium Hero Header */}
      <div className="pt-10 pb-8 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white text-center border-b border-sky-800/40 shadow-inner">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Jadwal & Agenda Pelayanan Terpadu
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight mt-1">
            Jadwal Dokter & Kalender Agenda Kegiatan
          </h1>
          <p className="text-xs sm:text-sm text-sky-200 mt-2 font-serif-elegant italic max-w-2xl mx-auto">
            "Keterbukaan jadwal dokter spesialis/umum, kesiapsiagaan nakes pulau, serta kalender posyandu siklus hidup ILP di Kepulauan Seribu Selatan."
          </p>

          {/* Unified Tab Switcher (Simpel, Elegan & Premium) */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg max-w-full overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSubTab('jadwal')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'jadwal'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/40 scale-[1.02]'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Jadwal Pelayanan & Dokter</span>
            </button>

            <button
              onClick={() => setSubTab('agenda')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'agenda'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40 scale-[1.02]'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Kalender Agenda & Posyandu</span>
            </button>

            <button
              onClick={() => setSubTab('semua')}
              className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'semua'
                  ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                  : 'text-sky-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Lihat Keduanya</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div>
        {subTab === 'jadwal' && (
          <div className="animate-in fade-in-50 duration-300">
            <ScheduleSection />
          </div>
        )}

        {subTab === 'agenda' && (
          <div className="animate-in fade-in-50 duration-300">
            <AgendaSection />
          </div>
        )}

        {subTab === 'semua' && (
          <div className="animate-in fade-in-50 duration-300 space-y-8">
            <ScheduleSection />
            <div className="border-t border-slate-200" />
            <AgendaSection />
          </div>
        )}
      </div>
    </div>
  );
};
