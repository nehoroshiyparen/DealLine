import { useRef, useState } from "react";
import { Discussion, Task, Topic } from "../../types";
import { BackToMain, ShowTopics } from "../../utils/discussionUtils/navigation";

export const useDiscussionState = (discussion: Discussion) => {

    // Ссылки

    const sizeRef = useRef<HTMLDivElement | null>(null) // className='disc-view', самый высокий компонент для контента
    const contentContainerRef = useRef<HTMLDivElement | null>(null) // className='content-container' бля он кароче отвечает за контент, который отрисовывается
    const discussionRef = useRef<HTMLDivElement | null>(null) // className='discussion-info'
    const topicsRef = useRef<HTMLDivElement | null>(null) // className='topics-section'
    const taskRef = useRef<HTMLDivElement | null>(null)
    const topicsHeaderRef = useRef<HTMLDivElement | null>(null) // className="topics-header--top"

    const topicListContentRef = useRef<HTMLDivElement | null>(null) // className="topics-list-content" Нужен для того чтобы редачить у него высоту. С ним работать чтобы открывать список топиков
    const topicContentRef = useRef<HTMLDivElement | null>(null) // className="topic-content"  То же самое что здесь /\ сверху. С ним работать, чтобы открывать список задач топика
    const taskContentRef = useRef<HTMLDivElement | null>(null) // className="task-component--info" Работаю с ним чтобы открывать и закрывать инфу о задаче

    // Стейты

    const [isOpen, setIsOpen] = useState(false)
    const [isTopicsOpen, setIsTopicsOpen] = useState(false)
    const [currentView, setCurrentView] = useState(discussionRef)
    const [prevView, setPrevView] = useState(discussionRef)
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    // Навигационные функции

    const NavigateToTopics = () => {
        ShowTopics(setCurrentView, topicsRef, setSelectedTopic, setSelectedTask) 
    }
    const NavigateToMain = () => {
        BackToMain(setCurrentView, discussionRef, setSelectedTopic, setSelectedTask)
        setIsTopicsOpen(false)
    }

    const NavigateToTopic = (topic: Topic | null) => {
        setSelectedTopic(topic)
        setSelectedTask(null)
    }

    const NavigateBackToTopic = () => {
        setSelectedTask(null)
    }

    const NavigateToTask = (task: Task | null) => {
        setSelectedTask(task)
    }

    // Функции открытия

    const OpenMain = () => {
        if (!isOpen) {
            setIsOpen(true)
        } else if (isOpen && currentView === discussionRef){
            setIsOpen(false)
        }
    }

    // ПЕРЕКЛЮЧАТЕЛЬ ДЛЯ СПИСКА ТЕМ

    const OpenTopics = () => {
        if (!isTopicsOpen) {
            NavigateToTopics()
            setIsTopicsOpen(true)
        } else {
            NavigateToMain()
            setIsTopicsOpen(false)
        }
    }

    return {
        //Ссылки
        sizeRef,
        contentContainerRef,
        discussionRef,
        topicsRef,
        taskRef,
        topicsHeaderRef,

        topicListContentRef,
        topicContentRef,
        taskContentRef,
        //Стейты
        isOpen, setIsOpen,
        isTopicsOpen, setIsTopicsOpen,
        currentView, setCurrentView,
        prevView, setPrevView,
        selectedTopic, setSelectedTopic,
        selectedTask, setSelectedTask,
        //Функции
        NavigateToTopics,
        NavigateToMain,
        NavigateToTopic,
        NavigateBackToTopic,
        NavigateToTask,

        OpenMain,
        OpenTopics,
    }
}