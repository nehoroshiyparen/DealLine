// exampleData.ts
import { Discussion, Task, TaskPriority, TaskStatus, File, User } from './types';

const exampleFile1: File = {
  id: 1,
  name: "requirements.docx",
  type: "document",
  url: "https://www.techcult.ru/content/2021/9865/chelovek-drakon.jpg",
};

const exampleFile2: File = {
  id: 2,
  name: "design.png",
  type: "image",
  url: "https://img.freepik.com/free-photo/expressive-redhead-bearded-man_176420-32277.jpg",
};

const exampleUser1: User = {
  id: 1,
  user_name: 'John Doe',
  password: '1234',
  avatar: exampleFile1
}

const exampleUser2: User = {
  id: 2,
  user_name: 'Sarah Smith',
  password: '1234',
  avatar: exampleFile2
}

const exampleTask1: Task = {
  id: 1,
  title: "Set up project environment",
  description: "Install dependencies and configure the environment.",
  priority: TaskPriority.High,
  deadline: "2023-12-01",
  status: TaskStatus.NotStarted,
  responsible: [exampleUser2]
};

const exampleTask2: Task = {
  id: 2,
  title: "Create wireframes",
  description: "Design wireframes for the main pages.",
  priority: TaskPriority.Medium,
  deadline: "2023-12-05",
  status: TaskStatus.InProgress,
  responsible: [exampleUser1]
};

export const exampleDiscussion1: Discussion = {
  id: 1,
  title: "Project Alpha Discussion",
  description: "Discussion on initial setup and project goals.",
  creation_date: "2023-11-15",
  owner: exampleUser1,
  members: [exampleUser1, exampleUser2],
  tasks: [exampleTask1, exampleTask2],
  files: [exampleFile1, exampleFile2],
};

export const exampleDiscussion2: Discussion = {
  id: 2,
  title: "Marketing Strategy Meeting",
  description: "Discussion on marketing strategies for Q1 2024.",
  creation_date: "2023-11-18",
  owner: exampleUser2,
  members: [exampleUser1, exampleUser2],
  tasks: [exampleTask1], // Используем повторно задачу для примера
  files: [exampleFile1],
};

// Экспортируем массив для использования
export const discussions_example = [exampleDiscussion1, exampleDiscussion2];
