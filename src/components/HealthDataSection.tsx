import React, { useState, useMemo } from 'react';
import { 
  MORBIDITY_DATA_BY_YEAR, 
  MONTHLY_VISITS_BY_YEAR 
} from '../data/healthData';
import { MorbidityItem, FacilityMonthlyVisit } from '../types';
import { 
  Activity, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar, 
  Building2, 
  Users, 
  Filter, 
  CheckCircle2, 
  FileSpreadsheet, 
  ArrowUpRight,
  ShieldCheck,
  HeartPulse,
  PieChart as PieIcon,
  HelpCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from 'recharts';

export const HealthDataSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<string>('Semua'); // 'Semua' or monthIndex '1'..'12'
  const [selectedFacility, setSelectedFacility] = useState<string>('Semua');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [activeTab, setActiveTab] = useState<'penyakit' | 'kunjungan' | 'tabel'>('penyakit');

  const availableYears = [2026, 2025, 2024];

  const monthOptions = [
    { value: 'Semua', label: 'Semua Bulan (Tahunan)' },
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
  ];

  const facilityOptions = [
    { value: 'Semua', label: 'Semua Faskes Kepulauan' },
    { value: 'puskesmasKecamatan', label: 'Puskesmas Kec. (P. Tidung)' },
    { value: 'pustuPari', label: 'Pustu Pulau Pari' },
    { value: 'pustuLancang', label: 'Pustu Pulau Lancang' },
    { value: 'pustuUntungJawa', label: 'Pustu Pulau Untung Jawa' },
    { value: 'poskesPayung', label: 'Poskes Pulau Payung' }
  ];

  // 10 Penyakit Terbanyak for current year
  const rawMorbidityList: MorbidityItem[] = useMemo(() => {
    return MORBIDITY_DATA_BY_YEAR[selectedYear] || MORBIDITY_DATA_BY_YEAR[2026];
  }, [selectedYear]);

  // Adjust morbidity count if single month is selected (approx. monthly proportion)
  const morbidityData = useMemo(() => {
    if (selectedMonth === 'Semua') {
      return rawMorbidityList;
    }
    const monthRatio = 1 / 12;
    // Slight variation based on month
    const mIdx = parseInt(selectedMonth, 10);
    const factor = 0.85 + (mIdx % 4) * 0.1;
    return rawMorbidityList.map((item) => {
      const monthCases = Math.round(item.cases * monthRatio * factor);
      const male = Math.round(monthCases * (item.maleCases / item.cases));
      const female = monthCases - male;
      return {
        ...item,
        cases: monthCases,
        maleCases: male,
        femaleCases: female
      };
    });
  }, [rawMorbidityList, selectedMonth]);

  // Monthly Visits for current year
  const monthlyVisitsList: FacilityMonthlyVisit[] = useMemo(() => {
    return MONTHLY_VISITS_BY_YEAR[selectedYear] || MONTHLY_VISITS_BY_YEAR[2026];
  }, [selectedYear]);

  // Filtered visits for summary and chart
  const displayedVisits = useMemo(() => {
    if (selectedMonth === 'Semua') {
      return monthlyVisitsList;
    }
    const mIdx = parseInt(selectedMonth, 10);
    return monthlyVisitsList.filter((v) => v.monthIndex === mIdx);
  }, [monthlyVisitsList, selectedMonth]);

  // Calculated aggregates
  const summaryMetrics = useMemo(() => {
    let total = 0;
    let bpjs = 0;
    let nonBpjs = 0;
    let rujukan = 0;

    displayedVisits.forEach((item) => {
      if (selectedFacility === 'Semua') {
        total += item.total;
      } else {
        total += (item as any)[selectedFacility] || 0;
      }
      bpjs += item.bpjs;
      nonBpjs += item.nonBpjs;
      rujukan += item.rujukanRsud;
    });

    const monthsCount = displayedVisits.length || 1;
    const avgMonthly = Math.round(total / monthsCount);
    const avgDaily = Math.round(total / (monthsCount * 25)); // assume ~25 working days
    const bpjsPercent = total > 0 ? Math.round((bpjs / (bpjs + nonBpjs)) * 100) : 90;

    return { total, avgMonthly, avgDaily, bpjsPercent, rujukan };
  }, [displayedVisits, selectedFacility]);

  // Recharts format for 10 Penyakit
  const morbidityChartData = useMemo(() => {
    return morbidityData.map((item) => ({
      name: item.name.length > 22 ? `${item.name.slice(0, 20)}...` : item.name,
      fullName: item.name,
      code: item.code,
      kasus: item.cases,
      lakiLaki: item.maleCases,
      perempuan: item.femaleCases,
      persen: item.percentage
    }));
  }, [morbidityData]);

  // Recharts format for Kunjungan
  const visitChartData = useMemo(() => {
    return monthlyVisitsList.map((item) => ({
      bulan: item.month,
      'Puskesmas Kec. (Tidung)': item.puskesmasKecamatan,
      'Pustu P. Pari': item.pustuPari,
      'Pustu P. Lancang': item.pustuLancang,
      'Pustu P. Untung Jawa': item.pustuUntungJawa,
      'Poskes P. Payung': item.poskesPayung,
      Total: item.total
    }));
  }, [monthlyVisitsList]);

  return (
    <section className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            Dashboard Data & Statistik Kesehatan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Data Morbiditas & Kunjungan Rawat Jalan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Laporan epidemiologi 10 penyakit terbanyak dan rekapitulasi tren kunjungan pasien di seluruh jejaring fasilitas kesehatan (Puskesmas & Pustu) wilayah Kepulauan Seribu Selatan.
          </p>
        </div>

        {/* Filter Toolbar: Tahun, Bulan, Faskes */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Filter Tahun Buttons */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-600" /> Filter Tahun:
              </span>
              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                {availableYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedYear === yr
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Bulan & Faskes Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
              {/* Filter Bulan */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Bulan:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                >
                  {monthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Faskes */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Faskes:</span>
                <select
                  value={selectedFacility}
                  onChange={(e) => setSelectedFacility(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-sky-500"
                >
                  {facilityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>

          </div>

          {/* Sub-Tabs: 10 Penyakit vs Kunjungan Rawat Jalan */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('penyakit')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                  activeTab === 'penyakit'
                    ? 'bg-white text-sky-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-rose-500" />
                <span>10 Penyakit Terbanyak</span>
              </button>

              <button
                onClick={() => setActiveTab('kunjungan')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                  activeTab === 'kunjungan'
                    ? 'bg-white text-sky-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
                <span>Kunjungan Rawat Jalan</span>
              </button>

              <button
                onClick={() => setActiveTab('tabel')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
                  activeTab === 'tabel'
                    ? 'bg-white text-sky-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                <span>Tabel Rincian Faskes</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Tahun Analisis: <strong className="text-slate-800">{selectedYear}</strong> • Periode: <strong className="text-slate-800">{monthOptions.find(m => m.value === selectedMonth)?.label}</strong>
            </div>
          </div>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Rawat Jalan
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {summaryMetrics.total.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-slate-500">pasien</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 pt-1">
              <TrendingUp className="w-3 h-3" />
              <span>Cakupan seluruh pulau terlayani</span>
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Rata-Rata Bulanan
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-sky-700">
                {summaryMetrics.avgMonthly.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-slate-500">pasien/bln</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              ~{summaryMetrics.avgDaily} pasien per hari kerja
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Cakupan BPJS / JKN
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                {summaryMetrics.bpjsPercent}%
              </span>
              <span className="text-xs text-slate-500">gratis</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Bebas Biaya (KTP DKI/BPJS)</span>
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Penyakit Terbanyak #1
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-rose-700 truncate">
                ISPA (24.8%)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1 truncate">
              {morbidityData[0]?.cases} kasus terdata
            </p>
          </div>
        </div>

        {/* TAB 1: 10 PENYAKIT TERBANYAK */}
        {activeTab === 'penyakit' && (
          <div className="space-y-6">
            
            {/* Chart Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-rose-600" />
                    Grafik 10 Penyakit Terbanyak (Top 10 Morbidity) Tahun {selectedYear}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Distribusi diagnosis penyakit rawat jalan berdasarkan kodefikasi ICD-10 Kemenkes RI.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span>Jumlah Total Kasus</span>
                </div>
              </div>

              {/* Recharts Bar Chart */}
              <div className="h-80 sm:h-96 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={morbidityChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={140}
                      tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} 
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <p className="font-bold text-amber-300">{data.fullName}</p>
                              <p className="text-slate-300 font-mono text-[11px]">ICD-10: {data.code}</p>
                              <div className="border-t border-slate-700 pt-1 mt-1 space-y-0.5">
                                <p className="text-white font-bold">Total: {data.kasus} Kasus ({data.persen}%)</p>
                                <p className="text-sky-300 text-[10px]">Laki-laki: {data.lakiLaki} | Perempuan: {data.perempuan}</p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="kasus" fill="#f43f5e" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Ranked List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {morbidityData.map((item) => (
                <div 
                  key={item.code}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        item.rank <= 3 
                          ? 'bg-rose-500 text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{item.rank}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-700">
                            ICD-10: {item.code}
                          </span>
                          <span>•</span>
                          <span className="text-[11px] text-sky-700 font-medium">{item.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg font-black text-slate-900">
                        {item.cases}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-semibold">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.rank === 1 ? 'bg-rose-500' : item.rank <= 3 ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${Math.min(100, item.percentage * 3.5)}%` }}
                    />
                  </div>

                  {/* Demography pill */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <span>L: <strong>{item.maleCases}</strong></span>
                      <span>•</span>
                      <span>P: <strong>{item.femaleCases}</strong></span>
                    </span>

                    <span className="flex items-center gap-1 font-semibold">
                      {item.trend === 'up' && (
                        <span className="text-rose-600 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" /> Tren Meningkat
                        </span>
                      )}
                      {item.trend === 'down' && (
                        <span className="text-emerald-600 flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" /> Tren Menurun
                        </span>
                      )}
                      {item.trend === 'stable' && (
                        <span className="text-slate-500 flex items-center gap-0.5">
                          <Minus className="w-3 h-3" /> Stabil
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: KUNJUNGAN RAWAT JALAN */}
        {activeTab === 'kunjungan' && (
          <div className="space-y-6">
            
            {/* Chart Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-sky-600" />
                    Tren Kunjungan Rawat Jalan Bulanan Faskes Tahun {selectedYear}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Perbandingan jumlah kunjungan pasien di 5 fasilitas kesehatan pulau per bulan (Jan - Des).
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-3 py-1 rounded-lg transition ${
                      chartType === 'bar' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Diagram Batang
                  </button>
                  <button
                    onClick={() => setChartType('line')}
                    className={`px-3 py-1 rounded-lg transition ${
                      chartType === 'line' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Grafik Garis
                  </button>
                </div>
              </div>

              {/* Chart Container */}
              <div className="h-80 sm:h-96 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart data={visitChartData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#475569' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderRadius: '12px', 
                          border: 'none', 
                          color: '#fff', 
                          fontSize: '11px' 
                        }} 
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Bar dataKey="Puskesmas Kec. (Tidung)" fill="#0284c7" stackId="a" />
                      <Bar dataKey="Pustu P. Pari" fill="#0d9488" stackId="a" />
                      <Bar dataKey="Pustu P. Untung Jawa" fill="#6366f1" stackId="a" />
                      <Bar dataKey="Pustu P. Lancang" fill="#f59e0b" stackId="a" />
                      <Bar dataKey="Poskes P. Payung" fill="#ec4899" stackId="a" />
                    </BarChart>
                  ) : (
                    <LineChart data={visitChartData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#475569' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderRadius: '12px', 
                          border: 'none', 
                          color: '#fff', 
                          fontSize: '11px' 
                        }} 
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Line type="monotone" dataKey="Puskesmas Kec. (Tidung)" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Pustu P. Pari" stroke="#0d9488" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Pustu P. Untung Jawa" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Pustu P. Lancang" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Poskes P. Payung" stroke="#ec4899" strokeWidth={1.5} dot={{ r: 2 }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>

            </div>

            {/* Distribution Cards by Island Facility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-sky-200/80 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-sky-800 uppercase block">P. Tidung (Puskesmas Kec)</span>
                <p className="text-xl font-extrabold text-slate-900">
                  {monthlyVisitsList.reduce((acc, v) => acc + v.puskesmasKecamatan, 0).toLocaleString('id-ID')}
                </p>
                <span className="text-[10px] text-slate-500">Pusat Rujukan Rawat Inap</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-teal-200/80 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-teal-800 uppercase block">Pustu Pulau Pari</span>
                <p className="text-xl font-extrabold text-slate-900">
                  {monthlyVisitsList.reduce((acc, v) => acc + v.pustuPari, 0).toLocaleString('id-ID')}
                </p>
                <span className="text-[10px] text-slate-500">Pelayanan Klaster ILP</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-indigo-200/80 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-indigo-800 uppercase block">P. Untung Jawa</span>
                <p className="text-xl font-extrabold text-slate-900">
                  {monthlyVisitsList.reduce((acc, v) => acc + v.pustuUntungJawa, 0).toLocaleString('id-ID')}
                </p>
                <span className="text-[10px] text-slate-500">Puskesmas Kelurahan</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-amber-800 uppercase block">Pustu Pulau Lancang</span>
                <p className="text-xl font-extrabold text-slate-900">
                  {monthlyVisitsList.reduce((acc, v) => acc + v.pustuLancang, 0).toLocaleString('id-ID')}
                </p>
                <span className="text-[10px] text-slate-500">Jejaring Rawat Jalan</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-rose-800 uppercase block">Poskes P. Payung</span>
                <p className="text-xl font-extrabold text-slate-900">
                  {monthlyVisitsList.reduce((acc, v) => acc + v.poskesPayung, 0).toLocaleString('id-ID')}
                </p>
                <span className="text-[10px] text-slate-500">Pos Kesehatan Bahari</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: TABEL RINCIAN LENGKAP */}
        {activeTab === 'tabel' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  Rekapitulasi Kunjungan Rawat Jalan Bulanan Per Faskes (Tahun {selectedYear})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tabel data statistik lengkap per bulan dan proporsi jaminan kesehatan.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>Cetak / Ekspor Tabel</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-3 font-bold">Bulan</th>
                    <th className="p-3 font-bold">P. Tidung (Kec)</th>
                    <th className="p-3 font-bold">P. Pari</th>
                    <th className="p-3 font-bold">P. Lancang</th>
                    <th className="p-3 font-bold">P. Untung Jawa</th>
                    <th className="p-3 font-bold">P. Payung</th>
                    <th className="p-3 font-bold bg-sky-50 text-sky-900">Total Kunjungan</th>
                    <th className="p-3 font-bold text-emerald-800">BPJS</th>
                    <th className="p-3 font-bold text-slate-600">Rujukan RSUD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthlyVisitsList.map((item) => (
                    <tr key={item.monthIndex} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-semibold text-slate-900">{item.monthName}</td>
                      <td className="p-3 text-slate-700">{item.puskesmasKecamatan}</td>
                      <td className="p-3 text-slate-700">{item.pustuPari}</td>
                      <td className="p-3 text-slate-700">{item.pustuLancang}</td>
                      <td className="p-3 text-slate-700">{item.pustuUntungJawa}</td>
                      <td className="p-3 text-slate-700">{item.poskesPayung}</td>
                      <td className="p-3 font-extrabold text-sky-800 bg-sky-50/50">
                        {item.total}
                      </td>
                      <td className="p-3 text-emerald-700 font-semibold">{item.bpjs}</td>
                      <td className="p-3 text-rose-600 font-medium">{item.rujukanRsud}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-slate-100/80 font-black text-slate-900 border-t-2 border-slate-300">
                    <td className="p-3">TOTAL TAHUNAN</td>
                    <td className="p-3">{monthlyVisitsList.reduce((a, b) => a + b.puskesmasKecamatan, 0)}</td>
                    <td className="p-3">{monthlyVisitsList.reduce((a, b) => a + b.pustuPari, 0)}</td>
                    <td className="p-3">{monthlyVisitsList.reduce((a, b) => a + b.pustuLancang, 0)}</td>
                    <td className="p-3">{monthlyVisitsList.reduce((a, b) => a + b.pustuUntungJawa, 0)}</td>
                    <td className="p-3">{monthlyVisitsList.reduce((a, b) => a + b.poskesPayung, 0)}</td>
                    <td className="p-3 bg-sky-100 text-sky-950 font-black">
                      {monthlyVisitsList.reduce((a, b) => a + b.total, 0)}
                    </td>
                    <td className="p-3 text-emerald-900">
                      {monthlyVisitsList.reduce((a, b) => a + b.bpjs, 0)}
                    </td>
                    <td className="p-3 text-rose-700">
                      {monthlyVisitsList.reduce((a, b) => a + b.rujukanRsud, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
