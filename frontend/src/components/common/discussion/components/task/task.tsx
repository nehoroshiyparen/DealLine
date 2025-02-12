import { useEffect, useRef, useState } from "react";
import { Task, MiniUser } from "../../../../../types";
import './task.scss'
import { useDiscussionContext } from "../../context+provider/discussionContext";

interface Props {
    task: Task | null;
}

const TaskComponent = ({ task }: Props) => {

    const {
        selectedTask,
        NavigateToTask,
        NavigateBackToTopic,
    } = useDiscussionContext()

    const [isOpen, setIsOpen] = useState(false) // тут я оставляю свой isOpen потому что если я задам глобальный, то все задачи будут открываться
    const taskContentRef = useRef<HTMLDivElement | null>(null)

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true)
            NavigateToTask(task)
        } else {
            setIsOpen(false)
            NavigateBackToTopic()
        }
    }

    if (!task) {
        return <div>Задача не найдена</div>;
    }

    return (
        <div className="task-component">
            <div className="task-component--header" onClick={() => handleOpenTask(task)}>
                <span>{task.title}</span>
                <div className="task-header--show --show" style={{rotate: `${isTaskOpen ? '-90deg' : '0deg'}`}}>
                        <img src='/images/direction.png' width={'100%'}/>
                </div>
            </div>
            <div 
                className="task-component--info" 
                ref={taskContentRef} 
                style={{
                    height: isTaskOpen ? 'auto' : '0',
                    overflow: 'hidden',
                    transition: 'height 0.3s'
                }}
            >
                <div className="">
                    {task.deadline ? task.deadline.toDateString() : 'Дедлайна нет'}
                </div>
            </div>
        </div>
    );
};

export default TaskComponent;