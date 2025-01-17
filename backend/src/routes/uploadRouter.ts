import { Router } from "express";
import upload from "../picture-store/multerConfig";
import { getFile, uploadFiles } from "../../controllers/uploadController";

const router = Router()

router.get('/:filename', getFile)
router.post('/', upload.single('file'), uploadFiles)

export default router