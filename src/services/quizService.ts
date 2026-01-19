import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  query,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type {
  Quiz,
  QuizQuestion,
  QuizSubmission,
  ExcelQuestionRow,
  HighScore,
} from '../types/quiz';

// Collection references
const QUIZZES_COLLECTION = 'quizzes';
const QUESTIONS_SUBCOLLECTION = 'questions';
const SUBMISSIONS_COLLECTION = 'submissions';
const HIGHSCORES_COLLECTION = 'highscores';

/**
 * Quiz Service - handles all Firebase operations for the Quiz system
 */
export class QuizService {
  /**
   * Get quiz by ID
   */
  static async getQuiz(quizId: string): Promise<Quiz | null> {
    try {
      const quizDoc = await getDoc(doc(db, QUIZZES_COLLECTION, quizId));
      if (!quizDoc.exists()) {
        return null;
      }

      const data = quizDoc.data();
      return {
        id: quizDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Quiz;
    } catch (error) {
      console.error('Error getting quiz:', error);
      throw error;
    }
  }

  /**
   * Get all questions for a quiz
   */
  static async getAllQuestions(quizId: string): Promise<QuizQuestion[]> {
    try {
      const questionsRef = collection(
        db,
        QUIZZES_COLLECTION,
        quizId,
        QUESTIONS_SUBCOLLECTION
      );
      const q = query(questionsRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as QuizQuestion[];
    } catch (error) {
      console.error('Error getting questions:', error);
      throw error;
    }
  }

  /**
   * Get random questions for quiz attempt
   * Returns exactly `count` questions, shuffled
   */
  static async getRandomQuestions(
    quizId: string,
    count: number = 20
  ): Promise<QuizQuestion[]> {
    try {
      const allQuestions = await this.getAllQuestions(quizId);

      if (allQuestions.length < count) {
        throw new Error(
          `Not enough questions. Required: ${count}, Available: ${allQuestions.length}`
        );
      }

      // Shuffle and select random questions
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, count);

      return selected;
    } catch (error) {
      console.error('Error getting random questions:', error);
      throw error;
    }
  }

  /**
   * Submit quiz results and add to high scores
   */
  static async submitQuiz(
    submission: Omit<QuizSubmission, 'id' | 'createdAt'>
  ): Promise<string> {
    try {
      const submissionData = {
        ...submission,
        createdAt: Timestamp.now(),
      };

      // Submit to submissions collection
      const docRef = await addDoc(
        collection(db, SUBMISSIONS_COLLECTION),
        submissionData
      );

      // Add to high scores collection
      const percentage = Math.round((submission.score / submission.totalQuestions) * 100);
      await addDoc(collection(db, HIGHSCORES_COLLECTION), {
        userName: submission.userName,
        score: submission.score,
        totalQuestions: submission.totalQuestions,
        percentage,
        timeSpent: submission.timeSpent,
        createdAt: Timestamp.now(),
      });

      console.log('✅ Quiz submitted successfully:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  }

  /**
   * Get recent submissions (for statistics/leaderboard)
   */
  static async getRecentSubmissions(
    limit: number = 10
  ): Promise<QuizSubmission[]> {
    try {
      const q = query(
        collection(db, SUBMISSIONS_COLLECTION),
        orderBy('createdAt', 'desc'),
        firestoreLimit(limit)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as QuizSubmission[];
    } catch (error) {
      console.error('Error getting submissions:', error);
      throw error;
    }
  }

  /**
   * Get top high scores (leaderboard)
   * Sorted by: score DESC, then timeSpent ASC (faster completion time wins)
   */
  static async getHighScores(limit: number = 15): Promise<HighScore[]> {
    try {
      // Get more records to ensure we have enough after sorting
      const q = query(
        collection(db, HIGHSCORES_COLLECTION),
        orderBy('score', 'desc'),
        firestoreLimit(limit * 3) // Get 3x to have enough for secondary sort
      );

      const snapshot = await getDocs(q);

      const scores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as HighScore[];

      // Sort by score DESC, then by timeSpent ASC (faster time wins for same score)
      scores.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score; // Higher score first
        }
        return a.timeSpent - b.timeSpent; // Faster time first
      });

      // Return only requested limit
      return scores.slice(0, limit);
    } catch (error) {
      console.error('Error getting high scores:', error);
      throw error;
    }
  }

  /**
   * ADMIN: Create or update quiz
   */
  static async createOrUpdateQuiz(
    quizId: string,
    quizData: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    try {
      const quizRef = doc(db, QUIZZES_COLLECTION, quizId);
      const existingQuiz = await getDoc(quizRef);

      const data = {
        ...quizData,
        updatedAt: Timestamp.now(),
        ...(existingQuiz.exists()
          ? {}
          : { createdAt: Timestamp.now() }),
      };

      await setDoc(quizRef, data, { merge: true });
      console.log('✅ Quiz created/updated:', quizId);
    } catch (error) {
      console.error('Error creating/updating quiz:', error);
      throw error;
    }
  }

  /**
   * ADMIN: Delete all questions in a quiz
   */
  static async deleteAllQuestions(quizId: string): Promise<number> {
    try {
      const questionsRef = collection(
        db,
        QUIZZES_COLLECTION,
        quizId,
        QUESTIONS_SUBCOLLECTION
      );
      const snapshot = await getDocs(questionsRef);

      if (snapshot.empty) {
        return 0;
      }

      const batch = writeBatch(db);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log(`✅ Deleted ${snapshot.size} questions`);
      return snapshot.size;
    } catch (error) {
      console.error('Error deleting questions:', error);
      throw error;
    }
  }

  /**
   * ADMIN: Batch import questions from parsed Excel data
   */
  static async importQuestions(
    quizId: string,
    questions: ExcelQuestionRow[],
    clearOldQuestions: boolean = false
  ): Promise<void> {
    try {
      // Delete old questions if requested
      if (clearOldQuestions) {
        const deletedCount = await this.deleteAllQuestions(quizId);
        console.log(`🗑️ Cleared ${deletedCount} old questions`);
      }

      const batch = writeBatch(db);
      const questionsRef = collection(
        db,
        QUIZZES_COLLECTION,
        quizId,
        QUESTIONS_SUBCOLLECTION
      );

      questions.forEach((row, index) => {
        const questionDoc = doc(questionsRef);
        const correctIndex = this.parseCorrectAnswer(row.correct);

        batch.set(questionDoc, {
          text: row.question,
          options: [row.optionA, row.optionB, row.optionC, row.optionD],
          correctIndex,
          category: row.category || 'general',
          order: index,
        });
      });

      await batch.commit();
      console.log(`✅ Imported ${questions.length} questions successfully`);
    } catch (error) {
      console.error('Error importing questions:', error);
      throw error;
    }
  }

  /**
   * Helper: Parse correct answer (A, B, C, D) to index (0, 1, 2, 3)
   */
  private static parseCorrectAnswer(answer: string): number {
    const map: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
    return map[answer.toUpperCase()] ?? 0;
  }

  /**
   * Helper: Shuffle array
   */
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

export default QuizService;
