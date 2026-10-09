import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ServiceDocKey } from '../types';
import {
  FileText,
  Scroll,
  ShieldAlert,
  CheckCircle2,
  Download,
  Printer,
  ExternalLink,
  Maximize2,
  Minimize2,
  X,
  FileCheck,
  Building,
  Info,
  Share2,
  Check,
  Network,
  RotateCw,
  Eye
} from 'lucide-react';

interface DocumentMeta {
  key: ServiceDocKey;
  title: string;
  badge: string;
  category: string;
  driveId: string;
  drivePreviewUrl: string;
  driveShareUrl: string;
  fileUrl: string;
  fileName: string;
  description: string;
  icon: React.ElementType;
  ratio: 'portrait' | 'landscape';
}

const DOCUMENTS: Record<ServiceDocKey, DocumentMeta> = {
  standar: {
    key: 'standar',
    title: 'Standar Pelayanan Publik',
    badge: 'Kepmenkes & Pergub DKI',
    category: 'Regulasi & SOP Faskes',
    driveId: '1Gxi3_fT5c2a-hjM5S9BAzRdbybdMtq7Y',
    drivePreviewUrl: 'https://drive.google.com/file/d/1Gxi3_fT5c2a-hjM5S9BAzRdbybdMtq7Y/preview',
    driveShareUrl: 'https://drive.google.com/file/d/1Gxi3_fT5c2a-hjM5S9BAzRdbybdMtq7Y/view?usp=sharing',
    fileUrl: '/assets/dokumen/standar-pelayanan.svg',
    fileName: 'Standar-Pelayanan-Puskesmas-Kepulauan-Seribu-Selatan.pdf',
    description: 'Pedoman standar persyaratan, alur prosedur, waktu respon IGD, tarif gratis BPJS/DKI, dan fasilitas layanan darat & maritim.',
    icon: FileCheck,
    ratio: 'portrait'
  },
  maklumat: {
    key: 'maklumat',
    title: 'Maklumat Pelayanan',
    badge: 'Komitmen Mutu Resmi',
    category: 'Pernyataan Kesanggupan',
    driveId: '1DFcUjFAhLsJuFs4pvv5WMtxnd651NXvS',
    drivePreviewUrl: 'https://drive.google.com/file/d/1DFcUjFAhLsJuFs4pvv5WMtxnd651NXvS/preview',
    driveShareUrl: 'https://drive.google.com/file/d/1DFcUjFAhLsJuFs4pvv5WMtxnd651NXvS/view?usp=drive_link',
    fileUrl: '/assets/dokumen/maklumat-pelayanan.svg',
    fileName: 'Maklumat-Pelayanan-Puskesmas-Kepulauan-Seribu-Selatan.pdf',
    description: 'Pernyataan kesanggupan resmi seluruh jajaran Puskesmas Kepulauan Seribu Selatan dalam menyelenggarakan pelayanan prima berstandar tinggi.',
    icon: Scroll,
    ratio: 'landscape'
  },
  'hak-kewajiban': {
    key: 'hak-kewajiban',
    title: 'Hak dan Kewajiban Pasien',
    badge: '12 Hak & 4 Kewajiban',
    category: 'Perlindungan Pasien',
    driveId: '1FwoMOjldKvUK6pXmDxSP0r-QfVvJcqXy',
    drivePreviewUrl: 'https://drive.google.com/file/d/1FwoMOjldKvUK6pXmDxSP0r-QfVvJcqXy/preview',
    driveShareUrl: 'https://drive.google.com/file/d/1FwoMOjldKvUK6pXmDxSP0r-QfVvJcqXy/view?usp=sharing',
    fileUrl: '/assets/dokumen/hak-dan-kewajiban-pasien.svg',
    fileName: 'Hak-dan-Kewajiban-Pasien-Puskesmas-Kepulauan-Seribu-Selatan.pdf',
    description: 'Informasi 12 butir hak pasien dan 4 butir kewajiban pasien selama menerima pelayanan kesehatan di Puskesmas Kepulauan Seribu Selatan.',
    icon: ShieldAlert,
    ratio: 'portrait'
  },
  'struktur-ilp': {
    key: 'struktur-ilp',
    title: 'Struktur Organisasi Integrasi Layanan Primer (ILP)',
    badge: 'Kepmenkes No. 2014/2023',
    category: 'Tata Kelola Kelembagaan',
    driveId: '1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W',
    drivePreviewUrl: 'https://drive.google.com/file/d/1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W/preview',
    driveShareUrl: 'https://drive.google.com/file/d/1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W/view?usp=sharing',
    fileUrl: '/assets/dokumen/standar-pelayanan.svg',
    fileName: 'Struktur-Organisasi-ILP-Puskesmas-Kepulauan-Seribu-Selatan.pdf',
    description: 'Bagan dan tata kelola struktur organisasi Integrasi Layanan Primer (ILP) 5 Klaster Siklus Hidup Puskesmas Kepulauan Seribu Selatan Tahun 2026.',
    icon: Network,
    ratio: 'landscape'
  }
};

export const ServiceDocumentModal: React.FC = () => {
  const { activeServiceDoc, openServiceDoc, closeServiceDoc } = useData();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'text' | 'vector'>('pdf');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);

  useEffect(() => {
    // Reset loading state and reload iframe when active document changes
    setIsIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  }, [activeServiceDoc]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          closeServiceDoc();
        }
      }
    };
    if (activeServiceDoc) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeServiceDoc, isFullscreen, closeServiceDoc]);

  if (!activeServiceDoc) return null;

  const currentDoc = DOCUMENTS[activeServiceDoc] || DOCUMENTS.standar;

  const handlePrint = () => {
    const printWindow = window.open(currentDoc.driveShareUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentDoc.driveShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReloadIframe = () => {
    setIsIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      id="service-document-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeServiceDoc();
      }}
    >
      <div
        className={`bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full max-w-none rounded-none'
            : 'w-full max-w-6xl h-[94vh]'
        }`}
      >
        {/* ================= MODAL HEADER & TABS ================= */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                  Dokumen Resmi Pelayanan (Google Drive PDF)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                  Terverifikasi
                </span>
              </div>
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {currentDoc.title}
              </h2>
            </div>
          </div>

          {/* Quick Doc Switcher Tabs for All 4 Official Documents */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 overflow-x-auto max-w-full">
            {(Object.keys(DOCUMENTS) as ServiceDocKey[]).map((key) => {
              const item = DOCUMENTS[key];
              const Icon = item.icon;
              const isActive = activeServiceDoc === key;
              return (
                <button
                  key={key}
                  id={`tab-doc-${key}`}
                  onClick={() => openServiceDoc(key)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.key === 'struktur-ilp' ? 'Struktur ILP' : item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Close Button */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              id="close-document-modal-btn"
              onClick={closeServiceDoc}
              aria-label="Tutup Dokumen"
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= TOOLBAR CONTROLS ================= */}
        <div className="bg-slate-850 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 text-xs text-slate-300 overflow-x-auto">
          {/* View Mode Tabs: PDF Google Drive vs Ringkasan Teks vs Grafis */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('pdf')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition text-xs ${
                viewMode === 'pdf'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View PDF (Google Drive)</span>
            </button>

            <button
              onClick={() => setViewMode('text')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition text-xs ${
                viewMode === 'text'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ringkasan Teks</span>
            </button>

            {currentDoc.key !== 'struktur-ilp' && (
              <button
                onClick={() => setViewMode('vector')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition text-xs ${
                  viewMode === 'vector'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>Visual Grafis</span>
              </button>
            )}
          </div>

          {/* Center Info Text */}
          <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs">
            <Info className="w-3.5 h-3.5 text-teal-400" />
            <span>Google Drive ID: <code className="font-mono text-teal-300">{currentDoc.driveId}</code></span>
          </div>

          {/* Action Buttons: Open in Drive, Copy Link, Print, Fullscreen, Close */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReloadIframe}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Muat Ulang Dokumen PDF"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition font-medium"
              title="Salin Link Google Drive"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Tersalin' : 'Salin Link'}</span>
            </button>

            <a
              href={currentDoc.driveShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition shadow-xs"
              title="Buka PDF Asli di Tab Baru Google Drive"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka di Google Drive</span>
            </a>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Cetak / Buka Dokumen"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title={isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={closeServiceDoc}
              className="lg:hidden p-1.5 rounded-lg bg-rose-600/30 text-rose-300 transition"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= DOCUMENT VIEWER AREA ================= */}
        <div className="flex-1 bg-slate-950/80 overflow-hidden relative flex flex-col">
          {viewMode === 'pdf' ? (
            /* Interactive Embedded Google Drive PDF Viewer */
            <div className="relative w-full h-full flex-1 bg-slate-900">
              {isIframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-slate-300 gap-3">
                  <div className="w-10 h-10 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-semibold text-teal-300">
                    Memuat dokumen PDF resmi dari Google Drive...
                  </p>
                  <p className="text-[11px] text-slate-500">
                    ID: {currentDoc.driveId}
                  </p>
                </div>
              )}
              <iframe
                key={iframeKey}
                src={currentDoc.drivePreviewUrl}
                title={currentDoc.title}
                className="w-full h-full border-0 block"
                allow="autoplay"
                onLoad={() => setIsIframeLoading(false)}
              />
            </div>
          ) : viewMode === 'text' ? (
            /* Accessible Text View */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center items-start">
              <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-200 space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    Salinan Teks Resmi
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{currentDoc.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentDoc.description}</p>
                </div>

                {activeServiceDoc === 'struktur-ilp' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 text-slate-200 space-y-2">
                      <h4 className="font-bold text-sm text-teal-300">Struktur Tata Kelola ILP 5 Klaster Kemenkes RI:</h4>
                      <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-300">
                        <li><strong>Klaster 1:</strong> Manajemen (Ketatausahaan, Perencanaan, Keuangan, Mutu &amp; Logistik)</li>
                        <li><strong>Klaster 2:</strong> Ibu dan Anak (Kesehatan Ibu Hamil, Bersalin, Nifas, Balita, &amp; Remaja)</li>
                        <li><strong>Klaster 3:</strong> Usia Dewasa dan Lanjut Usia (Pengendalian PTM, Skrining Produktif &amp; Lansia)</li>
                        <li><strong>Klaster 4:</strong> Penanggulangan Penyakit Menular (Surveilans, TB, DBD, Imunisasi &amp; KLB)</li>
                        <li><strong>Klaster 5 / Lintas Klaster:</strong> IGD 24 Jam, Farmasi, Laboratorium &amp; Evakuasi Rujukan Medis Maritim</li>
                      </ul>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dokumen struktur organisasi lengkap beserta bagan hierarki penugasan nakes di Pulau Tidung, Pulau Pari, Pulau Untung Jawa, Pulau Lancang, dan Pulau Payung tercantum pada dokumen PDF resmi.
                    </p>
                  </div>
                )}

                {activeServiceDoc === 'hak-kewajiban' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-extrabold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        12 Butir Hak Pasien:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                        <li>Memperoleh informasi mengenai tata tertib dan peraturan yang berlaku.</li>
                        <li>Memperoleh informasi tentang hak dan kewajiban pasien.</li>
                        <li>Memperoleh layanan yang manusiawi, adil, jujur dan tanpa diskriminasi.</li>
                        <li>Memperoleh pelayanan kesehatan yang bermutu sesuai dengan standar profesi dan standar prosedur.</li>
                        <li>Memperoleh pelayanan yang efektif dan efisien sehingga pasien terhindar dari kerugian fisik.</li>
                        <li>Memilih dokter sesuai dengan keinginannya dan peraturan yang berlaku di Puskesmas.</li>
                        <li>Meminta konsultasi tentang penyakit yang dideritanya kepada dokter lain.</li>
                        <li>Mendapat privasi dan kerahasiaan yang dideritanya termasuk data-data medisnya.</li>
                        <li>Memberikan persetujuan atau menolak atas tindakan yang akan dilakukan oleh tenaga kesehatan terhadap penyakit yang dideritanya.</li>
                        <li>Mendapat informasi meliputi diagnosa dan tata cara tindakan medis, tujuan tindakan medis, alternatif tindakan, risiko dan komplikasi yang mungkin terjadi dan prognosis tindakan yang dilakukan.</li>
                        <li>Memperoleh keamanan dan keselamatan dirinya selama perawatan di Puskesmas.</li>
                        <li>Mengajukan usul dan saran, perbaikan atas perlakuan Puskesmas terhadap dirinya.</li>
                      </ol>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                      <h4 className="text-base font-extrabold text-emerald-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        4 Butir Kewajiban Pasien:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                        <li>Memberikan informasi yang lengkap dan jujur tentang masalah kesehatannya.</li>
                        <li>Mematuhi nasehat dan petunjuk tenaga kesehatan yang kompeten.</li>
                        <li>Mematuhi ketentuan yang berlaku di sarana pelayanan kesehatan.</li>
                        <li>Memberikan imbalan jasa atas pelayanan yang diterima, kecuali yang mempunyai asuransi.</li>
                      </ol>
                    </div>
                  </div>
                )}

                {activeServiceDoc === 'maklumat' && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-4">
                      <h4 className="text-lg font-black text-white uppercase tracking-wider">
                        Maklumat Pelayanan
                      </h4>
                      <p className="text-base sm:text-lg font-bold text-emerald-200 leading-relaxed italic">
                        “Dengan ini, kami menyatakan sanggup menyelenggarakan pelayanan sesuai standar pelayanan yang telah ditetapkan. Dan apabila dalam penyelenggaraan pelayanan kami, tidak sesuai dengan standar pelayanan yang telah ditetapkan, kami bersedia menerima sanksi sesuai ketentuan perundang-undangan yang berlaku.”
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pt-4 border-t border-slate-800 gap-4 text-xs text-slate-400">
                      <div>
                        <p className="font-bold text-slate-200">Dasar Hukum &amp; Komitmen:</p>
                        <p>UU No. 25 Tahun 2009 tentang Pelayanan Publik</p>
                        <p>Dinas Kesehatan Provinsi DKI Jakarta</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-200">Pimpinan Penandatangan:</p>
                        <p className="text-sm font-extrabold text-white mt-0.5">dr. Ilmi Tri Indiarto, M. Kes</p>
                        <p className="font-mono">NIP 198201292010011013</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeServiceDoc === 'standar' && (
                  <div className="space-y-4 text-sm text-slate-300">
                    <p className="text-slate-400 text-xs">
                      Ringkasan Komponen Standar Pelayanan Publik Puskesmas Kecamatan Kepulauan Seribu Selatan:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                        <h5 className="font-bold text-teal-400">1. Persyaratan Pelayanan</h5>
                        <p className="text-xs text-slate-300 mt-1">KTP DKI Jakarta, KK, Kartu BPJS Kesehatan aktif. Pasien gawat darurat dilayani langsung tanpa syarat administratif.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                        <h5 className="font-bold text-teal-400">2. Biaya / Tarif Layanan</h5>
                        <p className="text-xs text-emerald-300 font-bold mt-1">Rp 0,- (GRATIS) untuk seluruh pemegang KTP DKI Jakarta dan peserta BPJS Kesehatan aktif.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                        <h5 className="font-bold text-teal-400">3. Waktu Penyelesaian</h5>
                        <p className="text-xs text-slate-300 mt-1">IGD &amp; Respon Darurat &lt; 5 Menit (Siaga 24 Jam). Poli Rawat Jalan 15–20 Menit. Farmasi Obat 10–15 Menit.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                        <h5 className="font-bold text-teal-400">4. Penanganan Pengaduan</h5>
                        <p className="text-xs text-slate-300 mt-1">Hotline WhatsApp 24 Jam: 0812-9000-8500, Kotak Saran di setiap pulau pemukiman, dan kanal resmi CRM JAKI.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 hover:text-teal-300 transition"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Google Drive Disalin!' : 'Salin Tautan File Dokumen'}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('pdf')}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition"
                  >
                    Kembali ke View PDF Asli
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* High Resolution Graphic Document Container */
            <div className="flex-1 overflow-y-auto p-4 flex justify-center items-start">
              <div
                className="relative shadow-2xl rounded-2xl bg-white border border-slate-700 select-none overflow-hidden"
                style={{
                  width: currentDoc.ratio === 'landscape' ? '900px' : '720px',
                  maxWidth: '100%'
                }}
              >
                <img
                  src={currentDoc.fileUrl}
                  alt={currentDoc.title}
                  className="w-full h-auto object-contain block pointer-events-auto"
                  loading="eager"
                />
              </div>
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Building className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              Puskesmas Kecamatan Kepulauan Seribu Selatan — Dinas Kesehatan Provinsi DKI Jakarta
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={currentDoc.driveShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Google Drive ID: {currentDoc.driveId}</span>
            </a>
            <button
              onClick={closeServiceDoc}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
