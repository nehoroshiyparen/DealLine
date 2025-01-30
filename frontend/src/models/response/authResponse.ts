import { MiniUser } from "../../types";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: MiniUser;
}