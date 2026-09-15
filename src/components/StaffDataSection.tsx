import React, { useState, useMemo } from 'react';
import { initialSDMKData } from '../data/initialData';
import { SDMKItem } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from 'recharts';
import { 
  Users, 
  Search, 
  Filter, 
  BarChart3, 
  Building2, 
  FileSpreadsheet, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Stethoscope, 
  Award,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export const StaffDataSection: React.FC = () => {
  const [activeView, setActiveView] = useState<'grafik' | 'jabatan' | 'tempat_tugas'>('grafik');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedLocation, setSelectedLocation] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<'standarABK' | 'jumlahEksisting'>('jumlahEksisting');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

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

  const locations = [
    { id: 'Semua', label: 'Semua Fasilitas Kesehatan' },
    { id: 'induk', label: 'Puskesmas Induk (P. Tidung)' },
    { id: 'lancang', label: 'Pustu Pulau Lancang' },
    { id: 'pari', label: 'Pustu Pulau Pari' },
    { id: 'untung_jawa', label: 'Pustu Pulau Untung Jawa' }
  ];

  // Totals calculations
  const totalEksisting = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.jumlahEksisting, 0);
  }, []);

  const totalABK = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.standarABK, 0);
  }, []);

  const totalPNS = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.statusPNS, 0);
  }, []);

  const totalPPPK = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.statusPPPK, 0);
  }, []);

  const totalNonASN = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.statusNonASN, 0);
  }, []);

  // Facility counts
  const totalInduk = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.lokasiPuskesmasInduk, 0);
  }, []);

  const totalLancang = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.lokasiPustuLancang, 0);
  }, []);

  const totalPari = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.lokasiPustuPari, 0);
  }, []);

  const totalUntungJawa = useMemo(() => {
    return initialSDMKData.reduce((acc, curr) => acc + curr.lokasiPustuUntungJawa, 0);
  }, []);

  // Filtered dataset for table
  const filteredData = useMemo(() => {
    return initialSDMKData
      .filter((item: SDMKItem) => {
        const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
        const matchesSearch = 
          item.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.kualifikasi.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesLoc = true;
        if (selectedLocation === 'induk') matchesLoc = item.lokasiPuskesmasInduk > 0;
        else if (selectedLocation === 'lancang') matchesLoc = item.lokasiPustuLancang > 0;
        else if (selectedLocation === 'pari') matchesLoc = item.lokasiPustuPari > 0;
        else if (selectedLocation === 'untung_jawa') matchesLoc = item.lokasiPustuUntungJawa > 0;

        return matchesCategory && matchesSearch && matchesLoc;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [selectedCategory, searchQuery, selectedLocation, sortField, sortAsc]);

  // Chart data per jabatan
  const chartDataJabatan = useMemo(() => {
    return initialSDMKData.map(item => ({
      name: item.jabatan.replace(/ \(.*\)/, ''),
      fullName: item.jabatan,
      Eksisting: item.jumlahEksisting,
      StandarABK: item.standarABK,
      kategori: item.kategori
    }));
  }, []);

  // Chart data per faskes
  const chartDataFaskes = [
    { name: 'Puskesmas Induk (P. Tidung)', value: totalInduk, fill: '#0284c7' },
    { name: 'Pustu Pulau Untung Jawa', value: totalUntungJawa, fill: '#0d9488' },
    { name: 'Pustu Pulau Pari', value: totalPari, fill: '#6366f1' },
    { name: 'Pustu Pulau Lancang', value: totalLancang, fill: '#f59e0b' }
  ];

  // Pie chart data status
  const chartDataStatus = [
    { name: 'PNS / ASN', value: totalPNS, color: '#0284c7' },
    { name: 'PPPK', value: totalPPPK, color: '#10b981' },
    { name: 'Kontrak Non-ASN / PJLP', value: totalNonASN, color: '#f59e0b' }
  ];

  const handleDownloadCSV = () => {
    const headers = 'No,Jabatan,Kategori,Kualifikasi,Standar ABK,Jumlah Riil,PNS,PPPK,Non-ASN,Puskesmas Induk,Pustu Lancang,Pustu Pari,Pustu Untung Jawa,Keterangan\n';
    const rows = initialSDMKData.map((item, idx) => 
      `${idx + 1},"${item.jabatan}","${item.kategori}","${item.kualifikasi}",${item.standarABK},${item.jumlahEksisting},${item.statusPNS},${item.statusPPPK},${item.statusNonASN},${item.lokasiPuskesmasInduk},${item.lokasiPustuLancang},${item.lokasiPustuPari},${item.lokasiPustuUntungJawa},"${item.keterangan}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Data_SDMK_Ketenagaan_Puskesmas_Kepulauan_Seribu_Selatan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const BAR_COLORS = [
    '#0284c7', '#0369a1', '#0ea5e9', '#0d9488', 
    '#10b981', '#6366f1', '#8b5cf6', '#ec4899', 
    '#f59e0b', '#d97706', '#64748b'
  ];

  return (
    <section id="sdm-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-200/60">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            Data SDMK & Formasi Ketenagaan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Grafik & Data Sumber Daya Manusia Kesehatan (SDMK)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Data pemenuhan formasi tenaga medis, keperawatan, kebidanan, kefarmasian, dan penunjang faskes per jabatan dan per tempat tugas di wilayah Puskesmas Kepulauan Seribu Selatan.
          </p>
        </div>

        {/* Highlight Summary Stats Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-100 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Total Tenaga (Riil)</span>
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{totalEksisting}</span>
              <span className="text-xs text-slate-500 font-medium">Orang Personel</span>
            </div>
            <p className="text-[11px] text-sky-700 mt-2 font-semibold">
              Kebutuhan ABK: {totalABK} (Tingkat Pemenuhan: {Math.round((totalEksisting / totalABK) * 100)}%)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Status Kepegawaian</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{totalPNS + totalPPPK}</span>
              <span className="text-xs text-slate-500 font-medium">ASN (PNS & PPPK)</span>
            </div>
            <p className="text-[11px] text-emerald-700 mt-2 font-semibold">
              PNS: {totalPNS} • PPPK: {totalPPPK} • Non-ASN: {totalNonASN}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50/50 border border-indigo-100 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Puskesmas Induk</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{totalInduk}</span>
              <span className="text-xs text-slate-500 font-medium">Nakes & Staf</span>
            </div>
            <p className="text-[11px] text-indigo-700 mt-2 font-semibold">
              Pusat Pelayanan Rawat Inap & Siaga Pulau Tidung
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-100 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">3 Puskesmas Pembantu</span>
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{totalLancang + totalPari + totalUntungJawa}</span>
              <span className="text-xs text-slate-500 font-medium">Personel Tersebar</span>
            </div>
            <p className="text-[11px] text-amber-700 mt-2 font-semibold">
              P. Lancang: {totalLancang} • P. Pari: {totalPari} • P. Untung Jawa: {totalUntungJawa}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Grafik vs Data Per Jabatan vs Data Per Tempat Tugas) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 w-full sm:w-auto">
            <button
              onClick={() => setActiveView('grafik')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeView === 'grafik'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Grafik Ketenagaan</span>
            </button>

            <button
              onClick={() => setActiveView('jabatan')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeView === 'jabatan'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Data Per Jabatan</span>
            </button>

            <button
              onClick={() => setActiveView('tempat_tugas')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeView === 'tempat_tugas'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Data Per Tempat Tugas</span>
            </button>
          </div>

          {/* Download CSV Action */}
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Unduh Format CSV / Excel</span>
          </button>
        </div>

        {/* TAB 1: GRAFIK KETENAGAAN PER JABATAN & STATUS */}
        {activeView === 'grafik' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Primary Horizontal Bar Chart: Ketenagaan Per Jabatan */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Grafik Jumlah Tenaga Kesehatan & Penunjang Per Jabatan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Perbandingan Jumlah Eksisting (Riil) dengan Standar Kebutuhan ABK Kemenkes.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-sky-600"></span>
                    <span className="text-slate-700">Jumlah Riil (Eksisting)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-slate-300"></span>
                    <span className="text-slate-500">Standar ABK</span>
                  </div>
                </div>
              </div>

              <div className="h-[460px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartDataJabatan}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 140, bottom: 20 }}
                  >
                    <XAxis type="number" domain={[0, 18]} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }}
                      width={130}
                    />
                    <Tooltip 
                      formatter={(value: any, name: any) => [
                        `${value} Orang`, 
                        name === 'Eksisting' ? 'Jumlah Riil Eksisting' : 'Standar Kebutuhan ABK'
                      ]}
                      labelFormatter={(label) => `Jabatan: ${label}`}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="StandarABK" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={10} />
                    <Bar dataKey="Eksisting" fill="#0284c7" radius={[0, 6, 6, 0]} barSize={16}>
                      {chartDataJabatan.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Secondary Charts: Status Kepegawaian & Sebaran Faskes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Kepegawaian Donut Chart */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Proporsi Status Kepegawaian SDMK
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Distribusi PNS, Pegawai Pemerintah dengan Perjanjian Kerja (PPPK), dan Kontrak Daerah.
                  </p>
                </div>

                <div className="h-64 w-full my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartDataStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {chartDataStatus.map((entry, index) => (
                          <Cell key={`cell-status-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any) => [`${val} Orang`, 'Jumlah Pegawai']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="p-2 rounded-xl bg-blue-50">
                    <span className="block text-[11px] font-bold text-blue-800">PNS</span>
                    <span className="text-lg font-black text-slate-900">{totalPNS}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50">
                    <span className="block text-[11px] font-bold text-emerald-800">PPPK</span>
                    <span className="text-lg font-black text-slate-900">{totalPPPK}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50">
                    <span className="block text-[11px] font-bold text-amber-800">Non-ASN</span>
                    <span className="text-lg font-black text-slate-900">{totalNonASN}</span>
                  </div>
                </div>
              </div>

              {/* Sebaran Faskes Chart */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    Sebaran Tenaga Menurut Tempat Tugas
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Alokasi personel di faskes induk kecamatan dan 3 puskesmas pembantu pulau.
                  </p>
                </div>

                <div className="h-64 w-full my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartDataFaskes} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#475569' }} interval={0} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(val: any) => [`${val} Personel`, 'Total Staf']} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {chartDataFaskes.map((entry, index) => (
                          <Cell key={`cell-faskes-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="p-2 rounded-xl bg-sky-50">
                    <span className="block text-[10px] font-bold text-sky-800 truncate">Puskesmas Induk</span>
                    <span className="text-lg font-black text-slate-900">{totalInduk}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-teal-50">
                    <span className="block text-[10px] font-bold text-teal-800 truncate">P. Untung Jawa</span>
                    <span className="text-lg font-black text-slate-900">{totalUntungJawa}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-indigo-50">
                    <span className="block text-[10px] font-bold text-indigo-800 truncate">P. Pari</span>
                    <span className="text-lg font-black text-slate-900">{totalPari}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50">
                    <span className="block text-[10px] font-bold text-amber-800 truncate">P. Lancang</span>
                    <span className="text-lg font-black text-slate-900">{totalLancang}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DATA PER JABATAN (DETAIL FORMASI & ABK) */}
        {activeView === 'jabatan' && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            {/* Search & Category Filter Bar */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/90 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama jabatan, profesi, atau kualifikasi pendidikan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter Kategori Tenaga"
                  className="px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c === 'Semua' ? 'Semua Rumpun Tenaga' : c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table of Data Per Jabatan */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-bold">
                      <th className="py-3.5 px-4 text-center w-12">No</th>
                      <th className="py-3.5 px-4">Nama Jabatan & Profesi</th>
                      <th className="py-3.5 px-4">Rumpun Tenaga</th>
                      <th className="py-3.5 px-4">Kualifikasi Minimal</th>
                      <th 
                        className="py-3.5 px-4 text-center cursor-pointer hover:bg-slate-800 transition"
                        onClick={() => {
                          setSortField('standarABK');
                          setSortAsc(!sortAsc);
                        }}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>Standar ABK</span>
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th 
                        className="py-3.5 px-4 text-center cursor-pointer hover:bg-slate-800 transition text-amber-300"
                        onClick={() => {
                          setSortField('jumlahEksisting');
                          setSortAsc(!sortAsc);
                        }}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>Kondisi Riil</span>
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="py-3.5 px-4 text-center">Status (PNS/PPPK/Non-ASN)</th>
                      <th className="py-3.5 px-4">Status Pemenuhan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredData.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{item.jabatan}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                            {item.kategori}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">
                          {item.kualifikasi}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-slate-600 font-mono">
                          {item.standarABK}
                        </td>
                        <td className="py-3.5 px-4 text-center font-black text-blue-700 font-mono text-base bg-blue-50/30">
                          {item.jumlahEksisting}
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-xs">
                          <span className="text-blue-700 font-bold">{item.statusPNS} PNS</span> • {' '}
                          <span className="text-emerald-700 font-bold">{item.statusPPPK} PPPK</span> • {' '}
                          <span className="text-amber-700 font-bold">{item.statusNonASN} Non-ASN</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {item.keterangan}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100 font-extrabold text-slate-900 text-xs sm:text-sm">
                      <td colSpan={4} className="py-3.5 px-4 text-right">
                        TOTAL KESELURUHAN TENAGA:
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-black">{totalABK}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-blue-700 text-base">{totalEksisting}</td>
                      <td className="py-3.5 px-4 text-center font-mono">
                        {totalPNS} PNS • {totalPPPK} PPPK • {totalNonASN} Non-ASN
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-bold">
                        Pemenuhan 100% Sesuai Kebutuhan
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DATA PER TEMPAT TUGAS (SEBARAN FASILITAS KESEHATAN) */}
        {activeView === 'tempat_tugas' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* The 4 Location Cards with Specific Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Faskes 1: Puskesmas Induk */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between shadow-md">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-500/30 text-sky-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Faskes Induk Kecamatan
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    Puskesmas Kepulauan Seribu Selatan
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Dermaga Pulau Tidung (Rawat Inap & Laboratorium 24 Jam)
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dokter Umum & Gigi</span>
                    <span className="font-bold text-white">7 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Perawat & Bidan</span>
                    <span className="font-bold text-white">16 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Farmasi & Analis Lab</span>
                    <span className="font-bold text-white">6 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gizi, Kesling & Radiologi</span>
                    <span className="font-bold text-white">6 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Administrasi, RME & Driver</span>
                    <span className="font-bold text-white">8 Orang</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="font-bold text-sky-400">Total Personel</span>
                    <span className="text-2xl font-black text-amber-400">{totalInduk}</span>
                  </div>
                </div>
              </div>

              {/* Faskes 2: Pustu Pulau Untung Jawa */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Puskesmas Pembantu
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Pustu Pulau Untung Jawa
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Jl. Sakura, RW 02, Kelurahan Pulau Untung Jawa
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dokter Umum & Gigi</span>
                    <span className="font-bold text-slate-900">2 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Perawat & Bidan Siaga</span>
                    <span className="font-bold text-slate-900">4 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sanitarian / Kesmas</span>
                    <span className="font-bold text-slate-900">1 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tenaga Penunjang / Admin</span>
                    <span className="font-bold text-slate-900">1 Orang</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="font-bold text-teal-700">Total Personel</span>
                    <span className="text-2xl font-black text-slate-900">{totalUntungJawa}</span>
                  </div>
                </div>
              </div>

              {/* Faskes 3: Pustu Pulau Pari */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Puskesmas Pembantu
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Pustu Pulau Pari
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Jl. Dermaga Utama, RT 01/RW 04, Kelurahan Pulau Pari
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dokter Umum</span>
                    <span className="font-bold text-slate-900">1 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Perawat & Bidan Siaga</span>
                    <span className="font-bold text-slate-900">4 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Farmasi & Gizi</span>
                    <span className="font-bold text-slate-900">2 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tenaga Penunjang / Admin</span>
                    <span className="font-bold text-slate-900">1 Orang</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="font-bold text-indigo-700">Total Personel</span>
                    <span className="text-2xl font-black text-slate-900">{totalPari}</span>
                  </div>
                </div>
              </div>

              {/* Faskes 4: Pustu Pulau Lancang */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Puskesmas Pembantu
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Pustu Pulau Lancang
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Kompleks Pemukiman Warga RW 01, Kelurahan Pulau Pari
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dokter Umum</span>
                    <span className="font-bold text-slate-900">1 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Perawat & Bidan Siaga</span>
                    <span className="font-bold text-slate-900">4 Orang</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tenaga Penunjang / Admin</span>
                    <span className="font-bold text-slate-900">1 Orang</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="font-bold text-amber-700">Total Personel</span>
                    <span className="text-2xl font-black text-slate-900">{totalLancang}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Matrix Table: Distribusi Jabatan Per Tempat Tugas */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Matriks Distribusi Formasi SDMK Antar Tempat Tugas
                </h4>
                <span className="text-xs text-slate-500">
                  Data Terintegrasi Dinas Kesehatan Provinsi DKI Jakarta
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Nama Jabatan</th>
                      <th className="py-3 px-3 text-center">Puskesmas Induk (P. Tidung)</th>
                      <th className="py-3 px-3 text-center">Pustu P. Untung Jawa</th>
                      <th className="py-3 px-3 text-center">Pustu P. Pari</th>
                      <th className="py-3 px-3 text-center">Pustu P. Lancang</th>
                      <th className="py-3 px-3 text-center bg-blue-900">Total Riil</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {initialSDMKData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">
                          {item.jabatan}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                          {item.lokasiPuskesmasInduk || '-'}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                          {item.lokasiPustuUntungJawa || '-'}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                          {item.lokasiPustuPari || '-'}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                          {item.lokasiPustuLancang || '-'}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-black text-blue-700 bg-blue-50/40">
                          {item.jumlahEksisting}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100 font-extrabold text-slate-900 text-xs">
                      <td className="py-3 px-4">JUMLAH KETENAGAAN:</td>
                      <td className="py-3 px-3 text-center font-mono font-black text-sm">{totalInduk}</td>
                      <td className="py-3 px-3 text-center font-mono font-black text-sm">{totalUntungJawa}</td>
                      <td className="py-3 px-3 text-center font-mono font-black text-sm">{totalPari}</td>
                      <td className="py-3 px-3 text-center font-mono font-black text-sm">{totalLancang}</td>
                      <td className="py-3 px-3 text-center font-mono font-black text-blue-700 text-base bg-blue-100">
                        {totalEksisting}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
