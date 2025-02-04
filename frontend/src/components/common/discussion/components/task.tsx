import { Task, MiniUser } from "../../../../types";

interface Props {
    task: Task;
    index: number;
}

const TaskComponent = ({ task, index }: Props) => {

    if (!task.priority || index === undefined) {
        return <div>Задача не найдена</div>;
    }

    return (
        <div className="task-component">
            <div className="task-title">
                #{index + 1}. {task.title}
            </div>
            <div className="task-info">
                <div className={`task-priority--info`}>
                    {task.priority}
                </div>
                <div className={`task-status`}>
                    {task.status}
                </div>
                <div className="task-info-item">
                    📅 <span className="task-deadline">{new Date(task.deadline).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="task-assignees">
                {task.assignees ? task.assignees.map((assignee, idx) => (
                    <img
                        key={idx}
                        src={assignee.avatar || '/images/profile.png'}
                        alt={assignee.username}
                        className="task-assignee-avatar"
                    />
                )) : 'пошли нахуй'}
            </div>
            <div className="task-comments">
                💬 <span>{task.comments.length} комментариев</span>
            </div>
        </div>
    );
};

export default TaskComponent;