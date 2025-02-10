import { useDiscussionContext } from "../context+provider/discussionContext"

const TopicListHeader = () => {

    const {
        handleOpenTopics,
        isTopicListOpen
    } = useDiscussionContext()

    return (
        <div className="topics-header--top" onClick={handleOpenTopics}>
            <span>Темы</span>
            <div className='topic-header--disc --show' style={{ rotate: isTopicListOpen ? '-90deg' : '0deg' }}>
                <img src='/images/direction.png' width={'100%'}/>
            </div>
        </div>
    )
}

export default TopicListHeader