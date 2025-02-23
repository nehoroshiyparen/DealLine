import DefaultList from "../../components/someList/defaultList"
import { useDiscussionEditContext } from "../../context+provider/discussionEditContext"
import './taskEditSection.scss'

const TaskEditSection = () => {

    const {
        selectedTopic,
        selectedTask,
        setSelectedTask,
        selectedTaskTitle,
    } = useDiscussionEditContext()

    return (
        <div className="task-edit-section">
             <div className='task-editing'>
                <div className='selectedTaskTitle'>
                    Задача: 
                        {selectedTask
                            ? <span> {selectedTaskTitle}</span>
                            : ' Задача не выбрана'
                        }
                </div>
                <DefaultList list={selectedTopic} state={selectedTask} setState={setSelectedTask}/>
            </div>
        </div>
    )
}

export default TaskEditSection