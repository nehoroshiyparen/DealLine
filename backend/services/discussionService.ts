import { Discussion, sequelize, Task, User } from "../database/models"
import { Op } from 'sequelize'
import ApiError from "../exceptions/api-error"
import { Patch, TaskInterface } from "../types/types"

class discussionService {
    async getAllUsersDiscussions(id: number) {
        const user = await User.findOne({
            where: { id },
            include: [{ model: Discussion, include: [{ model: Task }] }] // Включаем задачи прямо в запросе
        });
    
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с айди ${id} не найден`);
        }
    
        // Дожидаемся выполнения промиса
        const discussions = user.getDiscussions();
    
        // Мапим обсуждения и извлекаем задачи
        const tasks = (await discussions).map(discussion => discussion.getTask()); // Доступ к задачам через связи
    
        return { discussions, tasks };
    }

    async createDiscussion(title: string,  tasks?: TaskInterface[], description?: string, participants?: number[], creatorId?: number) {
        const transaction = await sequelize.transaction()
        try {
            if (creatorId != null) {
                participants = [...(participants || []), creatorId];
            }
            const discussion = await Discussion.create({creatorId, title, description}, {transaction})
            if (participants && participants.length > 0) {
                await discussion.setUser(participants, { transaction })
            }

            let createdTasks: TaskInterface[] = [];
            if (tasks && tasks.length > 0) {
                tasks.map(async (task) => {
                    const createdTask = await Task.create({ ...task, discussionId: discussion.id }, { transaction });
        
                    if (task.assignees) {
                        await createdTask.setUsers(task.assignees);
                    }
        
                    return createdTask;
                })
            }

            await transaction.commit()
            return { discussion, tasks: createdTasks }
        } catch (error) {
            await transaction.rollback();
            throw ApiError.BadRequest(`Ошибка при создании обсуждения: ${error}`);
        }
    }

    async updateDiscussion(id: number, patch: Patch) {
        const transaction = await sequelize.transaction()
        try {
            let updatedDiscussion = null;
            let updatedTasks:TaskInterface[] = [];
            if (patch.discussion) {
                updatedDiscussion = await Discussion.update(patch.discussion, { where: { id }, transaction })
            }
            if (patch.tasks) {
                updatedTasks = await Promise.all(
                    patch.tasks.map(async (task) => {
                        const [affectedCount, tasks] = await Task.update(
                            task,
                            { where: { id: task.id }, transaction, returning: true }
                        );
                        if (affectedCount === 0) {
                            throw new Error(`Задача с ID ${task.id} не найдена`);
                        }
                        
                        const updatedTask = tasks[0]

                        if (task.assignees) {
                            await updatedTask.setUsers(task.assignees)
                        }

                        return updatedTask
                    })
                )
            }

            await transaction.commit()
            return {
                discussion: updatedDiscussion,
                tasks: updatedTasks,
            };
        } catch (error) {
            await transaction.rollback()
            throw new Error(`Ошибка при обновлении обсуждения: ${error}`);
        }
    }

    async deleteDiscussion(id: number) {
        const transaction = await sequelize.transaction()
        try {
            await Task.destroy({ where: {discussionId: id}, transaction })
            const affectedRow = await Discussion.destroy({where: { id }, transaction })
            if (affectedRow === 0 ) {
                throw ApiError.BadRequest('Такого обсуждения не было найдено')
            }
            await transaction.commit()

            return { message: 'Обсуждение и привязанные к нему задания были удалены' }
        } catch (error: unknown) {
            await transaction.rollback()
            console.log('Ошибка при удалении обсуждения: ', error)
            return { error: 'Не удалось удалить обсуждение' }
        }
    }

    async changeDiscussionStatus(id: number, status: string) {
        const discussion = await Discussion.findByPk(id)
        if (!discussion) {
            throw ApiError.BadRequest(`Обсуждения с id ${id} не существует`)
        }
        discussion.status = status;
        await discussion.save(); 
        return { message: `Статус задачи обнавлен: "${status}"` }
    }
}

export default new discussionService()