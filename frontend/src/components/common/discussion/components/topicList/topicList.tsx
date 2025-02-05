import { useEffect, useRef, useState } from "react"
import { Topic } from "../../../../../types"
import TopicComponent from "../topic"
import './topicList.scss'

interface props {
    topics: Topic[],
    isOpen: boolean
}

const TopicList = ({topics, isOpen}: props) => {


    const contentRef = useRef<HTMLDivElement |null>(null)

    useEffect(() => {
        const content = contentRef.current

        if (!content) return

        if (isOpen) {
            content.style.height = '0px'
            content.style.height = `${content.scrollHeight}px`
        } else {
            const fullHeight = content.scrollHeight + 'px';
            content.style.height = fullHeight;
            requestAnimationFrame(() => {
                content.style.height = '0';
            });
            content.style.padding = '0px 30px'
        }
    }, [isOpen])

    return (
        <div className="topic-list">
            <div 
                className="topic-content" 
                ref={contentRef}
                style={{
                    overflow: 'hidden',
                    transition: 'height 0.3s',
                }}
            >
                {topics.map((topic, index) => (
                    <div className="topic-component" key={index}>
                        <TopicComponent topic={topic} key={index}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopicList