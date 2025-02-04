import { useEffect, useRef, useState } from "react"
import { Topic } from "../../../../types"
import TaskComponent from "../components/task"

interface props {
    topic: Topic
}

const TopicComponent = ({topic}: props) => {

    const [isOpen, setIsOpen] = useState(false)
    const topicContentRef = useRef<HTMLDivElement | null>(null)

    const handleOpen = () => {
        setIsOpen((prev) => !prev)
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

    return (
        <div className="topic-component">
            <div className="topic-header" onClick={handleOpen}>
                <div className="topic-title">
                    {topic.title}
                </div>
                <div className="topic-header--show" style={{rotate: `${isOpen ? '-90deg' : '0deg'}`}}>
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
                    <TaskComponent task={task} index={index}/>
                ))}
            </div>

        </div>
    )
}

export default TopicComponent