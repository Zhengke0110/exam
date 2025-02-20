import { DefaultService } from "@/generated";
import type { Student, Teacher } from "@/generated";
export type { Teacher, Student };

export const AddTeacherApi = async (teacher: Teacher) => {
  return DefaultService.postApiV1Teacher(teacher);
};

export const AddStudentApi = async (student: Student) => {
  return DefaultService.postApiV1Student(student);
};

export const DeleteTeacherApi = async (teacherId: number) => {
  return DefaultService.deleteApiV1Teacher(teacherId);
};
export const DeleteStudentApi = async (studentId: number) => {
  return DefaultService.deleteApiV1Student(studentId);
};

export const GetAllTeacherApi = async (page: number = 1, size: number = 20) => {
  return DefaultService.getApiV1Teachers(page, size);
};
export const GetAllStudentApi = async (page: number = 1, size: number = 20) => {
  return await DefaultService.getApiV1Students(page, size);
};

export const UpdateTeacherApi = async (teacher: Teacher) => {
  return DefaultService.putApiV1Teacher(teacher);
};
export const UpdateStudentApi = async (student: Student) => {
  return DefaultService.putApiV1Student(student);
};

export const GetTeacherByIDApi = async (teacherId: number) => {
  return await DefaultService.getApiV1Teacher(teacherId);
};
export const GetStudentByIDApi = async (studentId: number) => {
  return await DefaultService.getApiV1Student(studentId);
};
