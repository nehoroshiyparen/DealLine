import React, { useEffect, useRef, useState } from 'react'
import './discussion.scss'
import { Discussion as DiscussionType, Task, Topic} from '../../../types'
import MainInfo from './components/mainInfo'
import { handleBackToMain } from '../../../utils/discussionUtils/navigation'

interface DiscussionProps {
    discussion: DiscussionType
}

export default function Discussion({ discussion }: DiscussionProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [contentHeight, setContentHeight] = useState(isOpen ? 'auto' : '0')
    //
    const [currentView, setCurrentView] = useState('main')
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    const contentRef = useRef<HTMLDivElement | null>(null)
    const topicContainerRef = useRef<HTMLDivElement | null>(null)

    const handleOpen = () => {
        setIsOpen((prev) => !prev)
    }

    console.log(currentView)

    useEffect(() => {
        const contentDiv = contentRef.current

        if (!contentDiv) return

        if (isOpen) {
            contentDiv.style.height = '0'
            const fullHeight = contentDiv.scrollHeight + 'px'
            contentDiv.style.height = fullHeight
            contentDiv.style.padding = '10px 30px'
        } else {
            const fullHeight = contentDiv.scrollHeight + 'px';
            contentDiv.style.height = fullHeight;
            requestAnimationFrame(() => {
                contentDiv.style.height = '0';
            });
            contentDiv.style.padding = '0px 30px'
        }
    }, [isOpen])

    useEffect(() => {
        const topicContainer = topicContainerRef.current

        if (!topicContainer || !isOpen) return

        const resizeObserver = new ResizeObserver(() => {
            const contentDiv = contentRef.current

            if (contentDiv && isOpen) {
                contentDiv.style.height = 'auto';
                const newHeight = contentDiv.scrollHeight;
                contentDiv.style.height = `${newHeight}px`; 
            }
        })

        resizeObserver.observe(topicContainer)

        return () => {
            resizeObserver.unobserve(topicContainer)
        }
    }, [isOpen])

    return (
        <div className='discussion'>
            <div className='discussion-header'>
                <div className='disc-title' 
                    onClick={() => {
                        handleOpen()
                    }}
                    style={{borderBottom: `${isOpen ? '1px solid #505050' : '1px solid rgba(255, 255, 255, 0)'}`}}
                >
                    {discussion.title} {currentView !== 'main' && (
                        <span style={{marginLeft: '10px', color: "#bcbfff"}}>
                            {currentView === 'topics' && '-> Темы'}
                            {currentView === 'topic' && `-> ${selectedTopic?.title}`}
                            {currentView === 'task' && `-> ${selectedTask?.title}`}
                        </span>
                    )}
                    <div className='disc-title--show' style={{rotate: `${isOpen ? '-90deg' : '0deg'}`}}>
                        <img src='/images/direction.png' width={'100%'}/>
                    </div>
                </div>
            </div>
            <div className='disc-view'>
                {currentView === 'main' && (
                    <MainInfo discussion={discussion}/>
                )}
            </div>
        </div>
    );
}