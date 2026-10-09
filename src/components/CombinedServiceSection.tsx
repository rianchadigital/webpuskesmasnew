import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ServicesSection } from './ServicesSection';
import { ILPSection } from './ILPSection';
import { ServiceFlowchart } from './ServiceFlowchart';
import { 
  Stethoscope, 
  Layers, 
  GitFork, 
  Sparkles, 
  Eye, 
  FileText, 
  FileCheck, 
  Scroll, 
  ShieldAlert, 
  Download,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface Props {
  initialSubTab?: 'layanan' | 'ilp' | 'alur' | 'dokumen' | 'semua';
}

export const CombinedServiceSection: React.FC<Props> = ({ initialSubTab = 'layanan' }) => {
  const { activeTab, activeServiceDoc, openServiceDoc } = useData();
  const [subTab, setSubTab] = useState<'layanan' | 'ilp' | 'alur' | 'dokumen' | 'semua'>(
    activeTab === 'ilp' ? 'ilp' : initialSubTab
  );

  useEffect(() => {
    if (activeTab === 'ilp') {
      setSubTab('ilp');
    } else if (activeTab === 'pelayanan') {
      if (activeServiceDoc) {
        setSubTab('dokumen');
      } else {
        setSubTab('layanan');
      }
    }
  }, [activeTab, activeServiceDoc]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Premium Hero Header */}
      <div className="pt-10 pb-8 bg-gradient-to-r from-sky-950 via-teal-950 to-blue-950 text-white text-center border-b border-teal-800/40 shadow-inner">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Standar Pelayanan Publik & Transformasi Kesehatan
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight mt-1">
            Informasi Pelayanan Kesehatan Terpadu
          </h1>
          <p className="text-xs sm:text-sm text-teal-200 mt-2 font-serif-elegant italic max-w-2xl mx-auto">
            "Pelayanan poliklinik dalam & luar gedung, penerapan Integrasi Layanan Primer (ILP) 5 Klaster, alur registrasi pasien, dan kesiapsiagaan maritim 24 jam."
          </p>

          {/* Unified Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg max-w-full overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setSubTab('layanan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'layanan'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/40 scale-[1.02]'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Layanan Poliklinik & Medis</span>
            </button>

            <button
              onClick={() => setSubTab('dokumen')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'dokumen'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/40 scale-[1.02]'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Standar & Maklumat (PDF)</span>
            </button>

            <button
              onClick={() => setSubTab('ilp')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'ilp'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40 scale-[1.02]'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Integrasi Layanan Primer (ILP)</span>
            </button>

            <button
              onClick={() => setSubTab('alur')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'alur'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 scale-[1.02]'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>Alur & Persyaratan</span>
            </button>

            <button
              onClick={() => setSubTab('semua')}
              className={`hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                subTab === 'semua'
                  ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                  : 'text-teal-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Semua</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Official Document Banner (4 Dokumen Resmi Google Drive PDF) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xl shadow-slate-200/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Standar Pelayanan */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-100 flex flex-col justify-between group hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase tracking-wider">
                  <FileCheck className="w-3 h-3 text-sky-600" />
                  SOP & Regulasi
                </span>
                <span className="text-[10px] font-bold text-teal-600 font-mono">PDF Drive</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700 transition">
                Standar Pelayanan Publik
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Pedoman persyaratan berkas, tarif gratis Rp 0,- KTP DKI, waktu respon IGD & alur penanganan komplain.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => openServiceDoc('standar')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </button>
              <a
                href="https://drive.google.com/file/d/1Gxi3_fT5c2a-hjM5S9BAzRdbybdMtq7Y/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-700 border border-slate-200 transition"
                title="Buka di Tab Baru Google Drive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Maklumat Pelayanan */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 flex flex-col justify-between group hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  <Scroll className="w-3 h-3 text-emerald-600" />
                  Komitmen Mutu
                </span>
                <span className="text-[10px] font-bold text-teal-600 font-mono">PDF Drive</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                Maklumat Pelayanan
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Pernyataan kesanggupan resmi seluruh jajaran Puskesmas menyelenggarakan pelayanan sesuai standar publik.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => openServiceDoc('maklumat')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </button>
              <a
                href="https://drive.google.com/file/d/1DFcUjFAhLsJuFs4pvv5WMtxnd651NXvS/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 transition"
                title="Buka di Tab Baru Google Drive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Hak & Kewajiban Pasien */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-100 flex flex-col justify-between group hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-3 h-3 text-amber-600" />
                  12 Hak &amp; 4 Kewajiban
                </span>
                <span className="text-[10px] font-bold text-teal-600 font-mono">PDF Drive</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition">
                Hak dan Kewajiban Pasien
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                12 butir hak mendapatkan layanan bermutu, adil &amp; rahasia, serta 4 kewajiban pasien selama proses pengobatan.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => openServiceDoc('hak-kewajiban')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </button>
              <a
                href="https://drive.google.com/file/d/1FwoMOjldKvUK6pXmDxSP0r-QfVvJcqXy/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white hover:bg-amber-50 text-slate-600 hover:text-amber-700 border border-slate-200 transition"
                title="Buka di Tab Baru Google Drive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Struktur Organisasi ILP */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50/50 border border-indigo-100 flex flex-col justify-between group hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-wider">
                  <Layers className="w-3 h-3 text-indigo-600" />
                  Struktur ILP 2026
                </span>
                <span className="text-[10px] font-bold text-teal-600 font-mono">PDF Drive</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-700 transition">
                Struktur Organisasi ILP
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Bagan dan tata kelola struktur organisasi 5 Klaster Integrasi Layanan Primer (ILP) Kemenkes RI.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => openServiceDoc('struktur-ilp')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </button>
              <a
                href="https://drive.google.com/file/d/1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border border-slate-200 transition"
                title="Buka di Tab Baru Google Drive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="mt-6">
        {subTab === 'dokumen' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in-50 duration-300">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Dokumen Terlampir Resmi
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Standar Pelayanan, Maklumat &amp; Hak Pasien
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Dokumen resmi telah tersimpan permanen di aset sistem dan dapat dibuka, dicetak, serta diunduh kapan saja oleh masyarakat.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Standar Pelayanan Preview Box */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 bg-sky-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-sky-300" />
                    <h3 className="text-sm font-bold">Standar Pelayanan</h3>
                  </div>
                  <button
                    onClick={() => openServiceDoc('standar')}
                    className="text-xs text-sky-200 hover:text-white font-bold flex items-center gap-1"
                  >
                    Buka PDF <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div 
                  onClick={() => openServiceDoc('standar')}
                  className="bg-slate-100 p-4 flex items-center justify-center cursor-pointer group relative overflow-hidden"
                  style={{ minHeight: '320px' }}
                >
                  <img
                    src="/assets/dokumen/standar-pelayanan.svg"
                    alt="Standar Pelayanan"
                    className="max-h-72 object-contain shadow-md rounded group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-sky-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white text-sky-900 text-xs font-bold shadow-lg">
                      Klik untuk Membuka Dokumen Lengkap
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-500">
                    Standar operasional mencakup persyaratan administrasi, gratis Rp 0,- bagi warga DKI &amp; BPJS, dan waktu respon darurat IGD &lt; 5 menit.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => openServiceDoc('standar')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700"
                    >
                      Buka Tampilan Interaktif &rarr;
                    </button>
                    <a
                      href="/assets/dokumen/standar-pelayanan.svg"
                      download="Standar-Pelayanan-Puskesmas-Kepulauan-Seribu-Selatan.svg"
                      className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Unduh
                    </a>
                  </div>
                </div>
              </div>

              {/* Maklumat Pelayanan Preview Box */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-emerald-300" />
                    <h3 className="text-sm font-bold">Maklumat Pelayanan</h3>
                  </div>
                  <button
                    onClick={() => openServiceDoc('maklumat')}
                    className="text-xs text-emerald-200 hover:text-white font-bold flex items-center gap-1"
                  >
                    Buka PDF <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div 
                  onClick={() => openServiceDoc('maklumat')}
                  className="bg-slate-100 p-4 flex items-center justify-center cursor-pointer group relative overflow-hidden"
                  style={{ minHeight: '320px' }}
                >
                  <img
                    src="/assets/dokumen/maklumat-pelayanan.svg"
                    alt="Maklumat Pelayanan"
                    className="max-h-72 object-contain shadow-md rounded group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white text-emerald-900 text-xs font-bold shadow-lg">
                      Klik untuk Membuka Dokumen Lengkap
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-500">
                    Maklumat kesanggupan resmi dalam memberikan pelayanan kesehatan masyarakat berintegritas tinggi serta komitmen sanksi perundang-undangan.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => openServiceDoc('maklumat')}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      Buka Tampilan Interaktif &rarr;
                    </button>
                    <a
                      href="/assets/dokumen/maklumat-pelayanan.svg"
                      download="Maklumat-Pelayanan-Puskesmas-Kepulauan-Seribu-Selatan.svg"
                      className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Unduh
                    </a>
                  </div>
                </div>
              </div>

              {/* Hak & Kewajiban Pasien Preview Box */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 bg-amber-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-300" />
                    <h3 className="text-sm font-bold">Hak dan Kewajiban Pasien</h3>
                  </div>
                  <button
                    onClick={() => openServiceDoc('hak-kewajiban')}
                    className="text-xs text-amber-200 hover:text-white font-bold flex items-center gap-1"
                  >
                    Buka PDF <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div 
                  onClick={() => openServiceDoc('hak-kewajiban')}
                  className="bg-slate-100 p-4 flex items-center justify-center cursor-pointer group relative overflow-hidden"
                  style={{ minHeight: '320px' }}
                >
                  <img
                    src="/assets/dokumen/hak-dan-kewajiban-pasien.svg"
                    alt="Hak dan Kewajiban Pasien"
                    className="max-h-72 object-contain shadow-md rounded group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-amber-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white text-amber-900 text-xs font-bold shadow-lg">
                      Klik untuk Membuka Dokumen Lengkap
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-500">
                    Penjelasan 12 hak pasien untuk memperoleh pelayanan bermutu, adil, jujur dan rahasia, serta 4 kewajiban pasien saat berkunjung.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => openServiceDoc('hak-kewajiban')}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700"
                    >
                      Buka Tampilan Interaktif &rarr;
                    </button>
                    <a
                      href="/assets/dokumen/hak-dan-kewajiban-pasien.svg"
                      download="Hak-dan-Kewajiban-Pasien-Puskesmas-Kepulauan-Seribu-Selatan.svg"
                      className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Unduh
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {subTab === 'layanan' && (
          <div className="animate-in fade-in-50 duration-300">
            <ServicesSection />
          </div>
        )}

        {subTab === 'ilp' && (
          <div className="animate-in fade-in-50 duration-300">
            <ILPSection />
          </div>
        )}

        {subTab === 'alur' && (
          <div className="animate-in fade-in-50 duration-300">
            <ServiceFlowchart />
          </div>
        )}

        {subTab === 'semua' && (
          <div className="animate-in fade-in-50 duration-300 space-y-8">
            <ServicesSection />
            <div className="border-t border-slate-200" />
            <ILPSection />
            <div className="border-t border-slate-200" />
            <ServiceFlowchart />
          </div>
        )}
      </div>
    </div>
  );
};
