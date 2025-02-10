import React, { SetStateAction, useEffect } from 'react';
import { Discussion, Task, Topic } from '../../../types'

interface useDiscussionAnimationProps {
    hightestContainerRef: React.RefObject<HTMLDivElement>;
    isOpen: boolean;
    currentView: string;
    originalSize: number;
    selectedTopic: Topic | null;
    selectedTask: Task | null;
    discussionRef: React.RefObject<HTMLDivElement | null>;
    topicsListRef: React.RefObject<HTMLDivElement | null>;
    topicRef: React.RefObject<HTMLDivElement | null>;
    taskRef: React.RefObject<HTMLDivElement | null>;
    topicListHeaderRef: React.RefObject<HTMLDivElement | null>;
    topicListContentRef: React.RefObject<HTMLDivElement | null>;
    savedPosition: {discussion: number, topicListHeader: number, topicList: number} | null;
    setSavedPosition: React.Dispatch<SetStateAction<{discussion: number, topicListHeader: number, topicList: number} | null>>;
    discussion: Discussion;
}

export const useDiscussionAnimation = ({
    hightestContainerRef,
    isOpen,
    currentView,
    originalSize,
    selectedTopic,
    selectedTask,
    discussionRef,
    topicsListRef,
    topicRef,
    taskRef,
    topicListHeaderRef,
    topicListContentRef,
    savedPosition,
    setSavedPosition,
    discussion
}: useDiscussionAnimationProps) => {

    useEffect(() => {
        const contentDiv = hightestContainerRef.current
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

    const savePosition = () => {
        const discussion_div = discussionRef.current
        const topicListHeader_div = topicListHeaderRef.current
        const topicList_div = topicsListRef.current

        if (discussion_div && topicListHeader_div && topicList_div) {
            setSavedPosition({
                discussion: discussion_div.getBoundingClientRect().top,
                topicListHeader: topicListHeader_div.getBoundingClientRect().top,
                topicList: topicList_div.getBoundingClientRect().top
            })
        }
    }

    useEffect(() => {
        if (currentView === 'discussion' || currentView === 'topicList' && isOpen) {
            Animation_between_S1S2(currentView)
        }
    }, [currentView])

    const Animation_between_S1S2 = (currentView: string) => {
        const size_div = hightestContainerRef.current

        const discussion_div = discussionRef.current
        const topicList_div = topicsListRef.current
        const topicListHeader_div = topicListHeaderRef.current

        const overflow = document.querySelector('.topics-list-content') as HTMLElement
        overflow.style.overflow = 'visible'
        overflow.style.background = 'white'

        if (!discussion_div || !topicList_div || !topicListHeader_div || !size_div) return

        if (currentView === 'topicList') {
            discussion_div.style.opacity = '0'
            discussion_div.style.top = `-${discussion_div.scrollHeight}px`

            const info_pos = discussion_div.getBoundingClientRect().top + window.scrollY
            const header_pos = topicListHeader_div.getBoundingClientRect().top + window.scrollY
            const list_pos = topicList_div.getBoundingClientRect().top + window.scrollY
            const offset1 = header_pos - info_pos
            const offset2 = list_pos - info_pos - topicListHeader_div.scrollHeight

            topicListHeader_div.style.top = `-${offset1}px`

            topicList_div.style.top = `-${offset2}px`

            size_div.style.height = `${((discussion.topics.length+1)*78.5+100.5)}px`
        } else if (currentView === 'discussion') {
            discussion_div.style.opacity = '1'
            discussion_div.style.top = '0px'

            topicListHeader_div.style.top = '0px'

            topicList_div.style.top = '0px'

            size_div.style.height = `${originalSize}px`
        }
    }

    useEffect(() => {
        Animation_open_topic(selectedTopic)
    }, [selectedTopic])

    const Animation_open_topic = (selectedTopic: Topic | null) => {
        const size_div = hightestContainerRef.current

        const topicListHeader_div = topicListHeaderRef.current
        const topicList_div = topicsListRef.current
        const topicListContent_div = topicListContentRef.current

        if (!size_div || !topicListHeader_div || !topicList_div || !topicListContent_div) return

        if (selectedTopic) {
            const selected_div = document.querySelector(`#topic-id${selectedTopic.id}`) as HTMLElement
            discussion.topics.forEach((topic) => {
                if (topic.id === selectedTopic.id) {
                    return;
                }
                const elem = document.querySelector(`#topic-id${topic.id}`) as HTMLElement
                elem.style.opacity = '0'
            })
            topicListContent_div.style.overflow = 'visible'
            topicListHeader_div.style.opacity = '0'

            const header_pos = topicListHeader_div.getBoundingClientRect().top + window.scrollY
            const selected_pos = selected_div.getBoundingClientRect().top + window.scrollY
            const offset = selected_pos - header_pos

            selected_div.style.width = `${topicListContent_div.scrollWidth}px`
            selected_div.style.padding = '0px 0px'
            selected_div.style.top = `-${offset}px` 

            size_div.style.height = `${(selectedTopic.tasks.length+1)*76+78.5}px`
        }
    }
}