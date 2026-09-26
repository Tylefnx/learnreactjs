import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Code2, Layers, Award, ArrowRight } from 'lucide-react';
import { getLessonsData } from '../data/lessonsData';
import { getRecipesData } from '../data/recipesData';
import { getArchitectureData } from '../data/architectureData';
import { useLanguage } from '../i18n/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onNavigateTab,
}) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const lessons = getLessonsData(language);
  const recipes = getRecipesData(language);
  const archs = getArchitectureData(language);

  const filteredLessons = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.overview.toLowerCase().includes(query.toLowerCase()) ||
      l.sections.some((s) => s.title.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredRecipes = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      r.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArch = archs.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'en' ? "Search modules, hooks, Fiber, RSC, or recipes..." : "Modül, Hook, Fiber, RSC veya Tarif ara... (ör. useEffect, Zustand, Server Actions)"}
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Lessons Section */}
          {filteredLessons.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Learning Modules' : 'Eğitim Modülleri'} ({filteredLessons.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/30 cursor-pointer transition-all group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {language === 'en' ? 'Module' : 'Modül'} {lesson.number}: {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{lesson.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipes Section */}
          {filteredRecipes.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Code Recipes' : 'Kod Tarifleri'} ({filteredRecipes.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      onNavigateTab('recipes');
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-purple-500/30 cursor-pointer transition-all group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-slate-200 group-hover:text-purple-300 transition-colors">
                        {recipe.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{recipe.description}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                      {recipe.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Section */}
          {filteredArch.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Fiber & Architecture' : 'Fiber & Mimari'} ({filteredArch.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredArch.map((arch) => (
                  <div
                    key={arch.id}
                    onClick={() => {
                      onNavigateTab('architecture');
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/30 cursor-pointer transition-all group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-slate-200 group-hover:text-emerald-300 transition-colors">
                        {arch.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{arch.description}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                      {arch.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredLessons.length === 0 && filteredRecipes.length === 0 && filteredArch.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p>
                {language === 'en'
                  ? `No matching modules, recipes, or concepts found for "${query}".`
                  : `"${query}" ile eşleşen bir modül veya tarif bulunamadı.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
