import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MorbidityItem, FacilityMonthlyVisit } from '../../types';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Edit3, 
  Plus, 
  Trash2, 
  Save, 
  RotateCw, 
  Check, 
  X, 
  AlertCircle, 
  Calendar, 
  Building2, 
  Users, 
  FileSpreadsheet, 
  CheckCircle2, 
  HeartPulse, 
  BarChart3,
  CloudUpload
} from 'lucide-react';

interface Props {
  onSuccessToast?: (msg: string) => void;
}

export const AdminHealthDataTab: React.FC<Props> = ({ onSuccessToast }) => {
  const { 
    morbidityDataByYear, 
    monthlyVisitsByYear, 
    updateMorbidityYear, 
    updateMonthlyVisitsYear,
    syncHealthDataToGAS
  } = useData();

  const [activeSubTab, setActiveSubTab] = useState<'morbiditas' | 'kunjungan'>('morbiditas');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Morbidity Edit Modal
  const [editingMorbidity, setEditingMorbidity] = useState<{
    index: number;
    item: MorbidityItem;
    isNew?: boolean;
  } | null>(null);

  // Monthly Visit Edit Modal
  const [editingVisit, setEditingVisit] = useState<{
    index: number;
    item: FacilityMonthlyVisit;
  } | null>(null);

  const currentMorbidityList = morbidityDataByYear[selectedYear] || [];
  const currentVisitList = monthlyVisitsByYear[selectedYear] || [];

  const handleSyncToSpreadsheet = async () => {
    setIsSyncing(true);
    setSyncStatus('Menghubungkan ke Google Apps Script & Spreadsheet...');
    try {
      const res = await syncHealthDataToGAS();
      if (res.success) {
        setSyncStatus('Berhasil disimpan ke Google Spreadsheet!');
        if (onSuccessToast) onSuccessToast('Data Kesehatan berhasil disinkronkan ke Spreadsheet!');
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

  // Morbidity Handlers
  const handleSaveMorbidity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMorbidity) return;

    const updated = [...currentMorbidityList];
    if (editingMorbidity.isNew) {
      updated.push({
        ...editingMorbidity.item,
        rank: updated.length + 1
      });
    } else {
      updated[editingMorbidity.index] = editingMorbidity.item;
    }

    updateMorbidityYear(selectedYear, updated);
    setEditingMorbidity(null);
    if (onSuccessToast) onSuccessToast('Data penyakit berhasil diperbarui!');
  };

  const handleDeleteMorbidity = (idx: number) => {
    if (window.confirm('Hapus data penyakit ini?')) {
      const updated = currentMorbidityList.filter((_, i) => i !== idx).map((it, i) => ({
        ...it,
        rank: i + 1
      }));
      updateMorbidityYear(selectedYear, updated);
      if (onSuccessToast) onSuccessToast('Data penyakit dihapus.');
    }
  };

  // Visit Handlers
  const handleSaveVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVisit) return;

    const item = editingVisit.item;
    const computedTotal = Number(item.puskesmasKecamatan) + Number(item.pustuPari) + Number(item.pustuLancang) + Number(item.pustuUntungJawa) + Number(item.poskesPayung);
    const updatedItem = {
      ...item,
      total: computedTotal
    };

    const updated = [...currentVisitList];
    updated[editingVisit.index] = updatedItem;
    updateMonthlyVisitsYear(selectedYear, updated);
    setEditingVisit(null);
    if (onSuccessToast) onSuccessToast(`Data kunjungan bulan ${item.monthName} berhasil diperbarui!`);
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-900 via-rose-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl border border-rose-800/40">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            Backend Pengisian Data Kesehatan
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Pengelolaan Data Morbiditas &amp; Kunjungan Pasien
          </h3>
          <p className="text-xs text-rose-200/90 max-w-2xl">
            Perbarui data 10 penyakit terbanyak (ICD-10) dan rekapitulasi pasien bulanan di Puskesmas Induk &amp; 3 Pustu Pulau. Data tersimpan di browser dan langsung dapat disinkronkan ke Google Spreadsheet.
          </p>
        </div>

        {/* Sync Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
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

      {/* Filter Ribbon: Year Selector & SubTabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('morbiditas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'morbiditas'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>10 Penyakit Terbanyak (Morbiditas)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('kunjungan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'kunjungan'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Rekap Kunjungan Faskes Bulanan</span>
          </button>
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Pilih Tahun:</span>
          {[2026, 2025, 2024].map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedYear === yr
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* ================= SECTION 1: 10 PENYAKIT TERBANYAK ================= */}
      {activeSubTab === 'morbiditas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-extrabold text-slate-900">
                Daftar Morbiditas / 10 Penyakit Terbanyak ({selectedYear})
              </h4>
              <p className="text-xs text-slate-500">
                Data ini ditampilkan pada grafik interaktif halaman publik "Data Kesehatan".
              </p>
            </div>

            <button
              onClick={() => setEditingMorbidity({
                index: currentMorbidityList.length,
                isNew: true,
                item: {
                  rank: currentMorbidityList.length + 1,
                  code: '',
                  name: '',
                  category: 'Respirasi',
                  cases: 100,
                  maleCases: 50,
                  femaleCases: 50,
                  percentage: 5,
                  trend: 'stable'
                }
              })}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Penyakit</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-black text-[10px]">
                  <tr>
                    <th className="px-4 py-3 text-center">No</th>
                    <th className="px-4 py-3">Kode ICD-10</th>
                    <th className="px-4 py-3">Nama Penyakit</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3 text-right">Total Kasus</th>
                    <th className="px-4 py-3 text-right">Pria / Wanita</th>
                    <th className="px-4 py-3 text-center">Tren</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentMorbidityList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-3 text-center font-bold text-slate-500">
                        {item.rank || idx + 1}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-rose-600">
                        {item.code}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-extrabold text-slate-900">
                        {item.cases.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500 font-mono text-[11px]">
                        {item.maleCases} / {item.femaleCases}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.trend === 'up' && (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-[11px]">
                            <TrendingUp className="w-3.5 h-3.5" /> Naik
                          </span>
                        )}
                        {item.trend === 'down' && (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                            <TrendingDown className="w-3.5 h-3.5" /> Turun
                          </span>
                        )}
                        {item.trend === 'stable' && (
                          <span className="inline-flex items-center gap-1 text-slate-500 font-bold text-[11px]">
                            <Minus className="w-3.5 h-3.5" /> Stabil
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setEditingMorbidity({ index: idx, item: { ...item } })}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
                            title="Edit Data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMorbidity(idx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: REKAP KUNJUNGAN FASKES BULANAN ================= */}
      {activeSubTab === 'kunjungan' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-extrabold text-slate-900">
                Rekapitulasi Kunjungan Rawat Jalan Bulanan ({selectedYear})
              </h4>
              <p className="text-xs text-slate-500">
                Distribusi kunjungan pasien di Puskesmas Kecamatan (Tidung), Pustu Pari, Pustu Lancang, Pustu Untung Jawa, dan Poskes Payung.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-black text-[10px]">
                  <tr>
                    <th className="px-3 py-3">Bulan</th>
                    <th className="px-3 py-3 text-right">Puskesmas Kec. (Tidung)</th>
                    <th className="px-3 py-3 text-right">Pustu Pari</th>
                    <th className="px-3 py-3 text-right">Pustu Lancang</th>
                    <th className="px-3 py-3 text-right">Pustu Untung Jawa</th>
                    <th className="px-3 py-3 text-right">Poskes Payung</th>
                    <th className="px-3 py-3 text-right bg-slate-100/70 font-black">Total Pasien</th>
                    <th className="px-3 py-3 text-right text-emerald-700">BPJS</th>
                    <th className="px-3 py-3 text-right text-slate-600">Non-BPJS</th>
                    <th className="px-3 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentVisitList.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="px-3 py-3 font-bold text-slate-900 whitespace-nowrap">
                        {row.monthName}
                      </td>
                      <td className="px-3 py-3 text-right font-mono">
                        {row.puskesmasKecamatan}
                      </td>
                      <td className="px-3 py-3 text-right font-mono">
                        {row.pustuPari}
                      </td>
                      <td className="px-3 py-3 text-right font-mono">
                        {row.pustuLancang}
                      </td>
                      <td className="px-3 py-3 text-right font-mono">
                        {row.pustuUntungJawa}
                      </td>
                      <td className="px-3 py-3 text-right font-mono">
                        {row.poskesPayung}
                      </td>
                      <td className="px-3 py-3 text-right font-extrabold bg-slate-50 font-mono text-slate-900">
                        {row.total.toLocaleString('id-ID')}
                      </td>
                      <td className="px-3 py-3 text-right text-emerald-700 font-mono">
                        {row.bpjs}
                      </td>
                      <td className="px-3 py-3 text-right text-slate-600 font-mono">
                        {row.nonBpjs}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() => setEditingVisit({ index: idx, item: { ...row } })}
                          className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-[11px] transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Ubah</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL EDIT PENYAKIT ================= */}
      {editingMorbidity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-base text-slate-900">
                {editingMorbidity.isNew ? 'Tambah Penyakit Baru' : 'Edit Data Penyakit'}
              </h4>
              <button
                onClick={() => setEditingMorbidity(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMorbidity} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kode ICD-10:</label>
                  <input
                    type="text"
                    required
                    value={editingMorbidity.item.code}
                    onChange={(e) => setEditingMorbidity({
                      ...editingMorbidity,
                      item: { ...editingMorbidity.item, code: e.target.value }
                    })}
                    placeholder="Contoh: J06.9, I10"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori:</label>
                  <select
                    value={editingMorbidity.item.category}
                    onChange={(e) => setEditingMorbidity({
                      ...editingMorbidity,
                      item: { ...editingMorbidity.item, category: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Respirasi">Respirasi</option>
                    <option value="Kardiovaskular">Kardiovaskular</option>
                    <option value="Endokrin / Metabolik">Endokrin / Metabolik</option>
                    <option value="Gastrointestinal">Gastrointestinal</option>
                    <option value="Dermatologi">Dermatologi</option>
                    <option value="Muskuloskeletal">Muskuloskeletal</option>
                    <option value="Kesehatan Gigi">Kesehatan Gigi</option>
                    <option value="Gejala Umum">Gejala Umum</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Penyakit:</label>
                <input
                  type="text"
                  required
                  value={editingMorbidity.item.name}
                  onChange={(e) => setEditingMorbidity({
                    ...editingMorbidity,
                    item: { ...editingMorbidity.item, name: e.target.value }
                  })}
                  placeholder="Contoh: Infeksi Saluran Pernapasan Akut (ISPA)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Kasus:</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editingMorbidity.item.cases}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      const half = Math.floor(val / 2);
                      setEditingMorbidity({
                        ...editingMorbidity,
                        item: { 
                          ...editingMorbidity.item, 
                          cases: val,
                          maleCases: half,
                          femaleCases: val - half
                        }
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kasus Laki-laki:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingMorbidity.item.maleCases}
                    onChange={(e) => setEditingMorbidity({
                      ...editingMorbidity,
                      item: { ...editingMorbidity.item, maleCases: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kasus Perempuan:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingMorbidity.item.femaleCases}
                    onChange={(e) => setEditingMorbidity({
                      ...editingMorbidity,
                      item: { ...editingMorbidity.item, femaleCases: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Persentase (%):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingMorbidity.item.percentage}
                    onChange={(e) => setEditingMorbidity({
                      ...editingMorbidity,
                      item: { ...editingMorbidity.item, percentage: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tren Kasus:</label>
                  <select
                    value={editingMorbidity.item.trend}
                    onChange={(e) => setEditingMorbidity({
                      ...editingMorbidity,
                      item: { ...editingMorbidity.item, trend: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="stable">Stabil</option>
                    <option value="up">Naik (Waspada)</option>
                    <option value="down">Turun (Membaik)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingMorbidity(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL EDIT KUNJUNGAN BULAN ================= */}
      {editingVisit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-extrabold text-base text-slate-900">
                  Ubah Data Kunjungan Bulan {editingVisit.item.monthName} ({selectedYear})
                </h4>
                <p className="text-[11px] text-slate-500">
                  Total kunjungan otomatis dihitung dari penjumlahan fasilitas.
                </p>
              </div>
              <button
                onClick={() => setEditingVisit(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVisit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Puskesmas Kec. (Tidung):</label>
                  <input
                    type="number"
                    min="0"
                    value={editingVisit.item.puskesmasKecamatan}
                    onChange={(e) => setEditingVisit({
                      ...editingVisit,
                      item: { ...editingVisit.item, puskesmasKecamatan: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pustu Pulau Pari:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingVisit.item.pustuPari}
                    onChange={(e) => setEditingVisit({
                      ...editingVisit,
                      item: { ...editingVisit.item, pustuPari: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pustu P. Lancang:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingVisit.item.pustuLancang}
                    onChange={(e) => setEditingVisit({
                      ...editingVisit,
                      item: { ...editingVisit.item, pustuLancang: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pustu P. Untung Jawa:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingVisit.item.pustuUntungJawa}
                    onChange={(e) => setEditingVisit({
                      ...editingVisit,
                      item: { ...editingVisit.item, pustuUntungJawa: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Poskes P. Payung:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingVisit.item.poskesPayung}
                    onChange={(e) => setEditingVisit({
                      ...editingVisit,
                      item: { ...editingVisit.item, poskesPayung: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-emerald-700">Peserta BPJS:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingVisit.item.bpjs}
                    onChange={(e) => setEditingVisit({
                      ...editingVisit,
                      item: { ...editingVisit.item, bpjs: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-emerald-50/50 border border-emerald-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Non-BPJS:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingVisit.item.nonBpjs}
                    onChange={(e) => setEditingVisit({
                      ...editingVisit,
                      item: { ...editingVisit.item, nonBpjs: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rujukan RSUD:</label>
                  <input
                    type="number"
                    min="0"
                    value={editingVisit.item.rujukanRsud}
                    onChange={(e) => setEditingVisit({
                      ...editingVisit,
                      item: { ...editingVisit.item, rujukanRsud: Number(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingVisit(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
