import { Discussion } from "../database/models";
import { Request, Response } from "express";

export const getAllDiscussions = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message :'Ошибка получения обсуждений: ', error})
    }
}

export const createDiscussion = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message :'Ошибка создания обсуждения: ', error})
    }
}

export const editDiscussion = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message :'Ошибка при обновлении обсуждения: ', error})    
    }
}

export const invitePeesonToDiscussion = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message :'Ошибка при попытке приглашения в обсуждение: ', error})    
    }
}

export const changeDiscussionStatus = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message :'Ошибка при обновлении обсуждения: ', error})    
    }
}

export const deleteDiscussion = async(req: Request, res: Response) => {
    try {

    } catch (error) {
        res.json({message :'Ошибка при удалении обсуждения: ', error})    
    }
}