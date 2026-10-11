import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AnnouncementItem, AnnouncementPosition } from '../../types';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Briefcase, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  X, 
  Save, 
  AlertCircle,
  Users,
  Paperclip,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';

interface AdminAnnouncementsTabProps {
  onSuccessToast: (msg: string) => void;
}

export const AdminAnnouncementsTab: React.FC<AdminAnnouncementsTabProps> = ({ onSuccessToast }) => {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Rekrutmen' | 'Info Dadakan' | 'Pengumuman Resmi' | 'Jadwal Khusus'>('Rekrutmen');
  const [urgency, setUrgency] = useState<'Tinggi' | 'Sedang' | 'Biasa'>('Sedang');
  const [date, setDate] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [officialNumber, setOfficialNumber] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [isUrgentBanner, setIsUrgentBanner] = useState(false);

  // Positions (for recruitment)
  const [positions, setPositions] = useState<AnnouncementPosition[]>([]);
  const [posName, setPosName] = useState('');
  const [posQuota, setPosQuota] = useState('');
  const [posQual, setPosQual] = useState('');

  // Requirements & Documents (newline delimited)
  const [requirementsText, setRequirementsText] = useState('');
  const [documentsText, setDocumentsText] = useState('');

  // Contact person
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Attachment
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentSize, setAttachmentSize] = useState('');

  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Rekrutmen');
    setUrgency('Sedang');
    const today = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    setDate(today);
    setValidUntil('');
    setOfficialNumber(`800/0${Math.floor(Math.random() * 90 + 10)}/PKM.KSS/X/2026`);
    setAuthor('Sub Bagian Tata Usaha & Pengelola Kepegawaian');
    setSummary('');
    setContent('');
    setIsUrgentBanner(false);
    setPositions([
      { name: 'Perawat Pelaksana', quota: '2 Orang', qualification: 'D-III / S-1 Keperawatan + Ners, STR Aktif' }
    ]);
    setRequirementsText(
      'Warga Negara Indonesia (WNI) berusia minimal 20 tahun.\nMemiliki kualifikasi pendidikan sesuai dengan formasi.\nMemiliki STR yang masih aktif.\nSehat jasmani dan rohani, bersedia ditempatkan di pulau.'
    );
    setDocumentsText(
      'Surat Lamaran Pekerjaan.\nCurriculum Vitae (CV) terbaru.\nSalinan Ijazah dan Transkrip Nilai.\nSalinan KTP dan KK.\nPasfoto 4x6 latar belakang merah.'
    );
    setContactName('Sekretariat Rekrutmen Puskesmas Kepulauan Seribu Selatan');
    setContactPhone('0813-1818-7299');
    setContactEmail('rekrutmen.puskesmas1000@jakarta.go.id');
    setAttachmentName('Pengumuman_Resmi_Puskesmas.pdf');
    setAttachmentSize('1.2 MB');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (item: AnnouncementItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setUrgency(item.urgency);
    setDate(item.date);
    setValidUntil(item.validUntil || '');
    setOfficialNumber(item.officialNumber);
    setAuthor(item.author);
    setSummary(item.summary);
    setContent(item.content);
    setIsUrgentBanner(!!item.isUrgentBanner);
    setPositions(item.positions || []);
    setRequirementsText((item.requirements || []).join('\n'));
    setDocumentsText((item.documents || []).join('\n'));
    setContactName(item.contactPerson?.name || '');
    setContactPhone(item.contactPerson?.phone || '');
    setContactEmail(item.contactPerson?.email || '');
    setAttachmentName(item.fileAttachment?.name || '');
    setAttachmentSize(item.fileAttachment?.size || '');
    setFormError('');
    setModalOpen(true);
  };

  const handleAddPosition = () => {
    if (!posName.trim()) return;
    setPositions(prev => [
      ...prev,
      {
        name: posName.trim(),
        quota: posQuota.trim() || '1 Orang',
        qualification: posQual.trim() || 'Kualifikasi D-III / S-1 terkait'
      }
    ]);
    setPosName('');
    setPosQuota('');
    setPosQual('');
  };

  const handleRemovePosition = (index: number) => {
    setPositions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Judul pengumuman / rekrutmen wajib diisi.');
      return;
    }
    if (!content.trim()) {
      setFormError('Isi pengumuman wajib diisi.');
      return;
    }

    const reqArray = requirementsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const docArray = documentsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const payload: AnnouncementItem = {
      id: editingItem ? editingItem.id : `ann-${Date.now()}`,
      title: title.trim(),
      category,
      urgency,
      date: date.trim() || 'Hari Ini',
      validUntil: validUntil.trim() || undefined,
      officialNumber: officialNumber.trim() || 'PKM.KSS/OFFICIAL/2026',
      author: author.trim() || 'Puskesmas Kepulauan Seribu Selatan',
      summary: summary.trim() || title.trim().slice(0, 140),
      content: content.trim(),
      isUrgentBanner,
      positions: positions.length > 0 ? positions : undefined,
      requirements: reqArray.length > 0 ? reqArray : undefined,
      documents: docArray.length > 0 ? docArray : undefined,
      contactPerson: contactName || contactPhone ? {
        name: contactName.trim() || 'Panitia Puskesmas',
        phone: contactPhone.trim() || '0813-1818-7299',
        email: contactEmail.trim() || 'info@puskesmasseribuselatan.com'
      } : undefined,
      fileAttachment: attachmentName ? {
        name: attachmentName.trim(),
        size: attachmentSize.trim() || '1.0 MB'
      } : undefined
    };

    if (editingItem) {
      updateAnnouncement(editingItem.id, payload);
      onSuccessToast(`Pengumuman "${payload.title.slice(0, 30)}..." berhasil diperbarui.`);
    } else {
      addAnnouncement(payload);
      onSuccessToast(`Pengumuman "${payload.title.slice(0, 30)}..." berhasil ditambahkan.`);
    }

    setModalOpen(false);
  };

  const handleDelete = (item: AnnouncementItem) => {
    if (window.confirm(`Yakin ingin menghapus pengumuman "${item.title}"?`)) {
      deleteAnnouncement(item.id);
      onSuccessToast(`Pengumuman "${item.title.slice(0, 30)}..." telah dihapus.`);
    }
  };

  const handleToggleUrgent = (item: AnnouncementItem) => {
    const updatedStatus = !item.isUrgentBanner;
    updateAnnouncement(item.id, { isUrgentBanner: updatedStatus });
    onSuccessToast(
      updatedStatus 
        ? `Pengumuman kini ditampilkan sebagai banner darurat teratas.` 
        : `Banner darurat dinonaktifkan.`
    );
  };

  const filtered = announcements.filter(item => {
    const matchCat = categoryFilter === 'Semua' || item.category === categoryFilter;
    const matchSearch = search.trim() === '' ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.officialNumber.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalRecruitment = announcements.filter(a => a.category === 'Rekrutmen').length;
  const totalUrgent = announcements.filter(a => a.isUrgentBanner || a.category === 'Info Dadakan').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-1.5 border border-blue-200 dark:border-blue-800">
            <Megaphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Papan Pengumuman & Karir</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Kelola Pengumuman & Rekrutmen
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Publikasikan pengumuman lowongan kerja nakes / PJLP, peringatan dini cuaca laut BMKG, dan maklumat pelayanan.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition shrink-0 active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengumuman / Rekrutmen</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-bold text-slate-500 block">Total Pengumuman</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5 block">{announcements.length}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 block">Lowongan Rekrutmen</span>
          <span className="text-xl font-extrabold text-emerald-800 dark:text-emerald-200 mt-0.5 block">{totalRecruitment}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
          <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 block">Info Dadakan / Urgent</span>
          <span className="text-xl font-extrabold text-rose-800 dark:text-rose-200 mt-0.5 block">{totalUrgent}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
          <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 block">Banner Aktif Teratas</span>
          <span className="text-xl font-extrabold text-sky-800 dark:text-sky-200 mt-0.5 block">
            {announcements.filter(a => a.isUrgentBanner).length}
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul, nomor surat, atau ringkasan..."
            className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['Semua', 'Rekrutmen', 'Info Dadakan', 'Pengumuman Resmi', 'Jadwal Khusus'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List Cards */}
      <div className="space-y-3.5">
        {filtered.map((item) => {
          const isRecruitment = item.category === 'Rekrutmen';
          const isUrgent = item.category === 'Info Dadakan' || item.urgency === 'Tinggi';

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border transition shadow-xs flex flex-col md:flex-row items-start justify-between gap-4 ${
                item.isUrgentBanner 
                  ? 'border-red-400 dark:border-red-600 bg-red-50/20' 
                  : 'border-slate-200 dark:border-slate-700/80 hover:border-blue-400'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    isRecruitment
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : isUrgent
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-sky-100 text-sky-800 border-sky-300'
                  }`}>
                    {item.category}
                  </span>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    item.urgency === 'Tinggi'
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                      : item.urgency === 'Sedang'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    Urgensi: {item.urgency}
                  </span>

                  {item.isUrgentBanner && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-600 text-white flex items-center gap-1 animate-pulse">
                      <ShieldAlert className="w-3 h-3" />
                      <span>Banner Darurat Aktif</span>
                    </span>
                  )}

                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    No: {item.officialNumber}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                {/* Meta Details */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Publikasi: {item.date}</span>
                  </span>

                  {item.validUntil && (
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Batas: {item.validUntil}</span>
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.author}</span>
                  </span>

                  {item.positions && item.positions.length > 0 && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{item.positions.length} Formasi Jabatan</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0 w-full md:w-auto border-t md:border-t-0 border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => handleToggleUrgent(item)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    item.isUrgentBanner
                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                  title="Tampilkan / Sembunyikan dari Banner Darurat"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{item.isUrgentBanner ? 'Lepas Banner' : 'Jadikan Banner'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 hover:bg-blue-200 font-bold text-xs transition flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 hover:bg-rose-200 font-bold text-xs transition flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <Megaphone className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-medium">Tidak ada pengumuman yang sesuai kriteria pencarian.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 shadow-2xl p-6 text-slate-900 dark:text-white space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
              <h4 className="text-base font-bold flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-blue-500" />
                <span>{editingItem ? 'Edit Pengumuman / Rekrutmen' : 'Tambah Pengumuman / Rekrutmen Baru'}</span>
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
                  Judul Pengumuman *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Penerimaan Tenaga Kesehatan Non-PNS Formasi 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kategori Pengumuman
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Rekrutmen">Rekrutmen (Lowongan Kerja)</option>
                    <option value="Info Dadakan">Info Dadakan (Cuaca / Rujukan)</option>
                    <option value="Pengumuman Resmi">Pengumuman Resmi</option>
                    <option value="Jadwal Khusus">Jadwal Khusus</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tingkat Urgensi
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Tinggi">Tinggi (Penting & Mendesak)</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Biasa">Biasa</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nomor Surat / Berkas
                  </label>
                  <input
                    type="text"
                    value={officialNumber}
                    onChange={(e) => setOfficialNumber(e.target.value)}
                    placeholder="800/042/PKM.KSS/X/2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tanggal Publikasi
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Contoh: 12 Oktober 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Batas Akhir / Valid Until (Opsional)
                  </label>
                  <input
                    type="text"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    placeholder="Contoh: 28 Oktober 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Penulis / Tim Penanggung Jawab
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Sub Bagian Tata Usaha Puskesmas"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Banner Darurat Checkbox */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Tampilkan Sebagai Banner Darurat di Halaman Utama
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Jika dicentang, pengumuman ini akan muncul sebagai banner warna merah di bagian atas halaman publik.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isUrgentBanner}
                  onChange={(e) => setIsUrgentBanner(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Ringkasan Singkat (Summary)
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Ringkasan poin penting pengumuman..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Isi Lengkap Pengumuman *
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Isi uraian pengumuman, pengantar, latar belakang, dan instruksi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 font-sans"
                />
              </div>

              {/* Recruitment Positions Section */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Daftar Formasi Lowongan (Khusus Rekrutmen)</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {positions.length} Formasi Terdaftar
                  </span>
                </div>

                {/* Form to add a position */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={posName}
                    onChange={(e) => setPosName(e.target.value)}
                    placeholder="Nama Jabatan (misal: Perawat)"
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={posQuota}
                    onChange={(e) => setPosQuota(e.target.value)}
                    placeholder="Kuota (misal: 2 Orang)"
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={posQual}
                      onChange={(e) => setPosQual(e.target.value)}
                      placeholder="Kualifikasi (misal: D-III Ners)"
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddPosition}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shrink-0 hover:bg-emerald-500"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>

                {/* List of current positions */}
                <div className="space-y-1.5">
                  {positions.map((pos, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-800 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-slate-900 dark:text-white">{pos.name}</strong>
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold ml-2">({pos.quota})</span>
                        <p className="text-[11px] text-slate-500">{pos.qualification}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePosition(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements & Documents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Persyaratan (1 baris per poin)
                  </label>
                  <textarea
                    rows={3}
                    value={requirementsText}
                    onChange={(e) => setRequirementsText(e.target.value)}
                    placeholder="Pisahkan dengan baris baru..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Berkas Lamaran (1 baris per berkas)
                  </label>
                  <textarea
                    rows={3}
                    value={documentsText}
                    onChange={(e) => setDocumentsText(e.target.value)}
                    placeholder="Pisahkan dengan baris baru..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Contact Person & Attachment */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Narahubung (Nama)
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Panitia Seleksi"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    No WhatsApp / Telepon
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="0813-1818-7299"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nama File PDF Lampiran
                  </label>
                  <input
                    type="text"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                    placeholder="Pengumuman_Resmi.pdf"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                  />
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingItem ? 'Simpan Perubahan' : 'Terbitkan Pengumuman'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
