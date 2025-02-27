import { AxiosResponse } from "axios";
import $api from "../http";
import { TaskResponse } from "../models/response/taskResponse";
import { DefaultNotificationResponse } from "../models/response/notificationResponse";

export class TaskService {
    static async fetchTask(taskId: number): Promise<AxiosResponse<TaskResponse>> {
        return await $api.get<TaskResponse>(`tasks/one/${taskId}`)
    }

    static async createTask(topicId: number): Promise<AxiosResponse<TaskResponse>> {
        return await $api.post<TaskResponse>('tasks', {
            topicId,
            params: {
                title: '',
            }
        })
    }

    static async deleteTask(taskId: number): Promise<AxiosResponse<DefaultNotificationResponse>> {
        return await $api.post<DefaultNotificationResponse>('tasks/delete', {
            id: taskId
        })
    }

    static async sendComment(userId: number, taskId: number, content: string): Promise<AxiosResponse<string>> {
        const response =  await $api.post(`tasks/sendComment`, {
            userId,
            taskId,
            content,
        })
        return response.data
    }
}