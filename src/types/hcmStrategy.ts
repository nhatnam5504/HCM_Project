// Type definitions for HCM Strategy Game
// Mini game chiến lược về hành trình bôn ba của Bác Hồ (1911-1941)

export type ResourceType = 'money' | 'health' | 'knowledge' | 'experience' | 'time';

export interface ResourceState {
  money: number; // Tiền bạc (0-1000)
  health: number; // Sức khỏe (0-100)
  knowledge: number; // Kiến thức (0-100)
  experience: number; // Kinh nghiệm (0-100)
  time: number; // Thời gian còn lại (theo năm)
}

export interface ResourceChange {
  money?: number;
  health?: number;
  knowledge?: number;
  experience?: number;
  time?: number;
}

export interface Location {
  id: string;
  name: string;
  nameVi: string;
  period: string; // "1911-1912"
  description: string;
  flag: string; // Emoji flag
  bgGradient: string; // Tailwind gradient class
  icon: string; // Emoji icon
  decisions: Decision[];
  requiredKnowledge?: number; // Kiến thức tối thiểu để tiếp tục
  requiredExperience?: number; // Kinh nghiệm tối thiểu
  requiredDecisions?: string[]; // Các quyết định BẮT BUỘC phải chọn tại điểm dừng này
  minDecisionsCount?: number; // Số quyết định tối thiểu phải chọn tại điểm dừng này
  events?: GameEvent[]; // Sự kiện có thể xảy ra tại đây
  historicalContext: string; // Bối cảnh lịch sử
}

export interface Decision {
  id: string;
  type: 'work' | 'study' | 'join' | 'travel';
  title: string;
  description: string;
  cost: ResourceChange; // Chi phí
  reward: ResourceChange; // Phần thưởng
  duration: number; // Thời gian thực hiện (năm)
  historicalSignificance: string; // Ý nghĩa lịch sử
  icon: string; // Emoji icon
  available?: boolean; // Có sẵn hay không (có thể bị khóa)
  requiredDecisions?: string[]; // Các quyết định phải làm trước (theo thứ tự lịch sử)
  isRequired?: boolean; // Quyết định bắt buộc tại điểm dừng này
  minKnowledge?: number; // Kiến thức tối thiểu để chọn quyết định này
  minExperience?: number; // Kinh nghiệm tối thiểu để chọn quyết định này
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  effect: ResourceChange; // Ảnh hưởng đến tài nguyên
  probability: number; // Xác suất xảy ra (0-1)
  historicalContext: string;
  icon: string;
  type: 'positive' | 'negative' | 'neutral';
}

export interface GameState {
  currentLocationIndex: number;
  resources: ResourceState;
  completedLocations: string[];
  currentYear: number;
  gamePhase: 'intro' | 'playing' | 'event' | 'location-complete' | 'victory' | 'game-over';
  pendingEvent: GameEvent | null;
  decisionHistory: DecisionHistory[];
  achievements: string[];
  selectedDecisionsAtLocation: Record<string, string[]>; // Quyết định đã chọn tại mỗi điểm dừng
  failedLocations: string[]; // Các quốc gia đã sai (không chọn đủ quyết định bắt buộc hoặc sai thứ tự)
}

export interface DecisionHistory {
  locationId: string;
  decisionId: string;
  year: number;
  resourcesBefore: ResourceState;
  resourcesAfter: ResourceState;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: GameState) => boolean;
}

export const INITIAL_RESOURCES: ResourceState = {
  money: 100,
  health: 100,
  knowledge: 0,
  experience: 0,
  time: 30, // 30 năm (1911-1941)
};

export const START_YEAR = 1911;
export const END_YEAR = 1941;
