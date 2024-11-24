import { Router } from 'express'
import { getUserInfo, log_in, sign_in } from '../controllers/userController'

const router = Router()

router.post('/signIn', sign_in)
router.get('/logIn', log_in)
router.get('/', getUserInfo)

export default router