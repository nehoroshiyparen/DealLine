import { Request, Response } from "express";
import { User } from "../database/models";
import userService from "../services/userService";

export const registration = async(req: Request, res: Response) => {
    try {
        const { email , password , username } = req.body
        const userData = await userService.registration(username, email, password)
        res.cookie('refrashToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    } catch (error) {
        res.json({message: 'Ошибка при регистрации пользователя', error})
    }
}

export const log_in = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.json({message: 'Ошибка при авторизации пользователя', error})
    }
}

export const log_out = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.json({message: 'Ошибка при выходе из аккаунта', error})
    }
}

export const activate = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.json({message: 'Ошибка при активации токена', error})
    }
}

export const refresh = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.json({message: 'Ошибка при обновлении токена', error})
    }
}

export const getUserInfo = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.json({message: 'Ошибка при получении информации о пользователе', error})
    }
}