const app = require("./src/index")
const connectDb = require("./src/db/db")
require("dotenv").config()

app.listen(3000,()=>{
    connectDb()
    console.log("Server running on port 3000")
})