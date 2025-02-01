import { Comment, MiniUser, Task } from "../../types";

export interface TaskResponse {
    id: number,
    title: string,
    description: string,
    priority: string,
    deadline: Date,
    status: string,
    topicId: number,
    discussionId: number,
    assignees: MiniUser[],
    comments: Comment[]
}