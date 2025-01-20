import $api from "../http";
import { AxiosResponse } from "axios";
import { MiniUserListResponse } from "../models/response/userResponse";

export default class UserService {
    static async fetchUsers(username: string, page: number): Promise<AxiosResponse<MiniUserListResponse>> {
        return await $api.get<MiniUserListResponse>(`/users/getUsersByUsername?username=${username}&page=${page}`)
    }
}