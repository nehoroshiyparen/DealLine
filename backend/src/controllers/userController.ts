import { Request, Response, NextFunction } from "express";
import { User } from "../../database/models";
import userService from "../services/userService";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error";
import { error } from "console";

export const registration = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }
        const { username, email , password } = req.body
        const userData = await userService.registration(username, email, password)
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production'})
        console.log('Set cookie:', userData.refreshToken);
        res.json(userData)
    } catch (error) {
        next(error)
    }
}

export const log_in = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {usernameOrEmail, password} = req.body
        const userData = await userService.log_in(usernameOrEmail, password)
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    } catch (error) {
        next(error)
    }
}

export const log_out = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken} = req.cookies
        const token = await userService.log_out(refreshToken)
        res.clearCookie('refreshToken')
        res.json(token)
    } catch (error) {
        next(error)
    }
}

export const activate = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const activationLink: string = req.params.link
        await userService.activate(activationLink)
        return res.redirect(`https://www.youtube.com/watch?v=cp9b4GH3Lkc&list=PL0K7PyxyGVxsDkrbCsVo2kshSSoFbOJrM&index=7`)
    } catch (error) {
        next(error)
    }
}

export const refresh = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken} = req.cookies
        const userData = await userService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production'})
        res.json(userData)
    } catch (error) {
        next(error)
    }
}

export const getUsersByUsername = async(req: Request, res: Response) => {
    try {
        const { username, page = 1, limit = 10 } = req.query
        if (!username) {
            throw ApiError.BadRequest('Имя пользователя не указано')
        }
        const users = await userService.getUsersByUsername(String(username), Number(page), Number(limit))
        res.json(users)
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.status).json({
                message: error.message,
                error: error.errors || []
            })
        } else {
            console.log(error)
            res.status(500).json({message: 'Ошибка при получении информации о пользователях'})
        }
    }
}

export const getUserInfo = async(req: Request, res: Response) => {
    try {
        const {username} = req.params
        const user = await userService.getOneUser(String(username))
        res.json(user)
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.status).json({
                message: e.message,
                error: e.errors,
            })
        } else {
            console.log(e)
            res.status(500).json('Непредвиденная ошибка при получении информации о пользователе')
        }
    }
}

export const getUserFriends = async(req: Request, res: Response) => {
    const { id } = req.params
    const friends = await userService.getUserFriends(Number(id))
    res.json(friends)
}

export const deleteFriend = async(req: Request, res: Response) => {
    try {
        const {  firstId, secondId } = req.body
        const response = await userService.deleteFriend(firstId, secondId)
        res.json(response)
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.status).json({
                message: error.message,
                error: error.errors || []
            })
        } else {
            console.log(error)
            res.status(500).json({message: 'Ошибка при удалении человека из друзей'})
        }
    }
}

export const deleteAccount = async(req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const response = await userService.deleteAccount(userId)
        res.json(response)
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.status).json({
                message: error.message,
                error: error.errors || []
            })
        } else {
            console.log(error)
            res.status(500).json({message: 'Ошибка при удалении аккаунта'})
        }
    }
}