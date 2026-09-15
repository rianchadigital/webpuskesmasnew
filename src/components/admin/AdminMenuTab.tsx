import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Sliders, 
  Menu, 
  Sparkles, 
  Save, 
  Bell, 
  Layers, 
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Eye
} from 'lucide-react';
import { TabType } from '../../types';

interface Props {
  onSuccessToast: (msg: string) => void;
}

export const AdminMenuTab: React.FC<Props> = ({ onSuccessToast }) => {
  const { profile, updateProfile, navigateToTab } = useData();

  // Local state for running announcements and hero banner
  const [announcementText, setAnnouncementText] = useState(
    'Pelayanan UGD 24 Jam & Ambulans Laut Siaga di Pulau Tidung, Pulau Pari, Pulau Lancang, Pulau Untung Jawa, dan Pulau Payung. Hubungi Hotline Maritim: 0859-6100-0003'
  );
  const [heroBadge, setHeroBadge] = useState('Puskesmas Ramah Bahari');
  const [heroTitle, setHeroTitle] = useState('Pusat Pelayanan Kesehatan Bahari Kepulauan Seribu Selatan');

  const mainMenuList: { tab: TabType; title: string; category: string; description: string }[] = [
    { tab: 'beranda', title: 'Beranda', category: 'Utama', description: 'Halaman muka, hero slider, layanan unggulan & statistik' },
    { tab: 'profil', title: 'Profil Puskesmas', category: 'Profil', description: 'Sambutan Kepala, Visi Misi, Struktur Organisasi & Peta' },
    { tab: 'ilp', title: 'Integrasi Layanan Primer (ILP)', category: 'Program', description: 'Klaster 1 Manajemen s.d Klaster 5 Lintas Siklus Hidup' },
    { tab: 'pelayanan', title: 'Daftar Layanan Kesehatan', category: 'Pelayanan', description: '9 Poliklinik Rawat Jalan, 24 Jam UGD, Lab & Farmasi' },
    { tab: 'jadwal', title: 'Jadwal Dokter & Poliklinik', category: 'Pelayanan', description: 'Jadwal harian dokter spesialis, gigi, KIA & umum' },
    { tab: 'wilayah', title: 'Wilayah Kerja 5 Pulau', category: 'Faskes', description: 'Pustu P. Pari, Pustu P. Lancang, Untung Jawa & Payung' },
    { tab: 'berita', title: 'Warta & Berita Puskesmas', category: 'Informasi', description: 'Artikel kegiatan puskesmas, promosi kesehatan & rilis' },
    { tab: 'agenda', title: 'Kalender Agenda Kegiatan', category: 'Informasi', description: 'Jadwal posyandu keliling, skrining & penyuluhan pulau' },
    { tab: 'unduhan', title: 'Pusat Unduhan & Dokumen SOP', category: 'Transparansi', description: 'Formulir pelayanan, maklumat & standar mutu' },
    { tab: 'sdm', title: 'Data Ketenagaan & Tenaga Medis', category: 'Transparansi', description: 'Profil 54+ tenaga kesehatan dokter, perawat & bidan' },
    { tab: 'data', title: 'Statistik & Indikator Mutu', category: 'Transparansi', description: 'Capaian indikator SPM & grafik kepuasan masyarakat' },
    { tab: 'kontak', title: 'Kontak & Lokasi Faskes', category: 'Bantuan', description: 'Alamat dermaga faskes, ambulans laut & WhatsApp' },
    { tab: 'faq', title: 'Tanya Jawab (FAQ)', category: 'Bantuan', description: 'Pertanyaan umum seputar BPJS, rujukan & ambulans' },
  ];

  const handleSaveMenuSettings = () => {
    onSuccessToast('Pengaturan menu & pengumuman tampilan beranda berhasil disimpan!');
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Banner Section */}
      <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl flex items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sky-950 text-sm flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-sky-700" />
            <span>Pengaturan Navigasi Menu & Konten Tampilan Beranda</span>
          </h4>
          <p className="text-sky-800 text-xs mt-1">
            Sesuaikan teks pengumuman penting (running text), banner slider beranda, serta navigasi menu cepat publik.
          </p>
        </div>
        <button
          onClick={handleSaveMenuSettings}
          className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Tampilan</span>
        </button>
      </div>

      {/* 1. Pengumuman Berjalan / Running Text */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Teks Berjalan Pengumuman Darurat / Penting (Marquee)</span>
          </label>
          <span className="text-[11px] text-slate-400">Tampil di bagian atas beranda</span>
        </div>
        <textarea
          rows={2}
          value={announcementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 leading-relaxed font-medium text-slate-800"
        />
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span><strong>Pratinjau:</strong> "{announcementText}"</span>
        </div>
      </div>

      {/* 2. Banner Utama Beranda */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
        <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Teks Slogan & Banner Header Beranda</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Label Tagline Mini (Badge)</label>
            <input
              type="text"
              value={heroBadge}
              onChange={(e) => setHeroBadge(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Motto Puskesmas (Global)</label>
            <input
              type="text"
              value={profile.motto}
              onChange={(e) => updateProfile({ motto: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-emerald-700"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Judul Utama Hero Banner</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 text-sm"
            />
          </div>
        </div>
      </div>

      {/* 3. Daftar Struktur Navigasi Menu Publik */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Menu className="w-4 h-4 text-sky-600" />
            <span>Struktur Menu Navigasi Website Puskesmas ({mainMenuList.length} Menu)</span>
          </label>
          <span className="text-[11px] text-emerald-700 font-semibold">Semua Menu Aktif</span>
        </div>

        <p className="text-slate-500 text-xs">
          Klik tombol <strong>"Lihat di Web"</strong> untuk memeriksa halaman langsung dari sudut pandang pengunjung website.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
          {mainMenuList.map((m, idx) => (
            <div 
              key={m.tab} 
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-[11px] shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">{m.title}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 font-medium text-slate-700">
                      {m.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{m.description}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateToTab(m.tab)}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-sky-50 text-sky-700 font-semibold text-[11px] flex items-center gap-1 shrink-0 transition"
              >
                <Eye className="w-3 h-3" />
                <span>Lihat</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
