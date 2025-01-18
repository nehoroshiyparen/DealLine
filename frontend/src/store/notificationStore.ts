import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { User, Notification } from "../types"
import NotificationService from "../service/notificationService";

interface notificationState {
    notifications: Notification[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: notificationState = {
    notifications: null,
    loading: false,
    error: null,
}

export const getNotifications = createAsyncThunk(
    'notification/fetchUsersNtfc',
    async (notificationData: {userId: number}) => {
        const response = await NotificationService.fetchUsersNtfc(notificationData.userId)
        return response.data
    }
)

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNotifications.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getNotifications.fulfilled, (state, action) => {
            state.loading = false
            state.notifications = action.payload.notifications
        })
        builder.addCase(getNotifications.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Ошибка при загрузке уведомлений'
        })
    }
})

export default notificationSlice.reducer