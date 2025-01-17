import { Router } from 'express'
import { changeTaskStatus, createTask, deleteTask, getAllTasks } from '../../controllers/taskController'

const router = Router()

router.get('/', getAllTasks)
router.post('/', createTask)
router.post('/status/:id', changeTaskStatus)
router.delete('/', deleteTask)

export default router