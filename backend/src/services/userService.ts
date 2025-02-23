import { error } from "console";
import { Comment, Discussion, Token, User, UserFriends } from "../../database/models";
import bcrypt from 'bcrypt'
import { v4 as uuid} from 'uuid'
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDTO from "../dtos/userDTO";
import ApiError from "../exceptions/api-error";
import { Op } from 'sequelize';

class UserService {
    async registration(username: string, email: string, password: string) {
        const candidate_email = await User.findOne({where: {email}})
        const candidate_username = await User.findOne({ where: { username } });
        if (candidate_email) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        if (candidate_username) {
            throw ApiError.BadRequest(`Пользователь с именем пользователя ${username} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid()

        const user = await User.create({ username, email, password: hashPassword, activationLink })

        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return { ...tokens, user: userDTO }
    }

    async activate(activationLink: string) {
        const user = await User.findOne({where: {activationLink}})
        const existing_user = await User.findAll()
        console.log(existing_user)
        console.log(activationLink)
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async log_in(usernameOrEmail: string, password: string) {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
                isDeleted: false
            }
        });
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким именем пользователя или email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return { ...tokens, user: userDTO }
    }

    async log_out(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnathorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData || typeof userData !== 'object' || !('id' in userData)) {
            throw ApiError.UnathorizedError();
        }
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnathorizedError()
        }
        const user = await User.findByPk(userData.id)
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }
        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDTO})

        console.log(userDTO)
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return { ...tokens, user: userDTO }
    }

    async getUsersByUsername(name: string, page: number, limit: number) {
        try {
            const offset = (page - 1) * limit
            const users = await User.findAll({ 
                where: { 
                    username: 
                    {
                        [Op.like]: `%${name}%`
                    },
                    isDeleted: false
                },
                offset,
                limit
            })
            if (!users) {
                throw ApiError.BadRequest('Пользователей с таким именем не сущечтвует')
            }
            return { users }
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest('Непредвиденная ошибка при получении данных о пользователях')
        }
    }

    async getOneUser(username: string) {
        try {
            const user = await User.findOne({
                where: {
                    username
                }, 
                include: [
                    {
                        model: User,
                        as: 'friends',
                        attributes: ['id', 'username', 'email', 'avatar']
                    },
                    {
                        model: Discussion,
                        as: 'discussions',
                        attributes: ['id', 'title', 'description']
                    }
                ]
            })
            if (!user) {
                return { message: `Пользователя с username: ${username} не найдено`}
            }
            return { user }
        } catch (e) {
            throw ApiError.BadRequest(`Ошибка //на стадии обработки// при получении данных о пользователе: ${e}`)
        }
    }

    async deleteFriend(firstId: number, secondId: number) {
        try {
            const userExist = await User.findAll({
                where: { id: { [Op.in]: [ firstId, secondId ] }},
                attributes: ['id']
            })
    
            if (userExist.length < 2) {
                throw ApiError.BadRequest('Не все пользователи существуют')
            }
    
            const friendship = UserFriends.findAll({
                where: {
                    [Op.or]: [
                        { userId: firstId, friendId: secondId },
                        { userId: secondId, friendId: firstId }
                    ]
                }
            })
    
            if (!friendship) {
                throw ApiError.BadRequest('Пользователи не являются друзьями')
            }
    
            const deleteResponse = await UserFriends.destroy({
                where: {
                    [Op.or]: [
                        { userId: firstId, friendId: secondId },
                        { userId: secondId, friendId: firstId }
                    ]
                }
            })
    
            return { message: 'Человек удален из друзей'}
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest('Непредвиденная ошибка при удалении человека из друзей')
        }
    }

    async deleteAccount(userId: number) {
        try {
            const user = await User.findOne({
                where: { id: userId, isDeleted: false }
            })
    
            if (!user) {
                throw ApiError.BadRequest(`Юзера с id: ${userId} не существует`)
            }
    
            await user.update({
                username: 'Deleted account',
                email: 'Deleted account',
                avatar: null,
                isDeleted: true,
            })
    
            await Token.destroy({
                where: { user_id: user.id }
            })
    
            return { message: 'Аккаунт удален' }
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest('Непредвиденная ошибка при удалении аккаунта')
        }
    }
}

export default new UserService()