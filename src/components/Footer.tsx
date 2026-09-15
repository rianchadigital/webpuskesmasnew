import React from 'react';
import { useData } from '../context/DataContext';
import { HealthLogo } from './HealthLogo';
import { 
  Anchor, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart, 
  ShieldCheck, 
  MessageCircle, 
  ExternalLink,
  ChevronRight,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, navigateToTab, isAdminAuthenticated } = useData();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <HealthLogo size="md" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Pemerintah Provinsi DKI Jakarta</span>
                <h3 className="font-extrabold text-base text-white leading-tight">Puskesmas Kepulauan Seribu Selatan</h3>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Pusat pelayanan kesehatan masyarakat terdepan di wilayah Kepulauan Seribu Selatan dengan penerapan Integrasi Layanan Primer (ILP) berbasis siklus hidup dan kesiapsiagaan maritim 24 jam.
            </p>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center gap-2 text-teal-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Terakreditasi Paripurna Kemenkes RI</span>
              </div>
              <p className="text-[11px] text-slate-500 italic">Motto: "{profile.motto}"</p>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Menu Utama
            </h4>
            <ul className="space-y-2 font-medium">
              {[
                { id: 'beranda', label: 'Beranda' },
                { id: 'profil', label: 'Profil & Visi Misi' },
                { id: 'wilayah', label: 'Wilayah Kerja (5 Pulau)' },
                { id: 'pelayanan', label: 'Informasi Pelayanan & ILP' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigateToTab(link.id as any)}
                    className="hover:text-sky-400 transition flex items-center gap-1.5 text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-sky-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi Publik & Layanan */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Layanan & Publikasi
            </h4>
            <ul className="space-y-2 font-medium">
              {[
                { id: 'jadwal', label: 'Jadwal & Agenda Kegiatan' },
                { id: 'berita', label: 'Berita & Edukasi Kesehatan' },
                { id: 'data', label: 'Data, Unduhan & Profil SDM' },
                { id: 'kontak', label: 'Kontak & Ambulans Laut 24 Jam' },
                { id: 'faq', label: 'Bantuan & FAQ Pelayanan' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigateToTab(link.id as any)}
                    className="hover:text-teal-400 transition flex items-center gap-1.5 text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-teal-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak & Unit Pustu */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Kantor & Kontak
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{profile.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                <span>Poli: {profile.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-emerald-400 font-semibold">{profile.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-sky-400 shrink-0" />
                <a 
                  href="https://puskesmasseribuselatan.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-2"
                >
                  puskesmasseribuselatan.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <p 
              className="select-none cursor-default"
              onDoubleClick={() => navigateToTab('admin')}
              title="Hak Cipta Dilindungi Undang-Undang"
            >
              © {new Date().getFullYear()} Puskesmas Kepulauan Seribu Selatan. Hak Cipta Dilindungi Undang-Undang.
            </p>
            {isAdminAuthenticated && (
              <button
                onClick={() => navigateToTab('admin')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 hover:border-slate-700 transition text-[11px] font-medium"
                title="Sesi Pengelola Website Aktif"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Dashboard Admin (Aktif)</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>Dinas Kesehatan Provinsi DKI Jakarta</span>
            <span>•</span>
            <span>Kementerian Kesehatan Republik Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
