/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Replay } from './Replay';
export type Message = {
    id?: number;
    /**
     * 解决id为null创建的一个临时id
     */
    temp_id?: number;
    title?: string;
    content?: string;
    time?: string;
    /**
     * 一对多关系，评论信息
     */
    replays?: Array<Replay>;
};

