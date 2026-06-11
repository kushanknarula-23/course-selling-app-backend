const express = require("express")
const userRouter = require("./routes/user.routes")
const adminRouter = require("./routes/admin.routes")
const courseRouter = require("./routes/course.routes")

const app = express()

// middlware 
app.use(express())

// api prefix here 
app.use("/api/user" ,userRouter)
app.use("/api/admin" ,adminRouter)
app.use("/api/course",courseRouter)




module.exports = app