import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, Discussion, Task } from '../types'
import axios from 'axios'
import { API_URL } from '../http'
import DiscussionService from '../service/discussionService'

interface discussionState {
    discussions: Discussion[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: discussionState = {
    discussions: null,
    loading: false,
    error: null,
}

export const getDiscussions = createAsyncThunk(
    'discussion/fetchUsersDsc',
    async (discussionData: {userId: number}) => {
        const response = await DiscussionService.fetchUsersDsc(discussionData.userId)
        return response.data
    }
)

const discussionSlice = createSlice({
    name: 'dicsussion',
    initialState,
    reducers: {},
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

export default discussionSlice.reducer