import { Router } from 'express'
import { deleteDiscussion, changeDiscussionStatus, invitePeesonToDiscussion, createDiscussion, editDiscussion, getAllDiscussions } from '../controllers/discussionController'

const router = Router()

router.get('/', getAllDiscussions)
router.post('/', createDiscussion)
router.post('/edit/:id', editDiscussion)
router.post('/addPeson/:id', invitePeesonToDiscussion)
router.post('/status/:id', changeDiscussionStatus)
router.delete('/:id', deleteDiscussion)

export default router