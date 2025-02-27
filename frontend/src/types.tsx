export interface MiniUser {
    id: number;
    username: string;
    email: string;
    avatar: string;
}

export interface AdvancedUser {
    id: number;
    username: string;
    email: string;
    avatar: string;
    description: string;
    contacts: {
        social_media: string;
        link: string;
    }[]
    friends: MiniUser[];
    discussions: {
        id: number;
        title: string;
        description: string;
    }[];
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
    deadline: Date | null,
    status: string,
    topicId: number,
    discussionId: number,
    assignees: MiniUser[],
    comments: Comment[]
}

export const emptyTask: Partial<Task> = {
    title: '',
    description: '',
    deadline: null,
    assignees: [],
}

export interface Topic {
    id: number;
    title: string;
    tasks: Task[];
}

export const emptyTopic: Partial<Topic> = {
    title: '',
    tasks: [],
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

export const emptyDiscussion: Partial<Discussion> = {
    id: -1,
    title: '',
    description: '',
    creation_date: (new Date).toDateString(),
    topics: []
}

export interface Notification {
    id: number;
    type: string;
    senderId: number;
    date: Date;
    message: string;
    Sender: {
        username: string;
    },
    discussionId: number;
}

export interface Position{
    id?: number;
    userId?: number,
    elementId: string,
    discussionId: number,
    x: number,
    y: number
}
 
export interface DiscussionUpdatingPatch {
    discussion?: Partial<Discussion>;
    topics?: Partial<Topic>[];
    tasks?: Partial<Task>[];
}