import { error } from "console";
import { User } from "../database/models";
import bcrypt from 'bcrypt'
import { v4 as uuid} from 'uuid'
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDTO from "../controllers/dtos/userDTO";

class UserService {
    async registration(username: string, email: string, password: string) {
        const candidate_email = await User.findOne({where: {email}})
        const candidate_username = await User.findOne({where: {email}})
        if (candidate_email) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        if (candidate_username) {
            throw new Error(`Пользователь с именем пользователя ${username} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid()

        const user = await User.create({ username, email, password: hashPassword, activationLink })
        await mailService.sendActivationMail(email, activationLink)

        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return { ...tokens, user: userDTO }
    }
}

export default new UserService()

