import { AxiosResponse } from "axios";
import $api from "../http";
import { TaskResponse } from "../models/response/taskResponse";

export class TaskService {
    static async fetchTask(taskId: number): Promise<AxiosResponse<TaskResponse>> {
        return await $api.get(`tasks/one/${taskId}`)
    }
}