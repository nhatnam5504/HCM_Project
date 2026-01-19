// Firebase Quiz Types
export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  category?: string;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  questionsPerAttempt: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAnswer {
  questionId: string;
  questionText: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  options: string[];
}

export interface QuizSubmission {
  id?: string;
  quizId: string;
  userName: string; // Tên người làm bài
  score: number;
  totalQuestions: number;
  answers: QuizAnswer[];
  timeSpent: number; // in seconds
  createdAt: Date;
  userId?: string;
}

export interface HighScore {
  id?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  createdAt: Date;
}

// Excel import format
export interface ExcelQuestionRow {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct: 'A' | 'B' | 'C' | 'D';
  category?: string;
}

// Quiz state for UI
export interface QuizState {
  status: 'idle' | 'loading' | 'ready' | 'in-progress' | 'completed';
  quiz: Quiz | null;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  startTime: number | null;
  endTime: number | null;
  userName: string;
  submission: QuizSubmission | null;
}
