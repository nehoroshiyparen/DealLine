import { Discussion, Notifications, User } from "../../database/models";
import ApiError from "../exceptions/api-error";
import { NotificationsInterface } from "../../types/types";

class notificationService {
    async getNotifications(recieverId: number) {
        try {
            const notifications = await Notifications.findAll({ where: {recieverId} })
            return notifications
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest(`Пользователя с айди ${recieverId} не найдено`)
        }
    }

    async createNotification(params: NotificationsInterface) {
        try {
            const notification = await Notifications.create({params})
            return notification
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest('Ошибка при создании уведомления')
        }
    }

    async rejectOffer(id: number) {
        try {
            const notification = Notifications.destroy({where: {id}})
            if (!notification) {
                throw ApiError.BadRequest(`Уведомления с айди ${id} не существует`)
            }
            return {message: `Уведомление с айди ${id} удалено`}
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

            const reciever = await User.findOne({where: {id: notification.receiverId}})

            if (notification.type === 'friend_request') {
                const creator = await User.findOne({where: {id: notification.senderId}})

                if (!reciever || !creator) {
                    throw ApiError.BadRequest('Не существует одного из пользователей')
                }

                await reciever.addFriend(creator.id)
                await creator.addFriend(reciever.id)

                return { message: 'Успешное добавление в друзья' }
            } else {
                const discussion = await Discussion.findOne({where: {id: discussionId}})

                if (!reciever || !discussion) {
                    throw ApiError.BadRequest(`Не существует либо пользователя либо обсуждения user: ${reciever}, discussion: ${discussion}`)
                }

                await discussion.addParticipants(reciever.id)

                return { message: 'Добавлен новый участник голосования' }
            }
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest('Ошибка при принятии предложения', [error])
        }
    }
}

export default new notificationService()