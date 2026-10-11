import React from 'react';
import { useData } from '../context/DataContext';
import { UsefulLink } from '../types';
import { 
  Globe, 
  Lock, 
  FileSpreadsheet, 
  UserCheck, 
  Database, 
  Building2, 
  ShieldCheck, 
  ArrowUpRight,
  Link as LinkIcon,
  Settings
} from 'lucide-react';

export const UsefulLinksSection: React.FC = () => {
  const { usefulLinks, isAdminAuthenticated, navigateToTab } = useData();

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'file':
        return <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'user':
        return <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'database':
        return <Database className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'building':
        return <Building2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'link':
        return <LinkIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case 'globe':
      default:
        return <Globe className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
    }
  };

  const getCardStyle = (iconName?: string) => {
    switch (iconName) {
      case 'file':
        return {
          gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
          borderColor: 'border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-400 dark:hover:border-emerald-500',
          hoverGlow: 'hover:shadow-emerald-500/10',
          badgeDefault: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
        };
      case 'user':
        return {
          gradient: 'from-blue-500/10 via-sky-500/5 to-transparent',
          borderColor: 'border-blue-200 dark:border-blue-800/80 hover:border-blue-400 dark:hover:border-blue-500',
          hoverGlow: 'hover:shadow-blue-500/10',
          badgeDefault: 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
        };
      case 'database':
        return {
          gradient: 'from-teal-500/10 via-cyan-500/5 to-transparent',
          borderColor: 'border-teal-200 dark:border-teal-800/80 hover:border-teal-400 dark:hover:border-teal-500',
          hoverGlow: 'hover:shadow-teal-500/10',
          badgeDefault: 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
        };
      case 'shield':
        return {
          gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
          borderColor: 'border-indigo-200 dark:border-indigo-800/80 hover:border-indigo-400 dark:hover:border-indigo-500',
          hoverGlow: 'hover:shadow-indigo-500/10',
          badgeDefault: 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
        };
      case 'building':
        return {
          gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
          borderColor: 'border-amber-200 dark:border-amber-800/80 hover:border-amber-400 dark:hover:border-amber-500',
          hoverGlow: 'hover:shadow-amber-500/10',
          badgeDefault: 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
        };
      default:
        return {
          gradient: 'from-sky-500/10 via-cyan-500/5 to-transparent',
          borderColor: 'border-sky-200 dark:border-sky-800/80 hover:border-sky-400 dark:hover:border-sky-500',
          hoverGlow: 'hover:shadow-sky-500/10',
          badgeDefault: 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
        };
    }
  };

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

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tautan Resmi & Terverifikasi</span>
            </div>

            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={() => navigateToTab('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-sky-100 dark:hover:bg-sky-950 text-xs font-bold transition border border-slate-300 dark:border-slate-700"
              >
                <Settings className="w-3.5 h-3.5 text-sky-500" />
                <span>Kelola Tautan</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {usefulLinks.map((link) => {
            const style = getCardStyle(link.iconName);
            const badgeColor = link.badgeColor || style.badgeDefault;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative rounded-3xl p-5 bg-white dark:bg-slate-900 border ${style.borderColor} shadow-sm hover:shadow-xl ${style.hoverGlow} transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden`}
                title={`Buka ${link.name}`}
              >
                {/* Subtle Ambient Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div>
                  {/* Thumbnail Icon & Institution Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-13 h-13 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                      {getIcon(link.iconName)}
                    </div>

                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border shadow-2xs ${badgeColor}`}>
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
                    {link.url.replace(/^https?:\/\//, '')}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 shrink-0">
                    <span>Masuk</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            );
          })}

          {usefulLinks.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <Globe className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Belum ada daftar tautan bermanfaat.</p>
              {isAdminAuthenticated && (
                <button
                  type="button"
                  onClick={() => navigateToTab('admin')}
                  className="mt-3 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  Buka Admin untuk menambahkan tautan baru &rarr;
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
