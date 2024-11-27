import { Router } from 'express'
import { activate, getUserInfo, log_in, log_out, refresh, registration } from '../controllers/userController'
import { body } from 'express-validator'
import authMiddleware from '../middleware/AuthMiddleware'

const router = Router()

router.post('/registration',
    body('username').isLength({ min: 3, max: 16 }),
    body('email').isEmail(), 
    body('password').isLength({ min: 3, max: 16 }),
    registration)
router.post('/logIn', log_in)
router.post('/logOut', log_out)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)
router.get('/', authMiddleware, getUserInfo)

export default router