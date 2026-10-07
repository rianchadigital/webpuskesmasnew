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
                { id: 'kontak', label: 'Kontak & Layanan Rujukan 24 Jam' },
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

              {/* Official Social Media Links */}
              <div className="pt-2 border-t border-slate-900 flex items-center gap-2">
                <a
                  href={profile.facebook || "https://www.facebook.com/puskesmas.kepulauanseribuselatan"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition"
                  title="Facebook Resmi: Puskesmas Kepulauan Seribu Selatan"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  href={profile.instagram ? (profile.instagram.startsWith('http') ? profile.instagram : `https://instagram.com/${profile.instagram.replace('@', '')}`) : "https://instagram.com/puskesmaskepulauanseribuselatan"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600/20 hover:bg-gradient-to-r hover:from-amber-500 hover:to-pink-600 text-pink-300 hover:text-white border border-pink-500/30 text-xs font-semibold transition"
                  title="Instagram Resmi: Puskesmas Kepulauan Seribu Selatan"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
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
