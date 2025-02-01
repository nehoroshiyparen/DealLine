export interface MiniUser {
    id: number;
    username: string;
    email: string;
    avatar: string;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    author: MiniUser;
}

export interface Task {
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

export interface Topic {
    id: number;
    title: string;
    tasks: Task[];
}

export interface Discussion {
    id: number;
    title: string;
    description: string;
    creation_date: string;
    owner: MiniUser;
    members: MiniUser[];
    topics: Topic[];
}

export interface Notification {
    type: string;
    senderId: number;
    date: Date;
    content: string;
}

export interface Position{
    id?: number;
    userId?: number,
    elementId: string,
    discussionId: number,
    x: number,
    y: number
}