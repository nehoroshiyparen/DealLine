type TaskPriority = 'High' | 'Medium' | 'Low';
import { Task, Discussion } from "../database/models";
import * as express from 'express'

enum TaskStatus {
    InProgress = 'Задача в процессе',
    Completed = 'Задача выполнена'
}

export interface TaskInterface {
    id: number,
    title: string,
    description?: string,
    priority: string,
    deadline: Date,
    status: string,
    discussionId: number,
    assignees?: number[],
}

export interface DiscussionInterface {
    title: string,
    description?: string,
    creatorId?: number,
    participants?: number[],
    tasks?: TaskInterface[]
}

export interface Patch {
    discussion?: Partial<Discussion>;
    tasks?: Partial<Task>[];
}

export interface NotificationsInterface  {
    type: string,
    senderId: number,
    recieverId: number,
    date: Date,
    message: string,
    discussionId?: number,
    taskId?: number,
}