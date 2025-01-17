import $api from "../http";
import { AxiosResponse } from "axios";
import { DiscussionResponse } from "../models/response/discussionResponse";

export default class DiscussionService {
    static async fetchUsersDsc(user_id: number): Promise<AxiosResponse<DiscussionResponse>> {
        return $api.get<DiscussionResponse>(`discussions/${user_id}`)
    }
}