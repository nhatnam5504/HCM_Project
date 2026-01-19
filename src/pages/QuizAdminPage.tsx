import React, { useState, useEffect } from 'react';
import { Upload, Download, Check, AlertCircle, Info, Trophy, FileText } from 'lucide-react';
import { FaMedal, FaClock, FaPercentage } from 'react-icons/fa';
import ExcelQuestionParser from '../utils/excelParser';
import QuizService from '../services/quizService';
import { collection, onSnapshot, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { HighScore } from '../types/quiz';

/**
 * Admin Page for Quiz Management
 * 
 * IMPORTANT: This page should be protected in production or removed after initial setup
 * For development only - allows importing questions from Excel
 */

const QUIZ_ID = 'ls-dcsvn';

const QuizAdminPage: React.FC = () => {
  const [mode, setMode] = useState<'import' | 'ranking'>('import');
  const [file, setFile] = useState<File | null>(null);
  const [clearOldQuestions, setClearOldQuestions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loadingScores, setLoadingScores] = useState(true);
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Real-time listener for high scores
  useEffect(() => {
    if (mode !== 'ranking') return;

    setLoadingScores(true);
    const q = query(
      collection(db, 'highscores'),
      orderBy('score', 'desc'),
      firestoreLimit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as HighScore[];

      // Sort by score DESC, then by timeSpent ASC
      scores.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.timeSpent - b.timeSpent;
      });

      setHighScores(scores.slice(0, 30));
      setLoadingScores(false);
    }, (error) => {
      console.error('Error fetching high scores:', error);
      setLoadingScores(false);
    });

    return () => unsubscribe();
  }, [mode]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus({ type: 'idle', message: '' });
    }
  };

  const handleImport = async () => {
    if (!file) {
      setStatus({ type: 'error', message: 'Vui lòng chọn file Excel' });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: 'idle', message: 'Đang xử lý file...' });

      // Parse Excel file
      const questions = await ExcelQuestionParser.parseFile(file);

      setStatus({
        type: 'idle',
        message: `Đã phân tích ${questions.length} câu hỏi. Đang tải lên hệ thống...`,
      });

      // Create/update quiz metadata
      await QuizService.createOrUpdateQuiz(QUIZ_ID, {
        title: 'Lịch Sử Đảng Cộng Sản Việt Nam',
        description: 'Kiểm tra kiến thức về giai đoạn Đổi Mới (1986-2018)',
        totalQuestions: questions.length,
        questionsPerAttempt: 20,
      });

      // Import questions to Firestore
      await QuizService.importQuestions(QUIZ_ID, questions, clearOldQuestions);

      setStatus({
        type: 'success',
        message: `✅ Đã import thành công ${questions.length} câu hỏi!${clearOldQuestions ? ' (Đã xóa câu hỏi cũ)' : ''}`,
      });

      setFile(null);
      // Reset file input
      const input = document.getElementById('file-input') as HTMLInputElement;
      if (input) input.value = '';
    } catch (error: any) {
      console.error('Import error:', error);
      setStatus({
        type: 'error',
        message: `❌ Lỗi: ${error.message || 'Không thể import câu hỏi'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    ExcelQuestionParser.downloadTemplate('mau-cau-hoi-quiz.xlsx');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-3xl">🥇</span>;
      case 2:
        return <span className="text-3xl">🥈</span>;
      case 3:
        return <span className="text-3xl">🥉</span>;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Mode Toggle Bar - Right aligned (like LibraryPage) */}
        <div className="fixed top-20 right-6 z-[60] flex items-center gap-3">
          <span className="text-[#8B1A1A] text-sm font-semibold hidden md:inline">
            Chế độ:
          </span>
          <div className="flex gap-2 bg-[rgba(139,26,26,0.9)] p-1 rounded-full border-2 border-[#FFD700]/40 shadow-[0_0_20px_rgba(255,215,0,0.2)] backdrop-blur-md">
            <button
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${mode === 'import'
                  ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1A1A] shadow-[0_4px_12px_rgba(255,215,0,0.5)]"
                  : "bg-transparent text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]"
                }`}
              onClick={() => setMode('import')}
            >
              <FileText className="text-sm" />
              <span>Import</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${mode === 'ranking'
                  ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1A1A] shadow-[0_4px_12px_rgba(255,215,0,0.5)]"
                  : "bg-transparent text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]"
                }`}
              onClick={() => setMode('ranking')}
            >
              <Trophy className="text-sm" />
              <span>Xếp Hạng</span>
            </button>
          </div>
        </div>

        {/* Import Questions View */}
        {mode === 'import' && (
          <>
            {/* Warning Banner */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">
                    ⚠️ Trang Quản Trị - Dành Cho Chủ Sở Hữu
                  </h3>
                  <p className="text-yellow-800">
                    Trang này cho phép import câu hỏi từ Excel vào hệ thống.{' '}
                    <strong>Chỉ sử dụng khi thiết lập hoặc cập nhật câu hỏi.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Quản Lý Câu Hỏi Quiz
              </h1>
              <p className="text-gray-600 mb-8">
                Import câu hỏi từ file Excel vào hệ thống
              </p>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Hướng Dẫn Sử Dụng
                </h3>
                <ol className="space-y-2 text-blue-800 list-decimal list-inside">
                  <li>Tải file mẫu Excel (nút bên dưới)</li>
                  <li>Điền câu hỏi vào file Excel theo định dạng:
                    <ul className="ml-6 mt-2 space-y-1 text-sm list-disc list-inside">
                      <li><code>question</code>: Nội dung câu hỏi</li>
                      <li><code>optionA, optionB, optionC, optionD</code>: 4 đáp án</li>
                      <li><code>correct</code>: Đáp án đúng (A, B, C hoặc D)</li>
                      <li><code>category</code> (tùy chọn): Danh mục câu hỏi</li>
                    </ul>
                  </li>
                  <li>Chọn file Excel đã điền</li>
                  <li>Nhấn "Import Câu Hỏi" để tải lên danh sách các câu hỏi</li>
                </ol>
              </div>

              {/* Download Template Button */}
              <div className="mb-8">
                <button
                  onClick={handleDownloadTemplate}
                  className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Tải File Mẫu Excel
                </button>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label
                  htmlFor="file-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Chọn File Excel (.xlsx)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    id="file-input"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  {file && (
                    <div className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-1" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Clear Old Questions Option */}
              <div className="mb-6">
                <label className="flex items-center space-x-3 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl cursor-pointer hover:bg-yellow-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={clearOldQuestions}
                    onChange={(e) => setClearOldQuestions(e.target.checked)}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      🗑️ Xóa tất cả câu hỏi cũ trước khi import
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Khuyến nghị:</strong> Bật tùy chọn này để tránh trùng lặp câu hỏi.
                      Nếu tắt, câu hỏi mới sẽ được thêm vào danh sách hiện có.
                    </div>
                  </div>
                </label>
              </div>

              {/* Import Button */}
              <button
                onClick={handleImport}
                disabled={!file || loading}
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Import Câu Hỏi
                  </>
                )}
              </button>

              {/* Status Message */}
              {status.message && (
                <div
                  className={`
                  mt-6 p-4 rounded-xl border-2
                  ${status.type === 'success'
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : status.type === 'error'
                        ? 'bg-red-50 border-red-300 text-red-800'
                        : 'bg-blue-50 border-blue-300 text-blue-800'
                    }
                `}
                >
                  <p className="font-medium">{status.message}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Ranking View */}
        {mode === 'ranking' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8B1A1A] to-[#DC143C] bg-clip-text text-transparent mb-2">
                  🏆 Bảng Xếp Hạng
                </h1>
                <p className="text-gray-600">
                  Cập nhật real-time - {highScores.length} người chơi
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-300 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-700 font-semibold text-sm">Live</span>
              </div>
            </div>

            {loadingScores ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : highScores.length === 0 ? (
              <div className="text-center py-20">
                <Trophy className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Chưa có người chơi nào</p>
              </div>
            ) : (
              <div className="space-y-3">
                {highScores.map((score, index) => (
                  <div
                    key={score.id}
                    className={`
                      flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg
                      ${index === 0
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-400 shadow-md'
                        : index === 1
                          ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-400'
                          : index === 2
                            ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-400'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0 w-16 flex items-center justify-center">
                      {getRankIcon(index + 1)}
                    </div>

                    {/* User Name */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold truncate text-gray-900 ${index < 3 ? 'text-lg' : 'text-base'}`}>
                        {score.userName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(score.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                      {/* Score */}
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-[#8B1A1A]">
                          <FaMedal className="text-lg" />
                          <span className="text-2xl font-bold">
                            {score.score}/{score.totalQuestions}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Điểm</p>
                      </div>

                      {/* Percentage */}
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-blue-600">
                          <FaPercentage className="text-sm" />
                          <span className="text-xl font-bold">{score.percentage}%</span>
                        </div>
                        <p className="text-xs text-gray-500">Chính xác</p>
                      </div>

                      {/* Time */}
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-green-600">
                          <FaClock className="text-sm" />
                          <span className="text-xl font-bold">{formatTime(score.timeSpent)}</span>
                        </div>
                        <p className="text-xs text-gray-500">Thời gian</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizAdminPage;
