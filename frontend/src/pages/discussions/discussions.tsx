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
import { Discussion as DiscussionType } from '../../types'

export default function Discussions() {

    const user = useSelector((state: RootState) => state.user)
    const { discussionsState, fetchDiscussions, searchQuery } = useDiscussion()

    const [filteredDiscussions, setFilteredDiscussions] = useState<DiscussionType[]>([])
    const discussions = discussionsState.discussions

    useEffect(() => {
        if (user && user.user != null) {
            fetchDiscussions(user.user.id)
        }
    }, [user])

    useEffect(() => {
        if (discussions) {
            if (searchQuery.trim() === '') {
                setFilteredDiscussions(discussions)
            } else {
                const filter = discussions.filter((discussion) => 
                    discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                setFilteredDiscussions(filter)
            }
        }
    }, [searchQuery, discussions])

    const renderDiscussions = () => {
        if (discussionsState.loading === true) {
            return (
                <>
                    loading...
                </>
            )
        } 

        if (filteredDiscussions.length === 0) {
            return (
                <>
                    Таких обсуждений не найдено
                </>
            )
        }

        return filteredDiscussions.map(discussion => (
            <Discussion discussion={discussion} key={discussion.id}/>
        ))
    }

    return (
        <>
            <div className='discussion-display'>
                {renderDiscussions()}
            </div>
        </>
    )
}