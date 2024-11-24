import { Router } from 'express'
import discussionRouter from './discussionRouter'
import taskRouter from './taskRouter'
import userRouter from './userRouter'
import notificationRouter from './notificationRouter'

const router = Router()

router.use('/discussions', discussionRouter)
router.use('/tasks', taskRouter)
router.use('/user', userRouter)
router.use('notification', notificationRouter)

export default router