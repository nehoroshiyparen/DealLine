type TaskPriority = 'High' | 'Medium' | 'Low';
import { Task, Discussion, Topic } from "../database/models";
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
    topicId: number,
    discussionId: number,
    assignees?: number[],
}

export interface TopicInterface {
    title: string,
    tasks: TaskInterface[]
}

export interface DiscussionInterface {
    title: string,
    description?: string,
    creatorId?: number,
    participants?: number[],
    topics?: TopicInterface[]
}

export interface Patch {
    discussion?: Partial<Discussion>;
    topics? : Partial<Topic>[];
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