import { Request, Response } from "express";
import { Notifications } from '../database/models'
import notificationService from "../src/services/notificationService";
import { json } from "sequelize";

export const getAllNotifications = async(req: Request, res: Response) => {
    try {
        const { receiverId } = req.body
        const notifications = notificationService.getNotifications(receiverId)
        res.json(notifications)
    } catch (error) {
        res.json({message: 'Ошибка при получении уведомлений', error})
    }
}

export const sendNotification = async(req: Request, res: Response) => {
    try {
        const { params } = req.body
        const notificationCreateRequest = notificationService.createNotification(params)
        res.json(notificationCreateRequest)
    } catch (error) {
        res.json({message: 'Ошибка при попытке отправить уведомление', error})
    }
}

export const rejectOffer = async(req: Request, res: Response) => {
    try {
        const { id } = req.body
        const rejectRequest = notificationService.rejectOffer(id)
        res.json(rejectRequest)
    } catch (error) {
        res.json({message: 'Ошибка при попытке отклонить предложение ', error})
    }
}

export const acceptOffer = async(req: Request, res: Response) => {
    try {
        const { id, discussionId } = req.body
        const acceptRequest = notificationService.acceptOffer(id, discussionId)
        res.json(acceptRequest)
    } catch (error) { 
        res.json({message: 'Ошибка при попытке принять предложение ', error})
    }
}