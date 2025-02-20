/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerDetailVO } from "../models/AnswerDetailVO";
import type { ApiResult } from "../models/ApiResult";
import type { ApiResultMessage } from "../models/ApiResultMessage";
import type { ApiResultPaperManage } from "../models/ApiResultPaperManage";
import type { ExamManage } from "../models/ExamManage";
import type { FillQuestion } from "../models/FillQuestion";
import type { Item } from "../models/Item";
import type { JudgeQuestion } from "../models/JudgeQuestion";
import type { Login } from "../models/Login";
import type { Message } from "../models/Message";
import type { MultiQuestion } from "../models/MultiQuestion";
import type { PaperManage } from "../models/PaperManage";
import type { Replay } from "../models/Replay";
import type { Score } from "../models/Score";
import type { Student } from "../models/Student";
import type { Teacher } from "../models/Teacher";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DefaultService {
  /**
   * login
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Login(
    requestBody?: Login,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findAll
   * @param page
   * @param size
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Teachers(
    page: number,
    size: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/teachers/{page}/{size}",
      path: {
        page: page,
        size: size,
      },
    });
  }
  /**
   * findById
   * @param teacherId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Teacher(
    teacherId: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/teacher/{teacherId}",
      path: {
        teacherId: teacherId,
      },
    });
  }
  /**
   * deleteById
   * @param teacherId
   * @returns ApiResult
   * @throws ApiError
   */
  public static deleteApiV1Teacher(
    teacherId: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/teacher/{teacherId}",
      path: {
        teacherId: teacherId,
      },
    });
  }
  /**
   * update
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static putApiV1Teacher(
    requestBody?: Teacher,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/teacher",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Teacher(
    requestBody?: Teacher,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/teacher",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findAll
   * @param page
   * @param size
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Students(
    page: number,
    size: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/students/{page}/{size}",
      path: {
        page: page,
        size: size,
      },
    });
  }
  /**
   * findById
   * @param studentId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Student(
    studentId: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/student/{studentId}",
      path: {
        studentId: studentId,
      },
    });
  }
  /**
   * deleteById
   * @param studentId
   * @returns ApiResult
   * @throws ApiError
   */
  public static deleteApiV1Student(
    studentId: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/student/{studentId}",
      path: {
        studentId: studentId,
      },
    });
  }
  /**
   * updatePwd
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static putApiV1StudentPwd(
    requestBody?: Student,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/studentPWD",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * update
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static putApiV1Student(
    requestBody?: Student,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/student",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Student(
    requestBody?: Student,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/student",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findAll
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Scores(): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/scores",
    });
  }
  /**
   * findById
   * @param page
   * @param size
   * @param studentId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Score(
    page: number,
    size: number,
    studentId: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/score/{page}/{size}/{studentId}",
      path: {
        page: page,
        size: size,
        studentId: studentId,
      },
    });
  }
  /**
   * findById
   * @param studentId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Score1(
    studentId: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/score/{studentId}",
      path: {
        studentId: studentId,
      },
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Score(
    requestBody?: Score,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/score",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findByExamCode
   * @param examCode
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Scores1(
    examCode: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/scores/{examCode}",
      path: {
        examCode: examCode,
      },
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Replay(
    requestBody?: Replay,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/replay",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findAllById
   * @param messageId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Replay(
    messageId: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/replay/{messageId}",
      path: {
        messageId: messageId,
      },
    });
  }
  /**
   * findAll
   * @returns ApiResultPaperManage
   * @throws ApiError
   */
  public static getApiV1Papers(): CancelablePromise<ApiResultPaperManage> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/papers",
    });
  }
  /**
   * findById
   * @param paperId
   * @returns AnswerDetailVO
   * @throws ApiError
   */
  public static getApiV1Paper(
    paperId: number,
  ): CancelablePromise<Array<AnswerDetailVO>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/paper/{paperId}",
      path: {
        paperId: paperId,
      },
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1PaperManage(
    requestBody?: PaperManage,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/paperManage",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findOnlyQuestion
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1MultiQuestionId(): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/multiQuestionId",
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1MultiQuestion(
    requestBody?: MultiQuestion,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/MultiQuestion",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findAll
   * @param page
   * @param size
   * @returns ApiResultMessage
   * @throws ApiError
   */
  public static getApiV1Messages(
    page: number,
    size: number,
  ): CancelablePromise<ApiResultMessage> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/messages/{page}/{size}",
      path: {
        page: page,
        size: size,
      },
    });
  }
  /**
   * findById
   * @param id
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Message(id: number): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/message/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * delete
   * @param id
   * @returns number
   * @throws ApiError
   */
  public static deleteApiV1Message(id: number): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/message/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Message(
    requestBody?: Message,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/message",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1JudgeQuestion(
    requestBody?: JudgeQuestion,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/judgeQuestion",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findOnlyQuestionId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1JudgeQuestionId(): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/judgeQuestionId",
    });
  }
  /**
   * ItemController
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Item(
    requestBody?: Item,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/item",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1FillQuestion(
    requestBody?: FillQuestion,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/fillQuestion",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findOnlyQuestionId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1FillQuestionId(): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/fillQuestionId",
    });
  }
  /**
   * findAll
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Exams(): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/exams",
    });
  }
  /**
   * findAll
   * @param page
   * @param size
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Exams1(
    page: number,
    size: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/exams/{page}/{size}",
      path: {
        page: page,
        size: size,
      },
    });
  }
  /**
   * findById
   * @param examCode
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Exam(examCode: number): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/exam/{examCode}",
      path: {
        examCode: examCode,
      },
    });
  }
  /**
   * deleteById
   * @param examCode
   * @returns ApiResult
   * @throws ApiError
   */
  public static deleteApiV1Exam(
    examCode: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/exam/{examCode}",
      path: {
        examCode: examCode,
      },
    });
  }
  /**
   * update
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static putApiV1Exam(
    requestBody?: ExamManage,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/exam",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * add
   * @param requestBody
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Exam(
    requestBody?: ExamManage,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/exam",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * findOnlyPaperId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1ExamManagePaperId(): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/examManagePaperId",
    });
  }
  /**
   * findAllQuestion
   * @param page
   * @param size
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Answers(
    page: number,
    size: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/answers/{page}/{size}",
      path: {
        page: page,
        size: size,
      },
    });
  }
  /**
   * findByQuestionIdAndType
   * @param questionId
   * @param type
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1AnswersByQuestionIdAndType(
    questionId: string,
    type: string,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/answers/by-question-id-and-type",
      query: {
        questionId: questionId,
        type: type,
      },
    });
  }
  /**
   * findAllByType
   * @param type
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1AnswersByType(
    type: string,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/answers/by-type",
      query: {
        type: type,
      },
    });
  }
  /**
   * findAll
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Admins(): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/admins",
    });
  }
  /**
   * findById
   * @param adminId
   * @returns ApiResult
   * @throws ApiError
   */
  public static getApiV1Admin(adminId: number): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/admin/{adminId}",
      path: {
        adminId: adminId,
      },
    });
  }
  /**
   * deleteById
   * @param adminId
   * @returns ApiResult
   * @throws ApiError
   */
  public static deleteApiV1Admin(
    adminId: number,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/admin/{adminId}",
      path: {
        adminId: adminId,
      },
    });
  }
  /**
   * update
   * @param adminId
   * @param adminId
   * @param adminName
   * @param sex
   * @param tel
   * @param email
   * @param pwd
   * @param cardId
   * @param role
   * @returns ApiResult
   * @throws ApiError
   */
  public static putApiV1Admin(
    adminId?: number,
    adminName?: string,
    sex?: string,
    tel?: string,
    email?: string,
    pwd?: string,
    cardId?: string,
    role?: string,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/{adminId}",
      path: {
        adminId: adminId,
      },
      query: {
        adminId: adminId,
        adminName: adminName,
        sex: sex,
        tel: tel,
        email: email,
        pwd: pwd,
        cardId: cardId,
        role: role,
      },
    });
  }
  /**
   * add
   * @param adminId
   * @param adminName
   * @param sex
   * @param tel
   * @param email
   * @param pwd
   * @param cardId
   * @param role
   * @returns ApiResult
   * @throws ApiError
   */
  public static postApiV1Admin(
    adminId?: number,
    adminName?: string,
    sex?: string,
    tel?: string,
    email?: string,
    pwd?: string,
    cardId?: string,
    role?: string,
  ): CancelablePromise<ApiResult> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/admin",
      query: {
        adminId: adminId,
        adminName: adminName,
        sex: sex,
        tel: tel,
        email: email,
        pwd: pwd,
        cardId: cardId,
        role: role,
      },
    });
  }
}
