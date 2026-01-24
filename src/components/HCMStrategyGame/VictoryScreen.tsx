import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';
import { GameState } from '../../types/hcmStrategy';

interface VictoryScreenProps {
  gameState: GameState;
  onRestart: () => void;
  onHome: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ gameState, onRestart, onHome }) => {
  const navigate = useNavigate();
  const isVictory = gameState.gamePhase === 'victory';
  const finalScore =
    gameState.resources.knowledge * 2 +
    gameState.resources.experience * 2 +
    gameState.resources.health +
    gameState.resources.money / 10;

  // Determine game over reason
  const getGameOverReason = (): string => {
    if (gameState.failedLocations && gameState.failedLocations.length >= 3) {
      return `Đã sai tại ${gameState.failedLocations.length} quốc gia - Không tuân thủ đúng thứ tự lịch sử và thiếu các quyết định quan trọng`;
    }
    if (gameState.resources.money <= 0) {
      return 'Hết tiền - Không thể tiếp tục hành trình';
    }
    if (gameState.resources.health <= 0) {
      return 'Sức khỏe xuống 0 - Phải dừng lại để hồi phục';
    }
    if (gameState.currentYear >= 1941) {
      return 'Hết thời gian - Chưa hoàn thành hành trình';
    }
    return 'Không đạt yêu cầu';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden ${isVictory
            ? 'bg-gradient-to-br from-[#fafafa] to-[#ffd700]/20 border-4 border-[#ffd700]'
            : 'bg-gradient-to-br from-[#fafafa] to-red-100 border-4 border-[#ac0705]'
          }`}
      >
        <div
          className={`p-8 text-center ${isVictory
              ? 'bg-gradient-to-r from-[#ffd700] to-[#ac0705]'
              : 'bg-gradient-to-r from-[#ac0705] to-[#8b1a1a]'
            } text-white`}
        >
          {isVictory ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-8xl mb-4"
              >
                🏆
              </motion.div>
              <h1 className="text-4xl font-bold mb-2">Hoàn Thành Hành Trình!</h1>
              <p className="text-xl opacity-90">
                Bạn đã thành công trong hành trình 30 năm tìm đường cứu nước
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-8xl mb-4"
              >
                😢
              </motion.div>
              <h1 className="text-4xl font-bold mb-2">Game Over</h1>
              <p className="text-xl opacity-90 mb-3">
                Hành trình đã kết thúc. Hãy thử lại để hoàn thành sứ mệnh!
              </p>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-red-800 mb-1">Lý do thất bại:</p>
                <p className="text-base text-red-700">{getGameOverReason()}</p>
              </div>
            </>
          )}
        </div>

        <div className="p-8 space-y-6">
          {/* Final Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <p className="text-xs text-gray-600 mb-1">Kiến thức</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(gameState.resources.knowledge)}%
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <p className="text-xs text-gray-600 mb-1">Kinh nghiệm</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(gameState.resources.experience)}%
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <p className="text-xs text-gray-600 mb-1">Sức khỏe</p>
              <p className="text-2xl font-bold text-red-600">
                {Math.round(gameState.resources.health)}%
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <p className="text-xs text-gray-600 mb-1">Điểm số</p>
              <p className="text-2xl font-bold text-yellow-600">{Math.round(finalScore)}</p>
            </div>
          </div>

          {/* Achievements */}
          {gameState.achievements.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Thành tích đạt được:
              </h3>
              <div className="space-y-2">
                {gameState.achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-gray-800">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Locations */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Điểm dừng đã hoàn thành:</h3>
            <p className="text-lg font-semibold text-gray-700">
              {gameState.completedLocations.length} / {10} điểm dừng
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onRestart}
              className="flex-1 py-4 bg-gradient-to-r from-[#ac0705] to-[#ffd700] text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Hành trình mới
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VictoryScreen;
