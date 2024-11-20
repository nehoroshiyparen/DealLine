import React from 'react'
import './path.scss'

export default function Path() {
    return(
        <>
            <div className='path'>
                <div className='path-inside'>
                    <div className='path-component'>
                        <img src='/images/direction.png' className='status-closed' width={'15px'} style={{marginRight: '7px'}}>
                        </img>
                        Обсуждения
                    </div>
                </div>
            </div>
        </>
    )
}