//Логика работы с обсуждениями ( Получение с бд, взаимодействие через redux )

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../store/store"
import { getDiscussions } from "../store/DiscussionSlice"
import { Discussion } from '../types.tsx'

export const useDiscussion = () => {
    const dispatch = useDispatch<AppDispatch>()
    const discussionsState = useSelector((state: RootState) => state.discussions)

    const fetchDiscussions = async( userId: number ) => {
        const fetchedDiscussions = await getDiscussions({userId})
        dispatch(fetchedDiscussions)
    }

    return { discussionsState, fetchDiscussions }
}