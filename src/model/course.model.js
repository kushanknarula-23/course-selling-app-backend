const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required for the course"]
    },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    price:{
        type:Number,
        required:[true,"price is required for the course"],
    },
    imageUrl:{
        type:String,
        required:[true,"image is required for the course"]
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin",
        required:[true,"creatorId is required"]
    }

},{timestamps:true})

const courseModel = mongoose.model("course",courseSchema)

module.exports = courseModel