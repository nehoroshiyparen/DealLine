import { Router } from 'express'
import { changeTaskStatus, createTask, deleteTask, getAllTasks, getOneTask, sendComment } from '../controllers/taskController'

const router = Router()

router.get('/', getAllTasks)
router.get('/one/:taskId', getOneTask)
router.post('/', createTask)
router.post('/status/:id', changeTaskStatus)
router.delete('/', deleteTask)
router.post('/sendComment', sendComment)

export default router