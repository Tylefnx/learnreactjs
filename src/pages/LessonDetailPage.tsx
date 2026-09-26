import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { getLessonsData } from '../data/lessonsData';
import { CodeBlock } from '../components/CodeBlock';
import { MarkdownContent } from '../components/MarkdownContent';
import { useLanguage } from '../i18n/LanguageContext';

interface LessonDetailPageProps {
  lessonId: string;
  onBack: () => void;
  onSelectLesson: (id: string) => void;
}

export const LessonDetailPage: React.FC<LessonDetailPageProps> = ({
  lessonId,
  onBack,
  onSelectLesson,
}) => {
  const { language } = useLanguage();
  const lessonsList = getLessonsData(language);

  const currentIdx = lessonsList.findIndex((l) => l.id === lessonId);
  const lesson = lessonsList[currentIdx] || lessonsList[0];

  const prevLesson = currentIdx > 0 ? lessonsList[currentIdx - 1] : null;
  const nextLesson = currentIdx < lessonsList.length - 1 ? lessonsList[currentIdx + 1] : null;

  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to All Modules' : 'Tüm Modüllere Dön'}</span>
        </button>

        <div className="flex items-center space-x-2">
          {prevLesson && (
            <button
              onClick={() => onSelectLesson(prevLesson.id)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs rounded-lg flex items-center space-x-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Module {prevLesson.number}</span>
            </button>
          )}
          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs rounded-lg flex items-center space-x-1"
            >
              <span className="hidden sm:inline">Module {nextLesson.number}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Module Title Banner */}
      <div className="space-y-4 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
            {language === 'en' ? `Module ${lesson.number}` : `Modül ${lesson.number}`}
          </span>
          <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
            {lesson.category}
          </span>
          <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
            {language === 'en' ? `Level: ${lesson.difficulty}` : `Seviye: ${lesson.difficulty}`}
          </span>
          <span className="text-xs font-mono text-slate-400 flex items-center space-x-1 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.durationMinutes} min</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{lesson.title}</h1>
        <p className="text-base text-slate-300 leading-relaxed">{lesson.subtitle}</p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-cyan-400 block mb-1">
            {language === 'en' ? 'Overview:' : 'Genel Bakış:'}
          </span>
          {lesson.overview}
        </div>
      </div>

      {/* Lesson Sections */}
      <div className="space-y-12">
        {lesson.sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-6"
          >
            <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
              {section.title}
            </h2>

            <MarkdownContent content={section.content} />

            {section.codeSnippets && section.codeSnippets.length > 0 && (
              <div className="space-y-4 pt-2">
                {section.codeSnippets.map((snippet, sIdx) => (
                  <CodeBlock
                    key={sIdx}
                    code={snippet.code}
                    language={snippet.language}
                    filename={snippet.filename}
                    title={snippet.title}
                  />
                ))}
              </div>
            )}

            {section.notes && section.notes.length > 0 && (
              <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-2xl space-y-1">
                <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-300">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'en' ? 'Technical Note' : 'Teknik Not'}</span>
                </div>
                {section.notes.map((note, nIdx) => (
                  <p key={nIdx} className="text-xs text-slate-300 leading-relaxed">{note}</p>
                ))}
              </div>
            )}

            {section.warnings && section.warnings.length > 0 && (
              <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-2xl space-y-1">
                <div className="flex items-center space-x-2 text-xs font-semibold text-red-300">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>{language === 'en' ? 'Caution / Watch Out' : 'Kritik Dikkat Noktası'}</span>
                </div>
                {section.warnings.map((warn, wIdx) => (
                  <p key={wIdx} className="text-xs text-slate-300 leading-relaxed">{warn}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Best Practices & Pitfalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'en' ? 'Best Practices' : 'En İyi Pratikler (Best Practices)'}</span>
          </div>
          <ul className="space-y-2">
            {lesson.bestPractices.map((bp, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-red-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>{language === 'en' ? 'Common Pitfalls' : 'Sık Yapılan Hatalar (Common Pitfalls)'}</span>
          </div>
          <ul className="space-y-2">
            {lesson.commonPitfalls.map((cp, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-red-400 font-bold">•</span>
                <span>{cp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
          {language === 'en' ? 'Key Takeaways' : 'Özet & Çıkarımlar'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {lesson.keyTakeaways.map((takeaway, idx) => (
            <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300">
              {takeaway}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
