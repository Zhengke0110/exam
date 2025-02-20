export interface ExamResult {
  examCode: number;
  score: number;
  totalScore: number;
  correctCount: number;
  totalCount: number;
  wrongQuestions: WrongQuestion[];
  submitTime: string;
}

export interface WrongQuestion {
  questionId: string;
  question: string;
  type: string;
  yourAnswer: string;
  rightAnswer: string;
  score: number;
  analysis?: string;
}
