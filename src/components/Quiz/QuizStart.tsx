import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Trophy, Clock, User } from 'lucide-react';

interface QuizStartProps {
  quiz: {
    title: string;
    description: string;
    questionsPerAttempt: number;
    totalQuestions: number;
  };
  onStart: (userName: string) => void;
  loading?: boolean;
}

const QuizStart: React.FC<QuizStartProps> = ({ quiz, onStart, loading }) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    const trimmedName = userName.trim();
    if (!trimmedName) {
      setError('Vui lòng nhập nickname của bạn');
      return;
    }
    if (trimmedName.length < 2) {
      setError('Nickname phải có ít nhất 2 ký tự');
      return;
    }
    setError('');
    onStart(trimmedName);
  };

  const features = [
    {
      icon: BookOpen,
      title: `${quiz.questionsPerAttempt} câu hỏi`,
      description: 'Ngẫu nhiên từ ngân hàng câu hỏi',
    },
    {
      icon: Clock,
      title: 'Không giới hạn thời gian',
      description: 'Làm bài thoải mái, không áp lực',
    },
    {
      icon: Trophy,
      title: 'Kết quả chi tiết',
      description: 'Xem đáp án và giải thích',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-8 text-white">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{quiz.title}</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {quiz.description}
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-2">
                ℹ️
              </span>
              Hướng dẫn làm bài
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>
                  Bài kiểm tra gồm <strong>{quiz.questionsPerAttempt} câu hỏi</strong> được
                  chọn ngẫu nhiên từ {quiz.totalQuestions} câu trong ngân hàng đề
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Mỗi câu hỏi có 4 đáp án, chọn 1 đáp án đúng nhất</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Sau khi hoàn thành, bạn sẽ thấy kết quả và đáp án chi tiết</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Bạn có thể làm lại nhiều lần để cải thiện kết quả</span>
              </li>
            </ul>
          </motion.div>

          {/* User Name Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-8"
          >
            <label htmlFor="userName" className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Hãy nhập nickname của bạn
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError('');
              }}
              placeholder="Ví dụ: Người yêu đất nước, Chú Bộ Đỏ, Bạn học sử..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-lg text-gray-900 placeholder-gray-500 bg-white"
              maxLength={50}
              disabled={loading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠️</span>
                {error}
              </p>
            )}
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-center"
          >
            <button
              onClick={handleStart}
              disabled={loading}
              className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Đang tải...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2 group-hover:translate-x-1 transition-transform" />
                  Bắt đầu làm bài
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-6 text-center text-gray-600"
      >
        <p className="text-sm">
          Ngân hàng đề: <strong className="text-gray-900">{quiz.totalQuestions} câu hỏi</strong>
        </p>
      </motion.div>
    </div>
  );
};

export default QuizStart;
