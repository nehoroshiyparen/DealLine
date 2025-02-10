import { useContext, useEffect, useRef, useState } from "react"
import { Topic } from "../../../../../types"
import TaskComponent from "../task/task"
import './topic.scss'
import { useDiscussionContext } from "../../context+provider/discussionContext"

interface props {
    topic: Topic | null,
}

const TopicComponent = ({topic}: props) => {
    
    const {
        
        selectedTopic,
        setSelectedTopic,
        handleChooseTopic,
        handleShowTopics,

    } = useDiscussionContext()

    const topicContentRef = useRef<HTMLDivElement | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!selectedTopic) {
            setIsOpen(false)
        }
        if (topic && selectedTopic && topic.id === selectedTopic.id) {
            setIsOpen(true)
        }
    }, [selectedTopic]) // нужно для того, чтобы при переходе к верхним уровням, выбранный топик закрывался

    const handleOpen = async(topic: Topic | null) => {  // здесь будет только функция открытия, что правильно. На копии будет функция закрытия
        if (!isOpen) {
            setIsOpen(true)
            setSelectedTopic(topic)
            await new Promise(resolve => setTimeout(resolve, 500))
            handleChooseTopic(topic)
        }
    }
    
    useEffect(() => {
        const topicContentDiv = topicContentRef.current

        if (!topicContentDiv) return

        if (isOpen) {
            topicContentDiv.style.height = '0'
            topicContentDiv.style.height = `${topicContentDiv.scrollHeight}px`
        } else {
            requestAnimationFrame(() => {
                topicContentDiv.style.height = '0';
            });
        }
    }, [isOpen])

    if (!topic) return

    return (
        <div className="topic--element">
            <div className="topic-header--element" onClick={() => handleOpen(topic)}>
                <span className="topic-title">
                    {topic.title}
                </span>
                <div className="topic-header--show --show">
                    <img src='/images/direction.png' width={'100%'}/>
                </div>
            </div>
        </div>
    )
}

export default TopicComponent