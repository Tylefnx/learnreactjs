import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Lightbulb, 
  Check, 
  AlertTriangle, 
  FileCode2, 
  Cpu, 
  Layers, 
  Copy, 
  TerminalSquare, 
  Lock 
} from 'lucide-react';
import { getChallengesData } from '../data/challengesData';
import { useLanguage } from '../i18n/LanguageContext';

export const LeetCodeRunner: React.FC = () => {
  const { language, t } = useLanguage();
  const challengeList = getChallengesData(language);

  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(challengeList[0].id);
  const [userCode, setUserCode] = useState<string>(challengeList[0].initialCode);
  const [activeBottomTab, setActiveBottomTab] = useState<'tests' | 'compiled' | 'console'>('tests');
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number>(0);
  const [testResults, setTestResults] = useState<Array<{ id: string; passed: boolean; actual: string; expected: string; message?: string }>>([]);
  const [compiledJs, setCompiledJs] = useState<string>('');
  const [compileMetrics, setCompileMetrics] = useState<{ durationMs?: number; bundleSize?: number }>({});
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline' | 'checking'>('offline');
  const [copiedDocker, setCopiedDocker] = useState(false);

  const challenge = challengeList.find((c) => c.id === selectedChallengeId) || challengeList[0];

  // Backend Healthcheck
  const checkBackend = async () => {
    setServerStatus('checking');
    try {
      let isUp = false;
      try {
        const res3001 = await fetch('http://localhost:3001/api/health', { method: 'GET', signal: AbortSignal.timeout(1500) });
        if (res3001.ok) {
          const data = await res3001.json();
          if (data && data.status === 'UP' && data.engine) isUp = true;
        }
      } catch {}

      if (!isUp) {
        try {
          const resProxy = await fetch('/api/health', { method: 'GET', signal: AbortSignal.timeout(1500) });
          const contentType = resProxy.headers.get('content-type') || '';
          if (resProxy.ok && contentType.includes('application/json')) {
            const data = await resProxy.json();
            if (data && data.status === 'UP' && data.engine) isUp = true;
          }
        } catch {}
      }

      setServerStatus(isUp ? 'online' : 'offline');
    } catch {
      setServerStatus('offline');
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  // Dil veya challenge değiştiğinde kodu ve state'i güncelle
  useEffect(() => {
    setUserCode(challenge.initialCode);
    setTestResults([]);
    setCompiledJs('');
    setConsoleLogs([]);
    setShowHint(false);
    setSelectedTestCaseIdx(0);
  }, [challenge.id, language]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      setUserCode(val.substring(0, start) + '  ' + val.substring(end));
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleExecute = async () => {
    if (serverStatus !== 'online') return;

    setIsRunning(true);
    const logs: string[] = [];
    logs.push(`[${new Date().toLocaleTimeString()}] Sending request to esbuild + Node.js Sandbox API...`);

    try {
      const apiUrl = window.location.port === '3000' || window.location.port === '' ? '/api' : 'http://localhost:3001/api';

      const compileRes = await fetch(`${apiUrl}/compile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: userCode }),
      }).then((r) => r.json());

      if (compileRes.success) {
        setCompiledJs(compileRes.compiledCode);
        setCompileMetrics({
          durationMs: compileRes.durationMs,
          bundleSize: compileRes.bundleSize,
        });
        logs.push(`[esbuild Engine] Compile Success! Time: ${compileRes.durationMs}ms, Size: ${compileRes.bundleSize} Bytes`);
      } else {
        logs.push(`[esbuild Error]: ${compileRes.error}`);
        setConsoleLogs(logs);
        setIsRunning(false);
        return;
      }

      const testRes = await fetch(`${apiUrl}/run-tests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: userCode,
          testCases: challenge.testCases,
        }),
      }).then((r) => r.json());

      if (testRes.success) {
        setTestResults(testRes.testResults);
        logs.push(...(testRes.logs || []));
        logs.push(`[Node.js VM Sandbox] Tests finished in ${testRes.durationMs}ms.`);
      }
    } catch (err: any) {
      logs.push(`[Connection Error]: ${err.message}`);
    }

    setConsoleLogs(logs);
    setIsRunning(false);
    setActiveBottomTab('tests');
  };

  const handleCopyDockerCmd = () => {
    navigator.clipboard.writeText('git clone https://github.com/tylefnx/learnreactjs.git\ncd nextjs\ndocker compose up -d --build');
    setCopiedDocker(true);
    setTimeout(() => setCopiedDocker(false), 2000);
  };

  const lines = userCode.split('\n');

  return (
    <div className="space-y-6">
      {/* 1. DOCKER STATUS & TUTORIAL BANNER */}
      {serverStatus === 'online' ? (
        <div className="p-4 bg-emerald-950/40 border-2 border-emerald-500/50 rounded-2xl flex items-center justify-between shadow-lg shadow-emerald-950/50">
          <div className="flex items-center space-x-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <h4 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
                <span>{t.docker.activeTitle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200 border border-emerald-700">
                  Node.js 20 & esbuild
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">{t.docker.activeDesc}</p>
            </div>
          </div>
          <button
            onClick={checkBackend}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-mono underline ml-4 shrink-0"
          >
            {t.docker.refresh}
          </button>
        </div>
      ) : (
        <div className="p-6 bg-gradient-to-br from-red-950/60 via-slate-900 to-amber-950/40 border-2 border-red-500/60 rounded-3xl space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-red-500/30 pb-4">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-red-300">{t.docker.inactiveTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {t.docker.inactiveDesc}
                </p>
              </div>
            </div>

            <button
              onClick={checkBackend}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-xl border border-slate-700 shrink-0 flex items-center space-x-1.5 self-end sm:self-auto"
            >
              <span>{t.docker.checkBtn}</span>
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
              <TerminalSquare className="w-4 h-4" />
              <span>{t.docker.tutorialTitle}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold block">{t.docker.step1}</span>
                <code className="text-[11px] text-slate-300 block bg-slate-900 p-1.5 rounded">git clone https://github.com/tylefnx/learnreactjs.git</code>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold block">{t.docker.step2}</span>
                <code className="text-[11px] text-slate-300 block bg-slate-900 p-1.5 rounded">cd nextjs</code>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold block">{t.docker.step3}</span>
                <code className="text-[11px] text-emerald-400 font-bold block bg-slate-900 p-1.5 rounded">docker compose up -d --build</code>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-slate-300">
                {t.docker.singleLine} <strong className="text-cyan-300">git clone https://github.com/tylefnx/learnreactjs.git &amp;&amp; cd nextjs &amp;&amp; docker compose up -d --build</strong>
              </span>
              <button
                onClick={handleCopyDockerCmd}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors ml-3 shrink-0"
              >
                {copiedDocker ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDocker ? t.docker.copied : t.docker.copyBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {challengeList.map((ch) => {
          const isSelected = ch.id === selectedChallengeId;
          return (
            <button
              key={ch.id}
              onClick={() => setSelectedChallengeId(ch.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold scale-[1.02]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <FileCode2 className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
              <span>{ch.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-950 text-slate-300">
                {ch.difficulty}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Split UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Problem Details */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 h-[680px] overflow-y-auto">
          <div className="border-b border-slate-800 pb-4 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                {challenge.category}
              </span>
              <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                {challenge.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">{challenge.title}</h2>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{t.leetcode.problemDesc}</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{challenge.description}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{t.leetcode.requirements}</h4>
            <ul className="space-y-1.5">
              {challenge.requirements.map((req, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t.leetcode.targetTests}</h4>
            <div className="space-y-2">
              {challenge.testCases.map((tc, idx) => (
                <div key={tc.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                  <span className="text-cyan-400 block font-semibold mb-0.5">Test {idx + 1}: {tc.title}</span>
                  <p className="text-slate-400 text-[11px]">{tc.description}</p>
                </div>
              ))}
            </div>
          </div>

          {challenge.hints.length > 0 && (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHint ? t.leetcode.hideHint : t.leetcode.showHint}</span>
              </button>

              {showHint && (
                <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-2 animate-fadeIn">
                  <span className="text-xs font-semibold text-cyan-300 block">{t.leetcode.hints}</span>
                  {challenge.hints.map((hint, i) => (
                    <p key={i} className="text-xs text-slate-300">• {hint}</p>
                  ))}
                  <button
                    onClick={() => setUserCode(challenge.solutionCode)}
                    className="mt-2 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono rounded-lg"
                  >
                    {t.leetcode.loadSolution}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Code Editor & Execution */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[460px]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-cyan-400 font-medium">Solution.tsx</span>
              </div>
              <button
                onClick={() => setUserCode(challenge.initialCode)}
                className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px]">{t.leetcode.resetCode}</span>
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden font-mono text-sm leading-relaxed relative bg-slate-950">
              <div className="w-10 py-3 bg-slate-900/50 text-slate-600 text-xs text-right pr-3 select-none border-r border-slate-800/80 font-mono">
                {lines.map((_, i) => (
                  <div key={i} className="leading-6">{i + 1}</div>
                ))}
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                className="flex-1 p-3 bg-transparent text-slate-100 resize-none focus:outline-none font-mono text-xs md:text-sm leading-6 selection:bg-cyan-500/30 overflow-y-auto"
                placeholder="Code here..."
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-2xl gap-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>
                {t.leetcode.engineState} {serverStatus === 'online' ? (
                  <strong className="text-emerald-400">{t.leetcode.dockerActive}</strong>
                ) : (
                  <strong className="text-red-400">{t.leetcode.noConnection}</strong>
                )}
              </span>
            </div>

            {serverStatus === 'online' ? (
              <button
                onClick={handleExecute}
                disabled={isRunning}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 text-slate-950" />
                <span>{isRunning ? t.leetcode.runningBtn : t.leetcode.runBtn}</span>
              </button>
            ) : (
              <button
                disabled={true}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-slate-800/60 border border-slate-700/60 text-slate-500 font-semibold text-xs rounded-xl cursor-not-allowed"
                title="Docker backend required"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.leetcode.disabledBtn}</span>
              </button>
            )}
          </div>

          {/* Bottom Results & Compiler Output */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveBottomTab('tests')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                    activeBottomTab === 'tests' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.leetcode.tabTests} ({testResults.length})</span>
                </button>

                <button
                  onClick={() => setActiveBottomTab('compiled')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                    activeBottomTab === 'compiled' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t.leetcode.tabCompiled}</span>
                </button>

                <button
                  onClick={() => setActiveBottomTab('console')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                    activeBottomTab === 'console' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t.leetcode.tabConsole}</span>
                </button>
              </div>
            </div>

            {activeBottomTab === 'tests' && (
              <div className="space-y-3 pt-1">
                {serverStatus !== 'online' ? (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
                    <p className="text-xs text-amber-400 font-semibold">
                      {language === 'tr' ? 'Docker derleme sunucusuna ulaşılamadı.' : 'Docker backend offline.'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {language === 'tr' ? 'Yukarıdaki Docker tutorial adımlarını takip ederek projeyi ayağa kaldırın.' : 'Follow the 3-step Docker tutorial above to start the real compiler.'}
                    </p>
                  </div>
                ) : testResults.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-4 text-center">
                    {t.leetcode.emptyTests}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {testResults.map((tr, idx) => (
                        <button
                          key={tr.id}
                          onClick={() => setSelectedTestCaseIdx(idx)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono ${
                            idx === selectedTestCaseIdx ? 'bg-slate-800 text-white font-bold' : 'bg-slate-950 text-slate-400'
                          }`}
                        >
                          {tr.passed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                          <span>Case {idx + 1}</span>
                        </button>
                      ))}
                    </div>

                    {testResults[selectedTestCaseIdx] && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                        <div className="flex justify-between items-center text-slate-400">
                          <span>{t.leetcode.status}</span>
                          <span className={testResults[selectedTestCaseIdx].passed ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                            {testResults[selectedTestCaseIdx].passed ? t.leetcode.passed : t.leetcode.failed}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-slate-400">
                          <span>{t.leetcode.expected}</span>
                          <span className="text-cyan-300">{testResults[selectedTestCaseIdx].expected}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-400">
                          <span>{t.leetcode.actual}</span>
                          <span className="text-slate-200">{testResults[selectedTestCaseIdx].actual}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeBottomTab === 'compiled' && (
              <div className="space-y-2">
                {compileMetrics.durationMs !== undefined && (
                  <div className="flex items-center space-x-4 text-[11px] font-mono text-cyan-400 p-2 bg-slate-950 rounded-lg">
                    <span>{t.leetcode.compileTime} {compileMetrics.durationMs}ms</span>
                    <span>•</span>
                    <span>{t.leetcode.bundleSize} {compileMetrics.bundleSize} Bytes</span>
                  </div>
                )}
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-48 overflow-y-auto font-mono text-xs text-slate-300">
                  {compiledJs || '// No compilation performed yet.'}
                </pre>
              </div>
            )}

            {activeBottomTab === 'console' && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-36 overflow-y-auto font-mono text-xs space-y-1 text-slate-400">
                {consoleLogs.length === 0 ? (
                  <span className="text-slate-600 italic">{t.leetcode.emptyConsole}</span>
                ) : (
                  consoleLogs.map((log, i) => <div key={i} className="text-slate-300">{log}</div>)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
