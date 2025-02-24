import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import discussionsReducer from './DiscussionSlice'
import userReducer from './userSlice'
import notificationReducer from './notificationSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        discussions: discussionsReducer,
        notifications: notificationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
 
export default store