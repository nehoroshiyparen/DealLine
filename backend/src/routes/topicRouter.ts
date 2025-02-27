import Router from 'express'
import { createTopic, deleteTopic } from '../controllers/topicController'

const router = Router()

router.post('/', createTopic)
router.post('/delete', deleteTopic)

export default router