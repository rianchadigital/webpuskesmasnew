import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { OrganizationChart } from './OrganizationChart';
import { WelcomeSection } from './WelcomeSection';
import { 
  Building2, 
  Target, 
  Award, 
  Network, 
  Map, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Anchor, 
  Layers, 
  Stethoscope,
  Heart,
  ChevronRight,
  LifeBuoy,
  UserCheck
} from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const { profile, islands, navigateToTab, profileSubTab, setProfileSubTab } = useData();
  const [activeSubTab, setActiveSubTab] = useState<'sambutan' | 'visimisi' | 'struktur' | 'profil' | 'wilayah' | 'fasilitas'>('sambutan');
  const [selectedMapIsland, setSelectedMapIsland] = useState<string>('tidung');

  useEffect(() => {
    if (profileSubTab) {
      setActiveSubTab(profileSubTab);
    }
  }, [profileSubTab]);

  const handleSubTabChange = (tab: 'sambutan' | 'visimisi' | 'struktur' | 'profil' | 'wilayah' | 'fasilitas') => {
    setActiveSubTab(tab);
    setProfileSubTab(tab);
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const facilities = [
    { name: 'Instalasi Gawat Darurat (IGD) 24 Jam', desc: 'Penanganan kegawatdaruratan medis, trauma, dan resusitasi dengan dokter & perawat siaga non-stop.', icon: 'Ambulance' },
    { name: 'Kapal Ambulans Laut Evakuasi Medis', desc: 'Armada kapal cepat medis dilengkapi monitor EKG, ventilator transport, tabung oksigen, dan brankar khusus rujukan.', icon: 'Ship' },
    { name: 'Poli Rawat Jalan & Poli Spesifik Siklus Hidup', desc: 'Poli umum, Poli KIA, Poli Lansia/PTM, Poli TB DOTS, dan Poli Gigi dengan standar kenyamanan faskes pemerintah.', icon: 'Stethoscope' },
    { name: 'Ruang Bersalin (PONED) 24 Jam', desc: 'Fasilitas persalinan normal dan penanganan awal kegawatdaruratan maternal neonatal berstandar Kemenkes.', icon: 'Baby' },
    { name: 'Laboratorium Diagnostik Terpadu', desc: 'Alat hematologi otomatis, Tes Cepat Molekuler (TCM TB), kimia darah, urinalisis, dan rapid skrining.', icon: 'FlaskConical' },
    { name: 'Instalasi Farmasi & Gudang Obat Cold Chain', desc: 'Penyimpanan obat dan vaksin berbasis rantai dingin (cold chain 2-8°C) bersertifikasi menjamin potensi vaksin kepulauan.', icon: 'Pill' },
    { name: 'Fasilitas Rawat Inap Sementara', desc: 'Tempat tidur observasi pasien dan stabilisasi pra-rujukan laut dengan pemantauan tenaga medis.', icon: 'Bed' },
    { name: 'Sistem Informasi SatuSehat & RME Terpadu', desc: 'Pencatatan rekam medis digital terintegrasi bridging BPJS P-Care dan Kementerian Kesehatan.', icon: 'Laptop' },
  ];

  const organizationStructure = [
    { role: 'Kepala Puskesmas', name: profile.headOfPuskesmasName || 'dr. Ignatius Dendy Purnama', desc: 'Penanggung Jawab Utama Kebijakan, Pelayanan, & Mutu Faskes' },
    { role: 'Kepala Subbagian Tata Usaha', name: 'Achmad Syarif, S.AP', desc: 'Pengelola Administrasi, Keuangan, Kepegawaian & Logistik' },
    { role: 'Koordinator Klaster 1 (Manajemen)', name: 'Ns. Eko Prasetyo, S.Kep', desc: 'Perencanaan, Mutu, Pelaporan & SP2TP' },
    { role: 'Koordinator Klaster 2 (Ibu & Anak)', name: 'Bdn. Sri Wahyuni, S.Tr.Keb', desc: 'Pelayanan KIA, KB, Imunisasi, Gizi & Remaja' },
    { role: 'Koordinator Klaster 3 (Dewasa & Lansia)', name: 'dr. Nurul Fitriani', desc: 'Pengendalian PTM, Prolanis & Geriatri Santun' },
    { role: 'Koordinator Klaster 4 (P2P & Menular)', name: 'Ns. Ahmad Fauzi, S.Kep', desc: 'TB DOTS, DBD, Surveilans & Posko KLB' },
    { role: 'Koordinator Lintas Klaster & Penunjang', name: 'dr. Rizki Pratama', desc: 'IGD, Ambulans Laut, Farmasi & Laboratorium' },
    { role: 'Koordinator Jejaring Pustu Pulau', name: 'Ns. Hendra Wijaya, S.Kep', desc: 'Supervisi Pustu Pulau Lancang, Pulau Pari, dan Pulau Untung Jawa' },
  ];

  return (
    <section id="profil-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            Mengenal Lebih Dekat
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Profil Puskesmas Kepulauan Seribu Selatan
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Fasilitas pelayanan kesehatan tingkat pertama yang mengintegrasikan layanan darat dan maritim untuk kesejahteraan seluruh warga kepulauan.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-2xs overflow-x-auto max-w-full gap-1">
            <button
              onClick={() => handleSubTabChange('sambutan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeSubTab === 'sambutan'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-slate-200/60'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Sambutan Pimpinan</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                activeSubTab === 'sambutan' ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'
              }`}>
                Foto Resmi
              </span>
            </button>

            <button
              onClick={() => handleSubTabChange('visimisi')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeSubTab === 'visimisi'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-slate-200/60'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Visi Misi & Nilai</span>
            </button>

            <button
              onClick={() => handleSubTabChange('struktur')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeSubTab === 'struktur'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-slate-200/60'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Struktur Organisasi</span>
            </button>

            <button
              onClick={() => handleSubTabChange('profil')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeSubTab === 'profil'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-slate-200/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Profil & Sejarah</span>
            </button>

            <button
              onClick={() => handleSubTabChange('wilayah')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeSubTab === 'wilayah'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-slate-200/60'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Peta Wilayah Kerja</span>
            </button>

            <button
              onClick={() => handleSubTabChange('fasilitas')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeSubTab === 'fasilitas'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Sarana & Fasilitas</span>
            </button>
          </div>
        </div>

        {/* Tab 0: Sambutan Kepala Puskesmas Resmi */}
        {activeSubTab === 'sambutan' && (
          <div className="animate-in fade-in duration-300">
            <WelcomeSection />
          </div>
        )}

        {/* Tab 1: Profil & Sejarah */}
        {activeSubTab === 'profil' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-50 text-sky-700 font-semibold text-xs border border-sky-100">
                <Anchor className="w-3.5 h-3.5" />
                Sejarah & Gambaran Umum
              </div>

              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                Pusat Pelayanan Kesehatan Primer Maritim Terintegrasi
              </h3>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>{profile.history}</p>
                <p>
                  Sebagai fasilitas kesehatan terdepan di wilayah selatan Kepulauan Seribu, Puskesmas ini terus berinovasi mengimplementasikan <strong>Integrasi Layanan Primer (ILP)</strong> yang mendekatkan akses pemeriksaan siklus hidup keluarga ke posyandu di setiap RW pulau.
                </p>
                <p>{profile.workingAreaDescription}</p>
              </div>

              {/* Motto highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/80 flex items-center gap-4">
                <div className="p-3 bg-sky-600 rounded-xl text-white shadow-sm">
                  <Heart className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-sky-800 tracking-wider">Motto Pelayanan</h4>
                  <p className="text-base font-extrabold text-slate-900 italic">"{profile.motto}"</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
                <img
                  src="/slider.png"
                  alt="Gedung Puskesmas Kepulauan Seribu Selatan"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Gedung Utama Puskesmas</span>
                  <h4 className="text-lg font-bold text-white">Puskesmas Kepulauan Seribu Selatan</h4>
                  <p className="text-xs text-slate-300 mt-1">{profile.address}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Visi Misi & Nilai Organisasi */}
        {activeSubTab === 'visimisi' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Visi Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-700 via-blue-800 to-indigo-900 text-white shadow-xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sky-100 text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                Visi Puskesmas
              </div>
              <p className="text-lg sm:text-xl font-bold leading-relaxed max-w-4xl text-white">
                "{profile.vision}"
              </p>
            </div>

            {/* Misi Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-bold text-slate-900">Misi Puskesmas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.missions.map((mission, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3.5 hover:border-sky-300 transition">
                    <div className="w-7 h-7 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {renderFormattedText(mission)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nilai Organisasi (Tata Nilai PRIMA) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900">Tata Nilai Budaya Kerja ("PRIMA")</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.values.map((val, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-sky-300 transition">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 font-extrabold text-sm flex items-center justify-center">
                        {val.code}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{val.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Struktur Organisasi */}
        {activeSubTab === 'struktur' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <OrganizationChart />
          </div>
        )}

        {/* Tab 4: Wilayah Kerja & Interactive Map */}
        {activeSubTab === 'wilayah' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
              <div className="max-w-2xl space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/30 text-sky-300 text-xs font-bold">
                  <Map className="w-3.5 h-3.5" />
                  Peta Navigasi Fasilitas Kesehatan Pulau
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Gugusan Pulau Layanan Puskesmas Kepulauan Seribu Selatan
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Pilih pulau di bawah ini untuk melihat titik koordinat, fasilitas puskesmas pembantu, dan akses ambulans laut.
                </p>
              </div>

              {/* Island Selector Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {islands.map((isl) => (
                  <button
                    key={isl.id}
                    onClick={() => setSelectedMapIsland(isl.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedMapIsland === isl.id
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    <Anchor className="w-3.5 h-3.5" />
                    <span>{isl.islandName}</span>
                  </button>
                ))}
              </div>

              {/* Interactive Visual Map Card */}
              {(() => {
                const currentIsland = islands.find((i) => i.id === selectedMapIsland) || islands[0];
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-800/80 rounded-2xl p-5 border border-slate-700">
                    <div className="lg:col-span-7 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wide">
                          {currentIsland.type} • {currentIsland.islandName}
                        </span>
                        <span className="text-[11px] bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono">
                          {currentIsland.coordinates.lat}, {currentIsland.coordinates.lng}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white">{currentIsland.name}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{currentIsland.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700">
                          <p className="text-slate-400 font-medium">Jam Pelayanan:</p>
                          <p className="text-white font-semibold">{currentIsland.operatingHours}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700">
                          <p className="text-slate-400 font-medium">Layanan Darurat:</p>
                          <p className="text-emerald-400 font-semibold">{currentIsland.emergencyService}</p>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => navigateToTab('wilayah', currentIsland.id)}
                          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <span>Lihat Rincian Fasilitas Pulau</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-700 h-56 lg:h-auto">
                      <img
                        src={currentIsland.image}
                        alt={currentIsland.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                        <span className="text-xs font-semibold text-white bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                          📍 {currentIsland.address}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Tab 5: Sarana & Fasilitas */}
        {activeSubTab === 'fasilitas' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Sarana & Prasarana Medis Kepulauan</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Dilengkapi dengan teknologi kesehatan modern dan armada kelautan berstandar Kemenkes RI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {facilities.map((fac, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-sky-300 transition flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{fac.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {fac.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-sky-700">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-600" />
                    <span>Tersedia & Terverifikasi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
