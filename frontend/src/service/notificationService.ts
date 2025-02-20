import $api from "../http";
import { AxiosResponse } from "axios";
import { NotificationResponse } from "../models/response/notificationResponse";

export default class NotificationService {
    static async fetchUsersNtfc(user_id: number): Promise<AxiosResponse<NotificationResponse[]>> {
        return await $api.get<NotificationResponse[]>(`notifications/${user_id}`)
    }

    static async accept_friendRequest(notification_id: number): Promise<void> {
        await $api.post('/notifications/accept', {
            id: notification_id
        })
    }

    static async accept_discussionInvitation(notification_id: number, discussion_id: number): Promise<void> {
        await $api.post('/notifications/accept', {
            id: notification_id,
            discussionId: discussion_id,
        })
    }

    static async reject(notification_id: number): Promise<void> {
        await $api.post('notifications/reject', {
            id: notification_id
        })
    }
}