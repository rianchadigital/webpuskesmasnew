import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ILPCluster } from '../../types';
import { 
  Layers, 
  Edit3, 
  Save, 
  X, 
  UserCheck, 
  Clock, 
  Plus, 
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onSuccessToast: (msg: string) => void;
}

export const AdminIlpTab: React.FC<Props> = ({ onSuccessToast }) => {
  const { ilpClusters, updateIlpClusters } = useData();
  const [editingCluster, setEditingCluster] = useState<ILPCluster | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [picName, setPicName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [schedule, setSchedule] = useState('');
  const [servicesText, setServicesText] = useState('');

  const openEdit = (c: ILPCluster) => {
    setEditingCluster(c);
    setTitle(c.title);
    setSubtitle(c.subtitle);
    setPicName(c.picName || '');
    setDescription(c.description);
    setTargetAudience(c.targetAudience);
    setSchedule(c.schedule);
    setServicesText(c.services.join('\n'));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCluster) return;

    const servicesArray = servicesText.split('\n').map(s => s.trim()).filter(Boolean);

    const updated = ilpClusters.map(c => {
      if (c.id === editingCluster.id) {
        return {
          ...c,
          title,
          subtitle,
          picName,
          description,
          targetAudience,
          schedule,
          services: servicesArray
        };
      }
      return c;
    });

    updateIlpClusters(updated);
    onSuccessToast(`Klaster ILP "${title}" berhasil diperbarui.`);
    setEditingCluster(null);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>Kelola 5 Klaster Integrasi Layanan Primer (ILP) Kemenkes</span>
        </h3>
        <p className="text-slate-500">
          Sesuaikan sasaran siklus hidup, dokter/petugas penanggung jawab (PIC), dan paket layanan kesehatan tiap klaster.
        </p>
      </div>

      <div className="space-y-3">
        {ilpClusters.map((cluster) => (
          <div
            key={cluster.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Klaster {cluster.clusterNumber}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{cluster.title}</h4>
                <p className="text-slate-500 text-[11px]">{cluster.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() => openEdit(cluster)}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1 shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Klaster</span>
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">{cluster.description}</p>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>PIC: <strong>{cluster.picName || 'Koordinator Klaster'}</strong></span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{cluster.schedule}</span>
              </span>
              <span>Sasaran: {cluster.targetAudience}</span>
              <span>•</span>
              <span>{cluster.services.length} Paket Layanan</span>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingCluster && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Layers className="w-5 h-5 text-emerald-600" />
                <span>Edit Klaster ILP: {editingCluster.title}</span>
              </div>
              <button onClick={() => setEditingCluster(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul Klaster</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sub Judul</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Penanggung Jawab (PIC)</label>
                  <input
                    type="text"
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    placeholder="dr. / Bdn. / Ns."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Klaster</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sasaran Siklus Hidup</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jadwal Operasional</label>
                  <input
                    type="text"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Daftar Layanan Klaster (Pisahkan dengan baris baru / Enter)
                </label>
                <textarea
                  rows={4}
                  value={servicesText}
                  onChange={(e) => setServicesText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCluster(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Klaster</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
