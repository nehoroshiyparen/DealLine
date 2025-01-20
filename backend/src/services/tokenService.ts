import jwt, { JwtPayload } from 'jsonwebtoken'
import { Token } from '../../database/models'

class TokenService {
    generateTokens(payload: JwtPayload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: '30d'})
        return {
            accessToken, 
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!)
            console.log(userData)
            return userData
        } catch (error) {
            console.log(error)
        }
    }

    validateRefreshToken(token: string): JwtPayload | string | null {
        try {
            const userData = jwt.verify(token, `${process.env.JWT_REFRESH_SECRET}`)
            return userData
        } catch (error) {
            return null
        }
    }

    async saveToken(user_id: number, refreshToken: string) {
        const tokenData = await Token.findOne({where: {user_id}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }



        const token = await Token.create({user_id, refreshToken})
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await Token.findOne({where: {refreshToken}})
        return tokenData
    }
}

export default new TokenService()