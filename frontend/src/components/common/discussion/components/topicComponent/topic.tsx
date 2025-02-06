import { useContext, useEffect, useRef, useState } from "react"
import { Topic } from "../../../../../types"
import TaskComponent from "../task/task"
import './topic.scss'
import { useDiscussionContext } from "../../discussion"

interface props {
    topic: Topic
}

const TopicComponent = ({topic}: props) => {
    const context = useDiscussionContext()
    if (!context) return

    const { 
        handleChooseTopic, 
        handleShowTopics,
        isTopicsOpen,
        selectedTopic
    } = context

    const [isOpen, setIsOpen] = useState(false)
    const topicContentRef = useRef<HTMLDivElement | null>(null)

    // СЛЕЖЕНИЕ ЗА СОСТОЯНИЕМ ОТКРЫТО/НЕ ОТКРЫТО

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true)
            handleChooseTopic(topic) // выбирает какой-либо топик
        } else {
            setIsOpen(false)
            handleShowTopics() // при переходе на верхний уровень сбрасывался selectedtopic
        }
    }

    useEffect(() => {
        if (!selectedTopic) {
            setIsOpen(false)
        }
    }, [selectedTopic]) // нужно для того, чтобы при переходе к верхним уровням, выбранный топик закрывался

    // ЛОГИКА ОТКРЫТИЯ

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

    return (
        <div className="topic--element">
            <div className="topic-header--element" onClick={handleOpen}>
                <div className="topic-title">
                    {topic.title}
                </div>
                <div className="topic-header--show --show" style={{rotate: `${isOpen ? '-90deg' : '0deg'}`}}>
                    <img src='/images/direction.png' width={'100%'}/>
                </div>
            </div>
            <div 
                className="topic-content" 
                ref={topicContentRef}
                style={{
                    height: isOpen ? 'auto' : '0',
                    overflow: 'hidden',
                    transition: 'height 0.3s',
                }}
            >
                {topic.tasks.map((task, index) => (
                    <TaskComponent task={task} index={index} key={task.id}/>
                ))}
            </div>
        </div>
    )
}

export default TopicComponent