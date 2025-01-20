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
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    deadline: string;
    status: TaskStatus;
    responsible: MiniUser[];
    comments: Comment[];
}

export enum TaskStatus {
    NotStarted = 'Задача еще не начата',
    InProgress = 'Задача в процессе',
    Completed = 'Задача выполнена'
}

export enum TaskPriority {
    Low = 'Низкий',
    Medium = 'Средний',
    High = 'Высокий'
}

export interface Discussion {
    id: number;
    title: string;
    description: string;
    creation_date: string;
    owner: MiniUser;
    members: MiniUser[];
    tasks: Task[]
}

export interface Notification {
    type: string;
    senderId: number;
    date: Date;
    content: string;
}