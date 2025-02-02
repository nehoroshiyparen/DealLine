import { MiniUser, Task } from '../../../types';
import './nodes.scss';

export const TaskNode = ({ data }: { data: { task: Task; onClick: () => void } }) => {
    const { task, onClick } = data;

    return (
        <div className='task-node_element'>
            <div className='task-node_header'>
                <div className='task-label'>
                    {task.title}
                </div>
                <div className='task-node_functions'>
                    <div className='node-more-function' onClick={onClick}>

                    </div>
                </div>
            </div>
            <div className='task-info'>
                <div className='task-deadline'>
                    Дедлайн: <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                        {task.deadline === null ? `Нет ограничений` : `${task.deadline}`}
                    </span>
                </div>
                <div className='task-priority'>
                    Приоритет: <span style={{
                        color: `${task.priority === 'low' ? '#1cd500' : task.priority === 'Medium' ? '#ff9900' : '#ff3232'}`,
                        fontWeight: 'bold'
                    }}>
                        {task.priority}
                    </span>
                </div>
                <div className='task-responsibeles'>
                    Ответственные лица: <span style={{ fontWeight: 'bold' }}>
                        {task.assignees && task.assignees.length !== 0 ? `${task.assignees.map((responsible: MiniUser) => responsible.username).join(', ')}` : `Нет`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export const nodeTypes = {
    taskNode: TaskNode,
};
