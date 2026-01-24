import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, DollarSign, Heart, BookOpen, Award, Clock } from 'lucide-react';
import { Decision, ResourceChange } from '../../types/hcmStrategy';

interface DecisionModalProps {
  decisions: Decision[];
  onSelect: (decisionId: string) => void;
  onClose: () => void;
  currentResources: { money: number; health: number; knowledge: number; experience: number };
  selectedDecisions: string[]; // Decisions already selected at this location
}

const DecisionModal: React.FC<DecisionModalProps> = ({
  decisions,
  onSelect,
  onClose,
  currentResources,
  selectedDecisions,
}) => {
  const canAfford = (cost: ResourceChange): boolean => {
    if (cost.money && currentResources.money + cost.money < 0) return false;
    if (cost.health && currentResources.health + cost.health < 0) return false;
    if (cost.knowledge && currentResources.knowledge + (cost.knowledge || 0) < 0) return false;
    if (cost.experience && currentResources.experience + (cost.experience || 0) < 0) return false;
    return true;
  };

  const canSelect = (decision: Decision): boolean => {
    // Check if already selected
    if (selectedDecisions.includes(decision.id)) return false;

    // Cho phép chọn tất cả quyết định (không chặn)
    return true;
  };

  const formatResourceChange = (change: ResourceChange): string => {
    const parts: string[] = [];
    if (change.money) {
      const sign = change.money > 0 ? '+' : '';
      parts.push(`${sign}${change.money}₫`);
    }
    if (change.health) {
      const sign = change.health > 0 ? '+' : '';
      parts.push(`${sign}${change.health}% sức khỏe`);
    }
    if (change.knowledge) {
      const sign = change.knowledge > 0 ? '+' : '';
      parts.push(`${sign}${change.knowledge}% kiến thức`);
    }
    if (change.experience) {
      const sign = change.experience > 0 ? '+' : '';
      parts.push(`${sign}${change.experience}% kinh nghiệm`);
    }
    if (change.time) {
      const sign = change.time > 0 ? '+' : '';
      parts.push(`${sign}${change.time} năm`);
    }
    return parts.join(', ');
  };

  const getDecisionTypeColor = (type: string): string => {
    switch (type) {
      case 'work':
        return 'from-blue-500 to-cyan-500';
      case 'study':
        return 'from-purple-500 to-pink-500';
      case 'join':
        return 'from-green-500 to-emerald-500';
      case 'travel':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getDecisionTypeLabel = (type: string): string => {
    switch (type) {
      case 'work':
        return 'Công việc';
      case 'study':
        return 'Học tập';
      case 'join':
        return 'Tham gia';
      case 'travel':
        return 'Đi tiếp';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-r from-[#ac0705] to-[#ffd700] text-white p-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-2xl font-bold">Chọn quyết định</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {(() => {
              // Đảo thứ tự các quyết định để đánh lừa người chơi
              const shuffledDecisions = [...decisions].sort(() => Math.random() - 0.5);

              return shuffledDecisions.map((decision) => {
                const affordable = canAfford(decision.cost);
                const selectable = canSelect(decision);
                const alreadySelected = selectedDecisions.includes(decision.id);
                const costText = formatResourceChange(decision.cost);
                const rewardText = formatResourceChange(decision.reward);

                return (
                  <motion.div
                    key={decision.id}
                    whileHover={selectable && affordable ? { scale: 1.02 } : {}}
                    whileTap={selectable && affordable ? { scale: 0.98 } : {}}
                    className={`border-2 rounded-xl overflow-hidden transition-all ${alreadySelected
                        ? 'border-[#ffd700] bg-[#ffd700]/10'
                        : selectable && affordable
                          ? 'border-gray-300 hover:border-[#ac0705] cursor-pointer'
                          : 'border-gray-200 opacity-60 cursor-not-allowed'
                      }`}
                  >
                    <div className={`bg-gradient-to-r ${getDecisionTypeColor(decision.type)} p-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{decision.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold text-white">{decision.title}</h3>
                              <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium text-white">
                                {getDecisionTypeLabel(decision.type)}
                              </span>
                            </div>
                            <p className="text-sm text-white/90 mt-1">{decision.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mb-1">Chi phí:</p>
                          <p className="text-sm text-red-600 font-medium">{costText || 'Không có'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mb-1">Phần thưởng:</p>
                          <p className="text-sm text-green-600 font-medium">
                            {rewardText || 'Không có'}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 mb-1">Thời gian:</p>
                        <p className="text-sm text-gray-800">{decision.duration} năm</p>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                        <p className="text-xs font-semibold text-blue-800 mb-1">
                          Ý nghĩa lịch sử:
                        </p>
                        <p className="text-xs text-blue-700 leading-relaxed">
                          {decision.historicalSignificance}
                        </p>
                      </div>

                      {/* Status messages */}
                      {alreadySelected && (
                        <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded">
                          <p className="text-xs text-green-700 font-semibold">
                            ✅ Đã chọn quyết định này
                          </p>
                        </div>
                      )}

                      {!affordable && selectable && !alreadySelected && (
                        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                          <p className="text-xs text-red-600">
                            ⚠️ Không đủ tài nguyên để thực hiện quyết định này
                          </p>
                        </div>
                      )}


                      {selectable && affordable && !alreadySelected && (
                        <button
                          onClick={() => {
                            onSelect(decision.id);
                            // Don't close modal - allow selecting multiple decisions
                          }}
                          className={`w-full mt-4 py-3 bg-gradient-to-r ${getDecisionTypeColor(decision.type)} text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                        >
                          Chọn quyết định này
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              });
            })()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DecisionModal;
