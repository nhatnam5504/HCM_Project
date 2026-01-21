// Types cho game Mèo Nổ - Hành Trình Tư Tưởng Hồ Chí Minh

export type TeamId = 'A' | 'B' | 'C' | 'D';

export type QuestionType = 'GHEP_CAU' | 'TRA_LOI' | 'MO_PHONG' | 'GHEP_HINH';

// Ghép câu trả lời (Action -> Goal -> Result)
export interface MatchingQuestion {
  id: string;
  type: 'GHEP_CAU';
  title: string;
  context: string; // e.g., "🇫🇷 Pháp – Báo chí"
  actions: string[];
  goals: string[];
  results: string[];
  correctAnswer: {
    action: string;
    goal: string;
    result: string;
  };
}

// Trả lời 3 câu hỏi liên tiếp
export interface MultipleChoiceQuestion {
  id: string;
  type: 'TRA_LOI';
  title: string;
  context: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

// Mô phỏng đường Bác đi (chọn & sắp xếp)
export interface PathQuestion {
  id: string;
  type: 'MO_PHONG';
  title: string;
  context: string;
  allCards: string[]; // Bao gồm cả thẻ đúng và thẻ nhiễu
  correctSequence: string[]; // Thứ tự đúng (chỉ chứa thẻ đúng)
}

// Ghép hình với ý nghĩa
export interface ImageMatchQuestion {
  id: string;
  type: 'GHEP_HINH';
  title: string;
  context: string;
  pairs: {
    image: string; // emoji hoặc key
    label: string;
    meaning: string;
    isCorrect: boolean; // true = ghép được, false = bẫy
  }[];
  correctPairsCount: number; // Số cặp đúng cần ghép
}

export type Question = MatchingQuestion | MultipleChoiceQuestion | PathQuestion | ImageMatchQuestion;

// Trạng thái câu hỏi
export interface QuestionStatus {
  id: string;
  letter: string; // A-Z
  used: boolean;
  question: Question;
}

// Trạng thái nhóm
export interface TeamState {
  id: TeamId;
  name: string;
  totalScore: number;
  explosionModifier: number; // 0, 10, 20 - áp dụng cho lượt sau
  hasWonPrize: boolean;
}

// Card rút được
export interface DrawnCard {
  type: 'POINT' | 'EXPLOSION';
  points?: number; // 1-5 nếu là POINT
}

// Trạng thái lượt chơi
export interface TurnState {
  currentTeamId: TeamId;
  selectedQuestionId: string | null;
  questionAnsweredCorrectly: boolean | null;
  turnPoints: number; // Điểm trong lượt hiện tại
  drawCount: number; // Số lần đã rút
  drawnCards: DrawnCard[]; // Các thẻ đã rút
  isBackupMode: boolean; // Đang ở chế độ backup (>=16 điểm + nổ)
  backupAnswered: boolean | null; // null = chưa trả lời, true/false = kết quả
  turnEnded: boolean;
  turnResult: 'STOPPED' | 'EXPLODED' | 'BACKUP_SUCCESS' | 'BACKUP_FAILED' | null;
}

// Trạng thái game tổng thể
export interface GameState {
  teams: Record<TeamId, TeamState>;
  questions: QuestionStatus[];
  currentTurn: TurnState | null;
  prizeCount: number;
  turnHistory: TurnHistory[];
  gameEnded: boolean;
  winner: TeamId | null;
}

// Lịch sử lượt chơi
export interface TurnHistory {
  teamId: TeamId;
  questionId: string;
  earnedPoints: number;
  drawCount: number;
  result: 'STOPPED' | 'EXPLODED' | 'BACKUP_SUCCESS' | 'BACKUP_FAILED';
}

// Explosion rate config
export interface ExplosionRates {
  draw1: { point: number; explosion: number };
  draw2: { point: number; explosion: number };
  draw3: { point: number; explosion: number };
  draw4: { point: number; explosion: number };
  draw5: { point: number; explosion: number };
}

export const DEFAULT_EXPLOSION_RATES: ExplosionRates = {
  draw1: { point: 85, explosion: 15 },
  draw2: { point: 70, explosion: 30 },
  draw3: { point: 50, explosion: 50 },
  draw4: { point: 30, explosion: 70 },
  draw5: { point: 15, explosion: 85 },
};

// Backup question
export interface BackupQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
