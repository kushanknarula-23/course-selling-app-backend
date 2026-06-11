const {Router} = require("express")
const adminRouter = Router()
/**
 * POST /api/admin/register
 */
adminRouter.post("/register")
/**
 * POST /api/user/login
 */
adminRouter.post("login")
/**
 * POST /api/user/publishCourse
 */
adminRouter.post("publishCourse")

/**
 * GET /api/admin/getCourse
 */
adminRouter.get("/getCourse")

/**
 * PUT /api/admin/updateCourse
 */
adminRouter.put("/updateCourse")




module.exports = adminRouter
