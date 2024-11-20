import { useEffect, useState } from 'react'
import React from 'react'
import './discussion.scss'
import Discussion_component from '../components/discussion-component/discussion_component'
import { useDiscussion } from '../hooks/useDiscussion'
import { discussions_example } from '../disc-example'

export default function Index() {
    const [isAuth, setIsAuth] = useState(true)

    const { discussions, fetchDiscussions, createDiscussion, modifyDiscussion, removeDiscussion } = useDiscussion()

    useEffect(() => {
        fetchDiscussions()

        if (discussions.length === 0) {
            discussions_example.forEach((discussion) => {
                createDiscussion(discussion)
            })
        }
    }, [fetchDiscussions])

    console.log(discussions)

    return (
        <>
            <div className='discussion'>
                <div className='discussion-inside'>
                    {isAuth ? (
                        <div className='dicussion-list'>
                            <Discussion_component/>
                            <Discussion_component/>
                        </div>
                    ) : (
                        <div className='auth-form'>

                        </div>
                    )}
                </div>
            </div>
        </>
    )
}