import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { PracticePage } from './pages/PracticePage';
import { RecipesPage } from './pages/RecipesPage';
import { QuizPage } from './pages/QuizPage';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('module-1-react-basics');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedLessonId]);

  const handleSelectLesson = (id: string) => {
    setSelectedLessonId(id);
    setActiveTab('lesson-detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {activeTab === 'lessons' && (
          <LessonsPage onSelectLesson={handleSelectLesson} />
        )}

        {activeTab === 'lesson-detail' && (
          <LessonDetailPage
            lessonId={selectedLessonId}
            onBack={() => setActiveTab('lessons')}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {activeTab === 'practice' && <PracticePage />}

        {activeTab === 'recipes' && <RecipesPage />}

        {activeTab === 'architecture' && (
          <div className="py-4">
            <ArchitectureExplorer />
          </div>
        )}

        {activeTab === 'quiz' && <QuizPage />}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

export default App;
