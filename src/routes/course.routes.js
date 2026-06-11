const {Router} = require("express")
const courseRouter = Router()
/**
 * GET /api/course/allcourse
 */
courseRouter.get("/allCourse")

/**
 * POST /api/course/payment
 */
courseRouter.post("/payment")

module.exports = courseRouter