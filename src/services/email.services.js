const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN
    }
})

transport.verify((error,success)=>{
    if(error){
        console.log("error connecting to email service")
    }else{
        console.log("connected successfully to email server")
    }

})

async function sendEmail(to,subject,text,html){
    const email = await transporter.sendMail({
        from:`Coursera team <${process.env.USER_ID}>`,
        to,
        subject,
        text,
        html,
    })
}

module.exports = {sendEmail}