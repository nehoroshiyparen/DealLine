type TaskPriority = 'High' | 'Medium' | 'Low';
import { Optional } from "sequelize";
import { Task, Discussion, Topic } from "../database/models";
import * as express from 'express'

enum TaskStatus {
    InProgress = 'Задача в процессе',
    Completed = 'Задача выполнена'
}

export interface UserInterface {
    id: number,
    username: string,
    email: string,
}

export interface TaskInterface {
    id: number,
    title?: string,
    description?: string,
    priority: string,
    deadline: Date,
    status: string,
    topicId: number,
    discussionId: number,
    assignees?: UserInterface[],
    connections?: { taskId: number, connectionTaskId: number }[],
}

export interface TopicInterface {
    id: number,
    title: string,
    tasks: TaskInterface[]
}

export interface DiscussionInterface {
    title: string,
    description?: string,
    creatorId: number,
    participants?: number[],
    topics?: TopicInterface[]
}

export interface DiscussionUpdatingPatch {
    discussion?: Partial<DiscussionInterface>;
    topics? : Partial<TopicInterface>[];
    tasks?: Partial<TaskInterface>[];
}

export interface PositionInterface {
    id?: number;
    userId?: number,
    elementId: string,
    discussionId: number,
    x: number,
    y: number
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