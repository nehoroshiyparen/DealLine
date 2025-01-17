import { User } from "../../database/models"
import ApiError from "../exceptions/api-error"

class UploadService {
    async setAvatar(userId: number, picture: string) {
        try {
            const user = await User.findOne({where: {id: userId}})
            if (!user) {
                throw ApiError.BadRequest(`Пользователя с id:${userId} не существует`)
            }
            await user?.update({avatar: picture})
        } catch (e) {
            throw ApiError.BadRequest('Ошибка при обновлении аватарки');
        }
    }
}

export default new UploadService