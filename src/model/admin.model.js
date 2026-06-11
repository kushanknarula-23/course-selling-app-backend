const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const adminSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"first name is required"]
    },
    lastname:{
        type:String,
        required:[true,"lastname is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is requird"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"email must be in proper format "]
    },
    password:{
        type:String,
        required:[true , "password is"]
    }
},{timestamps:true})

// pre middleware 

adminSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return 
        next()
    }

    const hashedpassword = bcrypt.hash(this.password,10)
    this.password =hashedpassword
    next()
})

// comaprison

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
    
}

const adminModel = mongoose.model("admin",adminSchema)

module.exports = adminModel