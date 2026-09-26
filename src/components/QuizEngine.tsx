import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  BarChart3, 
  Zap 
} from 'lucide-react';
import { getQuizData } from '../data/quizData';
import { CodeBlock } from './CodeBlock';
import { useLanguage } from '../i18n/LanguageContext';

export const QuizEngine: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedDifficultyKey, setSelectedDifficultyKey] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const quizQuestions = getQuizData(language);

  const difficultyTabs = [
    { key: 'all', label: language === 'tr' ? 'Tümü' : 'All' },
    { key: 'beginner', label: language === 'tr' ? 'Başlangıç' : 'Beginner' },
    { key: 'intermediate', label: language === 'tr' ? 'Orta' : 'Intermediate' },
    { key: 'advanced', label: language === 'tr' ? 'İleri' : 'Advanced' },
    { key: 'expert', label: language === 'tr' ? 'Uzman' : 'Expert' },
  ];

  const normalizeDiff = (diffStr: string): string => {
    const s = (diffStr || '').toLowerCase();
    if (s.includes('başlangıç') || s.includes('beginner')) return 'beginner';
    if (s.includes('orta') || s.includes('intermediate')) return 'intermediate';
    if (s.includes('ileri') || s.includes('advanced')) return 'advanced';
    if (s.includes('uzman') || s.includes('expert')) return 'expert';
    return 'all';
  };

  const filteredQuestions = quizQuestions.filter((q) => {
    if (selectedDifficultyKey === 'all') return true;
    return normalizeDiff(q.difficulty) === selectedDifficultyKey;
  });

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0] || quizQuestions[0];

  const handleSelectOption = (optionIdx: number) => {
    if (userAnswers[currentIdx] !== undefined) return;

    const newAnswers = { ...userAnswers, [currentIdx]: optionIdx };
    setUserAnswers(newAnswers);
    setShowExplanation({ ...showExplanation, [currentIdx]: true });

    if (Object.keys(newAnswers).length === filteredQuestions.length) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) correct++;
    });
    const total = filteredQuestions.length;
    const percentage = Math.round((correct / total) * 100);

    let level = language === 'tr' ? 'Junior / Geliştirilmeye Açık' : 'Junior / Needs Improvement';
    let levelColor = 'text-amber-400';
    if (percentage >= 85) {
      level = language === 'tr' ? 'Senior / Staff React Mimarı' : 'Senior / Staff React Architect';
      levelColor = 'text-cyan-400';
    } else if (percentage >= 60) {
      level = language === 'tr' ? 'Mid-Level Geliştirici' : 'Mid-Level Professional';
      levelColor = 'text-emerald-400';
    }

    return { correct, total, percentage, level, levelColor };
  };

  const scoreData = calculateScore();

  const handleReset = () => {
    setUserAnswers({});
    setShowExplanation({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">{t.quiz.badge}</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">{t.quiz.desc}</p>
        </div>

        <div className="flex items-center space-x-1.5 self-start sm:self-auto overflow-x-auto">
          {difficultyTabs.map((tab) => {
            const isActive = selectedDifficultyKey === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => {
                  setSelectedDifficultyKey(tab.key);
                  handleReset();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                  {currentQ.moduleTitle}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentQ.difficulty}
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                {t.quiz.question} {currentIdx + 1} / {filteredQuestions.length}
              </span>
            </div>

            <h4 className="text-base font-semibold text-slate-100 leading-relaxed">
              {currentQ.question}
            </h4>

            {currentQ.codeSnippet && <CodeBlock code={currentQ.codeSnippet} language="tsx" />}

            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = userAnswers[currentIdx] === optIdx;
                const hasAnswered = userAnswers[currentIdx] !== undefined;
                const isCorrect = optIdx === currentQ.correctIndex;

                let optionClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/40';

                if (hasAnswered) {
                  if (isCorrect) optionClass = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200';
                  else if (isSelected && !isCorrect) optionClass = 'bg-red-950/40 border-red-500/60 text-red-200';
                  else optionClass = 'bg-slate-950/40 border-slate-800/60 text-slate-500';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={hasAnswered}
                    className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start space-x-3 ${optionClass}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px] font-mono shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {showExplanation[currentIdx] && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 animate-fadeIn">
                <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.quiz.concept} {currentQ.reactConcept}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs text-slate-300"
              >
                {t.quiz.prevQuestion}
              </button>

              {currentIdx < filteredQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((prev) => prev + 1)}
                  className="flex items-center space-x-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg text-xs"
                >
                  <span>{t.quiz.nextQuestion}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsCompleted(true)}
                  className="flex items-center space-x-1 px-5 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold rounded-lg text-xs shadow-lg shadow-emerald-500/20"
                >
                  <span>{t.quiz.finishTest}</span>
                  <BarChart3 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-white">{t.quiz.questionMap}</h4>
              <div className="grid grid-cols-5 gap-2">
                {filteredQuestions.map((q, idx) => {
                  const isAns = userAnswers[idx] !== undefined;
                  const isCorr = userAnswers[idx] === q.correctIndex;
                  const isCurrent = idx === currentIdx;

                  let boxClass = 'bg-slate-950 border-slate-800 text-slate-400';
                  if (isCurrent) boxClass = 'border-cyan-500 text-cyan-300 font-bold';
                  if (isAns) {
                    boxClass = isCorr
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                      : 'bg-red-950/60 border-red-500/60 text-red-300';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`p-2 rounded-lg border text-xs font-mono text-center transition-all ${boxClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.quiz.answered}</span>
                  <span className="font-mono text-slate-200">
                    {Object.keys(userAnswers).length} / {filteredQuestions.length}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t.quiz.correct}</span>
                  <span className="font-mono text-emerald-400 font-bold">{scoreData.correct}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
          <div className="relative p-8 md:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 mx-auto">
              <Zap className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                {t.quiz.completedSub}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                {t.quiz.completedTitle}
              </h2>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 max-w-md mx-auto">
              <span className="text-xs text-slate-400 block mb-1">{t.quiz.estLevel}</span>
              <span className={`text-lg font-bold ${scoreData.levelColor}`}>
                {scoreData.level}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">{t.quiz.correctCount}</span>
                <span className="text-xl font-bold text-emerald-400">{scoreData.correct}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{t.quiz.totalCount}</span>
                <span className="text-xl font-bold text-slate-200">{scoreData.total}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{t.quiz.successRate}</span>
                <span className="text-xl font-bold text-cyan-400">%{scoreData.percentage}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-4">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-cyan-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.quiz.restartTest}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
