/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DataProvider, useData } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeaderSlider } from './components/HeaderSlider';
import { QuickServices } from './components/QuickServices';
import { UsefulLinksSection } from './components/UsefulLinksSection';
import { VisitorStatsSection } from './components/VisitorStatsSection';
import { ProfileSection } from './components/ProfileSection';
import { WelcomeSection } from './components/WelcomeSection';
import { IslandCoverage } from './components/IslandCoverage';
import { ServicesSection } from './components/ServicesSection';
import { ILPSection } from './components/ILPSection';
import { ServiceFlowchart } from './components/ServiceFlowchart';
import { ScheduleSection } from './components/ScheduleSection';
import { NewsSection } from './components/NewsSection';
import { AgendaSection } from './components/AgendaSection';
import { HealthEduSection } from './components/HealthEduSection';
import { DownloadSection } from './components/DownloadSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { CombinedServiceSection } from './components/CombinedServiceSection';
import { CombinedScheduleAgenda } from './components/CombinedScheduleAgenda';
import { CombinedNewsEdu } from './components/CombinedNewsEdu';
import { CombinedDataSection } from './components/CombinedDataSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { SearchEngineModal } from './components/SearchEngineModal';
import { FloatingActionHub } from './components/FloatingActionHub';
import { ServiceDocumentModal } from './components/ServiceDocumentModal';

const MainContent: React.FC = () => {
  const { activeTab, navigateToTab } = useData();

  React.useEffect(() => {
    // Hidden access for administrator: URL query ?admin=true or hash #admin
    const checkAdminQueryOrHash = () => {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('admin') === 'true' || searchParams.has('admin') || window.location.hash === '#admin') {
        navigateToTab('admin');
      }
    };

    checkAdminQueryOrHash();
    window.addEventListener('hashchange', checkAdminQueryOrHash);

    // Keyboard shortcut: Ctrl + Shift + A or Alt + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigateToTab('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkAdminQueryOrHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateToTab]);

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Dynamic Header Slider is present on the Home tab right below the Menu - Singkat, Padat & Premium */}
        {activeTab === 'beranda' && (
          <div className="space-y-0">
            {/* 1. Gambar Slider Utama Dinamis (4 Foto Spanduk Informasi) */}
            <HeaderSlider />

            {/* 2. Tombol Navigasi Layanan Cepat Premium */}
            <QuickServices />

            {/* 3. Tautan Bermanfaat Resmi & Terpadu */}
            <UsefulLinksSection />

            {/* 4. Sorotan Warta Terkini & Pelayanan Pilihan (Singkat & Elegan) */}
            <div className="bg-slate-50 dark:bg-slate-900/60 transition-colors">
              <NewsSection />
            </div>

            {/* 5. Grafik Visitor & Statistik Pengunjung Web di Bawah Beranda */}
            <VisitorStatsSection />
          </div>
        )}

        {activeTab === 'sambutan' && (
          <>
            <WelcomeSection />
            <ProfileSection />
          </>
        )}

        {activeTab === 'profil' && (
          <>
            <div className="pt-10 pb-6 bg-gradient-to-r from-sky-950 via-blue-900 to-indigo-950 text-white text-center border-b border-sky-800/50">
              <span className="text-[11px] font-mono tracking-widest uppercase text-sky-400 font-extrabold">Informasi Kelembagaan</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display mt-1">Profil & Visi Misi Puskesmas</h1>
              <p className="text-xs sm:text-sm text-sky-200 mt-2 font-serif-elegant italic max-w-2xl mx-auto px-4">
                "Struktur Organisasi, Wilayah Kerja Kepulauan, Sumber Daya Manusia & Fasilitas Kesehatan"
              </p>
            </div>
            <ProfileSection />
            <IslandCoverage />
          </>
        )}

        {activeTab === 'wilayah' && (
          <>
            <div className="pt-10 pb-6 bg-gradient-to-r from-teal-950 via-sky-900 to-slate-900 text-white text-center border-b border-teal-800/50">
              <span className="text-[11px] font-mono tracking-widest uppercase text-teal-400 font-extrabold">Jejaring Fasilitas Kesehatan</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display mt-1">Wilayah Kerja & Pustu Pulau</h1>
              <p className="text-xs sm:text-sm text-teal-200 mt-2 font-serif-elegant italic max-w-2xl mx-auto px-4">
                "Pelayanan Kesehatan Merata di 5 Pulau Pemukiman: Tidung, Pari, Lancang, Untung Jawa, dan Payung"
              </p>
            </div>
            <IslandCoverage />
            <ContactSection />
          </>
        )}

        {(activeTab === 'pelayanan' || activeTab === 'ilp' || activeTab === 'dokumen-pelayanan') && (
          <CombinedServiceSection />
        )}

        {(activeTab === 'jadwal' || activeTab === 'agenda') && (
          <CombinedScheduleAgenda />
        )}

        {(activeTab === 'berita' || activeTab === 'pengumuman' || activeTab === 'edukasi') && (
          <CombinedNewsEdu initialSubTab={activeTab === 'pengumuman' ? 'pengumuman' : (activeTab === 'edukasi' ? 'edukasi' : 'berita')} />
        )}

        {(activeTab === 'data' || activeTab === 'data-kesehatan' || activeTab === 'dokumentasi' || activeTab === 'unduhan' || activeTab === 'sdm') && (
          <CombinedDataSection />
        )}

        {(activeTab === 'kontak' || activeTab === 'faq') && (
          <>
            <div className="pt-10 pb-6 bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white text-center border-b border-rose-800/50">
              <span className="text-[11px] font-mono tracking-widest uppercase text-rose-400 font-extrabold">Pusat Layanan & Bantuan</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display mt-1">Kontak Resmi & Bantuan Pelayanan</h1>
              <p className="text-xs sm:text-sm text-rose-200 mt-2 font-serif-elegant italic max-w-2xl mx-auto px-4">
                "Saluran Pengaduan & Aspirasi Masyarakat, Informasi Layanan Puskesmas, dan Panduan Pertanyaan Umum (FAQ)"
              </p>
            </div>
            <ContactSection />
            <FaqSection />
          </>
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </div>

      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white flex flex-col transition-colors duration-200">
          <Navbar />
          <div className="flex-1">
            <MainContent />
          </div>
          <SearchEngineModal />
          <FloatingActionHub />
          <ServiceDocumentModal />
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}
