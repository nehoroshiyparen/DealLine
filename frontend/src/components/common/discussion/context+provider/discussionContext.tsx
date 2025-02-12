import { createContext, SetStateAction, useContext } from "react";
import { Task, Topic } from "../../../../types";

export interface DiscussionContextType {
    // Ссылки
    sizeRef: React.RefObject<HTMLDivElement>;
    contentContainerRef: React.RefObject<HTMLDivElement>;
    discussionRef: React.RefObject<HTMLDivElement>;
    topicsRef: React.RefObject<HTMLDivElement>;
    taskRef: React.RefObject<HTMLDivElement>;
    topicsHeaderRef: React.RefObject<HTMLDivElement>;

    topicListContentRef: React.RefObject<HTMLDivElement>;
    topicContentRef: React.RefObject<HTMLDivElement>;
    taskContentRef: React.RefObject<HTMLDivElement>;
    // Стейты
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    isTopicsOpen: boolean;
    setIsTopicsOpen: React.Dispatch<SetStateAction<boolean>>;
    currentView: React.RefObject<HTMLDivElement | null>;
    setCurrentView: React.Dispatch<SetStateAction<React.RefObject<HTMLDivElement | null>>>;
    prevView: React.RefObject<HTMLDivElement | null>;
    setPrevView: React.Dispatch<SetStateAction<React.RefObject<HTMLDivElement | null>>>;
    selectedTopic: Topic | null;
    setSelectedTopic: React.Dispatch<SetStateAction<Topic| null>>;
    selectedTask: Task | null;
    setSelectedTask: React.Dispatch<SetStateAction<Task| null>>;
    // Функции
    NavigateToMain: () => void;
    NavigateToTopics: () => void;
    NavigateToTopic: (topic: Topic) => void;
    NavigateBackToTopic: () => void;
    NavigateToTask: (task: Task) => void;

    OpenMain: () => void;
    OpenTopics: () => void;
}

export const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined)

export const useDiscussionContext = () => {
    const context = useContext(DiscussionContext)
    if (!context) {
        throw new Error('Проблемы с контекстом: discussionContext')
    }
    return context
}