import React from 'react';
import { 
  Atom, 
  BookOpen, 
  FlaskConical, 
  Code2, 
  Award, 
  Search, 
  Layers,
  Zap,
  Languages
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
}) => {
  const { language, toggleLanguage, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'lessons', label: t.nav.modules, icon: BookOpen },
    { id: 'practice', label: t.nav.practice, icon: FlaskConical },
    { id: 'recipes', label: t.nav.recipes, icon: Code2 },
    { id: 'architecture', label: t.nav.architecture, icon: Layers },
    { id: 'quiz', label: t.nav.quiz, icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-sky-950 border border-cyan-500/30 group-hover:border-cyan-400/80 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-300">
            <Atom 
              className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-700 ease-out" 
            />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]" />
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-200 transition-colors">
              React<span className="text-cyan-400 font-black">.js</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-sm">
              v19 & Next.js
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 p-1 bg-slate-900/50 border border-slate-800/60 rounded-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center space-x-2.5 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-900/70 hover:bg-slate-850 hover:text-slate-200 border border-slate-800/80 rounded-xl transition-all hover:border-slate-700 shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="hidden md:inline">{t.nav.searchPlaceholder}</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-950 rounded text-slate-400 border border-slate-800">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900/80 border border-slate-800/80 rounded-xl p-0.5 shadow-sm">
            <button
              onClick={() => setLanguage('tr')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                language === 'tr'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Türkçe"
            >
              TR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                language === 'en'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* GitHub Repo Button */}
          <a
            href="https://github.com/tylefnx/learnreactjs"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-slate-400 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl transition-all shadow-sm"
            title="GitHub: Tylefnx/learnreactjs"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
