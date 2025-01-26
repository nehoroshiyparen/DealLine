import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { getNotifications } from '../store/notificationStore'

export const useNotifications = () => {
    const dispatch = useDispatch<AppDispatch>()
    const notificationsState = useSelector((state: RootState) => state.notifications)

    const fetchNotifications = async( userId: number ) => {
        const fetchedNotifications = await getNotifications({userId})
        dispatch(fetchedNotifications)
    }

    return { notificationsState, fetchNotifications }
}