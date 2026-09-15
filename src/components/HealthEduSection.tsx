import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { HealthArticle } from '../types';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowRight, 
  X, 
  Heart, 
  Sparkles,
  Share2,
  CheckCircle2
} from 'lucide-react';

export const HealthEduSection: React.FC = () => {
  const { articles } = useData();
  const [selectedTag, setSelectedTag] = useState<string>('Semua');
  const [activeModalArticle, setActiveModalArticle] = useState<HealthArticle | null>(null);

  const allTags = ['Semua', 'DBD', 'Imunisasi', 'KIA', 'Hipertensi', 'Diabetes', 'TBC', 'Kesehatan Jiwa'];

  const filteredArticles = articles.filter((art) => {
    if (selectedTag === 'Semua') return true;
    return art.tags.includes(selectedTag) || art.category.toLowerCase().includes(selectedTag.toLowerCase());
  });

  return (
    <section id="edukasi-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Edukasi & Promosi Kesehatan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Informasi & Edukasi Kesehatan Masyarakat
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Kumpulan panduan praktis pola hidup bersih dan sehat (PHBS), pencegahan penyakit menular dan kronis, serta gizi seimbang untuk keluarga kepulauan.
          </p>
        </div>

        {/* Tag Filters Bar */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto max-w-full pb-4 mb-8 no-scrollbar">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-600/90 text-white text-[11px] font-bold backdrop-blur-xs">
                    {article.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 text-indigo-200">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime} Baca
                  </span>
                  <span className="text-slate-300 text-[11px]">
                    {new Date(article.date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-2 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveModalArticle(article)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <span>Baca Panduan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeModalArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
              
              <div className="relative h-56 rounded-2xl overflow-hidden">
                <img
                  src={activeModalArticle.image}
                  alt={activeModalArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase">
                      {activeModalArticle.category}
                    </span>
                    <button
                      onClick={() => setActiveModalArticle(null)}
                      className="p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition"
                      aria-label="Tutup"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {activeModalArticle.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span>Penyusun: <strong>{activeModalArticle.author}</strong></span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  {activeModalArticle.readTime}
                </span>
              </div>

              {/* Article Content Bullets / Paragraphs */}
              <div className="space-y-3.5 text-sm text-slate-700 leading-relaxed font-medium">
                {activeModalArticle.content.map((paragraph, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeModalArticle.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setActiveModalArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                >
                  Tutup Artikel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
