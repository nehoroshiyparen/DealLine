import React, { SetStateAction, useEffect } from "react";
import { Discussion, Task, Topic } from "../../types";

interface useDiscussionAnimationProps {
    sizeRef: React.RefObject<HTMLDivElement | null>;
    contentContainerRef: React.RefObject<HTMLDivElement | null>;
    discussionRef: React.RefObject<HTMLDivElement | null>;
    topicsRef: React.RefObject<HTMLDivElement | null>;
    taskRef: React.RefObject<HTMLDivElement | null>;
    topicsHeaderRef: React.RefObject<HTMLDivElement | null>;

    topicListContentRef: React.RefObject<HTMLDivElement | null>;
    topicContentRef: React.RefObject<HTMLDivElement | null>;
    taskContentRef: React.RefObject<HTMLDivElement | null>;

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

    discussion: Discussion;
}

export const useDiscussionAnimation = ({
    sizeRef,
    contentContainerRef,
    discussionRef,
    topicsRef,
    taskRef,
    topicsHeaderRef,

    topicListContentRef,
    topicContentRef,
    taskContentRef,

    isOpen, setIsOpen,
    isTopicsOpen, setIsTopicsOpen,
    currentView, setCurrentView,
    prevView, setPrevView,
    selectedTopic, setSelectedTopic,
    selectedTask, setSelectedTask,

    discussion
}: useDiscussionAnimationProps) => {

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

    useEffect(() => {
        const content = topicsRef.current
        if (!content) return
    
        if (isTopicsOpen) {
            content.style.height = `${content.scrollHeight}px`
        } else {
            content.style.height = `${content.scrollHeight}px`
            requestAnimationFrame(() => {
                content.style.height = '0px'
            })
        }
    }, [isTopicsOpen])
    
    useEffect(() => {

        const order: Record<string, number> = {
            'discussion-info': 0,
            'topics-section': 1,
            'currentTopicRef': 2,
            'taskRef': 3
        }
    
        const v2_to_v1 = (currentView.current === discussionRef.current && (prevView.current === topicsRef.current || prevView.current === discussionRef.current))
        const v1_to_v2 = currentView.current === topicsRef.current && (prevView.current === discussionRef.current)
    
        if (v1_to_v2 || v2_to_v1) {
            const prev = prevView.current
            const next = currentView.current
            const contentContainer_div = contentContainerRef.current
            const size_div = sizeRef.current
    
            if (!prev || !next || !contentContainer_div || !size_div || prev === next) return
    
            if (order[prev.className] < order[next.className]) {
                prev.style.opacity = '0'
                next.style.opacity = '1'
                contentContainer_div.style.top = `-${prev.scrollHeight}px`
                size_div.style.height = `${(discussion.topics.length + 1) * 77.5 + 105}px`
            } else {
                prev.style.opacity = '0'
                next.style.opacity = '1'
                contentContainer_div.style.top = '0'
                size_div.style.height = `${next.scrollHeight + 105}px`
            } 
        }
    
        setPrevView(currentView)
    }, [currentView])

    useEffect(() => {
        const header = topicsHeaderRef.current
        const topics_div = topicsRef.current
        const size_div = sizeRef.current
        const topicListContent_div = topicListContentRef.current
        const discussion_div = discussionRef.current
        const content_div = contentContainerRef.current
    
        if (!header || !size_div || !topics_div || !topicListContent_div || !discussion_div || !content_div ) return
    
        if (selectedTopic) {
            header.style.opacity = '0'
    
            discussion.topics.forEach((topic) => {
                const elem = document.querySelector(`#topic-id${topic.id}`) as HTMLElement
                if (topic.id !== selectedTopic.id) {
                    elem.style.opacity = '0'
                } else {
                    elem.classList.add('choosen--topic')
                    elem.style.fontWeight = '600'
                    elem.style.padding = '0px 0px'
                    const headerPosition = header.getBoundingClientRect().top + window.scrollY
                    const elemPosition = elem.getBoundingClientRect().top + window.scrollY
                    const topicListPosition = topics_div.getBoundingClientRect().top + window.scrollY
                    const offset_for_elem = elemPosition - topicListPosition
                    const offset_for_list = topicListPosition - headerPosition
    
                    elem.style.top = `-${offset_for_elem - 10}px`
                    topics_div.style.top = `-${offset_for_list}px`

                    topicListContent_div.style.height = `${(topic.tasks.length + 1) * 76 + 77.5}px`
                    topics_div.style.height = `${(topic.tasks.length + 1) * 76 + 97.5}px`
                    size_div.style.height = `${(topic.tasks.length + 1) * 76 + 97.5}px`

                    topicListContent_div.style.borderColor = '#ffffff00'
                }
            })
        } else {
            header.style.opacity = '1'
    
            discussion.topics.forEach((topic) => {
                const elem = document.querySelector(`#topic-id${topic.id}`) as HTMLElement
                elem.classList.remove('choosen--topic')
                elem.style.fontWeight = 'normal'
                elem.style.opacity = '1'
                elem.style.padding = '0px 40px'
                elem.style.top = `0px`
                topics_div.style.top = `0px`
                topicListContent_div.style.borderColor = '#505050'
            })

            const s1_height = discussion_div.scrollHeight + 105
            const s2_height = (discussion.topics.length + 1) * 77.5 + 105
            const height = currentView.current === discussionRef.current ? s1_height : s2_height
            topics_div.style.height = `${height}px`
            size_div.style.height = `${height}px`
            topicListContent_div.style.height = `${(discussion.topics.length) * 78.5}px`
        }
    }, [selectedTopic])

    useEffect(() => {
        const size_div = sizeRef.current
        const topics_div = topicsRef.current
        const topicListContent_div = topicListContentRef.current

        if (!size_div || !topics_div || !topicListContent_div) return

        if (selectedTopic) {
            const topicHeaderElement = document.querySelector(`#topic-header--element-id${selectedTopic.id}`) as HTMLElement
            selectedTopic.tasks.forEach((task) => {

                const elem = document.querySelector(`#task-id${task.id}`) as HTMLElement
                const topicContent_div = elem.closest(`.topic-content`) as HTMLElement

                if (selectedTask) {
                    if (task.id !== selectedTask.id) {
                        elem.style.opacity = '0'
                    } else {
                        elem.classList.add('choosen--task')
                        elem.style.fontWeight = '600'
                        elem.style.padding = '0px 0px'
                        topicHeaderElement.style.opacity = '0'
                        const headerPosition = topicHeaderElement.getBoundingClientRect().top + window.scrollY
                        const elemPosition = elem.getBoundingClientRect().top + window.scrollY
                        const topicContentPosition = topicContent_div.getBoundingClientRect().top + window.scrollY
    
                        const offset_for_elem = elemPosition - topicContentPosition 
                        const offset_for_list = topicContentPosition - headerPosition
    
                        elem.style.top = `-${offset_for_elem}px`
                        topicContent_div.style.top = `-${offset_for_list}px`
    
                        topicContent_div.style.height = `${window.screen.height*0.8}px`
                        size_div.style.height = `${window.screen.height*0.8}px`
                        topics_div.style.height = `${window.screen.height*0.8}px`
                        topicListContent_div.style.height = `${window.screen.height*0.8}px`
                    }
                } else {
                    elem.style.opacity = '1'
                    elem.style.fontWeight = 'normal'
                    elem.style.padding = '0px 40px'

                    topicHeaderElement.style.opacity = '1'

                    elem.style.top = '0px'
                    topicContent_div.style.top = '0px'

                    size_div.style.height = `${(selectedTopic.tasks.length + 1) * 76 + 77.5}px`
                    topics_div.style.height = `${(selectedTopic.tasks.length + 1) * 76 + 77.5}px`
                    topicListContent_div.style.height = `${(selectedTopic.tasks.length + 1) * 76 + 77.5}px`
                    topicContent_div.style.height = `${(selectedTopic.tasks.length + 1) * 76 + 77.5}px`
                }
            })
        }
    }, [selectedTask])
} 

