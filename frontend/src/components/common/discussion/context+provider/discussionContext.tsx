import { Task, Topic } from "../../../../types";
import React, { createContext, SetStateAction, useContext } from "react";

export interface DiscussionContextType {
    // Ссылки

    hightestContainerRef: React.RefObject<HTMLDivElement>,
    topicsListRef: React.RefObject<HTMLDivElement>,
    discussionRef: React.RefObject<HTMLDivElement>,
    topicRef: React.RefObject<HTMLDivElement>,
    taskRef: React.RefObject<HTMLDivElement>,
    topicListHeaderRef: React.RefObject<HTMLDivElement>,
    topicListContentRef: React.RefObject<HTMLDivElement>,

    // Состояния

    isTopicListOpen: boolean,
    isTopicOpen: boolean,
    isTaskOpen: boolean,

     // Выбранные элементы

    selectedTopic: Topic | null;
    selectedTask: Task | null;
    
    // Навигация

    currentView: string;
    prevView: string;

    // Функции навигации

    handleOpenTopics: () => void,
    handleShowTopics: () => void,
    handleBackToTopic: () => void,
    handleOpenTask: (task: Task | null) => void,
    handleChooseTopic: (topic: Topic | null) => void,
    handleBackToTopics: () => void,

    // Сеттеры

    setSelectedTopic: React.Dispatch<SetStateAction<Topic | null>>,
    setSelectedTask: React.Dispatch<SetStateAction<Task | null>>,

    setIsTopicOpen: React.Dispatch<SetStateAction<boolean>>,
    setIsTaskOpen: React.Dispatch<SetStateAction<boolean>>,
    setSavedPosition: React.Dispatch<SetStateAction<{discussion: number, topicListHeader: number, topicList: number} | null>>,

    // Доп. значения

    topicListSectionSize: number,
    savedPosition: {discussion: number, topicListHeader: number, topicList: number} | null
}

export const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined)

export const useDiscussionContext = () => {
    const context = useContext(DiscussionContext)
    if (!context) {
        throw new Error('Проблемы с контекстом: discussionContext')
    }
    return context
}