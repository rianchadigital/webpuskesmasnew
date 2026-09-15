import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MessageSquare, 
  PhoneCall, 
  CheckCircle2, 
  X
} from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs, navigateToTab } = useData();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [expandedIds, setExpandedIds] = useState<{ [key: string]: boolean }>({
    'faq-1': true,
    'faq-4': true
  });

  const categories = ['Semua', 'Umum', 'Pelayanan', 'ILP', 'Rujukan & Ambulans', 'BPJS & Administrasi', 'Pustu Kepulauan'];

  const toggleFaq = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = selectedCategory === 'Semua' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq-section" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Tanya Jawab Seputar Layanan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Temukan jawaban cepat mengenai jam buka, ambulans laut, kepesertaan BPJS, alur Integrasi Layanan Primer (ILP), dan pelayanan di pulau.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ketik pertanyaan atau kata kunci (contoh: rujukan, ambulans, imunisasi)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-3xl p-6">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-600">Pertanyaan tidak ditemukan.</p>
              <p className="text-xs text-slate-400 mt-1">Silakan hubungi kontak informasi Puskesmas langsung.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = !!expandedIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-purple-50/40 border-purple-200 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold flex items-center justify-center shrink-0">
                        ?
                      </span>
                      <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div className={`p-1 rounded-lg text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-purple-600' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium border-t border-purple-100/60 animate-in slide-in-from-top-1 duration-200">
                      <p className="pl-9">{faq.answer}</p>
                      <div className="pl-9 mt-3 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                          Kategori: {faq.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-slate-900 text-sm">Masih memiliki pertanyaan seputar pelayanan?</h4>
            <p className="text-xs text-slate-600">Tim humas dan pelayanan informasi Puskesmas siap membantu Anda.</p>
          </div>
          <button
            onClick={() => navigateToTab('kontak')}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition shrink-0"
          >
            Hubungi Kami
          </button>
        </div>

      </div>
    </section>
  );
};
