export type Language = 'tr' | 'en';

export type DifficultyLevel = 'Başlangıç' | 'Orta' | 'İleri' | 'Uzman' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description?: string;
  filename?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  codeSnippets?: CodeSnippet[];
  notes?: string[];
  warnings?: string[];
  tips?: string[];
}

export interface LessonModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  category: string;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  overview: string;
  sections: LessonSection[];
  bestPractices: string[];
  commonPitfalls: string[];
  keyTakeaways: string[];
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  moduleTitle: string;
  difficulty: DifficultyLevel;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reactConcept: string;
}

export interface CodeRecipe {
  id: string;
  title: string;
  category: 'Custom Hooks' | 'State & Store' | 'Next.js & Server Actions' | 'Performance & Virtualization' | 'Forms & Validation' | 'Security & RBAC';
  description: string;
  code: string;
  filename: string;
  tags: string[];
  complexity: DifficultyLevel;
}

export interface TestCase {
  id: string;
  title: string;
  description: string;
  expectedOutput: string;
  testFunctionStr: string; // Testi koşturan JS mantığı
}

export interface ChallengeItem {
  id: string;
  title: string;
  category: 'Hooks' | 'Component Design' | 'Performance' | 'State Management';
  difficulty: DifficultyLevel;
  description: string;
  requirements: string[];
  constraints: string[];
  initialCode: string;
  solutionCode: string;
  hints: string[];
  explanation: string;
  testCases: TestCase[];
}

export interface ArchitectureNode {
  id: string;
  title: string;
  category: 'Core' | 'Hooks' | 'Fiber' | 'Next.js RSC' | 'State' | 'Performance';
  description: string;
  role: string;
  keyFeatures: string[];
  codeExample: string;
  connections: string[];
}
