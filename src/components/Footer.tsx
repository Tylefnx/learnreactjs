import React from 'react';
import { Atom, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center">
                <Atom className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                React<span className="text-cyan-400 font-black">.js</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                v19 & Next.js
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {t.footer.about}
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span>React 19 LTS</span>
              <span>•</span>
              <span>Next.js 15+</span>
              <span>•</span>
              <span>TypeScript 5.7+</span>
              <span>•</span>
              <span>Zustand / TanStack Query</span>
            </div>
          </div>

          {/* Col 2: Navigasyon */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">{t.footer.navTitle}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('lessons')} className="hover:text-cyan-300 transition-colors">
                  {t.footer.nav1}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-cyan-300 transition-colors">
                  {t.footer.nav2}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-cyan-300 transition-colors">
                  {t.footer.nav3}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture')} className="hover:text-cyan-300 transition-colors">
                  {t.footer.nav4}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-cyan-300 transition-colors">
                  {t.footer.nav5}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ekosistem */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">{t.footer.resourcesTitle}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="https://react.dev" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-cyan-300 transition-colors">
                  <span>{t.footer.res1}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-cyan-300 transition-colors">
                  <span>{t.footer.res2}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://github.com/tylefnx/learnreactjs" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-cyan-300 transition-colors">
                  <span>{t.footer.res3}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>{t.footer.copyright}</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>{t.footer.builtWith}</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};
