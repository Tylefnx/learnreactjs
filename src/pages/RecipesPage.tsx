import React, { useState } from 'react';
import { Code2, Search, Filter } from 'lucide-react';
import { getRecipesData } from '../data/recipesData';
import { CodeBlock } from '../components/CodeBlock';
import { useLanguage } from '../i18n/LanguageContext';

export const RecipesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const recipes = getRecipesData(language);

  const categories = [
    { key: 'all', label: language === 'tr' ? 'Tümü' : 'All' },
    { key: 'Custom Hooks', label: 'Custom Hooks' },
    { key: 'State & Store', label: 'State & Store' },
    { key: 'Next.js & Server Actions', label: 'Next.js & Server Actions' },
  ];

  const filtered = recipes.filter((recipe) => {
    const matchesCat = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase()) ||
      recipe.tags.some((tTag) => tTag.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>{t.recipes.badge}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">{t.recipes.title}</h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          {t.recipes.desc}
        </p>
      </div>

      {/* Category Filter & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.recipes.searchPlaceholder}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="space-y-8">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                    {recipe.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {t.recipes.complexity} {recipe.complexity}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{recipe.title}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {recipe.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {recipe.description}
            </p>

            <CodeBlock
              code={recipe.code}
              language="tsx"
              filename={recipe.filename}
              title={recipe.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
