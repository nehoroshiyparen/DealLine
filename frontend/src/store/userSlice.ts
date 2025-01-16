import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'
import AuthService from '../service/authService'
import axios from 'axios'
import { AuthResponse } from '../models/response/authResponse'
import { API_URL } from '../http'

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: {username: string, email: string,  password: string}) => {
        const response = await AuthService.registration(userData.username, userData.email, userData.password)
        localStorage.setItem('token', response.data.accessToken)
        console.log(response.data.accessToken)
        return response.data
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData: {user: string, password: string}) => {
        const response = await AuthService.login(userData.user, userData.password)
        localStorage.setItem('token', response.data.accessToken)
        return response.data
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        await AuthService.logout()
        localStorage.removeItem('token')
    }
)

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async () => {
        const response = await axios.get<AuthResponse>(`${API_URL}/users/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken)
        return response.data
    }
)

interface UserState {
    isAuthentcated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
        isAuthentcated: false,
        user: null,
        loading: false,
        error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            const apiUser = action.payload.user
            state.loading = false,
            state.isAuthentcated = true,
            state.user = {
                username: apiUser.username,
                email: apiUser.email,
                avatar: apiUser.avatar,
            }
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Register failed'
        })

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const apiUser = action.payload.user
            state.loading = false
            state.isAuthentcated = true
            state.user = {
                username: apiUser.username,
                email: apiUser.email,
                avatar: apiUser.avatar
            }
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Login failed'
        }) 

        builder.addCase(logout.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false
            state.isAuthentcated = false
            state.user = null
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Logout failed'
        })

        builder.addCase(checkAuth.pending, (state) => {
            state.loading = true
        })
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            const apiUser = action.payload.user
            console.log(apiUser)
            state.loading = false
            state.isAuthentcated = true
            state.user = {
                username: apiUser.username,
                email: apiUser.email,
                avatar: apiUser.avatar
            }
        })
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.loading = false;
            state.isAuthentcated = false;
            state.user = null;
            state.error = action.payload as string || 'Refresh error';
        })
    }
})

export default userSlice.reducer