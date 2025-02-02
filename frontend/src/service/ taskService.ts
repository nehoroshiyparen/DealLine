import { AxiosResponse } from "axios";
import $api from "../http";
import { TaskResponse } from "../models/response/taskResponse";

export class TaskService {
    static async fetchTask(taskId: number): Promise<AxiosResponse<TaskResponse>> {
        return await $api.get(`tasks/one/${taskId}`)
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