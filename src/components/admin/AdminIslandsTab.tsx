import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { IslandFacility } from '../../types';
import { 
  Anchor, 
  MapPin, 
  Phone, 
  Clock, 
  Edit3, 
  Save, 
  X, 
  UserCheck, 
  Ship, 
  Building2,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onSuccessToast: (msg: string) => void;
}

export const AdminIslandsTab: React.FC<Props> = ({ onSuccessToast }) => {
  const { islands, updateIslands } = useData();
  const [editingIsland, setEditingIsland] = useState<IslandFacility | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [headOfficer, setHeadOfficer] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [ambulanceBoat, setAmbulanceBoat] = useState('');

  const openEditModal = (isl: IslandFacility) => {
    setEditingIsland(isl);
    setName(isl.name);
    setAddress(isl.address);
    setHeadOfficer(isl.headOfficer || '');
    setContactNumber(isl.contactNumber);
    setOperatingHours(isl.operatingHours);
    setAmbulanceBoat(isl.ambulanceBoat || isl.emergencyService || 'Standby Dermaga');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIsland) return;

    const updated = islands.map(item => {
      if (item.id === editingIsland.id) {
        return {
          ...item,
          name,
          address,
          headOfficer,
          contactNumber,
          operatingHours,
          emergencyService: ambulanceBoat,
          ambulanceBoat
        };
      }
      return item;
    });

    updateIslands(updated);
    onSuccessToast(`Data fasilitas ${editingIsland.islandName} berhasil diperbarui.`);
    setEditingIsland(null);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Anchor className="w-5 h-5 text-sky-600" />
          <span>Fasilitas Pelayanan Kesehatan Wilayah 5 Pulau ({islands.length})</span>
        </h3>
        <p className="text-xs text-slate-500">
          Perbarui nama fasilitas, alamat dermaga, penanggung jawab pustu, dan kontak darurat maritim masing-masing pulau.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {islands.map((isl) => (
          <div 
            key={isl.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs space-y-3 text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                  {isl.islandName}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{isl.name}</h4>
              </div>
              <button
                type="button"
                onClick={() => openEditModal(isl)}
                className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold flex items-center gap-1 transition shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Faskes</span>
              </button>
            </div>

            <div className="space-y-1.5 text-slate-600 text-[11px]">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{isl.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Penanggung Jawab: <strong>{isl.headOfficer || 'Staf Medis Terpadu'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Jam Buka: {isl.operatingHours}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800">{isl.contactNumber}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="text-sky-800 font-medium">Ambulans Laut: {isl.ambulanceBoat || 'Siaga Antar-Pulau'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingIsland && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Anchor className="w-5 h-5 text-sky-600" />
                <span>Edit Faskes {editingIsland.islandName}</span>
              </div>
              <button onClick={() => setEditingIsland(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Fasilitas Kesehatan</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:bg-white focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Alamat Dermaga / Lokasi</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Penanggung Jawab</label>
                  <input
                    type="text"
                    value={headOfficer}
                    onChange={(e) => setHeadOfficer(e.target.value)}
                    placeholder="dr. / Bdn. / Ns."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nomor Kontak / WhatsApp</label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jam Operasional Pelayanan</label>
                  <input
                    type="text"
                    value={operatingHours}
                    onChange={(e) => setOperatingHours(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status Ambulans Laut</label>
                  <input
                    type="text"
                    value={ambulanceBoat}
                    onChange={(e) => setAmbulanceBoat(e.target.value)}
                    placeholder="Standby Dermaga Utama"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingIsland(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
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
