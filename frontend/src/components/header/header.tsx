import React from 'react'
import './header.scss'
import { Link } from 'react-router-dom'

export default function Header() {
    return(
        <>
            <div className='header'>
                <div className='left-side'>
                    <Link to={'/profile'}>
                        <div className='profile head-container'>
                            <img src='/images/profile.png' width={'50px'}>
                            </img>
                        </div>
                    </Link>
                    <Link to={'/'}>
                        <div className='header-menu-block head-container'>
                            Первый
                        </div>
                    </Link>
                    <Link to={'/'}>
                        <div className='header-menu-block head-container'>
                            Календарь
                        </div>
                    </Link>
                    <Link to={'/'}>
                        <div className='header-menu-block head-container'>
                            Поиск людей
                        </div>
                    </Link>
                    <Link to={'/'}>
                        <div className='header-menu-block head-container'>
                            Четвертый
                        </div>
                    </Link>
                </div>
                <div className='right-side head-container'>
                    <Link to={'/'}>
                        <div className='logo'>
                            Deal<span style={{color: '#ff4a4a'}}>Line</span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}