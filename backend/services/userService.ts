import { error } from "console";
import { User } from "../database/models";
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
        const candidate_username = await User.findOne({where: {email}})
        if (candidate_email) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        if (candidate_username) {
            throw ApiError.BadRequest(`Пользователь с именем пользователя ${username} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid()

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`)
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
                [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
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
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return { ...tokens, user: userDTO }
    }

    async getOneUser(id: number) {
        const user = await User.findOne({where: {id}})
        return user
    }
}

export default new UserService()

