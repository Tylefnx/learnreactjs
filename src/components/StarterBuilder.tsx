import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  FolderTree, 
  FileCode, 
  Terminal, 
  Check, 
  Copy,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface StarterConfig {
  projectName: string;
  framework: 'vite' | 'nextjs';
  typescript: boolean;
  styling: 'tailwind' | 'css-modules';
  state: 'zustand' | 'redux' | 'none';
  dataFetching: 'tanstack-query' | 'swr' | 'native-fetch';
  form: 'react-hook-form-zod' | 'none';
  icons: 'lucide' | 'none';
  testing: 'vitest' | 'none';
}

export const StarterBuilder: React.FC = () => {
  const [config, setConfig] = useState<StarterConfig>({
    projectName: 'my-react-mastery-app',
    framework: 'vite',
    typescript: true,
    styling: 'tailwind',
    state: 'zustand',
    dataFetching: 'tanstack-query',
    form: 'react-hook-form-zod',
    icons: 'lucide',
    testing: 'vitest',
  });

  const [copiedCmd, setCopiedCmd] = useState(false);

  // Generate package.json
  const generatePackageJson = () => {
    const isNext = config.framework === 'nextjs';
    const deps: Record<string, string> = {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
    };

    if (isNext) {
      deps['next'] = '^15.0.0';
    }

    if (config.icons === 'lucide') deps['lucide-react'] = '^1.16.0';
    if (config.state === 'zustand') deps['zustand'] = '^5.0.0';
    if (config.state === 'redux') {
      deps['@reduxjs/toolkit'] = '^2.3.0';
      deps['react-redux'] = '^9.1.0';
    }
    if (config.dataFetching === 'tanstack-query') deps['@tanstack/react-query'] = '^5.60.0';
    if (config.dataFetching === 'swr') deps['swr'] = '^2.2.5';
    if (config.form === 'react-hook-form-zod') {
      deps['react-hook-form'] = '^7.53.0';
      deps['zod'] = '^3.23.8';
      deps['@hookform/resolvers'] = '^3.9.0';
    }

    const devDeps: Record<string, string> = {
      typescript: '~5.7.2',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
    };

    if (!isNext) {
      devDeps['vite'] = '^6.0.0';
      devDeps['@vitejs/plugin-react'] = '^4.3.4';
    }

    if (config.styling === 'tailwind') {
      devDeps['tailwindcss'] = '^3.4.17';
      devDeps['postcss'] = '^8.4.49';
      devDeps['autoprefixer'] = '^10.4.20';
      deps['clsx'] = '^2.1.1';
      deps['tailwind-merge'] = '^2.6.0';
    }

    if (config.testing === 'vitest') {
      devDeps['vitest'] = '^2.1.8';
      devDeps['@testing-library/react'] = '^16.1.0';
      devDeps['@testing-library/user-event'] = '^14.5.2';
      devDeps['jsdom'] = '^25.0.1';
    }

    return JSON.stringify(
      {
        name: config.projectName,
        private: true,
        version: '0.1.0',
        type: 'module',
        scripts: isNext
          ? {
              dev: 'next dev',
              build: 'next build',
              start: 'next start',
              lint: 'next lint',
            }
          : {
              dev: 'vite',
              build: 'tsc && vite build',
              preview: 'vite preview',
              test: config.testing === 'vitest' ? 'vitest' : undefined,
            },
        dependencies: deps,
        devDependencies: devDeps,
      },
      null,
      2
    );
  };

  const getCliCommand = () => {
    if (config.framework === 'nextjs') {
      return `npx create-next-app@latest ${config.projectName} --typescript --tailwind --app --src-dir --import-alias "@/*"`;
    }
    return `npm create vite@latest ${config.projectName} -- --template react-ts\ncd ${config.projectName}\nnpm install\nnpm install ${
      config.state === 'zustand' ? 'zustand ' : ''
    }${config.dataFetching === 'tanstack-query' ? '@tanstack/react-query ' : ''}${
      config.icons === 'lucide' ? 'lucide-react ' : ''
    }tailwindcss postcss autoprefixer`;
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(getCliCommand());
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">React & Next.js Proje Sihirbazı (Starter Builder)</h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Modern React 19 ve Next.js 15 mimarilerine uygun kütüphane ve araçları seçerek dinamik proje yapılandırması oluşturun.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          {/* Project Name */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Proje Adı
            </label>
            <input
              type="text"
              value={config.projectName}
              onChange={(e) => setConfig({ ...config, projectName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-cyan-400 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Framework Choice */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Ana Framework / Derleyici
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConfig({ ...config, framework: 'vite' })}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  config.framework === 'vite'
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>⚡ Vite + React 19</div>
                <span className="text-[10px] text-slate-500 font-normal">Ultra Hızlı SPA & CSR</span>
              </button>

              <button
                type="button"
                onClick={() => setConfig({ ...config, framework: 'nextjs' })}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  config.framework === 'nextjs'
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>▲ Next.js 15 (App Router)</div>
                <span className="text-[10px] text-slate-500 font-normal">RSC, SSR, Server Actions</span>
              </button>
            </div>
          </div>

          {/* State Management */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Global State Yönetimi
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'zustand', label: 'Zustand 5' },
                { id: 'redux', label: 'Redux Toolkit' },
                { id: 'none', label: 'Context Only' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setConfig({ ...config, state: item.id as any })}
                  className={`p-2 rounded-lg border text-center text-xs font-medium transition-all ${
                    config.state === item.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Server Cache & Fetching */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Sunucu Önbelleği & Fetching
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'tanstack-query', label: 'TanStack Query' },
                { id: 'swr', label: 'SWR' },
                { id: 'native-fetch', label: 'Native Fetch' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setConfig({ ...config, dataFetching: item.id as any })}
                  className={`p-2 rounded-lg border text-center text-xs font-medium transition-all ${
                    config.dataFetching === item.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form & Validation */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Form & Doğrulama
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConfig({ ...config, form: 'react-hook-form-zod' })}
                className={`p-2 rounded-lg border text-center text-xs font-medium transition-all ${
                  config.form === 'react-hook-form-zod'
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                React Hook Form + Zod
              </button>
              <button
                type="button"
                onClick={() => setConfig({ ...config, form: 'none' })}
                className={`p-2 rounded-lg border text-center text-xs font-medium transition-all ${
                  config.form === 'none'
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Standart Form
              </button>
            </div>
          </div>
        </div>

        {/* Right: Generated Output & CLI */}
        <div className="lg:col-span-7 space-y-4">
          {/* CLI Command Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>Tek Komutla Projeyi Başlat:</span>
              </div>
              <button
                onClick={handleCopyCmd}
                className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copiedCmd ? 'Kopyalandı!' : 'Komutu Kopyala'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900/90 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto">
              {getCliCommand()}
            </pre>
          </div>

          {/* Generated package.json */}
          <CodeBlock
            code={generatePackageJson()}
            language="json"
            filename="package.json"
            title="Dinamik Üretilen package.json"
          />
        </div>
      </div>
    </div>
  );
};
