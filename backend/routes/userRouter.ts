import { Router } from 'express'
import { activate, getUserInfo, log_in, log_out, refresh, registration } from '../controllers/userController'

const router = Router()

router.post('/registration', registration)
router.post('/logIn', log_in)
router.post('/logout', log_out)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)
router.get('/', getUserInfo)

export default router