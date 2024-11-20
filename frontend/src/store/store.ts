import { configureStore } from '@reduxjs/toolkit'
import discussionsReducer from './DiscussionSlice'

const store = configureStore({
    reducer: {
        discussions: discussionsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store