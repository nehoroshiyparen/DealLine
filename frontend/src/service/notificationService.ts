import $api from "../http";
import { AxiosResponse } from "axios";
import { NotificationResponse } from "../models/response/notificationResponse";

export default class NotificationService {
    static async fetchUsersNtfc(user_id: number): Promise<AxiosResponse<NotificationResponse>> {
        return await $api.get<NotificationResponse>(`notifications/${user_id}`)
    }
}