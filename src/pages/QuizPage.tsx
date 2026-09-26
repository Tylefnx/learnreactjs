import React from 'react';
import { QuizEngine } from '../components/QuizEngine';

export const QuizPage: React.FC = () => {
  return (
    <div className="space-y-6 py-4">
      <QuizEngine />
    </div>
  );
};
