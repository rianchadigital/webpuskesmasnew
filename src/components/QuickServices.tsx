import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Stethoscope, 
  CalendarDays, 
  Pill, 
  UserCheck, 
  Megaphone, 
  MapPin, 
  PhoneCall, 
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';

export const QuickServices: React.FC = () => {
  const { navigateToTab } = useData();

  const services = [
    {
      id: 'pelayanan',
      title: 'Pelayanan Kesehatan',
      subtitle: 'Poli Dalam & Luar Gedung',
      icon: Stethoscope,
      color: 'from-blue-500 to-sky-600',
      bgColor: 'bg-sky-50 text-sky-700 border-sky-100 hover:border-sky-300',
      action: () => navigateToTab('pelayanan')
    },
    {
      id: 'jadwal',
      title: 'Jadwal Pelayanan',
      subtitle: 'Hari & Waktu Buka',
      icon: CalendarDays,
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'bg-teal-50 text-teal-700 border-teal-100 hover:border-teal-300',
      action: () => navigateToTab('jadwal')
    },
    {
      id: 'obat',
      title: 'Informasi Obat',
      subtitle: 'Farmasi & Formularium',
      icon: Pill,
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:border-indigo-300',
      action: () => navigateToTab('pelayanan')
    },
    {
      id: 'nakes',
      title: 'Tenaga Kesehatan',
      subtitle: 'Dokter, Bidan & Perawat',
      icon: UserCheck,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300',
      action: () => navigateToTab('profil')
    },
    {
      id: 'pengumuman',
      title: 'Pengumuman',
      subtitle: 'Informasi Terkini',
      icon: Megaphone,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300',
      action: () => navigateToTab('berita')
    },
    {
      id: 'lokasi',
      title: 'Lokasi Puskesmas',
      subtitle: 'Pusat & Pustu 5 Pulau',
      icon: MapPin,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50 text-rose-700 border-rose-100 hover:border-rose-300',
      action: () => navigateToTab('wilayah')
    },
    {
      id: 'kontak',
      title: 'Kontak Darurat',
      subtitle: 'Call Center & Rujukan Medis',
      icon: PhoneCall,
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-50 text-red-700 border-red-100 hover:border-red-300',
      action: () => navigateToTab('kontak')
    },
    {
      id: 'faq',
      title: 'FAQ',
      subtitle: 'Pertanyaan Umum',
      icon: HelpCircle,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 text-purple-700 border-purple-100 hover:border-purple-300',
      action: () => navigateToTab('faq')
    }
  ];

  return (
    <section className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 border border-slate-200/90 dark:border-slate-800 transition-colors">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
              Layanan Cepat & Navigasi Terpadu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Akses instan menuju informasi pelayanan, jadwal dokter, lokasi pulau, dan kontak darurat.
            </p>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500 font-medium hidden md:block">
            Pilih menu untuk membuka detail layanan
          </div>
        </div>

        {/* 8 Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`group relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 flex flex-col justify-between cursor-pointer dark:bg-slate-800/60 dark:border-slate-700/60 dark:hover:border-sky-500 ${item.bgColor}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-snug truncate">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
