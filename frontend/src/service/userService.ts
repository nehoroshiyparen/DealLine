import $api from "../http";
import { AxiosResponse } from "axios";
import { AdvancedUserResponse, MiniUserListResponse, NotificationResponse } from "../models/response/userResponse";

export default class UserService {
    static async fetchUsers(username: string, page: number): Promise<AxiosResponse<MiniUserListResponse>> {
        return await $api.get<MiniUserListResponse>(`/users/getUsersByUsername?username=${username}&page=${page}`)
    }

    static async fetchOneUser(username: string): Promise<AxiosResponse<AdvancedUserResponse>> {
        return await $api.get<AdvancedUserResponse>(`/users/${username}`)
    }

    static async addFriend(senderId: number, resieverId: number, message: string): Promise<AxiosResponse<NotificationResponse>> {
        return await $api.post('notifications/send_notificationrs', {
            type: 'friend_request',
            senderId,
            resieverId,
            message,
            discussionId: null
        })
    }
}