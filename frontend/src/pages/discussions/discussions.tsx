import React from 'react'
import Side_Menu from '../../components/side-menu/side-menu'
import Top_Menu from '../../components/top-menu/top-menu'
import Discussion from '../../components/discussion/discussion'
import './discussions.scss'

export default function Discussions() {
    return (
        <>
            <div className="container" style={{overflow: 'hidden'}}>
                <Side_Menu/>
                <Top_Menu/>
                <div className='discussion-display'>
                    <Discussion title='Название обсуждения'/>
                </div>
            </div>
        </>
    )
}