import React, { useEffect } from 'react'
import './top-menu.scss'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { useNotifications } from '../../../hooks/store/useNotification'
import { useDiscussion } from '../../../hooks/store/useDiscussion'
import { Link } from 'react-router-dom'

export default function Top_Menu() {
    const user = useSelector((state: RootState) => state.user.user)
    const { notificationsState, fetchNotifications } = useNotifications()
    const { updateSearchQuery, searchQuery } = useDiscussion()

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateSearchQuery(event.target.value)
    }

    useEffect(() => {
        if (user) {
            fetchNotifications(user.id)
        }
    }, [user])

    if (notificationsState.notifications) {
        console.log(notificationsState)        
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
                    <div className='notifications-image'>

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