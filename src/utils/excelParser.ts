import * as XLSX from 'xlsx';
import type { ExcelQuestionRow } from '../types/quiz';

/**
 * Excel Parser for Quiz Questions
 * 
 * Expected Excel format:
 * | question | optionA | optionB | optionC | optionD | correct | category (optional) |
 * |----------|---------|---------|---------|---------|---------|---------------------|
 * | Text...  | Option  | Option  | Option  | Option  | B       | general            |
 */

export class ExcelQuestionParser {
  /**
   * Parse Excel file to question array
   */
  static async parseFile(file: File): Promise<ExcelQuestionRow[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });

          // Get first sheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            raw: false,
            defval: '',
          });

          // Validate and transform
          const questions = this.validateAndTransform(jsonData);
          resolve(questions);
        } catch (error) {
          reject(new Error(`Failed to parse Excel file: ${error}`));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsBinaryString(file);
    });
  }

  /**
   * Validate and transform raw Excel data
   */
  private static validateAndTransform(data: any[]): ExcelQuestionRow[] {
    const questions: ExcelQuestionRow[] = [];
    const errors: string[] = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2; // Excel row (1-indexed + header)

      try {
        // Required fields
        const question = this.getField(row, ['question', 'câu hỏi', 'text']);
        const optionA = this.getField(row, ['optionA', 'optiona', 'a', 'đáp án A']);
        const optionB = this.getField(row, ['optionB', 'optionb', 'b', 'đáp án B']);
        const optionC = this.getField(row, ['optionC', 'optionc', 'c', 'đáp án C']);
        const optionD = this.getField(row, ['optionD', 'optiond', 'd', 'đáp án D']);
        const correct = this.getField(row, ['correct', 'đáp án', 'đáp án đúng']);

        // Validate required fields
        if (!question || !optionA || !optionB || !optionC || !optionD || !correct) {
          errors.push(`Row ${rowNumber}: Missing required fields`);
          return;
        }

        // Validate correct answer
        const correctUpper = correct.toString().toUpperCase().trim();
        if (!['A', 'B', 'C', 'D'].includes(correctUpper)) {
          errors.push(`Row ${rowNumber}: Invalid correct answer "${correct}" (must be A, B, C, or D)`);
          return;
        }

        // Optional category
        const category = this.getField(row, ['category', 'danh mục', 'chủ đề']) || 'general';

        questions.push({
          question: question.trim(),
          optionA: optionA.trim(),
          optionB: optionB.trim(),
          optionC: optionC.trim(),
          optionD: optionD.trim(),
          correct: correctUpper as 'A' | 'B' | 'C' | 'D',
          category: category.trim(),
        });
      } catch (error) {
        errors.push(`Row ${rowNumber}: ${error}`);
      }
    });

    if (errors.length > 0) {
      throw new Error(`Validation errors:\n${errors.join('\n')}`);
    }

    if (questions.length === 0) {
      throw new Error('No valid questions found in Excel file');
    }

    return questions;
  }

  /**
   * Get field value from row (case-insensitive, multiple possible keys)
   */
  private static getField(row: any, possibleKeys: string[]): string | undefined {
    for (const key of possibleKeys) {
      // Try exact match
      if (row[key] !== undefined) {
        return row[key];
      }

      // Try case-insensitive match
      const found = Object.keys(row).find(
        (k) => k.toLowerCase() === key.toLowerCase()
      );
      if (found) {
        return row[found];
      }
    }
    return undefined;
  }

  /**
   * Generate sample Excel template
   */
  static generateTemplate(): Blob {
    const sampleData = [
      {
        question: 'Đại hội Đảng nào đánh dấu bước ngoặt lịch sử với chính sách Đổi mới?',
        optionA: 'Đại hội IV (1976)',
        optionB: 'Đại hội V (1982)',
        optionC: 'Đại hội VI (1986)',
        optionD: 'Đại hội VII (1991)',
        correct: 'C',
        category: 'Đổi mới',
      },
      {
        question: 'Cải cách giá-lương-tiền được thực hiện vào năm nào?',
        optionA: '1982',
        optionB: '1985',
        optionC: '1986',
        optionD: '1989',
        correct: 'B',
        category: 'Kinh tế',
      },
      {
        question: 'Việt Nam gia nhập WTO vào năm nào?',
        optionA: '2001',
        optionB: '2006',
        optionC: '2010',
        optionD: '2015',
        correct: 'B',
        category: 'Hội nhập',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');

    // Generate binary string
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }

  /**
   * Download template
   */
  static downloadTemplate(filename: string = 'quiz-template.xlsx') {
    const blob = this.generateTemplate();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}

export default ExcelQuestionParser;
