import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceSchedule } from '../../types';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Clock, 
  MapPin, 
  UserCheck,
  Search
} from 'lucide-react';

interface Props {
  onSuccessToast: (msg: string) => void;
}

export const AdminSchedulesTab: React.FC<Props> = ({ onSuccessToast }) => {
  const { schedules, updateSchedules, ilpClusters } = useData();
  const [editingSchedule, setEditingSchedule] = useState<ServiceSchedule | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');

  // Form states
  const [day, setDay] = useState('Senin - Kamis');
  const [serviceName, setServiceName] = useState('');
  const [hours, setHours] = useState('08.00 - 15.00 WIB');
  const [location, setLocation] = useState('Puskesmas Kecamatan Pulau Tidung');
  const [cluster, setCluster] = useState('Klaster 2: Ibu & Anak');
  const [doctorOrOfficer, setDoctorOrOfficer] = useState('');
  const [status, setStatus] = useState<'Aktif' | 'Penyesuaian' | 'Panggilan Khusus'>('Aktif');

  const openEdit = (item: ServiceSchedule) => {
    setEditingSchedule(item);
    setIsAdding(false);
    setDay(item.day);
    setServiceName(item.serviceName);
    setHours(item.hours);
    setLocation(item.location);
    setCluster(item.cluster);
    setDoctorOrOfficer(item.doctorOrOfficer);
    setStatus(item.status);
  };

  const openNew = () => {
    setEditingSchedule(null);
    setIsAdding(true);
    setDay('Senin - Kamis');
    setServiceName('');
    setHours('08.00 - 15.00 WIB');
    setLocation('Puskesmas Kecamatan Pulau Tidung');
    setCluster(ilpClusters[0]?.title || 'Klaster 2: Ibu & Anak');
    setDoctorOrOfficer('dr. Tim Dokter Jaga');
    setStatus('Aktif');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) return;

    if (isAdding) {
      const newItem: ServiceSchedule = {
        id: `sched-${Date.now()}`,
        day,
        serviceName: serviceName.trim(),
        hours,
        location,
        cluster,
        doctorOrOfficer: doctorOrOfficer.trim() || 'Tim Medis Puskesmas',
        status
      };
      updateSchedules([...schedules, newItem]);
      onSuccessToast(`Jadwal "${serviceName}" berhasil ditambahkan.`);
    } else if (editingSchedule) {
      const updated = schedules.map(s => {
        if (s.id === editingSchedule.id) {
          return {
            ...s,
            day,
            serviceName: serviceName.trim(),
            hours,
            location,
            cluster,
            doctorOrOfficer: doctorOrOfficer.trim(),
            status
          };
        }
        return s;
      });
      updateSchedules(updated);
      onSuccessToast(`Jadwal "${serviceName}" berhasil diperbarui.`);
    }

    setEditingSchedule(null);
    setIsAdding(false);
  };

  const filtered = schedules.filter(s => 
    s.serviceName.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase()) ||
    s.doctorOrOfficer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-600" />
            <span>Kelola Jadwal Dokter & Poliklinik ({schedules.length})</span>
          </h3>
          <p className="text-slate-500">
            Jadwal harian poliklinik, tenaga medis penanggung jawab, dan lokasi faskes pulau.
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal</span>
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari jadwal poli, lokasi atau nama dokter..."
        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500"
      />

      <div className="space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{item.serviceName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-sky-100 text-sky-800 font-bold">
                  {item.day}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.hours}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{item.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.doctorOrOfficer}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => openEdit(item)}
                className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Hapus jadwal "${item.serviceName}"?`)) {
                    updateSchedules(schedules.filter(s => s.id !== item.id));
                    onSuccessToast('Jadwal dihapus.');
                  }
                }}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {(editingSchedule || isAdding) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Calendar className="w-5 h-5 text-sky-600" />
                <span>{isAdding ? 'Tambah Jadwal Pelayanan Baru' : `Edit Jadwal: ${editingSchedule?.serviceName}`}</span>
              </div>
              <button onClick={() => { setEditingSchedule(null); setIsAdding(false); }} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Layanan / Poli</label>
                <input
                  type="text"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="Contoh: Poli Gigi & Mulut"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hari Pelayanan</label>
                  <input
                    type="text"
                    required
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="Senin - Kamis"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jam Pelayanan</label>
                  <input
                    type="text"
                    required
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="08.00 - 15.00 WIB"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lokasi Fasilitas Kesehatan</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Puskesmas Kecamatan Pulau Tidung"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dokter / Petugas</label>
                  <input
                    type="text"
                    value={doctorOrOfficer}
                    onChange={(e) => setDoctorOrOfficer(e.target.value)}
                    placeholder="dr. Ahmad / Tim Medis"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Penyesuaian">Penyesuaian</option>
                    <option value="Panggilan Khusus">Panggilan Khusus</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setEditingSchedule(null); setIsAdding(false); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Jadwal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
