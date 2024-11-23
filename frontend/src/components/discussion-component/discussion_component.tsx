import React, { useState } from 'react'
import './discussion_component.scss'
import { Discussion } from '../../types'
import TaskComponent from '../task-component/task-component'
import Task_Component from '../task-component/task-component';

interface DiscussionComponentProps {
    discussion: Discussion; // Пропс discussion должен быть типа Discussion
}

const Discussion_component: React.FC<DiscussionComponentProps>  = ({discussion}) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className='discussion-component'>
                <div className='disc-title'>
                    <img src='/images/direction-w.png' className='disc-status' width={'20px'}>
                    </img>
                    {discussion.title}
                </div>
                <div className={`disc-content ${isOpen ? 'visible' : ''}`}>
                    <div className='disc-content-inside'>
                        <div className='disc-top-info'>
                            <div className='owner disc-block'>
                                <div className='owner disc-block-title'>
                                    <span>Создатель</span>
                                </div>
                                <div className='owner-name'>
                                    <img className='disc-block-img member-image' style={{position: 'relative'}} src={discussion.owner.avatar.url} width={'24px'}>
                                    </img>
                                    <span style={{fontWeight: 'bold', fontSize: '20px'}}>{discussion.owner.user_name}</span>
                                </div>
                            </div>
                            <div className='members disc-block'>
                                <div className='members disc-block-title'>
                                    <span>Участники обсуждения</span>
                                </div>
                                <div className='members-images'>
                                    {discussion.members.map((member, index) => (
                                        <img 
                                            key={member.id}
                                            className='member-image' 
                                            src={member.avatar.url} 
                                            width={'24px'}
                                            style={{margin: `${index * 11}px`, zIndex: `${index}`}}>
                                        </img>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='disc-description'>
                            <span>{discussion.description}</span>
                        </div>
                        <div className='tasks-tasks'>
                            Задачи
                        </div>
                        <div className='task-list'>
                            {discussion.tasks.map((task, index) => (
                                <TaskComponent key={task.id} task={task} index={index}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Discussion_component