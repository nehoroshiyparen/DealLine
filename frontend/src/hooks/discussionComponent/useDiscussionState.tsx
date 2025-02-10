import { Discussion, Topic, Task } from "../../types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ShowTopic, ShowTopics, BackToMain, BackToTopic, ShowTask } from "../../utils/discussionUtils/navigation";
import { useDiscussionAnimation } from "./animations/useDiscussionAnimation";

export const useDiscussionState = (discussion: Discussion) => {

    // Ссылки на элементы
    const hightestContainerRef = useRef<HTMLDivElement | null>(null) // Контейнер, который стоит выше всех в области контента *className='disc-view'*
    const discussionRef = useRef<HTMLDivElement | null>(null) // Ссылка на компонент отвечающий за основную информацию об обсуждении *className='discussion-info'*
    const topicsListRef = useRef<HTMLDivElement | null>(null) // ссылка на компонент отвечающий за раздел топиков. В него входят также все задачи *className='topics-section'*
    const topicRef = useRef<HTMLDivElement | null>(null) 
    const taskRef = useRef<HTMLDivElement | null>(null)
    const topicListHeaderRef = useRef<HTMLDivElement | null>(null)
    const topicListContentRef = useRef<HTMLDivElement | null>(null)

    // Состояния
    const [isOpen, setIsOpen] = useState(false)  // состояние основного компонента (hightestContainer)
    const [isTopicListOpen, setIsTopicsOpen] = useState(false) // Состояние компонента topicsRef]
    const [isTopicOpen, setIsTopicOpen] = useState(false) // Открыт ли один из топиков
    const [isTaskOpen, setIsTaskOpen] = useState(false) // Открыта или закрыта одна из задач

    const [currentView, setCurrentView] = useState('discussion') // Текущее положение (относится только к discussionRef и topicsRef)
    const [prevView, setPrevView] = useState('discussion') // Предыдущее положение currentRef
    const [savedPosition, setSavedPosition] = useState<{discussion: number, topicListHeader: number, topicList: number} | null>(null)

    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null) // Выбранный топик
    const [selectedTask, setSelectedTask] = useState<Task | null>(null) // Выбраная задача

    const [originalSize, setOriginalSize] = useState(0)

    useLayoutEffect(() => {
        if (discussionRef.current) {
            setOriginalSize(discussionRef.current.scrollHeight + 105)
        }
    }, [discussion])

    // Вычисление размеров
    const [topicListSectionSize, setTopicListSectionSize] = useState((discussion.topics.length + 1) * 77.5 + 105) // Размер открытой секции со всеми топиками

    // Функции навигации ( обертки над утилитами )

    const handleShowTopics = () => {
        ShowTopics(setCurrentView, 'topicList', setSelectedTopic, setSelectedTask) 
    }

    const handleBackToTopics = async() => {
        setIsTopicOpen(false)
        setIsTaskOpen(false)

        await new Promise(resolve => setTimeout(resolve, 300))
        setSelectedTopic(null)
        setSelectedTask(null)
        ShowTopics(setCurrentView, 'topicList', setSelectedTopic, setSelectedTask) 
    }

    const handleBackToMain = () => {
        BackToMain(setCurrentView, 'discussion', setSelectedTopic, setSelectedTask)
        setIsTopicsOpen(false)
    }

    const handleChooseTopic = (topic: Topic | null) => {
        ShowTopic(setCurrentView, 'topic', setSelectedTopic, topic, setSelectedTask)
    }

    const handleBackToTopic = () => {
        BackToTopic(setCurrentView, 'topic', setSelectedTask)
    }

    const handleChooseTask = (task: Task | null) => {
        ShowTask(setCurrentView, 'task', setSelectedTask, task)
    }



    // Оброботчики кликов ( открывашки )

    const handleOpen = () => {     // ОТКРЫВАШКА ДЛЯ ОСНОВНОГО КОМПОНЕНТА
        if (!isOpen) {
          setIsOpen(true);
        } else if (isOpen && currentView === 'discussion'){
          setIsOpen(false);
        }
      };

    const handleOpenTopics = () => {    // ОТКРЫВАШКА ДЛЯ СПИСКА ТЕМ
        if (!isTopicListOpen) {
            setIsTopicsOpen(true)
            handleShowTopics()
        } else {
            setIsTopicsOpen(false)
            handleBackToMain()
        }
    }

    const handleOpenTask = (task: Task | null) => {     // ОТКРЫВАШКА ДЛЯ ЗАДАЧИ
        if (!isTaskOpen) {
            setIsTaskOpen(true)
            handleChooseTask(task)
        } else {
            setIsTaskOpen(false)
            handleBackToTopic()
        }
    }

    const handleCloseTopic = async() => {      // она в самом компоненте topic.tsx
        setIsTopicOpen(false)
        setIsTaskOpen(false)
        await new Promise(resolve => setTimeout(resolve, 500))
        handleShowTopics()
    }

    return {
        // Ссылки
        hightestContainerRef,
        discussionRef,
        topicsListRef,
        topicRef,
        taskRef,
        topicListHeaderRef,
        topicListContentRef,
        // Состояния
        isOpen,
        isTopicListOpen,
        isTopicOpen,
        isTaskOpen,
        currentView,
        prevView,
        selectedTopic,
        selectedTask,
        originalSize,
        topicListSectionSize,
        savedPosition,
        // Функции навигации
        handleShowTopics,
        handleBackToMain,
        handleChooseTopic,
        handleBackToTopic,
        handleChooseTask,
        handleBackToTopics,
        // Обработчики кликов
        handleOpen,
        handleOpenTopics,
        handleCloseTopic,
        handleOpenTask,
        // Сеттеры
        setSelectedTopic,
        setSelectedTask,
        setIsOpen,
        setIsTopicOpen,
        setIsTaskOpen,
        setCurrentView,
        setPrevView,
        setSavedPosition,
    }
}