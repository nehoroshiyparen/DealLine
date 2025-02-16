import { AdvancedUser, MiniUser } from "../../types";

export interface MiniUserListResponse {
    users: MiniUser[];
}

export interface AdvancedUserResponse {
    user: AdvancedUser;
}