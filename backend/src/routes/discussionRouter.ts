import { Router } from 'express'
import { deleteDiscussion, changeDiscussionStatus, invitePeesonToDiscussion, createDiscussion, getAllDiscussions, editDiscussion } from '../controllers/discussionController'

const router = Router()

router.get('/', getAllDiscussions) // with userId or discussionId
router.post('/', createDiscussion)
router.post('/update', editDiscussion)
router.post('/addPeson/:id', invitePeesonToDiscussion)
router.post('/status/:id', changeDiscussionStatus)
router.post('/delete/:id', deleteDiscussion)

export default router