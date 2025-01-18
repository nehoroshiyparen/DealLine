//Логика работы с обсуждениями ( Получение с бд, взаимодействие через redux )
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../store/store"
import { getDiscussions, setSearchQuery } from "../store/DiscussionSlice"
import { Discussion } from '../types.tsx'

export const useDiscussion = () => {
    const dispatch = useDispatch<AppDispatch>()
    const discussionsState = useSelector((state: RootState) => state.discussions)
    const searchQuery = useSelector((state: RootState) => state.discussions.searchQuery)

    const fetchDiscussions = async( userId: number ) => {
        const fetchedDiscussions = await getDiscussions({userId})
        dispatch(fetchedDiscussions)
    }

    const updateSearchQuery = async( string: string ) => {
        dispatch(setSearchQuery(string))
    }

    return { discussionsState, fetchDiscussions, searchQuery, updateSearchQuery }
}