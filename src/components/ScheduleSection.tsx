import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  CalendarDays, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  UserCheck, 
  Layers, 
  CheckCircle2, 
  X,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Activity,
  Heart,
  ChevronRight,
  Building2
} from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const { schedules, profile } = useData();
  const [selectedDay, setSelectedDay] = useState<string>('Semua');
  const [selectedLocation, setSelectedLocation] = useState<string>('Semua');
  const [selectedCluster, setSelectedCluster] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive Day selector for Kepgub DKI No. 755 Tahun 2024
  const [activeGovDay, setActiveGovDay] = useState<'senin' | 'selasa-kamis' | 'jumat'>('senin');

  const govDayHours = {
    'senin': {
      title: 'Senin',
      hours: '12.00 – 18.00 WIB',
      registration: '11.30 – 17.30 WIB',
      note: 'Pelayanan poli rawat jalan dimulai pukul 12.00 WIB sesuai Kepgub DKI Jakarta No. 755/2024.'
    },
    'selasa-kamis': {
      title: 'Selasa – Kamis',
      hours: '07.30 – 16.00 WIB',
      registration: '07.30 – 15.00 WIB',
      note: 'Pelayanan poli rawat jalan beroperasi penuh pagi hingga sore hari.'
    },
    'jumat': {
      title: 'Jumat',
      hours: '07.30 – 16.30 WIB',
      registration: '07.30 – 15.30 WIB',
      note: 'Istirahat sholat Jumat: 11.45 – 13.00 WIB (layanan darurat IGD & rawat inap tetap aktif 24 jam).'
    }
  };

  const poliList = [
    { name: 'Pelayanan Umum', desc: 'Pemeriksaan dokter umum & penanganan medis dasar' },
    { name: 'Pelayanan Gigi', desc: 'Pemeriksaan gigi, penambalan, pencabutan & scaling' },
    { name: 'Pelayanan KIA', desc: 'Kesehatan Ibu & Anak, USG Kehamilan, KB & Nifas' },
    { name: 'Pelayanan Imunisasi', desc: 'Imunisasi rutin bayi, balita, calon pengantin & WUS' },
    { name: 'Pelayanan TB', desc: 'Pemeriksaan dahak TCM & pengobatan tuberkulosis paru terpadu' },
    { name: 'Pelayanan MTBS', desc: 'Manajemen Terpadu Balita Sakit & tumbuh kembang anak' },
    { name: 'Pelayanan Gizi', desc: 'Konsultasi gizi balita, pencegahan stunting & edukasi nutrisi' },
    { name: 'Pelayanan Lansia', desc: 'Pemeriksaan geriatri terpadu, skrining hipertensi & diabetes' },
    { name: 'Pelayanan Keswa', desc: 'Kesehatan Jiwa, konseling psikososial & penanganan depresi' }
  ];

  const layanan24JamList = [
    'Pelayanan Rawat Inap — 24 Jam',
    'Pelayanan Siaga — 24 Jam',
    'Pelayanan Ruang Bersalin — 24 Jam',
    'Pelayanan Gawat Darurat — 24 Jam'
  ];

  const daysList = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Setiap Hari (Senin - Minggu)'];

  const locationsList = [
    'Semua',
    'Puskesmas Kepulauan Seribu Selatan',
    'Pustu Pulau Lancang',
    'Pustu Pulau Pari',
    'Pustu Pulau Untung Jawa'
  ];

  const clustersList = [
    'Semua',
    'Klaster 2 (Ibu dan Anak)',
    'Klaster 3 (Dewasa & Lansia)',
    'Klaster 4 (Penyakit Menular)',
    'Lintas Klaster'
  ];

  const filteredSchedules = schedules.filter((sch) => {
    const matchesDay = selectedDay === 'Semua' || sch.day === selectedDay || sch.day.includes(selectedDay);
    const matchesLocation = selectedLocation === 'Semua' || sch.location === selectedLocation || sch.location.includes(selectedLocation);
    const matchesCluster = selectedCluster === 'Semua' || sch.cluster === selectedCluster || sch.cluster.includes(selectedCluster);
    const matchesSearch = 
      sch.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.doctorOrOfficer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesLocation && matchesCluster && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedDay('Semua');
    setSelectedLocation('Semua');
    setSelectedCluster('Semua');
    setSearchQuery('');
  };

  return (
    <section id="jadwal-section" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            Keputusan Gubernur DKI No. 755 Tahun 2024
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Jam Pelayanan Resmi Puskesmas
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Puskesmas Kepulauan Seribu Selatan dan Jejaring Pustu Pulau Lancang, Pustu Pulau Pari, dan Pustu Pulau Untung Jawa.
          </p>
        </div>

        {/* Dedicated Official Card: Jam Pelayanan (Kepgub DKI No. 755 Tahun 2024) */}
        <div className="bg-white rounded-3xl border-2 border-emerald-500/30 shadow-xl overflow-hidden mb-12">
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 px-6 py-5 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/30 text-emerald-300">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                    Jam Pelayanan (Kepgub DKI No. 755 Tahun 2024)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                  Pilih hari untuk melihat jam layanan rawat jalan. Daftar poli tersedia di bawah.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 text-xs font-mono font-bold whitespace-nowrap">
                  DKI Jakarta
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Rawat Jalan (Poli) Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Rawat Jalan (Poli)</span>
                </h4>
                <span className="text-xs text-slate-500 font-medium">Klik hari untuk mengecek jam operasional</span>
              </div>

              {/* Day selection buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveGovDay('senin')}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    activeGovDay === 'senin'
                      ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-base text-slate-900">Senin</span>
                    {activeGovDay === 'senin' && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div className="text-emerald-700 font-bold text-sm">
                    12.00 – 18.00 WIB
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Loket pendaftaran: 11.30 – 17.30 WIB
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveGovDay('selasa-kamis')}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    activeGovDay === 'selasa-kamis'
                      ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-base text-slate-900">Selasa – Kamis</span>
                    {activeGovDay === 'selasa-kamis' && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div className="text-emerald-700 font-bold text-sm">
                    07.30 – 16.00 WIB
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Loket pendaftaran: 07.30 – 15.00 WIB
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveGovDay('jumat')}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    activeGovDay === 'jumat'
                      ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-base text-slate-900">Jumat</span>
                    {activeGovDay === 'jumat' && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div className="text-emerald-700 font-bold text-sm">
                    07.30 – 16.30 WIB
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Istirahat Sholat: 11.45 – 13.00 WIB
                  </p>
                </button>
              </div>

              {/* Active Day Detail Highlight Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-100 font-semibold block uppercase tracking-wider">
                      Jam Layanan Terpilih ({govDayHours[activeGovDay].title})
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold tracking-tight">
                      {govDayHours[activeGovDay].title}: {govDayHours[activeGovDay].hours}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-emerald-100 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                  {govDayHours[activeGovDay].note}
                </div>
              </div>
            </div>

            {/* Grid 2 Columns: Daftar Poli & Layanan 24 Jam */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 border-t border-slate-100">
              
              {/* Left: Daftar Poli (9 Poli Resmi) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-600" />
                    <span>Daftar Poli Rawat Jalan</span>
                  </h4>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    9 Poliklinik
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {poliList.map((poli, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 transition group"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          {idx + 1}
                        </span>
                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                            {poli.name}
                          </h5>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {poli.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Layanan 24 Jam */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-600 animate-pulse" />
                    <span>Layanan 24 Jam</span>
                  </h4>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Setiap Hari: 24 Jam
                  </span>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white p-4 sm:p-5 border border-rose-500/30 shadow-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-xs font-mono font-bold tracking-wider text-rose-300 uppercase">
                      Kesiapsiagaan Non-Stop
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-extrabold">
                      Setiap Hari: 24 Jam
                    </span>
                  </div>

                  <div className="space-y-2">
                    {layanan24JamList.map((layanan, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-rose-100 hover:bg-white/10 transition"
                      >
                        <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{layanan}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                    <span>Hotline Darurat Kepulauan:</span>
                    <span className="font-bold text-emerald-300">{profile.emergencyHotline}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong className="font-bold">Fasilitas Terhubung:</strong> Puskesmas Kepulauan Seribu Selatan, Pustu Pulau Lancang, Pustu Pulau Pari, dan Pustu Pulau Untung Jawa.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm mb-8 space-y-4">
          
          {/* Day Pills Bar */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Pilih Hari Pelayanan:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {daysList.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedDay === day
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Dropdowns & Search */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
            
            {/* Search Input */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 mb-1 block">Cari Pelayanan / Nakes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Misal: KIA, USG, Lansia..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 mb-1 block">Filter Lokasi Pulau</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Cluster Filter */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 mb-1 block">Filter Klaster ILP</label>
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                {clustersList.map((cl) => (
                  <option key={cl} value={cl}>{cl}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filter</span>
              </button>
            </div>

          </div>
        </div>

        {/* Schedule Table / Cards */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          
          {/* Table View on Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-extrabold border-b border-slate-200 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Hari</th>
                  <th className="py-3.5 px-4">Jenis Pelayanan</th>
                  <th className="py-3.5 px-4">Jam Pelayanan</th>
                  <th className="py-3.5 px-4">Lokasi Faskes</th>
                  <th className="py-3.5 px-4">Klaster ILP</th>
                  <th className="py-3.5 px-4">Petugas / Dokter</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredSchedules.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Tidak ada jadwal yang sesuai dengan filter yang dipilih.
                    </td>
                  </tr>
                ) : (
                  filteredSchedules.map((item) => (
                    <tr key={item.id} className="hover:bg-sky-50/50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                          {item.day}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                        {item.serviceName}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-sky-700 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          <span>{item.hours}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-[11px]">
                          {item.cluster}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {item.doctorOrOfficer}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden divide-y divide-slate-100 p-3 space-y-3">
            {filteredSchedules.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Tidak ada jadwal yang sesuai filter.
              </div>
            ) : (
              filteredSchedules.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold px-2 py-0.5 rounded bg-sky-600 text-white text-[11px]">
                      {item.day}
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{item.serviceName}</h4>

                  <div className="space-y-1 text-slate-600">
                    <div className="flex items-center gap-1.5 font-semibold text-sky-700">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{item.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-600" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{item.doctorOrOfficer}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
