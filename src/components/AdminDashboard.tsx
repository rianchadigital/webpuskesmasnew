import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, 
  Settings, 
  Building2, 
  Stethoscope, 
  Layers, 
  Newspaper, 
  Calendar, 
  Anchor, 
  FileText, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  X,
  Lock,
  LogOut,
  Sliders,
  Database,
  ArrowLeft,
  DownloadCloud,
  Eye,
  Sparkles,
  KeyRound,
  Menu
} from 'lucide-react';

import { AdminProfileTab } from './admin/AdminProfileTab';
import { AdminMenuTab } from './admin/AdminMenuTab';
import { AdminServicesTab } from './admin/AdminServicesTab';
import { AdminIlpTab } from './admin/AdminIlpTab';
import { AdminSchedulesTab } from './admin/AdminSchedulesTab';
import { AdminNewsAgendaTab } from './admin/AdminNewsAgendaTab';
import { AdminIslandsTab } from './admin/AdminIslandsTab';
import { AdminDocsFaqTab } from './admin/AdminDocsFaqTab';
import { AdminDatabaseTab } from './AdminDatabaseTab';

type AdminTabKey = 
  | 'profile' 
  | 'menu' 
  | 'services' 
  | 'ilp' 
  | 'schedules' 
  | 'news' 
  | 'agenda' 
  | 'islands' 
  | 'documents' 
  | 'faqs' 
  | 'database';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    exportDataJSON,
    resetToDefaults,
    navigateToTab
  } = useData();

  const [adminTab, setAdminTab] = useState<AdminTabKey>('profile');
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const triggerToast = (msg: string) => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(null), 3500);
  };

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = passwordInput.trim().toLowerCase();
    
    // Accept standard demo passwords, or if empty and submitted via direct button
    const validPasswords = ['admin123', 'admin', 'puskesmas', '123456', 'adminpuskesmas', 'kepulauanseribu'];
    
    if (validPasswords.includes(trimmed) || trimmed === '') {
      setIsAdminAuthenticated(true);
      setAuthError(false);
      triggerToast('Selamat datang! Login Administrator berhasil diverifikasi.');
    } else {
      setAuthError(true);
    }
  };

  const handleInstantLogin = () => {
    setIsAdminAuthenticated(true);
    setAuthError(false);
    triggerToast('Berhasil masuk menggunakan Akses Cepat Pengelola!');
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setPasswordInput('');
    triggerToast('Anda telah keluar dari sesi administrator.');
  };

  // ==================== LOGIN SCREEN IF NOT AUTHENTICATED ====================
  if (!isAdminAuthenticated) {
    return (
      <div className="py-20 bg-slate-900 min-h-[75vh] flex items-center justify-center px-4">
        <div className="bg-slate-800/95 border border-slate-700/80 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-white text-center backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold tracking-tight">Portal Pengelola Website</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Masuk untuk memperbarui profil puskesmas, jadwal pelayanan, berita, agenda kegiatan, serta struktur menu.
            </p>
          </div>

          {/* Quick 1-Click Access Button (Zero Friction for Demo / User) */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Akses Cepat Pengelola</span>
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">1-Klik Masuk</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Langsung masuk ke dashboard tanpa perlu mengetik kata sandi secara manual:
            </p>
            <button
              type="button"
              onClick={handleInstantLogin}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition active:scale-98 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-yellow-300" />
              <span>Masuk Langsung Sebagai Admin</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-700 w-full"></div>
            <span className="bg-slate-800 px-3 text-[11px] text-slate-500 font-medium absolute">atau via sandi</span>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">Kata Sandi Administrator</label>
                <button
                  type="button"
                  onClick={() => setPasswordInput('admin123')}
                  className="text-[11px] text-sky-400 hover:text-sky-300 underline font-medium"
                >
                  Isi Sandi: admin123
                </button>
              </div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setAuthError(false); }}
                placeholder="Ketik kata sandi (default: admin123)..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-sky-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Kata sandi bawaan sistem: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-sky-300">admin123</code>
              </p>
            </div>

            {authError && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-xs text-rose-300 font-medium">
                Kata sandi tidak sesuai. Gunakan sandi <strong>admin123</strong> atau klik tombol <strong>"Masuk Langsung Sebagai Admin"</strong> di atas.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition"
            >
              Verifikasi & Masuk
            </button>

            <button
              type="button"
              onClick={() => navigateToTab('beranda')}
              className="w-full py-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Utama Website</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ==================== DASHBOARD WHEN AUTHENTICATED ====================
  const navTabs: { id: AdminTabKey; label: string; icon: any; count?: number; highlight?: boolean }[] = [
    { id: 'profile', label: 'Profil & Sambutan', icon: Building2 },
    { id: 'menu', label: 'Menu & Tampilan', icon: Sliders, highlight: true },
    { id: 'services', label: 'Layanan & Poli', icon: Stethoscope },
    { id: 'ilp', label: 'Klaster ILP', icon: Layers },
    { id: 'schedules', label: 'Jadwal Dokter', icon: Calendar },
    { id: 'news', label: 'Warta Berita', icon: Newspaper },
    { id: 'agenda', label: 'Agenda Kegiatan', icon: Calendar },
    { id: 'islands', label: 'Wilayah 5 Pustu', icon: Anchor },
    { id: 'documents', label: 'Dokumen SOP', icon: FileText },
    { id: 'faqs', label: 'Tanya Jawab FAQ', icon: HelpCircle },
    { id: 'database', label: 'Database GAS & Deploy Hostinger', icon: Database, highlight: true },
  ];

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Global Toast Alert */}
        {saveAlert && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{saveAlert}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-sky-600/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-slate-900">
                  Panel Pengelolaan Website Puskesmas
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Administrator Aktif
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Puskesmas Kecamatan Kepulauan Seribu Selatan • Pemprov DKI Jakarta
              </p>
            </div>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => navigateToTab('beranda')}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
              title="Lihat Tampilan Website Publik"
            >
              <Eye className="w-4 h-4 text-sky-600" />
              <span>Lihat Web</span>
            </button>

            <button
              onClick={exportDataJSON}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
              title="Download File Cadangan Data JSON"
            >
              <DownloadCloud className="w-4 h-4 text-emerald-600" />
              <span>Ekspor JSON</span>
            </button>

            <button
              onClick={resetToDefaults}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 transition"
              title="Kembalikan data ke kondisi awal"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Reset Default</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
              title="Keluar dari sesi Admin"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : tab.highlight
                      ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 md:p-8">
          {adminTab === 'profile' && (
            <AdminProfileTab onSuccessToast={triggerToast} />
          )}

          {adminTab === 'menu' && (
            <AdminMenuTab onSuccessToast={triggerToast} />
          )}

          {adminTab === 'services' && (
            <AdminServicesTab onSuccessToast={triggerToast} />
          )}

          {adminTab === 'ilp' && (
            <AdminIlpTab onSuccessToast={triggerToast} />
          )}

          {adminTab === 'schedules' && (
            <AdminSchedulesTab onSuccessToast={triggerToast} />
          )}

          {adminTab === 'news' && (
            <AdminNewsAgendaTab mode="news" onSuccessToast={triggerToast} />
          )}

          {adminTab === 'agenda' && (
            <AdminNewsAgendaTab mode="agenda" onSuccessToast={triggerToast} />
          )}

          {adminTab === 'islands' && (
            <AdminIslandsTab onSuccessToast={triggerToast} />
          )}

          {adminTab === 'documents' && (
            <AdminDocsFaqTab mode="documents" onSuccessToast={triggerToast} />
          )}

          {adminTab === 'faqs' && (
            <AdminDocsFaqTab mode="faqs" onSuccessToast={triggerToast} />
          )}

          {adminTab === 'database' && (
            <AdminDatabaseTab />
          )}
        </div>

      </div>
    </div>
  );
};
