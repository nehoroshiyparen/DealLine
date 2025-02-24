import $api from "../http";
import { AxiosResponse } from "axios";
import { AdvancedUserResponse, FriendListResponse, MiniUserListResponse } from "../models/response/userResponse";
import { DefaultNotificationResponse } from "../models/response/notificationResponse";

export default class UserService {
    static async fetchUsers(username: string, page: number): Promise<AxiosResponse<MiniUserListResponse>> {
        return await $api.get<MiniUserListResponse>(`/users/getUsersByUsername?username=${username}&page=${page}`)
    }

    static async fetchOneUser(username: string): Promise<AxiosResponse<AdvancedUserResponse>> {
        return await $api.get<AdvancedUserResponse>(`/users/${username}`)
    }

    static async getUserFriends(id: number): Promise<AxiosResponse<FriendListResponse>> {
        return await $api.get<FriendListResponse>(`users/getUserFriends/${id}`)
    }

    static async addFriend(senderId: number, recieverId: number, message: string): Promise<AxiosResponse<DefaultNotificationResponse>> {
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

    static async deleteFriend(senderId: number, recieverId: number): Promise<AxiosResponse<DefaultNotificationResponse>> {
        return await $api.post('users/deleteFriend', {
            firstId: senderId,
            secondId: recieverId,
        })
    }
}