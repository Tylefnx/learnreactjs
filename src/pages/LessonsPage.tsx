import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Search } from 'lucide-react';
import { getLessonsData } from '../data/lessonsData';
import { useLanguage } from '../i18n/LanguageContext';

interface LessonsPageProps {
  onSelectLesson: (id: string) => void;
}

export const LessonsPage: React.FC<LessonsPageProps> = ({ onSelectLesson }) => {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Tümü');

  const lessonsList = getLessonsData(language);

  const categoriesTR = ['Tümü', 'Temel Mimari', 'State & Logic', 'Lifecycle & Side-Effects', 'Advanced Logic', 'Performance', 'State Management', 'Routing & Architecture', 'Server Architecture', 'Forms & Security', 'Testing & DevOps', 'AI & Architecture'];
  const categoriesEN = ['All', 'Core Architecture', 'State & Logic', 'Lifecycle & Side-Effects', 'Advanced Logic', 'Performance', 'State Management', 'Routing & Architecture', 'Server Architecture', 'Forms & Security', 'Testing & DevOps', 'AI & Architecture'];

  const categories = language === 'en' ? categoriesEN : categoriesTR;

  const filtered = lessonsList.filter((lesson) => {
    const isAll = selectedCat === 'Tümü' || selectedCat === 'All';
    const matchesCat = isAll || lesson.category === selectedCat;
    const matchesSearch =
      lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      lesson.overview.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>{language === 'en' ? 'React 19 & Next.js Curriculum' : 'React 19 & Next.js Müfredatı'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          {language === 'en'
            ? `${lessonsList.length} Comprehensive Learning Modules`
            : `${lessonsList.length} Kapsamlı Eğitim Modülü`}
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          {language === 'en'
            ? 'From JSX compilation and Virtual DOM to Fiber reconciliation, Custom Hooks, Zustand, Next.js 15 App Router, React Server Components, Production Testing, and AI-Assisted Vibe Coding Engineering.'
            : 'Temel JSX ve Virtual DOM mimarisinden başlayarak Fiber reconciler, Custom Hook\'lar, Zustand, Next.js 15 App Router, React Server Components, Test Stratejileri ve Yapay Zekâ Destekli Vibe Coding Mühendisliğine kadar eksiksiz rehber.'}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCat === cat || ((selectedCat === 'Tümü' || selectedCat === 'All') && (cat === 'Tümü' || cat === 'All'))
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'en' ? 'Filter modules...' : 'Modüllerde filtrele...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((module) => (
          <div
            key={module.id}
            onClick={() => onSelectLesson(module.id)}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 cursor-pointer transition-all flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/40">
                  {language === 'en' ? `Module ${module.number}` : `Modül ${module.number}`}
                </span>
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{module.durationMinutes} min</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                    {module.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {module.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">{module.subtitle}</p>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-500 block mb-1">
                  {language === 'en' ? 'Key Sections:' : 'Konu Başlıkları:'}
                </span>
                <div className="space-y-1">
                  {module.sections.map((sec) => (
                    <div key={sec.id} className="text-xs text-slate-400 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                      <span className="line-clamp-1">{sec.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400">{module.category}</span>
              <div className="flex items-center space-x-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>{language === 'en' ? 'Open Module' : 'Ders İçeriğine Git'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
