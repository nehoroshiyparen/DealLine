import { useContext, useEffect, useRef } from "react"
import { Topic } from "../../../../../types"
import TopicComponent from "../topicComponent/topic"
import './topicList.scss'
import { useDiscussionContext } from "../../context+provider/discussionContext"

interface Props {
    topics: Topic[],
}

const TopicList = ({ topics }: Props) => {

    const {
        isTopicListOpen,
        topicListContentRef,
    } = useDiscussionContext()

    // ЛОГИКА ОТКРЫТИЯ

    useEffect(() => {
        const content = topicListContentRef.current
        if (!content) return

        if (isTopicListOpen) {
            content.style.height = `${content.scrollHeight}px`
        } else {
            content.style.height = `${content.scrollHeight}px`
            requestAnimationFrame(() => {
                content.style.height = '0px'
            })
        }
    }, [isTopicListOpen])

    return (
        <div className="topics-list">
            <div 
                className="topics-list-content"
                ref={topicListContentRef}
                style={{
                    overflow: 'hidden',
                    transition: 'height 0.3s ease-in-out',
                }}
            >
                {topics.map((topic, index) => (
                    <div className="hightest-topic" id={`topic-id${topic.id}`} key={index}
                        style={{transition: 'opacity 0.3s, all 0.5s', top: '0px', position: 'relative'}}
                    >
                        <TopicComponent topic={topic} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopicList
