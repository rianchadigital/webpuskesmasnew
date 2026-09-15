import React, { useState } from 'react';
import { INITIAL_ACTIVITY_ALBUMS } from '../data/healthData';
import { ActivityAlbum } from '../types';
import { 
  Camera, 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  Sparkles,
  ExternalLink,
  Layers,
  Building2
} from 'lucide-react';

export const ActivityDocumentationSection: React.FC = () => {
  const [albums] = useState<ActivityAlbum[]>(INITIAL_ACTIVITY_ALBUMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedIsland, setSelectedIsland] = useState<string>('Semua Pulau');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal State
  const [activeAlbum, setActiveAlbum] = useState<ActivityAlbum | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const categories = [
    'Semua',
    'Posyandu & ILP',
    'Lansia & PTM',
    'UKS & Sekolah',
    'Pusling Apung',
    'Imunisasi & Gizi',
    'Kedaruratan & Pelatihan'
  ];

  const islands = [
    'Semua Pulau',
    'Pulau Tidung',
    'Pulau Pari',
    'Pulau Lancang',
    'Pulau Untung Jawa',
    'Pulau Payung'
  ];

  const filteredAlbums = albums.filter((album) => {
    const matchCategory = selectedCategory === 'Semua' || album.category === selectedCategory;
    const matchIsland = selectedIsland === 'Semua Pulau' || album.island === selectedIsland;
    const matchSearch = searchQuery.trim() === '' || 
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchIsland && matchSearch;
  });

  const handleOpenAlbum = (album: ActivityAlbum) => {
    setActiveAlbum(album);
    setActivePhotoIndex(0);
  };

  const handleCloseModal = () => {
    setActiveAlbum(null);
    setActivePhotoIndex(0);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeAlbum) return;
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : activeAlbum.photos.length - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeAlbum) return;
    setActivePhotoIndex((prev) => (prev < activeAlbum.photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-sky-600" />
            Galeri & Dokumentasi Kegiatan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dokumentasi Pelayanan Kesehatan Kepulauan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Kumpulan album foto kegiatan lapangan, pelayanan Integrasi Layanan Primer (ILP), posyandu siklus hidup, dan aksi bakti kesehatan di wilayah Kepulauan Seribu Selatan. Klik kartu untuk melihat galeri lengkap.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          {/* Top row: Search and Island Selector */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dokumentasi kegiatan..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-sky-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Island Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 no-scrollbar">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Pulau:
              </span>
              {islands.map((island) => (
                <button
                  key={island}
                  onClick={() => setSelectedIsland(island)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedIsland === island
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {island}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom row: Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-sky-500" /> Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Albums Grid */}
        {filteredAlbums.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Tidak Ada Album Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau ganti filter kategori/pulau.</p>
            <button
              onClick={() => { setSelectedCategory('Semua'); setSelectedIsland('Semua Pulau'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                onClick={() => handleOpenAlbum(album)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1"
              >
                {/* Image Cover Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-600/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
                      {album.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold border border-amber-400/30">
                      {album.island}
                    </span>
                  </div>

                  {/* Photo Count Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/20">
                    <Camera className="w-3.5 h-3.5 text-sky-400" />
                    <span>{album.photos.length} Foto</span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-3 left-3 text-slate-200 text-[11px] font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-300" />
                    <span>{album.date}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{album.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition leading-snug line-clamp-2">
                      {album.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {album.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{album.participantCount} Peserta</span>
                    </div>

                    <span className="text-sky-600 font-bold group-hover:translate-x-0.5 transition flex items-center gap-1">
                      Buka Album &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Activity Album Popup Modal */}
      {activeAlbum && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-sky-950 to-blue-950 text-white flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-sky-500/30 text-sky-300 font-bold border border-sky-400/30">
                    {activeAlbum.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-amber-300 font-bold border border-amber-300/30">
                    {activeAlbum.island}
                  </span>
                  <span className="text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    {activeAlbum.date}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                  {activeAlbum.title}
                </h2>
                <p className="text-xs text-sky-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  {activeAlbum.location}
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition shrink-0"
                title="Tutup Popup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
              
              {/* Photo Showcase Carousel */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center group shadow-md">
                <img
                  src={activeAlbum.photos[activePhotoIndex]?.url || activeAlbum.coverImage}
                  alt={activeAlbum.photos[activePhotoIndex]?.caption || activeAlbum.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Caption bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 sm:p-5 text-white">
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                    {activeAlbum.photos[activePhotoIndex]?.caption || activeAlbum.title}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-sky-300">
                    <span>Foto {activePhotoIndex + 1} dari {activeAlbum.photos.length}</span>
                    <span>Puskesmas Kepulauan Seribu Selatan</span>
                  </div>
                </div>

                {/* Prev / Next Buttons */}
                {activeAlbum.photos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition shadow-lg opacity-80 group-hover:opacity-100"
                      title="Foto Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition shadow-lg opacity-80 group-hover:opacity-100"
                      title="Foto Selanjutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {activeAlbum.photos.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {activeAlbum.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        activePhotoIndex === idx
                          ? 'border-sky-600 ring-2 ring-sky-300 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Activity Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-sky-800">
                  Ringkasan & Deskripsi Pelaksanaan
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeAlbum.description}
                </p>
              </div>

              {/* Key Highlights / Capaian Kegiatan */}
              {activeAlbum.highlights && activeAlbum.highlights.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-sky-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-600" />
                    Poin Capaian & Hasil Kegiatan
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {activeAlbum.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Organizer & Participant Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium block">Penyelenggara / Tim Teknis:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                    {activeAlbum.organizer}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium block">Total Partisipan / Sasaran:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                    {activeAlbum.participantCount} Warga & Peserta Terlayani
                  </span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">
                Pusat Informasi & Dokumentasi Kesehatan (PIDK)
              </span>
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
              >
                Tutup Galeri
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
