import React from 'react'
import './discussion.scss'

interface DiscussionProps {
    title: string
}

export default function Discussion({title}: DiscussionProps) {

    return (
        <div className='discussion'>
            <div className='title'>
                {title}
            </div>
        </div>
    )
}