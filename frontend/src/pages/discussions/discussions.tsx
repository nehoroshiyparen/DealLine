import React, { useState, useEffect } from 'react'
import Discussion from './components/discussion'
import { AppDispatch, RootState } from '../../store/store'
import './discussions.scss'
import { useSelector } from 'react-redux'
import { useDiscussion } from '../../hooks/store/useDiscussion'
import { Discussion as DiscussionType } from '../../types'
import NewDiscussion from './components/newDiscussion'

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

        return (
            <>
                {filteredDiscussions.map(discussion => (
                    <Discussion discussion={discussion} key={discussion.id}/>
                ))}
                <NewDiscussion/>
            </>
        )
    }

    console.log(discussions)

    return (
        <>
            <div className='discussion-display'>
                {renderDiscussions()}
            </div>
        </>
    )
}