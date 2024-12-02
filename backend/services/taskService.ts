import { Discussion, Task } from "../database/models"
import ApiError from "../exceptions/api-error"
import { TaskInterface } from "../types/types"

class taskService {
    async getTasks(discussionId: number) {
        const discussion = await Discussion.findByPk(discussionId)
        if (!discussion) {
            throw ApiError.BadRequest(`Обсуждения с айди ${discussionId} не существует`)
        }
        const tasks = await Task.findAll({where: {discussionId} })
        return tasks
    }

    async createTask(discussionId: number, params: TaskInterface) {
        const discussion = await Discussion.findByPk(discussionId)
        if (!discussion) {
            throw ApiError.BadRequest(`Обсуждения с айди ${discussionId} не существует`)
        }
        const task = await Task.create({ ...params, discussionId })
        return task
    }

    async changeTaskStatus(id: number, status: string) {
        const task = await Task.findByPk(id)
        if (!task) {
            throw ApiError.BadRequest(`Задания с айди ${id} не существует`)
        }
        task.status = status
        task.save()
        return task
    }

    async deleteTask(id: number) {
        try {
            const deleteRequest = await Task.destroy({where: {id}})
            return { message: `Задание с айди ${id} успешно удалено` }
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest('При удалении задания произошла ошибка', [error])
        }
    }
}

export default new taskService()