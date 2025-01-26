import { Discussion, Topic } from "../../database/models";
import ApiError from "../exceptions/api-error";

class TopicService {
    async createTopic(title: string, discussionId: number) {
        const discussion = await Discussion.findOne({
            where: { id: discussionId }
        })
        if (!discussion) {
            throw ApiError.BadRequest(`Обсуждения с айди ${discussionId} не существует`)
        }
        const topic = await Topic.create({
            title,
            discussionId,
        })

        return { topic }
    }

    async deleteTopic(id: number) {
        try {
            const response = await Topic.destroy({
                where: {id}
            })

            return { message: 'Тема удалена' }
        } catch (e) {
            throw ApiError.BadRequest('Ошибка при удалении темы')
        }
    }
}

export default new TopicService