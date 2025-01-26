import { Router } from 'express'
import discussionRouter from './discussionRouter'
import taskRouter from './taskRouter'
import userRouter from './userRouter'
import notificationRouter from './notificationRouter'
import uploadRouter from './uploadRouter'
import topicRouter from './topicRouter'
import authMiddleware from '../middleware/AuthMiddleware'


const router = Router()

router.use('/discussions', discussionRouter)
router.use('/tasks', taskRouter)
router.use('/topics', topicRouter)
router.use('/users', userRouter)
router.use('/notifications', notificationRouter)
router.use('/upload', uploadRouter)

export default router