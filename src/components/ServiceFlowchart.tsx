import React, { useState } from 'react';
import { 
  UserCheck, 
  ClipboardList, 
  Search, 
  Stethoscope, 
  Activity, 
  Pill, 
  Ship, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Clock
} from 'lucide-react';

export const ServiceFlowchart: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps = [
    {
      step: 1,
      title: 'Datang & Antrean',
      subtitle: 'Tiba di Puskesmas / Pustu',
      icon: UserCheck,
      color: 'from-sky-500 to-blue-600',
      desc: 'Pasien datang langsung atau telah mengambil nomor antrean online melalui aplikasi Mobile JKN BPJS.',
      detail: 'Bagi pasien gawat darurat atau ibu melahirkan langsung menuju IGD/Ruang Bersalin 24 Jam tanpa mengantre loket biasa.',
      estTime: '3 - 5 Menit'
    },
    {
      step: 2,
      title: 'Pendaftaran & RME',
      subtitle: 'Verifikasi Berkas & Data',
      icon: ClipboardList,
      color: 'from-blue-600 to-indigo-600',
      desc: 'Petugas loket memverifikasi KTP/KK, kepesertaan BPJS, dan membuka Rekam Medis Elektronik (RME) SatuSehat.',
      detail: 'Buku KIA dibawa bagi ibu hamil dan balita. Pasien diarahkan menuju ruang tunggu klaster siklus hidup yang sesuai.',
      estTime: '5 - 10 Menit'
    },
    {
      step: 3,
      title: 'Skrining Awal',
      subtitle: 'Tanda Vital & Faktor Risiko',
      icon: Search,
      color: 'from-indigo-600 to-violet-600',
      desc: 'Perawat atau bidan melakukan pengukuran tensi darah, suhu tubuh, berat/tinggi badan, dan penapisan gejala awal.',
      detail: 'Pencatatan antropometri dan skrining PTM/gejala batuk infeksius untuk pengelompokan ruang periksa yang tepat.',
      estTime: '5 - 8 Menit'
    },
    {
      step: 4,
      title: 'Pemeriksaan Medis',
      subtitle: 'Konsultasi Dokter / Bidan',
      icon: Stethoscope,
      color: 'from-teal-600 to-emerald-600',
      desc: 'Dokter umum, dokter gigi, atau bidan melakukan anamnesis, pemeriksaan fisik mendalam, dan penegakan diagnosis.',
      detail: 'Dokter menentukan apakah pasien memerlukan pemeriksaan lab penunjang, tindakan medis minor, atau terapi resep obat.',
      estTime: '10 - 20 Menit'
    },
    {
      step: 5,
      title: 'Tindakan & Penunjang',
      subtitle: 'Lab / USG / Rawat Luka',
      icon: Activity,
      color: 'from-emerald-600 to-green-600',
      desc: 'Pemeriksaan laboratorium patologi (darah/urin/dahak TCM), USG kehamilan, atau perawatan luka di ruang tindakan.',
      detail: 'Hasil lab dan tindakan diverifikasi langsung secara real-time ke dalam sistem RME oleh petugas diagnostik.',
      estTime: '15 - 30 Menit'
    },
    {
      step: 6,
      title: 'Farmasi / Apotek',
      subtitle: 'Pengambilan Obat & PIO',
      icon: Pill,
      color: 'from-cyan-600 to-blue-600',
      desc: 'Penyiapan obat racikan atau non-racikan oleh apoteker disertai Penjelasan Informasi Obat (PIO) yang jelas.',
      detail: 'Pasien kronis (hipertensi/diabetes) menerima paket obat rutin 30 hari dan jadwal kontrol berikutnya.',
      estTime: '10 - 15 Menit'
    },
    {
      step: 7,
      title: 'Selesai / Rujukan',
      subtitle: 'Pulang Sehat / Ambulans Laut',
      icon: Ship,
      color: 'from-rose-600 to-red-600',
      desc: 'Pasien diperbolehkan pulang dengan edukasi PHBS, atau dipersiapkan rujukan maritim bila butuh penanganan spesialis lanjutan.',
      detail: 'Bila butuh rujukan, koordinasi SISRUTE dan armada Kapal Ambulans Laut disiapkan untuk penyeberangan aman ke RSUD.',
      estTime: 'Sesuai Kebutuhan'
    }
  ];

  const currentStep = steps[activeStepIndex];

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <ClipboardList className="w-3.5 h-3.5" />
            Standar Pelayanan Publik
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Alur Pelayanan Pasien
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Tahapan pelayanan kesehatan terpadu dan transparan mulai dari kedatangan pasien hingga selesai mendapatkan obat atau fasilitas rujukan.
          </p>
        </div>

        {/* Horizontal Interactive Steps Bar */}
        <div className="relative mb-10 overflow-x-auto pb-4 pt-2">
          <div className="flex items-center justify-between min-w-[760px] gap-2">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex-1 relative p-3 rounded-2xl border text-center transition-all duration-200 group flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-500/20'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Langkah 0{item.step}
                  </span>
                  
                  <h4 className="font-bold text-xs text-slate-900 mt-0.5 leading-snug line-clamp-1">
                    {item.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Deep Detail Box */}
        <div className="bg-gradient-to-br from-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r ${currentStep.color} text-white shadow-xs`}>
                  Tahap 0{currentStep.step} dari 07
                </span>
                <span className="text-xs text-teal-300 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Estimasi Waktu: {currentStep.estTime}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {currentStep.title} — <span className="text-sky-300">{currentStep.subtitle}</span>
              </h3>

              <p className="text-sm text-slate-200 leading-relaxed">
                {currentStep.desc}
              </p>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-start gap-3">
                <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {currentStep.detail}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between items-center lg:items-end gap-4">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold transition"
                >
                  Sebelumnya
                </button>
                <button
                  disabled={activeStepIndex === steps.length - 1}
                  onClick={() => setActiveStepIndex(Math.min(steps.length - 1, activeStepIndex + 1))}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Selanjutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-center lg:text-right">
                <p className="text-[11px] text-slate-400">Puskesmas Kepulauan Seribu Selatan</p>
                <p className="text-xs text-teal-300 font-semibold italic">"Cepat, Tepat, Nyaman & Terintegrasi"</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
