import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { IslandFacility } from '../types';
import { 
  Anchor, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  X, 
  Ship, 
  UserCheck, 
  ArrowRight, 
  LifeBuoy,
  MessageCircle
} from 'lucide-react';

export const IslandCoverage: React.FC = () => {
  const { islands, selectedIslandId, setSelectedIslandId, navigateToTab } = useData();
  const [activeModalIsland, setActiveModalIsland] = useState<IslandFacility | null>(null);

  // Auto open modal if selectedIslandId is passed
  React.useEffect(() => {
    if (selectedIslandId) {
      const found = islands.find((i) => i.id === selectedIslandId);
      if (found) {
        setActiveModalIsland(found);
      }
    }
  }, [selectedIslandId, islands]);

  const closeModal = () => {
    setActiveModalIsland(null);
    setSelectedIslandId(null);
  };

  return (
    <section id="wilayah-section" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Anchor className="w-3.5 h-3.5" />
            Jejaring Pelayanan Maritim
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Wilayah Kerja & Pustu Pulau
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Menjangkau seluruh pulau pemukiman di Kepulauan Seribu Selatan melalui Puskesmas Kepulauan Seribu Selatan, Pustu Pulau Lancang, Pustu Pulau Pari, dan Pustu Pulau Untung Jawa.
          </p>
        </div>

        {/* Island Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {islands.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Type Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3.5 left-3.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-sm ${
                    facility.type === 'Puskesmas'
                      ? 'bg-sky-600 text-white'
                      : 'bg-teal-600 text-white'
                  }`}>
                    {facility.type}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-teal-300 text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1">
                    <LifeBuoy className="w-3 h-3" />
                    {facility.islandName}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <h3 className="font-bold text-base sm:text-lg leading-tight line-clamp-1">
                    {facility.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  
                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{facility.address}</span>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">{facility.operatingHours}</span>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{facility.contactNumber}</span>
                  </div>

                  {/* Services Mini Pills */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Layanan Tersedia:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {facility.services.slice(0, 3).map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {srv}
                        </span>
                      ))}
                      {facility.services.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 text-[11px] font-bold">
                          +{facility.services.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalIsland(facility)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white font-bold text-xs transition duration-200 shadow-2xs group/btn"
                  >
                    <span>Lihat Detail Fasilitas</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Island Detail Modal */}
        {activeModalIsland && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
              
              {/* Modal Banner */}
              <div className="relative h-48 sm:h-56">
                <img
                  src={activeModalIsland.image}
                  alt={activeModalIsland.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500 text-white text-xs font-bold uppercase mb-2 inline-block">
                    {activeModalIsland.type} • {activeModalIsland.islandName}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    {activeModalIsland.name}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Tentang Fasilitas Pulau
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeModalIsland.description}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <Clock className="w-4 h-4 text-sky-600" />
                      <span>Jam Operasional Pelayanan</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{activeModalIsland.operatingHours}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <LifeBuoy className="w-4 h-4 text-rose-600" />
                      <span>Layanan Kedaruratan</span>
                    </div>
                    <p className="text-sm font-bold text-emerald-700">{activeModalIsland.emergencyService}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Penanggung Jawab / Nakes Siaga</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{activeModalIsland.headOfficer}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>Alamat Lengkap</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{activeModalIsland.address}</p>
                  </div>
                </div>

                {/* All Services List */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">
                    Daftar Lengkap Pelayanan Kesehatan di Pulau Ini
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalIsland.services.map((srv, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-sky-50/50 border border-sky-100 text-xs font-medium text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Telepon: <strong className="text-slate-800">{activeModalIsland.contactNumber}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { closeModal(); navigateToTab('kontak'); }}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                    >
                      Hubungi Pustu
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition"
                    >
                      Tutup
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
