const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"first name is required"],
    },
    lastname:{
        type:String,
        required:[true, "last name is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"email must be in proper format"]
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return
    }

    // if password is modified then
    const hashed = await bcrypt.hash(this.password,10)
    this.password = hashed
    return
})

// we are appling the our own method 

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
// create the model for this 

const userModel = mongoose.model("user",userSchema)


module.exports = userModel