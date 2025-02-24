import { useEffect, useState } from 'react'
import './priorityPicker.scss'
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext'

const StatusPicker = () => {

    const {
        selectedTask,
        selectedTaskStatus,
        setSelectedTaskStatus,
        updateField,
    } = useDiscussionEditContext()

    useEffect(() => {
        updateField('status', selectedTaskStatus, selectedTask?.id, 'task')
    }, [selectedTaskStatus])

    return (
        <div className="picker--list">
            <div 
                className={`choose-option medium-priority ${selectedTaskStatus === 'В процессе' ? 'choosen' : ''}`}
                onClick={() => setSelectedTaskStatus('В процессе')}
            >
                В процессе              
            </div>
            <div 
                className={`choose-option low-priority ${selectedTaskStatus === 'Завершено' ? 'choosen' : ''}`}
                onClick={() => setSelectedTaskStatus('Завершено')}
            >
                Завершено              
            </div>
        </div>
    )
}

export default StatusPicker