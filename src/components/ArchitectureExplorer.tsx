import React, { useState } from 'react';
import { Layers, Cpu, CheckCircle, Sparkles } from 'lucide-react';
import { getArchitectureData } from '../data/architectureData';
import { CodeBlock } from './CodeBlock';
import { useLanguage } from '../i18n/LanguageContext';

export const ArchitectureExplorer: React.FC = () => {
  const { language } = useLanguage();
  const archNodes = getArchitectureData(language);

  const [selectedId, setSelectedId] = useState<string>(archNodes[0].id);

  const selectedNode = archNodes.find((n) => n.id === selectedId) || archNodes[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">
            {language === 'en' ? 'React Fiber & Architecture Explorer' : 'React Fiber & Çekirdek Mimari Gezgini'}
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {language === 'en'
            ? 'Deep dive into Virtual DOM, Fiber Tree, O(n) Heuristic Diffing, Concurrency Lanes, and Next.js RSC architecture.'
            : 'Virtual DOM, Fiber Ağacı, O(n) Heuristic Diffing, Concurrency Lanes ve Next.js RSC mimarisini derinlemesine keşfedin.'}
        </p>
      </div>

      {/* Grid of Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {archNodes.map((node) => {
          const isSelected = node.id === selectedId;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {node.category}
                </span>
                {isSelected && <Sparkles className="w-4 h-4 text-cyan-400" />}
              </div>
              <h4 className="text-sm font-bold text-slate-200 mb-1">{node.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{node.description}</p>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Description & Roles */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">
                {selectedNode.category}
              </span>
              <h3 className="text-xl font-bold text-white">{selectedNode.title}</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{selectedNode.description}</p>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <h5 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Core Role & Responsibilities' : 'Çekirdek Görevi ve Sorumluluğu'}</span>
              </h5>
              <p className="text-xs text-slate-300">{selectedNode.role}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                {language === 'en' ? 'Key Features & Invariants' : 'Önemli Özellikler & Kurallar'}
              </h5>
              <ul className="space-y-2">
                {selectedNode.keyFeatures.map((feat, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Code Example */}
          <div className="lg:col-span-6">
            <CodeBlock
              code={selectedNode.codeExample}
              language="tsx"
              title={`${selectedNode.title} - Code Model`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
