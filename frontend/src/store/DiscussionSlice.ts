import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Discussion, Task } from '../types'
import axios from 'axios'
import { API_URL } from '../http'
import DiscussionService from '../service/discussionService'

interface discussionState {
    discussions: Discussion[] | null;
    searchQuery: string;
    loading: boolean;
    error: string | null;
}

const initialState: discussionState = {
    discussions: null,
    searchQuery: '',
    loading: false,
    error: null,
}

export const getDiscussions = createAsyncThunk(
    'discussion/fetchUsersDsc',
    async (discussionData: {userId: number}) => {
        const response = await DiscussionService.fetchDiscussions(discussionData.userId)
        return response.data
    }
)

const discussionSlice = createSlice({
    name: 'dicsussion',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        deleteDiscussion: (state, action: PayloadAction<number>) => {
            state.discussions = state.discussions!.filter(
                (discussion) => discussion.id !== action.payload
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDiscussions.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getDiscussions.fulfilled, (state, action) => {
            state.loading = false
            state.discussions = action.payload.discussions
        })
        builder.addCase(getDiscussions.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Ошибка при попытке загруки обсуждений'
        })
    }
})

export const { setSearchQuery, deleteDiscussion } = discussionSlice.actions

export default discussionSlice.reducer