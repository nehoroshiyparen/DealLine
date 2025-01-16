import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadFolder = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})



const upload = multer({ storage })

export default upload