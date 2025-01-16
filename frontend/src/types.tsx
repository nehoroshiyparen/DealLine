export interface User {
    username: string;
    email: string;
    avatar: string;
}

export interface File {
    id: number;
    name: string;
    type: string;
    url: string;
  }

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    deadline: string;
    status: TaskStatus;
    responsible: User[];
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
    owner: User;
    members: User[];
    tasks: Task[]
    files: File[];
}