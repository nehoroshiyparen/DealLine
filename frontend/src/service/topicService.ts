import { AxiosResponse } from "axios";
import { TopicResponse } from "../models/response/topicResponse";
import $api from "../http";
import { DefaultNotificationResponse } from "../models/response/notificationResponse";

export class TopicService {
    static async createTopic(discussionId: number): Promise<AxiosResponse<TopicResponse>> {
        return await $api.post<TopicResponse>('topics/', {
            title: '',
            discussionId,
        })
    }

    static async deleteTopic(topicId: number): Promise<AxiosResponse<DefaultNotificationResponse>> {
        return await $api.post<DefaultNotificationResponse>(`topics/delete`, {
            id: topicId
        })
    }
}