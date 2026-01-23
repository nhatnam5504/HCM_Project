import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Heart, BookOpen, Award, Clock, AlertTriangle } from 'lucide-react';
import { ResourceState } from '../../types/hcmStrategy';

interface ResourceBarProps {
  resources: ResourceState;
  showWarnings?: boolean;
}

const ResourceBar: React.FC<ResourceBarProps> = ({ resources, showWarnings = true }) => {
  const getResourceColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'money':
        return <DollarSign className="w-4 h-4" />;
      case 'health':
        return <Heart className="w-4 h-4" />;
      case 'knowledge':
        return <BookOpen className="w-4 h-4" />;
      case 'experience':
        return <Award className="w-4 h-4" />;
      case 'time':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const ResourceItem: React.FC<{
    label: string;
    value: number;
    max: number;
    icon: React.ReactNode;
    unit?: string;
    warning?: boolean;
  }> = ({ label, value, max, icon, unit = '', warning }) => {
    const percentage = Math.min(100, (value / max) * 100);
    const color = getResourceColor(value, max);

    return (
      <div className="flex-1 min-w-[120px]">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
            {icon}
            <span>{label}</span>
          </div>
          <div className="flex items-center gap-1">
            {warning && value < max * 0.3 && (
              <AlertTriangle className="w-3 h-3 text-red-500" />
            )}
            <span className="text-xs font-bold text-gray-800">
              {Math.round(value)}
              {unit}
            </span>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`h-full ${color} transition-colors`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-gray-200">
      <div className="flex flex-wrap gap-4">
        <ResourceItem
          label="Tiền"
          value={resources.money}
          max={1000}
          icon={getResourceIcon('money')}
          unit="₫"
          warning={showWarnings && resources.money < 50}
        />
        <ResourceItem
          label="Sức khỏe"
          value={resources.health}
          max={100}
          icon={getResourceIcon('health')}
          unit="%"
          warning={showWarnings && resources.health < 30}
        />
        <ResourceItem
          label="Kiến thức"
          value={resources.knowledge}
          max={100}
          icon={getResourceIcon('knowledge')}
          unit="%"
        />
        <ResourceItem
          label="Kinh nghiệm"
          value={resources.experience}
          max={100}
          icon={getResourceIcon('experience')}
          unit="%"
        />
        <ResourceItem
          label="Thời gian"
          value={resources.time}
          max={30}
          icon={getResourceIcon('time')}
          unit=" năm"
        />
      </div>
    </div>
  );
};

export default ResourceBar;
