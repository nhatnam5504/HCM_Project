import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { GameEvent, ResourceChange } from '../../types/hcmStrategy';

interface EventModalProps {
  event: GameEvent;
  onContinue: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onContinue }) => {
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

  const getEventTypeColor = (type: string): string => {
    switch (type) {
      case 'positive':
        return 'from-green-500 to-emerald-500';
      case 'negative':
        return 'from-red-500 to-orange-500';
      case 'neutral':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const effectText = formatResourceChange(event.effect);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden`}
        >
          <div
            className={`bg-gradient-to-r ${getEventTypeColor(event.type)} text-white p-6 text-center`}
          >
            <div className="text-6xl mb-3">{event.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{event.description}</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-xs font-semibold text-blue-800 mb-2">Bối cảnh lịch sử:</p>
              <p className="text-sm text-blue-700 leading-relaxed">{event.historicalContext}</p>
            </div>

            {effectText && (
              <div
                className={`p-4 rounded-lg ${event.type === 'positive'
                    ? 'bg-green-50 border-2 border-green-300'
                    : event.type === 'negative'
                      ? 'bg-red-50 border-2 border-red-300'
                      : 'bg-blue-50 border-2 border-blue-300'
                  }`}
              >
                <p className="text-sm font-semibold mb-1">
                  {event.type === 'positive' ? '✅ Ảnh hưởng tích cực:' : '⚠️ Ảnh hưởng:'}
                </p>
                <p
                  className={`text-base font-bold ${event.type === 'positive'
                      ? 'text-green-700'
                      : event.type === 'negative'
                        ? 'text-red-700'
                        : 'text-blue-700'
                    }`}
                >
                  {effectText}
                </p>
              </div>
            )}

            <button
              onClick={onContinue}
              className={`w-full py-4 bg-gradient-to-r ${getEventTypeColor(event.type)} text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2`}
            >
              Tiếp tục
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
