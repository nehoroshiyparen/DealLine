import { Request, Response, NextFunction } from "express";
import { User } from "../database/models";
import userService from "../services/userService";

export const registration = async(req: Request, res: Response, next: NextFunction) => {
    try {
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
        
    } catch (error) {
        next(error)
    }
}

export const log_out = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
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
        
    } catch (error) {
        next(error)
    }
}

export const getUserInfo = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
}