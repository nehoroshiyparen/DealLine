import { MiniUser } from '../../../types'
import './nodes.scss'

export const TaskNode = ({data}: any) => {
    return (
        <div className='task-node_element'>
            <div className='task-node_header'>
                <div className='task-label'>
                    {data.label}
                </div>
                <div className='task-node_functions'>
                    <div className='node-more-function' onClick={data.onClick}>

                    </div>
                </div>
            </div>
            <div className='task-info'>
                <div className='task-deadline'>
                    Дедлайн: <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>{data.deadline === null ? `Нет ограничений` : `${data.deadline}`}</span>
                </div>
                <div className='task-priority'>
                    Приоритет: <span style={{color: `${data.priority === 'low' ? '#1cd500' : data.priority === 'Medium' ? '#ff9900' : '#ff3232'}`, fontWeight: 'bold'}}>{data.priority}</span>
                </div>
                <div className='task-responsibeles'>
                    Ответственные лица: <span style={{fontWeight: 'bold'}}>{data.responsible.length === 0 ? `Нет` : `${data.responsible.map((responsible: MiniUser) => responsible.username).join(', ')}`}</span>
                </div>
            </div>
        </div>
    )
}

export const nodeTypes = {
    taskNode: TaskNode
}