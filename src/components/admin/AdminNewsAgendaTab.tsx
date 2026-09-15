import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { NewsItem, AgendaEvent } from '../../types';
import { 
  Newspaper, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  MapPin, 
  Clock, 
  Image as ImageIcon,
  Tag,
  User,
  ExternalLink
} from 'lucide-react';

interface Props {
  mode: 'news' | 'agenda';
  onSuccessToast: (msg: string) => void;
}

export const AdminNewsAgendaTab: React.FC<Props> = ({ mode, onSuccessToast }) => {
  const { news, updateNews, agenda, updateAgenda } = useData();

  // News Edit/Create State
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Kegiatan');
  const [newsDate, setNewsDate] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsAuthor, setNewsAuthor] = useState('Humas Puskesmas Kepulauan Seribu Selatan');
  const [newsImage, setNewsImage] = useState('');

  // Agenda Edit/Create State
  const [editingAgenda, setEditingAgenda] = useState<AgendaEvent | null>(null);
  const [isAddingAgenda, setIsAddingAgenda] = useState(false);
  const [agendaTitle, setAgendaTitle] = useState('');
  const [agendaDate, setAgendaDate] = useState('');
  const [agendaTime, setAgendaTime] = useState('');
  const [agendaLocation, setAgendaLocation] = useState('Pulau Tidung');
  const [agendaCategory, setAgendaCategory] = useState('Posyandu & Skrining');
  const [agendaDesc, setAgendaDesc] = useState('');
  const [agendaStatus, setAgendaStatus] = useState<'Akan Datang' | 'Sedang Berlangsung' | 'Selesai'>('Akan Datang');

  // Open Edit News Modal
  const openEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setIsAddingNews(false);
    setNewsTitle(item.title);
    setNewsCategory(item.category);
    setNewsDate(item.date);
    setNewsSummary(item.summary);
    setNewsContent(item.content);
    setNewsAuthor(item.author || 'Humas Puskesmas');
    setNewsImage(item.image || '');
  };

  const openNewNews = () => {
    setEditingNews(null);
    setIsAddingNews(true);
    setNewsTitle('');
    setNewsCategory('Kegiatan');
    setNewsDate(new Date().toISOString().split('T')[0]);
    setNewsSummary('');
    setNewsContent('');
    setNewsAuthor('Humas Puskesmas Kepulauan Seribu Selatan');
    setNewsImage('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80');
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim()) return;

    if (isAddingNews) {
      const newItem: NewsItem = {
        id: `news-${Date.now()}`,
        title: newsTitle.trim(),
        category: newsCategory,
        date: newsDate || new Date().toISOString().split('T')[0],
        summary: newsSummary.trim(),
        content: newsContent.trim() || newsSummary.trim(),
        author: newsAuthor.trim(),
        image: newsImage.trim() || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
      };
      updateNews([newItem, ...news]);
      onSuccessToast(`Berita "${newsTitle}" berhasil ditambahkan.`);
    } else if (editingNews) {
      const updated = news.map(n => {
        if (n.id === editingNews.id) {
          return {
            ...n,
            title: newsTitle.trim(),
            category: newsCategory,
            date: newsDate,
            summary: newsSummary.trim(),
            content: newsContent.trim(),
            author: newsAuthor.trim(),
            image: newsImage.trim()
          };
        }
        return n;
      });
      updateNews(updated);
      onSuccessToast(`Berita "${newsTitle}" berhasil diperbarui.`);
    }
    setEditingNews(null);
    setIsAddingNews(false);
  };

  // Open Edit Agenda Modal
  const openEditAgenda = (ev: AgendaEvent) => {
    setEditingAgenda(ev);
    setIsAddingAgenda(false);
    setAgendaTitle(ev.title);
    setAgendaDate(ev.date);
    setAgendaTime(ev.time);
    setAgendaLocation(ev.location);
    setAgendaCategory(ev.category);
    setAgendaDesc(ev.description || '');
    setAgendaStatus(ev.status || 'Akan Datang');
  };

  const openNewAgenda = () => {
    setEditingAgenda(null);
    setIsAddingAgenda(true);
    setAgendaTitle('');
    setAgendaDate(new Date().toISOString().split('T')[0]);
    setAgendaTime('09.00 - 12.00 WIB');
    setAgendaLocation('Pulau Tidung');
    setAgendaCategory('Posyandu & Skrining');
    setAgendaDesc('');
    setAgendaStatus('Akan Datang');
  };

  const handleSaveAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agendaTitle.trim()) return;

    if (isAddingAgenda) {
      const newEv: AgendaEvent = {
        id: `ev-${Date.now()}`,
        title: agendaTitle.trim(),
        date: agendaDate || new Date().toISOString().split('T')[0],
        time: agendaTime.trim() || '09.00 WIB - Selesai',
        location: agendaLocation.trim(),
        category: agendaCategory,
        description: agendaDesc.trim(),
        organizer: 'Puskesmas Kepulauan Seribu Selatan',
        status: agendaStatus
      };
      updateAgenda([newEv, ...agenda]);
      onSuccessToast(`Agenda "${agendaTitle}" berhasil ditambahkan.`);
    } else if (editingAgenda) {
      const updated = agenda.map(a => {
        if (a.id === editingAgenda.id) {
          return {
            ...a,
            title: agendaTitle.trim(),
            date: agendaDate,
            time: agendaTime.trim(),
            location: agendaLocation.trim(),
            category: agendaCategory,
            description: agendaDesc.trim(),
            status: agendaStatus
          };
        }
        return a;
      });
      updateAgenda(updated);
      onSuccessToast(`Agenda "${agendaTitle}" berhasil diperbarui.`);
    }
    setEditingAgenda(null);
    setIsAddingAgenda(false);
  };

  // ===================== BERITA VIEW =====================
  if (mode === 'news') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-sky-600" />
              <span>Kelola Warta & Berita Puskesmas ({news.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Publikasikan kegiatan, inovasi maritim, dan pengumuman kesehatan pulau.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewNews}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Berita Baru</span>
          </button>
        </div>

        <div className="space-y-3">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-start gap-3">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-sky-100 text-sky-800 font-bold">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">{item.date} • Ditulis oleh: {item.author || 'Humas'}</p>
                  <p className="text-slate-600 line-clamp-1">{item.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => openEditNews(item)}
                  className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Hapus berita "${item.title}"?`)) {
                      updateNews(news.filter(n => n.id !== item.id));
                      onSuccessToast('Berita berhasil dihapus.');
                    }
                  }}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL EDIT / CREATE NEWS */}
        {(editingNews || isAddingNews) && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Newspaper className="w-5 h-5 text-sky-600" />
                  <span>{isAddingNews ? 'Tulis Berita / Pengumuman Baru' : `Edit Berita: ${editingNews?.title}`}</span>
                </div>
                <button onClick={() => { setEditingNews(null); setIsAddingNews(false); }} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNews} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Judul Berita</label>
                  <input
                    type="text"
                    required
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 text-sm focus:bg-white focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                    <select
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                    >
                      <option value="Kegiatan">Kegiatan Faskes</option>
                      <option value="Pengumuman">Pengumuman Resmi</option>
                      <option value="Inovasi">Inovasi Layanan Maritim</option>
                      <option value="Edukasi">Edukasi Kesehatan</option>
                      <option value="Prestasi">Prestasi & Akreditasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tanggal Publikasi</label>
                    <input
                      type="date"
                      value={newsDate}
                      onChange={(e) => setNewsDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Penulis / Humas</label>
                    <input
                      type="text"
                      value={newsAuthor}
                      onChange={(e) => setNewsAuthor(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">URL Foto Sampul Berita</label>
                    <input
                      type="text"
                      value={newsImage}
                      onChange={(e) => setNewsImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ringkasan Berita (Excerpt)</label>
                  <textarea
                    rows={2}
                    required
                    value={newsSummary}
                    onChange={(e) => setNewsSummary(e.target.value)}
                    placeholder="Ringkasan singkat 1-2 kalimat untuk kartu berita..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Isi Lengkap Artikel Berita</label>
                  <textarea
                    rows={6}
                    required
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    placeholder="Tulis naskah lengkap berita dan dokumentasi kegiatan..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed font-sans"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setEditingNews(null); setIsAddingNews(false); }}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Berita</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===================== AGENDA VIEW =====================
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Kelola Kalender Agenda & Kegiatan Pulau ({agenda.length})</span>
          </h3>
          <p className="text-xs text-slate-500">
            Jadwal kegiatan posyandu keliling, skrining balita, imunisasi, dan senam lansia.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewAgenda}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Agenda</span>
        </button>
      </div>

      <div className="space-y-3">
        {agenda.map((ev) => (
          <div 
            key={ev.id} 
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{ev.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                  {ev.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  ev.status === 'Selesai' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-800'
                }`}>
                  {ev.status || 'Akan Datang'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ev.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ev.time}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{ev.location}</span>
                </span>
              </div>
              {ev.description && <p className="text-slate-600 text-xs">{ev.description}</p>}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => openEditAgenda(ev)}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Hapus agenda "${ev.title}"?`)) {
                    updateAgenda(agenda.filter(a => a.id !== ev.id));
                    onSuccessToast('Agenda berhasil dihapus.');
                  }
                }}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDIT / CREATE AGENDA */}
      {(editingAgenda || isAddingAgenda) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>{isAddingAgenda ? 'Tambah Agenda Kegiatan Baru' : `Edit Agenda: ${editingAgenda?.title}`}</span>
              </div>
              <button onClick={() => { setEditingAgenda(null); setIsAddingAgenda(false); }} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAgenda} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Kegiatan Agenda</label>
                <input
                  type="text"
                  required
                  value={agendaTitle}
                  onChange={(e) => setAgendaTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal Kegiatan</label>
                  <input
                    type="date"
                    required
                    value={agendaDate}
                    onChange={(e) => setAgendaDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Waktu / Jam Pelaksanaan</label>
                  <input
                    type="text"
                    value={agendaTime}
                    onChange={(e) => setAgendaTime(e.target.value)}
                    placeholder="09.00 - 12.00 WIB"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lokasi Pulau / Faskes</label>
                  <select
                    value={agendaLocation}
                    onChange={(e) => setAgendaLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Pulau Tidung">Puskesmas Kecamatan Pulau Tidung</option>
                    <option value="Pulau Pari">Pustu Pulau Pari</option>
                    <option value="Pulau Lancang">Pustu Pulau Lancang</option>
                    <option value="Pulau Untung Jawa">Pustu Pulau Untung Jawa</option>
                    <option value="Pulau Payung">Poskesdes Pulau Payung</option>
                    <option value="Semua Pulau">Seluruh Kepulauan Seribu Selatan</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status Kegiatan</label>
                  <select
                    value={agendaStatus}
                    onChange={(e) => setAgendaStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Akan Datang">Akan Datang</option>
                    <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Keterangan / Sasaran Peserta</label>
                <textarea
                  rows={3}
                  value={agendaDesc}
                  onChange={(e) => setAgendaDesc(e.target.value)}
                  placeholder="Contoh: Sasaran balita usia 0-5 tahun, wajib membawa buku KIA..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setEditingAgenda(null); setIsAddingAgenda(false); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Agenda</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
