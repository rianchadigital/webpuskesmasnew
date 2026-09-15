import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Building2, 
  Quote, 
  Check, 
  ShieldCheck, 
  Heart, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Printer,
  Award
} from 'lucide-react';

export const WelcomeSection: React.FC = () => {
  const { profile, navigateToTab } = useData();
  const photoUrl = profile.headOfPuskesmasPhoto || localStorage.getItem('puskesmas_head_photo') || '/kepala-puskesmas.svg';

  return (
    <section id="sambutan-section" className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-sky-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Section Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Sambutan Resmi Pimpinan
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs hover:bg-slate-50 transition"
              title="Cetak Sambutan"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Top Header Banner */}
          <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 text-white relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-2">
              <span className="text-xs sm:text-sm font-semibold text-teal-300 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Pemerintah Provinsi DKI Jakarta • Dinas Kesehatan
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Sambutan Kepala Puskesmas Kepulauan Seribu Selatan
              </h1>
              <p className="text-xs sm:text-sm text-sky-200 font-medium">
                Komitmen pelayanan kesehatan bermutu, profesional, terjangkau, dan transparan bagi masyarakat pesisir & kepulauan.
              </p>
            </div>
          </div>

          {/* Body Content: Two Columns */}
          <div className="p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Official 3x4 Photo & Profile Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-xs bg-slate-50 rounded-3xl p-4 border border-slate-200 shadow-md">
                
                {/* 3x4 Photo Frame with Green Studio Background */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-lg group bg-emerald-800">
                  <img
                    src={photoUrl}
                    alt="dr. Ignatius Dendy Purnama - Kepala Puskesmas Kepulauan Seribu Selatan"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/kepala-puskesmas.svg';
                    }}
                  />

                  {/* Corner Ribbon / Official Emblem */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-400/30">
                    <Award className="w-3 h-3 text-amber-400" />
                    Pas Foto Resmi
                  </div>
                </div>

                {/* Identity Metadata Box */}
                <div className="mt-4 text-center space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                    dr. Ignatius Dendy Purnama
                  </h3>
                  <p className="text-xs font-bold text-sky-700">
                    Kepala Puskesmas Kepulauan Seribu Selatan
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 bg-white py-1 px-2 rounded-lg border border-slate-200/80 inline-block mt-1">
                    NIP. 198503222010012031
                  </p>
                </div>

                {/* Key Commitments Badges */}
                <div className="mt-4 space-y-2">
                  <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200/80 text-[11px] text-teal-900 font-medium flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Penerapan Integrasi Layanan Primer (ILP)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200/80 text-[11px] text-sky-900 font-medium flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Budaya Kerja Tata Nilai PRIMA</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200/80 text-[11px] text-indigo-900 font-medium flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Kesiapsiagaan Tim Medis & Fasilitas Rujukan Kepulauan</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Full Speech Text */}
            <div className="lg:col-span-7 space-y-6 text-slate-700">
              
              {/* Quote Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border-l-4 border-sky-600 space-y-1">
                <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-sky-600" />
                  Pesan Utama Pimpinan
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed">
                  "Kesehatan merupakan investasi berharga bagi setiap individu dan masyarakat. Kami mengajak seluruh masyarakat untuk berpartisipasi aktif menjaga kesehatan melalui PHBS dan pemanfaatan faskes yang tersedia."
                </p>
              </div>

              {/* Official Welcome Speech (Exact Wording) */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                <p className="font-semibold text-slate-900 text-base sm:text-lg">
                  Assalamu'alaikum Wr. Wb.
                </p>

                <p>
                  Puji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas segala rahmat dan karunia-Nya sehingga kita dapat menjalankan tugas pelayanan kesehatan kepada masyarakat dengan sebaik-baiknya.
                </p>

                <p>
                  Selamat datang di website resmi Puskesmas Kepulauan Seribu Selatan. Website ini merupakan salah satu media informasi dan komunikasi kami kepada masyarakat dalam rangka meningkatkan transparansi dan akuntabilitas pelayanan publik.
                </p>

                <p>
                  Puskesmas Kepulauan Seribu Selatan berkomitmen untuk memberikan pelayanan kesehatan yang berkualitas, profesional, dan terjangkau bagi seluruh masyarakat di wilayah kerja kami. Kami terus berupaya meningkatkan kualitas pelayanan melalui peningkatan kompetensi sumber daya manusia, perbaikan sarana dan prasarana, serta penerapan sistem manajemen mutu.
                </p>

                <p>
                  Kami menyadari bahwa kesehatan merupakan investasi berharga bagi setiap individu dan masyarakat. Oleh karena itu, kami mengajak seluruh masyarakat untuk berpartisipasi aktif dalam menjaga dan meningkatkan status kesehatan melalui perilaku hidup bersih dan sehat serta pemanfaatan fasilitas pelayanan kesehatan yang tersedia.
                </p>

                <p>
                  Akhir kata, kami mengucapkan terima kasih atas kepercayaan yang diberikan kepada Puskesmas Kepulauan Seribu Selatan. Kritik dan saran dari masyarakat sangat kami harapkan demi perbaikan pelayanan kesehatan di masa mendatang.
                </p>

                <p className="font-semibold text-slate-900 pt-2">
                  Wassalamu'alaikum Wr. Wb.
                </p>
              </div>

              {/* Official Closing Signature Block */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs uppercase font-bold tracking-wider text-slate-500">
                    Kepala Puskesmas Kepulauan Seribu Selatan
                  </p>
                  <p className="text-lg font-extrabold text-slate-900">
                    dr. Ignatius Dendy Purnama
                  </p>
                  <p className="text-xs font-mono text-slate-600">
                    NIP. 198503222010012031
                  </p>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => navigateToTab('profil')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition"
                  >
                    <span>Visi & Misi Puskesmas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigateToTab('profil')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    <span>Struktur Organisasi</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
