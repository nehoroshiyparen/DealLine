import React from 'react'
import './discussion_component.scss'

export default function Discussion_component() {
    return (
        <>
            <div className='discussion-component'>
                <div className='disc-title'>
                    <img src='/images/direction-w.png' className='disc-status' width={'20px'}>
                    </img>
                    Название обсуждения
                </div>
            </div>
        </>
    )
}