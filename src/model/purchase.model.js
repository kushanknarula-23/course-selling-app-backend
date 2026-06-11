const mongoose = require("mongoose")



const purchaseSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"courseid is required"],
        ref:"course",
    },
    userId:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"userId is required"]
    }
},{timestamps:true})

const purchaseModel = mongoose.model("purchase",purchaseSchema)


module.exports = purchaseModel

