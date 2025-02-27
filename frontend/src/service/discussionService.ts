import $api from "../http";
import { AxiosResponse } from "axios";
import { DiscussionCreateResponse, DiscussionListResponse, DiscussionResponse } from "../models/response/discussionResponse";
import { DefaultNotificationResponse } from "../models/response/notificationResponse";
import { DiscussionUpdatingPatch } from "../types";

export default class DiscussionService {
    static async fetchDiscussions(user_id: number, discussion_id?: number): Promise<AxiosResponse<DiscussionListResponse>> {
        return await $api.get<DiscussionListResponse>('discussions', {
            params: { user_id, discussion_id }
        });
    }

    static async fetchOneDiscussion(user_id: number, discussion_id: number): Promise<AxiosResponse<DiscussionResponse>> {
        return await $api.get<DiscussionResponse>('discussions', {
            params: { user_id, discussion_id }
        })
    }

    static async createDiscussion(creator_id: number): Promise<AxiosResponse<DiscussionCreateResponse>> {
        return await $api.post<DiscussionCreateResponse>('discussions/create_one/', {
            creatorId: creator_id
        })
    }

    static async deleteDiscussion(discussion_id: number): Promise<AxiosResponse<DefaultNotificationResponse>> {
        return await $api.post(`discussions/delete/${discussion_id}`, {
            id: discussion_id
        })
    }

    static async saveChanges(id: number, patch: DiscussionUpdatingPatch): Promise<AxiosResponse<DefaultNotificationResponse>> {
        return await $api.post<DefaultNotificationResponse>('discussions/update', {
            id,
            patch
        })
    }

    static async sendInvitation(sender_id: number, reciever_id: number, discussion_id: number): Promise<AxiosResponse<DefaultNotificationResponse>> {
        return await $api.post<DefaultNotificationResponse>('notifications/send_notification', {
            sender_id, 
            reciever_id,
            discussion_id,
            type: 'discussion_invitation'
        })
    }
}