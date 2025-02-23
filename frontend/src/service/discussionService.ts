import $api from "../http";
import { AxiosResponse } from "axios";
import { DiscussionResponse } from "../models/response/discussionResponse";

export default class DiscussionService {
    static async fetchDiscussions(user_id: number, discussion_id?: number): Promise<AxiosResponse<DiscussionResponse>> {
        return await $api.get<DiscussionResponse>('discussions', {
            params: { user_id, discussion_id }
        });
    }
}