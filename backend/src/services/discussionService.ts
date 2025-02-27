import { Comment, Discussion, sequelize, Task, Topic, User } from "../../database/models"
import { Op } from 'sequelize'
import ApiError from "../exceptions/api-error"
import { DiscussionUpdatingPatch, TaskInterface, TopicInterface, UserInterface } from "../../types/types"

class discussionService {
    async getDiscussions(userId?: number, discussionId?: number) {
        interface UserWithDiscussions extends User {
            discussions: Discussion[];
        }
    
        try {
            // Условия для поиска
            const whereCondition: any = {};
            if (userId) whereCondition.id = userId;
    
            const user = await User.findOne({
                where: whereCondition,
                include: [
                    {
                        model: Discussion,
                        as: 'discussions',
                        where: discussionId ? { id: discussionId } : undefined, 
                        include: [
                            {
                                model: User,
                                as: 'owner',
                                attributes: ['id', 'username', 'email', 'avatar'],
                            },
                            {
                                model: Topic,
                                as: 'topics',
                                include: [
                                    {
                                        model: Task,
                                        as: 'tasks',
                                        include: [
                                            {
                                                model: User,
                                                as: 'assignees',
                                                through: { attributes: [] },
                                            },
                                            {
                                                model: Comment,
                                                as: 'comments',
                                                include: [
                                                    {
                                                        model: User,
                                                        as: 'author',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                model: User,
                                as: 'participants',
                                through: { attributes: [] },
                            },
                        ],
                    },
                ],
            });
    
            if (!user) {
                throw ApiError.BadRequest(`Пользователь с ID ${userId} не найден`);
            }
    
            const discussions = (user as UserWithDiscussions).discussions.map((discussion: any) => ({
                id: discussion.id,
                title: discussion.title,
                description: discussion.description,
                owner: {
                    id: discussion.creatorId,
                    username: discussion.owner.username,
                    email: discussion.owner.email,
                    avatar: discussion.owner.avatar,
                },
                members: discussion.participants.map((participant: any) => ({
                    id: participant.id,
                    username: participant.username,
                    email: participant.email,
                    avatar: participant.avatar,
                })),
                topics: discussion.topics.map((topic: any) => ({
                    id: topic.id,
                    title: topic.title,
                    description: topic.description,
                    tasks: topic.tasks.map((task: any) => ({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        deadline: task.deadline,
                        priority: task.priority,
                        status: task.status,
                        assignees: task.assignees.map((assignee: any) => ({
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
                                avatar: comment.author.avatar,
                            },
                        })),
                    })),
                })),
            }));
    
            return discussionId ? discussions[0] : { discussions };
        } catch (e) {
            console.error(e);
            throw ApiError.BadRequest(`Ошибка при получении данных об обсуждениях: ${e}`);
        }
    }

    async createDiscussion(title: string, creatorId: number,  topics?: TopicInterface[], description?: string, participants?: number[]) {
        const transaction = await sequelize.transaction()
        try {
            if (creatorId != null) {
                participants = [...(participants || []), creatorId];
            }
            const discussion = await Discussion.create({creatorId, title, description, createdAt: Date.now()}, {transaction})
            if (participants && participants.length > 0) {
                await discussion.setParticipants(participants, { transaction })
            }

            let createdTopics: any[] = []
            if (topics && topics.length > 0) {
                createdTopics = await Promise.all(
                    topics.map(async (topic) => {
                        const createdTopic = await Topic.create({
                            title: topic.title,
                            discussionId: discussion.id
                        }, {transaction})

                        let createdTasks: TaskInterface[] = []
                        if (topic.tasks && topic.tasks.length > 0) {
                            createdTasks = await Promise.all(
                                topic.tasks.map(async (task) => {
                                    const createdTask = await Task.create({
                                        ...task,
                                        topicId: createdTopic.id,
                                        discussionId: discussion.id,
                                    }, { transaction })

                                    if (task.assignees) {
                                        const userIds = task.assignees.map((user: UserInterface) => user.id)
                                        await createdTask.setAssignees(userIds)
                                    }

                                    return createdTask
                                })
                            )
                        }

                        return {
                            ...createdTopic,
                            tasks: createdTasks
                        }
                    })
                )
            }
            await transaction.commit()
            return { discussion, topics: createdTopics }
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            throw ApiError.BadRequest(`Ошибка при создании обсуждения: ${error}`);
        }
    }

    async createEmptyDiscussion(creatorId: number) {
        const discussion = await Discussion.create({
            title: '',
            creatorId,
            createdAt: new Date(),
        });

        await discussion.setParticipants([creatorId])
    
        return discussion;
    }

    async updateDiscussion(id: number, patch: DiscussionUpdatingPatch) {
        const transaction = await sequelize.transaction()
        try {
            let updatedDiscussion = null;
            let updatedTasks: TaskInterface[] = [];
            let updatedTopics: {title: string}[] = []
            
            if (patch.discussion) {
                updatedDiscussion = await Discussion.update(patch.discussion, { where: { id }, transaction, returning: true });
            }
            
            if (patch.topics) {
                updatedTopics = await Promise.all(
                    patch.topics.map(async (topic) => {
                        const [affectedCount, topics] = await Topic.update(
                            { ...topic },
                            { where: { id: topic.id, discussionId: id }, transaction, returning: true }
                        );
                        if (affectedCount === 0) {
                            throw new Error(`Топик с ID ${topic.id} не найден или не принадлежит обсуждению`);
                        }
                        return topics[0];
                    })
                );
            }
            
            if (patch.tasks) {
                updatedTasks = await Promise.all(
                    patch.tasks.map(async (task) => {
                        console.log(task.id)
                        const [affectedCount, tasks] = await Task.update(
                            { ...task },
                            { where: { id: task.id }, transaction, returning: true }
                        );
                        if (affectedCount === 0) {
                            throw new Error(`Задача с ID ${task.id} не найдена`);
                        }
    
                        const updatedTask = tasks[0];
    
                        if (task.assignees) {
                            const userIds = task.assignees.map((user: UserInterface) => user.id)
                            await updatedTask.setAssignees(userIds, { transaction });
                        }
    
                        return updatedTask;
                    })
                );
            }
    
            await transaction.commit();
            return 'Все успешно обновлено'
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            throw new Error(`Ошибка при обновлении обсуждения: ${error}`);
        }
    }
    

    async deleteDiscussion(id: number) {
        const transaction = await sequelize.transaction()
        try {
            await Task.destroy({ where: {discussionId: id}, transaction })
            const affectedRow = await Discussion.destroy({where: { id }, transaction })
            if (affectedRow === 0) {
                throw ApiError.BadRequest('Такого обсуждения не было найдено')
            }
            await transaction.commit()

            return { message: 'Обсуждение и привязанные к нему темы и задания были удалены' }
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