import { Task } from "../../database/models";
import { Response, Request } from 'express'
import taskService from "../services/taskService";
import ApiError from "../exceptions/api-error";

export const getAllTasks = async(req: Request, res: Response) => {
    try {
        const { discussionId } = req.params
        const tasks = await taskService.getTasks(Number(discussionId))
        res.json(tasks)
    } catch (error) {
        res.json({message: 'Ошибка при получении всех задач', error})
    }
}

export const getOneTask = async(req: Request, res: Response) => {
    try {
        const { taskId } = req.params
        const task = await taskService.getOneTask( Number(taskId))
        res.json(task)
    } catch (e) {
        if (e instanceof ApiError) {
            res.status(e.status).json({
                message: e.message,
                error: e.errors
            })
        } else {
            console.log(e)
            res.status(500).json({
                message: 'Ошибка при получении информации о задаче'
            })
        }
    }
}

export const createTask = async(req: Request, res: Response) => {
    try {
        const { topicId, params } = req.body
        const task = await taskService.createTask(topicId, params)
        res.json(task)
    } catch (error) {
        res.json({message: 'Ошибка при получении всех задач', error})
    }
}

export const changeTaskStatus = async(req: Request, res: Response) => {
    try {
        const { id, status } = req.body
        const changeStatusRequest = taskService.changeTaskStatus(id, status)
        res.json(changeStatusRequest)
    } catch (error) {
        res.json({message: 'Ошибка при изменении статуса задачи', error})
    }
}

export const deleteTask = async(req: Request, res: Response) => {
    try {
        const { id } = req.body
        const deleteRequest = taskService.deleteTask(id)
        res.json(deleteRequest)
    } catch (error) {
        res.json({message: 'Ошибка при удалении задачи', error})
    }
}