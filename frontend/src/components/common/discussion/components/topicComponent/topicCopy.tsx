import { useEffect, useRef } from "react"
import { Topic } from "../../../../../types"
import { useDiscussionContext } from "../../context+provider/discussionContext"
import TaskComponent from "../task/task"
import { useTopicAmimation } from "../../../../../hooks/discussionComponent/animations/useTopicAnimation"

interface TopicCopyProps {
    topic: Topic | null
}

const TopicCopy = ({topic}: TopicCopyProps) => {

    if (!topic) return

    const {
        isTopicOpen,
        setIsTopicOpen,
        handleBackToTopics,
        hightestContainerRef,
        currentView,
        selectedTopic,
        selectedTask,
        discussionRef,
        topicsListRef,
        topicRef,
        taskRef,
        topicListHeaderRef,
        topicListContentRef,
    } = useDiscussionContext()

    useTopicAmimation({
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
    })

    const topicContentRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (topic) {
            setIsTopicOpen(true)
        }
    }, [topic])

    useEffect(() => {
        const contentDiv = topicContentRef.current
        if (!contentDiv) return

        if (isTopicOpen) {
            contentDiv.style.height = '0px' 
            requestAnimationFrame(() => {
                const fullHeight = contentDiv.scrollHeight + 'px'
                contentDiv.style.height = fullHeight
            })
        } else {
            const fullHeight = contentDiv.scrollHeight + 'px'
            contentDiv.style.height = fullHeight 
            requestAnimationFrame(() => {
                contentDiv.style.height = '0px'
            })
        }
    }, [isTopicOpen])

    return (
        <div className="topic--element">
        <div className="topic-header--element" onClick={() => handleBackToTopics()}>
            <span className="topic-title">
                {topic.title}
            </span>
            <div className="topic-header--show --show" style={{rotate: `${isTopicOpen ? '-90deg' : '0deg'}`}}>
                <img src='/images/direction.png' width={'100%'}/>
            </div>
        </div>
        <div 
            className="topic-content" 
            ref={topicContentRef}
            style={{
                height: '0px',
                overflow: 'hidden',
                transition: 'height 0.3s',
            }}
        >
            {topic.tasks.map((task) => (
                <TaskComponent task={task} key={task.id}/>
            ))}
        </div>
    </div>
    )
}

export default TopicCopy