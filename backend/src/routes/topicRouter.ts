import Router from 'express'
import { createTopic, deleteTopic } from '../controllers/topicController'

const router = Router()

router.post('/', createTopic)
router.post('/delete/:id', deleteTopic)

export default router