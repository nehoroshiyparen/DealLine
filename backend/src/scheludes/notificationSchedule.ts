import { Discussion, Notifications, Task, User } from "../../database/models"
import { Op } from 'sequelize'
import ApiError from "../exceptions/api-error"

async function checkAndSendReminders() {
    const current_date = new Date()
    const target_date = new Date()
    target_date.setDate(current_date.getDate() + 3)

    const tasks = await Task.findAll({ 
        where: {deadline: {[Op.between]: [current_date, target_date]}},
        include: [{ model: User, as: 'assignees' }],
    })
    for (const task of tasks) {
        const discussion = await Discussion.findOne({where: {id: task.discussionId}})
        if (!discussion) {
            throw ApiError.BadRequest('Нет обсуждения с айди ' + task.discussionId)
        }
        const timeRemaining = Math.max(task.deadline.getTime() - current_date.getTime(), 0)
        const daysRemaining = Math.ceil(timeRemaining/(1000*3600*24))

        const message = `Напоминаем, что задача ${task.title} должна быть завершена через ${daysRemaining} ${daysRemaining === 1 ? 'день' : 'дня'} (дедлайн: ${task.deadline.toLocaleString()})`

        for (const user of task.assignees) {
            await Notifications.create({
                type: 'reminder',
                senderId: discussion.creatorId,
                recieverId: user,
                date: current_date,
                message
            })
        }
    }
    console.log('Все напоминания отправлены')
}

setInterval(checkAndSendReminders, 24*60*60*1000)