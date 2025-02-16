import { useDiscussionContext } from "../context+provider/discussionContext"

const TopicListHeader = () => {

    const {
        NavigateToTopics,
        isTopicsOpen
    } = useDiscussionContext()

    return (
        <div className="topics-header--top" onClick={NavigateToTopics}>
            <span>Темы</span>
            <div className='topic-header--disc --show' style={{ rotate: isTopicsOpen ? '-90deg' : '0deg' }}>
                <img src='/images/direction.png' width={'100%'}/>
            </div>
        </div>
    )
}

export default TopicListHeader