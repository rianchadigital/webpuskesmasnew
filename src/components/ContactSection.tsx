import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  PhoneCall, 
  MapPin, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  LifeBuoy, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile } = useData();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    island: 'Pulau Tidung',
    topic: 'Konsultasi Layanan',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        island: 'Pulau Tidung',
        topic: 'Konsultasi Layanan',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="kontak-section" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5" />
            Layanan Informasi & Pengaduan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hubungi Puskesmas Kepulauan Seribu Selatan
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Kami siap melayani kebutuhan informasi kesehatan, konsultasi, serta penanganan kedaruratan medis masyarakat maritim.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* General Contacts Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md space-y-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Informasi Kontak Resmi
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Alamat Puskesmas</h4>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{profile.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Jam Pelayanan Poliklinik</h4>
                    <p className="text-slate-600 mt-0.5">{profile.operatingHours}</p>
                    <p className="text-emerald-700 font-semibold text-xs mt-0.5">Pelayanan IGD & Bersalin: 24 Jam Non-Stop</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">WhatsApp Resmi Pelayanan</h4>
                    <p className="text-slate-600 mt-0.5">{profile.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Resmi</h4>
                    <p className="text-slate-600 mt-0.5 font-mono">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Website Resmi</h4>
                    <a 
                      href={profile.websiteUrl || "https://puskesmasseribuselatan.com"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sky-700 hover:text-sky-900 font-semibold mt-0.5 inline-flex items-center gap-1 underline underline-offset-2"
                    >
                      <span>{profile.websiteUrl || "https://puskesmasseribuselatan.com"}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Online Consultation & Message Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              
              <div className="space-y-1 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Formulir Pesan & Konsultasi</span>
                <h3 className="text-xl font-bold text-slate-900">Kirim Pertanyaan / Aspirasi</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Sampaikan pertanyaan mengenai jadwal, rujukan, pelayanan obat, atau masukan mutu puskesmas.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Pesan Anda Berhasil Terkirim!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Terima kasih telah menghubungi Puskesmas Kepulauan Seribu Selatan. Tim kami akan segera menindaklanjuti pesan Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap Anda..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1.5">Nomor HP / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Contoh: 08123456789"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1.5">Domisili Pulau</label>
                      <select
                        value={formData.island}
                        onChange={(e) => setFormData({ ...formData, island: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      >
                        <option value="Pulau Tidung">Pulau Tidung</option>
                        <option value="Pulau Pari">Pulau Pari</option>
                        <option value="Pulau Lancang">Pulau Lancang</option>
                        <option value="Pulau Untung Jawa">Pulau Untung Jawa</option>
                        <option value="Pulau Payung">Pulau Payung</option>
                        <option value="Luar Kepulauan / Wisatawan">Luar Kepulauan / Wisatawan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">Kategori Topik</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    >
                      <option value="Konsultasi Layanan">Informasi Pelayanan & Poli</option>
                      <option value="Integrasi Layanan Primer (ILP)">Pertanyaan Seputar ILP</option>
                      <option value="Ambulans Laut & Rujukan">Rujukan & Ambulans Laut</option>
                      <option value="Jadwal & Dokter">Jadwal Pelayanan & Dokter</option>
                      <option value="Saran & Masukan Mutu">Saran & Masukan Mutu Pelayanan</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">Isi Pesan / Pertanyaan *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pertanyaan atau kebutuhan informasi Anda di sini..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirimkan Pesan Informasi</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
