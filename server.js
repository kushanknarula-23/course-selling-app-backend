const app = require("./src/index")
const connectDb = require("./src/db/db")
require("dotenv").config()

connectDb()

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})