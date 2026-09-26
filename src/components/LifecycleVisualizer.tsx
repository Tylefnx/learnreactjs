import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Eye, 
  Cpu, 
  Sparkles 
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface StepDetail {
  id: string;
  name: string;
  phase: 'Trigger' | 'Render Phase' | 'Commit Phase' | 'Browser Paint' | 'Passive Effects';
  badgeColor: string;
  description: string;
  technicalDetails: string[];
  fiberAction: string;
  codeSnippet: string;
}

const LIFECYCLE_STEPS: StepDetail[] = [
  {
    id: 'step-trigger',
    name: '1. State veya Prop Değişikliği (Trigger)',
    phase: 'Trigger',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Bileşende setState(newState), useReducer dispatch veya üst bileşenden yeni prop gelmesiyle güncelleme talebi oluşur.',
    technicalDetails: [
      'React Fiber düğümünün updateQueue kuyruğuna yeni bir update nesnesi eklenir.',
      'Güncellemenin öncelik seviyesi (Urgent Lane veya Transition Lane) belirlenir.',
      'React Scheduler (Eşzamanlı Zamanlayıcı) bir sonraki render döngüsünü planlar.'
    ],
    fiberAction: 'fiber.lanes |= updateLane; scheduleUpdateOnFiber(root, fiber, lane);',
    codeSnippet: `// 1. ADIM: Kullanıcı bir butona tıklar ve setState tetiklenir
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // Fiber Update Queue'ya { action: 1, next: null } eklenir
    setCount(prev => prev + 1); 
  };

  return <button onClick={handleClick}>Artır: {count}</button>;
}`
  },
  {
    id: 'step-render-phase',
    name: '2. Render Phase & Fiber Tree Diffing',
    phase: 'Render Phase',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    description: 'React, bileşen fonksiyonunu çağırır ve yeni bir Virtual DOM (WorkInProgress Fiber) ağacı üretir. Bu aşama tamamen asenkron, duraklatılabilir ve saf JavaScript tabanlıdır (Hiçbir DOM mutasyonu yapılmaz).',
    technicalDetails: [
      'Current Fiber Ağacı ile WorkInProgress (WIP) Fiber Ağacı O(n) heuristik diffing ile karşılaştırılır.',
      'Bileşenin JSX fonksiyonu çalıştırılır: ReactElement = Component(props).',
      'Değişen her düğüme özel "Flags" (Placement, Update, Deletion) bayrakları atanır.',
      'Concurrent Mode devredeyse, yüksek öncelikli bir kullanıcı girdisi gelirse bu aşama anında iptal edilip baştan başlatılabilir!'
    ],
    fiberAction: 'workInProgress = createWorkInProgress(current, pendingProps); beginWork(); completeWork();',
    codeSnippet: `// 2. ADIM: React bileşeni çağırır ve Virtual DOM üretir
// Bu aşamada GERÇEK DOM'A DOKUNULMAZ!
const nextChildren = Counter(props);

// React Reconciliation algoritması eski ve yeni Fiber'ı kıyaslar:
if (currentFiber.memoizedProps !== nextProps) {
  workInProgressFiber.flags |= Update; // 'Update' bayrağı işaretlenir
}`
  },
  {
    id: 'step-commit-dom',
    name: '3. Commit Phase (DOM Mutasyonu)',
    phase: 'Commit Phase',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Render aşamasında bayraklandırılan tüm değişiklikler tek bir senkronize ve atomik işlemle gerçek tarayıcı DOM\'una uygulanır.',
    technicalDetails: [
      'Tarayıcı DOM ağacına appendChild, removeChild, textContent veya node.setAttribute çağrıları yapılır.',
      'Current Tree referansı yeni WorkInProgress Tree ile yer değiştirir (Double Buffering mekanizması).',
      'Bileşenin ref.current referansları yeni gerçek DOM düğümlerine bağlanır.'
    ],
    fiberAction: 'root.current = finishedWork; commitMutationEffects(finishedWork, root);',
    codeSnippet: `// 3. ADIM: Gerçek DOM güncellenir
// HTML DOM'u doğrudan mutate edilir:
domNode.textContent = "Artır: 1"; 
domNode.setAttribute("aria-valuenow", "1");

// React Fiber Root güncellenir (Double Buffering)
root.current = workInProgressRoot;`
  },
  {
    id: 'step-layout-effects',
    name: '4. useLayoutEffect & Senkron DOM Ölçümü',
    phase: 'Commit Phase',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    description: 'DOM güncellendi ancak tarayıcı henüz ekrana çizim (Paint) yapmadı. Senkron olarak çalışan useLayoutEffect burada devreye girer.',
    technicalDetails: [
      'Bileşen getBoundingClientRect() gibi ölçüm fonksiyonlarıyla DOM elemanının gerçek piksel koordinatlarını alır.',
      'Eğer burada yeni bir setState yapılırsa, tarayıcı çizim yapmadan önce anında yeni bir re-render planlanır (Böylece ekranda titreme/flicker olmaz).',
      'Ağır işlemler buraya konulursa tarayıcı ekran çizimini geciktirir.'
    ],
    fiberAction: 'commitLayoutEffects(finishedWork, root); // Senkron çalıştırma',
    codeSnippet: `// 4. ADIM: Paint öncesi senkron useLayoutEffect çalışır
useLayoutEffect(() => {
  const rect = domNode.getBoundingClientRect();
  if (rect.width > 200) {
    setTooltipPos({ x: rect.left, y: rect.top - 30 });
  }
}, [count]);`
  },
  {
    id: 'step-browser-paint',
    name: '5. Tarayıcı Çizimi (Browser Paint)',
    phase: 'Browser Paint',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    description: 'Tarayıcının rendering motoru (Blink/Gecko/WebKit) güncellenen DOM ağacını piksel piksel ekrana çizer (Layout -> Paint -> Composite).',
    technicalDetails: [
      'Kullanıcı ekrandaki yeni görsel durumu (örneğin buton üzerindeki "1" sayısını) an itibarıyla görmüş olur.',
      'Tarayıcının ana iş parçacığı serbest kalır (Main Thread idle).'
    ],
    fiberAction: 'requestAnimationFrame / Browser V-Sync (60fps / 120fps)',
    codeSnippet: `/* 5. ADIM: Tarayıcı GPU/Compositor piksel çizer */
/* Tarayıcı pencereleri ekranda güncellenmiş DOM'u kullanıcının gözünün önüne serer. */`
  },
  {
    id: 'step-passive-effects',
    name: '6. Asenkron Pasif Efektler (useEffect)',
    phase: 'Passive Effects',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    description: 'Ekrana çizim bittikten hemen sonra useEffect hook\'ları ve eski efektlerin cleanup fonksiyonları asenkron olarak tetiklenir.',
    technicalDetails: [
      'Önce varsa eski renderdan kalan cleanup (temizleme) fonksiyonu çalışır.',
      'Ardından güncel useEffect fonksiyonu çalıştırılır.',
      'Kullanıcı arayüzü çizildiği için API istekleri, LocalStorage kayıtları ve WebSocket mesajları arayüzü dondurmadan akar.'
    ],
    fiberAction: 'flushPassiveEffects(); // Asenkron macrotask/microtask kuyruğunda',
    codeSnippet: `// 6. ADIM: Pasif useEffect çalışır (UI'ı engellemez)
useEffect(() => {
  console.log("DOM güncellendi ve ekrana çizildi! Yeni count:", count);
  document.title = \`Sayaç (\${count})\`;

  return () => {
    console.log("Bir sonraki renderdan önce eski efekt temizleniyor...");
  };
}, [count]);`
  }
];

export const LifecycleVisualizer: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % LIFECYCLE_STEPS.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const step = LIFECYCLE_STEPS[currentStepIndex];

  return (
    <div className="space-y-6">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-900/90 border border-slate-800 rounded-2xl gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">React 19 Fiber & Render Yaşam Döngüsü Simülatörü</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            State güncellemesinden DOM mutasyonuna ve pasif efektlere kadar bir render döngüsünün tüm aşamaları.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-end md:self-auto">
          <button
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIndex === 0}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-slate-300 transition-colors"
            title="Önceki Adım"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Durdur</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Otomatik Oynat</span>
              </>
            )}
          </button>

          <button
            onClick={() => setCurrentStepIndex((prev) => (prev + 1) % LIFECYCLE_STEPS.length)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
            title="Sonraki Adım"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
            title="Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {LIFECYCLE_STEPS.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={s.id}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(idx);
              }}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                  : isPassed
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60 hover:opacity-100'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
              )}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  Adım {idx + 1}
                </span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {isActive && <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
              </div>
              <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{s.name.split('. ')[1]}</h4>
              <span className="text-[10px] text-slate-400 block mt-1">{s.phase}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        {/* Left Col: Explanations */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${step.badgeColor}`}>
              {step.phase}
            </span>
            <span className="text-xs font-mono text-slate-400">Adım {currentStepIndex + 1} / {LIFECYCLE_STEPS.length}</span>
          </div>

          <h3 className="text-xl font-bold text-white">{step.name}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>

          <div className="space-y-2 pt-2">
            <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fiber Motorunda Ne Olur?</span>
            </h5>
            <ul className="space-y-2">
              {step.technicalDetails.map((detail, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Dahili React Fiber Komutu:</span>
            <code className="text-xs font-mono text-cyan-300 break-all">{step.fiberAction}</code>
          </div>
        </div>

        {/* Right Col: Code Example */}
        <div className="lg:col-span-6">
          <CodeBlock
            code={step.codeSnippet}
            language="tsx"
            title={`${step.name} - Kod Karşılığı`}
          />
        </div>
      </div>
    </div>
  );
};
