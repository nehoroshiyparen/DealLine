import AddMember from "../../components/addMember/addMember"
import InputEditor from "../../components/editors/InputEditor"
import TextareaEditor from "../../components/editors/TextareaEditor"
import Assignee from "../../components/member/assignee"
import DefaultList from "../../components/someList/defaultList"
import { useDiscussionEditContext } from "../../context+provider/discussionEditContext"
import './taskEditSection.scss'
import PriorityPicker from "../../components/pickerList/priorityPicker"
import StatusPicker from "../../components/pickerList/StatusPicker"
import Calendar from "../../components/calendar/calendar"

const TaskEditSection = () => {

    const {
        discussion,
        updatedDiscussion,
        addTaskToTopic,
        deleteTask,
        selectedTopic,
        selectedTask,
        setSelectedTask,
        selectedTaskTitle,
        setSelectedTaskTitle,
        selectedTaskDescription,
        setSelectedTaskDescription,
        selectedTaskAssignees,
    } = useDiscussionEditContext()

    const createTask = () => {
        addTaskToTopic(selectedTopic?.id!)
    }

    const removeTask = () => {
        deleteTask(selectedTask?.id!)
    }

    return (
        <div className="task-edit-section">
             <div className='task-editing' style={{zIndex: '0'}}>
                <div className='selectedTaskTitle'>
                    Задача: 
                        {selectedTask
                            ? <span> {selectedTaskTitle}</span>
                            : ' Задача не выбрана'
                        }
                </div>
                {selectedTopic 
                    ? <DefaultList list={updatedDiscussion} state={selectedTask} setState={setSelectedTask} type="tasks"/> 
                    : null
                }
            </div>
            {selectedTopic && selectedTask ? 
                <>
                    <div className="editeble-param">
                        <div className="param-title _title">
                            Название:
                        </div>
                        <InputEditor 
                            state={selectedTaskTitle} 
                            setState={setSelectedTaskTitle} 
                            entity="task" 
                            id={selectedTask.id}
                        />
                    </div>
                    <div className="editeble-param">
                        <div className="param-title _title">
                            Описание:
                        </div>
                        <TextareaEditor 
                            state={selectedTaskDescription} 
                            setState={setSelectedTaskDescription} 
                            placeholder="Опишите задачу"
                            entity="task"
                            id={selectedTask.id}
                        />
                    </div>
                    <div className="editeble-param">
                        <div className="param-title _members">
                            Ответственные за задачу:
                        </div>
                        <div className='regular-box'>
                            <div className='member-list--editeble'>
                                <div className='member-list--scroll'>
                                    {selectedTaskAssignees?.map((assignee) => (
                                        <Assignee member={assignee} key={assignee.id}/>
                                    )).reverse()}
                                </div>
                                <AddMember users={discussion?.members} type="assignees"/>
                            </div>
                        </div>
                    </div>
                    <div className="editeble-param">
                        <div className="param-title _members">
                            Дедлайн: 
                        </div>
                        <div className='regular-box'>
                            <Calendar/>
                        </div>
                    </div>
                    <div className="editeble-param">
                        <div className="param-title _members">
                            Приоритет:
                        </div>
                        <div className='regular-box'>
                            <PriorityPicker/>
                        </div>
                    </div>
                    <div className="editeble-param">
                        <div className="param-title _members">
                            Статус:
                        </div>
                        <div className='regular-box'>
                           <StatusPicker/>
                        </div>
                    </div>
                </>
                :
                null
            }
            {selectedTopic
                ? <div className='edit-functions--block'>
                    <div 
                        className='add-element edit-function' 
                        onClick={createTask}
                    >
                        Добавить задачу
                    </div>
                    <div 
                        className={`delete-element edit-function ${selectedTask ? 'selected' : ''}`}
                        onClick={removeTask}
                        >
                            Удалить задачу
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default TaskEditSection