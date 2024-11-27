import { Request, Response, NextFunction } from "express";
import { User } from "../database/models";
import userService from "../services/userService";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error";

export const registration = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }
        const { email , password , username } = req.body
        const userData = await userService.registration(username, email, password)
        res.cookie('refrashToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
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
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    } catch (error) {
        next(error)
    }
}

export const getUserInfo = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.body
        const user = await userService.getOneUser(id)
        res.json(user)
    } catch (error) {
        next(error)
    }
}