import { useEffect, useRef, useState } from "react";
import { Task } from "../../../../types";
import './task.scss'
import { useDiscussionContext } from "../context+provider/discussionContext";
import CommentsForm from "../../../../components/common/comments/commentForm/commentForm";
import CommentComponent from "../../../../components/common/comments/comment/comment";

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

    useEffect(() => {
        if (!selectedTask) {
            setIsOpen(false)
        }
    }, [selectedTask])

    if (!task) {
        return <div>Задача не найдена</div>;
    }

    return (
        <div className="task-component">
            <div className="task-component--header" onClick={() => handleOpen()}>
                <span>{task.title}</span>
                <div className="task-header--show --show" style={{rotate: `${isOpen ? '-90deg' : '0deg'}`}}>
                        <img src='/images/direction.png' width={'100%'}/>
                </div>
            </div>
            <div 
                className="task-component--info" 
                ref={taskContentRef} 
                style={{
                    height: isOpen ? '835px' : '0',
                    overflow: 'scroll',
                    transition: 'height 0.3s'
                }}
            >
                <div className="task-params-container">
                    <div className="vertical-text" style={{fontSize: '20px'}}>
                        Параметры
                    </div>
                    <div className="task-params">
                        <div className="task-parameter">
                            <span>Дедлайн: </span> 
                            <div className="underlined-text">{task.deadline ? (new Date(task.deadline)).toLocaleDateString() : ' 20.02.2025'}</div>
                        </div>
                        <div className="task-parameter">
                            <span>Приоритет: </span> 
                            <div className="underlined-text">{task.priority}</div>
                        </div>
                        <div className="task-parameter">
                            <span>Статус: </span> 
                            <div className="underlined-text">{task.status}</div>
                        </div>
                    </div>
                </div>
                <div className="task-description--container">
                    <div className="task-description--head">
                        Описание
                    </div>
                    <div className="task-description--content">
                        {task.description}
                    </div>
                </div>
                <div className='comments-block'>
                    <div className='comments-count'>
                        Обсуждение {task?.comments.length}
                    </div>
                    <CommentsForm taskId={task.id} key={task.id}/>
                    {
                        task.comments.slice().map(comment => (
                            <CommentComponent comment={comment} key={comment.id}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default TaskComponent;