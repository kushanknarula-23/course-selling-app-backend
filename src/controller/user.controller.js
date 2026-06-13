const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const otpModel = require("../model/otp.model")
const {generateOtp,generateHtml,generatetext} = require("../utils/utils")
const crypto = require("crypto")
const {sendEmail} = require("../services/email.services")
const sessionModel = require("../model/session.model")
async function register(req,res){
    const limit = 3
    const {firstname , lastname ,email , password} = req.body

    if(!firstname || !lastname || !email ||!password){
        return res.status(400).json({
            message:"credential missing"
        })
    }

    const emailcheck = await userModel.findOne({
        email
    })

    if(emailcheck){
        return res.status(409).json({
            message:"email already exist"
        })
    }

    try{
        // if user does not exist
        const userCreate = await userModel.create({
            firstName:firstname,
            lastName:lastname,
            email:email,
            password:password
        })

        // then we will generate the otp for it 
        const otp = generateOtp()

        const text = generatetext()
        const html = generatehtml()
        

        // hash the otp 

        const otphashed = crypto.createHash("sha256").update(otp).digest("hex")

        // we will check that whether a user has genearted the otp from this email for the first 
        // time or he has genearted for the more than one time 
        const existingotp = await otpModel.findOne({
            email
        })

        if(!existingotp){
            const existingEmail = await otpModel.create({
                email:email,
                otpHash:otphashed,
                otpExpiry:Date.now() +5*60*1000,
                otpCount:1
            })
        }
        else{
            if(existingotp.otpCount >= limit){
                return res.status(409).json({
                message:"otp limit reached"
            })
            }

            existingotp.otpHash=otphashed,
            existingotp.otpExpiry=Date.now() +5*60*1000
            existingotp.otpCount+=1

            await existingotp.save()
        }

        await sendEmail(email,"Successfull registration",text,html)

        return res.status(201).json({
            message:"user created successfully",
            id:userCreate._id,
            firstname:userCreate.firstName,
            lastname:userCreate.lastName,
            email:userCreate.email,
        })
    }
    catch(error){
        return res.status(500).json({
           message:error.message      
        })
    }
}   



async function verifyEmail(req,res){
    const {email,otp} = req.body

    const isemailExist = await otpModel.findOne({
        email
    })

    if(!isemailExist){
        return res.status(401).json({
            message:"email does not exist"
        })
    }

    // otp comparsion

    const otphash = crypto.createHash("sha256").update(otp).digest("hex")

    if(isemailExist.otpHash !== otphash){
        return res.status(401).json({
            message:"invalid otp entered"
        })
    }
    // if otp is correct then 

    const userfind = await userModel.findOne({
        email
    })

    userfind.isVerified = true
    await userfind.save()

    await otpModel.deleteOne({
        email
    })

    return res.status(200).json({
        message:"user verified successfully",
    })
}

async function login(req,res){

    const {email , password} = req.body

    // we have to check whether the send email exist or not 

    const isEmailexist = await userModel.findOne({
        email
    })

    // if we dont find the email 

    if(!isEmailexist){
        return res.status(401).json({
            message:"invalid email id entered"
        })
    }

    // if we find the email then we will compare the password then we will check if the user is verified or not 

    if(!isEmailexist.isVerified){
        return res.status(401).json({
            message:"credentials are not verified"
        })
    }

    // if verified then 

    const passwordCompare = await isEmailexist.comparePassword(password)
    // if password comparison failed 

    if(!passwordCompare){
        return res.status(401).json({
            message:"invalid password entered"
        })
    }

    // token generation

    const refreshToken = jwt.sign({
        id:isEmailexist._id
    },process.env.JWT,{
        expiresIn:"7d"
    })

    const refreshtokeHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const accessToken = jwt.sign({
        id:isEmailexist._id
    },process.env.JWT,{
        expiresIn:"15m"
    })

    // session maintain 

    const sessionMaintain = await sessionModel.create({
        userId:isEmailexist._id,
        email:email,
        refreshToken:refreshtokeHash,
        ip:req.ip,
        userAgent:req.headers[ "user-agent" ],
        expires:Date.now() + 7*24*60*60*1000
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

    res.status(200).json({
        message:"user logged in successfully",
        id:isEmailexist._id,
        email:email,
        accessToken,
    })

}

async function purchasedCourse(){

}

module.exports = {register,login,verifyEmail,purchasedCourse}