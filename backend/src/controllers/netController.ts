import { Request, Response } from "express";
import ApiError from "../exceptions/api-error";
import netService from "../services/netService";
import ErrorMiddleware from "../middleware/ErrorMiddleware";

export const enterPosition = async(req: Request, res: Response) => {
    try {
        const { userId, positions } = req.body
        await netService.enterPosition(userId, positions)
        res.status(200).json({status: 'success', message: 'Данные обновлены'})
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.status).json({
                message: e.message,
                error: e.errors
            })
        } else {
            console.log(e)
            res.status(500).json({message: 'Ошибка при записи позиций'})
        }
    }
}

export const updatePositions = async(req: Request, res: Response) => {
    try {
        const { userId, positions } = req.body
        await netService.fetchPositions(userId, positions)
        res.status(200).json({status: 'success', message: 'Данные обновлены'})
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.status).json({
                message: e.message,
                error: e.errors
            })
        } else {
            console.log(e)
            res.status(500).json({message: 'Ошибка при записи позиций'})
        }
    }
}

export const fetchPositions = async(req: Request, res: Response) => {
    try {
        const { userId, discussionId } = req.body
        const positions = await netService.fetchPositions(userId, discussionId)
        res.json(positions)
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.status).json({
                message: e.message,
                error: e.errors
            })
        } else {
            console.log(e)
            res.status(500).json({message: 'Ошибка при получении позиций'})
        }
    }
}