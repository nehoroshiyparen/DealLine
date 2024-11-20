// exampleData.ts
import { Discussion, Task, TaskPriority, TaskStatus, File } from './types';

const exampleTask1: Task = {
  id: 1,
  title: "Set up project environment",
  description: "Install dependencies and configure the environment.",
  priority: TaskPriority.High,
  deadline: "2023-12-01",
  status: TaskStatus.NotStarted,
};

const exampleTask2: Task = {
  id: 2,
  title: "Create wireframes",
  description: "Design wireframes for the main pages.",
  priority: TaskPriority.Medium,
  deadline: "2023-12-05",
  status: TaskStatus.InProgress,
};

const exampleFile1: File = {
  id: 1,
  name: "requirements.docx",
  type: "document",
  url: "https://example.com/requirements.docx",
};

const exampleFile2: File = {
  id: 2,
  name: "design.png",
  type: "image",
  url: "https://example.com/design.png",
};

export const exampleDiscussion1: Discussion = {
  id: 1,
  title: "Project Alpha Discussion",
  description: "Discussion on initial setup and project goals.",
  creation_date: "2023-11-15",
  owner: "John Doe",
  members: ["Alice", "Bob"],
  tasks: [exampleTask1, exampleTask2],
  files: [exampleFile1, exampleFile2],
};

export const exampleDiscussion2: Discussion = {
  id: 2,
  title: "Marketing Strategy Meeting",
  description: "Discussion on marketing strategies for Q1 2024.",
  creation_date: "2023-11-18",
  owner: "Sarah Smith",
  members: ["Charlie", "Diana", "Eve"],
  tasks: [exampleTask1], // Используем повторно задачу для примера
  files: [exampleFile1],
};

// Экспортируем массив для использования
export const discussions_example = [exampleDiscussion1, exampleDiscussion2];
