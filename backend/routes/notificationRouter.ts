import { Router } from 'express'
import { getAllNotifications, sendDiscussionInvite, sendFriendRequest, sendReminder } from '../controllers/notificationController'

const router = Router()

router.get('/', getAllNotifications)
router.post('friendRequest/:id', sendFriendRequest)
router.post('discussionInvite/:id', sendDiscussionInvite)
router.post('reminder/:id', sendReminder)

export default router