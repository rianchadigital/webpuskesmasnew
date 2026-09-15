import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { HealthService } from '../types';
import { 
  Stethoscope, 
  Search, 
  Building, 
  Users, 
  FileText, 
  Clock, 
  DollarSign, 
  Phone, 
  X, 
  CheckCircle2, 
  ArrowRight,
  ClipboardList,
  HeartHandshake,
  Syringe,
  Smile,
  FlaskConical,
  Pill,
  Accessibility,
  MessageSquare,
  Ambulance,
  Home,
  Footprints,
  Anchor,
  Bug,
  GraduationCap
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { healthServices, navigateToTab } = useData();
  const [filterCategory, setFilterCategory] = useState<'Semua' | 'Dalam Gedung' | 'Luar Gedung'>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalService, setActiveModalService] = useState<HealthService | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardList': return ClipboardList;
      case 'Stethoscope': return Stethoscope;
      case 'HeartHandshake': return HeartHandshake;
      case 'Syringe': return Syringe;
      case 'Smile': return Smile;
      case 'FlaskConical': return FlaskConical;
      case 'Pill': return Pill;
      case 'Accessibility': return Accessibility;
      case 'MessageSquare': return MessageSquare;
      case 'Ambulance': return Ambulance;
      case 'Home': return Home;
      case 'Footprints': return Footprints;
      case 'Anchor': return Anchor;
      case 'Bug': return Bug;
      case 'GraduationCap': return GraduationCap;
      default: return Stethoscope;
    }
  };

  const filteredServices = healthServices.filter((service) => {
    const matchesCategory = filterCategory === 'Semua' || service.category === filterCategory;
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="pelayanan-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            Layanan Kesehatan Terpadu
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pelayanan Kesehatan Puskesmas
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Puskesmas Kepulauan Seribu Selatan menyelenggarakan pelayanan kuratif, promotif, dan preventif baik di dalam gedung puskesmas maupun jemput bola di luar gedung.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80">
          
          {/* Category Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 w-full md:w-auto">
            {(['Semua', 'Dalam Gedung', 'Luar Gedung'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition ${
                  filterCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-sky-700'
                }`}
              >
                {cat === 'Dalam Gedung' ? '🏢 Dalam Gedung' : cat === 'Luar Gedung' ? '⛵ Luar Gedung / Komunitas' : 'Semua Layanan'}
              </button>
            ))}
          </div>

          {/* Live Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari jenis pelayanan..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100 p-8 space-y-3">
            <Stethoscope className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-700">Pelayanan Tidak Ditemukan</h4>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau ganti kategori filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((srv) => {
              const Icon = getServiceIcon(srv.icon);
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    
                    {/* Header with Icon & Category */}
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        srv.category === 'Dalam Gedung'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      }`}>
                        {srv.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
                        {srv.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1.5 line-clamp-2 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{srv.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate font-semibold text-emerald-700">{srv.fee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveModalService(srv)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 font-bold text-xs transition shadow-2xs group/b"
                    >
                      <span>Lihat Persyaratan & Alur</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/b:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Service Detail Modal */}
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 p-6 space-y-6">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                    {React.createElement(getServiceIcon(activeModalService.icon), { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wide">
                      {activeModalService.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                      {activeModalService.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalService(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi Pelayanan</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeModalService.description}
                </p>
              </div>

              {/* Requirements & Flow */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-600" />
                    Persyaratan Pelayanan
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeModalService.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-indigo-600" />
                    Tahapan / Alur Pelayanan
                  </h4>
                  <ol className="space-y-1.5 text-xs text-slate-600">
                    {activeModalService.flow.map((flw, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {fIdx + 1}
                        </span>
                        <span>{flw}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Schedule, Fee, and Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                  <p className="text-sky-800 font-bold">Jadwal Operasional:</p>
                  <p className="text-slate-700 mt-0.5">{activeModalService.schedule}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-emerald-800 font-bold">Biaya Pelayanan:</p>
                  <p className="text-emerald-700 font-semibold mt-0.5">{activeModalService.fee}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
                >
                  Tutup Informasi
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
