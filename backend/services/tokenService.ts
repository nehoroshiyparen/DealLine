import jwt, { JwtPayload } from 'jsonwebtoken'
import { Token } from '../database/models'

const jwt_access = process.env.JWT_ACCESS_SECRET
const jwt_refresh = process.env.JWT_REFRESH_SECRET

class TokenService {
    generateTokens(payload: JwtPayload) {
        const accesToken = jwt.sign(payload, `${jwt_access}`, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, `${jwt_refresh}`, {expiresIn: '30d'})
        return {
            accesToken, 
            refreshToken
        }
    }

    async saveToken(user_id: number, refreshToken: string) {
        const tokenData = await Token.findOne({where: {user_id}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await Token.create({user: user_id, refreshToken})
        return token;
    }
}

export default new TokenService()