/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaperManage } from './PaperManage';
export type ApiResultPaperManage = {
    /**
     * 错误码，表示一种错误类型
     * 请求成功，状态码为200
     */
    code?: number;
    /**
     * 对错误代码的详细解释
     */
    message?: string;
    /**
     * 返回的结果包装在value中，value可以是单个对象
     */
    data?: PaperManage;
};

