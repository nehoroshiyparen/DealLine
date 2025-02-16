import { useContext, useEffect, useRef, useState } from "react"
import { Topic } from "../../../../types"
import TaskComponent from "../task/task"
import './topic.scss'
import { useDiscussionContext } from "../context+provider/discussionContext"

interface props {
    topic: Topic | null,
}

const TopicComponent = ({topic}: props) => {

    const {
        NavigateToTopic,
        NavigateToTopics,
        selectedTopic,
    } = useDiscussionContext()

    const [isOpen, setIsOpen] = useState(false) // тут я оставляю свой isOpen потому что если я задам глобальный, то все задачи будут открываться
    const topicContentRef = useRef<HTMLDivElement | null>(null)

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true)
            NavigateToTopic(topic) // выбирает какой-либо топик
        } else {
            setIsOpen(false)
            NavigateToTopics() // при переходе на верхний уровень сбрасывался selectedtopic
        }
    }
    useEffect(() => {
        if (!selectedTopic) {
            setIsOpen(false)
        }
    }, [selectedTopic]) 

    useEffect(() => {
        const topicContentDiv = topicContentRef.current

        if (!topicContentDiv) return

        if (isOpen) {
            topicContentDiv.style.height = `${topicContentDiv.scrollHeight}px`
        } else {
            topicContentDiv.style.height = `${topicContentDiv.scrollHeight}px`
            requestAnimationFrame(() => {
                topicContentDiv.style.height = '0px'
            })
        }
    }, [isOpen])

    if (!topic) return

    return (
        <div className="topic--element">
            <div className="topic-header--element" id={`topic-header--element-id${topic.id}`} onClick={handleOpen}>
                <span className="topic-title">
                    {topic.title}
                </span>
                <div className="topic-header--show --show">
                    <img src='/images/direction.png' width={'100%'} style={{ rotate: isOpen ? '-90deg' : '0deg' }}/>
                </div>
            </div>
            <div 
                className="topic-content" 
                ref={topicContentRef}
                style={{
                    overflow: 'hidden',
                    transition: 'height 0.5s, all 0.5s',
                }}
            >
                {topic.tasks.map((task, index) => (
                     <div className="hightest-task" id={`task-id${task.id}`} key={task.id} style={{position: 'relative', top: '0px', transition: '0.5s'}}>
                        <TaskComponent task={task} key={task.id}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopicComponent