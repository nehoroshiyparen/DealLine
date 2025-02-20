import React, { useEffect, useState } from 'react'
import './top-menu.scss'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { useNotifications } from '../../../hooks/store/useNotification'
import { useDiscussion } from '../../../hooks/store/useDiscussion'
import { Link } from 'react-router-dom'
import NotificationList from './components/notificationList'

export default function Top_Menu() {
    const user = useSelector((state: RootState) => state.user.user)
    const { notificationsState, fetchNotifications } = useNotifications()
    const notifications = notificationsState.notifications
    const { updateSearchQuery, searchQuery } = useDiscussion()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateSearchQuery(event.target.value)
    }

    useEffect(() => {
        if (user) {
            fetchNotifications(user.id)
        }
    }, [user])

    const toggleNotifications = () => {
        setIsNotificationsOpen((prev) => !prev)
    }

    if (notifications) {
        console.log(notifications)        
    }

    return (
        <div className='top-menu'>
            <div className='left-menu-controlls'>
                <div className='d-input'>
                    <div className='d-input_search'>

                    </div>
                    <input className='d-input_form'
                    onChange={handleSearchChange}
                    value={searchQuery}
                    type='search'
                    placeholder='Поиск'/>
                </div>
            </div>
            <div className='right-menu-user'>
                <div className='notifications'>
                    <div className='notification-bell' onClick={toggleNotifications}>
                        <div className='notifications-image'>

                        </div>
                        <div className='notifications_count' style={{display: `${notifications ? 'block' : 'none'}`}}>
                            {notifications ? 
                                notifications.length > 9 ?
                                    '9+'
                                    :
                                    notifications.length
                                : 
                                ''
                            }
                        </div>
                    </div>
                    <div className={`notifications-advanced ${isNotificationsOpen ? 'not-ad--open' : ''}`}>
                        <NotificationList notifications={notifications}/>
                    </div>
                </div>
                <div className='profile'>
                    <div className='user' >
                        <Link to={`../user/${user?.username}`}>
                            <div className='user-pic'
                                style={{
                                    backgroundImage: `url(${user?.avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(user.avatar)}` : '/images/profile.png'})`,
                                    backgroundSize: '100%'
                                }}>
                            </div>
                        </Link>
                    </div>
                    <div className='user-more'>
                        <div className='more-image'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}