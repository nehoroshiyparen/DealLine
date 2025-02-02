import { Comment, Discussion, Task, Topic, User } from "../../database/models"
import ApiError from "../exceptions/api-error"
import { TaskInterface } from "../../types/types"

class taskService {
    async getTasks(discussionId: number) {
        const discussion = await Discussion.findByPk(discussionId)
        if (!discussion) {
            throw ApiError.BadRequest(`Обсуждения с айди ${discussionId} не существует`)
        }
        const tasks = await Task.findAll({where: {discussionId} })
        return tasks
    }

    async getOneTask(taskId: number) {
        const task = await Task.findOne({
            where: {id: taskId},
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            as: 'author',
                            attributes: ['username']
                        }
                    ]
                },
                {
                    model: User,
                    as: 'assignees',
                    attributes: ['username', 'avatar']
                }
            ]
        })

        return task
    }

    async createTask(topicId: number, params: TaskInterface) {
        const topic = await Topic.findByPk(topicId)
        if (!topic) {
            throw ApiError.BadRequest(`Темы с айди ${topicId} не существует`)
        }
        const task = await Task.create({ ...params, topicId, discussionId: topic.discussionId })
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

    async sendComment(userId: number, taskId: number, content: string) {
        if (content === null || content === '') {
            throw ApiError.BadRequest('Нельзя создать пустой комментарий')
        }

        const user = await User.findOne({where: {id: userId}})
        if (!user) {
            throw ApiError.BadRequest(`Пользователя с id: ${userId} не существует`)
        }

        await Comment.create({
            userId,
            taskId,
            content,
            createdAt: Date.now()
        })

        return {message: 'Комментарий отправлен'}
    }
}

export default new taskService()