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

    static async addFriend(senderId: number, recieverId: number, message: string): Promise<AxiosResponse<NotificationResponse>> {
        return await $api.post('notifications/send_notification', {
            patch: {
                type: 'friend_request',
                senderId,
                recieverId,
                message,
                discussionId: null
            }
        })
    }

    static async deleteFriend(senderId: number, recieverId: number): Promise<AxiosResponse<NotificationResponse>> {
        return await $api.post('users/deleteFriend', {
            firstId: senderId,
            secondId: recieverId,
        })
    }
}