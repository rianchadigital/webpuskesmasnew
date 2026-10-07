import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  MessageCircle, 
  PhoneCall, 
  Ship, 
  MapPin, 
  ChevronUp, 
  Search, 
  X, 
  LifeBuoy, 
  ShieldAlert,
  Headphones
} from 'lucide-react';

export const FloatingActionHub: React.FC = () => {
  const { profile, setIsSearchOpen, navigateToTab } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke Atas"
          className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg backdrop-blur-xs transition transform hover:-translate-y-1"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="bg-white rounded-3xl p-3 shadow-2xl border border-slate-200/80 w-64 space-y-2 mb-1 animate-in zoom-in-90 slide-in-from-bottom-3 duration-200">
          <div className="p-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Akses Cepat Pelayanan
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sea Emergency Referral 24H */}
          <a
            href={`tel:${profile.seaAmbulanceHotline}`}
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 transition text-xs font-bold"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <Ship className="w-4 h-4" />
            </div>
            <div>
              <p className="leading-tight">Layanan Rujukan 24 Jam</p>
              <p className="text-[10px] text-rose-600 font-normal">Kedaruratan Antar Pulau</p>
            </div>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition text-xs font-bold"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="leading-tight">WhatsApp Informasi</p>
              <p className="text-[10px] text-emerald-600 font-normal">Chat Petugas Puskesmas</p>
            </div>
          </a>

          {/* Call Hotline */}
          <a
            href={`tel:${profile.emergencyHotline}`}
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 transition text-xs font-bold"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <p className="leading-tight">Hotline Pengaduan</p>
              <p className="text-[10px] text-sky-600 font-normal">{profile.emergencyHotline}</p>
            </div>
          </a>

          {/* Quick Search */}
          <button
            onClick={() => { setIsOpen(false); setIsSearchOpen(true); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 transition text-xs font-bold text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <p className="leading-tight">Pencarian Internal</p>
              <p className="text-[10px] text-slate-500 font-normal">Cari Layanan & Jadwal</p>
            </div>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 px-5 rounded-full bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-bold text-xs shadow-2xl shadow-sky-600/40 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 group"
        aria-label="Akses Bantuan dan Layanan"
      >
        <div className="relative">
          <Headphones className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-ping" />
        </div>
        <span className="hidden sm:inline font-bold">Bantuan & Kontak</span>
      </button>

    </div>
  );
};
