import React, { useState, useReducer, useTransition, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Layers, 
  Cpu, 
  Terminal, 
  Sparkles, 
  Timer, 
  Check,
  AlertTriangle 
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';

type ActiveHook = 'batching' | 'reducer' | 'transition' | 'effect-cleanup';

// useReducer için State & Action
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type TaskAction =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'CLEAR' };

function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE':
      return state.map(t => (t.id === action.id ? { ...t, completed: !t.completed } : t));
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export const HookSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveHook>('batching');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 15)]);
  };

  // 1. Batching Simülasyonu
  const [countA, setCountA] = useState(0);
  const [renderCountA, setRenderCountA] = useState(0);

  const handleIncorrectTriple = () => {
    addLog('Tıklandı: 3 x setCount(countA + 1) çağrılıyor (Hatalı Desen)...');
    setCountA(countA + 1);
    setCountA(countA + 1);
    setCountA(countA + 1);
    setRenderCountA((prev) => prev + 1);
  };

  const handleCorrectTriple = () => {
    addLog('Tıklandı: 3 x setCount(prev => prev + 1) çağrılıyor (Doğru Fonksiyonel Desen)...');
    setCountA((prev) => prev + 1);
    setCountA((prev) => prev + 1);
    setCountA((prev) => prev + 1);
    setRenderCountA((prev) => prev + 1);
  };

  // 2. Reducer Simülasyonu
  const [tasks, dispatch] = useReducer(tasksReducer, [
    { id: 1, text: 'React 19 Hooks Çalış', completed: true },
    { id: 2, text: 'Virtual DOM & Fiber Kıyasla', completed: false },
  ]);
  const [taskInput, setTaskInput] = useState('');

  // 3. Transition Simülasyonu
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);

    startTransition(() => {
      // Ağır CPU işi simülasyonu (5,000 eleman filtreleme)
      const mockItems = Array.from({ length: 1500 }, (_, i) => `React Modül Bileşeni #${i + 1} - ${val}`);
      setFilteredList(mockItems);
      addLog(`useTransition: 1,500 eleman arka planda filtrelendi (Non-blocking)`);
    });
  };

  // 4. useEffect Cleanup Simülasyonu
  const [roomId, setRoomId] = useState('genel-sohbet');
  const [roomLogs, setRoomLogs] = useState<string[]>([]);

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setRoomLogs((prev) => [`[${timestamp}] 🟢 '${roomId}' odasına bağlanıldı.`, ...prev]);
    addLog(`useEffect: '${roomId}' WebSocket bağlantısı açıldı.`);

    return () => {
      const cleanupTime = new Date().toLocaleTimeString();
      setRoomLogs((prev) => [`[${cleanupTime}] 🔴 '${roomId}' odası kapatıldı (Cleanup).`, ...prev]);
      addLog(`useEffect Cleanup: '${roomId}' bağlantısı sonlandırıldı.`);
    };
  }, [roomId]);

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('batching')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'batching'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          1. useState & Automatic Batching
        </button>
        <button
          onClick={() => setActiveTab('reducer')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'reducer'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          2. useReducer State Machine
        </button>
        <button
          onClick={() => setActiveTab('transition')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'transition'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          3. useTransition Concurrency
        </button>
        <button
          onClick={() => setActiveTab('effect-cleanup')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'effect-cleanup'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          4. useEffect & Cleanup Döngüsü
        </button>
      </div>

      {/* Simulator Playground & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Lab Card */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl shadow-xl">
          {activeTab === 'batching' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-white">useState Batching & Functional Updater</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Aşağıdaki butonlara tıklayarak doğrudan değer ataması ile fonksiyonel callback güncellemesi arasındaki farkı canlı gözlemleyin.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-around">
                <div className="text-center">
                  <span className="text-xs text-slate-400 font-mono">Sayaç Değeri (count)</span>
                  <div className="text-3xl font-extrabold text-cyan-400 mt-1 font-mono">{countA}</div>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div className="text-center">
                  <span className="text-xs text-slate-400 font-mono">Tetiklenen Buton Tıklaması</span>
                  <div className="text-3xl font-extrabold text-purple-400 mt-1 font-mono">{renderCountA}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleIncorrectTriple}
                  className="p-3 bg-red-950/40 hover:bg-red-900/50 border border-red-500/40 rounded-xl text-left transition-all"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-red-300 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>3x setCount(count + 1)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Stale closure yüzünden count değeri sadece 1 artar!
                  </p>
                </button>

                <button
                  onClick={handleCorrectTriple}
                  className="p-3 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 rounded-xl text-left transition-all"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-300 mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>3x setCount(prev =&gt; prev + 1)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Fiber kuyruğundaki son değeri alır ve tam 3 artar!
                  </p>
                </button>
              </div>

              <button
                onClick={() => {
                  setCountA(0);
                  setRenderCountA(0);
                  addLog('useState sayaçları sıfırlandı.');
                }}
                className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sayaçları Sıfırla</span>
              </button>
            </div>
          )}

          {activeTab === 'reducer' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-white">useReducer Görev Yöneticisi</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Saf reducer fonksiyonu ile durum geçişleri öngörülebilir ve izlenebilirdir.
                </p>
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder="Yeni React görevi ekle..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => {
                    if (taskInput.trim()) {
                      dispatch({ type: 'ADD', text: taskInput });
                      addLog(`useReducer: 'ADD' action dispatch edildi: "${taskInput}"`);
                      setTaskInput('');
                    }
                  }}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-xl"
                >
                  Ekle
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => {
                      dispatch({ type: 'TOGGLE', id: task.id });
                      addLog(`useReducer: 'TOGGLE' dispatch edildi (ID: ${task.id})`);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      task.completed
                        ? 'bg-slate-950/40 border-slate-800/60 text-slate-500 line-through'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500/40'
                    }`}
                  >
                    <span className="text-xs font-medium">{task.text}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800">
                      {task.completed ? 'Tamamlandı' : 'Bekliyor'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transition' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-white">useTransition Eşzamanlı Arama</h4>
                <p className="text-xs text-slate-400 mt-1">
                  1,500+ elemanlık ağır liste filtresi arka planda (isPending) hesaplanırken arama inputu asla donmaz.
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Hızlıca bir şeyler yazın..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                {isPending && (
                  <span className="absolute right-3 top-2.5 text-xs text-cyan-400 font-mono flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Hesaplanıyor...</span>
                  </span>
                )}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-40 overflow-y-auto font-mono text-xs text-slate-400">
                {filteredList.length > 0 ? (
                  <div className="space-y-1">
                    <span className="text-cyan-400 block mb-1">Bulunan Elemanlar ({filteredList.length}):</span>
                    {filteredList.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="text-slate-300">{item}</div>
                    ))}
                    {filteredList.length > 5 && <div className="text-slate-600">...ve {filteredList.length - 5} eleman daha</div>}
                  </div>
                ) : (
                  <span className="text-slate-600">Arama yapmak için yukarıya bir metin girin.</span>
                )}
              </div>
            </div>
          )}

          {activeTab === 'effect-cleanup' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-white">useEffect & Cleanup Yaşam Döngüsü</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Farklı bir odaya geçtiğinizde eski odanın bağlantısının nasıl kapatıldığını ve yenisinin nasıl bağlandığını görün.
                </p>
              </div>

              <div className="flex space-x-2">
                {['genel-sohbet', 'react19-tartisma', 'nextjs-yardim'].map((room) => (
                  <button
                    key={room}
                    onClick={() => setRoomId(room)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      roomId === room
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    #{room}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-40 overflow-y-auto space-y-1 font-mono text-xs">
                {roomLogs.map((rLog, idx) => (
                  <div key={idx} className={rLog.includes('🟢') ? 'text-emerald-400' : 'text-red-400'}>
                    {rLog}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Realtime Terminal Console Output */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col h-full min-h-[280px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-slate-300">Canlı React Konsol Çıktısı</span>
            </div>
            <button
              onClick={() => setLogs([])}
              className="text-[10px] text-slate-500 hover:text-slate-300 font-mono"
            >
              Temizle
            </button>
          </div>

          <div className="flex-1 overflow-y-auto font-mono text-xs space-y-1 text-slate-400">
            {logs.length === 0 ? (
              <span className="text-slate-600 italic">Henüz bir olay tetiklenmedi. Soldaki butonları deneyin...</span>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="leading-relaxed text-slate-300 border-l border-cyan-500/30 pl-2">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
