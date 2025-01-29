import ApiError from "../exceptions/api-error";
import { Request, Response, NextFunction } from 'express';

export default function(err: Error, req: Request, res: Response) {
    console.log(err)
    if (err instanceof ApiError) {
        res.status(err.status).json({message: err.message, errors: err.errors})
    } else {
        res.status(500).json({message: 'Непредвиденная ошибка'})
    }
}