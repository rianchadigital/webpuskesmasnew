import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { SDMKItem } from '../../types';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  RotateCw, 
  CheckCircle2, 
  CloudUpload, 
  Search, 
  Filter, 
  Building2, 
  Stethoscope, 
  Award,
  Layers,
  MapPin,
  Check
} from 'lucide-react';

interface Props {
  onSuccessToast?: (msg: string) => void;
}

export const AdminStaffDataTab: React.FC<Props> = ({ onSuccessToast }) => {
  const { sdmkData, updateSDMKData, addSDMKItem, updateSDMKItem, deleteSDMKItem, syncSDMKToGAS } = useData();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Edit or Add Modal
  const [activeEditingItem, setActiveEditingItem] = useState<{
    item: SDMKItem;
    isNew?: boolean;
  } | null>(null);

  const categories = [
    'Semua',
    'Tenaga Medis',
    'Tenaga Keperawatan',
    'Tenaga Kebidanan',
    'Tenaga Kefarmasian',
    'Tenaga Biomedis & Lab',
    'Tenaga Gizi',
    'Tenaga Kesmas & Lingkungan',
    'Tenaga Keteknisian Medis',
    'Tenaga Administrasi & Penunjang'
  ];

  // Summary calculations for 5 kepegawaian statuses
  const totalEksisting = useMemo(() => sdmkData.reduce((acc, curr) => acc + (Number(curr.jumlahEksisting) || 0), 0), [sdmkData]);
  const totalABK = useMemo(() => sdmkData.reduce((acc, curr) => acc + (Number(curr.standarABK) || 0), 0), [sdmkData]);
  const totalPNS = useMemo(() => sdmkData.reduce((acc, curr) => acc + (Number(curr.statusPNS) || 0), 0), [sdmkData]);
  const totalPPPK = useMemo(() => sdmkData.reduce((acc, curr) => acc + (Number(curr.statusPPPK) || 0), 0), [sdmkData]);
  const totalPPPKPW = useMemo(() => sdmkData.reduce((acc, curr) => acc + (Number(curr.statusPPPKPW) || 0), 0), [sdmkData]);
  const totalNonPNS = useMemo(() => sdmkData.reduce((acc, curr) => acc + (Number(curr.statusNonPNS) || 0), 0), [sdmkData]);
  const totalPJLP = useMemo(() => sdmkData.reduce((acc, curr) => acc + (Number(curr.statusPJLP) || 0), 0), [sdmkData]);

  // Filtered
  const filteredData = useMemo(() => {
    return sdmkData.filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.kategori === selectedCategory;
      const matchSearch = 
        item.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kualifikasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [sdmkData, selectedCategory, searchQuery]);

  const handleSyncToSpreadsheet = async () => {
    setIsSyncing(true);
    setSyncStatus('Menyinkronkan data formasi SDM ke Google Spreadsheet...');
    try {
      const res = await syncSDMKToGAS();
      if (res.success) {
        setSyncStatus('Data SDM berhasil disinkronkan ke Spreadsheet!');
        if (onSuccessToast) onSuccessToast('Data formasi SDM berhasil disinkronkan ke Google Spreadsheet!');
      } else {
        setSyncStatus(res.message || 'Gagal menyimpan ke Spreadsheet. Pastikan URL GAS sudah disetel.');
      }
    } catch (err: any) {
      setSyncStatus(`Gagal sync: ${err.message || 'Koneksi terputus'}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatus(null), 4000);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEditingItem) return;

    const { statusPNS, statusPPPK, statusPPPKPW, statusNonPNS, statusPJLP, jumlahEksisting } = activeEditingItem.item;
    const totalStatus = (Number(statusPNS) || 0) + (Number(statusPPPK) || 0) + (Number(statusPPPKPW) || 0) + (Number(statusNonPNS) || 0) + (Number(statusPJLP) || 0);
    const eksisting = Number(jumlahEksisting) || 0;

    if (totalStatus !== eksisting) {
      alert(`Peringatan Validasi Status Kepegawaian:\n\nTotal Rincian Status (${totalStatus}) TIDAK SAMA dengan Jumlah Eksisting (${eksisting}).\n\nKetentuan: Total rincian (PNS + PPPK + PPPK PW + NON PNS + PJLP) harus tepat sama dengan Jumlah Eksisting!`);
      return;
    }

    const payloadItem: SDMKItem = {
      ...activeEditingItem.item,
      jumlahEksisting: eksisting,
      statusPNS: Number(statusPNS) || 0,
      statusPPPK: Number(statusPPPK) || 0,
      statusPPPKPW: Number(statusPPPKPW) || 0,
      statusNonPNS: Number(statusNonPNS) || 0,
      statusPJLP: Number(statusPJLP) || 0,
      statusNonASN: (Number(statusNonPNS) || 0) + (Number(statusPJLP) || 0)
    };

    if (activeEditingItem.isNew) {
      addSDMKItem(payloadItem);
      if (onSuccessToast) onSuccessToast('Formasi SDM baru berhasil ditambahkan!');
    } else {
      updateSDMKItem(payloadItem.id, payloadItem);
      if (onSuccessToast) onSuccessToast('Data formasi SDM berhasil diperbarui!');
    }

    setActiveEditingItem(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus formasi jabatan "${name}"?`)) {
      deleteSDMKItem(id);
      if (onSuccessToast) onSuccessToast(`Formasi jabatan "${name}" telah dihapus.`);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl border border-blue-800/40">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            Backend Pengisian Data SDM &amp; Nakes
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Pengelolaan Data Formasi SDM Kesehatan
          </h3>
          <p className="text-xs text-blue-200/90 max-w-2xl">
            Perbarui data formasi pegawai, perbandingan standar ABK vs eksisting, rincian 5 status kepegawaian (PNS, PPPK, PPPK PW, NON PNS, PJLP — Total harus sama dengan Eksisting), serta penempatan wilayah pulau.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveEditingItem({
              isNew: true,
              item: {
                id: `sdmk-${Date.now()}`,
                jabatan: '',
                kategori: 'Tenaga Medis',
                kualifikasi: '',
                standarABK: 1,
                jumlahEksisting: 1,
                statusPNS: 1,
                statusPPPK: 0,
                statusPPPKPW: 0,
                statusNonPNS: 0,
                statusPJLP: 0,
                statusNonASN: 0,
                lokasiPuskesmasInduk: 1,
                lokasiPustuLancang: 0,
                lokasiPustuPari: 0,
                lokasiPustuUntungJawa: 0,
                keterangan: 'Terpenuhi 100%'
              }
            })}
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Formasi SDM</span>
          </button>

          <button
            onClick={handleSyncToSpreadsheet}
            disabled={isSyncing}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSyncing ? (
              <RotateCw className="w-4 h-4 animate-spin" />
            ) : (
              <CloudUpload className="w-4 h-4 text-emerald-200" />
            )}
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron ke Spreadsheet (GAS)'}</span>
          </button>
        </div>
      </div>

      {syncStatus && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Summary KPI Cards - 5 Rincian Status Kepegawaian */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <div className="p-3 rounded-2xl bg-white border border-blue-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Eksisting</span>
          <span className="text-lg sm:text-xl font-black text-blue-700">{totalEksisting} Orang</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Standar ABK</span>
          <span className="text-lg sm:text-xl font-black text-slate-800">{totalABK} Formasi</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-emerald-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-emerald-700 block">Status PNS</span>
          <span className="text-lg sm:text-xl font-black text-emerald-700">{totalPNS} Orang</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-indigo-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-indigo-700 block">Status PPPK</span>
          <span className="text-lg sm:text-xl font-black text-indigo-700">{totalPPPK} Orang</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-teal-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-teal-700 block">PPPK PW</span>
          <span className="text-lg sm:text-xl font-black text-teal-700">{totalPPPKPW} Orang</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-amber-700 block">NON PNS</span>
          <span className="text-lg sm:text-xl font-black text-amber-700">{totalNonPNS} Orang</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-purple-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-purple-700 block">Status PJLP</span>
          <span className="text-lg sm:text-xl font-black text-purple-700">{totalPJLP} Orang</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari formasi jabatan, kualifikasi, atau spesialisasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SDMK Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-black text-[10px]">
              <tr>
                <th className="px-3 py-3 text-center">No</th>
                <th className="px-4 py-3">Jabatan &amp; Profesi</th>
                <th className="px-3 py-3">Kategori</th>
                <th className="px-4 py-3">Kualifikasi</th>
                <th className="px-3 py-3 text-center">ABK</th>
                <th className="px-3 py-3 text-center bg-blue-50 text-blue-900 font-extrabold">Eksisting</th>
                <th className="px-3 py-3 text-center">Rincian Status (PNS / PPPK / PW / Non / PJLP)</th>
                <th className="px-3 py-3 text-center">Alokasi Pulau</th>
                <th className="px-3 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    Tidak ada formasi SDM yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => {
                  const pns = Number(item.statusPNS) || 0;
                  const pppk = Number(item.statusPPPK) || 0;
                  const pw = Number(item.statusPPPKPW) || 0;
                  const nonPns = Number(item.statusNonPNS) || 0;
                  const pjlp = Number(item.statusPJLP) || 0;
                  const sumStatus = pns + pppk + pw + nonPns + pjlp;
                  const eksisting = Number(item.jumlahEksisting) || 0;
                  const isMatch = sumStatus === eksisting;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-3 py-3 text-center font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-extrabold text-slate-900 block">{item.jabatan}</span>
                        <span className="text-[10px] text-slate-500 truncate block mt-0.5">{item.keterangan}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold whitespace-nowrap">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-medium text-[11px]">
                        {item.kualifikasi}
                      </td>
                      <td className="px-3 py-3 text-center font-bold text-slate-500">
                        {item.standarABK}
                      </td>
                      <td className="px-3 py-3 text-center font-black bg-blue-50/50 text-blue-800">
                        {item.jumlahEksisting}
                      </td>
                      <td className="px-3 py-3 text-center font-mono text-[11px] whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200" title="PNS">
                            PNS:{pns}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200" title="PPPK">
                            PPPK:{pppk}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 font-bold border border-teal-200" title="PPPK PW">
                            PW:{pw}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200" title="NON PNS">
                            Non:{nonPns}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-bold border border-purple-200" title="PJLP">
                            PJLP:{pjlp}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-center gap-1 text-[10px]">
                          {isMatch ? (
                            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Total Status: {sumStatus} (Sesuai)
                            </span>
                          ) : (
                            <span className="text-rose-600 font-bold bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                              ⚠️ Total {sumStatus} ≠ Eksisting {eksisting}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center text-[10px] font-mono text-slate-600 whitespace-nowrap">
                        Tdg:{item.lokasiPuskesmasInduk} • Lcg:{item.lokasiPustuLancang} • Pari:{item.lokasiPustuPari} • UJ:{item.lokasiPustuUntungJawa}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setActiveEditingItem({ isNew: false, item: { ...item } })}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                            title="Edit Formasi"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.jabatan)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ADD / EDIT SDM ================= */}
      {activeEditingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-base text-slate-900">
                {activeEditingItem.isNew ? 'Tambah Formasi SDM Baru' : 'Edit Formasi SDM'}
              </h4>
              <button
                onClick={() => setActiveEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Jabatan / Profesi:</label>
                  <input
                    type="text"
                    required
                    value={activeEditingItem.item.jabatan}
                    onChange={(e) => setActiveEditingItem({
                      ...activeEditingItem,
                      item: { ...activeEditingItem.item, jabatan: e.target.value }
                    })}
                    placeholder="Contoh: Dokter Umum, Perawat Ners"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Nakes:</label>
                  <select
                    value={activeEditingItem.item.kategori}
                    onChange={(e) => setActiveEditingItem({
                      ...activeEditingItem,
                      item: { ...activeEditingItem.item, kategori: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.filter(c => c !== 'Semua').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kualifikasi Pendidikan &amp; Sertifikasi:</label>
                <input
                  type="text"
                  required
                  value={activeEditingItem.item.kualifikasi}
                  onChange={(e) => setActiveEditingItem({
                    ...activeEditingItem,
                    item: { ...activeEditingItem.item, kualifikasi: e.target.value }
                  })}
                  placeholder="Contoh: Profesi Dokter (S.Ked + dr.) / STR Aktif"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Formasi Counts */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Standar ABK (Kemenkes):</label>
                  <input
                    type="number"
                    min="0"
                    value={activeEditingItem.item.standarABK}
                    onChange={(e) => setActiveEditingItem({
                      ...activeEditingItem,
                      item: { ...activeEditingItem.item, standarABK: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-blue-700">Jumlah Eksisting:</label>
                  <input
                    type="number"
                    min="0"
                    value={activeEditingItem.item.jumlahEksisting}
                    onChange={(e) => setActiveEditingItem({
                      ...activeEditingItem,
                      item: { ...activeEditingItem.item, jumlahEksisting: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-blue-300 font-mono text-blue-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Status Breakdown - 5 Status Kepegawaian (PNS, PPPK, PPPK PW, NON PNS, PJLP) */}
              {(() => {
                const curPNS = Number(activeEditingItem.item.statusPNS) || 0;
                const curPPPK = Number(activeEditingItem.item.statusPPPK) || 0;
                const curPW = Number(activeEditingItem.item.statusPPPKPW) || 0;
                const curNonPNS = Number(activeEditingItem.item.statusNonPNS) || 0;
                const curPJLP = Number(activeEditingItem.item.statusPJLP) || 0;
                const curTotalStatus = curPNS + curPPPK + curPW + curNonPNS + curPJLP;
                const curEksisting = Number(activeEditingItem.item.jumlahEksisting) || 0;
                const isMatched = curTotalStatus === curEksisting;

                return (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-extrabold text-[11px] text-slate-700 block uppercase tracking-wider">
                        Rincian Status Kepegawaian (Total Harus Sama dengan Eksisting)
                      </span>
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                        isMatched 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                      }`}>
                        Total: {curTotalStatus} / Eksisting: {curEksisting}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-emerald-700 mb-1">1. PNS:</label>
                        <input
                          type="number"
                          min="0"
                          value={activeEditingItem.item.statusPNS}
                          onChange={(e) => setActiveEditingItem({
                            ...activeEditingItem,
                            item: { ...activeEditingItem.item, statusPNS: Number(e.target.value) || 0 }
                          })}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-emerald-200 font-mono text-slate-900 text-center font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-indigo-700 mb-1">2. PPPK:</label>
                        <input
                          type="number"
                          min="0"
                          value={activeEditingItem.item.statusPPPK}
                          onChange={(e) => setActiveEditingItem({
                            ...activeEditingItem,
                            item: { ...activeEditingItem.item, statusPPPK: Number(e.target.value) || 0 }
                          })}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-indigo-200 font-mono text-slate-900 text-center font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-teal-700 mb-1">3. PPPK PW:</label>
                        <input
                          type="number"
                          min="0"
                          value={activeEditingItem.item.statusPPPKPW}
                          onChange={(e) => setActiveEditingItem({
                            ...activeEditingItem,
                            item: { ...activeEditingItem.item, statusPPPKPW: Number(e.target.value) || 0 }
                          })}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-teal-200 font-mono text-slate-900 text-center font-bold focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-amber-700 mb-1">4. NON PNS:</label>
                        <input
                          type="number"
                          min="0"
                          value={activeEditingItem.item.statusNonPNS}
                          onChange={(e) => setActiveEditingItem({
                            ...activeEditingItem,
                            item: { ...activeEditingItem.item, statusNonPNS: Number(e.target.value) || 0 }
                          })}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-amber-200 font-mono text-slate-900 text-center font-bold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[11px] font-bold text-purple-700 mb-1">5. PJLP:</label>
                        <input
                          type="number"
                          min="0"
                          value={activeEditingItem.item.statusPJLP}
                          onChange={(e) => setActiveEditingItem({
                            ...activeEditingItem,
                            item: { ...activeEditingItem.item, statusPJLP: Number(e.target.value) || 0 }
                          })}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-purple-200 font-mono text-slate-900 text-center font-bold focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Live Validation Alert Banner */}
                    {!isMatched ? (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">⚠️</span>
                          <div>
                            <span className="font-bold block">Total Rincian Status Belum Sama dengan Eksisting!</span>
                            <span className="text-[11px] text-rose-700">
                              Total status saat ini {curTotalStatus} orang, sedangkan jumlah eksisting {curEksisting} orang.
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveEditingItem({
                            ...activeEditingItem,
                            item: { ...activeEditingItem.item, jumlahEksisting: curTotalStatus }
                          })}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] whitespace-nowrap cursor-pointer transition shadow-xs"
                        >
                          Samakan Eksisting = {curTotalStatus}
                        </button>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium text-[11px]">
                          Total Rincian Status Kepegawaian ({curTotalStatus} Orang) telah sesuai 100% dengan Jumlah Eksisting.
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Island Allocation */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-extrabold text-[11px] text-slate-600 block uppercase">
                  Distribusi Penempatan Fasilitas Pulau
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Induk (Tidung):</label>
                    <input
                      type="number"
                      min="0"
                      value={activeEditingItem.item.lokasiPuskesmasInduk}
                      onChange={(e) => setActiveEditingItem({
                        ...activeEditingItem,
                        item: { ...activeEditingItem.item, lokasiPuskesmasInduk: Number(e.target.value) || 0 }
                      })}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 font-mono text-slate-900 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Pustu Lancang:</label>
                    <input
                      type="number"
                      min="0"
                      value={activeEditingItem.item.lokasiPustuLancang}
                      onChange={(e) => setActiveEditingItem({
                        ...activeEditingItem,
                        item: { ...activeEditingItem.item, lokasiPustuLancang: Number(e.target.value) || 0 }
                      })}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 font-mono text-slate-900 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Pustu Pari:</label>
                    <input
                      type="number"
                      min="0"
                      value={activeEditingItem.item.lokasiPustuPari}
                      onChange={(e) => setActiveEditingItem({
                        ...activeEditingItem,
                        item: { ...activeEditingItem.item, lokasiPustuPari: Number(e.target.value) || 0 }
                      })}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 font-mono text-slate-900 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Pustu Untung Jawa:</label>
                    <input
                      type="number"
                      min="0"
                      value={activeEditingItem.item.lokasiPustuUntungJawa}
                      onChange={(e) => setActiveEditingItem({
                        ...activeEditingItem,
                        item: { ...activeEditingItem.item, lokasiPustuUntungJawa: Number(e.target.value) || 0 }
                      })}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 font-mono text-slate-900 text-center"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Keterangan Tambahan:</label>
                <input
                  type="text"
                  value={activeEditingItem.item.keterangan}
                  onChange={(e) => setActiveEditingItem({
                    ...activeEditingItem,
                    item: { ...activeEditingItem.item, keterangan: e.target.value }
                  })}
                  placeholder="Contoh: Terpenuhi 100% / Siaga 24 Jam"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Formasi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
