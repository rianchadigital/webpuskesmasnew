import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { UsefulLink } from '../../types';
import { 
  Globe, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  FileSpreadsheet, 
  UserCheck, 
  Database, 
  Building2, 
  ShieldCheck, 
  Link as LinkIcon,
  X,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AdminUsefulLinksTabProps {
  onSuccessToast: (msg: string) => void;
}

export const AdminUsefulLinksTab: React.FC<AdminUsefulLinksTabProps> = ({ onSuccessToast }) => {
  const { usefulLinks, addUsefulLink, updateUsefulLink, deleteUsefulLink } = useData();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UsefulLink | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [url, setUrl] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState<'file' | 'user' | 'database' | 'shield' | 'globe' | 'building' | 'link'>('globe');

  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setShortName('');
    setSubtitle('');
    setCategory('Kepegawaian & Kinerja');
    setUrl('https://');
    setBadge('Puskesmas');
    setDescription('');
    setIconName('globe');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (item: UsefulLink) => {
    setEditingItem(item);
    setName(item.name);
    setShortName(item.shortName || '');
    setSubtitle(item.subtitle);
    setCategory(item.category || 'Portal Resmi');
    setUrl(item.url);
    setBadge(item.badge || 'Resmi');
    setDescription(item.description);
    setIconName(item.iconName || 'globe');
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Nama tautan bermanfaat wajib diisi.');
      return;
    }
    if (!url.trim() || url.trim() === 'https://') {
      setFormError('Alamat URL tautan wajib diisi lengkap (contoh: https://etpp.jakarta.go.id).');
      return;
    }

    // Determine badge and color style
    let badgeColor = 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
    if (iconName === 'file') {
      badgeColor = 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    } else if (iconName === 'user') {
      badgeColor = 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    } else if (iconName === 'database') {
      badgeColor = 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800';
    } else if (iconName === 'shield') {
      badgeColor = 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    } else if (iconName === 'building') {
      badgeColor = 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }

    const payload: UsefulLink = {
      id: editingItem ? editingItem.id : `link-${Date.now()}`,
      name: name.trim(),
      shortName: shortName.trim() || name.trim().slice(0, 10),
      subtitle: subtitle.trim() || 'Portal Resmi Terintegrasi',
      category: category.trim() || 'Portal Resmi',
      url: url.trim(),
      badge: badge.trim() || 'Resmi',
      badgeColor,
      description: description.trim() || 'Layanan akses portal informasi terpadu kesehatan dan administrasi.',
      iconName
    };

    if (editingItem) {
      updateUsefulLink(editingItem.id, payload);
      onSuccessToast(`Tautan bermanfaat "${payload.name}" berhasil diperbarui.`);
    } else {
      addUsefulLink(payload);
      onSuccessToast(`Tautan bermanfaat "${payload.name}" berhasil ditambahkan.`);
    }

    setModalOpen(false);
  };

  const handleDelete = (item: UsefulLink) => {
    if (window.confirm(`Yakin ingin menghapus tautan bermanfaat "${item.name}"?`)) {
      deleteUsefulLink(item.id);
      onSuccessToast(`Tautan "${item.name}" telah dihapus.`);
    }
  };

  const filteredLinks = usefulLinks.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    item.url.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  const getIconElement = (type?: string) => {
    switch (type) {
      case 'file':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'user':
        return <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'building':
        return <Building2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'link':
        return <LinkIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'globe':
      default:
        return <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-1.5 border border-sky-200 dark:border-sky-800">
            <Globe className="w-3.5 h-3.5" />
            <span>Manajemen Tautan</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Kelola Tautan Bermanfaat
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tambah, perbarui, atau hapus daftar link bermanfaat eksternal (e-TPP, SIMPEG, DARLINK, SISDMK, dll.) yang tampil di beranda website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition shrink-0 active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tautan Bermanfaat</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama link, instansi, atau URL..."
            className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-sky-500"
          />
          <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Total: <strong className="text-slate-900 dark:text-white">{usefulLinks.length}</strong> tautan
        </div>
      </div>

      {/* Links Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLinks.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-4.5 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-sky-400 dark:hover:border-sky-500 transition shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                    {getIconElement(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.shortName && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {item.shortName}
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                  {item.badge}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-sky-600 dark:text-sky-400 truncate bg-white/80 dark:bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 mb-3">
                <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.url}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition"
              >
                <span>Uji Tautan</span>
                <ExternalLink className="w-3 h-3" />
              </a>

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

        {filteredLinks.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-medium">Tidak ada tautan bermanfaat yang sesuai pencarian.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-700 shadow-2xl p-6 text-slate-900 dark:text-white space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h4 className="text-base font-bold flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-500" />
                <span>{editingItem ? 'Edit Tautan Bermanfaat' : 'Tambah Tautan Bermanfaat Baru'}</span>
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

            <form onSubmit={handleSave} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nama Tautan *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: e-TPP DKI Jakarta"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Singkatan / Inisial
                  </label>
                  <input
                    type="text"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    placeholder="Contoh: e-TPP"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Subjudul / Deskripsi Singkat
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Contoh: Tambahan Penghasilan Pegawai"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Badge / Lembaga
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Contoh: Pemprov DKI Jakarta"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Alamat URL Web Resmi *
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://etpp.jakarta.go.id/login"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Contoh: Kepegawaian & Kinerja"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Ikon Tampilan
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="globe">Globe (Web Portal Umum)</option>
                    <option value="file">Berkas / Spreadsheet (Kinerja & Kepegawaian)</option>
                    <option value="user">User Check (SIMPEG / Akun Pegawai)</option>
                    <option value="database">Database (Arsip & Rekam Medis)</option>
                    <option value="shield">Perisai (SISDMK / Kemenkes RI)</option>
                    <option value="building">Gedung (Instansi Pemerintah)</option>
                    <option value="link">Tautan Eksternal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Penjelasan Singkat Link
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ringkasan fungsi portal dan kegunaan bagi pegawai atau masyarakat..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

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
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tambahkan Tautan'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
