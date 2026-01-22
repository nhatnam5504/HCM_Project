import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ship,
  MapPin,
  ChevronRight,
  RotateCcw,
  Gift,
  Check,
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  Home,
} from 'lucide-react';
import {
  gameStages,
  rewards,
  getRandomScenario,
  getRandomReward,
  GameStage,
  Scenario,
  Reward,
  Option,
  Category,
  OrderItem,
  MatchPair,
  BalanceWeight,
} from '../../data/journeyGameData';

// ==================== GAME STATES ====================
type GamePhase = 'intro' | 'stage-intro' | 'playing' | 'stage-complete' | 'reward' | 'complete';

type GameState = {
  phase: GamePhase;
  currentStageIndex: number;
  currentScenario: Scenario | null;
  completedStages: string[];
  score: number;
  earnedReward: Reward | null;
};

// ==================== MAIN COMPONENT ====================
const JourneyGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'intro',
    currentStageIndex: 0,
    currentScenario: null,
    completedStages: [],
    score: 0,
    earnedReward: null,
  });

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  // State for different game types
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [categorizedItems, setCategorizedItems] = useState<Record<string, string[]>>({});
  const [orderedItems, setOrderedItems] = useState<{ id: number; text: string }[]>([]);
  const [fillBlanks, setFillBlanks] = useState<Record<string, string>>({});
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedCategorizeItem, setSelectedCategorizeItem] = useState<string | null>(null);
  const [balanceWeights, setBalanceWeights] = useState<string[]>([]); // IDs of weights placed on scale
  const [timeLeft, setTimeLeft] = useState<number>(60); // Timer for balance game (60 seconds)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const currentStage = gameStages[gameState.currentStageIndex];

  // Format time helper function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer UI Component for ALL games
  const renderGameTimer = (gameMessage: string) => {
    if (showMessage) return null;
    return (
      <div className="relative mb-6">
        <div className={`flex items-center justify-between p-4 rounded-2xl shadow-lg ${
          timeLeft <= 10 
            ? 'bg-red-600 animate-pulse' 
            : timeLeft <= 30 
            ? 'bg-orange-500' 
            : 'bg-gradient-to-r from-green-600 to-green-500'
        }`}>
          <div className="flex items-center gap-3 text-white">
            <span className="text-3xl">⏱️</span>
            <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-white text-sm font-medium">
            {timeLeft <= 10 ? '⚠️ Sắp hết giờ!' : timeLeft <= 30 ? '🏃 Nhanh lên!' : gameMessage}
          </div>
        </div>
        {/* Timer progress bar */}
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2 overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / 60) * 100}%` }}
            transition={{ duration: 0.5 }}
            className={`h-2 rounded-full ${
              timeLeft <= 10 ? 'bg-red-500' : timeLeft <= 30 ? 'bg-orange-400' : 'bg-green-400'
            }`}
          />
        </div>
      </div>
    );
  };

  // Reset game state for new scenario
  const resetScenarioState = useCallback(() => {
    setSelectedOption(null);
    setCategorizedItems({});
    setOrderedItems([]);
    setFillBlanks({});
    setMatchedPairs({});
    setSelectedLeft(null);
    setSelectedCategorizeItem(null);
    setBalanceWeights([]);
    setTimeLeft(60);
    setIsTimerRunning(false);
    setIsCorrect(null);
    setShowMessage(false);
  }, []);

  // Initialize ordering items when scenario changes
  useEffect(() => {
    if (gameState.currentScenario?.type === 'ordering' && gameState.currentScenario.orderItems) {
      const shuffled = [...gameState.currentScenario.orderItems].sort(() => Math.random() - 0.5);
      setOrderedItems(shuffled);
    }
    // Start timer for ALL games when playing phase begins
    if (gameState.phase === 'playing' && gameState.currentScenario) {
      setTimeLeft(60);
      setIsTimerRunning(true);
    }
  }, [gameState.currentScenario, gameState.phase]);

  // Timer countdown for ALL games
  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0 || showMessage) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          // Time's up - auto check answer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, showMessage]);

  // Auto-submit when time runs out for ALL games
  useEffect(() => {
    if (timeLeft === 0 && isTimerRunning === false && gameState.currentScenario && !showMessage) {
      // Trigger answer check for any game type
      checkAnswerRef.current?.();
    }
  }, [timeLeft, isTimerRunning, gameState.currentScenario, showMessage]);

  // Ref for checkAnswer function to use in timer
  const checkAnswerRef = React.useRef<(() => void) | null>(null);

  // Get game rules based on type
  const getGameRules = (type: string) => {
    const rules: Record<string, { name: string; icon: string; instruction: string; tips: string[] }> = {
      'multiple-choice': {
        name: 'Trắc nghiệm',
        icon: '📝',
        instruction: 'Chọn một đáp án đúng trong các lựa chọn.',
        tips: ['Đọc kỹ câu hỏi', 'Loại trừ các đáp án sai', 'Chọn đáp án phù hợp nhất']
      },
      'categorize': {
        name: 'Phân loại',
        icon: '🗂️',
        instruction: 'KÉO THẢ thẻ vào cột phân loại, hoặc NHẤN CHỌN thẻ rồi NHẤN vào cột.',
        tips: ['Có thể kéo thả trực tiếp', 'Nhấn vào thẻ đã phân loại để bỏ ra', 'Mỗi thẻ chỉ thuộc một nhóm']
      },
      'ordering': {
        name: 'Sắp xếp',
        icon: '🔢',
        instruction: 'Sử dụng nút ▲▼ để sắp xếp các mục theo thứ tự đúng.',
        tips: ['Chú ý mốc thời gian', 'Sắp xếp từ đầu đến cuối', 'Đọc kỹ nội dung từng mục']
      },
      'fill-blank': {
        name: 'Điền từ',
        icon: '✏️',
        instruction: 'Điền từ thích hợp vào các ô trống.',
        tips: ['Chú ý ngữ cảnh câu văn', 'Viết đúng chính tả', 'Một số từ có gợi ý sẵn']
      },
      'matching': {
        name: 'Ghép đôi',
        icon: '🔗',
        instruction: 'Nhấn chọn mục bên trái, sau đó nhấn mục tương ứng bên phải.',
        tips: ['Mỗi mục bên trái chỉ ghép với một mục bên phải', 'Có thể bỏ ghép bằng cách nhấn lại', 'Đọc kỹ nội dung']
      },
      'balance': {
        name: 'Cân bằng',
        icon: '⚖️',
        instruction: 'Chọn các quả cân đúng để đặt lên cán cân. Cẩn thận với các lựa chọn sai!',
        tips: ['Không phải tất cả quả cân đều đúng', 'Chỉ chọn những quả cân phù hợp', 'Quả cân sai sẽ làm mất điểm']
      }
    };
    return rules[type] || rules['multiple-choice'];
  };

  // Start the game
  const startGame = () => {
    const scenario = getRandomScenario(gameStages[0]);
    setGameState({
      phase: 'stage-intro',
      currentStageIndex: 0,
      currentScenario: scenario,
      completedStages: [],
      score: 0,
      earnedReward: null,
    });
    resetScenarioState();
  };

  // Move to playing phase
  const startPlaying = () => {
    setGameState(prev => ({ ...prev, phase: 'playing' }));
  };

  // Check answer and show message
  const checkAnswer = () => {
    if (!gameState.currentScenario) return;

    let correct = false;
    const scenario = gameState.currentScenario;

    switch (scenario.type) {
      case 'multiple-choice':
        const correctOption = scenario.options?.find((o: Option) => o.isCorrect);
        correct = selectedOption === correctOption?.id;
        break;

      case 'categorize':
        if (scenario.categories) {
          correct = scenario.categories.every((cat: Category) => {
            const userItems = categorizedItems[cat.id] || [];
            return cat.items.every((item: string) => userItems.includes(item)) && 
                   userItems.length === cat.items.length;
          });
        }
        break;

      case 'ordering':
        if (scenario.orderItems) {
          correct = orderedItems.every((item: { id: number; text: string }, index: number) => 
            item.id === scenario.orderItems![index].id && 
            scenario.orderItems![index].correctOrder === index + 1
          );
        }
        break;

      case 'fill-blank':
        if (scenario.fillBlanks) {
          correct = scenario.fillBlanks.blanks.every((blank: { id: string; answer: string }) => 
            fillBlanks[blank.id]?.toLowerCase().trim() === blank.answer.toLowerCase()
          );
        }
        break;

      case 'matching':
        if (scenario.matchPairs) {
          correct = scenario.matchPairs.every((pair: MatchPair) => 
            matchedPairs[pair.left] === pair.right
          );
        }
        break;

      case 'balance':
        if (scenario.balanceGame) {
          // Check if all CORRECT weights are placed AND no WRONG weights are placed
          const correctWeights = scenario.balanceGame.weights.filter(w => w.isCorrect === true);
          const wrongWeights = scenario.balanceGame.weights.filter(w => w.isCorrect === false);
          
          const allCorrectPlaced = correctWeights.every(w => balanceWeights.includes(w.id));
          const noWrongPlaced = !wrongWeights.some(w => balanceWeights.includes(w.id));
          
          correct = allCorrectPlaced && noWrongPlaced && balanceWeights.length === correctWeights.length;
        }
        break;
    }

    setIsCorrect(correct);
    setShowMessage(true);
    setIsTimerRunning(false); // Stop timer when answer is checked
    
    if (correct) {
      setGameState(prev => ({ ...prev, score: prev.score + 20 }));
    }
  };

  // Assign checkAnswer to ref for timer auto-submit
  checkAnswerRef.current = checkAnswer;

  // Move to next stage
  const nextStage = () => {
    resetScenarioState();

    if (gameState.currentStageIndex < gameStages.length - 1) {
      const nextIndex = gameState.currentStageIndex + 1;
      const scenario = getRandomScenario(gameStages[nextIndex]);
      setGameState(prev => ({
        ...prev,
        phase: 'stage-intro',
        currentStageIndex: nextIndex,
        currentScenario: scenario,
        completedStages: [...prev.completedStages, currentStage.id],
      }));
    } else {
      // Game complete - show reward
      const reward = getRandomReward();
      setGameState(prev => ({
        ...prev,
        phase: 'reward',
        completedStages: [...prev.completedStages, currentStage.id],
        earnedReward: reward,
      }));
    }
  };

  // Restart game
  const restartGame = () => {
    resetScenarioState();
    setGameState({
      phase: 'intro',
      currentStageIndex: 0,
      currentScenario: null,
      completedStages: [],
      score: 0,
      earnedReward: null,
    });
  };

  // Handle drag and drop for categorize
  const handleCategorize = (item: string, categoryId: string) => {
    setCategorizedItems(prev => {
      const newItems = { ...prev };
      // Remove item from other categories
      Object.keys(newItems).forEach(key => {
        newItems[key] = newItems[key].filter(i => i !== item);
      });
      // Add to new category
      if (!newItems[categoryId]) {
        newItems[categoryId] = [];
      }
      newItems[categoryId] = [...newItems[categoryId], item];
      return newItems;
    });
  };

  // Handle ordering
  const moveItem = (fromIndex: number, toIndex: number) => {
    setOrderedItems(prev => {
      const newItems = [...prev];
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
      return newItems;
    });
  };

  // Handle matching
  const handleMatch = (left: string, right: string) => {
    setMatchedPairs(prev => ({ ...prev, [left]: right }));
    setSelectedLeft(null);
  };

  // ==================== RENDER FUNCTIONS ====================

  // Intro Screen
  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #8B0000 0%, #B22222 30%, #DC143C 50%, #B22222 70%, #8B0000 100%)' }}
    >
      {/* Vietnamese Star Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large central star glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-3xl" />
        
        {/* Floating stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/20"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 30}%`,
              fontSize: `${20 + Math.random() * 30}px`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ★
          </motion.div>
        ))}
        
        {/* Decorative borders */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      </div>

      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        {/* Main Star Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 rounded-full scale-150" />
            <div className="relative w-36 h-36 flex items-center justify-center">
              <span className="text-8xl text-yellow-400 drop-shadow-2xl">★</span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-wide"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          THEO DẤU CHÂN BÁC
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400" />
          <span className="text-yellow-400 text-lg font-medium tracking-[0.3em]">1911 — 1941</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400" />
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-yellow-300 font-medium mb-8"
        >
          Hành trình – Trải nghiệm – Chiêm nghiệm
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-2xl mx-auto mb-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30"
        >
          <p className="text-lg text-white/90 italic leading-relaxed">
            "Mỗi chặng đường Bác đi qua đều để lại những bài học quý giá về tư duy, lao động và lối sống. 
            Hãy bước vào hành trình này không phải để thi đố, mà để cùng suy ngẫm và lựa chọn cách ứng xử của riêng bạn."
          </p>
        </motion.div>

        {/* Stage Preview - Horizontal Journey Line */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center">
            {gameStages.map((stage: GameStage, index: number) => (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-2xl shadow-lg">
                    {stage.flag}
                  </div>
                  <span className="text-white/80 text-xs mt-2 font-medium">{stage.countryVi}</span>
                </div>
                {index < gameStages.length - 1 && (
                  <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-400/50 mx-1" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="px-10 py-4 bg-yellow-400 text-red-900 font-bold text-xl rounded-full shadow-xl hover:bg-yellow-300 transition-all border-4 border-yellow-300"
        >
          <span className="flex items-center gap-3">
            <Ship className="w-6 h-6" />
            BẮT ĐẦU HÀNH TRÌNH
          </span>
        </motion.button>

        {/* Credits */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-white/50 text-sm"
        >
          Nhóm thực hiện: Nhật Nam • Thành Tâm • Thanh Trường • Anh Thư
        </motion.p>
      </div>
    </motion.div>
  );

  // Stage Intro Screen
  const renderStageIntro = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #8B0000 0%, #B22222 50%, #8B0000 100%)' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20" />
        {/* Star pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="text-yellow-400/10 text-[400px]"
          >
            ★
          </motion.div>
        </div>
        {/* Top and bottom borders */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Progress */}
        <div className="absolute top-8 left-0 right-0 px-4">
          <div className="flex justify-center gap-3 mb-4">
            {gameStages.map((stage: GameStage, index: number) => (
              <div
                key={stage.id}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all ${
                  index < gameState.currentStageIndex
                    ? 'bg-yellow-400 border-yellow-300 text-red-900'
                    : index === gameState.currentStageIndex
                    ? 'bg-yellow-400 border-yellow-300 ring-4 ring-yellow-400/50'
                    : 'bg-white/10 border-white/30'
                }`}
              >
                {index < gameState.currentStageIndex ? (
                  <Check className="w-6 h-6" />
                ) : (
                  stage.flag
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stage Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.div 
            className="text-8xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentStage.flag}
          </motion.div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-yellow-400" />
            <span className="text-yellow-400 text-lg font-bold tracking-[0.2em]">
              CHẶNG {gameState.currentStageIndex + 1}
            </span>
            <div className="h-px w-12 bg-yellow-400" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {currentStage.countryVi.toUpperCase()}
          </h2>
          <p className="text-2xl text-yellow-200 mb-6">{currentStage.period}</p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="bg-yellow-400/20 backdrop-blur-sm px-8 py-4 rounded-xl border border-yellow-400/50">
              <span className="text-4xl mr-4">{currentStage.symbol}</span>
              <span className="text-white text-xl font-medium">{currentStage.symbolName}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full inline-block mb-6">
            <p className="text-lg text-yellow-300 font-medium">
              📖 Chủ đề: {currentStage.themeVi}
            </p>
          </div>

          {/* Game Rules Info Box */}
          {gameState.currentScenario && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-xl mx-auto border-2 border-yellow-400/50"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-3xl">{getGameRules(gameState.currentScenario.type).icon}</span>
                <h3 className="text-2xl font-bold text-yellow-400">
                  THỂ LOẠI: {getGameRules(gameState.currentScenario.type).name.toUpperCase()}
                </h3>
              </div>
              
              {/* Timer Warning */}
              <div className="flex items-center justify-center gap-3 mb-4 bg-yellow-400/20 rounded-xl p-3">
                <span className="text-2xl">⏱️</span>
                <span className="text-white text-lg font-bold">Thời gian: 60 GIÂY</span>
              </div>
              
              {/* Game Instruction */}
              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <p className="text-lg text-white font-medium">
                  📋 <strong>Cách chơi:</strong> {getGameRules(gameState.currentScenario.type).instruction}
                </p>
              </div>
              
              {/* Tips */}
              <div className="space-y-2">
                <p className="text-yellow-400 font-bold text-sm">💡 MẸO:</p>
                <ul className="text-white/90 text-sm space-y-1">
                  {getGameRules(gameState.currentScenario.type).tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startPlaying}
            className="px-10 py-4 bg-yellow-400 text-red-900 font-bold text-xl rounded-full shadow-xl hover:bg-yellow-300 transition-all border-4 border-yellow-300"
          >
            <span className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              BẮT ĐẦU NGAY!
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );

  // Multiple Choice Game
  const renderMultipleChoice = () => {
    const scenario = gameState.currentScenario!;
    return (
      <div className="space-y-6">
        {/* Timer */}
        {renderGameTimer('📝 Chọn đáp án đúng!')}
        
        {/* Question Card */}
        <div className="bg-gradient-to-r from-red-800 to-red-700 p-6 rounded-2xl border-l-4 border-yellow-400 shadow-xl">
          <div className="flex items-start gap-4">
            <span className="text-4xl">❓</span>
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">{scenario.question}</p>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {scenario.options?.map((option: Option, index: number) => {
            const isSelected = selectedOption === option.id;
            const isCorrectAnswer = option.isCorrect;
            const optionLabels = ['A', 'B', 'C', 'D', 'E'];
            
            // Determine styling based on state
            let bgColor = 'bg-white';
            let borderColor = 'border-gray-300';
            let textColor = 'text-gray-800';
            let labelBg = 'bg-gradient-to-br from-red-600 to-red-700';
            let labelText = 'text-white';
            let shadow = 'shadow-md';
            let ring = '';
            
            if (showMessage) {
              if (isCorrectAnswer) {
                bgColor = 'bg-green-50';
                borderColor = 'border-green-500';
                textColor = 'text-green-800';
                labelBg = 'bg-green-500';
                shadow = 'shadow-lg shadow-green-200';
                ring = 'ring-2 ring-green-400';
              } else if (isSelected && !isCorrectAnswer) {
                bgColor = 'bg-red-50';
                borderColor = 'border-red-500';
                textColor = 'text-red-800';
                labelBg = 'bg-red-500';
                shadow = 'shadow-lg shadow-red-200';
                ring = 'ring-2 ring-red-400';
              } else {
                bgColor = 'bg-gray-100';
                borderColor = 'border-gray-300';
                textColor = 'text-gray-500';
                labelBg = 'bg-gray-400';
              }
            } else if (isSelected) {
              bgColor = 'bg-yellow-50';
              borderColor = 'border-yellow-500';
              textColor = 'text-yellow-900';
              labelBg = 'bg-yellow-500';
              labelText = 'text-yellow-900';
              shadow = 'shadow-lg shadow-yellow-200';
              ring = 'ring-2 ring-yellow-400';
            }
            
            return (
              <motion.button
                key={option.id}
                whileHover={!showMessage ? { scale: 1.02, x: 8 } : {}}
                whileTap={!showMessage ? { scale: 0.98 } : {}}
                onClick={() => !showMessage && setSelectedOption(option.id)}
                disabled={showMessage}
                className={`w-full text-left p-5 md:p-6 rounded-2xl border-3 ${borderColor} ${bgColor} ${shadow} ${ring} transition-all duration-200`}
              >
                <div className="flex items-start gap-4">
                  {/* Option Label (A, B, C...) */}
                  <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl ${labelBg} flex items-center justify-center font-bold text-xl md:text-2xl ${labelText} shadow-md`}>
                    {optionLabels[index] || option.id.toUpperCase()}
                  </div>
                  
                  {/* Option Text */}
                  <div className="flex-1 pt-1">
                    <p className={`text-lg md:text-xl font-medium ${textColor} leading-relaxed`}>
                      {option.text}
                    </p>
                  </div>
                  
                  {/* Result Icon */}
                  {showMessage && (
                    <div className="flex-shrink-0 pt-1">
                      {isCorrectAnswer ? (
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">✓</span>
                        </div>
                      ) : isSelected ? (
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">✗</span>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selection Hint */}
        {!showMessage && !selectedOption && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <p className="text-gray-500 text-lg">
              👆 Nhấn vào đáp án bạn cho là đúng
            </p>
          </motion.div>
        )}
      </div>
    );
  };

  // Categorize Game - Redesigned with proper drag & drop and click functionality
  const renderCategorize = () => {
    const scenario = gameState.currentScenario!;
    const allItems = scenario.categories?.flatMap((c: Category) => c.items) || [];
    const uncategorized = allItems.filter((item: string) => 
      !Object.values(categorizedItems).flat().includes(item)
    );

    const handleItemClick = (item: string) => {
      if (showMessage) return;
      setSelectedCategorizeItem(selectedCategorizeItem === item ? null : item);
    };

    const handleCategoryClick = (categoryId: string) => {
      if (showMessage || !selectedCategorizeItem) return;
      // Remove from any existing category first
      const newCategorized = { ...categorizedItems };
      Object.keys(newCategorized).forEach(key => {
        newCategorized[key] = (newCategorized[key] || []).filter((i: string) => i !== selectedCategorizeItem);
      });
      // Add to new category
      newCategorized[categoryId] = [...(newCategorized[categoryId] || []), selectedCategorizeItem];
      setCategorizedItems(newCategorized);
      setSelectedCategorizeItem(null);
    };

    // Drag and Drop handlers
    const handleDragStart = (e: React.DragEvent, item: string) => {
      if (showMessage) return;
      e.dataTransfer.setData('text/plain', item);
      e.dataTransfer.effectAllowed = 'move';
      setSelectedCategorizeItem(item);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, categoryId: string) => {
      e.preventDefault();
      const item = e.dataTransfer.getData('text/plain');
      if (!item || showMessage) return;
      
      // Remove from any existing category first
      const newCategorized = { ...categorizedItems };
      Object.keys(newCategorized).forEach(key => {
        newCategorized[key] = (newCategorized[key] || []).filter((i: string) => i !== item);
      });
      // Add to new category
      newCategorized[categoryId] = [...(newCategorized[categoryId] || []), item];
      setCategorizedItems(newCategorized);
      setSelectedCategorizeItem(null);
    };

    const handleDragEnd = () => {
      setSelectedCategorizeItem(null);
    };

    return (
      <div className="space-y-6">
        {/* Timer */}
        {renderGameTimer('🗂️ Phân loại các mục!')}
        
        {/* Question Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-700 p-5 rounded-2xl border-l-4 border-yellow-400 shadow-lg">
          <p className="text-xl font-medium text-white">{scenario.question}</p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
          <p className="text-yellow-800 font-medium">
            🖱️ <strong>Cách chơi:</strong> KÉO THẢ thẻ vào cột phân loại, hoặc NHẤN CHỌN thẻ rồi NHẤN vào cột
          </p>
        </div>
        
        {/* Two Categories Side by Side */}
        <div className="grid md:grid-cols-2 gap-6">
          {scenario.categories?.map((category: Category, catIndex: number) => (
            <motion.div
              key={category.id}
              whileHover={!showMessage && selectedCategorizeItem ? { scale: 1.02 } : {}}
              onClick={() => handleCategoryClick(category.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category.id)}
              className={`relative rounded-2xl min-h-[280px] transition-all cursor-pointer overflow-hidden ${
                showMessage
                  ? category.items.every((item: string) => categorizedItems[category.id]?.includes(item)) &&
                    (categorizedItems[category.id] || []).every((item: string) => category.items.includes(item))
                    ? 'ring-4 ring-green-500 bg-green-50'
                    : 'ring-4 ring-red-500 bg-red-50'
                  : selectedCategorizeItem
                    ? 'ring-4 ring-yellow-400 bg-yellow-50 hover:bg-yellow-100'
                    : catIndex === 0 
                      ? 'bg-red-50 border-4 border-red-300 hover:border-red-500'
                      : 'bg-blue-50 border-4 border-blue-300 hover:border-blue-500'
              }`}
            >
              {/* Category Header */}
              <div className={`p-4 text-center font-bold text-xl text-white ${
                catIndex === 0 ? 'bg-gradient-to-r from-red-700 to-red-600' : 'bg-gradient-to-r from-blue-700 to-blue-600'
              }`}>
                <span className="text-2xl mr-2">{catIndex === 0 ? '🔴' : '🔵'}</span>
                {category.name}
              </div>

              {/* Drop Zone Indicator - Now positioned at bottom, not covering items */}
              {selectedCategorizeItem && !showMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-16 left-4 right-4 flex items-center justify-center pointer-events-none z-10"
                >
                  <div className={`px-6 py-3 rounded-full font-bold text-lg shadow-lg ${
                    catIndex === 0 
                      ? 'bg-red-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    👆 Thả vào đây
                  </div>
                </motion.div>
              )}
              
              {/* Items in Category */}
              <div className="p-4 flex flex-wrap gap-3 justify-center min-h-[120px]">
                {(categorizedItems[category.id] || []).length === 0 && !selectedCategorizeItem && (
                  <p className="text-gray-400 italic text-center py-8">
                    Chưa có thẻ nào
                  </p>
                )}
                {(categorizedItems[category.id] || []).map((item: string) => (
                  <motion.div
                    key={item}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    draggable={!showMessage}
                    onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, item)}
                    onDragEnd={handleDragEnd}
                    className={`px-4 py-2 rounded-xl text-base font-semibold shadow-md cursor-grab active:cursor-grabbing transition-all z-20 ${
                      showMessage && category.items.includes(item)
                        ? 'bg-green-500 text-white border-2 border-green-600'
                        : showMessage
                        ? 'bg-red-500 text-white border-2 border-red-600'
                        : catIndex === 0
                          ? 'bg-white text-red-700 border-2 border-red-300 hover:bg-red-100'
                          : 'bg-white text-blue-700 border-2 border-blue-300 hover:bg-blue-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!showMessage) {
                        // Remove item from category
                        setCategorizedItems(prev => ({
                          ...prev,
                          [category.id]: (prev[category.id] || []).filter((i: string) => i !== item)
                        }));
                      }
                    }}
                  >
                    {item}
                    {!showMessage && (
                      <span className="ml-2 text-xs opacity-60">✕</span>
                    )}
                    {showMessage && category.items.includes(item) && (
                      <span className="ml-2">✓</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Result indicator */}
              {showMessage && (
                <div className={`absolute bottom-0 left-0 right-0 p-3 text-center font-bold ${
                  category.items.every((item: string) => categorizedItems[category.id]?.includes(item)) &&
                  (categorizedItems[category.id] || []).every((item: string) => category.items.includes(item))
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {category.items.every((item: string) => categorizedItems[category.id]?.includes(item)) &&
                  (categorizedItems[category.id] || []).every((item: string) => category.items.includes(item))
                    ? '✓ Đúng!' : '✗ Chưa đúng'}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Uncategorized Items Pool */}
        <div className={`bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl border-4 border-dashed transition-all ${
          uncategorized.length > 0 ? 'border-yellow-500' : 'border-gray-300'
        }`}>
          <div className="text-center mb-4">
            <span className="text-2xl">📦</span>
            <span className="font-bold text-gray-700 ml-2">
              Các thẻ cần phân loại ({uncategorized.length} thẻ)
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center min-h-[60px]">
            {uncategorized.length === 0 ? (
              <p className="text-green-600 font-medium py-4">
                ✓ Đã phân loại tất cả các thẻ!
              </p>
            ) : (
              uncategorized.map((item: string) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  draggable={!showMessage}
                  onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, item)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleItemClick(item)}
                  className={`px-5 py-3 rounded-xl text-base font-bold shadow-lg cursor-grab active:cursor-grabbing transition-all ${
                    selectedCategorizeItem === item
                      ? 'bg-yellow-400 text-yellow-900 ring-4 ring-yellow-500 scale-110'
                      : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
                  }`}
                >
                  {selectedCategorizeItem === item && <span className="mr-2">👆</span>}
                  {item}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // Ordering Game
  const renderOrdering = () => {
    const scenario = gameState.currentScenario!;
    
    return (
      <div className="space-y-6">
        {/* Timer */}
        {renderGameTimer('🔢 Sắp xếp theo thứ tự đúng!')}
        
        <div className="bg-gradient-to-r from-red-800 to-red-700 p-4 rounded-xl mb-4 border-l-4 border-yellow-400">
          <p className="text-xl font-medium text-white">{scenario.question}</p>
        </div>
        <div className="space-y-3">
          {orderedItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              className={`p-4 rounded-xl border-2 flex items-center gap-4 ${
                showMessage
                  ? scenario.orderItems![index].correctOrder === index + 1
                    ? 'bg-green-100 border-green-400'
                    : 'bg-red-100 border-red-400'
                  : 'bg-white border-red-200 hover:border-yellow-400'
              }`}
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => index > 0 && !showMessage && moveItem(index, index - 1)}
                  disabled={index === 0 || showMessage}
                  className="p-1.5 hover:bg-red-100 rounded disabled:opacity-30 text-red-600"
                >
                  ▲
                </button>
                <button
                  onClick={() => index < orderedItems.length - 1 && !showMessage && moveItem(index, index + 1)}
                  disabled={index === orderedItems.length - 1 || showMessage}
                  className="p-1.5 hover:bg-red-100 rounded disabled:opacity-30 text-red-600"
                >
                  ▼
                </button>
              </div>
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-bold text-yellow-400 shadow-md border-2 border-yellow-400">
                {index + 1}
              </span>
              <span className="text-lg font-medium text-gray-800">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Fill Blank Game
  const renderFillBlank = () => {
    const scenario = gameState.currentScenario!;
    const blanks = scenario.fillBlanks!;
    
    // Parse the text and replace blanks with inputs
    const parts = blanks.text.split('___');
    
    return (
      <div className="space-y-6">
        {/* Timer */}
        {renderGameTimer('✏️ Điền từ vào chỗ trống!')}
        
        <div className="bg-gradient-to-r from-red-800 to-red-700 p-4 rounded-xl mb-4 border-l-4 border-yellow-400">
          <p className="text-xl font-medium text-white">{scenario.question}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl text-xl leading-relaxed border-2 border-yellow-200">
          {parts.map((part: string, i: number) => (
            <React.Fragment key={i}>
              {part}
              {i < parts.length - 1 && (
                <input
                  type="text"
                  value={fillBlanks[blanks.blanks[i].id] || ''}
                  onChange={(e) => setFillBlanks(prev => ({
                    ...prev,
                    [blanks.blanks[i].id]: e.target.value
                  }))}
                  disabled={showMessage}
                  placeholder="..."
                  className={`w-32 mx-2 px-3 py-1 border-b-2 bg-transparent text-center font-bold outline-none ${
                    showMessage
                      ? fillBlanks[blanks.blanks[i].id]?.toLowerCase().trim() === blanks.blanks[i].answer.toLowerCase()
                        ? 'border-green-500 text-green-600'
                        : 'border-red-500 text-red-600'
                      : 'border-yellow-400'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        {showMessage && !isCorrect && (
          <div className="bg-yellow-50 p-4 rounded-xl">
            <p className="text-yellow-800 font-medium">
              💡 Đáp án đúng: {blanks.blanks.map((b: { id: string; answer: string }) => `"${b.answer}"`).join(', ')}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Matching Game - Redesigned with better UX
  const renderMatching = () => {
    const scenario = gameState.currentScenario!;
    const pairs = scenario.matchPairs!;
    const matchedRights = Object.values(matchedPairs);
    
    // Find which right item is matched to which left item (for showing connections)
    const getMatchedRight = (left: string) => matchedPairs[left] || null;
    const isRightMatched = (right: string) => matchedRights.includes(right);
    
    // Get color for matched pair
    const getMatchColor = (left: string, right: string) => {
      const correctPair = pairs.find((p: MatchPair) => p.left === left);
      if (showMessage) {
        return correctPair?.right === right ? 'green' : 'red';
      }
      return 'yellow';
    };

    return (
      <div className="space-y-6">
        {/* Timer */}
        {renderGameTimer('🔗 Nối các cặp tương ứng!')}
        
        {/* Question Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-700 p-5 rounded-2xl border-l-4 border-yellow-400 shadow-lg">
          <p className="text-xl font-medium text-white">{scenario.question}</p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
          <p className="text-yellow-800 font-medium">
            🔗 <strong>Cách chơi:</strong> Nhấn vào một văn kiện/tờ báo bên trái, sau đó nhấn vào mục đích tương ứng bên phải
          </p>
        </div>

        {/* Matching Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Văn kiện/Tờ báo */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-red-700 to-red-600 text-white font-bold text-center py-3 rounded-xl shadow-md">
              <span className="text-xl mr-2">📄</span>
              Văn kiện / Tờ báo
            </div>
            
            <div className="space-y-3">
              {pairs.map((pair: MatchPair, index: number) => {
                const isMatched = !!matchedPairs[pair.left];
                const isSelected = selectedLeft === pair.left;
                const matchColor = isMatched ? getMatchColor(pair.left, matchedPairs[pair.left]) : null;
                
                return (
                  <motion.button
                    key={pair.left}
                    whileHover={!showMessage && !isMatched ? { scale: 1.03, x: 5 } : {}}
                    whileTap={!showMessage && !isMatched ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (!showMessage && !isMatched) {
                        setSelectedLeft(isSelected ? null : pair.left);
                      } else if (!showMessage && isMatched) {
                        // Allow unmatching by clicking matched item
                        const newMatchedPairs = { ...matchedPairs };
                        delete newMatchedPairs[pair.left];
                        setMatchedPairs(newMatchedPairs);
                      }
                    }}
                    disabled={showMessage}
                    className={`w-full text-left p-4 rounded-xl border-3 transition-all font-medium relative ${
                      matchColor === 'green'
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : matchColor === 'red'
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : matchColor === 'yellow'
                        ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                        : isSelected
                        ? 'bg-red-500 border-red-600 text-white shadow-xl ring-4 ring-red-300'
                        : 'bg-white border-red-200 text-gray-800 hover:border-red-400 hover:bg-red-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-white text-red-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="flex-1">{pair.left}</span>
                      {isMatched && !showMessage && (
                        <span className="text-yellow-600 text-lg">🔗</span>
                      )}
                      {showMessage && matchColor === 'green' && (
                        <span className="text-green-600 text-lg">✓</span>
                      )}
                      {showMessage && matchColor === 'red' && (
                        <span className="text-red-600 text-lg">✗</span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Right column - Mục đích */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white font-bold text-center py-3 rounded-xl shadow-md">
              <span className="text-xl mr-2">🎯</span>
              Mục đích
            </div>
            
            <div className="space-y-3">
              {pairs.map((pair: MatchPair, index: number) => {
                const isMatched = isRightMatched(pair.right);
                const matchedLeft = Object.keys(matchedPairs).find(k => matchedPairs[k] === pair.right);
                const matchColor = matchedLeft ? getMatchColor(matchedLeft, pair.right) : null;
                const canClick = selectedLeft && !isMatched && !showMessage;
                
                return (
                  <motion.button
                    key={pair.right}
                    whileHover={canClick ? { scale: 1.03, x: -5 } : {}}
                    whileTap={canClick ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (canClick) {
                        handleMatch(selectedLeft, pair.right);
                      }
                    }}
                    disabled={showMessage || isMatched}
                    className={`w-full text-left p-4 rounded-xl border-3 transition-all font-medium ${
                      matchColor === 'green'
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : matchColor === 'red'
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : matchColor === 'yellow'
                        ? 'bg-yellow-100 border-yellow-500 text-yellow-800 opacity-70'
                        : canClick
                        ? 'bg-blue-50 border-blue-400 text-gray-800 ring-4 ring-blue-200 shadow-lg cursor-pointer hover:bg-blue-100'
                        : 'bg-white border-blue-200 text-gray-800'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        canClick ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{pair.right}</span>
                      {isMatched && !showMessage && (
                        <span className="text-yellow-600 text-lg">🔗</span>
                      )}
                      {showMessage && matchColor === 'green' && (
                        <span className="text-green-600 text-lg">✓</span>
                      )}
                      {showMessage && matchColor === 'red' && (
                        <span className="text-red-600 text-lg">✗</span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current selection indicator */}
        {selectedLeft && !showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-2 border-red-400 rounded-xl p-4 text-center"
          >
            <p className="text-red-800 font-medium">
              👆 Đang chọn: <strong>"{selectedLeft}"</strong> → Hãy nhấn vào mục đích phù hợp bên phải
            </p>
          </motion.div>
        )}

        {/* Match progress */}
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">Tiến độ ghép nối:</span>
            <span className="font-bold text-red-700">
              {Object.keys(matchedPairs).length}/{pairs.length} cặp
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(Object.keys(matchedPairs).length / pairs.length) * 100}%` }}
              className="bg-gradient-to-r from-red-500 to-yellow-500 h-3 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  };

  // Balance Game - "Cân bằng cán cân" với độ khó
  const renderBalance = () => {
    const scenario = gameState.currentScenario!;
    const balanceGame = scenario.balanceGame!;
    
    // Count correct and wrong weights
    const correctWeights = balanceGame.weights.filter(w => w.isCorrect === true);
    const wrongWeights = balanceGame.weights.filter(w => w.isCorrect === false);
    const totalCorrect = correctWeights.length;
    
    // Count placed weights
    const placedCorrect = correctWeights.filter(w => balanceWeights.includes(w.id)).length;
    const placedWrong = wrongWeights.filter(w => balanceWeights.includes(w.id)).length;
    
    // Calculate tilt angle
    const balanceRatio = placedCorrect / totalCorrect;
    const wrongPenalty = placedWrong * 0.2; // Wrong weights make it worse
    const effectiveRatio = Math.max(0, balanceRatio - wrongPenalty);
    const tiltAngle = showMessage && isCorrect ? 0 : (1 - effectiveRatio) * 18;
    
    const isBalanced = placedCorrect === totalCorrect && placedWrong === 0;
    const hasWrongChoice = placedWrong > 0;

    const handleWeightClick = (weightId: string) => {
      if (showMessage) return;
      
      if (balanceWeights.includes(weightId)) {
        setBalanceWeights(prev => prev.filter(id => id !== weightId));
      } else {
        setBalanceWeights(prev => [...prev, weightId]);
      }
    };

    // Get status for a weight after answer is shown
    const getWeightStatus = (weight: BalanceWeight) => {
      const isPlaced = balanceWeights.includes(weight.id);
      if (!showMessage) return null;
      
      if (weight.isCorrect && isPlaced) return 'correct-placed'; // ✓ Đúng và đã chọn
      if (weight.isCorrect && !isPlaced) return 'correct-missed'; // ✗ Đúng nhưng bỏ sót
      if (!weight.isCorrect && isPlaced) return 'wrong-placed'; // ✗ Sai mà đã chọn
      if (!weight.isCorrect && !isPlaced) return 'wrong-avoided'; // ✓ Sai và đã tránh được
      return null;
    };

    return (
      <div className="space-y-6">
        {/* Timer */}
        {renderGameTimer('⚖️ Cân bằng lý luận & thực tiễn')}

        {/* Question Header with warning */}
        <div className="bg-gradient-to-r from-red-800 to-red-700 p-5 rounded-2xl border-l-4 border-yellow-400 shadow-lg">
          <p className="text-xl font-medium text-white">{scenario.question}</p>
        </div>

        {/* Difficulty hint */}
        <div className="bg-amber-100 border-2 border-amber-400 rounded-xl p-4 text-center">
          <p className="text-amber-800 font-medium">
            🎯 <strong>Gợi ý:</strong> Có {correctWeights.length} hành động ĐÚNG và {wrongWeights.length} hành động SAI (bẫy). Hãy cẩn thận!
          </p>
        </div>

        {/* Balance Scale Visual */}
        <div className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-3xl p-6 min-h-[320px] overflow-hidden border-4 border-amber-300">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/3 left-1/3 text-9xl">⚖️</div>
          </div>

          {/* Status Message */}
          <motion.div
            animate={{ 
              scale: isBalanced && !showMessage ? [1, 1.03, 1] : 1,
              boxShadow: isBalanced && !showMessage ? ['0 0 0 rgba(0,0,0,0)', '0 0 20px rgba(234,179,8,0.5)', '0 0 0 rgba(0,0,0,0)'] : 'none'
            }}
            transition={{ duration: 0.8, repeat: isBalanced && !showMessage ? Infinity : 0 }}
            className={`text-center mb-4 p-4 rounded-xl font-bold text-lg ${
              showMessage && isCorrect
                ? 'bg-green-500 text-white'
                : showMessage && !isCorrect
                ? 'bg-red-500 text-white'
                : hasWrongChoice
                ? 'bg-orange-100 text-orange-700 border-2 border-orange-400'
                : isBalanced
                ? 'bg-yellow-400 text-yellow-900'
                : 'bg-red-100 text-red-700 border-2 border-red-300'
            }`}
          >
            {showMessage && isCorrect ? (
              <span className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-2xl">✨</span>
                {balanceGame.balanceMessage}
                <span className="text-2xl">✨</span>
              </span>
            ) : showMessage && !isCorrect ? (
              <span className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-2xl">❌</span>
                {balanceGame.wrongChoiceMessage || 'Chưa đúng! Xem giải thích bên dưới.'}
              </span>
            ) : hasWrongChoice ? (
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl">🤔</span>
                Bạn có chắc tất cả lựa chọn đều đúng không?
              </span>
            ) : isBalanced ? (
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl">⚖️</span>
                Đã đủ {totalCorrect} quả cân! Nhấn "Xác nhận" để kiểm tra!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl">⚠️</span>
                {balanceGame.imbalanceMessage}
              </span>
            )}
          </motion.div>

          {/* The Scale - Simplified */}
          <div className="relative flex justify-center items-end h-48">
            {/* Base */}
            <div className="absolute bottom-0 z-10">
              <div className="w-6 h-20 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg mx-auto" />
              <div className="w-20 h-3 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full" />
            </div>

            {/* Scale Beam */}
            <motion.div
              animate={{ rotate: tiltAngle }}
              transition={{ type: 'spring', stiffness: 60, damping: 12 }}
              className="relative w-full max-w-xl flex justify-between items-start"
              style={{ transformOrigin: 'center top', marginBottom: '60px' }}
            >
              {/* Beam bar */}
              <div className="absolute top-6 left-0 right-0 h-3 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 rounded-full shadow-md" />
              
              {/* Left Pan - Lý luận */}
              <div className="flex flex-col items-center z-20">
                <div className="w-1 h-6 bg-amber-600" />
                <motion.div 
                  className={`w-32 h-24 rounded-2xl border-4 flex flex-col items-center justify-center p-2 shadow-lg ${
                    showMessage && isCorrect
                      ? 'bg-green-100 border-green-500'
                      : 'bg-gradient-to-b from-red-100 to-red-200 border-red-400'
                  }`}
                >
                  <span className="text-2xl mb-1">📖</span>
                  <span className="font-bold text-red-800 text-sm">{balanceGame.leftSide.name}</span>
                  <span className="text-xs text-gray-500 text-center">{balanceGame.leftSide.description}</span>
                </motion.div>
              </div>

              {/* Right Pan - Thực tiễn */}
              <div className="flex flex-col items-center z-20">
                <div className="w-1 h-6 bg-amber-600" />
                <motion.div 
                  className={`w-32 h-24 rounded-2xl border-4 flex flex-col items-center justify-center p-2 shadow-lg ${
                    showMessage && isCorrect
                      ? 'bg-green-100 border-green-500'
                      : showMessage && !isCorrect
                      ? 'bg-red-100 border-red-500'
                      : hasWrongChoice
                      ? 'bg-orange-100 border-orange-400'
                      : isBalanced
                      ? 'bg-yellow-100 border-yellow-500'
                      : 'bg-gradient-to-b from-blue-100 to-blue-200 border-blue-400'
                  }`}
                >
                  <span className="text-2xl mb-1">🔨</span>
                  <span className="font-bold text-blue-800 text-sm">{balanceGame.rightSide.name}</span>
                  <div className="flex flex-wrap gap-0.5 justify-center mt-1 max-w-full overflow-hidden">
                    {balanceWeights.slice(0, 6).map(wId => {
                      const weight = balanceGame.weights.find(w => w.id === wId);
                      return weight ? (
                        <span key={wId} className="text-sm" title={weight.text}>{weight.icon}</span>
                      ) : null;
                    })}
                    {balanceWeights.length > 6 && <span className="text-xs">+{balanceWeights.length - 6}</span>}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Weights Selection */}
        <div className={`p-6 rounded-2xl border-4 transition-all ${
          showMessage 
            ? 'bg-gray-100 border-gray-300' 
            : 'bg-gradient-to-br from-amber-50 to-yellow-100 border-dashed border-yellow-500'
        }`}>
          <div className="text-center mb-4">
            <span className="text-2xl">🎯</span>
            <span className="font-bold text-gray-700 ml-2">
              {showMessage ? 'Kết quả chi tiết:' : `Chọn hành động thực tiễn ĐÚNG (${placedCorrect}/${totalCorrect})`}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {balanceGame.weights.map((weight: BalanceWeight) => {
              const isPlaced = balanceWeights.includes(weight.id);
              const status = getWeightStatus(weight);
              
              return (
                <motion.button
                  key={weight.id}
                  whileHover={!showMessage ? { scale: 1.03, x: 5 } : {}}
                  whileTap={!showMessage ? { scale: 0.97 } : {}}
                  onClick={() => handleWeightClick(weight.id)}
                  disabled={showMessage}
                  className={`p-4 rounded-xl font-medium shadow-md transition-all text-left flex flex-col gap-2 ${
                    status === 'correct-placed'
                      ? 'bg-green-100 border-3 border-green-500 text-green-800'
                      : status === 'correct-missed'
                      ? 'bg-yellow-100 border-3 border-yellow-500 text-yellow-800'
                      : status === 'wrong-placed'
                      ? 'bg-red-100 border-3 border-red-500 text-red-800'
                      : status === 'wrong-avoided'
                      ? 'bg-gray-100 border-3 border-gray-400 text-gray-600'
                      : isPlaced
                      ? 'bg-green-500 text-white border-3 border-green-600 ring-2 ring-green-300'
                      : 'bg-white text-gray-800 border-3 border-gray-300 hover:border-yellow-500 hover:bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl flex-shrink-0">{weight.icon}</span>
                    <span className="flex-1 text-sm">{weight.text}</span>
                    {!showMessage && isPlaced && <span className="text-xl">✓</span>}
                    {status === 'correct-placed' && <span className="text-xl">✅</span>}
                    {status === 'correct-missed' && <span className="text-xl">⚠️</span>}
                    {status === 'wrong-placed' && <span className="text-xl">❌</span>}
                    {status === 'wrong-avoided' && <span className="text-xl text-gray-400">🚫</span>}
                  </div>
                  
                  {/* Show explanation after answer */}
                  {showMessage && weight.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`text-xs mt-1 p-2 rounded-lg ${
                        weight.isCorrect 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      💡 {weight.explanation}
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Score Summary after answer */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 rounded-xl p-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{correctWeights.filter(w => balanceWeights.includes(w.id)).length}</div>
                <div className="text-xs text-green-700">Đúng đã chọn</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{correctWeights.filter(w => !balanceWeights.includes(w.id)).length}</div>
                <div className="text-xs text-yellow-700">Đúng bị bỏ sót</div>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{wrongWeights.filter(w => balanceWeights.includes(w.id)).length}</div>
                <div className="text-xs text-red-700">Bẫy đã chọn</div>
              </div>
              <div className="bg-gray-200 p-3 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{wrongWeights.filter(w => !balanceWeights.includes(w.id)).length}</div>
                <div className="text-xs text-gray-700">Bẫy đã tránh</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress indicator - only show before answer */}
        {!showMessage && (
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Tiến độ:</span>
              <span className={`font-bold ${hasWrongChoice ? 'text-orange-600' : 'text-amber-700'}`}>
                Đã chọn {balanceWeights.length} quả cân
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(placedCorrect / totalCorrect) * 100}%` }}
                className={`h-3 rounded-full transition-colors ${
                  hasWrongChoice 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
                    : isBalanced 
                    ? 'bg-gradient-to-r from-green-500 to-green-400' 
                    : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                }`}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Playing Screen
  const renderPlaying = () => {
    const scenario = gameState.currentScenario!;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen py-8 px-4"
        style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FFFBEB 50%, #FEF3C7 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-800 to-red-900 rounded-2xl shadow-xl p-6 mb-6 border-b-4 border-yellow-400">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-3xl shadow-lg">
                  {currentStage.flag}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Chặng {gameState.currentStageIndex + 1}: {currentStage.countryVi}
                  </h2>
                  <p className="text-yellow-200">{currentStage.period}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3 bg-yellow-400/20 px-4 py-2 rounded-full border border-yellow-400/50">
                <span className="text-2xl">{currentStage.symbol}</span>
                <span className="font-medium text-yellow-200">{currentStage.symbolName}</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="flex gap-2">
              {gameStages.map((_: GameStage, index: number) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    index < gameState.currentStageIndex
                      ? 'bg-yellow-400'
                      : index === gameState.currentStageIndex
                      ? 'bg-yellow-300'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scenario Intro */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-700">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-red-700" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {scenario.intro}
              </p>
            </div>

            {/* Game Content */}
            {scenario.type === 'multiple-choice' && renderMultipleChoice()}
            {scenario.type === 'categorize' && renderCategorize()}
            {scenario.type === 'ordering' && renderOrdering()}
            {scenario.type === 'fill-blank' && renderFillBlank()}
            {scenario.type === 'matching' && renderMatching()}
            {scenario.type === 'balance' && renderBalance()}
          </div>

          {/* Message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-6 rounded-2xl mb-6 ${
                  isCorrect ? 'bg-green-100' : 'bg-yellow-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Sparkles className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg mb-2 ${
                      isCorrect ? 'text-green-800' : 'text-yellow-800'
                    }`}>
                      {isCorrect ? '🎉 Tuyệt vời!' : '💡 Bài học rút ra:'}
                    </h4>
                    <p className={`text-lg ${
                      isCorrect ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {scenario.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            {!showMessage ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkAnswer}
                className="px-8 py-4 bg-red-700 hover:bg-red-800 text-white font-bold text-lg rounded-full shadow-lg border-4 border-red-600"
              >
                ✓ XÁC NHẬN
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStage}
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold text-lg rounded-full shadow-lg border-4 border-yellow-300"
              >
                <span className="flex items-center gap-2">
                  {gameState.currentStageIndex < gameStages.length - 1 ? (
                    <>
                      CHẶNG TIẾP THEO
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      NHẬN QUÀ
                      <Gift className="w-5 h-5" />
                    </>
                  )}
                </span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Reward Screen
  const renderReward = () => {
    const reward = gameState.earnedReward!;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #B22222 100%)',
        }}
      >
        {/* Vietnamese Star Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400/10 text-9xl font-bold select-none"
              style={{
                left: `${(i % 4) * 25 + 10}%`,
                top: `${Math.floor(i / 4) * 50 + 20}%`,
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ 
                duration: 3 + i * 0.5, 
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              ★
            </motion.div>
          ))}
        </div>

        {/* Confetti effect with Vietnamese colors */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3"
            style={{
              backgroundColor: ['#FFD700', '#FFDC00', '#FFC107', '#FF6B6B', '#DC143C'][i % 5],
              left: `${Math.random() * 100}%`,
              top: '-10%',
              borderRadius: i % 3 === 0 ? '50%' : '0',
              transform: i % 3 === 1 ? 'rotate(45deg)' : 'none',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, (Math.random() - 0.5) * 200],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Decorative frame */}
        <div className="absolute inset-4 border-2 border-yellow-400/30 rounded-3xl pointer-events-none" />
        <div className="absolute inset-8 border border-yellow-400/20 rounded-2xl pointer-events-none" />

        <div className="text-center z-10 px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            {/* Award badge with Vietnamese styling */}
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #FFD700, #FFC107, #FFDC00, #FFD700)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <div 
                className="relative inline-flex items-center justify-center w-40 h-40 rounded-full shadow-2xl border-4 border-yellow-400"
                style={{
                  background: 'linear-gradient(135deg, #B22222 0%, #8B0000 100%)',
                }}
              >
                <span className="text-8xl">{reward.icon}</span>
              </div>
              {/* Corner stars */}
              <div className="absolute -top-2 -right-2 text-yellow-400 text-2xl">★</div>
              <div className="absolute -bottom-2 -left-2 text-yellow-400 text-2xl">★</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-yellow-400 text-2xl">★</span>
              <Gift className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl text-yellow-400 font-bold tracking-wider">PHẦN THƯỞNG</span>
              <Gift className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 text-2xl">★</span>
            </div>

            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              {reward.name}
            </h2>

            <p className="text-xl text-yellow-100/90 max-w-2xl mx-auto leading-relaxed mb-8">
              {reward.message}
            </p>

            {/* Score card with Vietnamese styling */}
            <div 
              className="rounded-xl p-6 max-w-md mx-auto mb-8 border-2 border-yellow-400/50"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8) 0%, rgba(178, 34, 34, 0.8) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-400 text-xl">★</span>
                <div className="text-yellow-400 text-4xl font-bold">
                  {gameState.score} điểm
                </div>
                <span className="text-yellow-400 text-xl">★</span>
              </div>
              <p className="text-yellow-100/80">
                Hoàn thành {gameState.completedStages.length}/{gameStages.length} chặng hành trình
              </p>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartGame}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-yellow-400/50 hover:bg-white/30 hover:border-yellow-400 transition-all"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  CHƠI LẠI
                </span>
              </motion.button>

              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-yellow-400 text-red-900 font-bold text-lg rounded-full shadow-lg hover:bg-yellow-300 transition-colors border-2 border-yellow-500"
              >
                <span className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  VỀ TRANG CHỦ
                </span>
              </motion.a>
            </div>

            {/* Inspirational quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-10 text-yellow-100/70 italic text-lg"
            >
              "Không có gì quý hơn độc lập, tự do" - Hồ Chí Minh
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Main Render
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {gameState.phase === 'intro' && renderIntro()}
        {gameState.phase === 'stage-intro' && renderStageIntro()}
        {gameState.phase === 'playing' && renderPlaying()}
        {gameState.phase === 'reward' && renderReward()}
      </AnimatePresence>
    </div>
  );
};

export default JourneyGame;
