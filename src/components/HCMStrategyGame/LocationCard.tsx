import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, BookOpen } from 'lucide-react';
import { Location } from '../../types/hcmStrategy';

interface LocationCardProps {
  location: Location;
  currentYear: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, currentYear }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${location.bgGradient} rounded-2xl shadow-xl p-6 text-white`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{location.flag}</div>
          <div>
            <h2 className="text-2xl font-bold">{location.nameVi}</h2>
            <p className="text-sm opacity-90">{location.name}</p>
          </div>
        </div>
        <div className="text-5xl">{location.icon}</div>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-semibold">Thời kỳ: {location.period}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Năm hiện tại: {currentYear}</span>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
        <p className="text-sm leading-relaxed">{location.description}</p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-start gap-2">
          <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold mb-1">Bối cảnh lịch sử:</p>
            <p className="text-xs leading-relaxed opacity-95">{location.historicalContext}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
