const {Router} = require("express")
const userRouter = Router()
// api defination starts here 

/**
 * POST /api/user;register
 */
userRouter.post("/register")
/**
 * POST /api/user/login
 */
userRouter.post("/login")
/**
 * GET /api/user/purchasedCourse
 */
userRouter.get("/purchasedCourse")


module.exports = userRouter
