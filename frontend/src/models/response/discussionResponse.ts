import { Discussion, MiniUser, Topic } from "../../types";

export interface DiscussionListResponse {
    discussions: Discussion[];
}

export interface DiscussionResponse {
    id: number;
    title: string;
    description: string;
    creation_date: string;
    owner: MiniUser;
    members: MiniUser[];
    topics: Topic[];
}

export interface DiscussionCreateResponse { // я клянусь я понял свою ошибку и не буду так больше никогда делать
    discussion: Discussion; // нахуя я делал разные ответы с сервера ??? Потому что я зеленый.
} // да простит меня... сами знаете кто