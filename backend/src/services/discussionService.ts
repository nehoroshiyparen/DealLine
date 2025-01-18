import { Comment, Discussion, sequelize, Task, User } from "../../database/models"
import { Op } from 'sequelize'
import ApiError from "../exceptions/api-error"
import { Patch, TaskInterface } from "../../types/types"

class discussionService {
    async getAllUsersDiscussions(id: number) {
        interface UserWithDiscussions extends User {
            discussions: Discussion[];
        }

        try{
            const user = await User.findOne({
                where: { id },
                include: [
                    {
                        model: Discussion,
                        as: 'discussions',
                        include: [
                            {
                                model: User,
                                as: 'owner',
                                attributes: ['id', 'username', 'email', 'avatar']
                            },
                            {
                                model: Task,
                                as: 'tasks',
                                include: [
                                    {
                                        model: User,
                                        as: 'assignees',
                                        through: { attributes: [] }
                                    },
                                    {
                                        model: Comment,
                                        as: 'comments',
                                        include: [
                                            {
                                                model: User,
                                                as: 'author',   
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: User,
                                as: 'participants',
                                through: { attributes: [] }
                            }
                        ]
                    }
                ]
            })
    
            if (!user) {
                throw ApiError.BadRequest(`Пользователь с айди ${id} не найден`)
            }
    
            const discussions = (user as UserWithDiscussions).discussions.map((discussion: any) => ({
                id: discussion.id,
                title: discussion.title,
                description: discussion.description,
                owner: {
                    id: discussion.creatorId,
                    username: discussion.owner.username,
                    email: discussion.owner.email,
                    avatar: discussion.owner.avatar
                },
                members: discussion.participants.map((participant: any) => ({
                    id: participant.id,
                    username: participant.username,
                    email: participant.email,
                    avatar: participant.avatar,
                })),
                tasks: discussion.tasks.map((task: any) => ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    deadline: task.deadline,
                    priority: task.priority,
                    status: task.status,
                    responsible: task.assignees.map((assignee: any) => ({
                        id: assignee.id,
                        username: assignee.username,
                        email: assignee.email,
                        avatar: assignee.avatar,
                    })),
                    comments: task.comments.map((comment: any) => ({
                        id: comment.id,
                        content: comment.content,
                        createdAt: comment.createdAt,
                        author: {
                            username: comment.author.username,
                            email: comment.author.email,
                            avatar: comment.author.avatar
                        }
                    }))
                }))
            }))
            
            return { discussions }
        } catch (e) {
            console.log(e)
            throw ApiError.BadRequest(`Ошибка при получении данных об обсуждении: ${e}`)
        }
    }

    async createDiscussion(title: string,  tasks?: TaskInterface[], description?: string, participants?: number[], creatorId?: number) {
        const transaction = await sequelize.transaction()
        try {
            if (creatorId != null) {
                participants = [...(participants || []), creatorId];
            }
            const discussion = await Discussion.create({creatorId, title, description}, {transaction})
            if (participants && participants.length > 0) {
                await discussion.setParticipants(participants, { transaction })
            }

            let createdTasks: TaskInterface[] = [];
            if (tasks && tasks.length > 0) {
                createdTasks = await Promise.all(
                    tasks.map(async (task) => {
                        const createdTask = await Task.create({ ...task, discussionId: discussion.id }, { transaction });
            
                        if (task.assignees) {
                            await createdTask.setUsers(task.assignees);
                        }
            
                        return createdTask;
                    })
                )
            }
            await transaction.commit()
            return { discussion, tasks: createdTasks }
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            throw ApiError.BadRequest(`Ошибка при создании обсуждения: ${error}`);
        }
    }

    async updateDiscussion(id: number, patch: Patch) {
        const transaction = await sequelize.transaction()
        try {
            let updatedDiscussion = null;
            let updatedTasks:TaskInterface[] = [];
            if (patch.discussion) {
                updatedDiscussion = await Discussion.update(patch.discussion, { where: { id }, transaction, returning: true })
            }
            if (patch.tasks) {
                const taskIds = patch.tasks.map(task => task.id);
                const existingTasks = await Task.findAll({ where: { id: taskIds, discussionId: id } });

                if (existingTasks.length !== taskIds.length) {
                    throw ApiError.BadRequest('Некоторые задачи не принадлежат обсуждению или не существуют');
                }
                
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
            console.log(error)
            throw new Error(`Ошибка при обновлении обсуждения: `);
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