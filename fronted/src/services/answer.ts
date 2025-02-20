import { DefaultService } from "@/generated";
import type { AnswerVO } from "@/generated";
export type { AnswerVO };
export interface AnswerDetail {
  questionId: string;
  subject: string;
  question: string;
  type: string;
  answerA?: string;
  answerB?: string;
  answerC?: string;
  answerD?: string;
  rightAnswer?: string;
  analysis?: string;
  score: number;
  section?: string;
  level?: string;
  answer?: string;
}

export enum AnswerType {
  SINGLE = "选择题",
  FILL = "填空题",
  JUDGE = "判断题",
}

export const GetAnswerListApi = async (page: number = 1, size: number = 20) => {
  return await DefaultService.getApiV1Answers(page, size);
};

export const GetAnswerListNoPageApi = async (type?: string) => {
  return await DefaultService.getApiV1AnswersByType(type ? type : "");
};
export const GetAnswerInfoApi = async (questionId: string, type: string) => {
  return await DefaultService.getApiV1AnswersByQuestionIdAndType(
    questionId,
    type,
  );
};
