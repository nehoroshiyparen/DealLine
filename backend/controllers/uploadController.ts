import ApiError from "../src/exceptions/api-error";
import upload from "../src/picture-store/multerConfig"
import { NextFunction, Request, Response } from "express"
import uploadService from "../src/services/uploadService";
import path from "path";

export const uploadFiles = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return next(ApiError.BadRequest('Не обнаружено загруженных файлов'))
        }
        const filename = req.file.filename
        const { userId } = req.body
        await uploadService.setAvatar(userId, filename)

        res.status(200).json({
            message: 'Аватарка успешно обновлена',
            filePath: `/uploads/${filename}`,
        });
    } catch (e) {
        console.log(e)
        return next(e)
    } 
}

export const getFile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { filename } = req.params
        const filePath = path.join(__dirname, '..', 'picture-store', 'uploads', filename)

        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(400).json('Изображение не найдено')
            }
        })
    } catch (e) {

    }
}