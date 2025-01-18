import $api from '../http/index.ts'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/authResponse.ts'

export default class AuthService {
    static async login(usernameOrEmail: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('users/login', {usernameOrEmail, password})
    }

    static async registration(username: string, email: string,  password: string): Promise<AxiosResponse<AuthResponse>> {
        const reps =  await $api.post<AuthResponse>('users/registration', {username, email, password})
        return reps
    }

    static async logout(): Promise<void> {
        return await $api.post('users/logout')
    }
}