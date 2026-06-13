const mongoose = require("mongoose")
const sessionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"userId is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    refreshToken:{
        type:String,
        required:[true,"refreshToken is required"]
    },
    ip:{
        type:String,
        required:[true,"ip is required"]
    },
    userAgent:{
        type:String,
        required:[true,"userAgent is required"]
    },
    revoked:{
        type:Boolean,
        default:false,
        required:true
    },
    expires:{
        type:Date,
        required:[true,"expiresIn is required"]
    }
},{timestamps:true})

const sessionModel = mongoose.model("session",sessionSchema)


module.exports = sessionModel