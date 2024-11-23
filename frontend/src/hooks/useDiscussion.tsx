//Логика работы с обсуждениями ( Получение с бд, взаимодействие через redux )

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../store/store"
import { setDiscussion, addDiscussion, updateDiscussion, deleteDiscussion } from "../store/DiscussionSlice"
import { Discussion } from '../types.tsx'

export const useDiscussion = () => {
    const dispatch = useDispatch<AppDispatch>()
    const discussions = useSelector((state: RootState) => state.discussions.discussions)

    const fetchDiscussions = async() => {
        //const fetchedDiscussions = await fetchDiscussionFromAPI()
        //dispatch(setDiscussion(fetchedDiscussions))
    }

    const createDiscussion = async(discussion: Discussion) => {
        await dispatch(addDiscussion(discussion))
    }

    const modifyDiscussion = (discussion: Discussion) => {
        dispatch(updateDiscussion(discussion))
    }

    const removeDiscussion = (taskId: number) => {
        dispatch(deleteDiscussion(taskId))
    }

    return { discussions, fetchDiscussions, createDiscussion, modifyDiscussion, removeDiscussion}
}