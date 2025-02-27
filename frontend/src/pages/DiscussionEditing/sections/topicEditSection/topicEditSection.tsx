import InputEditor from '../../components/editors/InputEditor'
import DefaultList from '../../components/someList/defaultList'
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext'
import './topicEditSection.scss'

const TopicEditSection = () => {

    const {
        discussion,
        updatedDiscussion,
        addTopic,
        deleteTopic,
        selectedTopic,
        setSelectedTopic,
        selectedTopicTitle,
        setSelectedTopicTitle,
    } = useDiscussionEditContext()

    const createTopic = () => {
        addTopic()
    }

    const removeTopic = () => {
        deleteTopic(selectedTopic?.id!)
    }

    return (
        <div className='topic-edit--section'>
            <div className='topics-editing' style={{zIndex: '1'}}>
                <div className='selectedTopicTitle'>
                    Тема: 
                        {selectedTopic
                            ? <span> {selectedTopicTitle}</span>
                            : ' Тема не выбрана'
                        }
                </div>
                <DefaultList list={updatedDiscussion} state={selectedTopic} setState={setSelectedTopic} type='topics'/>
            </div>
            {selectedTopic 
                ? 
                <div className='edit-param--container'>
                    <div className="editeble-param">
                        <div className="param-title _title">
                            Название:
                        </div>
                        <InputEditor 
                            state={selectedTopicTitle} 
                            setState={setSelectedTopicTitle}  
                            entity="topic" 
                            id={selectedTopic.id}/>
                    </div>
                </div>
                :
                null
            }
            <div className='edit-functions--block'>
                <div 
                    className='add-element edit-function' 
                    onClick={createTopic}
                >
                    Добавить тему
                </div>
                <div 
                    className={`delete-element edit-function ${selectedTopic ? 'selected' : ''}`}
                    onClick={removeTopic}
                >
                    Удалить тему
                </div>
            </div>
        </div>
    )
}

export default TopicEditSection