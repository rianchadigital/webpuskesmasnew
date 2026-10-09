import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { TabType } from '../types';
import { HealthLogo } from './HealthLogo';
import { 
  Menu, 
  X, 
  Search, 
  Heart, 
  Anchor, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  Settings,
  Sparkles,
  ChevronDown,
  Building2,
  Award,
  GitBranch,
  Building,
  MapPin,
  Stethoscope,
  Layers,
  GitFork,
  Calendar,
  Newspaper,
  BookOpen,
  DownloadCloud,
  Users,
  BarChart3,
  MessageSquare,
  HelpCircle,
  UserCheck,
  FileCheck,
  Scroll,
  ShieldAlert,
  Lock,
  Activity,
  Camera,
  Megaphone,
  Sun,
  Moon
} from 'lucide-react';

interface SubMenuItem {
  id: TabType;
  subTab?: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavMenuItem {
  id: TabType;
  label: string;
  activeMatchTabs: TabType[];
  subItems?: SubMenuItem[];
}

export const Navbar: React.FC = () => {
  const { activeTab, navigateToTab, setIsSearchOpen, profile, openServiceDoc, isAdminAuthenticated } = useData();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  const menuItems: NavMenuItem[] = [
    { 
      id: 'beranda', 
      label: 'BERANDA',
      activeMatchTabs: ['beranda']
    },
    { 
      id: 'profil', 
      label: 'PROFIL',
      activeMatchTabs: ['profil', 'sambutan'],
      subItems: [
        { id: 'profil', subTab: 'sambutan', label: 'Sambutan Kepala Puskesmas', desc: 'Pesan resmi pimpinan, foto resmi & komitmen mutu faskes', icon: UserCheck, badge: 'Foto Resmi' },
        { id: 'profil', subTab: 'visimisi', label: 'Visi, Misi & Tata Nilai PRIMA', desc: '6 Misi pelayanan & budaya kerja PRIMA kepulauan sehat', icon: Award },
        { id: 'profil', subTab: 'struktur', label: 'Bagan Struktur Organisasi', desc: 'Struktur kelembagaan & koordinasi klaster ILP 2026', icon: GitBranch },
        { id: 'profil', subTab: 'profil', label: 'Profil & Fasilitas Faskes', desc: 'Gambaran umum faskes terintegrasi darat & maritim', icon: Building2 },
      ]
    },
    { 
      id: 'wilayah', 
      label: 'WILAYAH KERJA',
      activeMatchTabs: ['wilayah'],
      subItems: [
        { id: 'wilayah', label: 'Puskesmas Kepulauan Seribu Selatan', desc: 'Pusat faskes rujukan dengan rawat inap & IGD 24 jam', icon: Building },
        { id: 'wilayah', label: 'Jejaring Pustu Pulau', desc: 'Pustu Pulau Lancang, Pulau Pari, dan Pulau Untung Jawa', icon: MapPin },
      ]
    },
    { 
      id: 'pelayanan', 
      label: 'INFORMASI PELAYANAN',
      activeMatchTabs: ['pelayanan', 'ilp', 'dokumen-pelayanan'],
      subItems: [
        { id: 'dokumen-pelayanan', subTab: 'standar', label: 'Standar Pelayanan', desc: 'Standar operasional, syarat, tarif & alur pelayanan (View PDF Drive)', icon: FileCheck, badge: 'PDF Drive' },
        { id: 'dokumen-pelayanan', subTab: 'maklumat', label: 'Maklumat Pelayanan', desc: 'Pernyataan kesanggupan pelayanan prima resmi (View PDF Drive)', icon: Scroll, badge: 'PDF Drive' },
        { id: 'dokumen-pelayanan', subTab: 'hak-kewajiban', label: 'Hak dan Kewajiban Pasien', desc: '12 Hak Pasien & 4 Kewajiban Pasien Kemenkes (View PDF Drive)', icon: ShieldAlert, badge: 'PDF Drive' },
        { id: 'dokumen-pelayanan', subTab: 'struktur-ilp', label: 'Struktur Organisasi ILP', desc: 'Struktur organisasi 5 Klaster ILP Kepmenkes 2026 (View PDF Drive)', icon: GitBranch, badge: 'PDF Drive' },
        { id: 'pelayanan', label: 'Layanan Poliklinik & Medis', desc: 'Pemeriksaan umum, KIA/KB, gigi, farmasi & lab', icon: Stethoscope },
        { id: 'ilp', label: 'Integrasi Layanan Primer (ILP)', desc: 'Transformasi 5 klaster siklus hidup Kemenkes RI', icon: Layers, badge: 'ILP' },
        { id: 'pelayanan', label: 'Alur Pelayanan Pasien', desc: 'Standar operasional pendaftaran, rawat & rujukan', icon: GitFork },
      ]
    },
    { 
      id: 'jadwal', 
      label: 'JADWAL & AGENDA',
      activeMatchTabs: ['jadwal', 'agenda'],
      subItems: [
        { id: 'jadwal', label: 'Jadwal Pelayanan & Dokter', desc: 'Jadwal dokter, nakes jaga, dan jam kerja faskes', icon: Clock },
        { id: 'agenda', label: 'Kalender Agenda & Posyandu', desc: 'Agenda posyandu siklus hidup & kegiatan faskes', icon: Calendar },
      ]
    },
    { 
      id: 'berita', 
      label: 'BERITA',
      activeMatchTabs: ['berita', 'pengumuman', 'edukasi', 'dokumentasi'],
      subItems: [
        { id: 'berita', label: 'Warta & Berita Terkini', desc: 'Publikasi kegiatan resmi, prestasi & warta kesehatan', icon: Newspaper },
        { id: 'pengumuman', label: 'Pengumuman', desc: 'Informasi pengumuman rekrutmen nakes & info dadakan/mendesak', icon: Megaphone, badge: 'Rekrutmen' },
        { id: 'dokumentasi', label: 'Dokumentasi Kegiatan (Drive)', desc: 'Galeri album foto Google Drive & popup slider kegiatan', icon: Camera, badge: 'Drive' },
        { id: 'edukasi', label: 'Informasi & Edukasi Kesehatan', desc: 'Panduan PHBS, pencegahan penyakit & gizi pesisir', icon: BookOpen, badge: 'Promkes' },
      ]
    },
    { 
      id: 'data', 
      label: 'DATA',
      activeMatchTabs: ['data', 'data-kesehatan', 'dokumentasi', 'unduhan', 'sdm'],
      subItems: [
        { id: 'data-kesehatan', label: 'Data Kesehatan & Grafik', desc: '10 penyakit terbanyak & kunjungan rawat jalan per faskes', icon: Activity, badge: 'Grafik' },
        { id: 'dokumentasi', label: 'Dokumentasi Kegiatan', desc: 'Album galeri foto & dokumentasi pelayanan kepulauan', icon: Camera, badge: 'Galeri' },
        { id: 'unduhan', label: 'Pusat Unduhan Dokumen SOP', desc: 'Formulir pelayanan, brosur informasi & regulasi', icon: DownloadCloud },
        { id: 'sdm', label: 'Data SDM & Ketenagaan', desc: 'Profil 64+ dokter, bidan, perawat & penunjang', icon: Users, badge: '64 Nakes' },
        { id: 'data', label: 'Statistik & Indikator Mutu', desc: 'Data capaian layanan, faskes & kepuasan publik', icon: BarChart3 },
      ]
    },
    { 
      id: 'kontak', 
      label: 'KONTAK',
      activeMatchTabs: ['kontak', 'faq'],
      subItems: [
        { id: 'kontak', label: 'Lokasi Faskes & Kontak Resmi', desc: 'Alamat fasilitas, telepon resmi & formulir pengaduan', icon: PhoneCall },
        { id: 'faq', label: 'Bantuan & FAQ Pelayanan', desc: 'Pertanyaan seputar BPJS, jadwal & persyaratan', icon: HelpCircle },
      ]
    },
  ];

  const handleNavClick = (tab: TabType, targetId?: string) => {
    if (tab === 'dokumen-pelayanan' && targetId) {
      openServiceDoc(targetId as any);
    }
    navigateToTab(tab, targetId);
    setMobileMenuOpen(false);
  };

  const toggleMobileAccordion = (label: string) => {
    setOpenMobileAccordion(openMobileAccordion === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity with Official Health Logo */}
          <button 
            onClick={() => handleNavClick('beranda')}
            onDoubleClick={(e) => {
              e.preventDefault();
              handleNavClick('admin');
            }}
            className="flex items-center gap-3.5 text-left group focus:outline-hidden cursor-pointer"
            title="Puskesmas Kepulauan Seribu Selatan"
          >
            {/* Official Indonesian Health / Puskesmas Logo */}
            <HealthLogo size="md" />

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-slate-900 dark:text-white text-base sm:text-lg leading-tight uppercase group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Puskesmas Kepulauan Seribu Selatan
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium italic flex items-center gap-1 line-clamp-1 max-w-md">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline shrink-0" />
                <span>"{profile.motto}"</span>
              </p>
            </div>
          </button>

          {/* Desktop Search & Quick Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Social Media Link Buttons (Facebook & Instagram Puskesmas Kepulauan Seribu Selatan) */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-100/80 border border-slate-200/80">
              <a
                href={profile.facebook || "https://www.facebook.com/puskesmas.kepulauanseribuselatan"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-200 shadow-2xs group relative cursor-pointer"
                title="Facebook: Puskesmas Kepulauan Seribu Selatan"
                aria-label="Facebook Puskesmas Kepulauan Seribu Selatan"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href={profile.instagram ? (profile.instagram.startsWith('http') ? profile.instagram : `https://instagram.com/${profile.instagram.replace('@', '')}`) : "https://instagram.com/puskesmaskepulauanseribuselatan"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-pink-600 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-600 hover:to-purple-600 transition-all duration-200 shadow-2xs group relative cursor-pointer"
                title="Instagram: Puskesmas Kepulauan Seribu Selatan"
                aria-label="Instagram Puskesmas Kepulauan Seribu Selatan"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            {/* Premium Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border ${
                theme === 'dark'
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 hover:bg-amber-400/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-2xs'
              }`}
              title={theme === 'dark' ? 'Beralih ke Mode Terang (Siang)' : 'Beralih ke Mode Gelap (Malam)'}
              aria-label="Toggle Mode Tampilan"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
                  <span className="text-[11px] font-bold hidden xl:inline">Siang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="text-[11px] font-bold hidden xl:inline">Malam</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/90 hover:bg-sky-50 text-slate-600 hover:text-sky-700 text-xs font-medium border border-slate-200/90 transition shadow-2xs group"
              title="Pencarian Cepat Internal"
            >
              <Search className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
              <span>Cari...</span>
              <kbd className="bg-white border border-slate-300 text-[10px] text-slate-500 px-1 py-0.5 rounded font-mono shadow-2xs">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => handleNavClick('ilp')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xs hover:shadow-md hover:from-emerald-500 hover:to-teal-500 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Portal ILP</span>
            </button>

            {isAdminAuthenticated && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                  activeTab === 'admin'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border-amber-300'
                }`}
                title="Panel Pengelolaan Konten Website"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-sky-700"
              aria-label="Cari Informasi"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Desktop Horizontal Navigation Bar (Simpel, Terpadu & Elegan) */}
        <nav className="hidden lg:flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 py-1.5">
          <div className="flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = item.activeMatchTabs.includes(activeTab);
              const hasSub = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.id} className="relative group">
                  {/* Top-Level Menu Button (Premium Styled) */}
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-sky-600/30'
                        : 'text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-sky-50/80 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSub && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 group-hover:rotate-180 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-700 dark:group-hover:text-sky-300'
                      }`} />
                    )}
                  </button>

                  {/* Elegant Floating Dropdown Popover */}
                  {hasSub && (
                    <div className="absolute left-0 top-full pt-1.5 opacity-0 pointer-events-none translate-y-1.5 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-200 z-50">
                      <div className="w-72 sm:w-80 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-2 space-y-1 ring-1 ring-black/5">
                        <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center justify-between">
                          <span>{item.label}</span>
                          <span className="text-sky-600 dark:text-sky-400 font-normal lowercase">navigasi cepat</span>
                        </div>

                        {item.subItems!.map((sub) => {
                          const SubIcon = sub.icon;
                          const isSubActive = activeTab === sub.id;

                          return (
                            <button
                              key={sub.label}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavClick(sub.id, sub.subTab);
                              }}
                              className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition duration-150 group/sub cursor-pointer ${
                                isSubActive
                                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-900 dark:text-sky-200 border border-sky-200/80 dark:border-sky-800/80'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSubActive 
                                  ? 'bg-sky-600 text-white' 
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover/sub:bg-sky-100 dark:group-hover/sub:bg-sky-900/60 group-hover/sub:text-sky-700 dark:group-hover/sub:text-sky-300'
                              }`}>
                                <SubIcon className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover/sub:text-sky-700 dark:group-hover/sub:text-sky-300 transition-colors">
                                    {sub.label}
                                  </span>
                                  {sub.badge && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700/50">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                  {sub.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden xl:flex items-center gap-2 pl-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Kecamatan Kepulauan Seribu Selatan Sehat</span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu (Simpel, Terpadu & Rapi) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Top Actions: Search, ILP, Theme, & Social */}
          <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            {/* Dark Mode Button in Mobile */}
            <button
              onClick={toggleTheme}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition border ${
                theme === 'dark'
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span>{theme === 'dark' ? 'Mode Siang' : 'Mode Malam'}</span>
            </button>

            {/* Social Links in Mobile */}
            <div className="flex items-center gap-2">
              <a
                href={profile.facebook || "https://www.facebook.com/puskesmas.kepulauanseribuselatan"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900"
                title="Facebook Puskesmas Kepulauan Seribu Selatan"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href={profile.instagram ? (profile.instagram.startsWith('http') ? profile.instagram : `https://instagram.com/${profile.instagram.replace('@', '')}`) : "https://instagram.com/puskesmaskepulauanseribuselatan"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-900"
                title="Instagram Puskesmas Kepulauan Seribu Selatan"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold"
            >
              <Search className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Cari Informasi</span>
            </button>
            <button
              onClick={() => handleNavClick('ilp')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              <Layers className="w-4 h-4" />
              <span>Integrasi ILP</span>
            </button>
          </div>

          {isAdminAuthenticated && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full mb-4 flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition border bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700"
            >
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Dashboard Admin (Sesi Aktif)</span>
            </button>
          )}

          <div className="space-y-1 divide-y divide-slate-100 dark:divide-slate-800">
            {menuItems.map((item) => {
              const isActive = item.activeMatchTabs.includes(activeTab);
              const hasSub = item.subItems && item.subItems.length > 0;
              const isAccordionOpen = openMobileAccordion === item.label;

              return (
                <div key={item.id} className="pt-1.5">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`flex-1 flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold transition ${
                        isActive
                          ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <div className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400" />}
                    </button>

                    {hasSub && (
                      <button
                        onClick={() => toggleMobileAccordion(item.label)}
                        className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        aria-label={`Toggle sub-menu ${item.label}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Sub-menu inside Mobile Accordion */}
                  {hasSub && isAccordionOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-slate-800/60 rounded-xl my-1 border border-slate-100 dark:border-slate-800">
                      {item.subItems!.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === sub.id;

                        return (
                          <button
                            key={sub.label}
                            onClick={() => handleNavClick(sub.id, sub.subTab)}
                            className={`w-full flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-xs transition text-left ${
                              isSubActive
                                ? 'bg-sky-600 text-white font-bold'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                            }`}
                          >
                            <SubIcon className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
