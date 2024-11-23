import React, { useState } from 'react'
import { Task } from '../../types'
import './task-component.scss'
import { openTask } from './task-component'

interface TaskComponentProps {
    task: Task,
    index: number,
}

const Task_Component: React.FC<TaskComponentProps> = ({task, index}) => {

    const [isOpen, setIsOpen] = useState(true)

    return(
        <div className='task'>
            <div className='task-top'>
                <div className='task-title' onClick={openTask}>
                    {index+1}. <span>{task.title}</span>
                </div>
                <div className={`task-info`}>
                    <div className='deadline task-info-component'>
                        Дедлайн: <span className='deadline-property'>{task.deadline}</span>
                    </div>
                    <div className='priority task-info-component'>
                        Приоритет: <span className='priority-property'>{task.priority}</span>
                        <div className='priority-status' style={{backgroundColor: `${task.priority === 'Высокий' ? '#f72f2f' : task.priority === 'Средний' ? '#ff9f22' : '#3aec3d'}`}}/>
                    </div>
                    <div className='responsible task-info-component'>
                        Отвечают за задачу: <span className='responsible-property' style={{textDecoration: 'underline'}}>{task.responsible.map((person) => (
                            person.user_name
                        ))}</span>
                    </div>
                    <div className='task-description'>
                        {task.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task_Component