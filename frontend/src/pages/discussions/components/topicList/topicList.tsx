import { Topic } from "../../../../types"
import TopicComponent from "../topicComponent/topic"
import './topicList.scss'
import { useDiscussionContext } from "../context+provider/discussionContext" 

interface Props {
    topics: Topic[],
}

const TopicList = ({ topics }: Props) => {

    const {
        topicListContentRef
    } = useDiscussionContext()

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
                    <div className="hightest-topic" id={`topic-id${topic.id}`} key={index} style={{position: 'relative', top: '0px', transition: '0.5s'}}>
                        <TopicComponent topic={topic} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopicList
