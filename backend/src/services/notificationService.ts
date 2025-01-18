import { Discussion, DiscussionParticipants, Notifications, User, UserFriends } from "../../database/models";
import ApiError from "../exceptions/api-error";
import { NotificationsInterface } from "../../types/types";
import { Op } from "sequelize";

class notificationService {
    async getNotifications(recieverId: number) {
        try {
            const notifications = await Notifications.findAll({ where: {recieverId} })
            if (notifications.length === 0) {
                throw ApiError.BadRequest(`У пользователя с айди ${recieverId} нет уведомлений`);
            }
            return { notifications }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async createNotification(patch: NotificationsInterface) {
        try {
            const existingNotification = await Notifications.findOne({ 
                where: { 
                    discussionId: patch.discussionId,
                    senderId: patch.senderId, 
                    recieverId: patch.recieverId, 
                    type: { [Op.or]: ['friend_request', 'discussion_invitation'] } 
                } 
            })

            if (existingNotification) {
                throw ApiError.BadRequest(`Уведомление такого типа уже отправлено этому человеку`)
            }

            const reciever = await User.findOne({ where: {id: patch.recieverId} })

            if (!reciever) {
                throw ApiError.BadRequest(`Пользователя, которому вы хотите отправить запрос, не существует`)
            }

            const validation: Record<string, () => Promise<void>> = {
                friend_request: async() => {
                    const friendship = await UserFriends.findOne({
                        where: {
                            userId: patch.recieverId, 
                            friendId: patch.senderId
                        }
                    })
                    if (friendship) {
                        throw ApiError.BadRequest('Вы уже есть в друзьях у этого человека')
                    }
                },
                discussion_invitation: async() => {
                    const participant = await DiscussionParticipants.findOne({
                        where: { 
                            discussionId: patch.discussionId, 
                            userId: patch.recieverId
                        }
                    })
                    if (participant) {
                        throw ApiError.BadRequest('Данный пользователь уже является участником указанного обсуждения')
                    }
                }
            }

            if (validation[patch.type]) {
                await validation[patch.type]()
            }

            const notification = await Notifications.create({...patch, type: patch.type})
            return notification
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.log(error)
            throw ApiError.BadRequest('Ошибка при создании уведомления')
        }
    }

    async rejectOffer(id: number) {
        try {
            const notification = await Notifications.destroy({where: {id}})
            console.log(notification)
            if (!notification) {
                throw ApiError.BadRequest(`Уведомления с айди ${id} не существует`)
            }
            return {message: `Вы отклонили данный запрос`}
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest('Ошибка при удалении уведомления', [error])
        }
    }

    async acceptOffer(id: number, discussionId?: number) {
        try {
            const notification = await Notifications.findOne({where: {id}})
            if (!notification) {
                throw ApiError.BadRequest(`Уведомления с айди ${id} не существует`)
            }

            const reciever = await User.findOne({where: {id: notification.recieverId}})

            if (notification.type === 'friend_request') {
                const creator = await User.findOne({where: {id: notification.senderId}})

                if (!reciever || !creator) {
                    throw ApiError.BadRequest('Не существует одного из пользователей')
                }

                await reciever.addFriend(creator.id)
                await creator.addFriend(reciever.id)

                Notifications.destroy({where: {id}})

                return { message: 'Успешное добавление в друзья' }
            } else {
                const discussion = await Discussion.findOne({where: {id: discussionId}})

                if (!reciever || !discussion) {
                    throw ApiError.BadRequest(`Не существует либо пользователя либо обсуждения user: ${reciever}, discussion: ${discussion}`)
                }

                await discussion.addParticipants(reciever.id)

                Notifications.destroy({where: {id}})

                return { message: 'Добавлен новый участник голосования' }
            }
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest('Ошибка при принятии предложения', [error])
        }
    }
}

export default new notificationService()