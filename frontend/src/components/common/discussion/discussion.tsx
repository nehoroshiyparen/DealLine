import React, { useEffect, useRef, useState } from 'react'
import './discussion.scss'
import { Discussion as DiscussionType, Task, Topic } from '../../../types'
import { BackToMain, BackToTopics, ShowTask, ShowTopic, ShowTopics } from '../../../utils/discussionUtils/navigation'
import TopicList from './components/topicList/topicList'
import MemberList from './components/MemberList'

interface DiscussionProps {
    discussion: DiscussionType
}

export default function Discussion({ discussion }: DiscussionProps) {
    const sizeRef = useRef<HTMLDivElement | null>(null)
    const discussionRef = useRef<HTMLDivElement | null>(null)
    const topicsRef = useRef<HTMLDivElement | null>(null)
    const currentTopicRef = useRef<HTMLDivElement | null>(null)
    const taskRef = useRef<HTMLDivElement | null>(null)
    const contentContainerRef = useRef<HTMLDivElement | null>(null)

    const order: Record<string, number> = {
        'discussion-info': 0,
        'topics-section': 1,
        'currentTopicRef': 2,
        'taskRef': 3
    }

    const [isOpen, setIsOpen] = useState(false)
    const [isTopicsOpen, setIsTopicsOpen] = useState(false)
    const [currentView, setCurrentView] = useState(discussionRef)
    const [prevView, setPrevView] = useState(discussionRef)
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    const handleShowTopics = () => {
        ShowTopics(setCurrentView, topicsRef, setSelectedTopic, setSelectedTask) 
    }
    const handleBackToMain = () => {
        BackToMain(setCurrentView, discussionRef, setSelectedTopic, setSelectedTask)
    }

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true)
        } else if (isOpen && currentView === discussionRef){
            setIsOpen(false)
        } else {
            handleBackToMain()
            setIsTopicsOpen(false)
        }
    }

    const handleOpenTopics = () => {
        if (!isTopicsOpen) {
            setIsTopicsOpen(true)
            handleShowTopics()
        } else {
            setIsTopicsOpen(false)
        }
    }

useEffect(() => {
    const contentDiv = sizeRef.current;
    if (!contentDiv) return;

    // Функция для изменения высоты при открытии и закрытии
    const adjustHeight = () => {
        if (isOpen || isTopicsOpen) {
            // При открытии устанавливаем высоту в scrollHeight
            contentDiv.style.height = '0px'; 
            requestAnimationFrame(() => {
                const fullHeight = contentDiv.scrollHeight + 'px';
                contentDiv.style.height = fullHeight;
                contentDiv.style.padding = '10px 30px';
            });
        } else {
            // При закрытии явно уменьшаем высоту в 0
            requestAnimationFrame(() => {
                contentDiv.style.height = '0px';
                contentDiv.style.padding = '0px 30px';
            });
        }
    };

    adjustHeight(); // Начальная установка высоты

    // Добавляем слушатель изменений для isTopicsOpen
    const resizeObserver = new ResizeObserver(() => {
        if (isOpen && isTopicsOpen) {
            const fullHeight = contentDiv.scrollHeight + 'px';
            contentDiv.style.height = fullHeight; // Пересчитываем высоту в случае изменения содержимого
        }
    });

    resizeObserver.observe(contentDiv);

    // Очищаем observer при размонтировании компонента
    return () => {
        resizeObserver.disconnect();
    };
}, [isOpen, isTopicsOpen]); // Зависимости от isOpen и isTopicsOpen


    useEffect(() => {
        const prev = prevView.current
        const next = currentView.current
        const contentContainer = contentContainerRef.current
        const size = sizeRef.current

        if (!prev || !next || !contentContainer || !size || prev === next) return

        console.log(prev, next)

        if (order[prev.className] < order[next.className]) {
            prev.style.opacity = '0'
            next.style.opacity = '1'
            contentContainer.style.top = `-${prev.scrollHeight}px`
        } else {
            prev.style.opacity = '0'
            next.style.opacity = '1'
            contentContainer.style.top = '0'
            setTimeout(() => {
                size.style.height = `${next.scrollHeight+105}px`
            })
        }

        setPrevView(currentView)
    }, [currentView])

    return (
        <div className='discussion'>
            <div className='discussion-header'>
                <div 
                    className='disc-title' 
                    onClick={handleOpen}
                    style={{ borderBottom: isOpen ? '1px solid #505050' : '1px solid rgba(255, 255, 255, 0)' }}
                >
                    <div className='path'>
                        <span>{discussion.title}</span>
                        {currentView !== discussionRef && (
                            <span style={{ marginLeft: '10px', color: "#bcbfff" }}>
                                {currentView === topicsRef && '-> Темы'}
                                {currentView === currentTopicRef && `-> ${selectedTopic?.title}`}
                                {currentView === taskRef && `-> ${selectedTask?.title}`}
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
                        <div className='disc-users'>
                            <div className='disc-owner'>
                                <span>Создатель обсуждения</span>
                                <div className='disc-owner--info'>
                                    <img 
                                        src={discussion.owner?.avatar 
                                            ? `http://localhost:5665/api/upload/${encodeURIComponent(discussion.owner.avatar)}` 
                                            : '/images/profile.png'} 
                                        width={'100%'}
                                        className='owner-avatar'
                                    />
                                    <span style={{ fontSize: '22px', fontWeight: '600', color: '#bcbfff' }}>
                                        {discussion.owner.username}
                                    </span>
                                </div>
                            </div>
                            <div className='disc-members'>
                                <span>Участники обсуждения</span>
                                <MemberList members={discussion.members}/>
                            </div>
                        </div>
                        <div className='disc-creation_date'>
                            Дата создания: <span style={{ fontWeight: 'bold' }}>
                                {discussion.creation_date ? discussion.creation_date : '20.10.2025'}
                            </span>
                        </div> 
                        <div className='disc-description'>
                            <span>Описание</span>
                            <div className='disc-description--info'>
                                {discussion.description ? discussion.description : 'Описания нет'}
                            </div>
                        </div>
                    </div>
                    <div className="topics-header--top" onClick={handleOpenTopics}>
                        <span>Темы</span>
                        <div className='topic-header--disc --show' style={{rotate: `${isTopicsOpen ? '-90deg' : '0deg'}`}}>
                            <img src='/images/direction.png' width={'100%'}/>
                        </div>
                    </div>
                    <div className='topics-section' ref={topicsRef} onClick={handleShowTopics}>
                        <TopicList topics={discussion.topics} isOpen={isTopicsOpen}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
