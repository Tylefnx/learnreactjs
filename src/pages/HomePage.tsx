import React from 'react';
import { 
  Atom, 
  Sparkles, 
  BookOpen, 
  FlaskConical, 
  Code2, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  Server
} from 'lucide-react';
import { getLessonsData } from '../data/lessonsData';
import { CodeBlock } from '../components/CodeBlock';
import { useLanguage } from '../i18n/LanguageContext';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectLesson: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectLesson }) => {
  const { language, t } = useLanguage();
  const lessons = getLessonsData(language);

  const heroCode = `// React 19 & Next.js Modern Architecture
export default async function ProductOverview({ id }: { id: string }) {
  // 1. Server Component: Secure direct DB query (0 KB Client JS)
  const product = await db.product.findById(id);

  return (
    <div className="product-card">
      <h1>{product.title}</h1>
      <p className="price">\${product.price}</p>
      {/* 2. Client Component: useTransition & Optimistic Updates */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}`;

  return (
    <div className="space-y-20 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-cyan-950/30 via-slate-900/50 to-slate-950 border border-cyan-500/20 p-8 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              {t.hero.title1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.title2}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('lessons')}
                className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.hero.btnModules}</span>
              </button>

              <button
                onClick={() => onNavigate('practice')}
                className="flex items-center space-x-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700/80 transition-all"
              >
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                <span>{t.hero.btnPractice}</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <span className="text-2xl font-extrabold text-white font-mono">{lessons.length}</span>
                <span className="text-xs text-slate-400 block">{t.hero.statModules}</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-cyan-400 font-mono">4+</span>
                <span className="text-xs text-slate-400 block">{t.hero.statLab}</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-blue-400 font-mono">7+</span>
                <span className="text-xs text-slate-400 block">{t.hero.statRecipes}</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">100%</span>
                <span className="text-xs text-slate-400 block">{t.hero.statFocus}</span>
              </div>
            </div>
          </div>

          {/* Right Code Preview */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <CodeBlock
                code={heroCode}
                language="tsx"
                filename="ProductOverview.tsx"
                title="React 19 Server Component Pattern"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t.hero.featureHeading}</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">{t.hero.featureSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 'lessons',
              title: t.hero.feat1Title,
              desc: t.hero.feat1Desc,
              icon: BookOpen,
              color: 'text-cyan-400',
              bg: 'bg-cyan-950/40 border-cyan-800/40',
            },
            {
              id: 'practice',
              title: t.hero.feat2Title,
              desc: t.hero.feat2Desc,
              icon: FlaskConical,
              color: 'text-emerald-400',
              bg: 'bg-emerald-950/40 border-emerald-800/40',
            },
            {
              id: 'recipes',
              title: t.hero.feat3Title,
              desc: t.hero.feat3Desc,
              icon: Code2,
              color: 'text-purple-400',
              bg: 'bg-purple-950/40 border-purple-800/40',
            },
            {
              id: 'quiz',
              title: t.hero.feat4Title,
              desc: t.hero.feat4Desc,
              icon: Award,
              color: 'text-amber-400',
              bg: 'bg-amber-950/40 border-amber-800/40',
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`p-6 rounded-2xl border ${card.bg} hover:scale-[1.02] cursor-pointer transition-all flex flex-col justify-between group shadow-xl`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800">
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
                <div className="flex items-center space-x-1 text-xs font-semibold text-cyan-400 mt-4 pt-4 border-t border-slate-800/60">
                  <span>{t.hero.explore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modules Highlights Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{t.hero.modulesTitle}</h2>
            <p className="text-xs text-slate-400 mt-1">{t.hero.modulesSub}</p>
          </div>
          <button
            onClick={() => onNavigate('lessons')}
            className="flex items-center space-x-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            <span>{t.hero.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.slice(0, 6).map((mod) => (
            <div
              key={mod.id}
              onClick={() => onSelectLesson(mod.id)}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all hover:bg-slate-900 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/40">
                  {language === 'en' ? 'Module' : 'Modül'} {mod.number}
                </span>
                <span className="text-[11px] text-slate-400">{mod.durationMinutes} min</span>
              </div>
              <h3 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors mb-1">
                {mod.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">{mod.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
