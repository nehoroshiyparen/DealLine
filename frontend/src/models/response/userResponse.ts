import { AdvancedUser, MiniUser } from "../../types";

export interface MiniUserListResponse {
    users: MiniUser[];
}

export interface FriendListResponse {
    friends: MiniUser[];
}

export interface AdvancedUserResponse {
    user: AdvancedUser;
}