import React, { useState, useEffect, useRef } from 'react';
import { initialOrgLeader, initialOrgClusters } from '../data/initialData';
import { OrgPerson, OrgCluster } from '../types';
import { useData } from '../context/DataContext';
import { 
  Camera, 
  Upload, 
  X, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Search, 
  User, 
  Building2, 
  Info, 
  CheckCircle2, 
  FileEdit,
  Printer,
  ExternalLink,
  Eye,
  FileText
} from 'lucide-react';

const STORAGE_KEY = 'puskesmas_org_chart_data_v2';
const PDF_DRIVE_ID = '1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W';
const PDF_PREVIEW_URL = `https://drive.google.com/file/d/${PDF_DRIVE_ID}/preview`;
const PDF_SHARE_URL = `https://drive.google.com/file/d/${PDF_DRIVE_ID}/view?usp=sharing`;

export const OrganizationChart: React.FC = () => {
  const [leader, setLeader] = useState<OrgPerson>(() => {
    const customHeadPhoto = localStorage.getItem('puskesmas_head_photo');
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.leader) {
          if (customHeadPhoto && !parsed.leader.photo?.startsWith('data:')) {
            parsed.leader.photo = customHeadPhoto;
          }
          return parsed.leader;
        }
      } catch {
        // fallback
      }
    }
    return {
      ...initialOrgLeader,
      photo: customHeadPhoto || initialOrgLeader.photo || '/kepala-puskesmas.svg'
    };
  });

  const [clusters, setClusters] = useState<OrgCluster[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.clusters) return parsed.clusters;
      } catch {
        // fallback
      }
    }
    return initialOrgClusters;
  });

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEditingPerson, setActiveEditingPerson] = useState<{
    person: OrgPerson;
    clusterId?: string;
    isLeader?: boolean;
    isCoordinator?: boolean;
  } | null>(null);

  const { openServiceDoc } = useData();
  const [chartViewMode, setChartViewMode] = useState<'pdf' | 'interactive'>('pdf');
  const [pdfLoading, setPdfLoading] = useState(true);
  const [tempPhotoUrl, setTempPhotoUrl] = useState<string>('');
  const [tempName, setTempName] = useState<string>('');
  const [tempRole, setTempRole] = useState<string>('');
  const [tempNip, setTempNip] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save changes to localStorage
  const saveToStorage = (newLeader: OrgPerson, newClusters: OrgCluster[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        leader: newLeader,
        clusters: newClusters
      }));
    } catch {
      // ignore storage error
    }
  };

  const handleEditClick = (
    person: OrgPerson, 
    clusterId?: string, 
    isLeader = false, 
    isCoordinator = false
  ) => {
    setActiveEditingPerson({ person, clusterId, isLeader, isCoordinator });
    setTempPhotoUrl(person.photo || '');
    setTempName(person.name);
    setTempRole(person.role);
    setTempNip(person.nip || '');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert('Ukuran foto maksimal 3MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setTempPhotoUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePerson = () => {
    if (!activeEditingPerson) return;

    const { person, clusterId, isLeader, isCoordinator } = activeEditingPerson;

    if (isLeader) {
      const updatedLeader: OrgPerson = {
        ...leader,
        name: tempName,
        role: tempRole,
        nip: tempNip,
        photo: tempPhotoUrl
      };
      setLeader(updatedLeader);
      saveToStorage(updatedLeader, clusters);
    } else if (clusterId) {
      const updatedClusters = clusters.map(cluster => {
        if (cluster.id !== clusterId) return cluster;

        if (isCoordinator) {
          return {
            ...cluster,
            coordinator: {
              ...cluster.coordinator,
              name: tempName,
              role: tempRole,
              nip: tempNip,
              photo: tempPhotoUrl
            }
          };
        }

        return {
          ...cluster,
          members: cluster.members.map(m => {
            if (m.id === person.id) {
              return {
                ...m,
                name: tempName,
                role: tempRole,
                nip: tempNip,
                photo: tempPhotoUrl
              };
            }
            return m;
          })
        };
      });

      setClusters(updatedClusters);
      saveToStorage(leader, updatedClusters);
    }

    setSuccessToast(`Foto dan data "${tempName}" berhasil diperbarui!`);
    setActiveEditingPerson(null);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan bagan struktur ke data awal resmi?')) {
      localStorage.removeItem(STORAGE_KEY);
      setLeader(initialOrgLeader);
      setClusters(initialOrgClusters);
      setSuccessToast('Struktur organisasi berhasil dikembalikan ke standar awal.');
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isMatched = (name: string, role: string) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || role.toLowerCase().includes(query);
  };

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 p-6 overflow-auto' : ''}`}>
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Info & Action Controls */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold uppercase tracking-wider border border-blue-200/60">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Bagan Resmi ILP 2026
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Kepmenkes No. 2014/2023 & Pola Tata Kelola Kepulauan
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Struktur Organisasi Integrasi Layanan Primer (ILP)
          </h3>
          <p className="text-xs text-slate-600">
            Dokumen resmi diambil langsung dari Google Drive PDF sesuai keputusan Kepala Puskesmas.
          </p>
        </div>

        {/* View Mode Switcher: PDF Google Drive vs Bagan Interaktif */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold gap-1">
            <button
              onClick={() => setChartViewMode('pdf')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                chartViewMode === 'pdf'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Dokumen PDF (Drive)</span>
            </button>
            <button
              onClick={() => setChartViewMode('interactive')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                chartViewMode === 'interactive'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Bagan Visual Nakes</span>
            </button>
          </div>

          <a
            href={PDF_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition"
            title="Buka Dokumen PDF di Google Drive"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buka Google Drive</span>
          </a>
        </div>
      </div>

      {/* VIEW MODE 1: DOKUMEN PDF RESMI GOOGLE DRIVE */}
      {chartViewMode === 'pdf' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          {/* Top Bar for PDF Viewer */}
          <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">
                Dokumen PDF Resmi: Struktur Organisasi Integrasi Layanan Primer (ILP)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700 font-mono">
                ID: {PDF_DRIVE_ID}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openServiceDoc('struktur-ilp')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Modal Layar Penuh</span>
              </button>

              <a
                href={PDF_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Tab Baru</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Drive PDF Iframe */}
          <div className="relative w-full h-[750px] bg-slate-900">
            {pdfLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-slate-300 gap-3">
                <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-semibold text-blue-300">
                  Memuat dokumen PDF Struktur Organisasi ILP dari Google Drive...
                </p>
              </div>
            )}
            <iframe
              src={PDF_PREVIEW_URL}
              title="Struktur Organisasi ILP Puskesmas Kepulauan Seribu Selatan"
              className="w-full h-full border-0 block"
              allow="autoplay"
              onLoad={() => setPdfLoading(false)}
            />
          </div>
        </div>
      )}

      {/* VIEW MODE 2: BAGAN VISUAL INTERAKTIF NAKES */}
      {chartViewMode === 'interactive' && (
        <>
          {/* Action Buttons & Zoom Bar */}
          <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="relative flex-1 sm:w-64 max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pejabat / bidang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="inline-flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(60, prev - 10))}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Perkecil Bagan"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 font-mono font-bold text-[11px] text-slate-600 min-w-11 text-center">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(140, prev + 10))}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition"
                  title="Perbesar Bagan"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(100)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition ml-1"
                  title="Reset Skala"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition text-xs flex items-center gap-1.5 font-bold"
                title="Layar Penuh"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isFullscreen ? 'Kecilkan' : 'Layar Penuh'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition text-xs flex items-center gap-1.5 font-bold"
                title="Cetak / Unduh Bagan"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cetak</span>
              </button>

              <button
                onClick={handleResetToDefault}
                className="text-[11px] text-slate-500 hover:text-rose-600 underline font-semibold px-1"
                title="Kembalikan ke susunan awal"
              >
                Reset Default
              </button>
            </div>
          </div>

      {/* The Printable Visual Chart Container */}
      <div 
        ref={chartContainerRef}
        className="bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-x-auto print:bg-white print:text-slate-900 print:p-0 print:border-none print:shadow-none"
      >
        <div 
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }} 
          className="transition-transform duration-200 min-w-[1100px] flex flex-col items-center"
        >
          {/* Chart Header Branding (Matching Attachment Banner) */}
          <div className="text-center mb-8 flex flex-col items-center">
            {/* DKI Jakarta Crest / Jaya Raya Emblem */}
            <div className="w-16 h-16 mb-2 flex items-center justify-center p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
              <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm" fill="none">
                <path d="M 50,5 L 85,25 L 85,85 C 85,105 50,115 50,115 C 50,115 15,105 15,85 L 15,25 Z" fill="#b91c1c" stroke="#f59e0b" strokeWidth="3" />
                <path d="M 50,15 L 75,30 L 75,75 C 75,90 50,100 50,100 C 50,100 25,90 25,75 L 25,30 Z" fill="#1e3a8a" />
                <circle cx="50" cy="55" r="18" fill="#f59e0b" />
                <path d="M 50,42 L 53,50 L 61,50 L 55,55 L 57,63 L 50,58 L 43,63 L 45,55 L 39,50 L 47,50 Z" fill="#ffffff" />
                <text x="50" y="85" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" letterSpacing="0.5">JAYA RAYA</text>
              </svg>
            </div>

            <h4 className="text-lg sm:text-2xl font-black text-amber-400 tracking-wider uppercase font-display drop-shadow-sm">
              STRUKTUR ORGANISASI
            </h4>
            <h5 className="text-base sm:text-xl font-extrabold text-white tracking-wide uppercase font-display mt-0.5">
              INTEGRASI LAYANAN PRIMER (ILP)
            </h5>
            <h6 className="text-sm sm:text-lg font-bold text-sky-300 tracking-normal mt-0.5">
              PUSKESMAS KEPULAUAN SERIBU SELATAN
            </h6>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black tracking-widest">
              TAHUN 2026
            </span>
          </div>

          {/* LEVEL 1: KEPALA PUSKESMAS (Pucuk Pimpinan) */}
          <div className="flex flex-col items-center relative mb-12">
            <div 
              onClick={() => handleEditClick(leader, undefined, true, false)}
              className={`group relative cursor-pointer p-4 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 ${
                isMatched(leader.name, leader.role) ? 'border-amber-400 shadow-xl shadow-amber-500/20' : 'border-slate-700 opacity-60'
              } hover:border-amber-300 hover:scale-[1.03] transition-all duration-200 flex flex-col items-center text-center w-72 backdrop-blur-md`}
            >
              {/* Leader Photo Avatar with Amber Ring */}
              <div className="relative w-24 h-24 mb-3 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-800 shadow-lg group-hover:ring-4 group-hover:ring-amber-400/30 transition-all">
                {leader.photo ? (
                  <img 
                    src={leader.photo} 
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-700 text-slate-300">
                    <User className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                  <Camera className="w-6 h-6 text-amber-300 drop-shadow" />
                </div>
              </div>

              {/* Leader Role Badge */}
              <span className="px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-1.5 shadow-xs">
                {leader.role}
              </span>

              <h5 className="font-extrabold text-sm text-white leading-snug">
                {leader.name}
              </h5>

              {leader.nip && (
                <p className="text-[11px] font-mono text-amber-200/90 mt-0.5">
                  NIP: {leader.nip}
                </p>
              )}

              {/* Hover Edit Hint */}
              <span className="mt-2 text-[10px] text-amber-300/70 group-hover:text-amber-300 flex items-center gap-1 font-semibold">
                <FileEdit className="w-3 h-3" />
                Klik untuk ganti foto / data
              </span>
            </div>

            {/* Vertical connector trunk */}
            <div className="w-1 h-10 bg-amber-400/80 mt-1"></div>

            {/* Horizontal branch bar spreading to all 5 clusters */}
            <div className="w-[94%] h-1 bg-amber-400/80 relative">
              {/* Connector drops to 5 columns */}
              <div className="absolute left-[10%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
              <div className="absolute left-[30%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
              <div className="absolute left-[50%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
              <div className="absolute left-[70%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
              <div className="absolute left-[90%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
            </div>
          </div>

          {/* LEVEL 2: THE 5 ILP CLUSTER COLUMNS */}
          <div className="grid grid-cols-5 gap-5 w-full pt-4">
            {clusters.map((cluster) => (
              <div key={cluster.id} className="flex flex-col items-center">
                {/* Column Cluster Header Pill */}
                <div className="w-full text-center mb-3">
                  <div className="p-2.5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-400/40 shadow-md">
                    <span className="block text-xs font-black text-amber-300 tracking-wide uppercase">
                      {cluster.title}
                    </span>
                    <span className="block text-[10px] text-slate-300 font-medium truncate mt-0.5">
                      {cluster.subtitle}
                    </span>
                  </div>
                </div>

                {/* Coordinator Card */}
                <div 
                  onClick={() => handleEditClick(cluster.coordinator, cluster.id, false, true)}
                  className={`group relative cursor-pointer w-full p-3 rounded-2xl bg-slate-800/90 border ${
                    isMatched(cluster.coordinator.name, cluster.coordinator.role)
                      ? 'border-sky-400 shadow-md shadow-sky-500/10'
                      : 'border-slate-700 opacity-60'
                  } hover:border-amber-400 hover:scale-[1.02] transition flex items-center gap-2.5 mb-4 text-left`}
                >
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-700 shrink-0 border border-amber-400/70 shadow-xs">
                    {cluster.coordinator.photo ? (
                      <img 
                        src={cluster.coordinator.photo} 
                        alt={cluster.coordinator.name}
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider text-amber-300 truncate max-w-full">
                      {cluster.coordinator.role}
                    </span>
                    <h6 className="text-xs font-bold text-white truncate group-hover:text-amber-200 transition">
                      {cluster.coordinator.name}
                    </h6>
                    <span className="text-[9px] text-slate-400 block group-hover:text-slate-300">
                      Koordinator Klaster
                    </span>
                  </div>
                </div>

                {/* Vertical line connecting coordinator to members */}
                <div className="w-0.5 h-3 bg-slate-600 mb-2"></div>

                {/* Cluster Sub-members Stack */}
                <div className="w-full space-y-2.5">
                  {cluster.members.map((member) => (
                    <div 
                      key={member.id}
                      onClick={() => handleEditClick(member, cluster.id, false, false)}
                      className={`group relative cursor-pointer p-2.5 rounded-xl bg-slate-850/80 border ${
                        isMatched(member.name, member.role)
                          ? 'border-slate-700 hover:border-amber-400'
                          : 'border-slate-800 opacity-50'
                      } hover:bg-slate-800 transition flex items-center gap-2.5 text-left`}
                    >
                      {/* Member Photo Avatar */}
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-slate-750 shrink-0 border border-slate-600 group-hover:border-amber-400 transition">
                        {member.photo ? (
                          <img 
                            src={member.photo} 
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Camera className="w-3 h-3 text-amber-300" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-sky-200 block truncate group-hover:text-amber-300 transition leading-tight">
                          {member.role}
                        </span>
                        <span className="text-[11px] font-medium text-white block truncate mt-0.5">
                          {member.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-6 border-t border-slate-800/80 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Pola tata kelola struktur Integrasi Layanan Primer (ILP) Puskesmas Kepulauan Seribu Selatan Tahun 2026.
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              Update Otomatis • Terhubung Faskes Kepulauan
            </span>
          </div>
        </div>
      </div>
      </>
      )}

      {/* PHOTO & DETAIL EDITING MODAL ("dapat dimasukan foto") */}
      {activeEditingPerson && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="font-black text-slate-900 text-base font-display">
                  Perbarui Foto & Data Pejabat
                </h4>
              </div>
              <button
                onClick={() => setActiveEditingPerson(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-4">
              {/* Photo Preview & Upload Controls */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-blue-600 shrink-0 shadow-md">
                  {tempPhotoUrl ? (
                    <img 
                      src={tempPhotoUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <User className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto Baru</span>
                  </button>
                  <p className="text-[10px] text-slate-500">
                    Format JPG, PNG atau WebP (Maks 3MB). Foto akan langsung disimpan.
                  </p>
                </div>
              </div>

              {/* Or Direct Image URL input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Atau URL Foto (Web Link):
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={tempPhotoUrl}
                  onChange={(e) => setTempPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Editable Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap & Gelar:
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Editable Role */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jabatan / Penugasan:
                </label>
                <input
                  type="text"
                  value={tempRole}
                  onChange={(e) => setTempRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Editable NIP (especially for leader) */}
              {activeEditingPerson.isLeader && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NIP:
                  </label>
                  <input
                    type="text"
                    value={tempNip}
                    onChange={(e) => setTempNip(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-6 border-t border-slate-100 mt-5">
              <button
                type="button"
                onClick={() => setActiveEditingPerson(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSavePerson}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Foto & Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
