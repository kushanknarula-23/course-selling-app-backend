const {Router} = require("express")
const adminRouter = Router()
const {upload,uploadImage}= require("../middleware/multer.middleware")
const adminController = require("../controller/admin.controller")
/**
 * POST /api/admin/register
 */
adminRouter.post("/register",adminController)
/**
 * POST /api/user/login
 */
adminRouter.post("login",adminController)
/**
 * POST /api/user/publishCourse
 */
adminRouter.post("publishCourse",upload.single("image"),uploadImage,adminController)

/**
 * GET /api/admin/getCourse
 */
adminRouter.get("/getCourse",adminController)

/**
 * PUT /api/admin/updateCourse
 */
adminRouter.put("/updateCourse",adminController)




module.exports = adminRouter
