import { Request, Response } from "express";
import { Notifications } from '../database/models'
import notificationService from "../src/services/notificationService";
import { json } from "sequelize";
import ApiError from "../src/exceptions/api-error";

export const getAllNotifications = async(req: Request, res: Response) => {
    try {
        const { receiver_id } = req.params
        const notifications = await notificationService.getNotifications(Number(receiver_id))
        res.json(notifications)
    } catch (error) {
        res.json({message: 'Ошибка при получении уведомлений', error})
    }
}

export const sendNotification = async(req: Request, res: Response) => {
    try {
        const { patch } = req.body
        console.log(patch)
        const notificationCreateRequest = await notificationService.createNotification(patch)
        res.json(notificationCreateRequest)
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.status).json({
                message: error.message,
                error: error.errors || []
            })
        } else {
            console.log(error)
            res.status(500).json({message: 'Ошибка при отправке запроса/уведомления'})
        }
    }
}

export const rejectOffer = async(req: Request, res: Response) => {
    try {
        const { id } = req.body
        const rejectRequest = await notificationService.rejectOffer(id)
        res.json(rejectRequest)
    } catch (error) {
        res.json({message: 'Ошибка при попытке отклонить предложение ', error})
    }
}

export const acceptOffer = async(req: Request, res: Response) => {
    try {
        const { id, discussionId } = req.body
        const acceptRequest = await notificationService.acceptOffer(id, discussionId)
        res.json(acceptRequest)
    } catch (error) { 
        res.json({message: 'Ошибка при попытке принять предложение ', error})
    }
}