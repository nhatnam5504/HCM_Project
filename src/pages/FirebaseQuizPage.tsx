import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuizStart from '../components/Quiz/QuizStart';
import QuizQuestion from '../components/Quiz/QuizQuestion';
import QuizResult from '../components/Quiz/QuizResult';
import { QuizService } from '../services/quizService';
import type { Quiz, QuizQuestion as QuizQuestionType, QuizAnswer, QuizState } from '../types/quiz';

const QUIZ_ID = 'ls-dcsvn'; // Lịch Sử Đảng Cộng Sản Việt Nam
const FirebaseQuizPage: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    status: 'loading',
    quiz: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    startTime: null,
    endTime: null,
    submission: null,
    userName: '',
  });

  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Load quiz data on mount
  useEffect(() => {
    loadQuiz();
  }, []);

  // Timer effect
  useEffect(() => {
    if (state.status === 'in-progress' && state.startTime) {
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.startTime!) / 1000);
        setTimeElapsed(elapsed);
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [state.status, state.startTime]);

  const loadQuiz = async () => {
    try {
      setState((prev: QuizState) => ({ ...prev, status: 'loading' }));

      const quiz = await QuizService.getQuiz(QUIZ_ID);

      if (!quiz) {
        throw new Error('Quiz not found. Please contact administrator.');
      }

      setState((prev: QuizState) => ({
        ...prev,
        quiz,
        status: 'ready',
      }));
    } catch (error) {
      console.error('Failed to load quiz:', error);
      alert('Không thể tải bài kiểm tra. Vui lòng thử lại sau.');
      setState((prev: QuizState) => ({ ...prev, status: 'idle' }));
    }
  };

  const handleStart = async (userName: string) => {
    if (!state.quiz) return;

    try {
      setState((prev: QuizState) => ({ ...prev, status: 'loading' }));

      // Get random questions
      const questions = await QuizService.getRandomQuestions(
        QUIZ_ID,
        state.quiz.questionsPerAttempt
      );

      setState((prev: QuizState) => ({
        ...prev,
        questions,
        status: 'in-progress',
        startTime: Date.now(),
        currentQuestionIndex: 0,
        answers: [],
        userName,
      }));

      setTimeElapsed(0);
    } catch (error) {
      console.error('Failed to start quiz:', error);
      alert('Không thể bắt đầu bài kiểm tra. Vui lòng thử lại.');
      setState((prev: QuizState) => ({ ...prev, status: 'ready' }));
    }
  };

  const handleAnswer = async (selectedIndex: number) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      selectedIndex,
      correctIndex: currentQuestion.correctIndex,
      isCorrect: selectedIndex === currentQuestion.correctIndex,
      options: currentQuestion.options,
    };

    const newAnswers = [...state.answers, answer];

    // Check if quiz is complete
    if (state.currentQuestionIndex >= state.questions.length - 1) {
      await completeQuiz(newAnswers);
    } else {
      setState((prev: QuizState) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: newAnswers,
      }));
    }
  };

  const completeQuiz = async (answers: QuizAnswer[]) => {
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - state.startTime!) / 1000);
    const score = answers.filter((a: QuizAnswer) => a.isCorrect).length;

    try {
      // Submit to Firebase
      const submissionId = await QuizService.submitQuiz({
        quizId: QUIZ_ID,
        userName: state.userName,
        score,
        totalQuestions: state.questions.length,
        answers,
        timeSpent,
      });

      console.log('Quiz submitted:', submissionId);

      setState((prev: QuizState) => ({
        ...prev,
        status: 'completed',
        endTime,
        answers,
      }));

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      // Still show results even if submission fails
      setState((prev: QuizState) => ({
        ...prev,
        status: 'completed',
        endTime,
        answers,
      }));
    }
  };

  const handleRetry = () => {
    setState({
      status: 'ready',
      quiz: state.quiz,
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      endTime: null,
      submission: null,
      userName: state.userName, // Giữ lại tên người dùng
    });
    setTimeElapsed(0);
  };

  // Loading state
  if (state.status === 'loading') {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-yellow-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-600">Đang tải bài kiểm tra...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (state.status === 'idle' || !state.quiz) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-yellow-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Không tìm thấy bài kiểm tra
            </h2>
            <p className="text-gray-600 mb-6">
              Bài kiểm tra chưa được thiết lập. Vui lòng liên hệ quản trị viên.
            </p>
            <button
              onClick={loadQuiz}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-yellow-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {state.status === 'ready' && (
            <QuizStart
              key="start"
              quiz={state.quiz}
              onStart={handleStart}
              loading={false}
            />
          )}

          {state.status === 'in-progress' && (
            <QuizQuestion
              key={`question-${state.currentQuestionIndex}`}
              question={state.questions[state.currentQuestionIndex]}
              questionNumber={state.currentQuestionIndex + 1}
              totalQuestions={state.questions.length}
              onAnswer={handleAnswer}
              timeElapsed={timeElapsed}
            />
          )}

          {state.status === 'completed' && (
            <QuizResult
              key="result"
              score={state.answers.filter((a: QuizAnswer) => a.isCorrect).length}
              totalQuestions={state.questions.length}
              answers={state.answers}
              timeSpent={timeElapsed}
              onRetry={handleRetry}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FirebaseQuizPage;
