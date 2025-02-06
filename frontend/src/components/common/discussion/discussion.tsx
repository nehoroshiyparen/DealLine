import React, { useEffect, useRef, useState, createContext, SetStateAction, useContext } from 'react'
import './discussion.scss'
import { Discussion as DiscussionType, Task, Topic } from '../../../types'
import { BackToMain, BackToTopics, ShowTask, ShowTopic, ShowTopics } from '../../../utils/discussionUtils/navigation'
import TopicList from './components/topicList/topicList'
import MemberList from './components/MemberList'
import TopicComponent from './components/topicComponent/topic'
import MainInfo from './components/mainInfo/mainInfo'

interface DiscussionProps {
    discussion: DiscussionType
}

// СОЗДАНИЕ КОНТЕКСТА

interface ContextType {
    isTopicsOpen: boolean,
    isCurrentTopicOpen: boolean,
    setIsCurrentTopicOpen: React.Dispatch<SetStateAction<boolean>>,
    selectedTopic: Topic | null,
    selectedTask: Task | null,
    handleShowTopics: () => void,
    handleChooseTopic: (topic: Topic | null) => void,
    setSelectedTask: React.Dispatch<SetStateAction<Task | null>>,
    sizeRef: React.RefObject<HTMLDivElement>,
    topicsRef: React.RefObject<HTMLDivElement>,
    topics_header__top: React.RefObject<HTMLDivElement>,
}

const Context = createContext<ContextType | undefined>(undefined)   

export const useDiscussionContext = () => {
    const context = useContext(Context)

    if (!context) {
        console.error("Context is undefined!")
        return undefined
    }

    return context
}

// ОСНОВНОЙ КОМПОНЕНТ

export default function Discussion({ discussion }: DiscussionProps) {
    const sizeRef = useRef<HTMLDivElement | null>(null)
    const discussionRef = useRef<HTMLDivElement | null>(null)
    const topicsRef = useRef<HTMLDivElement | null>(null)
    const taskRef = useRef<HTMLDivElement | null>(null)
    const contentContainerRef = useRef<HTMLDivElement | null>(null)
    const topics_header__top = useRef<HTMLDivElement | null>(null)

    const order: Record<string, number> = {
        'discussion-info': 0,
        'topics-section': 1,
        'currentTopicRef': 2,
        'taskRef': 3
    }

    const [isOpen, setIsOpen] = useState(false)
    const [isTopicsOpen, setIsTopicsOpen] = useState(false)
    const [isCurrentTopicOpen, setIsCurrentTopicOpen] = useState(false)
    const [currentView, setCurrentView] = useState(discussionRef)
    const [prevView, setPrevView] = useState(discussionRef)
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

    const handleShowTopics = () => {
        ShowTopics(setCurrentView, topicsRef, setSelectedTopic, setSelectedTask) 
    }
    const handleBackToMain = () => {
        BackToMain(setCurrentView, discussionRef, setSelectedTopic, setSelectedTask)
        setIsTopicsOpen(false)
    }

    const handleChooseTopic = (topic: Topic | null) => {
        setSelectedTopic(topic)
        setSelectedTask(null)
    }

    // CONTEXT

    const contextValue = { 
        isTopicsOpen,
        selectedTopic,
        selectedTask,
        isCurrentTopicOpen,
        setIsCurrentTopicOpen,
        handleShowTopics,
        handleChooseTopic,
        setSelectedTask,
        sizeRef,
        topicsRef,
        topics_header__top
    }

    // ПЕРЕКЛЮЧАТЕЛЬ ДЛЯ ОСНОВНОГО КОМПОНЕНТА
    
    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true)
        } else if (isOpen && currentView === discussionRef){
            setIsOpen(false)
        }
    }

    // ПЕРЕКЛЮЧАТЕЛЬ ДЛЯ СПИСКА ТЕМ

    const handleOpenTopics = () => {
        if (!isTopicsOpen) {
            setIsTopicsOpen(true)
        } else {
            setIsCurrentTopicOpen(false)
            setIsTopicsOpen(false)
        }
        handleShowTopics()
    }

    // ОТКРЫТИЕ ОСНОВНОГО КОМПОНЕНТА

    useEffect(() => {
        const contentDiv = sizeRef.current
        if (!contentDiv) return

        if (isOpen) {
            contentDiv.style.height = '0px' 
            requestAnimationFrame(() => {
                const fullHeight = contentDiv.scrollHeight + 'px'
                contentDiv.style.height = fullHeight
                contentDiv.style.padding = '10px 30px'
            })
        } else {
            const fullHeight = contentDiv.scrollHeight + 'px'
            contentDiv.style.height = fullHeight 
            requestAnimationFrame(() => {
                contentDiv.style.height = '0px'
                contentDiv.style.padding = '0px 30px'
            })
        }
    }, [isOpen])

    // ПЕРЕКЛЮЧЕНИЕ С ИНФОРМАЦИИ ОБ ОБСУЖДЕНИИ НА СПИСОК ТЕМ

    useEffect(() => {

        const v2_to_v1 = (currentView.current === discussionRef.current && (prevView.current === topicsRef.current || prevView.current === discussionRef.current))
        const v1_to_v2 = currentView.current === topicsRef.current && (prevView.current === discussionRef.current)

        if (v1_to_v2 || v2_to_v1) {
            const prev = prevView.current
            const next = currentView.current
            const contentContainer = contentContainerRef.current
            const size = sizeRef.current

            if (!prev || !next || !contentContainer || !size || prev === next) return

            if (order[prev.className] < order[next.className]) {
                prev.style.opacity = '0'
                next.style.opacity = '1'
                contentContainer.style.top = `-${prev.scrollHeight}px`
                size.style.height = `${(discussion.topics.length + 1) * 77.5 + 105}px`
            } else {
                prev.style.opacity = '0'
                next.style.opacity = '1'
                contentContainer.style.top = '0'
                size.style.height = `${next.scrollHeight + 105}px`
            } 
        }

        setPrevView(currentView)
    }, [currentView])

    return (
        <Context.Provider value={contextValue}>
        <div className='discussion'>
            <div className='discussion-header'>
                <div 
                    className='disc-title' 
                    onClick={!isOpen || currentView.current === discussionRef.current ? handleOpen : () => {}}
                    style={{ borderBottom: isOpen ? '1px solid #505050' : '1px solid rgba(255, 255, 255, 0)' }}
                >
                    <div className='path'>
                        <span onClick={handleBackToMain}>{discussion.title}</span>
                        {currentView !== discussionRef && (
                            <span style={{ marginLeft: '10px' }}>
                                <span onClick={handleShowTopics}>{currentView === topicsRef && '/ Темы'}</span>
                                {selectedTopic && ` / ${selectedTopic?.title}`}
                                {currentView === taskRef && ` / ${selectedTask?.title}`}
                            </span>
                        )}
                    </div>
                    <div className='disc-title--disc --show' style={{ rotate: isOpen ? '-90deg' : '0deg' }}>
                        <img src='/images/direction.png' width={'100%'}/>
                    </div>
                </div>
            </div>
            <div 
                className='disc-view' 
                ref={sizeRef} 
                style={{ 
                    transition: 'height 0.5s, padding 0.3s',
                    overflow: 'hidden',
                    height: '0px',
                    padding: '0px 30px'
                }}
            >
                <div className='content-container' ref={contentContainerRef}>
                    <div className='discussion-info' ref={discussionRef}>
                        <MainInfo discussion={discussion}/>
                    </div>
                    <div className="topics-header--top" onClick={handleOpenTopics} ref={topics_header__top}>
                        <span>Темы</span>
                        <div className='topic-header--disc --show' style={{rotate: `${isTopicsOpen ? '-90deg' : '0deg'}`}}>
                            <img src='/images/direction.png' width={'100%'}/>
                        </div>
                    </div>
                    <div className='topics-section' ref={topicsRef}>
                        <TopicList topics={discussion.topics}/>
                    </div>
                </div>
            </div>
        </div>
        </Context.Provider>
    )
}