const multer = require("multer")

// we create the storage so the image is kept in memory instead 
// of keeping the folder
const upload = multer({
    storage: multer.memoryStorage()
})

const uploadImage = async function (req, res, next) {
    console.log(req.file)
    next()
}

module.exports = { upload, uploadImage }

