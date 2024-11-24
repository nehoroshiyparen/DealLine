import { Task } from "../database/models";
import { Response, Request } from 'express'

export const getAllTasks = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при получении всех задач', error})
    }
}

export const createTask = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при получении всех задач', error})
    }
}

export const editTask = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при получении всех задач', error})
    }
}

export const changeTaskStatus = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при изменении статуса задачи', error})
    }
}

export const deleteTask = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message: 'Ошибка при удалении задачи', error})
    }
}