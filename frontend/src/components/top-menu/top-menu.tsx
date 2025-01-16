import React, { useState } from 'react'
import './top-menu.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useSelector } from 'react-redux'

export default function Top_Menu() {
    const [disc_title, setDisc_title] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    const user = useSelector((state: RootState) => state.user.user)

    return (
        <div className='top-menu'>
            <div className='left-menu-controlls'>
                <div className='d-input'>
                    <div className='d-input_search'>

                    </div>
                    <input className='d-input_form'
                    onChange={e => setDisc_title(e.target.value)}
                    value={disc_title}
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
                        <div className='user-pic'
                            style={{
                                backgroundImage: `url(${user?.avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(user.avatar)}` : '/images/profile.png'})`,
                                backgroundSize: '100%'
                            }}>
                        </div>
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