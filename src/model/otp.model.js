const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const otpSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    otpHash:{
        type:String,
        required:[true,"otphash is required"]
    },
    otpCount:{
        type:Number,
        default:0,
        required:true
    },
    otpExpiry:{
        type:Date,
        required:[true,"otpExpiry is required"]
    },
    // otpBlock:{
    //     type:Date,
    //     default:null
    // }
},{
    timestamps:true
})



const otpModel = mongoose.model("otp",otpSchema)

module.exports = otpModel