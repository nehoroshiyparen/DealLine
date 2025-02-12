import { useEffect, useRef } from "react";
import { Discussion } from "../../../types";

interface useTopicAnimationProps {
    hightestContainerRef: React.RefObject<HTMLDivElement>;
    currentView: string;
    isTopicOpen: boolean;
    selectedTopic: { tasks: any[] } | null;
    selectedTask: any | null;
    discussionRef: React.RefObject<HTMLDivElement | null>;
    topicsListRef: React.RefObject<HTMLDivElement | null>;
    topicRef: React.RefObject<HTMLDivElement | null>;
    taskRef: React.RefObject<HTMLDivElement | null>;
    topicListHeaderRef: React.RefObject<HTMLDivElement | null>;
    topicListContentRef: React.RefObject<HTMLDivElement | null>;
} 

export const useTopicAmimation = ({
    hightestContainerRef,
    currentView,
    isTopicOpen,
    selectedTopic,
    selectedTask,
    discussionRef,
    topicsListRef,
    topicRef,
    taskRef,
    topicListHeaderRef,
    topicListContentRef,
}: useTopicAnimationProps) => {

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        Animation_close_topic()
    }, [isTopicOpen])

    const Animation_close_topic = () => {
        if (!isTopicOpen) {
            const topic_div = topicRef.current
            if (!topic_div) return

            topic_div.style.background = 'white'
            const timer = async() => {
                return await new Promise(resolve => setTimeout(resolve, 800))
            }
            timer()
        }
    }
}