import DefaultList from '../../components/someList/defaultList'
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext'
import './topicEditSection.scss'

const TopicEditSection = () => {

    const {
        discussion,
        selectedTopic,
        setSelectedTopic,
        selectedTopicTitle,
        setSelectedTopicTitle,
    } = useDiscussionEditContext()

    console.log(selectedTopicTitle)

    return (
        <div className='topic-edit--section'>
            <div className='topics-editing' style={{zIndex: '1'}}>
                <div className='selectedTopicTitle'>
                    Тема: 
                        {selectedTopic
                            ? <span> {selectedTopic.title}</span>
                            : ' Тема не выбрана'
                        }
                </div>
                <DefaultList list={discussion} state={selectedTopic} setState={setSelectedTopic}/>
            </div>
            <div className='edit-param--container'>
                <div className="editeble-param">
                    <div className="param-title _title">
                        Название:
                    </div>
                    <input 
                        className='edit-box title'
                        style={{}}
                        value={selectedTopicTitle || ''}
                        onChange={(e) => setSelectedTopicTitle(e.target.value)}
                        >

                    </input>
                </div>
            </div>
        </div>
    )
}

export default TopicEditSection