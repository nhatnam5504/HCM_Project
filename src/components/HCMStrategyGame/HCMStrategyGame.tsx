import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, MapPin, BookOpen } from 'lucide-react';
import {
  GameState,
  INITIAL_RESOURCES,
  START_YEAR,
  END_YEAR,
  DecisionHistory,
  Decision,
  ResourceChange,
} from '../../types/hcmStrategy';
import { locations, getRandomEvent, applyResourceChange, hasEnoughResources } from '../../data/hcmStrategyData';
import ResourceBar from './ResourceBar';
import LocationCard from './LocationCard';
import DecisionModal from './DecisionModal';
import EventModal from './EventModal';
import TimelineMap from './TimelineMap';
import VictoryScreen from './VictoryScreen';

const HCMStrategyGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    currentLocationIndex: 0,
    resources: INITIAL_RESOURCES,
    completedLocations: [],
    currentYear: START_YEAR,
    gamePhase: 'intro',
    pendingEvent: null,
    decisionHistory: [],
    achievements: [],
    selectedDecisionsAtLocation: {}, // Track decisions selected at each location
    failedLocations: [], // Track locations where player failed (missing required decisions or wrong order)
  }));

  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [wrongOrderAttempts, setWrongOrderAttempts] = useState<{
    show: boolean;
    message: string;
    penalty: ResourceChange;
  } | null>(null);

  const currentLocation = locations[gameState.currentLocationIndex];

  // Check game conditions
  const checkGameOver = useCallback((): boolean => {
    // Hết tiền - không thể tiếp tục
    if (gameState.resources.money <= 0) return true;
    // Sức khỏe xuống 0 - phải dừng lại
    if (gameState.resources.health <= 0) return true;
    // Sai quá 3-5 quốc gia → thua
    if (gameState.failedLocations.length >= 3) return true;
    // Hết thời gian mà chưa hoàn thành
    if (
      gameState.currentYear >= END_YEAR &&
      gameState.currentLocationIndex < locations.length - 1 &&
      !gameState.completedLocations.includes(locations[locations.length - 1].id)
    )
      return true;
    return false;
  }, [gameState]);

  const checkVictory = useCallback((): boolean => {
    // Cho phép sai 1-2 quốc gia vẫn có thể thắng
    // Phải hoàn thành ít nhất 8/10 điểm dừng (cho phép sai tối đa 2 quốc gia)
    const minLocationsCompleted = gameState.completedLocations.length >= locations.length - 2;
    
    // Phải đạt mức kiến thức và kinh nghiệm cao (giảm nhẹ để cho phép sai 1-2 quốc gia)
    const highKnowledge = gameState.resources.knowledge >= 75; // Giảm từ 85 xuống 75
    const highExperience = gameState.resources.experience >= 70; // Giảm từ 80 xuống 70
    
    // Phải còn sức khỏe và tiền bạc đủ
    const hasHealth = gameState.resources.health >= 15; // Giảm từ 20 xuống 15
    const hasMoney = gameState.resources.money >= 20; // Giảm từ 30 xuống 20
    
    // Phải ở điểm dừng cuối cùng
    const atLastLocation = gameState.currentLocationIndex >= locations.length - 1;
    
    // Không được sai quá 2 quốc gia
    const notTooManyFailures = gameState.failedLocations.length <= 2;
    
    return (
      minLocationsCompleted &&
      highKnowledge &&
      highExperience &&
      hasHealth &&
      hasMoney &&
      atLastLocation &&
      notTooManyFailures
    );
  }, [gameState]);

  const checkLocationRequirements = useCallback(
    (resources: typeof gameState.resources, location: typeof currentLocation): boolean => {
      if (location.requiredKnowledge && resources.knowledge < location.requiredKnowledge) {
        return false;
      }
      if (location.requiredExperience && resources.experience < location.requiredExperience) {
        return false;
      }
      return true;
    },
    []
  );

  // Check if required decisions are selected
  const checkRequiredDecisions = useCallback(
    (location: typeof currentLocation, selectedDecisions: string[]): { met: boolean; missing: string[] } => {
      if (!location.requiredDecisions || location.requiredDecisions.length === 0) {
        return { met: true, missing: [] };
      }

      const missing = location.requiredDecisions.filter((reqId) => !selectedDecisions.includes(reqId));
      return { met: missing.length === 0, missing };
    },
    []
  );

  // Check if minimum decisions count is met
  const checkMinDecisionsCount = useCallback(
    (location: typeof currentLocation, selectedCount: number): boolean => {
      if (!location.minDecisionsCount) return true;
      return selectedCount >= location.minDecisionsCount;
    },
    []
  );

  // Check if location failed (chỉ kiểm tra số lượng quyết định tối thiểu, không bắt buộc thứ tự)
  const checkLocationFailed = useCallback(
    (location: typeof currentLocation, selectedDecisions: string[]): boolean => {
      // Chỉ kiểm tra số lượng quyết định tối thiểu (không bắt buộc thứ tự)
      if (location.minDecisionsCount && selectedDecisions.length < location.minDecisionsCount) {
        return true; // Failed: not enough decisions
      }

      return false;
    },
    []
  );

  // Check if decision prerequisites are met
  const canSelectDecision = useCallback(
    (decision: Decision, selectedDecisions: string[], resources: typeof gameState.resources): boolean => {
      // Check required decisions (prerequisites)
      if (decision.requiredDecisions && decision.requiredDecisions.length > 0) {
        const hasAllPrerequisites = decision.requiredDecisions.every((reqId) =>
          selectedDecisions.includes(reqId)
        );
        if (!hasAllPrerequisites) return false;
      }

      // Check minimum knowledge
      if (decision.minKnowledge && resources.knowledge < decision.minKnowledge) {
        return false;
      }

      // Check minimum experience
      if (decision.minExperience && resources.experience < decision.minExperience) {
        return false;
      }

      return true;
    },
    []
  );

  // Check location complete helper
  const checkLocationComplete = useCallback(
    (resources: typeof gameState.resources) => {
      const location = currentLocation;
      const selectedDecisions = gameState.selectedDecisionsAtLocation[location.id] || [];

      // Check resource requirements
      if (!checkLocationRequirements(resources, location)) {
        setGameState((prev) => ({
          ...prev,
          gamePhase: 'playing',
        }));
        return;
      }

      // Chỉ kiểm tra số lượng quyết định tối thiểu (không bắt buộc thứ tự)
      const locationFailed = checkLocationFailed(location, selectedDecisions);

      if (locationFailed) {
        // Location failed - apply penalty and mark as failed (chỉ khi không đủ số lượng)
        setGameState((prev) => {
          const newFailedLocations = [...prev.failedLocations];
          if (!newFailedLocations.includes(location.id)) {
            newFailedLocations.push(location.id);
            
            // Apply penalty for failing a location (không đủ số lượng quyết định)
            const penalty: ResourceChange = {
              knowledge: -10, // Trừ 10% kiến thức
              experience: -8, // Trừ 8% kinh nghiệm
              money: -20, // Trừ 20₫
              health: -5, // Trừ 5% sức khỏe
            };
            
            const penalizedResources = applyResourceChange(prev.resources, penalty);
            
            // Check if too many failures (3+ locations)
            if (newFailedLocations.length >= 3) {
              return {
                ...prev,
                resources: penalizedResources,
                failedLocations: newFailedLocations,
                gamePhase: 'game-over', // Game over if 3+ failures
              };
            }
            
            return {
              ...prev,
              resources: penalizedResources,
              failedLocations: newFailedLocations,
              gamePhase: 'location-complete', // Still allow to continue but with penalty
            };
          }
          return prev;
        });
        return;
      }

      // All requirements met - mark location as completed
      setGameState((prev) => {
        const newCompletedLocations = [...prev.completedLocations];
        const newFailedLocations = [...prev.failedLocations];
        
        if (!newCompletedLocations.includes(location.id)) {
          newCompletedLocations.push(location.id);
        }
        
        // Remove from failed if was there
        const failedIndex = newFailedLocations.indexOf(location.id);
        if (failedIndex > -1) {
          newFailedLocations.splice(failedIndex, 1);
        }

        // Check achievements
        const newAchievements = [...prev.achievements];
        if (
          newCompletedLocations.length === locations.length &&
          !newAchievements.includes('Hoàn thành hành trình')
        ) {
          newAchievements.push('Hoàn thành hành trình');
        }
        if (resources.knowledge >= 90 && !newAchievements.includes('Tri thức uyên bác')) {
          newAchievements.push('Tri thức uyên bác');
        }
        if (resources.experience >= 90 && !newAchievements.includes('Kinh nghiệm dày dặn')) {
          newAchievements.push('Kinh nghiệm dày dặn');
        }

        return {
          ...prev,
          completedLocations: newCompletedLocations,
          failedLocations: newFailedLocations,
          gamePhase: 'location-complete',
          achievements: newAchievements,
        };
      });
    },
    [currentLocation, checkLocationRequirements, checkLocationFailed, gameState.selectedDecisionsAtLocation]
  );

  // State for showing decision result feedback
  const [decisionFeedback, setDecisionFeedback] = useState<{
    show: boolean;
    decision: Decision | null;
    changes: ResourceChange;
  } | null>(null);

  // Handle decision selection
  const handleDecisionSelect = useCallback(
    (decision: DecisionHistory['decisionId']) => {
      const selectedDecision = currentLocation.decisions.find((d) => d.id === decision);
      if (!selectedDecision) return;

      const currentSelected = gameState.selectedDecisionsAtLocation[currentLocation.id] || [];

      // Check if decision already selected (prevent duplicates)
      if (currentSelected.includes(decision)) {
        return;
      }

      // Cho phép chọn tất cả quyết định, nhưng kiểm tra thứ tự để trừ điểm
      let penaltyApplied = false;
      let penalty: ResourceChange = {};
      let penaltyMessage = '';

      // Kiểm tra thứ tự: nếu chọn quyết định mà chưa chọn các quyết định tiên quyết → trừ điểm
      if (selectedDecision.requiredDecisions && selectedDecision.requiredDecisions.length > 0) {
        const missingPrerequisites = selectedDecision.requiredDecisions.filter(
          (reqId) => !currentSelected.includes(reqId)
        );
        
        if (missingPrerequisites.length > 0) {
          // Trừ điểm vì chọn sai thứ tự, nhưng vẫn cho phép chọn
          penalty = {
            knowledge: -8, // Trừ 8% kiến thức vì không tuân thủ thứ tự lịch sử
            experience: -5, // Trừ 5% kinh nghiệm
            money: -15, // Trừ 15₫ vì lãng phí thời gian
            health: -3, // Trừ 3% sức khỏe
          };
          
          penaltyMessage = `⚠️ Bạn đã chọn "${selectedDecision.title}" trước khi hoàn thành các quyết định cần thiết! Việc không tuân thủ thứ tự lịch sử đã làm bạn mất thời gian và kiến thức.`;
          penaltyApplied = true;
        }
      }

      // Kiểm tra kiến thức/kinh nghiệm tối thiểu
      if (
        (selectedDecision.minKnowledge && gameState.resources.knowledge < selectedDecision.minKnowledge) ||
        (selectedDecision.minExperience && gameState.resources.experience < selectedDecision.minExperience)
      ) {
        // Trừ điểm nhẹ hơn khi thiếu kiến thức/kinh nghiệm
        const knowledgePenalty = selectedDecision.minKnowledge && gameState.resources.knowledge < selectedDecision.minKnowledge ? -3 : 0;
        const experiencePenalty = selectedDecision.minExperience && gameState.resources.experience < selectedDecision.minExperience ? -2 : 0;
        
        penalty = {
          ...penalty,
          knowledge: (penalty.knowledge || 0) + knowledgePenalty,
          experience: (penalty.experience || 0) + experiencePenalty,
          money: (penalty.money || 0) - 5,
        };
        
        if (!penaltyMessage) {
          penaltyMessage = `⚠️ Bạn chưa đủ kiến thức/kinh nghiệm để thực hiện "${selectedDecision.title}" một cách hiệu quả. Hãy tích lũy thêm trước khi quyết định!`;
        }
        penaltyApplied = true;
      }

      // Áp dụng hình phạt nếu có
      if (penaltyApplied) {
        const penalizedResources = applyResourceChange(gameState.resources, penalty);
        
        // Hiển thị cảnh báo
        setWrongOrderAttempts({
          show: true,
          message: penaltyMessage,
          penalty,
        });

        // Cập nhật resources với hình phạt
        setGameState((prev) => ({
          ...prev,
          resources: penalizedResources,
        }));

        // Ẩn cảnh báo sau 3 giây
        setTimeout(() => {
          setWrongOrderAttempts(null);
        }, 3000);
      }

      // Check if can afford
      if (!hasEnoughResources(gameState.resources, selectedDecision.cost)) {
        return;
      }

      const resourcesBefore = { ...gameState.resources };
      
      // Apply cost first (subtract resources)
      let newResources = applyResourceChange(gameState.resources, selectedDecision.cost);
      
      // Then apply reward (add resources)
      newResources = applyResourceChange(newResources, selectedDecision.reward);

      // Calculate total changes for feedback (net change = reward + cost)
      const totalChanges: ResourceChange = {
        money: (selectedDecision.reward.money || 0) + (selectedDecision.cost.money || 0),
        health: (selectedDecision.reward.health || 0) + (selectedDecision.cost.health || 0),
        knowledge: (selectedDecision.reward.knowledge || 0) + (selectedDecision.cost.knowledge || 0),
        experience: (selectedDecision.reward.experience || 0) + (selectedDecision.cost.experience || 0),
        time: (selectedDecision.reward.time || 0) + (selectedDecision.cost.time || 0),
      };

      // Update year based on duration
      const newYear = Math.min(END_YEAR, gameState.currentYear + selectedDecision.duration);
      
      // Also update time resource (duration consumes time)
      if (selectedDecision.duration) {
        newResources.time = Math.max(0, newResources.time - selectedDecision.duration);
        totalChanges.time = (totalChanges.time || 0) - selectedDecision.duration;
      }

      // Update selected decisions for this location
      const newSelectedDecisions = {
        ...gameState.selectedDecisionsAtLocation,
        [currentLocation.id]: [...currentSelected, decision],
      };

      // Show feedback first
      setDecisionFeedback({
        show: true,
        decision: selectedDecision,
        changes: totalChanges,
      });

      // Add to history
      const newHistory: DecisionHistory[] = [
        ...gameState.decisionHistory,
        {
          locationId: currentLocation.id,
          decisionId: decision,
          year: gameState.currentYear,
          resourcesBefore,
          resourcesAfter: newResources,
        },
      ];

      // Update state after showing feedback
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          resources: newResources,
          currentYear: newYear,
          decisionHistory: newHistory,
          selectedDecisionsAtLocation: newSelectedDecisions,
          gamePhase: 'playing',
        }));

        // Hide feedback
        setDecisionFeedback(null);

        // Check for random event
        const event = getRandomEvent(currentLocation);
        if (event) {
          setTimeout(() => {
            setGameState((prev) => ({
              ...prev,
              pendingEvent: event,
              gamePhase: 'event',
            }));
          }, 500);
        } else {
          // No event, check if location requirements met after a brief delay
          setTimeout(() => {
            checkLocationComplete(newResources);
          }, 500);
        }
      }, 1500);
    },
    [gameState, currentLocation, checkLocationComplete, canSelectDecision]
  );

  // Handle event continue
  const handleEventContinue = useCallback(() => {
    if (!gameState.pendingEvent) return;

    setGameState((prev) => {
      const newResources = applyResourceChange(prev.resources, prev.pendingEvent!.effect);

      // Check location complete after event
      setTimeout(() => {
        const location = currentLocation;
        const requirementsMet =
          (!location.requiredKnowledge || newResources.knowledge >= location.requiredKnowledge) &&
          (!location.requiredExperience || newResources.experience >= location.requiredExperience);

        if (requirementsMet) {
          checkLocationComplete(newResources);
        } else {
          // Requirements not met, continue playing
          setGameState((prevState) => ({
            ...prevState,
            gamePhase: 'playing',
          }));
        }
      }, 500);

      return {
        ...prev,
        resources: newResources,
        pendingEvent: null,
        gamePhase: 'playing', // Return to playing state
      };
    });
  }, [gameState.pendingEvent, currentLocation, checkLocationComplete]);

  // Move to next location
  const moveToNextLocation = useCallback(() => {
    const currentLoc = locations[gameState.currentLocationIndex];
    const selectedDecisions = gameState.selectedDecisionsAtLocation[currentLoc.id] || [];
    
    // Chỉ kiểm tra số lượng quyết định tối thiểu (không bắt buộc thứ tự)
    const locationFailed = checkLocationFailed(currentLoc, selectedDecisions);
    
    if (locationFailed && !gameState.failedLocations.includes(currentLoc.id)) {
      // Apply penalty for moving without enough decisions
      const penalty: ResourceChange = {
        knowledge: -10,
        experience: -8,
        money: -20,
        health: -5,
      };
      
      setGameState((prev) => {
        const newFailedLocations = [...prev.failedLocations, currentLoc.id];
        const penalizedResources = applyResourceChange(prev.resources, penalty);
        
        // Check if too many failures (3+ locations)
        if (newFailedLocations.length >= 3) {
          return {
            ...prev,
            resources: penalizedResources,
            failedLocations: newFailedLocations,
            gamePhase: 'game-over',
          };
        }
        
        return {
          ...prev,
          resources: penalizedResources,
          failedLocations: newFailedLocations,
        };
      });
    }

    if (gameState.currentLocationIndex >= locations.length - 1) {
      // Check victory conditions
      if (checkVictory()) {
        setGameState((prev) => ({
          ...prev,
          gamePhase: 'victory',
        }));
      } else {
        // Not enough resources for victory
        setGameState((prev) => ({
          ...prev,
          gamePhase: 'playing', // Stay at last location to improve
        }));
      }
      return;
    }

    setGameState((prev) => ({
      ...prev,
      currentLocationIndex: prev.currentLocationIndex + 1,
      gamePhase: 'playing',
    }));
  }, [gameState.currentLocationIndex, gameState.selectedDecisionsAtLocation, gameState.failedLocations, checkVictory, checkLocationFailed]);

  // Start game
  const startGame = useCallback(() => {
    setGameState({
      currentLocationIndex: 0,
      resources: INITIAL_RESOURCES,
      completedLocations: [],
      currentYear: START_YEAR,
      gamePhase: 'playing',
      pendingEvent: null,
      decisionHistory: [],
      achievements: [],
      selectedDecisionsAtLocation: {},
      failedLocations: [],
    });
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Check game state
  useEffect(() => {
    if (gameState.gamePhase === 'playing') {
      if (checkGameOver()) {
        setGameState((prev) => ({
          ...prev,
          gamePhase: 'game-over',
        }));
      } else if (checkVictory()) {
        setGameState((prev) => ({
          ...prev,
          gamePhase: 'victory',
        }));
      }
    }
  }, [gameState, checkGameOver, checkVictory]);

  // Intro screen
  if (gameState.gamePhase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400"
          >
            <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-8 text-white text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h1 className="text-4xl font-bold mb-2">Hành Trình Bác Hồ</h1>
              <p className="text-xl opacity-90">Mini Game Chiến Lược</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">🎯 Mục tiêu</h3>
                <p className="text-gray-700">
                  Quản lý tài nguyên và đưa ra quyết định đúng đắn để hoàn thành hành trình 30 năm
                  tìm đường cứu nước của Bác Hồ (1911-1941)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-bold text-blue-800 mb-2">📋 Tài nguyên</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Tiền bạc: Để sống và đi lại</li>
                    <li>• Sức khỏe: Ảnh hưởng khả năng hoạt động</li>
                    <li>• Kiến thức: Thu thập qua học tập</li>
                    <li>• Kinh nghiệm: Tích lũy qua hoạt động</li>
                    <li>• Thời gian: Giới hạn 30 năm</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-bold text-green-800 mb-2">🎮 Cách chơi</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Chọn quyết định tại mỗi điểm dừng</li>
                    <li>• Cân bằng tài nguyên để tiếp tục</li>
                    <li>• Đạt yêu cầu để chuyển điểm dừng</li>
                    <li>• Hoàn thành 10 điểm dừng để thắng</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={startGame}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-xl font-bold text-xl hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <Play className="w-6 h-6" />
                Bắt đầu chơi
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Victory/Game Over screen
  if (gameState.gamePhase === 'victory' || gameState.gamePhase === 'game-over') {
    return (
      <VictoryScreen
        gameState={gameState}
        onRestart={resetGame}
        onHome={() => {}}
      />
    );
  }

  // Main game screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🗺️</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Hành Trình Bác Hồ</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Năm: {gameState.currentYear}</span>
                <span>•</span>
                <span>
                  Điểm dừng: {gameState.currentLocationIndex + 1} / {locations.length}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Reset game"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Win/Lose Conditions Info */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-bold text-blue-800 mb-2 text-sm">📋 Điều kiện thắng/thua (Khắt khe):</h3>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-semibold text-green-700 mb-1">✅ Thắng khi:</p>
              <ul className="text-gray-700 space-y-0.5">
                <li>• Hoàn thành TẤT CẢ {locations.length} điểm dừng</li>
                <li>• Đạt yêu cầu tại mỗi điểm dừng</li>
                <li>• Chọn đủ quyết định BẮT BUỘC</li>
                <li>• Kiến thức ≥ 85%, Kinh nghiệm ≥ 80%</li>
                <li>• Sức khỏe ≥ 20%, Tiền ≥ 30₫</li>
                <li>• Đúng thứ tự lịch sử</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-700 mb-1">❌ Thua khi:</p>
              <ul className="text-gray-700 space-y-0.5">
                <li>• Hết tiền (≤ 0₫)</li>
                <li>• Sức khỏe xuống 0%</li>
                <li>• Hết thời gian (≥ 1941) chưa hoàn thành</li>
                <li>• Sai tại 3+ quốc gia (không chọn đủ quyết định bắt buộc/sai thứ tự)</li>
                <li>• Không đạt yêu cầu tại điểm dừng quan trọng</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resource Bar */}
        <ResourceBar resources={gameState.resources} showWarnings={true} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Location Card */}
          <div className="lg:col-span-2">
            <LocationCard location={currentLocation} currentYear={gameState.currentYear} />

            {/* Progress Indicator */}
            <div className="mt-6 bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Tiến độ hành trình</span>
                <span className="text-sm font-bold text-red-600">
                  {gameState.completedLocations.length} / {locations.length} điểm dừng
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(gameState.completedLocations.length / locations.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-red-600 to-yellow-600 h-3 rounded-full"
                />
              </div>
            </div>

            {/* Location Complete Message */}
            {gameState.gamePhase === 'location-complete' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-6 text-center shadow-lg"
              >
                <div className="text-6xl mb-3">✅</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Hoàn thành điểm dừng: {currentLocation.nameVi}
                </h3>
                <p className="text-gray-700 mb-2 font-medium">
                  Bạn đã đạt đủ yêu cầu để tiếp tục hành trình!
                </p>
                <div className="bg-white/50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">
                    Kiến thức: {Math.round(gameState.resources.knowledge)}% | Kinh nghiệm:{' '}
                    {Math.round(gameState.resources.experience)}%
                  </p>
                </div>
                {gameState.currentLocationIndex < locations.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={moveToNextLocation}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-5 h-5" />
                    Điểm dừng tiếp theo →
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="space-y-3"
                  >
                    <p className="text-xl font-semibold text-green-700">
                      🎉 Bạn đã hoàn thành hành trình!
                    </p>
                    <button
                      onClick={() => {
                        setGameState((prev) => ({
                          ...prev,
                          gamePhase: 'victory',
                        }));
                      }}
                      className="w-full py-4 bg-gradient-to-r from-yellow-600 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                    >
                      Xem kết quả chiến thắng 🏆
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Requirements Status - Simplified */}
            {gameState.gamePhase === 'playing' && (
              <div className="mt-6 space-y-3">
                {(() => {
                  const selectedDecisions = gameState.selectedDecisionsAtLocation[currentLocation.id] || [];
                  const resourcesMet = checkLocationRequirements(
                    gameState.resources,
                    currentLocation
                  );
                  const minCountMet = checkMinDecisionsCount(
                    currentLocation,
                    selectedDecisions.length
                  );

                  return resourcesMet && minCountMet ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border-2 border-green-400 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">✅</span>
                        <h4 className="font-bold text-green-800">Đã đạt yêu cầu!</h4>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3 mb-3 space-y-1 text-sm">
                        <p className="text-green-700">
                          ✓ Kiến thức: {Math.round(gameState.resources.knowledge)}%
                        </p>
                        <p className="text-green-700">
                          ✓ Kinh nghiệm: {Math.round(gameState.resources.experience)}%
                        </p>
                        <p className="text-green-700">
                          ✓ Đã chọn {selectedDecisions.length} quyết định
                          {currentLocation.minDecisionsCount && ` / ${currentLocation.minDecisionsCount} tối thiểu`}
                        </p>
                      </div>
                      <p className="text-sm text-green-700 mb-3">
                        Bạn có thể tiếp tục chọn quyết định hoặc chuyển sang điểm dừng tiếp theo.
                      </p>
                      <button
                        onClick={() => {
                          checkLocationComplete(gameState.resources);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        Chuyển đến điểm dừng tiếp theo
                      </button>
                    </motion.div>
                  ) : (
                    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">⚠️</span>
                        <h4 className="font-bold text-yellow-800">Yêu cầu để tiếp tục:</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        {!resourcesMet && (
                          <>
                            {currentLocation.requiredKnowledge &&
                              gameState.resources.knowledge < currentLocation.requiredKnowledge && (
                                <div className="flex items-center justify-between">
                                  <span className="text-yellow-700">• Kiến thức:</span>
                                  <span className="font-bold text-yellow-800">
                                    {Math.round(gameState.resources.knowledge)} /{' '}
                                    {currentLocation.requiredKnowledge}%
                                  </span>
                                </div>
                              )}
                            {currentLocation.requiredExperience &&
                              gameState.resources.experience < currentLocation.requiredExperience && (
                                <div className="flex items-center justify-between">
                                  <span className="text-yellow-700">• Kinh nghiệm:</span>
                                  <span className="font-bold text-yellow-800">
                                    {Math.round(gameState.resources.experience)} /{' '}
                                    {currentLocation.requiredExperience}%
                                  </span>
                                </div>
                              )}
                          </>
                        )}
                        {!minCountMet && currentLocation.minDecisionsCount && (
                          <div className="flex items-center justify-between">
                            <span className="text-yellow-700">• Số quyết định:</span>
                            <span className="font-bold text-yellow-800">
                              {selectedDecisions.length} / {currentLocation.minDecisionsCount} tối thiểu
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-yellow-600 italic mt-3">
                        💡 Tiếp tục chọn quyết định để tích lũy đủ tài nguyên và số lượng quyết định
                      </p>
                    </div>
                  );
                })()}
                
                {/* Warning about failed locations */}
                {gameState.failedLocations.length > 0 && (
                  <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">⚠️</span>
                      <h4 className="font-bold text-red-800">
                        Đã sai tại {gameState.failedLocations.length} quốc gia
                      </h4>
                    </div>
                    <p className="text-sm text-red-700">
                      Nếu sai thêm {3 - gameState.failedLocations.length} quốc gia nữa, bạn sẽ thua!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Decision Button */}
            {gameState.gamePhase === 'playing' && (
              <div className="mt-6 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDecisionModal(true)}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <MapPin className="w-5 h-5" />
                  Chọn quyết định tại {currentLocation.nameVi}
                </motion.button>
                <p className="text-center text-sm text-gray-600">
                  💡 Bạn có thể chọn nhiều quyết định để tích lũy tài nguyên
                </p>
              </div>
            )}
          </div>

          {/* Right: Timeline Map */}
          <div>
            <TimelineMap
              locations={locations}
              currentLocationIndex={gameState.currentLocationIndex}
              completedLocations={gameState.completedLocations}
            />
          </div>
        </div>
      </div>

      {/* Decision Modal */}
      {showDecisionModal && (
        <DecisionModal
          decisions={currentLocation.decisions}
          onSelect={handleDecisionSelect}
          onClose={() => setShowDecisionModal(false)}
          currentResources={gameState.resources}
          selectedDecisions={gameState.selectedDecisionsAtLocation[currentLocation.id] || []}
        />
      )}

      {/* Decision Feedback Modal */}
      <AnimatePresence>
        {decisionFeedback && decisionFeedback.show && (
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
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{decisionFeedback.decision?.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {decisionFeedback.decision?.title}
                </h3>
                <p className="text-sm text-gray-600">Đã thực hiện quyết định</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
                <p className="text-sm font-semibold text-gray-800 mb-3 text-center">
                  📊 Ảnh hưởng đến tài nguyên:
                </p>
                <div className="space-y-2.5">
                  {decisionFeedback.changes.money !== undefined && decisionFeedback.changes.money !== 0 && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-center justify-between bg-white rounded-lg p-2.5"
                    >
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        💰 Tiền bạc
                      </span>
                      <span
                        className={`font-bold text-lg ${
                          decisionFeedback.changes.money > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {decisionFeedback.changes.money > 0 ? '+' : ''}
                        {Math.round(decisionFeedback.changes.money)}₫
                      </span>
                    </motion.div>
                  )}
                  {decisionFeedback.changes.health !== undefined && decisionFeedback.changes.health !== 0 && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center justify-between bg-white rounded-lg p-2.5"
                    >
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        ❤️ Sức khỏe
                      </span>
                      <span
                        className={`font-bold text-lg ${
                          decisionFeedback.changes.health > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {decisionFeedback.changes.health > 0 ? '+' : ''}
                        {Math.round(decisionFeedback.changes.health)}%
                      </span>
                    </motion.div>
                  )}
                  {decisionFeedback.changes.knowledge !== undefined && decisionFeedback.changes.knowledge !== 0 && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between bg-white rounded-lg p-2.5"
                    >
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        📚 Kiến thức
                      </span>
                      <span
                        className={`font-bold text-lg ${
                          decisionFeedback.changes.knowledge > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {decisionFeedback.changes.knowledge > 0 ? '+' : ''}
                        {Math.round(decisionFeedback.changes.knowledge)}%
                      </span>
                    </motion.div>
                  )}
                  {decisionFeedback.changes.experience !== undefined && decisionFeedback.changes.experience !== 0 && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between bg-white rounded-lg p-2.5"
                    >
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        ⭐ Kinh nghiệm
                      </span>
                      <span
                        className={`font-bold text-lg ${
                          decisionFeedback.changes.experience > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {decisionFeedback.changes.experience > 0 ? '+' : ''}
                        {Math.round(decisionFeedback.changes.experience)}%
                      </span>
                    </motion.div>
                  )}
                  {decisionFeedback.changes.time !== undefined && decisionFeedback.changes.time !== 0 && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between bg-white rounded-lg p-2.5"
                    >
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        ⏰ Thời gian
                      </span>
                      <span
                        className={`font-bold text-lg ${
                          decisionFeedback.changes.time > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {decisionFeedback.changes.time > 0 ? '+' : ''}
                        {decisionFeedback.changes.time.toFixed(1)} năm
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-xs text-blue-800 font-semibold mb-1">💡 Ý nghĩa lịch sử:</p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  {decisionFeedback.decision?.historicalSignificance}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Modal */}
      {gameState.pendingEvent && gameState.gamePhase === 'event' && (
        <EventModal event={gameState.pendingEvent} onContinue={handleEventContinue} />
      )}

      {/* Wrong Order Attempt Warning */}
      <AnimatePresence>
        {wrongOrderAttempts && wrongOrderAttempts.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-red-50 border-2 border-red-500 rounded-xl p-4 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div className="flex-1">
                  <h4 className="font-bold text-red-800 mb-2">Chọn sai thứ tự!</h4>
                  <p className="text-sm text-red-700 mb-3">{wrongOrderAttempts.message}</p>
                  
                  {/* Hiển thị hình phạt */}
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <p className="text-xs font-semibold text-red-800 mb-2">📉 Hình phạt:</p>
                    <div className="space-y-1 text-xs">
                      {wrongOrderAttempts.penalty.knowledge && wrongOrderAttempts.penalty.knowledge < 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Kiến thức:</span>
                          <span className="font-bold text-red-600">
                            {wrongOrderAttempts.penalty.knowledge}%
                          </span>
                        </div>
                      )}
                      {wrongOrderAttempts.penalty.experience && wrongOrderAttempts.penalty.experience < 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Kinh nghiệm:</span>
                          <span className="font-bold text-red-600">
                            {wrongOrderAttempts.penalty.experience}%
                          </span>
                        </div>
                      )}
                      {wrongOrderAttempts.penalty.money && wrongOrderAttempts.penalty.money < 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Tiền bạc:</span>
                          <span className="font-bold text-red-600">
                            {wrongOrderAttempts.penalty.money}₫
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-red-600 mt-3 italic">
                    💡 Hãy tuân thủ đúng thứ tự lịch sử để tránh mất tài nguyên!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HCMStrategyGame;
