import { Request, Response } from "express";
import { Notifications } from '../database/models'

export const getAllNotifications = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при получении уведомлений', error})
    }
}

export const sendFriendRequest = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при попытке добавить в друзья', error})
    }
}

export const sendDiscussionInvite = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при попытке пригласить в обсуждение', error})
    }
}

export const sendReminder = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при отправлении напоминания', error})
    }
}