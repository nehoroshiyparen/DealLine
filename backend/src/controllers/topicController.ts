import { Request, Response } from "express";
import topicService from "../services/topicService";
import ApiError from "../exceptions/api-error";

export const createTopic = async(req: Request, res: Response) => {
    try {
        const { title, discussionId } = req.body
        const topic = await topicService.createTopic(title, discussionId)
        res.json({topic})
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.status).json({
                message: e.message,
                error: e.errors
            })
        } else {
            console.log(e)
            res.status(500).json({
                message: 'Ошибка при создании темы'
            })
        }
    }
}

export const deleteTopic = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const response = await topicService.deleteTopic(Number(id))
        res.json({response}) 
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.status).json({
                message: e.message,
                error: e.errors
            })
        } else {
            console.log(e)
            res.status(500).json({
                message: 'Ошибка при удалении темы'
            })
        }
    }
}