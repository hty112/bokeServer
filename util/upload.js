import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/image")// 存储位置
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })
export default upload