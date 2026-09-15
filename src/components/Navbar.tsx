import React, { useState } from 'react';
import { useData } from '../context/DataContext';
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
  Camera
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
        { id: 'wilayah', label: 'Puskesmas Induk Pulau Tidung', desc: 'Pusat faskes rujukan dengan rawat inap & IGD 24 jam', icon: Building },
        { id: 'wilayah', label: 'Jejaring Pustu Pulau', desc: 'Pustu Pulau Lancang, Pulau Pari, dan Pulau Untung Jawa', icon: MapPin },
      ]
    },
    { 
      id: 'pelayanan', 
      label: 'INFORMASI PELAYANAN',
      activeMatchTabs: ['pelayanan', 'ilp', 'dokumen-pelayanan'],
      subItems: [
        { id: 'dokumen-pelayanan', subTab: 'standar', label: 'Standar Pelayanan', desc: 'Standar operasional, syarat, tarif & alur pelayanan', icon: FileCheck, badge: 'PDF' },
        { id: 'dokumen-pelayanan', subTab: 'maklumat', label: 'Maklumat Pelayanan', desc: 'Pernyataan kesanggupan pelayanan prima resmi', icon: Scroll, badge: 'PDF' },
        { id: 'dokumen-pelayanan', subTab: 'hak-kewajiban', label: 'Hak dan Kewajiban Pasien', desc: '12 Hak Pasien & 4 Kewajiban Pasien Kemenkes RI', icon: ShieldAlert, badge: 'PDF' },
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
      activeMatchTabs: ['berita', 'edukasi'],
      subItems: [
        { id: 'berita', label: 'Warta & Berita Terkini', desc: 'Publikasi kegiatan resmi, prestasi & pengumuman', icon: Newspaper },
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
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
                <span className="font-extrabold tracking-tight text-slate-900 text-base sm:text-lg leading-tight uppercase group-hover:text-emerald-700 transition-colors">
                  Puskesmas Kepulauan Seribu Selatan
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium italic flex items-center gap-1 line-clamp-1 max-w-md">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline shrink-0" />
                <span>"{profile.motto}"</span>
              </p>
            </div>
          </button>

          {/* Desktop Search & Quick Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/90 hover:bg-sky-50 text-slate-600 hover:text-sky-700 text-xs font-medium border border-slate-200/90 transition shadow-2xs group"
              title="Pencarian Cepat Internal"
            >
              <Search className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
              <span>Cari Informasi...</span>
              <kbd className="bg-white border border-slate-300 text-[10px] text-slate-500 px-1.5 py-0.5 rounded font-mono shadow-2xs">
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
                <span>Admin Aktif</span>
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
        <nav className="hidden lg:flex items-center justify-between border-t border-slate-100 py-1">
          <div className="flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = item.activeMatchTabs.includes(activeTab);
              const hasSub = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.id} className="relative group">
                  {/* Top-Level Menu Button */}
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-sky-700 text-white shadow-xs'
                        : 'text-slate-700 hover:text-sky-700 hover:bg-sky-50/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSub && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 group-hover:rotate-180 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-700'
                      }`} />
                    )}
                  </button>

                  {/* Elegant Floating Dropdown Popover */}
                  {hasSub && (
                    <div className="absolute left-0 top-full pt-1.5 opacity-0 pointer-events-none translate-y-1.5 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-200 z-50">
                      <div className="w-72 sm:w-80 bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-2xl p-2 space-y-1 ring-1 ring-black/5">
                        <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100 mb-1 flex items-center justify-between">
                          <span>{item.label}</span>
                          <span className="text-sky-600 font-normal lowercase">navigasi cepat</span>
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
                              className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition group/sub ${
                                isSubActive
                                  ? 'bg-sky-50 text-sky-900 border border-sky-200/80'
                                  : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSubActive 
                                  ? 'bg-sky-600 text-white' 
                                  : 'bg-slate-100 text-slate-600 group-hover/sub:bg-sky-100 group-hover/sub:text-sky-700'
                              }`}>
                                <SubIcon className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-slate-900 group-hover/sub:text-sky-700 transition-colors">
                                    {sub.label}
                                  </span>
                                  {sub.badge && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-700">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
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

          <div className="text-[11px] text-slate-500 font-medium hidden xl:flex items-center gap-1.5 pl-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Kecamatan Kepulauan Seribu Selatan Sehat</span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu (Simpel & Rapi) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              <Search className="w-4 h-4 text-sky-600" />
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
              className="w-full mb-4 flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition border bg-amber-50 text-amber-900 border-amber-300"
            >
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Dashboard Admin (Sesi Aktif)</span>
            </button>
          )}

          <div className="space-y-1 divide-y divide-slate-100">
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
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <div className="w-2 h-2 rounded-full bg-sky-600" />}
                    </button>

                    {hasSub && (
                      <button
                        onClick={() => toggleMobileAccordion(item.label)}
                        className="p-2 text-slate-400 hover:text-slate-700"
                        aria-label={`Toggle sub-menu ${item.label}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Sub-menu inside Mobile Accordion */}
                  {hasSub && isAccordionOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 rounded-xl my-1 border border-slate-100">
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
                                : 'text-slate-600 hover:bg-white'
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
