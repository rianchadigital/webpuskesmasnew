import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ILPCluster } from '../types';
import { 
  Building2, 
  Baby, 
  Users, 
  ShieldAlert, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  FileText, 
  HelpCircle, 
  Phone, 
  ArrowRight, 
  X,
  Layers,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  ExternalLink,
  Eye
} from 'lucide-react';

export const ILPSection: React.FC = () => {
  const { ilpClusters, selectedClusterId, setSelectedClusterId, navigateToTab, openServiceDoc } = useData();
  const [activeModalCluster, setActiveModalCluster] = useState<ILPCluster | null>(null);

  // Auto open modal or focus if selectedClusterId changed
  React.useEffect(() => {
    if (selectedClusterId) {
      const found = ilpClusters.find((c) => c.id === selectedClusterId);
      if (found) {
        setActiveModalCluster(found);
      }
    }
  }, [selectedClusterId, ilpClusters]);

  const getClusterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return Building2;
      case 'Baby': return Baby;
      case 'Users': return Users;
      case 'ShieldAlert': return ShieldAlert;
      case 'Activity': return Activity;
      default: return Layers;
    }
  };

  const closeModal = () => {
    setActiveModalCluster(null);
    setSelectedClusterId(null);
  };

  return (
    <section id="ilp-section" className="py-16 bg-gradient-to-b from-slate-50 via-sky-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Transformasi Pelayanan Kesehatan Kemenkes RI
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Integrasi Layanan Primer (ILP)
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Puskesmas Kepulauan Seribu Selatan menerapkan penataan pelayanan berbasis siklus hidup manusia untuk menjamin pemantauan kesehatan keluarga yang proaktif, menyeluruh, dan berkesinambungan.
          </p>
        </div>

        {/* Official Google Drive PDF Callout Banner for Struktur Organisasi ILP */}
        <div className="mb-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-900 via-sky-950 to-indigo-950 text-white border border-teal-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="px-2 py-0.5 rounded-full bg-teal-500/30 text-teal-300 border border-teal-400/30 text-[10px] font-extrabold uppercase">
                  Dokumen Resmi Kemenkes
                </span>
                <span className="text-[10px] font-mono text-slate-400">PDF Drive</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                Struktur Organisasi Integrasi Layanan Primer (ILP) 2026
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1">
                Tersedia dokumen view PDF resmi penetapan 5 klaster ILP dan koordinator nakes faskes kepulauan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openServiceDoc('struktur-ilp')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-md cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat View PDF</span>
            </button>
            <a
              href="https://drive.google.com/file/d/1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
              title="Buka Dokumen PDF di Tab Baru Google Drive"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 5 Clusters Interactive Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ilpClusters.map((cluster) => {
            const Icon = getClusterIcon(cluster.icon);
            return (
              <div
                key={cluster.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Accent Strip */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${cluster.color}`} />

                <div className="space-y-4 pt-1">
                  {/* Header Badge & Number */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cluster.color} text-white flex items-center justify-center shadow-md shadow-sky-900/10 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {typeof cluster.clusterNumber === 'number' ? `Klaster ${cluster.clusterNumber}` : cluster.clusterNumber}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
                      {cluster.title}
                    </h3>
                    <p className="text-xs text-sky-700 font-semibold mt-1">
                      {cluster.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">
                    {cluster.description}
                  </p>

                  {/* Service Items Mini Preview */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Cakupan Layanan Utama:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {cluster.services.slice(0, 4).map((srv, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">{srv}</span>
                        </li>
                      ))}
                    </ul>
                    {cluster.services.length > 4 && (
                      <p className="text-[11px] text-sky-600 font-bold pt-0.5">
                        +{cluster.services.length - 4} layanan lainnya
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setActiveModalCluster(cluster)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r ${cluster.color} text-white font-bold text-xs shadow-xs hover:shadow-md transition active:scale-98`}
                  >
                    <span>Buka Rincian Klaster & Alur</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Siklus Hidup Family Concept Banner */}
        <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4" />
              Siklus Hidup Terpadu Kepulauan
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Satu Keluarga, Terpantau dari Kandungan hingga Lansia
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Dengan ILP, setiap warga tidak hanya diobati saat sakit, tetapi dipantau status kesehatannya secara rutin di Posyandu pulau dan Puskesmas.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateToTab('jadwal')}
              className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition shadow-lg"
            >
              Lihat Jadwal Pelayanan Klaster
            </button>
          </div>
        </div>

        {/* Detail Modal for Selected ILP Cluster */}
        {activeModalCluster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
              
              {/* Modal Top Header */}
              <div className={`p-6 bg-gradient-to-r ${activeModalCluster.color} text-white rounded-t-3xl relative`}>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                    {React.createElement(getClusterIcon(activeModalCluster.icon), { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                      Integrasi Layanan Primer
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">
                      {activeModalCluster.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-100 mt-0.5">
                      {activeModalCluster.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Deskripsi Klaster
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {activeModalCluster.description}
                  </p>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">
                    Tujuan Utama Pelayanan
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalCluster.objectives.map((obj, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services List */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">
                    Daftar Jenis Layanan Klaster
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalCluster.services.map((srv, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50/50 border border-sky-100 text-xs font-semibold text-slate-800">
                        <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                        <span>{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Meta: Target, Flow, Schedule, PIC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Sasaran Siklus Hidup</p>
                    <p className="text-slate-800 font-semibold">{activeModalCluster.targetAudience}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Jadwal Pelayanan</p>
                    <p className="text-slate-800 font-semibold">{activeModalCluster.schedule}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Alur Pelayanan Klaster</p>
                    <p className="text-slate-800 font-semibold">{activeModalCluster.serviceFlow}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Penanggung Jawab / Kontak</p>
                    <p className="text-sky-800 font-bold">{activeModalCluster.picName}</p>
                  </div>
                </div>

                {/* Related Documents */}
                {activeModalCluster.relatedDocs.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                      Dokumen & SOP Terkait
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeModalCluster.relatedDocs.map((doc, dIdx) => (
                        <span key={dIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium">
                          <FileText className="w-3.5 h-3.5 text-sky-600" />
                          <span>{doc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cluster FAQ */}
                {activeModalCluster.faq.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Tanya Jawab (FAQ) Klaster
                    </h4>
                    {activeModalCluster.faq.map((faqItem, fIdx) => (
                      <div key={fIdx} className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1 text-xs">
                        <p className="font-bold text-sky-900">Q: {faqItem.q}</p>
                        <p className="text-slate-700 font-medium">A: {faqItem.a}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Modal Bottom Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {activeModalCluster.contact}
                  </span>
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
                  >
                    Tutup Rincian Klaster
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
