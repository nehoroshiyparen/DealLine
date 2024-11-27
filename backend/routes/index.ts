import { Router } from 'express'
import discussionRouter from './discussionRouter'
import taskRouter from './taskRouter'
import userRouter from './userRouter'
import notificationRouter from './notificationRouter'

const router = Router()

router.use('/discussions', discussionRouter)
router.use('/tasks', taskRouter)
router.use('/users', userRouter)
router.use('notifications', notificationRouter)

export default router