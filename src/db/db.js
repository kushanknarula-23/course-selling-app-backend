const mongoose = require("mongoose")



async function connectDb() {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log("Sever connected to database successfully")
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = connectDb