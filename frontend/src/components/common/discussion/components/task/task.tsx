import { useEffect, useRef, useState } from "react";
import { Task, MiniUser } from "../../../../../types";
import './task.scss'

interface Props {
    task: Task;
    index: number;
}

const TaskComponent = ({ task, index }: Props) => {

    const contentRef = useRef<HTMLDivElement | null>(null)

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen((prev) => (!prev))
    }

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

    if (!task.priority || index === undefined) {
        return <div>Задача не найдена</div>;
    }

    return (
        <div className="task-component">
            <div className="task-component--header" onClick={handleOpen}>
                <span>{task.title}</span>
                <div className="task-header--show --show" style={{rotate: `${isOpen ? '-90deg' : '0deg'}`}}>
                        <img src='/images/direction.png' width={'100%'}/>
                </div>
            </div>
            <div 
                className="task-component--info" 
                ref={contentRef} 
                style={{
                    height: isOpen ? 'auto' : '0',
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