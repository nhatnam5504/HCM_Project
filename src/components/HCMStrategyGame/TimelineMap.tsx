import React from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin } from 'lucide-react';
import { Location } from '../../types/hcmStrategy';

interface TimelineMapProps {
  locations: Location[];
  currentLocationIndex: number;
  completedLocations: string[];
}

const TimelineMap: React.FC<TimelineMapProps> = ({
  locations,
  currentLocationIndex,
  completedLocations,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-red-600" />
        Hành trình
      </h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />

        <div className="space-y-6">
          {locations.map((location, index) => {
            const isCompleted = completedLocations.includes(location.id);
            const isCurrent = index === currentLocationIndex;
            const isPast = index < currentLocationIndex;

            return (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-4"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      isCurrent
                        ? 'bg-red-600 border-red-700 scale-125'
                        : isCompleted
                        ? 'bg-green-500 border-green-600'
                        : isPast
                        ? 'bg-yellow-500 border-yellow-600'
                        : 'bg-gray-300 border-gray-400'
                    } transition-all`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : isCurrent ? (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pb-6 ${
                    index < locations.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div
                    className={`p-4 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-r from-red-50 to-yellow-50 border-2 border-red-300 shadow-md'
                        : isCompleted
                        ? 'bg-green-50 border border-green-200'
                        : isPast
                        ? 'bg-yellow-50 border border-yellow-200'
                        : 'bg-gray-50 border border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{location.flag}</span>
                      <h4 className="font-bold text-gray-800">{location.nameVi}</h4>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-full font-medium">
                          Hiện tại
                        </span>
                      )}
                      {isCompleted && (
                        <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-medium">
                          Hoàn thành
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{location.period}</p>
                    {isCurrent && (
                      <p className="text-xs text-gray-500 mt-1">{location.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineMap;
