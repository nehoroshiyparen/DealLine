import { Router } from 'express'
import { acceptOffer, getAllNotifications, rejectOffer, sendNotification } from '../../controllers/notificationController'

const router = Router()

router.get('/', getAllNotifications)
router.post('/send_notification', sendNotification)
router.post('/reject', rejectOffer)
router.post('/accept', acceptOffer)

export default router