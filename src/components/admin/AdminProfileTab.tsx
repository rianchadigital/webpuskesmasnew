import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Building2, 
  Save, 
  UserCheck, 
  Award, 
  Clock, 
  Phone, 
  MapPin, 
  FileText, 
  Plus, 
  Trash2,
  CheckCircle2,
  Image as ImageIcon,
  Upload,
  Camera,
  RotateCcw
} from 'lucide-react';

interface Props {
  onSuccessToast: (msg: string) => void;
}

export const AdminProfileTab: React.FC<Props> = ({ onSuccessToast }) => {
  const { profile, updateProfile } = useData();
  const [subSection, setSubSection] = useState<'umum' | 'sambutan' | 'visimisi' | 'kontak'>('umum');
  const [newMissionText, setNewMissionText] = useState('');
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran foto terlalu besar (maksimal 5MB). Silakan pilih foto lain.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateProfile({ headOfPuskesmasPhoto: dataUrl });
        localStorage.setItem('puskesmas_head_photo', dataUrl);
        onSuccessToast('Pas foto resmi Kepala Puskesmas berhasil diperbarui!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    updateProfile({ headOfPuskesmasPhoto: '/kepala-puskesmas.svg' });
    localStorage.removeItem('puskesmas_head_photo');
    onSuccessToast('Pas foto resmi dikembalikan ke berkas bawaan.');
  };

  const handleAddMission = () => {
    if (!newMissionText.trim()) return;
    const updated = [...(profile.missions || []), newMissionText.trim()];
    updateProfile({ missions: updated });
    setNewMissionText('');
    onSuccessToast('Misi baru berhasil ditambahkan!');
  };

  const handleRemoveMission = (idx: number) => {
    const updated = profile.missions.filter((_, i) => i !== idx);
    updateProfile({ missions: updated });
    onSuccessToast('Misi berhasil dihapus.');
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'umum', label: '1. Informasi Umum', icon: Building2 },
          { id: 'sambutan', label: '2. Sambutan Kepala Puskesmas', icon: UserCheck },
          { id: 'visimisi', label: '3. Visi, Misi & Nilai PRIMA', icon: Award },
          { id: 'kontak', label: '4. Jam & Kontak Resmi', icon: Phone },
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = subSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setSubSection(sec.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. INFORMASI UMUM */}
      {subSection === 'umum' && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-600" />
            <span>Identitas Resmi Puskesmas</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Resmi Puskesmas</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Sub Judul / Keterangan</label>
              <input
                type="text"
                value={profile.subtitle}
                onChange={(e) => updateProfile({ subtitle: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Motto Pelayanan</label>
              <input
                type="text"
                value={profile.motto}
                onChange={(e) => updateProfile({ motto: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-emerald-800 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Tentang & Sejarah Singkat Puskesmas</label>
              <textarea
                rows={4}
                value={profile.about || profile.history}
                onChange={(e) => updateProfile({ about: e.target.value, history: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 leading-relaxed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Deskripsi Wilayah Kerja 5 Pulau</label>
              <textarea
                rows={3}
                value={profile.workingAreaDescription}
                onChange={(e) => updateProfile({ workingAreaDescription: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. SAMBUTAN KEPALA PUSKESMAS */}
      {subSection === 'sambutan' && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Profil Pimpinan & Naskah Sambutan Resmi</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Kepala Puskesmas</label>
              <input
                type="text"
                value={profile.headOfPuskesmasName || profile.headOfPuskesmas}
                onChange={(e) => updateProfile({ headOfPuskesmasName: e.target.value, headOfPuskesmas: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Jabatan Resmi</label>
              <input
                type="text"
                value={profile.headOfPuskesmasTitle}
                onChange={(e) => updateProfile({ headOfPuskesmasTitle: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">NIP (Nomor Induk Pegawai)</label>
              <input
                type="text"
                value={profile.headOfPuskesmasNip}
                onChange={(e) => updateProfile({ headOfPuskesmasNip: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div className="md:col-span-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-bold text-slate-800 text-xs block">Pas Foto Resmi Kepala Puskesmas (Eksklusif Sisi Admin)</label>
                  <p className="text-[11px] text-slate-500">
                    Unggah pas foto resmi (3x4). Foto langsung diperbarui di Halaman Sambutan & Struktur Organisasi tanpa memunculkan tombol ganti foto di tampilan publik.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-[11px] text-slate-600 font-semibold flex items-center gap-1.5 transition shrink-0"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset ke Bawaan
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                {/* 3x4 Thumbnail Preview */}
                <div className="relative w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 border-amber-400/80 shadow-xs bg-slate-800 shrink-0">
                  <img 
                    src={profile.headOfPuskesmasPhoto || '/kepala-puskesmas.svg'} 
                    alt="Preview Pas Foto Resmi" 
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/kepala-puskesmas.svg'; }}
                  />
                  <div className="absolute top-1 left-1 bg-slate-900/80 text-[8px] font-bold text-amber-300 px-1 py-0.5 rounded">
                    3x4
                  </div>
                </div>

                {/* Upload Action and URL input */}
                <div className="flex-1 w-full space-y-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Pilih Foto dari Perangkat (JPG / PNG)
                    </button>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileUpload}
                      className="hidden"
                    />
                    <span className="text-[11px] text-slate-500 italic">Maksimal 5MB</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-600 shrink-0">Atau URL:</span>
                    <input
                      type="text"
                      value={profile.headOfPuskesmasPhoto}
                      onChange={(e) => {
                        updateProfile({ headOfPuskesmasPhoto: e.target.value });
                        localStorage.setItem('puskesmas_head_photo', e.target.value);
                      }}
                      placeholder="https://... atau /kepala-puskesmas.svg"
                      className="flex-1 p-2 rounded-xl bg-white border border-slate-200 font-mono text-[11px] focus:border-sky-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="font-bold text-slate-700 block mb-1">Naskah Sambutan Lengkap</label>
              <textarea
                rows={8}
                value={profile.welcomeSpeech}
                onChange={(e) => updateProfile({ welcomeSpeech: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 leading-relaxed font-sans text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. VISI, MISI & TATA NILAI PRIMA */}
      {subSection === 'visimisi' && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-600" />
            <span>Visi, Misi & Budaya Kerja</span>
          </h4>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Visi Puskesmas</label>
              <input
                type="text"
                value={profile.vision}
                onChange={(e) => updateProfile({ vision: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-2">Daftar Misi Pelayanan</label>
              <div className="space-y-2 mb-3">
                {profile.missions.map((mission, mIdx) => (
                  <div key={mIdx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-[11px] shrink-0">
                      {mIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={mission}
                      onChange={(e) => {
                        const updated = [...profile.missions];
                        updated[mIdx] = e.target.value;
                        updateProfile({ missions: updated });
                      }}
                      className="flex-1 bg-transparent border-0 focus:ring-0 text-xs font-medium text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMission(mIdx)}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-50"
                      title="Hapus Misi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tambah Misi */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMissionText}
                  onChange={(e) => setNewMissionText(e.target.value)}
                  placeholder="Tulis butir misi baru..."
                  className="flex-1 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddMission(); }}
                />
                <button
                  type="button"
                  onClick={handleAddMission}
                  className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Misi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. KONTAK & JAM OPERASIONAL */}
      {subSection === 'kontak' && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Jam Kerja Regulasi & Nomor Darurat Maritim</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Jam Operasional Poliklinik (Kepgub 755/2024)</label>
              <input
                type="text"
                value={profile.operatingHours}
                onChange={(e) => updateProfile({ operatingHours: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Layanan Gawat Darurat (IGD) & Rawat Inap</label>
              <input
                type="text"
                value={profile.emergencyHours}
                onChange={(e) => updateProfile({ emergencyHours: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Hotline Ambulans Laut 24 Jam Antar-Pulau</label>
              <input
                type="text"
                value={profile.seaAmbulanceHotline}
                onChange={(e) => updateProfile({ seaAmbulanceHotline: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-rose-600 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Hotline Kegawatdaruratan Darat</label>
              <input
                type="text"
                value={profile.emergencyHotline}
                onChange={(e) => updateProfile({ emergencyHotline: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp Resmi Layanan & Pengaduan</label>
              <input
                type="text"
                value={profile.whatsapp}
                onChange={(e) => updateProfile({ whatsapp: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-emerald-700 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Resmi Puskesmas</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => updateProfile({ email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Alamat Kantor / Dermaga Pelayanan Utama</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => updateProfile({ address: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Perubahan otomatis tersimpan ke penyimpanan sistem.
        </span>
        <button
          type="button"
          onClick={() => onSuccessToast('Informasi profil berhasil disimpan ke sistem!')}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Profil Puskesmas</span>
        </button>
      </div>
    </div>
  );
};
