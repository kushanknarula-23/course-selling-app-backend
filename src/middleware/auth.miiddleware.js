const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")

async function authUser(req,res,next){
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"unable to fetch the token"
        })
    }

    // if we are able to fetch the token we will check the role in the fetched token 

    try{
        const decoded = jwt.verify({
            id:token.id
        },process.env.JWT)


        const search = await userModel.findOne(
            decoded.id
        )

// if role is not user
        if(search.role !== "user"){
            return res.status(403).json({
                message:"forbidden"
            })
        }
// if role is user then 
        const user = decoded.id
        req.user = user
        next()

    }
    catch(error){
        return res.status(500).json({
            message:error.message,
        })
    }
}

module.exports = {authUser
}