import { Task } from "../database/models";
import { Response, Request } from 'express'
import taskService from "../src/services/taskService";

export const getAllTasks = async(req: Request, res: Response) => {
    try {
        const { discussionId } = req.body
        const tasks = await taskService.getTasks(discussionId)
        res.json(tasks)
    } catch (error) {
        res.json({message: 'Ошибка при получении всех задач', error})
    }
}

export const createTask = async(req: Request, res: Response) => {
    try {
        const { discussionId, params } = req.body
        const task = taskService.createTask(discussionId, params)
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