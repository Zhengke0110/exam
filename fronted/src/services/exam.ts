import { DefaultService } from "@/generated";
import type { ExamManage, Score, Item } from "@/generated";
export type { ExamManage, Score, Item };
export const GetExamAllApi = async () => {
  return DefaultService.getApiV1Exams();
};
export const GetExamByExamCode = async (examCode: number) => {
  return DefaultService.getApiV1Scores1(examCode);
};

export const GetExamByStudentId = async (studentId: number) => {
  return DefaultService.getApiV1Score1(studentId);
};

export const GetExamInfoByExamCode = async (examCode: number) => {
  return await DefaultService.getApiV1Exam(examCode);
};

export const UpdateExamInfoApi = async (examManage: ExamManage) => {
  return await DefaultService.putApiV1Exam(examManage);
};

export const CreateExamApi = async (examManage: ExamManage) => {
  return await DefaultService.postApiV1Exam(examManage);
};

export const DeleteExamApi = async (examCode: number) => {
  return await DefaultService.deleteApiV1Exam(examCode);
};

export const SetExamAndAnswerApi = async (form: Item) => {
  return await DefaultService.postApiV1Item(form);
};
// 学生端接口

export const GetExamInfoApi = async (examCode: number) => {
  return await DefaultService.getApiV1Exam(examCode);
};
