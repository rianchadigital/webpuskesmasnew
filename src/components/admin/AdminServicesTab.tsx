import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { HealthService } from '../../types';
import { 
  Stethoscope, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Check, 
  Layers, 
  Clock, 
  Coins, 
  FileText,
  Search
} from 'lucide-react';

interface Props {
  onSuccessToast: (msg: string) => void;
}

export const AdminServicesTab: React.FC<Props> = ({ onSuccessToast }) => {
  const { healthServices, updateHealthServices, ilpClusters } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingService, setEditingService] = useState<HealthService | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State for edit or create
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<'Dalam Gedung' | 'Luar Gedung'>('Dalam Gedung');
  const [formCluster, setFormCluster] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSchedule, setFormSchedule] = useState('');
  const [formCost, setFormCost] = useState('');
  const [formReqs, setFormReqs] = useState('');
  const [formFlow, setFormFlow] = useState('');

  const openEditModal = (service: HealthService) => {
    setEditingService(service);
    setIsAddingNew(false);
    setFormName(service.name);
    setFormCategory(service.category);
    setFormCluster(service.ilpCluster || '');
    setFormDesc(service.description);
    setFormSchedule(service.schedule);
    setFormCost(service.cost);
    setFormReqs(service.requirements ? service.requirements.join('\n') : '');
    setFormFlow(service.flow ? service.flow.join('\n') : '');
  };

  const openNewModal = () => {
    setEditingService(null);
    setIsAddingNew(true);
    setFormName('');
    setFormCategory('Dalam Gedung');
    setFormCluster(ilpClusters[0]?.name || 'Klaster 2: Ibu & Anak');
    setFormDesc('');
    setFormSchedule('Senin - Kamis (08.00 - 15.00 WIB), Jumat (08.00 - 15.30 WIB)');
    setFormCost('Gratis / Ditanggung BPJS Kesehatan');
    setFormReqs('KTP / KK Asli\nKartu BPJS Kesehatan Aktif\nBuku KIA (untuk layanan ibu & balita)');
    setFormFlow('Ambil nomor antrean pendaftaran\nVerifikasi data di Loket Pendaftaran\nPemeriksaan tanda vital di ruang perawat\nPemeriksaan dokter & konsultasi medis\nPengambilan obat di loket Farmasi');
  };

  const closeModal = () => {
    setEditingService(null);
    setIsAddingNew(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const reqsArray = formReqs.split('\n').map(s => s.trim()).filter(Boolean);
    const flowArray = formFlow.split('\n').map(s => s.trim()).filter(Boolean);

    if (isAddingNew) {
      const newService: HealthService = {
        id: `svc-${Date.now()}`,
        name: formName.trim(),
        category: formCategory,
        clusterId: formCluster || 'cluster-2',
        ilpCluster: formCluster,
        description: formDesc.trim(),
        schedule: formSchedule.trim() || 'Senin - Jumat',
        fee: formCost.trim() || 'Gratis / Ditanggung BPJS',
        cost: formCost.trim() || 'Gratis / Ditanggung BPJS',
        contact: '0859-6100-0003',
        icon: 'Stethoscope',
        requirements: reqsArray,
        flow: flowArray
      };
      updateHealthServices([newService, ...healthServices]);
      onSuccessToast(`Layanan "${formName}" berhasil ditambahkan.`);
    } else if (editingService) {
      const updatedList = healthServices.map(svc => {
        if (svc.id === editingService.id) {
          return {
            ...svc,
            name: formName.trim(),
            category: formCategory,
            clusterId: formCluster || svc.clusterId,
            ilpCluster: formCluster,
            description: formDesc.trim(),
            schedule: formSchedule.trim(),
            fee: formCost.trim() || svc.fee,
            cost: formCost.trim(),
            requirements: reqsArray,
            flow: flowArray
          };
        }
        return svc;
      });
      updateHealthServices(updatedList);
      onSuccessToast(`Perubahan layanan "${formName}" berhasil disimpan.`);
    }

    closeModal();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus layanan "${name}" dari daftar pelayanan?`)) {
      updateHealthServices(healthServices.filter(s => s.id !== id));
      onSuccessToast(`Layanan "${name}" dihapus.`);
    }
  };

  const filteredServices = healthServices.filter(svc => 
    svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    svc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (svc.ilpCluster && svc.ilpCluster.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-sky-600" />
            <span>Kelola Daftar Layanan & Poliklinik ({healthServices.length})</span>
          </h3>
          <p className="text-xs text-slate-500">
            Edit jam layanan, persyaratan dokumen, alur pelayanan, dan integrasi klaster ILP.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      {/* Search filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama layanan, poliklinik, atau klaster..."
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-sky-500"
        />
      </div>

      {/* Services List Table / Cards */}
      <div className="space-y-2.5">
        {filteredServices.map((svc) => (
          <div
            key={svc.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs space-y-2 text-xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{svc.name}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    svc.category === 'Dalam Gedung' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {svc.category}
                  </span>
                  {svc.ilpCluster && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-medium">
                      {svc.ilpCluster}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mt-1 line-clamp-2">{svc.description}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openEditModal(svc)}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold flex items-center gap-1 transition"
                  title="Edit Layanan"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(svc.id, svc.name)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                  title="Hapus Layanan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{svc.schedule}</span>
              </span>
              <span className="flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-slate-700">{svc.cost}</span>
              </span>
              <span>{svc.requirements?.length || 0} Syarat</span>
              <span>•</span>
              <span>{svc.flow?.length || 0} Langkah Alur</span>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            Tidak ada layanan yang sesuai dengan pencarian.
          </div>
        )}
      </div>

      {/* EDIT / CREATE MODAL */}
      {(editingService || isAddingNew) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Stethoscope className="w-5 h-5 text-sky-600" />
                <span>{isAddingNew ? 'Tambah Layanan Kesehatan Baru' : `Edit Layanan: ${editingService?.name}`}</span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Nama Layanan / Poli</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Poli Gigi & Mulut"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:bg-white focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori Pelayanan</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Dalam Gedung">Dalam Gedung (Rawat Jalan / IGD)</option>
                    <option value="Luar Gedung">Luar Gedung (Posyandu / Skrining Pulau)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Klaster ILP Terkait</label>
                  <select
                    value={formCluster}
                    onChange={(e) => setFormCluster(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="">-- Pilih Klaster ILP --</option>
                    {ilpClusters.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Deskripsi Layanan</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Deskripsikan cakupan dan tindakan medis layanan ini..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jadwal / Jam Operasional</label>
                  <input
                    type="text"
                    value={formSchedule}
                    onChange={(e) => setFormSchedule(e.target.value)}
                    placeholder="Senin - Kamis (08.00-15.00 WIB)"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Biaya / Tarif</label>
                  <input
                    type="text"
                    value={formCost}
                    onChange={(e) => setFormCost(e.target.value)}
                    placeholder="Gratis (BPJS) / Sesuai Perda"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-emerald-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Persyaratan Dokumen Pasien (Pisahkan dengan baris baru / Enter)
                  </label>
                  <textarea
                    rows={3}
                    value={formReqs}
                    onChange={(e) => setFormReqs(e.target.value)}
                    placeholder="KTP / Kartu Identitas Anak (KIA)&#10;Kartu BPJS Kesehatan aktif&#10;Buku register posyandu"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Alur Pelayanan Pasien (Pisahkan dengan baris baru / Enter)
                  </label>
                  <textarea
                    rows={3}
                    value={formFlow}
                    onChange={(e) => setFormFlow(e.target.value)}
                    placeholder="Langkah 1: Pengambilan nomor antrean loket&#10;Langkah 2: Pemeriksaan vital sign&#10;Langkah 3: Konsultasi dokter"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Layanan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
