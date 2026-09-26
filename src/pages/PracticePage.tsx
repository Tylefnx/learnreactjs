import React, { useState } from 'react';
import { 
  FlaskConical, 
  Activity, 
  Cpu, 
  Code2, 
  FolderTree
} from 'lucide-react';
import { LifecycleVisualizer } from '../components/LifecycleVisualizer';
import { HookSimulator } from '../components/HookSimulator';
import { StarterBuilder } from '../components/StarterBuilder';
import { LeetCodeRunner } from '../components/LeetCodeRunner';
import { useLanguage } from '../i18n/LanguageContext';

export const PracticePage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'challenges' | 'lifecycle' | 'hooks' | 'starter'>('challenges');

  return (
    <div className="space-y-8 py-4">
      {/* Practice Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <FlaskConical className="w-4 h-4" />
          <span>{t.practice.badge}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">{t.practice.title}</h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          {t.practice.desc}
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
        {[
          { id: 'challenges', label: t.practice.tab1, icon: Code2 },
          { id: 'lifecycle', label: t.practice.tab2, icon: Activity },
          { id: 'hooks', label: t.practice.tab3, icon: Cpu },
          { id: 'starter', label: t.practice.tab4, icon: FolderTree },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold scale-[1.01]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'challenges' && <LeetCodeRunner />}
      {activeTab === 'lifecycle' && <LifecycleVisualizer />}
      {activeTab === 'hooks' && <HookSimulator />}
      {activeTab === 'starter' && <StarterBuilder />}
    </div>
  );
};
