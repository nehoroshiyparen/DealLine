import { Request, Response } from "express";
import { User } from "../database/models";

export const sign_in = async(req: Request, res: Response) => {
    try {
        
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

export const getUserInfo = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.json({message: 'Ошибка при получении информации о пользователе', error})
    }
}