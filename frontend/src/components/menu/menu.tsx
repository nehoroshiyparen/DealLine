import React from 'react'
import './menu.scss'
import { Link } from 'react-router-dom'


export default function Menu() {
    return(
        <>
            <div className='menu'>
                <div className='menu-inside'>
                    <div className='head'>
                        Deal<span style={{color: '#ff4a4a'}}>Line</span>
                    </div>
                    <div className='menu-functions'>
                        <div className='profile-functions'>
                            <Link to={'/'} className='profile menu-block'>
                                <img src='/images/profile.png' width={'24px'} className='func-icon'>
                               </img>
                                <span className='function'>Профиль</span>
                            </Link>
                            <Link to={'/'} className='add-friends menu-block'>
                                <img src='/images/add-friend.png' height={'24 px'} className='func-icon'>
                                </img>
                                <span className='function'>Добавить друзей</span>
                            </Link>
                        </div>
                        <div className='task-functions'>
                            <div className='category'>
                                Задачи
                            </div>
                            <Link to={'/'} className='profile menu-block'>
                                <img src='/images/add.png' width={'24px'} className='func-icon'>
                                </img>
                                <span className='function'>Создать обсуждение</span>
                            </Link>
                            <Link to={'/'} className='calendar menu-block'>
                                <img src='/images/calendar.png' width={'24px'} className='func-icon'>
                                </img>
                                <span className='function'>Календарь</span>
                            </Link>
                            <Link to={'/'} className='tasks menu-block'>
                            <div className='status status-closed'>
                                <img src='/images/direction.png' width={'16px'}></img>
                            </div>
                                <img src='/images/tasks.png' width={'24px'} className='func-icon'>
                                </img>
                                <span className='function function-tasks'>Список обсуждений</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}