import { Request, Response,  NextFunction } from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/tokenService";

interface CustomRequest extends Request {
    user?: any; // Укажите конкретный тип, если знаете, например, `UserDTO`
}

export default function(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw next(ApiError.UnathorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            throw next(ApiError.UnathorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        console.log(accessToken)
        if (!userData) {
            throw next(ApiError.UnathorizedError())
        }
        req.user = userData
        next()
    } catch (error) {
        return next(ApiError.UnathorizedError())
    }
}