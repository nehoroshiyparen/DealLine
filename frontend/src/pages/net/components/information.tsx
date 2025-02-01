import { useEffect, useRef, useState } from 'react'
import { Task } from '../../../types';
import '../net.scss'
import { TaskService } from '../../../service/ taskService';
import Comments from '../../../components/common/comments/commentForm';

interface props {
    taskId: number;
}

const TaskInformation = ({taskId}: props) => {

    const contentRef = useRef<HTMLDivElement | null>(null)
    const resizerRef = useRef<HTMLDivElement | null>(null)

    const [task , setTask] = useState<Task>()

    useEffect(() => {
        const fetchTask = async() => {
            const response = await TaskService.fetchTask(taskId)
            setTask(response.data)
        }

        fetchTask()
    }, [taskId])

    useEffect(() => {
        const content = contentRef.current;
        const resizer = resizerRef.current;

        if (!content || !resizer) return;

        const resize = (event: MouseEvent) => {
            const newWidth = content.getBoundingClientRect().right - event.clientX;
            content.style.width = `${newWidth}px`;
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
        };
    }, []);

    return (
        <div className="task_information" ref={contentRef}>
        <div className='resizer' ref={resizerRef}></div>
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
                        Ответственные за задание: <span className='bold'>{task?.assignees.length !== 0 ? task?.assignees.map((assignee) => assignee.username) : 'Ответственных нет'}</span>
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
                <Comments/>
            </div>
        </div>
    </div>
    )
}

export default TaskInformation