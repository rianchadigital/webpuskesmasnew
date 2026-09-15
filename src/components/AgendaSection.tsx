import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { AgendaEvent } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Sparkles,
  Tag
} from 'lucide-react';

export const AgendaSection: React.FC = () => {
  const { agenda } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModalAgenda, setActiveModalAgenda] = useState<AgendaEvent | null>(null);

  const categories = [
    'Semua',
    'Posyandu',
    'Skrining',
    'Penyuluhan',
    'Kegiatan Masyarakat',
    'Kegiatan Lintas Sektor',
    'Rapat'
  ];

  const filteredAgenda = agenda.filter((item) => {
    return selectedCategory === 'Semua' || item.category === selectedCategory;
  });

  return (
    <section id="agenda-section" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            Kalender Kegiatan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Agenda Kegiatan Puskesmas
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Jadwal kegiatan posyandu terpadu, skrining massal, pertemuan lintas sektor, dan penyuluhan kesehatan di wilayah Kepulauan Seribu Selatan.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-full pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Agenda Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgenda.map((event) => {
            const eventDate = new Date(event.date);
            const dayNum = eventDate.getDate();
            const monthName = eventDate.toLocaleDateString('id-ID', { month: 'short' });
            const yearNum = eventDate.getFullYear();

            return (
              <div
                key={event.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Badge & Date Box */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-emerald-800 shadow-2xs shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <span className="text-xs font-bold uppercase">{monthName}</span>
                      <span className="text-lg font-extrabold leading-none">{dayNum}</span>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-2 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setActiveModalAgenda(event)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-xs transition"
                  >
                    <span>Lihat Detail Agenda</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agenda Modal */}
        {activeModalAgenda && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 space-y-6 animate-in zoom-in-95 duration-200">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase mb-2 inline-block">
                    {activeModalAgenda.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {activeModalAgenda.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalAgenda(null)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span><strong>Tanggal:</strong> {new Date(activeModalAgenda.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span><strong>Waktu:</strong> {activeModalAgenda.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span><strong>Lokasi:</strong> {activeModalAgenda.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span><strong>Penyelenggara:</strong> {activeModalAgenda.organizer}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[11px] mb-1">
                    Deskripsi Kegiatan
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                    {activeModalAgenda.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setActiveModalAgenda(null)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
