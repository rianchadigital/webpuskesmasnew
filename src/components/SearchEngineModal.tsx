import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Search, 
  X, 
  Stethoscope, 
  Newspaper, 
  Layers, 
  Calendar, 
  Anchor, 
  FileText, 
  HelpCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const SearchEngineModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery,
    healthServices,
    ilpClusters,
    news,
    schedules,
    islands,
    documents,
    faqs,
    navigateToTab,
    setSelectedClusterId,
    setSelectedIslandId
  } = useData();

  if (!isSearchOpen) return null;

  const query = searchQuery.trim().toLowerCase();

  // Search through all content types
  const matchedServices = query 
    ? healthServices.filter((s) => s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query))
    : [];

  const matchedClusters = query
    ? ilpClusters.filter((c) => c.title.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query) || c.services.some(srv => srv.toLowerCase().includes(query)))
    : [];

  const matchedNews = query
    ? news.filter((n) => n.title.toLowerCase().includes(query) || n.summary.toLowerCase().includes(query))
    : [];

  const matchedSchedules = query
    ? schedules.filter((sc) => sc.serviceName.toLowerCase().includes(query) || sc.location.toLowerCase().includes(query) || sc.doctorOrOfficer.toLowerCase().includes(query))
    : [];

  const matchedIslands = query
    ? islands.filter((i) => i.name.toLowerCase().includes(query) || i.islandName.toLowerCase().includes(query) || i.services.some(srv => srv.toLowerCase().includes(query)))
    : [];

  const matchedDocs = query
    ? documents.filter((d) => d.name.toLowerCase().includes(query) || d.description.toLowerCase().includes(query))
    : [];

  const matchedFaqs = query
    ? faqs.filter((f) => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query))
    : [];

  const totalResults = matchedServices.length + matchedClusters.length + matchedNews.length + matchedSchedules.length + matchedIslands.length + matchedDocs.length + matchedFaqs.length;

  const handleClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pelayanan, klaster ILP, jadwal, pustu, berita, SOP..."
            className="w-full text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition shrink-0"
          >
            Tutup (ESC)
          </button>
        </div>

        {/* Search Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Pencarian Cepat Internal</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Ketikkan kata kunci seperti <em>"Klaster Ibu dan Anak", "Ambulans", "USG", "Pustu Lancang", "Jadwal Poli"</em>.
              </p>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Klaster 2 ILP', 'Ambulans Laut', 'Pemeriksaan Gigi', 'Pustu Pari', 'Jadwal Dokter', 'SOP Rujukan'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setSearchQuery(kw)}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-xs font-medium transition"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <p className="font-bold text-slate-700 text-sm">Tidak ada hasil yang cocok untuk "{searchQuery}"</p>
              <p className="text-xs text-slate-400">Coba gunakan kata kunci yang lebih umum atau periksa ejaan.</p>
            </div>
          ) : (
            <div className="space-y-5 text-xs">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                Ditemukan {totalResults} hasil pencarian:
              </p>

              {/* Pelayanan */}
              {matchedServices.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-sky-800 text-xs">
                    <Stethoscope className="w-4 h-4 text-sky-600" />
                    <span>Pelayanan Kesehatan ({matchedServices.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedServices.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => { handleClose(); navigateToTab('pelayanan'); }}
                        className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-100 text-left transition group"
                      >
                        <p className="font-bold text-slate-900 group-hover:text-sky-700">{srv.name}</p>
                        <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">{srv.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Klaster ILP */}
              {matchedClusters.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Klaster ILP ({matchedClusters.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedClusters.map((cl) => (
                      <button
                        key={cl.id}
                        onClick={() => { handleClose(); setSelectedClusterId(cl.id); navigateToTab('ilp'); }}
                        className="p-3 rounded-2xl bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-100 text-left transition group"
                      >
                        <p className="font-bold text-emerald-900">{cl.title}</p>
                        <p className="text-slate-600 text-[11px] line-clamp-1 mt-0.5">{cl.subtitle}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Faskes / Pustu Pulau */}
              {matchedIslands.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-teal-800 text-xs">
                    <Anchor className="w-4 h-4 text-teal-600" />
                    <span>Wilayah & Pustu Pulau ({matchedIslands.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedIslands.map((isl) => (
                      <button
                        key={isl.id}
                        onClick={() => { handleClose(); setSelectedIslandId(isl.id); navigateToTab('wilayah'); }}
                        className="p-3 rounded-2xl bg-teal-50/50 hover:bg-teal-100/60 border border-teal-100 text-left transition group"
                      >
                        <p className="font-bold text-teal-900">{isl.name}</p>
                        <p className="text-slate-600 text-[11px] line-clamp-1 mt-0.5">{isl.address}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Jadwal */}
              {matchedSchedules.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-blue-800 text-xs">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Jadwal Pelayanan ({matchedSchedules.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedSchedules.map((sc) => (
                      <button
                        key={sc.id}
                        onClick={() => { handleClose(); navigateToTab('jadwal'); }}
                        className="p-3 rounded-2xl bg-blue-50/40 hover:bg-blue-100/50 border border-blue-100 text-left transition group"
                      >
                        <p className="font-bold text-blue-900">{sc.serviceName} ({sc.day})</p>
                        <p className="text-slate-600 text-[11px] line-clamp-1 mt-0.5">{sc.location} • {sc.hours}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Berita */}
              {matchedNews.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-800 text-xs">
                    <Newspaper className="w-4 h-4 text-indigo-600" />
                    <span>Berita & Informasi ({matchedNews.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedNews.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => { handleClose(); navigateToTab('berita'); }}
                        className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 text-left transition flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{n.title}</p>
                          <p className="text-slate-500 text-[11px] line-clamp-1">{n.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dokumen / SOP */}
              {matchedDocs.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-rose-800 text-xs">
                    <FileText className="w-4 h-4 text-rose-600" />
                    <span>Download Center ({matchedDocs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedDocs.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => { handleClose(); navigateToTab('unduhan'); }}
                        className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-rose-50 border border-slate-100 text-left transition flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{d.name}</p>
                          <p className="text-slate-500 text-[11px]">{d.category} • {d.fileSize}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {matchedFaqs.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-purple-800 text-xs">
                    <HelpCircle className="w-4 h-4 text-purple-600" />
                    <span>Tanya Jawab FAQ ({matchedFaqs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedFaqs.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => { handleClose(); navigateToTab('faq'); }}
                        className="w-full p-3 rounded-2xl bg-purple-50/40 hover:bg-purple-100/50 border border-purple-100 text-left transition"
                      >
                        <p className="font-bold text-purple-900">{f.question}</p>
                        <p className="text-slate-600 text-[11px] line-clamp-1 mt-0.5">{f.answer}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
