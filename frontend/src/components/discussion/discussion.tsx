import React from 'react'
import './discussion.scss'
import { Discussion as DiscussionType} from '../../types'

interface DiscussionProps {
    discussion: DiscussionType
}

export default function Discussion({discussion}: DiscussionProps) {

    console.log(discussion)

    return (
        <div className='discussion'>
            <div className='title'>
                {discussion.title}
            </div>
        </div>
    )
}