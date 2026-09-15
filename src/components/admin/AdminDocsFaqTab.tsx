import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DocumentItem, FaqItem } from '../../types';
import { 
  FileText, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  DownloadCloud, 
  Tag
} from 'lucide-react';

interface Props {
  mode: 'documents' | 'faqs';
  onSuccessToast: (msg: string) => void;
}

export const AdminDocsFaqTab: React.FC<Props> = ({ mode, onSuccessToast }) => {
  const { documents, updateDocuments, faqs, updateFaqs } = useData();

  // Document state
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [docName, setDocName] = useState('');
  const [docCat, setDocCat] = useState('Formulir Pelayanan');
  const [docSize, setDocSize] = useState('1.2 MB');
  const [docDesc, setDocDesc] = useState('');

  // FAQ state
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');
  const [faqCat, setFaqCat] = useState('Umum');

  // Open Edit Doc
  const openEditDoc = (doc: DocumentItem) => {
    setEditingDoc(doc);
    setIsAddingDoc(false);
    setDocName(doc.name);
    setDocCat(doc.category);
    setDocSize(doc.fileSize);
    setDocDesc(doc.description || '');
  };

  const openNewDoc = () => {
    setEditingDoc(null);
    setIsAddingDoc(true);
    setDocName('');
    setDocCat('Formulir Pelayanan');
    setDocSize('1.5 MB');
    setDocDesc('');
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    if (isAddingDoc) {
      const newItem: DocumentItem = {
        id: `doc-${Date.now()}`,
        name: docName.trim(),
        category: docCat,
        fileSize: docSize.trim() || '1.0 MB',
        fileType: 'PDF',
        downloadsCount: 0,
        date: new Date().toISOString().split('T')[0],
        description: docDesc.trim()
      };
      updateDocuments([newItem, ...documents]);
      onSuccessToast(`Dokumen "${docName}" berhasil ditambahkan.`);
    } else if (editingDoc) {
      const updated = documents.map(d => {
        if (d.id === editingDoc.id) {
          return {
            ...d,
            name: docName.trim(),
            category: docCat,
            fileSize: docSize.trim(),
            description: docDesc.trim()
          };
        }
        return d;
      });
      updateDocuments(updated);
      onSuccessToast(`Dokumen "${docName}" berhasil diperbarui.`);
    }
    setEditingDoc(null);
    setIsAddingDoc(false);
  };

  // Open Edit FAQ
  const openEditFaq = (f: FaqItem) => {
    setEditingFaq(f);
    setIsAddingFaq(false);
    setFaqQ(f.question);
    setFaqA(f.answer);
    setFaqCat(f.category);
  };

  const openNewFaq = () => {
    setEditingFaq(null);
    setIsAddingFaq(true);
    setFaqQ('');
    setFaqA('');
    setFaqCat('Umum');
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQ.trim() || !faqA.trim()) return;

    if (isAddingFaq) {
      const newFaq: FaqItem = {
        id: `faq-${Date.now()}`,
        question: faqQ.trim(),
        answer: faqA.trim(),
        category: faqCat
      };
      updateFaqs([newFaq, ...faqs]);
      onSuccessToast('Pertanyaan FAQ baru berhasil ditambahkan.');
    } else if (editingFaq) {
      const updated = faqs.map(f => {
        if (f.id === editingFaq.id) {
          return {
            ...f,
            question: faqQ.trim(),
            answer: faqA.trim(),
            category: faqCat
          };
        }
        return f;
      });
      updateFaqs(updated);
      onSuccessToast('Pertanyaan FAQ berhasil diperbarui.');
    }
    setEditingFaq(null);
    setIsAddingFaq(false);
  };

  // ===================== DOKUMEN VIEW =====================
  if (mode === 'documents') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DownloadCloud className="w-5 h-5 text-sky-600" />
              <span>Kelola Download Center & Dokumen SOP ({documents.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Formulir permohonan, brosur informasi, maklumat pelayanan, dan SK penetapan.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewDoc}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Dokumen</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {documents.map((doc) => (
            <div 
              key={doc.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{doc.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-bold">
                    {doc.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {doc.fileSize} ({doc.fileType})
                  </span>
                </div>
                {doc.description && <p className="text-slate-600 text-xs">{doc.description}</p>}
                <p className="text-slate-400 text-[11px]">Tanggal unggah: {doc.date}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => openEditDoc(doc)}
                  className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Hapus dokumen "${doc.name}"?`)) {
                      updateDocuments(documents.filter(d => d.id !== doc.id));
                      onSuccessToast('Dokumen berhasil dihapus.');
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

        {/* MODAL EDIT / CREATE DOC */}
        {(editingDoc || isAddingDoc) && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <FileText className="w-5 h-5 text-sky-600" />
                  <span>{isAddingDoc ? 'Unggah Dokumen Publik Baru' : `Edit Dokumen: ${editingDoc?.name}`}</span>
                </div>
                <button onClick={() => { setEditingDoc(null); setIsAddingDoc(false); }} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDoc} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Dokumen</label>
                  <input
                    type="text"
                    required
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="Contoh: Formulir Skrining Kesehatan Lansia..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:bg-white focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori Dokumen</label>
                    <select
                      value={docCat}
                      onChange={(e) => setDocCat(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                    >
                      <option value="Formulir Pelayanan">Formulir Pelayanan</option>
                      <option value="Standar Pelayanan">Standar Pelayanan SOP</option>
                      <option value="Brosur & Edukasi">Brosur & Edukasi</option>
                      <option value="Regulasi & SK">Regulasi & SK Resmi</option>
                      <option value="Laporan Kinerja">Laporan Kinerja & Akreditasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Estimasi Ukuran File</label>
                    <input
                      type="text"
                      value={docSize}
                      onChange={(e) => setDocSize(e.target.value)}
                      placeholder="1.2 MB"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deskripsi Singkat Dokumen</label>
                  <textarea
                    rows={3}
                    value={docDesc}
                    onChange={(e) => setDocDesc(e.target.value)}
                    placeholder="Jelaskan isi dan kegunaan dokumen ini bagi warga..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setEditingDoc(null); setIsAddingDoc(false); }}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Dokumen</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===================== FAQ VIEW =====================
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <span>Kelola FAQ Tanya Jawab Warga ({faqs.length})</span>
          </h3>
          <p className="text-xs text-slate-500">
            Pertanyaan dan jawaban penting yang sering ditanyakan warga kepulauan.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewFaq}
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pertanyaan FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div 
            key={f.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs flex flex-col sm:flex-row items-start justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{f.question}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-bold">
                  {f.category}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{f.answer}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => openEditFaq(f)}
                className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Hapus FAQ "${f.question}"?`)) {
                    updateFaqs(faqs.filter(x => x.id !== f.id));
                    onSuccessToast('FAQ berhasil dihapus.');
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

      {/* MODAL EDIT / CREATE FAQ */}
      {(editingFaq || isAddingFaq) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                <span>{isAddingFaq ? 'Tambah Pertanyaan FAQ Baru' : 'Edit Pertanyaan FAQ'}</span>
              </div>
              <button onClick={() => { setEditingFaq(null); setIsAddingFaq(false); }} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Kategori Pertanyaan</label>
                <select
                  value={faqCat}
                  onChange={(e) => setFaqCat(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                >
                  <option value="Umum">Informasi Umum</option>
                  <option value="BPJS & Administrasi">BPJS & Administrasi</option>
                  <option value="Pelayanan & Rujukan">Pelayanan & Rujukan Maritim</option>
                  <option value="Ambulans Laut">Ambulans Laut 24 Jam</option>
                  <option value="Jadwal Poli">Jadwal Poli & Dokter</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pertanyaan (Question)</label>
                <input
                  type="text"
                  required
                  value={faqQ}
                  onChange={(e) => setFaqQ(e.target.value)}
                  placeholder="Contoh: Apakah pasien luar wilayah DKI Jakarta dapat berobat?"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:bg-white focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jawaban Informatif (Answer)</label>
                <textarea
                  rows={4}
                  required
                  value={faqA}
                  onChange={(e) => setFaqA(e.target.value)}
                  placeholder="Tuliskan jawaban yang ramah, jelas, dan akurat..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setEditingFaq(null); setIsAddingFaq(false); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
