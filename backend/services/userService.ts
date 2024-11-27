import { error } from "console";
import { User } from "../database/models";
import bcrypt from 'bcrypt'
import { v4 as uuid} from 'uuid'
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDTO from "../controllers/dtos/userDTO";
import ApiError from "../exceptions/api-error";

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
}

export default new UserService()

