import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ActivityAlbum, ActivityPhoto } from '../../types';
import { 
  Camera, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Folder, 
  HardDrive, 
  ExternalLink, 
  Image as ImageIcon, 
  X, 
  Save, 
  AlertCircle,
  Eye,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface AdminDocumentationTabProps {
  onSuccessToast: (msg: string) => void;
}

export const AdminDocumentationTab: React.FC<AdminDocumentationTabProps> = ({ onSuccessToast }) => {
  const { activityAlbums, addActivityAlbum, updateActivityAlbum, deleteActivityAlbum } = useData();

  const [search, setSearch] = useState('');
  const [islandFilter, setIslandFilter] = useState('Semua Pulau');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [modalOpen, setModalOpen] = useState(false);
  const [previewAlbum, setPreviewAlbum] = useState<ActivityAlbum | null>(null);
  const [editingItem, setEditingItem] = useState<ActivityAlbum | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Posyandu & ILP' | 'Lansia & PTM' | 'UKS & Sekolah' | 'Pusling Apung' | 'Imunisasi & Gizi' | 'Kedaruratan & Pelatihan'>('Posyandu & ILP');
  const [date, setDate] = useState('');
  const [island, setIsland] = useState('Pulau Tidung');
  const [location, setLocation] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [participantCount, setParticipantCount] = useState<number>(50);
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [googleDriveFolder, setGoogleDriveFolder] = useState('');
  const [description, setDescription] = useState('');
  const [highlightsText, setHighlightsText] = useState('');

  // Photos in album
  const [photos, setPhotos] = useState<ActivityPhoto[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  const [formError, setFormError] = useState('');

  const sampleCoverImages = [
    { label: 'Posyandu Balita & Ibu Hamil', url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80' },
    { label: 'Pemeriksaan Lansia & PTM', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80' },
    { label: 'UKS & Skrining Siswa', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Pusling Apung / Kapal Medis', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Imunisasi Lengkap', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80' }
  ];

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Posyandu & ILP');
    const today = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    setDate(today);
    setIsland('Pulau Tidung');
    setLocation('RPTRA Tidung Ceria, Kelurahan Pulau Tidung');
    setCoverImage(sampleCoverImages[0].url);
    setOrganizer('Tim Klaster Integrasi Layanan Primer Puskesmas Kepulauan Seribu Selatan');
    setParticipantCount(45);
    setGoogleDriveLink('https://drive.google.com/drive/folders/dokumentasi-resmi');
    setGoogleDriveFolder('Drive: Dokumentasi / Kegiatan Kesehatan Kepulauan');
    setDescription('');
    setHighlightsText(
      'Pemberian pelayanan kesehatan promotif & preventif langsung kepada warga.\nPemeriksaan kesehatan terpadu dan skrining siklus hidup.\nPencatatan data elektronik sistem SATUSEHAT Kemenkes.'
    );
    setPhotos([
      {
        url: sampleCoverImages[0].url,
        caption: 'Pemeriksaan antropometri dan skrining kesehatan warga kepulauan.'
      }
    ]);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (item: ActivityAlbum) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setDate(item.date);
    setIsland(item.island);
    setLocation(item.location);
    setCoverImage(item.coverImage);
    setOrganizer(item.organizer);
    setParticipantCount(item.participantCount || 0);
    setGoogleDriveLink(item.googleDriveLink || '');
    setGoogleDriveFolder(item.googleDriveFolder || '');
    setDescription(item.description);
    setHighlightsText((item.highlights || []).join('\n'));
    setPhotos(item.photos || []);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setFormError('');
    setModalOpen(true);
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    setPhotos(prev => [
      ...prev,
      {
        url: newPhotoUrl.trim(),
        caption: newPhotoCaption.trim() || 'Foto dokumentasi kegiatan pelayanan'
      }
    ]);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Judul kegiatan / album dokumentasi wajib diisi.');
      return;
    }
    if (!location.trim()) {
      setFormError('Lokasi kegiatan wajib diisi.');
      return;
    }

    const highlightsArray = highlightsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const payload: ActivityAlbum = {
      id: editingItem ? editingItem.id : `alb-${Date.now()}`,
      title: title.trim(),
      category,
      date: date.trim() || 'Hari Ini',
      island,
      location: location.trim(),
      coverImage: coverImage.trim() || sampleCoverImages[0].url,
      photos: photos.length > 0 ? photos : [
        { url: coverImage.trim() || sampleCoverImages[0].url, caption: title.trim() }
      ],
      description: description.trim() || `Dokumentasi resmi kegiatan ${title.trim()} yang dilaksanakan oleh ${organizer.trim()} di ${island}.`,
      organizer: organizer.trim() || 'Puskesmas Kepulauan Seribu Selatan',
      participantCount: Number(participantCount) || 0,
      highlights: highlightsArray,
      googleDriveLink: googleDriveLink.trim() || undefined,
      googleDriveFolder: googleDriveFolder.trim() || undefined
    };

    if (editingItem) {
      updateActivityAlbum(editingItem.id, payload);
      onSuccessToast(`Album kegiatan "${payload.title.slice(0, 30)}..." berhasil diperbarui.`);
    } else {
      addActivityAlbum(payload);
      onSuccessToast(`Album kegiatan "${payload.title.slice(0, 30)}..." berhasil ditambahkan.`);
    }

    setModalOpen(false);
  };

  const handleDelete = (item: ActivityAlbum) => {
    if (window.confirm(`Yakin ingin menghapus album dokumentasi "${item.title}"?`)) {
      deleteActivityAlbum(item.id);
      onSuccessToast(`Album "${item.title.slice(0, 30)}..." telah dihapus.`);
    }
  };

  const filtered = activityAlbums.filter(album => {
    const matchIsland = islandFilter === 'Semua Pulau' || album.island === islandFilter;
    const matchCategory = categoryFilter === 'Semua' || album.category === categoryFilter;
    const matchSearch = search.trim() === '' ||
      album.title.toLowerCase().includes(search.toLowerCase()) ||
      album.location.toLowerCase().includes(search.toLowerCase()) ||
      album.description.toLowerCase().includes(search.toLowerCase());
    return matchIsland && matchCategory && matchSearch;
  });

  const totalPhotosCount = activityAlbums.reduce((acc, a) => acc + (a.photos?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-1.5 border border-sky-200 dark:border-sky-800">
            <Camera className="w-3.5 h-3.5 text-sky-600" />
            <span>Galeri & Dokumentasi Kegiatan</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Kelola Dokumentasi Pelayanan
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tambah, perbarui album, kelola foto kegiatan lapangan, posyandu ILP, pusling apung, serta arsip Google Drive.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition shrink-0 active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Album Kegiatan Baru</span>
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-bold text-slate-500 block">Total Album Kegiatan</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5 block">{activityAlbums.length}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
          <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 block">Total Foto Terarsip</span>
          <span className="text-xl font-extrabold text-sky-800 dark:text-sky-200 mt-0.5 block">{totalPhotosCount}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
          <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 block">Wilayah Pulau Terliput</span>
          <span className="text-xl font-extrabold text-teal-800 dark:text-teal-200 mt-0.5 block">5 Pulau</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 block">Terkoneksi Google Drive</span>
          <span className="text-xl font-extrabold text-amber-800 dark:text-amber-200 mt-0.5 block">
            {activityAlbums.filter(a => a.googleDriveLink).length} Album
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul kegiatan, lokasi, atau deskripsi..."
            className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={islandFilter}
            onChange={(e) => setIslandFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            <option value="Semua Pulau">Semua Pulau</option>
            <option value="Pulau Tidung">Pulau Tidung</option>
            <option value="Pulau Pari">Pulau Pari</option>
            <option value="Pulau Lancang">Pulau Lancang</option>
            <option value="Pulau Untung Jawa">Pulau Untung Jawa</option>
            <option value="Pulau Payung">Pulau Payung</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Posyandu & ILP">Posyandu & ILP</option>
            <option value="Lansia & PTM">Lansia & PTM</option>
            <option value="UKS & Sekolah">UKS & Sekolah</option>
            <option value="Pusling Apung">Pusling Apung</option>
            <option value="Imunisasi & Gizi">Imunisasi & Gizi</option>
            <option value="Kedaruratan & Pelatihan">Kedaruratan & Pelatihan</option>
          </select>
        </div>
      </div>

      {/* Album Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-xs hover:border-sky-400 transition flex flex-col justify-between"
          >
            <div>
              {/* Cover Image & Badges */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = sampleCoverImages[0].url;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-sky-600/90 text-white text-[10px] font-bold">
                    {item.island}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-400" />
                    <span>{item.date}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <ImageIcon className="w-3 h-3 text-teal-300" />
                    <span>{item.photos?.length || 0} Foto</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {item.title}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Organizer & Participants */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  <span className="truncate max-w-[170px]">{item.organizer}</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">{item.participantCount} Peserta</span>
                </div>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="p-3 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewAlbum(item)}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-600 flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Foto</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 hover:bg-sky-200 font-semibold text-xs transition flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 hover:bg-rose-200 font-semibold text-xs transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <Camera className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-xs font-medium">Tidak ada album kegiatan yang sesuai dengan filter pencarian.</p>
          </div>
        )}
      </div>

      {/* Photo Gallery Preview Modal */}
      {previewAlbum && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-700 shadow-2xl p-6 text-slate-900 dark:text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h4 className="text-base font-bold">{previewAlbum.title}</h4>
                <p className="text-xs text-slate-500">{previewAlbum.location} • {previewAlbum.date}</p>
              </div>
              <button
                onClick={() => setPreviewAlbum(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto p-1">
              {previewAlbum.photos?.map((photo, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900">
                  <img src={photo.url} alt={photo.caption} className="w-full aspect-video object-cover" />
                  <p className="p-2.5 text-xs text-slate-300 bg-slate-900/90 leading-relaxed">{photo.caption}</p>
                </div>
              ))}
            </div>

            {previewAlbum.googleDriveLink && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-500">{previewAlbum.googleDriveFolder || 'Folder Google Drive'}</span>
                <a
                  href={previewAlbum.googleDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sky-600 hover:underline flex items-center gap-1"
                >
                  <span>Buka Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Album Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 shadow-2xl p-6 text-slate-900 dark:text-white space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
              <h4 className="text-base font-bold flex items-center gap-2">
                <Camera className="w-4 h-4 text-sky-500" />
                <span>{editingItem ? 'Edit Album Dokumentasi' : 'Tambah Album Dokumentasi Baru'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Judul Kegiatan / Album *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pelaksanaan Posyandu Integrasi Layanan Primer Balita"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kategori Kegiatan
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="Posyandu & ILP">Posyandu & ILP</option>
                    <option value="Lansia & PTM">Lansia & PTM</option>
                    <option value="UKS & Sekolah">UKS & Sekolah</option>
                    <option value="Pusling Apung">Pusling Apung</option>
                    <option value="Imunisasi & Gizi">Imunisasi & Gizi</option>
                    <option value="Kedaruratan & Pelatihan">Kedaruratan & Pelatihan</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Wilayah Pulau
                  </label>
                  <select
                    value={island}
                    onChange={(e) => setIsland(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="Pulau Tidung">Pulau Tidung</option>
                    <option value="Pulau Pari">Pulau Pari</option>
                    <option value="Pulau Lancang">Pulau Lancang</option>
                    <option value="Pulau Untung Jawa">Pulau Untung Jawa</option>
                    <option value="Pulau Payung">Pulau Payung</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Contoh: 12 September 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Lokasi Spesifik *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: RPTRA Tidung Ceria, Kel. Pulau Tidung"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Jumlah Peserta / Sasaran
                  </label>
                  <input
                    type="number"
                    value={participantCount}
                    onChange={(e) => setParticipantCount(Number(e.target.value))}
                    placeholder="Contoh: 84"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Penyelenggara / Tim Koordinator
                </label>
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="Contoh: Tim Klaster 2 Puskesmas Kepulauan Seribu Selatan"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              {/* Cover Image & Presets */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  URL Foto Sampul (Cover Image)
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                />
                
                {/* Presets */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400">Pilihan cepat:</span>
                  {sampleCoverImages.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCoverImage(s.url)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-sky-100"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Uraian ringkas maksud dan jalannya kegiatan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Poin Keberhasilan / Highlights (1 baris per poin)
                </label>
                <textarea
                  rows={2}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="Poin penting pencapaian kegiatan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              {/* Google Drive Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tautan Google Drive (Opsional)
                  </label>
                  <input
                    type="url"
                    value={googleDriveLink}
                    onChange={(e) => setGoogleDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Label Folder Drive
                  </label>
                  <input
                    type="text"
                    value={googleDriveFolder}
                    onChange={(e) => setGoogleDriveFolder(e.target.value)}
                    placeholder="Drive: Dokumentasi / ILP Pulau Tidung"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Photos Gallery Section */}
              <div className="p-3.5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Daftar Foto Galeri Album</span>
                  </span>
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold">
                    {photos.length} Foto Terlampir
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="URL Gambar Foto..."
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                  />
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      placeholder="Keterangan foto..."
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddPhoto}
                      className="px-2.5 py-1.5 rounded-lg bg-sky-600 text-white font-bold text-xs shrink-0 hover:bg-sky-500"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 max-h-48 overflow-y-auto">
                  {photos.map((p, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 group">
                      <img src={p.url} alt={p.caption} className="w-full aspect-video object-cover" />
                      <div className="p-1 text-[10px] text-white truncate bg-black/60">{p.caption}</div>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs opacity-80 hover:opacity-100"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold text-xs transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingItem ? 'Simpan Perubahan' : 'Terbitkan Album'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
