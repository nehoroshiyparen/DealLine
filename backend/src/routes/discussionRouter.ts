import { Router } from 'express'
import { deleteDiscussion, changeDiscussionStatus, invitePeesonToDiscussion, createDiscussion, getAllDiscussions } from '../../controllers/discussionController'

const router = Router()

router.get('/:user_id', getAllDiscussions) // with userId
router.post('/', createDiscussion)
router.post('/addPeson/:id', invitePeesonToDiscussion)
router.post('/status/:id', changeDiscussionStatus)
router.delete('/:id', deleteDiscussion)

export default router