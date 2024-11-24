import { Router } from 'express'
import { changeTaskStatus, createTask, deleteTask, editTask, getAllTasks } from '../controllers/taskController'

const router = Router()

router.get('/', getAllTasks)
router.post('/', createTask)
router.post('edit/:id', editTask)
router.post('/status/:id', changeTaskStatus)
router.delete('/', deleteTask)

export default router