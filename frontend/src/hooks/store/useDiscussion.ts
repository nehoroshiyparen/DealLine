//Логика работы с обсуждениями ( Получение с бд, взаимодействие через redux )
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../store/store.ts"
import { deleteDiscussion, getDiscussions, setSearchQuery } from "../../store/DiscussionSlice.ts"

export const useDiscussion = () => {
    const dispatch = useDispatch<AppDispatch>()
    const discussionsState = useSelector((state: RootState) => state.discussions)
    const searchQuery = useSelector((state: RootState) => state.discussions.searchQuery)

    const fetchDiscussions = async( userId: number ) => {
        const fetchedDiscussions = await getDiscussions({userId})
        dispatch(fetchedDiscussions)
    }

    const updateSearchQuery = ( string: string ) => {
        dispatch(setSearchQuery(string))
    }

    const handleDeleteDiscussion = (discussion_id: number) => { // не нужно по итогу чтоли ???? Пзида...
        dispatch(deleteDiscussion(discussion_id))
    }

    return { discussionsState, fetchDiscussions, searchQuery, updateSearchQuery, handleDeleteDiscussion }
}