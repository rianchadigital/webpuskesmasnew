import React from 'react';
import { 
  ExternalLink, 
  Globe, 
  Lock, 
  Sparkles, 
  FileSpreadsheet, 
  UserCheck, 
  Database, 
  Building2,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

interface UsefulLink {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  url: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  hoverGlow: string;
  category: string;
}

export const UsefulLinksSection: React.FC = () => {
  const links: UsefulLink[] = [
    {
      id: 'etpp',
      name: 'e-TPP DKI Jakarta',
      shortName: 'e-TPP',
      subtitle: 'Tambahan Penghasilan Pegawai',
      description: 'Sistem pelaporan kinerja, kehadiran harian & realisasi pembayaran tunjangan ASN Pemprov DKI Jakarta.',
      url: 'https://etpp.jakarta.go.id/login',
      badge: 'Pemprov DKI Jakarta',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      icon: <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      borderColor: 'border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-400 dark:hover:border-emerald-500',
      hoverGlow: 'hover:shadow-emerald-500/10',
      category: 'Kepegawaian & Kinerja'
    },
    {
      id: 'simpeg',
      name: 'SIMPEG DKI Jakarta',
      shortName: 'SIMPEG',
      subtitle: 'Sistem Manajemen Kepegawaian',
      description: 'Portal terpadu layanan administrasi berkas ASN, profil jabatan, SK, dan mutasi Badan Kepegawaian Daerah.',
      url: 'https://pegawai.jakarta.go.id/login',
      badge: 'BKD DKI Jakarta',
      badgeColor: 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      icon: <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      gradient: 'from-blue-500/10 via-sky-500/5 to-transparent',
      borderColor: 'border-blue-200 dark:border-blue-800/80 hover:border-blue-400 dark:hover:border-blue-500',
      hoverGlow: 'hover:shadow-blue-500/10',
      category: 'Administrasi ASN'
    },
    {
      id: 'darlink',
      name: 'DARLINK Seribu Selatan',
      shortName: 'DARLINK',
      subtitle: 'Data Arsip & Rekam Layanan Interaktif',
      description: 'Sistem operasional terpadu internal faskes untuk monitoring arsip, rekam data, dan layanan kepulauan.',
      url: 'https://darlink.puskesmasseribuselatan.com',
      badge: 'Internal Puskesmas',
      badgeColor: 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
      icon: <Database className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      gradient: 'from-teal-500/10 via-cyan-500/5 to-transparent',
      borderColor: 'border-teal-200 dark:border-teal-800/80 hover:border-teal-400 dark:hover:border-teal-500',
      hoverGlow: 'hover:shadow-teal-500/10',
      category: 'Sistem Manajemen Faskes'
    },
    {
      id: 'sisdmk',
      name: 'SISDMK Kemenkes RI',
      shortName: 'SISDMK',
      subtitle: 'Sistem Informasi SDM Kesehatan',
      description: 'Basis data nasional tenaga medis, dokter, bidan, perawat, verifikasi STR, dan perencanaan nakes Kemenkes.',
      url: 'https://sisdmk.kemkes.go.id/login',
      badge: 'Kementerian Kesehatan RI',
      badgeColor: 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
      borderColor: 'border-indigo-200 dark:border-indigo-800/80 hover:border-indigo-400 dark:hover:border-indigo-500',
      hoverGlow: 'hover:shadow-indigo-500/10',
      category: 'SDM Kesehatan Nasional'
    }
  ];

  return (
    <section id="tautan-bermanfaat" className="py-12 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-2 border border-sky-200 dark:border-sky-800">
              <Globe className="w-3.5 h-3.5" />
              <span>Portal Terintegrasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tautan Bermanfaat
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1 max-w-2xl">
              Akses cepat portal resmi kepegawaian Pemprov DKI Jakarta, sistem data internal puskesmas, dan pendataan SDM kesehatan Kemenkes RI.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tautan Resmi & Terverifikasi</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-3xl p-5 bg-white dark:bg-slate-900 border ${link.borderColor} shadow-sm hover:shadow-xl ${link.hoverGlow} transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden`}
              title={`Buka ${link.name}`}
            >
              {/* Subtle Ambient Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div>
                {/* Thumbnail Icon & Institution Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                    {link.icon}
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border shadow-2xs ${link.badgeColor}`}>
                    {link.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {link.name}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {link.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300/90 leading-relaxed mb-4">
                  {link.description}
                </p>
              </div>

              {/* Bottom URL Pill & Direct Action Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400 inline shrink-0" />
                  {link.url.replace('https://', '')}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 shrink-0">
                  <span>Masuk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
