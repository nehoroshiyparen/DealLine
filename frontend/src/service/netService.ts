import { AxiosResponse } from "axios";
import { Position } from "../types";
import $api from "../http";
import { NetResponse } from "../models/response/netResponse";

export default class NetService {
    static async updatePositions(userId: number, positions: Position[]): Promise<AxiosResponse<string>> {
        const response = await $api.post('/net/update/', { userId, positions })
        return response.data
    }

    static async fetchPositions(userId: number, discussionId: number): Promise<AxiosResponse<Position[]>> {
        return await $api.get(`/net/?userId=${userId}&discussionId=${discussionId}`)
    }
}