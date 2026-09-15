import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { DocumentItem } from '../types';
import { 
  DownloadCloud, 
  FileText, 
  Search, 
  Download, 
  CheckCircle2, 
  Calendar, 
  HardDrive,
  Filter,
  Sparkles,
  Eye
} from 'lucide-react';

export const DownloadSection: React.FC = () => {
  const { documents, openServiceDoc } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const categories = [
    'Semua',
    'Formulir pelayanan',
    'SOP publik',
    'Brosur kesehatan',
    'Informasi pelayanan',
    'Panduan',
    'Dokumen program'
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'Semua' || doc.category === selectedCategory;
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc: DocumentItem) => {
    if (doc.fileUrl) {
      const a = document.createElement('a');
      a.href = doc.fileUrl;
      a.download = doc.fileUrl.split('/').pop() || `${doc.name}.svg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setDownloadSuccessMsg(`Berhasil mengunduh dokumen resmi: ${doc.name}`);
      setTimeout(() => setDownloadSuccessMsg(null), 4000);
      return;
    }

    setDownloadSuccessMsg(`Mengunduh berkas "${doc.name}" (${doc.fileSize})...`);
    
    // Create a text file download fallback
    const element = document.createElement('a');
    const file = new Blob([
      `PUSKESMAS KEPULAUAN SERIBU SELATAN\n\nNama Dokumen: ${doc.name}\nKategori: ${doc.category}\nTanggal: ${doc.date}\nDeskripsi: ${doc.description}\n\n[Dokumen Resmi Puskesmas Kepulauan Seribu Selatan - Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami]`
    ], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setDownloadSuccessMsg(null);
    }, 4000);
  };

  return (
    <section id="unduhan-section" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <DownloadCloud className="w-3.5 h-3.5" />
            Pusat Dokumen & Formulir
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Download Center
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Unduh formulir pendaftaran, standar operasional prosedur (SOP) publik, buku panduan kesehatan, dan brosur edukasi ILP secara gratis.
          </p>
        </div>

        {/* Download Success Toast Notification */}
        {downloadSuccessMsg && (
          <div className="mb-6 max-w-xl mx-auto p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
              <span>{downloadSuccessMsg}</span>
            </div>
            <button onClick={() => setDownloadSuccessMsg(null)} className="text-emerald-200 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama dokumen / SOP..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>

        {/* Documents Table / Grid */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-extrabold border-b border-slate-200 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Nama Dokumen</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Tanggal Rilis</th>
                  <th className="py-3.5 px-4">Ukuran & Format</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400">
                      Tidak ada dokumen yang sesuai dengan pencarian Anda.
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-sky-50/50 transition">
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm leading-snug">{doc.name}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">{doc.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{doc.date}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                          <span>{doc.fileSize} ({doc.fileType})</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {doc.fileUrl && (
                            <button
                              onClick={() => {
                                if (doc.id === 'doc-standar-pelayanan') openServiceDoc('standar');
                                else if (doc.id === 'doc-maklumat-pelayanan') openServiceDoc('maklumat');
                                else if (doc.id === 'doc-hak-kewajiban') openServiceDoc('hak-kewajiban');
                                else window.open(doc.fileUrl, '_blank');
                              }}
                              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition active:scale-95"
                              title="Buka Dokumen PDF"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-700" />
                              <span>Lihat PDF</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleDownload(doc)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-2xs transition active:scale-95"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Unduh</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
