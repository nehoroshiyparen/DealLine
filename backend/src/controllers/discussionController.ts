import { Discussion } from "../../database/models";
import { Request, Response } from "express";
import { Op } from 'sequelize'
import discussionService from "../services/discussionService";
import { create } from "domain";
import { DiscussionInterface } from "../../types/types";

export const getAllDiscussions = async(req: Request, res: Response) => {
    try {
        const { user_id } = req.params
        const discussions = await discussionService.getAllUsersDiscussions(Number(user_id))
        res.json(discussions) 
    } catch (error) {
        res.json({message :'Ошибка получения обсуждений: ', error})
    }
}

export const createDiscussion = async(req: Request, res: Response) => {
    try {
        const { creatorId, participants, title, description, topics }: DiscussionInterface = req.body
        console.log(title, req.body)
        const createdDiscussion = await discussionService.createDiscussion(title, topics, description, participants, creatorId)
        if (!createdDiscussion) {
            res.json('При создании обсуждения произошла ошибка. Некорректные данные')
        } 
        res.json(createdDiscussion)
    } catch (error) {
        res.json({message :'Ошибка создания обсуждения: ', error})
    }
}

export const editDiscussion = async(req: Request, res: Response) => {
    try {
        const { id, patch } = req.body
        const updatedDiscussionData = await discussionService.updateDiscussion(id, patch)
        res.json(updatedDiscussionData)
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
        const { id, status } = req.body
        const changeStatusRequest = await discussionService.changeDiscussionStatus(id, status)
        res.json(changeStatusRequest)
    } catch (error) {
        res.json({message :'Ошибка при обновлении обсуждения: ', error})    
    }
}

export const deleteDiscussion = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const removeDiscussion = await discussionService.deleteDiscussion(Number(id))
        res.json(removeDiscussion)
    } catch (error) {
        res.json({message :'Ошибка при удалении обсуждения: ', error})    
    }
}