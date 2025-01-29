import { Router } from "express";
import { enterPosition, fetchPositions, updatePositions } from "../controllers/netController";

const router = Router()

router.post('/', enterPosition)
router.post('/update', updatePositions)
router.get('/', fetchPositions)

export default router