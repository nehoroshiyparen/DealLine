import { useEffect, useState } from 'react'
import './priorityPicker.scss'
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext'

const PriorityPicker = () => {

    const {
        selectedTask,
        selectedTaskPriority,
        setSelectedTaskPriority,
        updateField,
    } = useDiscussionEditContext()

    useEffect(() => {
        updateField('priority', selectedTaskPriority, selectedTask?.id, 'task')
    }, [selectedTaskPriority])

    return (
        <div className="picker--list">
            <div 
                className={`choose-option high-priority ${selectedTaskPriority === 'Высокий' ? 'choosen' : ''}`}
                onClick={() => setSelectedTaskPriority('Высокий')}
            >
                Высокий              
            </div>
            <div 
                className={`choose-option medium-priority ${selectedTaskPriority === 'Средний' ? 'choosen' : ''}`}
                onClick={() => setSelectedTaskPriority('Средний')}
            >
                Средний                
            </div>
            <div 
                className={`choose-option low-priority ${selectedTaskPriority === 'Низкий' ? 'choosen' : ''}`}
                onClick={() => setSelectedTaskPriority('Низкий')}
            >
                Низкий                  
            </div>
        </div>
    )
}

export default PriorityPicker