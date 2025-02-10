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
        setIsTaskOpen,
        handleOpenTask,
        isTaskOpen,

   } = useDiscussionContext()

    const contentRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!selectedTask) {
            setIsTaskOpen(false)
        }
    }, [selectedTask])

    /*
    useEffect(() => {
        const content = contentRef.current

        if (!content) return

        if (isOpen) {
            content.style.height = '0px'
            content.style.height = `${content.scrollHeight}px`
        } else {
            requestAnimationFrame(() => {
                content.style.height = '0px'
            })
        }
    }, [isOpen])
    */

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
                ref={contentRef} 
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