import React, { useState, useEffect } from 'react'
import Side_Menu from '../../components/side-menu/side-menu'
import Top_Menu from '../../components/top-menu/top-menu'
import Discussion from '../../components/discussion/discussion'
import { AppDispatch, RootState } from '../../store/store'
import './discussions.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getDiscussions } from '../../store/DiscussionSlice'
import { useDiscussion } from '../../hooks/useDiscussion'

export default function Discussions() {

    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user)

    const { discussionsState, fetchDiscussions } = useDiscussion()

    useEffect(() => {
        if (user && user.user != null) {
            fetchDiscussions(user.user.id)
        }
    }, [user])

    return (
        <>
            <div className="container" style={{overflow: 'hidden'}}>
                <Side_Menu/>
                <Top_Menu/>
                <div className='discussion-display'>
                    {discussionsState.loading === true ? (
                        <>
                            loading...
                        </>
                    ) : (
                        <>
                            {discussionsState.discussions?.map(discussion => (
                                <Discussion discussion={discussion} key={discussion.id}/>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}