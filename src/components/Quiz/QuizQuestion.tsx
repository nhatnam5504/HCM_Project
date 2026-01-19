import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight } from 'lucide-react';
import type { QuizQuestion } from '../../types/quiz';

interface QuizQuestionProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number) => void;
  timeElapsed: number;
}

const QuizQuestionComponent: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timeElapsed,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setShowFeedback(false);
    setIsCorrect(false);
  }, [question.id]);

  const handleOptionClick = (index: number) => {
    if (showFeedback) return; // Prevent changing answer after selection

    setSelectedIndex(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Auto-advance after 2 seconds
    setTimeout(() => {
      onAnswer(index);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      return 'border-gray-200 hover:border-red-300 hover:bg-red-50 cursor-pointer';
    }

    if (index === question.correctIndex) {
      return 'border-green-500 bg-green-50';
    }

    if (index === selectedIndex && !isCorrect) {
      return 'border-red-500 bg-red-50';
    }

    return 'border-gray-200 opacity-50';
  };

  const getOptionIcon = (index: number) => {
    if (!showFeedback) return null;

    if (index === question.correctIndex) {
      return <Check className="w-5 h-5 text-green-600" />;
    }

    if (index === selectedIndex && !isCorrect) {
      return <X className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold text-lg">
                  Câu {questionNumber}/{totalQuestions}
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white h-2 rounded-full"
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed"
          >
            {question.text}
          </motion.h2>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleOptionClick(index)}
                disabled={showFeedback}
                className={`
                  w-full text-left p-5 rounded-xl border-2 transition-all duration-300
                  ${getOptionStyle(index)}
                  ${showFeedback ? 'cursor-not-allowed' : ''}
                  group relative
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div
                      className={`
                      w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold
                      ${showFeedback && index === question.correctIndex
                          ? 'bg-green-500 text-white'
                          : showFeedback && index === selectedIndex
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 group-hover:bg-red-500 group-hover:text-white'
                        }
                    `}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg text-gray-800 font-medium">{option}</span>
                  </div>
                  {getOptionIcon(index)}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`
                  mt-6 p-5 rounded-xl border-2
                  ${isCorrect
                    ? 'bg-green-50 border-green-300'
                    : 'bg-yellow-50 border-yellow-300'
                  }
                `}
              >
                <div className="flex items-start">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                    ${isCorrect ? 'bg-green-500' : 'bg-yellow-500'}
                  `}
                  >
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white text-xl">💡</span>
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-bold mb-1 ${isCorrect ? 'text-green-900' : 'text-yellow-900'
                        }`}
                    >
                      {isCorrect ? 'Chính xác! 🎉' : 'Chưa đúng'}
                    </h4>
                    <p className={isCorrect ? 'text-green-800' : 'text-yellow-800'}>
                      {isCorrect
                        ? 'Bạn đã trả lời đúng câu hỏi này!'
                        : `Đáp án đúng là: ${String.fromCharCode(
                          65 + question.correctIndex
                        )}. ${question.options[question.correctIndex]}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizQuestionComponent;
