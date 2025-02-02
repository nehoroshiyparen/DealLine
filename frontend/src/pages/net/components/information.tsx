import { useEffect, useRef, useState } from 'react'
import { Task } from '../../../types';
import '../net.scss'
import CommentsForm from '../../../components/common/comments/commentForm/commentForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import CommentComponent from '../../../components/common/comments/comment/comment';
import { TaskService } from '../../../service/ taskService';

interface props {
    taskId: number;
}

const TaskInformation = ({taskId}: props) => {

    const contentRef = useRef<HTMLDivElement | null>(null)
    const resizerRef = useRef<HTMLDivElement | null>(null)
    const closeRef = useRef<HTMLDivElement | null>(null)

    const user = useSelector((state: RootState) => state.user);

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [width, setWidth] = useState(0)
    const [task, setTask] = useState<Task>()

    const userId = user.user.id

    useEffect(() => {
        const fetchTask = async() => {
            const response = await TaskService.fetchTask(taskId)
            setTask(response.data)
        }
        fetchTask()
    }, [taskId])

    const close = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        if (contentRef.current) {
            setWidth(contentRef.current.offsetWidth);
        }
    }, [isOpen, task]); 

    useEffect(() => {
        const content = contentRef.current;
        const resizer = resizerRef.current;
    
        if (!content || !resizer) return;
    
        const resize = (event: MouseEvent) => {
            const newWidth = content.getBoundingClientRect().right - event.clientX;
            requestAnimationFrame(() => {
                content.style.width = `${newWidth}px`;
                setWidth(newWidth);
            });
        };
    
        const stopResize = () => {
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);
        };
    
        const startResize = (event: MouseEvent) => {
            event.preventDefault();
            document.addEventListener("mousemove", resize);
            document.addEventListener("mouseup", stopResize);
        };
    
        resizer.addEventListener("mousedown", startResize);
    
        return () => {
            resizer.removeEventListener("mousedown", startResize);
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);
        };
    }, []);
    

    if (!task) return null

    return (
        <div 
            className={`task_information`} 
            style={{
                transform: isOpen ? 'translateX(0)' : `translateX(${width}px)`, 
                transition: 'transform 0.3s ease'
            }} 
            ref={contentRef}
        >
        <div className='close_information' ref={closeRef} onClick={close}/>
        <div className='resizer' ref={resizerRef}/>
        <div className='information_block'>
            <div className='information_content'>
                <div className='inf-label'>
                    Развернутая карточка задания
                </div>
                <div className='task_label--information'>
                    {task?.title}
                </div>
                <div className='task_param--information'>
                    <div className='vertical-text'>
                        Параметры
                    </div>
                    <div className='params-list'>
                        <div className='param-card'>
                            <i className="fas fa-calendar-alt"></i> Дедлайн: <span className='bold'>{task?.deadline ? task.deadline.toString() : 'Нет ограничений'}</span>
                        </div>
                        <div className='param-card'>
                            <i className="fas fa-exclamation-circle"></i> Приоритет: <span className='bold'>{task?.priority}</span>
                        </div>
                        <div className='param-card'>
                            <i className="fas fa-info-circle"></i> Статус: <span className='bold'>{task?.status}</span>
                        </div>
                    </div>
                    <div className='task_assignees'>
                        Ответственные за задание: <span className='bold'>{task.assignees && task.assignees.length !== 0 ? task?.assignees.map((assignee) => assignee.username) : 'Ответственных нет'}</span>
                    </div>
                </div>
                <div className='task_description--information'>
                    <span style={{fontSize: '30px', fontWeight: 'bold'}}> Описание <br/> </span>
                    {task?.description ? task.description : 'Описания нет'}
                </div>
            </div>
            <div className='comments-block'>
                <div className='comments-count'>
                    Обсуждение {task?.comments.length}
                </div>
                <CommentsForm userId={userId} taskId={task.id}/>
                {
                    task.comments.map(comment => (
                        <CommentComponent comment={comment}/>
                    ))
                }
            </div>
        </div>
    </div>
    )
}

export default TaskInformation