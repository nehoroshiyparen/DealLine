import { Discussion, DiscussionParticipants, Position, User } from "../../database/models";
import { PositionInterface } from "../../types/types";
import ApiError from "../exceptions/api-error";

class netService {
    async enterPosition(userId: number, positions: PositionInterface[]) {
        const response = []
        const user = await User.findOne({where: {id: userId}})
        if (!user) {
            throw ApiError.BadRequest(`Пользователя с id: ${userId} не существует`)
        }
        for (const position of positions) {
            const discussion = await Discussion.findOne({where: {id: position.discussionId}})
            if (!discussion) {
                console.log(`Обсуждения с id: ${position.discussionId} не существует`)
                continue
            }

            const creation = await Position.create({
                userId, 
                elementId: position.elementId,
                discussionId: position.discussionId,
                x: position.x,
                y: position.y
            })
            response.push(creation)
        }
        if (response.length === positions.length) {
            return 'Все позиции сохранены'
        } else {
            return 'Не все позиции были сохранены'
        }
    }

    async updatePositions(userId: number, positions: PositionInterface[]) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw ApiError.BadRequest(`Пользователя с id: ${userId} не существует`);
        }
    
        const response = await Promise.all(
            positions.map(async (position) => {
                const positionWithUserId = {
                    ...position,
                    userId, 
                };
                await Position.upsert(positionWithUserId);
            })
        );
    
        return response;
    }
    

    async fetchPositions(userId: number, discussionId: number) {
        const user = await User.findOne({ where: {id: userId} })
        if (!user) {
            throw ApiError.BadRequest(`Пользователя с id: ${userId} не существует`)
        }
        const isParticipant = await DiscussionParticipants.findOne({where: {userId, discussionId}})
        if (!isParticipant) {
            return 'Пользователь не является участником этого обсуждения'
        }
        const positions = await Position.findAll({ where: {userId, discussionId} })
        return positions
    }
}

export default new netService()