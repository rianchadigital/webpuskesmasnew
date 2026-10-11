import React, { useState, useEffect, useRef } from 'react';
import { initialOrgLeader } from '../data/initialData';
import { OrgPerson } from '../types';
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
  FileText,
  Shield,
  Layers,
  Sparkles,
  MapPin,
  Stethoscope,
  Heart,
  Activity,
  Users
} from 'lucide-react';

const STORAGE_KEY_PERGUB14 = 'puskesmas_org_pergub14_data_v1';
const PERGUB14_DRIVE_ID = '1IMRc04HIo3QhOGZXbRHUlQ-P1dRGusZN';
const PERGUB14_PREVIEW_URL = `https://drive.google.com/file/d/${PERGUB14_DRIVE_ID}/preview`;
const PERGUB14_SHARE_URL = `https://drive.google.com/file/d/${PERGUB14_DRIVE_ID}/view?usp=sharing`;

const ILP_DRIVE_ID = '1hNK4UL5swEImzx3mmknDWFIUWb_Kgc0W';
const ILP_PREVIEW_URL = `https://drive.google.com/file/d/${ILP_DRIVE_ID}/preview`;
const ILP_SHARE_URL = `https://drive.google.com/file/d/${ILP_DRIVE_ID}/view?usp=sharing`;

export interface PergubUnit {
  id: string;
  title: string;
  code: string;
  coordinator: OrgPerson;
  items: OrgPerson[];
  colorTheme: string;
  description: string;
}

const initialPergubUnits: PergubUnit[] = [
  {
    id: 'subbag-tu',
    title: 'Subbagian Tata Usaha (Subbag TU)',
    code: 'TATA USAHA',
    colorTheme: 'from-blue-700 to-indigo-900 border-blue-400',
    description: 'Pengelolaan kepegawaian, keuangan BLUD, umum, perlengkapan, aset/BMD, SP3/SIMPUS dan pelaporan',
    coordinator: {
      id: 'tu-head',
      role: 'Kepala Subbagian Tata Usaha',
      name: 'Saeful Muslimin, SKM',
      nip: '19790814 200604 1 008',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    items: [
      {
        id: 'tu-1',
        role: 'Urusan Kepegawaian & Diklat',
        name: 'Pipit Apriyani, A.Md.Kep',
        nip: '19880412 201101 2 015',
        photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'tu-2',
        role: 'Urusan Keuangan & Akuntansi BLUD',
        name: 'Jamaludin, Amkg',
        nip: '19840618 200801 1 012',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'tu-3',
        role: 'Urusan Umum, Rumah Tangga & Aset/BMD',
        name: 'Jajul Karomi, A.Md.Kep',
        nip: '19830925 200902 1 004',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'tu-4',
        role: 'Urusan Perencanaan, Pelaporan & SP3/SIMPUS',
        name: 'Defry Dwi Bastanta, Amd. Rad',
        nip: '19920105 201503 1 002',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'satpel-ukm',
    title: 'Satpel Upaya Kesehatan Masyarakat (Satpel UKM)',
    code: 'UKM KEPULAUAN',
    colorTheme: 'from-emerald-700 to-teal-900 border-emerald-400',
    description: 'Pelayanan promotif dan preventif, kesehatan lingkungan pulau, gizi, KIA-KB komunitas dan P2P',
    coordinator: {
      id: 'ukm-head',
      role: 'Kepala Satuan Pelaksana UKM',
      name: 'Masriyah, SKM',
      nip: '19810214 200501 2 007',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    },
    items: [
      {
        id: 'ukm-1',
        role: 'Promosi Kesehatan & UKS',
        name: 'Assya Zazhilla, S.K.M',
        nip: '19940612 201903 2 011',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukm-2',
        role: 'Kesehatan Lingkungan & Sanitasi Bahari',
        name: 'M. Iqbal, S.Tr.Kes',
        nip: '19910319 201402 1 003',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukm-3',
        role: 'Pencegahan & Pengendalian Penyakit (P2P)',
        name: 'Sunarti, A.Md.Keb',
        nip: '19870504 201001 2 018',
        photo: 'https://images.unsplash.com/photo-1594824813593-1b91bc706eb8?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukm-4',
        role: 'Gizi Masyarakat & Pencegahan Stunting',
        name: 'Sri Mega, S.Tr.Keb',
        nip: '19900820 201212 2 005',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukm-5',
        role: 'Keperawatan Kesehatan Masyarakat (Perkesmas)',
        name: 'Ns. Ahmad Fauzi, S.Kep',
        nip: '19890915 201403 1 004',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'satpel-ukp',
    title: 'Satpel Upaya Kesehatan Perorangan (Satpel UKP)',
    code: 'UKP, FARMASI & LAB',
    colorTheme: 'from-rose-700 to-red-950 border-rose-400',
    description: 'Rawat jalan kuratif, IGD 24 Jam, KIA klinis, farmasi, laboratorium dan transportasi rujukan ambulans kapal',
    coordinator: {
      id: 'ukp-head',
      role: 'Kepala Satuan Pelaksana UKP',
      name: 'dr. Tri Wahyu Ningrum',
      nip: '19860417 201101 2 021',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80'
    },
    items: [
      {
        id: 'ukp-1',
        role: 'Pelayanan Pemeriksaan Umum & Lansia',
        name: 'dr. Ambro Henri Sihite',
        nip: '19900115 201701 1 002',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukp-2',
        role: 'Pelayanan Kesehatan Gigi & Mulut',
        name: 'drg. Putri Ajri Mawadara',
        nip: '19930722 201802 2 006',
        photo: 'https://images.unsplash.com/photo-1594824813593-1b91bc706eb8?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukp-3',
        role: 'Instalasi Gawat Darurat (IGD) & Tindakan 24 Jam',
        name: 'Ns. Hendra Wijaya, S.Kep',
        nip: '19871109 201001 1 014',
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukp-4',
        role: 'Pelayanan Kefarmasian & Gudang Obat',
        name: 'apt. Nurul Hidayah, S.Farm',
        nip: '19920511 201503 2 008',
        photo: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukp-5',
        role: 'Pelayanan Laboratorium Sederhana',
        name: 'Siti Rahmah, A.Md.AK',
        nip: '19931018 201602 2 009',
        photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'ukp-6',
        role: 'Transportasi Rujukan Ambulans Laut',
        name: 'Budi Santoso (Kapten Kapal Medis)',
        nip: '19820415 200902 1 006',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'satpel-pustu',
    title: 'Satpel Puskesmas Pembantu (Pustu Wilayah Pulau)',
    code: 'FASKES KEPULAUAN',
    colorTheme: 'from-cyan-700 to-blue-950 border-cyan-400',
    description: 'Jejaring pelayanan kesehatan primer di pulau pemukiman gugusan Kepulauan Seribu Selatan',
    coordinator: {
      id: 'pustu-coord',
      role: 'Koordinator Pelayanan Faskes Pulau',
      name: 'dr. Ignatius Dendy Purnama',
      nip: '198503222010012031',
      photo: '/assets/kepala-puskesmas.svg'
    },
    items: [
      {
        id: 'pustu-1',
        role: 'Puskesmas Pembantu (Pustu) Pulau Pari',
        name: 'Penanggung Jawab Pustu P. Pari',
        nip: 'Siaga Layanan Medis',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'pustu-2',
        role: 'Puskesmas Pembantu (Pustu) Pulau Lancang',
        name: 'Penanggung Jawab Pustu P. Lancang',
        nip: 'Siaga Layanan Medis',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'pustu-3',
        role: 'Puskesmas Pembantu (Pustu) Pulau Untung Jawa',
        name: 'Penanggung Jawab Pustu P. Untung Jawa',
        nip: 'Siaga Layanan Medis',
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'pustu-4',
        role: 'Pos Kesehatan (Poskes) Pulau Payung',
        name: 'Petugas Nakes Siaga P. Payung',
        nip: 'Pelayanan Pusling & Poskes',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export const OrganizationChart: React.FC = () => {
  const { openServiceDoc } = useData();

  const [leader, setLeader] = useState<OrgPerson>(() => {
    const customHeadPhoto = localStorage.getItem('puskesmas_head_photo');
    const saved = localStorage.getItem(STORAGE_KEY_PERGUB14);
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
      photo: customHeadPhoto || initialOrgLeader.photo || '/assets/kepala-puskesmas.svg'
    };
  });

  const [pergubUnits, setPergubUnits] = useState<PergubUnit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PERGUB14);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.pergubUnits) return parsed.pergubUnits;
      } catch {
        // fallback
      }
    }
    return initialPergubUnits;
  });

  // Controls & View States
  const [activeTabMode, setActiveTabMode] = useState<'pergub14-visual' | 'pergub14-pdf' | 'ilp-pdf'>('pergub14-visual');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pdfLoading, setPdfLoading] = useState<boolean>(true);

  // Edit Person Modal State
  const [activeEditingPerson, setActiveEditingPerson] = useState<{
    person: OrgPerson;
    unitId?: string;
    isLeader?: boolean;
    isCoordinator?: boolean;
  } | null>(null);

  const [tempPhotoUrl, setTempPhotoUrl] = useState<string>('');
  const [tempName, setTempName] = useState<string>('');
  const [tempRole, setTempRole] = useState<string>('');
  const [tempNip, setTempNip] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const saveToStorage = (newLeader: OrgPerson, newUnits: PergubUnit[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_PERGUB14, JSON.stringify({
        leader: newLeader,
        pergubUnits: newUnits
      }));
    } catch {
      // ignore
    }
  };

  const handleEditClick = (
    person: OrgPerson, 
    unitId?: string, 
    isLeader = false, 
    isCoordinator = false
  ) => {
    setActiveEditingPerson({ person, unitId, isLeader, isCoordinator });
    setTempPhotoUrl(person.photo || '');
    setTempName(person.name);
    setTempRole(person.role);
    setTempNip(person.nip || '');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    const { unitId, isLeader, isCoordinator } = activeEditingPerson;

    if (isLeader) {
      const updatedLeader: OrgPerson = {
        ...leader,
        name: tempName,
        role: tempRole,
        nip: tempNip,
        photo: tempPhotoUrl
      };
      setLeader(updatedLeader);
      saveToStorage(updatedLeader, pergubUnits);
      triggerToast('Data Kepala Puskesmas berhasil diperbarui!');
    } else if (unitId) {
      const updatedUnits = pergubUnits.map(unit => {
        if (unit.id !== unitId) return unit;

        if (isCoordinator) {
          return {
            ...unit,
            coordinator: {
              ...unit.coordinator,
              name: tempName,
              role: tempRole,
              nip: tempNip,
              photo: tempPhotoUrl
            }
          };
        } else {
          return {
            ...unit,
            items: unit.items.map(p => {
              if (p.id !== activeEditingPerson.person.id) return p;
              return {
                ...p,
                name: tempName,
                role: tempRole,
                nip: tempNip,
                photo: tempPhotoUrl
              };
            })
          };
        }
      });
      setPergubUnits(updatedUnits);
      saveToStorage(leader, updatedUnits);
      triggerToast('Data pejabat / staf berhasil diperbarui!');
    }

    setActiveEditingPerson(null);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan bagan struktur organisasi ke susunan resmi Pergub DKI No. 14?')) {
      localStorage.removeItem(STORAGE_KEY_PERGUB14);
      setLeader(initialOrgLeader);
      setPergubUnits(initialPergubUnits);
      triggerToast('Bagan berhasil dikembalikan ke standar awal Pergub DKI No. 14.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isMatched = (name: string, role: string) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || role.toLowerCase().includes(q);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Info & Main Mode Switcher */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold uppercase tracking-wider border border-blue-300">
              <Building2 className="w-3.5 h-3.5 text-blue-700" />
              Pergub DKI Jakarta No. 14
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Organisasi &amp; Tata Kerja Pusat Kesehatan Masyarakat
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Bagan Struktur Organisasi Pergub DKI No. 14
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Struktur kelembagaan resmi Puskesmas Kepulauan Seribu Selatan sesuai Peraturan Gubernur DKI Jakarta Nomor 14 dan dokumen berkas Google Drive resmi.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold gap-1 w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTabMode('pergub14-visual')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                activeTabMode === 'pergub14-visual'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Bagan Visual Pergub 14</span>
            </button>

            <button
              onClick={() => {
                setActiveTabMode('pergub14-pdf');
                setPdfLoading(true);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                activeTabMode === 'pergub14-pdf'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>PDF Pergub 14 (Drive)</span>
            </button>

            <button
              onClick={() => {
                setActiveTabMode('ilp-pdf');
                setPdfLoading(true);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                activeTabMode === 'ilp-pdf'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dokumen ILP (Drive)</span>
            </button>
          </div>

          <a
            href={PERGUB14_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition"
            title="Buka Dokumen PDF Pergub DKI 14 di Google Drive"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Drive Pergub 14</span>
          </a>
        </div>
      </div>

      {/* ================= TAB 1: PDF PERGUB DKI 14 (GOOGLE DRIVE) ================= */}
      {activeTabMode === 'pergub14-pdf' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">
                Dokumen Resmi: Struktur Organisasi Pergub DKI Jakarta Nomor 14
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700 font-mono">
                ID: {PERGUB14_DRIVE_ID}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openServiceDoc('struktur-pergub14')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition text-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Modal Layar Penuh</span>
              </button>

              <a
                href={PERGUB14_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka di Google Drive</span>
              </a>
            </div>
          </div>

          <div className="relative w-full h-[780px] bg-slate-900">
            {pdfLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-slate-300 gap-3">
                <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-semibold text-blue-300">
                  Memuat berkas PDF Struktur Pergub DKI 14 dari Google Drive...
                </p>
                <p className="text-[11px] text-slate-500">ID Drive: {PERGUB14_DRIVE_ID}</p>
              </div>
            )}
            <iframe
              src={PERGUB14_PREVIEW_URL}
              title="Dokumen Bagan Struktur Pergub DKI 14"
              className="w-full h-full border-0 block"
              allow="autoplay"
              onLoad={() => setPdfLoading(false)}
            />
          </div>
        </div>
      )}

      {/* ================= TAB 2: PDF ILP 2026 (GOOGLE DRIVE) ================= */}
      {activeTabMode === 'ilp-pdf' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">
                Dokumen Resmi: Struktur Organisasi Integrasi Layanan Primer (ILP)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-teal-900/60 text-teal-300 border border-teal-700 font-mono">
                ID: {ILP_DRIVE_ID}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openServiceDoc('struktur-ilp')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition text-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Modal Layar Penuh</span>
              </button>

              <a
                href={ILP_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka di Google Drive</span>
              </a>
            </div>
          </div>

          <div className="relative w-full h-[780px] bg-slate-900">
            {pdfLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-slate-300 gap-3">
                <div className="w-10 h-10 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-semibold text-teal-300">
                  Memuat berkas PDF Struktur ILP dari Google Drive...
                </p>
              </div>
            )}
            <iframe
              src={ILP_PREVIEW_URL}
              title="Dokumen Bagan Struktur Organisasi ILP"
              className="w-full h-full border-0 block"
              allow="autoplay"
              onLoad={() => setPdfLoading(false)}
            />
          </div>
        </div>
      )}

      {/* ================= TAB 3: BAGAN STRUKTUR VISUAL PERGUB DKI 14 ================= */}
      {activeTabMode === 'pergub14-visual' && (
        <>
          {/* Action Bar (Zoom, Search, Fullscreen, Print) */}
          <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="relative flex-1 sm:w-72 max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pejabat, satpel, atau staf..."
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
                  title="Reset Skala 100%"
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
                title="Cetak Bagan"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cetak</span>
              </button>

              <button
                onClick={handleResetToDefault}
                className="text-[11px] text-slate-500 hover:text-rose-600 underline font-semibold px-1"
                title="Kembalikan data ke standar awal"
              >
                Reset Default
              </button>
            </div>
          </div>

          {/* Canvas Bagan Hirarki Pergub 14 */}
          <div 
            ref={chartContainerRef}
            className={`bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-x-auto print:bg-white print:text-slate-900 print:p-0 print:border-none print:shadow-none ${
              isFullscreen ? 'fixed inset-0 z-50 rounded-none overflow-y-auto' : ''
            }`}
          >
            {isFullscreen && (
              <div className="sticky top-4 right-4 flex justify-end z-40 mb-4">
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 hover:bg-rose-500"
                >
                  <X className="w-4 h-4" />
                  <span>Tutup Layar Penuh</span>
                </button>
              </div>
            )}

            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }} 
              className="transition-transform duration-200 min-w-[1240px] flex flex-col items-center"
            >
              {/* Header Emblem Jaya Raya DKI Jakarta */}
              <div className="text-center mb-8 flex flex-col items-center">
                <div className="w-16 h-16 mb-2 flex items-center justify-center p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                  <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm" fill="none">
                    <path d="M 50,5 L 85,25 L 85,85 C 85,105 50,115 50,115 C 50,115 15,105 15,85 L 15,25 Z" fill="#b91c1c" stroke="#f59e0b" strokeWidth="3" />
                    <path d="M 50,15 L 75,30 L 75,75 C 75,90 50,100 50,100 C 50,100 25,90 25,75 L 25,30 Z" fill="#1e3a8a" />
                    <circle cx="50" cy="55" r="18" fill="#f59e0b" />
                    <path d="M 50,42 L 53,50 L 61,50 L 55,55 L 57,63 L 50,58 L 43,63 L 45,55 L 39,50 L 47,50 Z" fill="#ffffff" />
                    <text x="50" y="85" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" letterSpacing="0.5">JAYA RAYA</text>
                  </svg>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-black tracking-widest uppercase mb-1">
                  PERATURAN GUBERNUR PROVINSI DKI JAKARTA NOMOR 14
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-display drop-shadow-sm">
                  BAGAN STRUKTUR ORGANISASI &amp; TATA KERJA
                </h4>
                <h5 className="text-base sm:text-lg font-extrabold text-sky-300 tracking-normal mt-0.5">
                  PUSKESMAS KEPULAUAN SERIBU SELATAN
                </h5>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pemprov DKI Jakarta • Dinas Kesehatan Provinsi DKI Jakarta • Suku Dinas Kesehatan Kepulauan Seribu
                </p>
              </div>

              {/* LEVEL 1: KEPALA PUSKESMAS KECAMATAN */}
              <div className="flex flex-col items-center relative mb-12">
                <div 
                  onClick={() => handleEditClick(leader, undefined, true, false)}
                  className={`group relative cursor-pointer p-4 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 ${
                    isMatched(leader.name, leader.role) ? 'border-amber-400 shadow-xl shadow-amber-500/20' : 'border-slate-700 opacity-60'
                  } hover:border-amber-300 hover:scale-[1.03] transition-all duration-200 flex flex-col items-center text-center w-80 backdrop-blur-md`}
                >
                  {/* Photo Avatar */}
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

                  <span className="px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-1.5 shadow-xs">
                    {leader.role}
                  </span>

                  <h5 className="font-extrabold text-base text-white leading-snug">
                    {leader.name}
                  </h5>

                  {leader.nip && (
                    <p className="text-[11px] font-mono text-amber-200/90 mt-0.5">
                      NIP: {leader.nip}
                    </p>
                  )}

                  <span className="mt-2 text-[10px] text-amber-300/80 group-hover:text-amber-300 flex items-center gap-1 font-semibold">
                    <FileEdit className="w-3 h-3" />
                    Klik untuk ganti data / foto
                  </span>
                </div>

                {/* Trunk Down Connector */}
                <div className="w-1 h-10 bg-amber-400/80 mt-1"></div>

                {/* Main Horizontal Branch distributing to the 4 main units of Pergub 14 */}
                <div className="w-[92%] h-1 bg-amber-400/80 relative">
                  <div className="absolute left-[12.5%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
                  <div className="absolute left-[37.5%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
                  <div className="absolute left-[62.5%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
                  <div className="absolute left-[87.5%] -bottom-4 w-0.5 h-4 bg-amber-400"></div>
                </div>
              </div>

              {/* LEVEL 2: THE 4 MAIN COLUMNS OF PERGUB 14 */}
              <div className="grid grid-cols-4 gap-6 w-full pt-4">
                {pergubUnits.map((unit) => (
                  <div key={unit.id} className="flex flex-col items-center">
                    {/* Unit Header Badge */}
                    <div className="w-full text-center mb-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-r ${unit.colorTheme} shadow-md border`}>
                        <span className="block text-[10px] text-amber-300 font-black tracking-widest uppercase">
                          {unit.code}
                        </span>
                        <h6 className="text-xs font-bold text-white tracking-wide mt-0.5">
                          {unit.title}
                        </h6>
                        <p className="text-[10px] text-slate-300 font-medium leading-relaxed mt-1">
                          {unit.description}
                        </p>
                      </div>
                    </div>

                    {/* Unit Coordinator Card */}
                    <div 
                      onClick={() => handleEditClick(unit.coordinator, unit.id, false, true)}
                      className={`group relative cursor-pointer w-full p-3 rounded-2xl bg-slate-900 border ${
                        isMatched(unit.coordinator.name, unit.coordinator.role) ? 'border-amber-400/90 shadow-md' : 'border-slate-800 opacity-60'
                      } hover:border-amber-300 hover:bg-slate-850 transition-all flex items-center gap-3 mb-4`}
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-400/60 shrink-0 bg-slate-800">
                        {unit.coordinator.photo ? (
                          <img 
                            src={unit.coordinator.photo} 
                            alt={unit.coordinator.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <User className="w-6 h-6" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                          <Camera className="w-4 h-4 text-amber-300" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black uppercase text-amber-400 block truncate">
                          {unit.coordinator.role}
                        </span>
                        <h6 className="text-xs font-bold text-white truncate">
                          {unit.coordinator.name}
                        </h6>
                        {unit.coordinator.nip && (
                          <span className="text-[9px] font-mono text-slate-400 block truncate">
                            NIP: {unit.coordinator.nip}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Sub-items Line & List */}
                    <div className="w-0.5 h-3 bg-slate-700 mb-2"></div>

                    <div className="w-full space-y-2">
                      {unit.items.map((person) => {
                        const matched = isMatched(person.name, person.role);
                        return (
                          <div 
                            key={person.id}
                            onClick={() => handleEditClick(person, unit.id, false, false)}
                            className={`group relative cursor-pointer p-2.5 rounded-xl bg-slate-800/80 border ${
                              matched ? 'border-slate-700 hover:border-blue-400 hover:bg-slate-800' : 'border-slate-800/40 opacity-40'
                            } transition-all flex items-center gap-2.5`}
                          >
                            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-600 shrink-0 bg-slate-700">
                              {person.photo ? (
                                <img 
                                  src={person.photo} 
                                  alt={person.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <User className="w-4 h-4" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                                <Camera className="w-3.5 h-3.5 text-blue-300" />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0 text-left">
                              <span className="text-[9px] font-semibold text-slate-300 block truncate">
                                {person.role}
                              </span>
                              <h6 className="text-[11px] font-bold text-white truncate group-hover:text-amber-300 transition">
                                {person.name}
                              </h6>
                              {person.nip && (
                                <span className="text-[9px] font-mono text-slate-400 block truncate">
                                  {person.nip}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* LEVEL 3: KELOMPOK JABATAN FUNGSIONAL NAKES (BOTTOM FOOTER TRAY) */}
              <div className="w-full mt-10 pt-6 border-t border-slate-800/80">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-sky-400 shrink-0">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-white uppercase tracking-wider">
                        Kelompok Jabatan Fungsional Tenaga Kesehatan (Pergub DKI 14)
                      </h6>
                      <p className="text-[11px] text-slate-400">
                        Dokter Umum • Dokter Gigi • Perawat • Bidan • Sanitarian • Nutrisionis • Apoteker • ATLM • Perekam Medis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openServiceDoc('struktur-pergub14')}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat PDF Dokumen Pergub 14</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      {/* ================= MODAL EDIT PERSON / NAKES ================= */}
      {activeEditingPerson && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 text-white animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm text-white">
                  Edit Data &amp; Foto Pejabat / Staf
                </h4>
              </div>
              <button 
                onClick={() => setActiveEditingPerson(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview & Upload Controls */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-800 shadow-inner">
                {tempPhotoUrl ? (
                  <img 
                    src={tempPhotoUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah Foto (JPG/PNG)</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />

                {tempPhotoUrl && (
                  <button
                    type="button"
                    onClick={() => setTempPhotoUrl('')}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-400 text-xs transition"
                    title="Hapus Foto"
                  >
                    Hapus
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                Maksimal ukuran file 3MB. Foto otomatis disimpan ke penyimpanan lokal browser.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap &amp; Gelar:</label>
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Jabatan / Satuan Pelaksana:</label>
                <input 
                  type="text" 
                  value={tempRole} 
                  onChange={(e) => setTempRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">NIP (Nomor Induk Pegawai):</label>
                <input 
                  type="text" 
                  value={tempNip} 
                  onChange={(e) => setTempNip(e.target.value)}
                  placeholder="Contoh: 19850322 201001 2 031"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveEditingPerson(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSavePerson}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
