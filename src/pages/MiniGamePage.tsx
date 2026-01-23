import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  X,
  Play,
  RotateCcw,
  Users,
  Gift,
  Bomb,
  Star,
  ChevronRight,
  Check,
  AlertTriangle,
  HelpCircle,
  Shuffle,
  ArrowRight,
  Hand,
} from 'lucide-react';
import {
  TeamId,
  TeamState,
  TurnState,
  QuestionStatus,
  GameState,
  Question,
  DrawnCard,
  DEFAULT_EXPLOSION_RATES,
  BackupQuestion,
} from '../types/meono';
import {
  allQuestions,
  getQuestionsWithLetters,
  getRandomBackupQuestion,
} from '../data/meonoQuestions';

// ===== CONSTANTS =====
const TEAM_COLORS: Record<TeamId, string> = {
  A: 'from-red-500 to-red-600',
  B: 'from-blue-500 to-blue-600',
  C: 'from-green-500 to-green-600',
  D: 'from-purple-500 to-purple-600',
};

const TEAM_BG_COLORS: Record<TeamId, string> = {
  A: 'bg-red-100 border-red-400',
  B: 'bg-blue-100 border-blue-400',
  C: 'bg-green-100 border-green-400',
  D: 'bg-purple-100 border-purple-400',
};

const INITIAL_PRIZE_COUNT = 8;
const WIN_THRESHOLD = 20;
const MAX_DRAWS = 5; // Cho phép rút đến lần 5 (85% nổ) theo yêu cầu

// ===== HELPER FUNCTIONS =====
function getExplosionRate(drawCount: number, modifier: number): { point: number; explosion: number } {
  const key = `draw${drawCount}` as keyof typeof DEFAULT_EXPLOSION_RATES;
  const base = DEFAULT_EXPLOSION_RATES[key] || DEFAULT_EXPLOSION_RATES.draw5;
  const adjustedExplosion = Math.min(100, Math.max(0, base.explosion + modifier));
  return {
    point: 100 - adjustedExplosion,
    explosion: adjustedExplosion,
  };
}

function getModifierForNextTurn(stoppedPoints: number): number {
  if (stoppedPoints < 10) return 0; // Reset
  if (stoppedPoints < 13) return 10; // +10%
  if (stoppedPoints < 16) return 20; // +20%
  return 0; // >= 16: giữ nguyên
}

function drawCard(explosionChance: number): DrawnCard {
  const roll = Math.random() * 100;
  if (roll < explosionChance) {
    return { type: 'EXPLOSION' };
  }
  const points = Math.floor(Math.random() * 5) + 1;
  return { type: 'POINT', points };
}

function getRandomInitialPoints(): number {
  return Math.floor(Math.random() * 5) + 1;
}

function initializeTeams(): Record<TeamId, TeamState> {
  return {
    A: { id: 'A', name: 'Nhóm A', totalScore: 0, explosionModifier: 0, hasWonPrize: false },
    B: { id: 'B', name: 'Nhóm B', totalScore: 0, explosionModifier: 0, hasWonPrize: false },
    C: { id: 'C', name: 'Nhóm C', totalScore: 0, explosionModifier: 0, hasWonPrize: false },
    D: { id: 'D', name: 'Nhóm D', totalScore: 0, explosionModifier: 0, hasWonPrize: false },
  };
}

function initializeQuestions(): QuestionStatus[] {
  const questionsWithLetters = getQuestionsWithLetters();
  return questionsWithLetters.map(({ letter, question }) => ({
    id: question.id,
    letter,
    used: false,
    question,
  }));
}

// ===== QUESTION TYPE COMPONENTS =====

// Component: Ghép câu trả lời
const MatchingQuestionComponent: React.FC<{
  question: Question;
  onAnswer: (correct: boolean) => void;
}> = ({ question, onAnswer }) => {
  if (question.type !== 'GHEP_CAU') return null;

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Shuffle options independently to prevent alignment guessing
  const shuffledActions = useMemo(() => [...question.actions].sort(() => Math.random() - 0.5), [question.id]);
  const shuffledGoals = useMemo(() => [...question.goals].sort(() => Math.random() - 0.5), [question.id]);
  const shuffledResults = useMemo(() => [...question.results].sort(() => Math.random() - 0.5), [question.id]);

  const handleSubmit = () => {
    if (!selectedAction || !selectedGoal || !selectedResult) return;
    setSubmitted(true);
    const isCorrect =
      selectedAction === question.correctAnswer.action &&
      selectedGoal === question.correctAnswer.goal &&
      selectedResult === question.correctAnswer.result;
    setTimeout(() => onAnswer(isCorrect), 1500);
  };

  const isComplete = selectedAction && selectedGoal && selectedResult;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-block px-4 py-2 bg-yellow-100 rounded-full text-sm font-semibold text-yellow-800">
          {question.context}
        </span>
        <h3 className="text-xl font-bold mt-3 text-gray-800">Ghép thành chuỗi logic đúng</h3>
        <p className="text-gray-600 text-sm mt-1">Hành động → Mục đích → Kết quả</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Actions */}
        <div className="space-y-2">
          <h4 className="font-semibold text-center text-gray-700 mb-3">🎯 Hành động</h4>
          {shuffledActions.map((action) => (
            <button
              key={action}
              onClick={() => !submitted && setSelectedAction(action)}
              disabled={submitted}
              className={`w-full p-3 rounded-lg border-2 transition-all text-base font-medium ${selectedAction === action
                  ? 'border-red-500 bg-red-50 text-red-800 font-bold'
                  : 'border-gray-300 hover:border-red-400 bg-white text-gray-800'
                } ${submitted ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Goals */}
        <div className="space-y-2">
          <h4 className="font-semibold text-center text-gray-700 mb-3">🎯 Mục đích</h4>
          {shuffledGoals.map((goal) => (
            <button
              key={goal}
              onClick={() => !submitted && setSelectedGoal(goal)}
              disabled={submitted}
              className={`w-full p-3 rounded-lg border-2 transition-all text-base font-medium ${selectedGoal === goal
                  ? 'border-yellow-500 bg-yellow-50 text-yellow-800 font-bold'
                  : 'border-gray-300 hover:border-yellow-400 bg-white text-gray-800'
                } ${submitted ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              {goal}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-2">
          <h4 className="font-semibold text-center text-gray-700 mb-3">✨ Kết quả</h4>
          {shuffledResults.map((result) => (
            <button
              key={result}
              onClick={() => !submitted && setSelectedResult(result)}
              disabled={submitted}
              className={`w-full p-3 rounded-lg border-2 transition-all text-base font-medium ${selectedResult === result
                  ? 'border-green-500 bg-green-50 text-green-800 font-bold'
                  : 'border-gray-300 hover:border-green-400 bg-white text-gray-800'
                } ${submitted ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              {result}
            </button>
          ))}
        </div>
      </div>

      {/* Selected chain preview */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 p-4 rounded-xl border-2 border-yellow-300"
        >
          <p className="text-center text-sm text-gray-600 mb-2">Chuỗi bạn chọn:</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-red-100 rounded-lg text-red-700 text-sm font-medium">
              {selectedAction}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="px-3 py-1 bg-yellow-100 rounded-lg text-yellow-700 text-sm font-medium">
              {selectedGoal}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="px-3 py-1 bg-green-100 rounded-lg text-green-700 text-sm font-medium">
              {selectedResult}
            </span>
          </div>
        </motion.div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${isComplete
              ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          Xác nhận
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-4"
        >
          <div className="text-4xl mb-2">⏳</div>
          <p className="text-gray-600">Đang kiểm tra...</p>
        </motion.div>
      )}
    </div>
  );
};

// Component: Trả lời 3 câu hỏi liên tiếp
const MultipleChoiceQuestionComponent: React.FC<{
  question: Question;
  onAnswer: (correct: boolean) => void;
}> = ({ question, onAnswer }) => {
  if (question.type !== 'TRA_LOI') return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const currentQ = question.questions[currentIndex];

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;

    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentIndex < question.questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      setSubmitted(true);
      // Check if all correct
      const allCorrect = newAnswers.every(
        (ans, idx) => ans === question.questions[idx].correctIndex
      );
      setTimeout(() => onAnswer(allCorrect), 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-block px-4 py-2 bg-blue-100 rounded-full text-sm font-semibold text-blue-800">
          {question.context}
        </span>
        <h3 className="text-xl font-bold mt-3 text-gray-800">Trả lời 3 câu liên tiếp</h3>
        <p className="text-gray-600 text-sm mt-1">Phải đúng cả 3 câu mới PASS</p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {question.questions.map((_, idx) => (
          <div
            key={idx}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${idx < answers.length
                ? 'bg-green-500 text-white'
                : idx === currentIndex
                  ? 'bg-yellow-500 text-white animate-pulse'
                  : 'bg-gray-200 text-gray-500'
              }`}
          >
            {idx + 1}
          </div>
        ))}
      </div>

      {!submitted && currentQ && (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <p className="text-lg font-semibold text-gray-800 text-center">{currentQ.question}</p>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white hover:border-yellow-500 hover:bg-yellow-50 transition-all text-left text-base font-medium text-gray-800"
              >
                <span className="inline-block w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-center leading-8 mr-3 font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {submitted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <div className="text-5xl mb-3">⏳</div>
          <p className="text-gray-600 text-lg">Đang kiểm tra kết quả...</p>
        </motion.div>
      )}
    </div>
  );
};

// Component: Mô phỏng đường Bác đi
const PathQuestionComponent: React.FC<{
  question: Question;
  onAnswer: (correct: boolean) => void;
}> = ({ question, onAnswer }) => {
  if (question.type !== 'MO_PHONG') return null;

  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const shuffledCards = useMemo(
    () => [...question.allCards].sort(() => Math.random() - 0.5),
    [question.allCards]
  );

  const toggleCard = (card: string) => {
    if (submitted) return;
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter((c) => c !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...selectedCards];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    setSelectedCards(newArr);
  };

  const moveDown = (index: number) => {
    if (index === selectedCards.length - 1) return;
    const newArr = [...selectedCards];
    [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
    setSelectedCards(newArr);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect =
      selectedCards.length === question.correctSequence.length &&
      selectedCards.every((card, idx) => card === question.correctSequence[idx]);
    setTimeout(() => onAnswer(isCorrect), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-800">
          {question.context}
        </span>
        <h3 className="text-xl font-bold mt-3 text-gray-800">Mô phỏng đường Bác đi</h3>
        <p className="text-gray-600 text-sm mt-1">Chọn và sắp xếp đúng trình tự</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Available cards */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-center">📋 Các thẻ có sẵn</h4>
          <div className="space-y-2">
            {shuffledCards.map((card) => {
              const isSelected = selectedCards.includes(card);
              return (
                <button
                  key={card}
                  onClick={() => toggleCard(card)}
                  disabled={submitted}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-base font-medium ${isSelected
                      ? 'border-purple-500 bg-purple-100 text-purple-800 font-bold'
                      : 'border-gray-300 hover:border-purple-400 bg-white text-gray-800'
                    } ${submitted ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {card}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected sequence */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-center">📍 Trình tự đã chọn</h4>
          {selectedCards.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              Chọn thẻ từ bên trái
            </div>
          ) : (
            <div className="space-y-2">
              {selectedCards.map((card, idx) => (
                <div
                  key={card}
                  className="flex items-center gap-2 p-3 bg-purple-50 border-2 border-purple-300 rounded-lg"
                >
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="flex-1 text-base font-semibold text-gray-800">{card}</span>
                  {!submitted && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveUp(idx)}
                        className="p-1 hover:bg-purple-200 rounded"
                        disabled={idx === 0}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveDown(idx)}
                        className="p-1 hover:bg-purple-200 rounded"
                        disabled={idx === selectedCards.length - 1}
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => toggleCard(card)}
                        className="p-1 hover:bg-red-200 rounded text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selectedCards.length === 0}
          className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${selectedCards.length > 0
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          Xác nhận trình tự
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-4"
        >
          <div className="text-4xl mb-2">⏳</div>
          <p className="text-gray-600">Đang kiểm tra...</p>
        </motion.div>
      )}
    </div>
  );
};

// Component: Ghép hình với ý nghĩa
const ImageMatchQuestionComponent: React.FC<{
  question: Question;
  onAnswer: (correct: boolean) => void;
}> = ({ question, onAnswer }) => {
  if (question.type !== 'GHEP_HINH') return null;

  const [matches, setMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctPairs = question.pairs.filter((p) => p.isCorrect);
  const allMeanings = useMemo(
    () => [...question.pairs.map((p) => p.meaning)].sort(() => Math.random() - 0.5),
    [question.pairs]
  );

  const handleMatch = (imageLabel: string, meaning: string) => {
    if (submitted) return;
    setMatches({ ...matches, [imageLabel]: meaning });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Check if all correct pairs are matched correctly
    const correctCount = correctPairs.filter(
      (pair) => matches[pair.label] === pair.meaning
    ).length;
    const isCorrect = correctCount === question.correctPairsCount;
    setTimeout(() => onAnswer(isCorrect), 1500);
  };

  const matchedMeanings = Object.values(matches);
  const isComplete = Object.keys(matches).length >= question.correctPairsCount;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-block px-4 py-2 bg-orange-100 rounded-full text-sm font-semibold text-orange-800">
          {question.context}
        </span>
        <h3 className="text-xl font-bold mt-3 text-gray-800">Ghép hình với ý nghĩa</h3>
        <p className="text-gray-600 text-sm mt-1">
          Chọn {question.correctPairsCount} cặp đúng (có hình bẫy!)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Images */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-center">🖼️ Hình ảnh</h4>
          <div className="grid grid-cols-2 gap-3">
            {question.pairs.map((pair) => (
              <div
                key={pair.label}
                className={`p-4 rounded-xl border-2 text-center transition-all ${matches[pair.label]
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white'
                  }`}
              >
                <div className="text-4xl mb-2">{pair.image}</div>
                <p className="text-sm font-medium text-gray-700">{pair.label}</p>
                {matches[pair.label] && (
                  <p className="text-xs text-orange-600 mt-1">→ {matches[pair.label]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Meanings */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-center">💡 Ý nghĩa</h4>
          <div className="space-y-2">
            {allMeanings.map((meaning) => {
              const isUsed = matchedMeanings.includes(meaning);
              return (
                <div
                  key={meaning}
                  className={`p-3 rounded-lg border-2 transition-all ${isUsed
                      ? 'border-gray-300 bg-gray-100 text-gray-500'
                      : 'border-gray-300 bg-white'
                    }`}
                >
                  <p className="text-base font-medium text-gray-800">{meaning}</p>
                  {!isUsed && !submitted && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {question.pairs
                        .filter((p) => !matches[p.label])
                        .map((pair) => (
                          <button
                            key={pair.label}
                            onClick={() => handleMatch(pair.label, meaning)}
                            className="px-2 py-1 text-xs bg-orange-100 hover:bg-orange-200 rounded text-orange-700"
                          >
                            {pair.image}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {!submitted && (
        <div className="flex gap-3">
          <button
            onClick={() => setMatches({})}
            className="flex-1 py-3 rounded-xl font-bold border-2 border-gray-300 hover:bg-gray-50 transition-all"
          >
            Làm lại
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${isComplete
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            Xác nhận ({Object.keys(matches).length}/{question.correctPairsCount})
          </button>
        </div>
      )}

      {submitted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-4"
        >
          <div className="text-4xl mb-2">⏳</div>
          <p className="text-gray-600">Đang kiểm tra...</p>
        </motion.div>
      )}
    </div>
  );
};

// ===== BACKUP QUESTION COMPONENT =====
const BackupQuestionModal: React.FC<{
  question: BackupQuestion;
  onAnswer: (correct: boolean) => void;
}> = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setTimeout(() => onAnswer(selected === question.correctIndex), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-2xl max-w-2xl w-full p-6 border-4 border-yellow-400"
      >
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🛟</div>
          <h2 className="text-2xl font-bold text-gray-800">CÂU HỎI BACKUP</h2>
          <p className="text-gray-600">Trả lời đúng để giữ 50% điểm!</p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 mb-6">
          <p className="text-lg font-semibold text-gray-800">{question.question}</p>
        </div>

        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !submitted && setSelected(idx)}
              disabled={submitted}
              className={`w-full p-4 rounded-xl border-2 text-left text-base font-medium transition-all ${selected === idx
                  ? 'border-yellow-500 bg-yellow-50 text-yellow-800 font-bold'
                  : 'border-gray-300 bg-white hover:border-yellow-400 text-gray-800'
                } ${submitted ? 'cursor-not-allowed' : ''}`}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-center leading-8 mr-3 font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${selected !== null
                ? 'bg-gradient-to-r from-yellow-600 to-red-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            Xác nhận câu trả lời
          </button>
        ) : (
          <div className="text-center py-4">
            <div className="text-4xl mb-2">⏳</div>
            <p className="text-gray-600">Đang kiểm tra...</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ===== CARD DRAW ANIMATION =====
const CardDrawAnimation: React.FC<{
  card: DrawnCard;
  onComplete: () => void;
}> = ({ card, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className={`w-64 h-96 rounded-2xl flex flex-col items-center justify-center shadow-2xl ${card.type === 'EXPLOSION'
            ? 'bg-gradient-to-br from-red-600 to-orange-600'
            : 'bg-gradient-to-br from-green-500 to-emerald-600'
          }`}
      >
        {card.type === 'EXPLOSION' ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-8xl mb-4"
            >
              💣
            </motion.div>
            <p className="text-3xl font-bold text-white">NỔ!</p>
            <p className="text-white/80 mt-2">Mất toàn bộ điểm lượt</p>
          </>
        ) : (
          <>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-8xl mb-4"
            >
              ⭐
            </motion.div>
            <p className="text-5xl font-bold text-white">+{card.points}</p>
            <p className="text-white/80 mt-2">điểm</p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// ===== MAIN GAME COMPONENT =====
const MiniGamePage: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>(() => ({
    teams: initializeTeams(),
    questions: initializeQuestions(),
    currentTurn: null,
    prizeCount: INITIAL_PRIZE_COUNT,
    turnHistory: [],
    gameEnded: false,
    winner: null,
  }));

  // UI state
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showCardAnimation, setShowCardAnimation] = useState(false);
  const [lastDrawnCard, setLastDrawnCard] = useState<DrawnCard | null>(null);
  const [showBackupQuestion, setShowBackupQuestion] = useState(false);
  const [backupQuestion, setBackupQuestion] = useState<BackupQuestion | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState({ title: '', message: '', isSuccess: true });
  const [showInstructions, setShowInstructions] = useState(true);

  const teamOrder: TeamId[] = ['A', 'B', 'C', 'D'];

  // Derived state
  const currentTeam = gameState.currentTurn
    ? gameState.teams[gameState.currentTurn.currentTeamId]
    : null;

  const currentQuestion = gameState.currentTurn?.selectedQuestionId
    ? gameState.questions.find((q) => q.id === gameState.currentTurn!.selectedQuestionId)
    : null;

  const currentExplosionRate = gameState.currentTurn
    ? getExplosionRate(
      gameState.currentTurn.drawCount + 1,
      gameState.teams[gameState.currentTurn.currentTeamId].explosionModifier
    )
    : null;

  // Start new turn
  const startNewTurn = useCallback((teamId: TeamId) => {
    setGameState((prev) => ({
      ...prev,
      currentTurn: {
        currentTeamId: teamId,
        selectedQuestionId: null,
        questionAnsweredCorrectly: null,
        turnPoints: 0,
        drawCount: 0,
        drawnCards: [],
        isBackupMode: false,
        backupAnswered: null,
        turnEnded: false,
        turnResult: null,
      },
    }));
  }, []);

  // Select question
  const selectQuestion = useCallback((questionId: string) => {
    setGameState((prev) => {
      if (!prev.currentTurn) return prev;
      return {
        ...prev,
        currentTurn: {
          ...prev.currentTurn,
          selectedQuestionId: questionId,
        },
      };
    });
    setShowQuestionModal(true);
  }, []);

  // Handle question answer
  const handleQuestionAnswer = useCallback((correct: boolean) => {
    setShowQuestionModal(false);

    if (correct) {
      const initialPoints = getRandomInitialPoints();
      setGameState((prev) => {
        if (!prev.currentTurn) return prev;
        return {
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === prev.currentTurn!.selectedQuestionId ? { ...q, used: true } : q
          ),
          currentTurn: {
            ...prev.currentTurn,
            questionAnsweredCorrectly: true,
            turnPoints: initialPoints,
          },
        };
      });
      setResultMessage({
        title: '✅ Chính xác!',
        message: `Bạn nhận được ${initialPoints} điểm khởi đầu. Dừng để bảo toàn hoặc tiếp tục rút thẻ?`,
        isSuccess: true,
      });
    } else {
      setGameState((prev) => {
        if (!prev.currentTurn) return prev;
        return {
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === prev.currentTurn!.selectedQuestionId ? { ...q, used: true } : q
          ),
          currentTurn: {
            ...prev.currentTurn,
            questionAnsweredCorrectly: false,
            turnEnded: true,
            turnResult: 'STOPPED',
          },
        };
      });
      setResultMessage({
        title: '❌ Sai rồi!',
        message: 'Không nhận được điểm. Lượt chơi kết thúc.',
        isSuccess: false,
      });
    }
    setShowResultModal(true);
  }, []);

  // Draw card
  const handleDrawCard = useCallback(() => {
    if (!gameState.currentTurn || !currentExplosionRate) return;

    const card = drawCard(currentExplosionRate.explosion);
    setLastDrawnCard(card);
    setShowCardAnimation(true);
  }, [gameState.currentTurn, currentExplosionRate]);

  // Process drawn card after animation
  const processDrawnCard = useCallback(() => {
    setShowCardAnimation(false);
    if (!lastDrawnCard || !gameState.currentTurn) return;

    if (lastDrawnCard.type === 'EXPLOSION') {
      // Check for backup opportunity
      const pointsBeforeExplosion = gameState.currentTurn.turnPoints;
      if (pointsBeforeExplosion >= 16) {
        // Lưu điểm trước khi nổ vào state để dùng khi backup
        setGameState((prev) => {
          if (!prev.currentTurn) return prev;
          return {
            ...prev,
            currentTurn: {
              ...prev.currentTurn,
              isBackupMode: true,
              turnPoints: pointsBeforeExplosion, // Giữ điểm để tính 50% khi backup
            },
          };
        });
        setBackupQuestion(getRandomBackupQuestion());
        setShowBackupQuestion(true);
      } else {
        // Exploded without backup
        setGameState((prev) => {
          if (!prev.currentTurn) return prev;
          const modifier = getModifierForNextTurn(0);
          return {
            ...prev,
            teams: {
              ...prev.teams,
              [prev.currentTurn.currentTeamId]: {
                ...prev.teams[prev.currentTurn.currentTeamId],
                explosionModifier: modifier,
              },
            },
            currentTurn: {
              ...prev.currentTurn,
              drawnCards: [...prev.currentTurn.drawnCards, lastDrawnCard],
              turnPoints: 0,
              turnEnded: true,
              turnResult: 'EXPLODED',
            },
            turnHistory: [
              ...prev.turnHistory,
              {
                teamId: prev.currentTurn.currentTeamId,
                questionId: prev.currentTurn.selectedQuestionId!,
                earnedPoints: 0,
                drawCount: prev.currentTurn.drawCount + 1,
                result: 'EXPLODED',
              },
            ],
          };
        });
        setResultMessage({
          title: '💣 NỔ!',
          message: 'Mất toàn bộ điểm của lượt này!',
          isSuccess: false,
        });
        setShowResultModal(true);
      }
    } else {
      // Got points
      setGameState((prev) => {
        if (!prev.currentTurn) return prev;
        const newPoints = prev.currentTurn.turnPoints + (lastDrawnCard.points || 0);
        return {
          ...prev,
          currentTurn: {
            ...prev.currentTurn,
            drawnCards: [...prev.currentTurn.drawnCards, lastDrawnCard],
            turnPoints: newPoints,
            drawCount: prev.currentTurn.drawCount + 1,
          },
        };
      });
      setResultMessage({
        title: `⭐ +${lastDrawnCard.points} điểm!`,
        message: 'Tiếp tục rút hay dừng để bảo toàn?',
        isSuccess: true,
      });
      setShowResultModal(true);
    }
    setLastDrawnCard(null);
  }, [lastDrawnCard, gameState.currentTurn]);

  // Handle backup answer
  const handleBackupAnswer = useCallback(
    (correct: boolean) => {
      setShowBackupQuestion(false);

      if (correct) {
        // Điểm trước khi nổ đã được lưu trong turnPoints khi vào backup mode
        const pointsBeforeExplosion = gameState.currentTurn!.turnPoints;
        const keptPoints = Math.floor(pointsBeforeExplosion / 2);
        setGameState((prev) => {
          if (!prev.currentTurn) return prev;
          const modifier = getModifierForNextTurn(keptPoints);
          return {
            ...prev,
            teams: {
              ...prev.teams,
              [prev.currentTurn.currentTeamId]: {
                ...prev.teams[prev.currentTurn.currentTeamId],
                totalScore:
                  prev.teams[prev.currentTurn.currentTeamId].totalScore + keptPoints,
                explosionModifier: modifier,
              },
            },
            currentTurn: {
              ...prev.currentTurn,
              turnPoints: 0, // Đã nổ nên điểm lượt = 0, nhưng giữ được keptPoints vào totalScore
              turnEnded: true,
              turnResult: 'BACKUP_SUCCESS',
            },
            turnHistory: [
              ...prev.turnHistory,
              {
                teamId: prev.currentTurn.currentTeamId,
                questionId: prev.currentTurn.selectedQuestionId!,
                earnedPoints: keptPoints,
                drawCount: prev.currentTurn.drawCount + 1,
                result: 'BACKUP_SUCCESS',
              },
            ],
          };
        });
        setResultMessage({
          title: '🛟 Cứu thành công!',
          message: `Giữ được ${keptPoints} điểm (50%)`,
          isSuccess: true,
        });
      } else {
        setGameState((prev) => {
          if (!prev.currentTurn) return prev;
          const modifier = getModifierForNextTurn(0);
          return {
            ...prev,
            teams: {
              ...prev.teams,
              [prev.currentTurn.currentTeamId]: {
                ...prev.teams[prev.currentTurn.currentTeamId],
                explosionModifier: modifier,
              },
            },
            currentTurn: {
              ...prev.currentTurn,
              turnPoints: 0,
              turnEnded: true,
              turnResult: 'BACKUP_FAILED',
            },
            turnHistory: [
              ...prev.turnHistory,
              {
                teamId: prev.currentTurn.currentTeamId,
                questionId: prev.currentTurn.selectedQuestionId!,
                earnedPoints: 0,
                drawCount: prev.currentTurn.drawCount + 1,
                result: 'BACKUP_FAILED',
              },
            ],
          };
        });
        setResultMessage({
          title: '❌ Không cứu được!',
          message: 'Mất toàn bộ điểm của lượt này.',
          isSuccess: false,
        });
      }
      setShowResultModal(true);
    },
    [gameState.currentTurn]
  );

  // Stop and keep points
  const handleStopTurn = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentTurn) return prev;
      const earnedPoints = prev.currentTurn.turnPoints;
      const newTotal =
        prev.teams[prev.currentTurn.currentTeamId].totalScore + earnedPoints;
      const modifier = getModifierForNextTurn(earnedPoints);

      // Check for prize
      let newPrizeCount = prev.prizeCount;
      let hasWonPrize = prev.teams[prev.currentTurn.currentTeamId].hasWonPrize;
      if (newTotal >= WIN_THRESHOLD && !hasWonPrize && newPrizeCount > 0) {
        newPrizeCount--;
        hasWonPrize = true;
      }

      return {
        ...prev,
        prizeCount: newPrizeCount,
        teams: {
          ...prev.teams,
          [prev.currentTurn.currentTeamId]: {
            ...prev.teams[prev.currentTurn.currentTeamId],
            totalScore: newTotal,
            explosionModifier: modifier,
            hasWonPrize,
          },
        },
        currentTurn: {
          ...prev.currentTurn,
          turnEnded: true,
          turnResult: 'STOPPED',
        },
        turnHistory: [
          ...prev.turnHistory,
          {
            teamId: prev.currentTurn.currentTeamId,
            questionId: prev.currentTurn.selectedQuestionId!,
            earnedPoints,
            drawCount: prev.currentTurn.drawCount,
            result: 'STOPPED',
          },
        ],
        gameEnded: newPrizeCount === 0,
      };
    });

    // Show result modal after stopping
    const earnedPoints = gameState.currentTurn?.turnPoints || 0;
    if (earnedPoints > 0) {
      setResultMessage({
        title: `🎉 ĐỘI ${gameState.currentTurn?.currentTeamId} DỪNG LẠI!`,
        message: `Đã giữ được ${earnedPoints} điểm lượt này!`,
        isSuccess: true,
      });
    } else {
      setResultMessage({
        title: '📝 Kết thúc lượt',
        message: `Đội ${gameState.currentTurn?.currentTeamId} kết thúc lượt chơi.`,
        isSuccess: true,
      });
    }
    setShowResultModal(true);
  }, [gameState.currentTurn]);

  // End turn and move to next team
  const endTurnAndContinue = useCallback(() => {
    setShowResultModal(false);

    if (gameState.gameEnded) return;

    // Find next team
    const currentIdx = teamOrder.indexOf(gameState.currentTurn!.currentTeamId);
    const nextIdx = (currentIdx + 1) % teamOrder.length;
    const nextTeamId = teamOrder[nextIdx];

    startNewTurn(nextTeamId);
  }, [gameState.currentTurn, gameState.gameEnded, startNewTurn]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({
      teams: initializeTeams(),
      questions: initializeQuestions(),
      currentTurn: null,
      prizeCount: INITIAL_PRIZE_COUNT,
      turnHistory: [],
      gameEnded: false,
      winner: null,
    });
    setShowInstructions(true);
  }, []);

  // Check for game end
  useEffect(() => {
    if (gameState.prizeCount === 0) {
      setGameState((prev) => ({ ...prev, gameEnded: true }));
    }
  }, [gameState.prizeCount]);

  // Render question based on type
  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.question.type) {
      case 'GHEP_CAU':
        return (
          <MatchingQuestionComponent
            question={currentQuestion.question}
            onAnswer={handleQuestionAnswer}
          />
        );
      case 'TRA_LOI':
        return (
          <MultipleChoiceQuestionComponent
            question={currentQuestion.question}
            onAnswer={handleQuestionAnswer}
          />
        );
      case 'MO_PHONG':
        return (
          <PathQuestionComponent
            question={currentQuestion.question}
            onAnswer={handleQuestionAnswer}
          />
        );
      case 'GHEP_HINH':
        return (
          <ImageMatchQuestionComponent
            question={currentQuestion.question}
            onAnswer={handleQuestionAnswer}
          />
        );
      default:
        return null;
    }
  };

  // Instructions screen
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-6 text-white text-center">
              <div className="text-6xl mb-4">🐱💣</div>
              <h1 className="text-4xl font-bold mb-2">MÈO NỔ</h1>
              <p className="text-xl opacity-90">Hành Trình Tư Tưởng Hồ Chí Minh</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Objective */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">🎯 Mục tiêu</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Kiểm tra hiểu biết về tư tưởng Hồ Chí Minh</li>
                  <li>• Rèn đạo đức "biết đủ, biết dừng"</li>
                  <li>• Nhóm đạt 20 điểm trước được chọn quà</li>
                </ul>
              </div>

              {/* Rules */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-bold text-blue-800 mb-2">📋 Luật chơi</h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Chọn 1 câu hỏi (A-Z)</li>
                    <li>Trả lời đúng → nhận 1-5 điểm</li>
                    <li>Chọn DỪNG hoặc ĐI TIẾP</li>
                    <li>Đi tiếp → Rút thẻ Mèo Nổ</li>
                  </ol>
                </div>

                <div className="bg-red-50 p-4 rounded-xl">
                  <h4 className="font-bold text-red-800 mb-2">🎴 Thẻ Mèo Nổ</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>⭐ Thẻ Điểm: +1 đến +5</li>
                    <li>💣 Thẻ Nổ: Mất hết điểm lượt</li>
                    <li>⚠️ Rút càng nhiều, nổ càng cao!</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-bold text-green-800 mb-2">🛟 Cơ hội Backup</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>≥16 điểm mà nổ → được backup</li>
                    <li>Đúng: giữ 50% điểm</li>
                    <li>Sai: mất hết</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  <h4 className="font-bold text-purple-800 mb-2">📊 Tỷ lệ nổ</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Lần 1: 15% | Lần 2: 30%</li>
                    <li>Lần 3: 50% | Lần 4: 70%</li>
                    <li>Lần 5: 85% (gần như chắc nổ!)</li>
                  </ul>
                </div>
              </div>

              {/* Question types */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-3">📚 4 Loại câu hỏi</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl mb-1">🔗</div>
                    <p className="text-xs font-medium">Ghép câu</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl mb-1">❓</div>
                    <p className="text-xs font-medium">Trả lời 3 câu</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl mb-1">🛤️</div>
                    <p className="text-xs font-medium">Đường Bác đi</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl mb-1">🖼️</div>
                    <p className="text-xs font-medium">Ghép hình</p>
                  </div>
                </div>
              </div>

              {/* Start button */}
              <button
                onClick={() => {
                  setShowInstructions(false);
                  startNewTurn('A');
                }}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-xl font-bold text-xl hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <Play className="w-6 h-6" />
                Bắt đầu chơi!
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Game ended screen
  if (gameState.gameEnded) {
    const sortedTeams = Object.values(gameState.teams).sort(
      (a, b) => b.totalScore - a.totalScore
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400"
          >
            <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-6 text-white text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold">Kết thúc trò chơi!</h1>
              <p className="opacity-90">Đã hết quà</p>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="font-bold text-xl text-gray-800 text-center mb-4">
                🏆 Bảng xếp hạng
              </h3>

              {sortedTeams.map((team, idx) => (
                <div
                  key={team.id}
                  className={`flex items-center gap-4 p-4 rounded-xl ${idx === 0 ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50'
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${idx === 0
                        ? 'bg-yellow-500'
                        : idx === 1
                          ? 'bg-gray-400'
                          : idx === 2
                            ? 'bg-orange-400'
                            : 'bg-gray-300'
                      }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{team.name}</p>
                    <p className="text-sm text-gray-600">{team.totalScore} điểm</p>
                  </div>
                  {team.hasWonPrize && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      🎁 Đã nhận quà
                    </span>
                  )}
                </div>
              ))}

              <button
                onClick={resetGame}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-6"
              >
                <RotateCcw className="w-5 h-5" />
                Chơi lại
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main game UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐱💣</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mèo Nổ</h1>
              <p className="text-sm text-gray-600">Hành Trình Tư Tưởng HCM</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg border border-yellow-300">
              <Gift className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-gray-800">{gameState.prizeCount} quà</span>
            </div>
            <button
              onClick={resetGame}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Reset game"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Team scores */}
        <div className="grid grid-cols-4 gap-3">
          {teamOrder.map((teamId) => {
            const team = gameState.teams[teamId];
            const isCurrentTeam = gameState.currentTurn?.currentTeamId === teamId;

            return (
              <motion.div
                key={teamId}
                animate={{ scale: isCurrentTeam ? 1.02 : 1 }}
                className={`p-4 rounded-xl border-2 transition-all ${isCurrentTeam
                    ? `${TEAM_BG_COLORS[teamId]} ring-2 ring-offset-2 ring-yellow-400`
                    : 'bg-white border-gray-200'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-800">{team.name}</span>
                  {isCurrentTeam && (
                    <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">
                      Đang chơi
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-gray-900">{team.totalScore}</p>
                {team.hasWonPrize && (
                  <span className="text-xs text-green-600">🎁 Đã nhận quà</span>
                )}
                {team.explosionModifier > 0 && (
                  <span className="text-xs text-red-600 block">
                    ⚠️ +{team.explosionModifier}% nổ
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Current turn info */}
        {gameState.currentTurn && currentTeam && (
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Lượt của {currentTeam.name}
              </h2>

              {gameState.currentTurn.questionAnsweredCorrectly && (
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Điểm lượt này</p>
                    <p className="text-3xl font-bold text-green-600">
                      {gameState.currentTurn.turnPoints}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Đã rút</p>
                    <p className="text-xl font-bold text-gray-800">
                      {gameState.currentTurn.drawCount}/{MAX_DRAWS}
                    </p>
                  </div>
                  {currentExplosionRate && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Tỷ lệ nổ tiếp</p>
                      <p className="text-xl font-bold text-red-600">
                        {currentExplosionRate.explosion}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Phase: Select question */}
            {!gameState.currentTurn.selectedQuestionId && (
              <div>
                <p className="text-gray-600 mb-4">Chọn một câu hỏi:</p>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2">
                  {gameState.questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => !q.used && selectQuestion(q.id)}
                      disabled={q.used}
                      className={`aspect-square rounded-lg font-bold text-lg transition-all ${q.used
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-br from-red-600 to-orange-500 text-white hover:shadow-lg hover:scale-105 drop-shadow-md'
                        }`}
                    >
                      {q.letter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Phase: Answered correctly, choose to draw or stop */}
            {gameState.currentTurn.questionAnsweredCorrectly &&
              !gameState.currentTurn.turnEnded && (
                <div className="flex justify-center gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStopTurn}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Hand className="w-5 h-5" />
                    DỪNG ({gameState.currentTurn.turnPoints} điểm)
                  </motion.button>

                  {gameState.currentTurn.drawCount < MAX_DRAWS && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDrawCard}
                      className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <Bomb className="w-5 h-5" />
                      RÚT THẺ ({currentExplosionRate?.explosion}% nổ)
                    </motion.button>
                  )}
                </div>
              )}

            {/* Drawn cards history */}
            {gameState.currentTurn.drawnCards.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Thẻ đã rút:</p>
                <div className="flex gap-2 flex-wrap">
                  {gameState.currentTurn.drawnCards.map((card, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${card.type === 'EXPLOSION'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                        }`}
                    >
                      {card.type === 'EXPLOSION' ? '💣 Nổ' : `⭐ +${card.points}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Question Modal */}
      <AnimatePresence>
        {showQuestionModal && currentQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-sm text-gray-500">Câu {currentQuestion.letter}</span>
                  <h2 className="text-xl font-bold text-gray-800">
                    {currentQuestion.question.title}
                  </h2>
                </div>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                  {currentQuestion.question.type === 'GHEP_CAU' && '🔗 Ghép câu'}
                  {currentQuestion.question.type === 'TRA_LOI' && '❓ Trả lời'}
                  {currentQuestion.question.type === 'MO_PHONG' && '🛤️ Mô phỏng'}
                  {currentQuestion.question.type === 'GHEP_HINH' && '🖼️ Ghép hình'}
                </span>
              </div>

              {renderQuestion()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Draw Animation */}
      <AnimatePresence>
        {showCardAnimation && lastDrawnCard && (
          <CardDrawAnimation card={lastDrawnCard} onComplete={processDrawnCard} />
        )}
      </AnimatePresence>

      {/* Backup Question Modal */}
      <AnimatePresence>
        {showBackupQuestion && backupQuestion && (
          <BackupQuestionModal question={backupQuestion} onAnswer={handleBackupAnswer} />
        )}
      </AnimatePresence>

      {/* Result Modal */}
      <AnimatePresence>
        {showResultModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`rounded-2xl p-8 max-w-md w-full text-center ${resultMessage.isSuccess
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400'
                  : 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400'
                }`}
            >
              <div className="text-5xl mb-4">
                {resultMessage.isSuccess ? '🎉' : '😢'}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {resultMessage.title}
              </h3>
              <p className="text-gray-600 mb-6">{resultMessage.message}</p>

              {gameState.currentTurn?.turnEnded ? (
                <button
                  onClick={endTurnAndContinue}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Tiếp tục → Nhóm tiếp theo
                </button>
              ) : (
                <button
                  onClick={() => setShowResultModal(false)}
                  className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Đóng
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiniGamePage;
