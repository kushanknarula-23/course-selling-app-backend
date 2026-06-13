function generateOtp(){
    return (Math.floor(100000*Math.random() + 900000)).toString()
}


function generatetext(){
    const text = `Hello ${firstname},

        Thank you for registering with our platform.

        Your One-Time Password (OTP) for email verification is:

        ${otp}

        This OTP is valid for 5 minutes.

        If you did not request this registration, please ignore this email.

        Thank you,
        Coursera Team`
}


function generateHtml (){
    `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">

        <h2 style="color: #333333; text-align: center;">
            Welcome!
        </h2>

        <p>Hello <strong>{{firstName}}</strong>,</p>

        <p>
            Thank you for registering with our platform.
            To complete your registration, please verify your email address using the OTP below.
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <span style="
                display: inline-block;
                background-color: #007bff;
                color: white;
                padding: 15px 30px;
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 5px;
                border-radius: 8px;">
                {{OTP}}
            </span>
        </div>

        <p>
            <strong>This OTP is valid for 5 minutes.</strong>
        </p>

        <p>
            For security reasons, please do not share this OTP with anyone.
        </p>

        <hr>

        <p style="font-size: 14px; color: #666;">
            If you did not create an account, you can safely ignore this email.
        </p>

        <p>
            Regards,<br>
            <strong>Your Team</strong>
        </p>

    </div>

</body>
</html>`
}

module.exports = {generateOtp,generateHtml,generatetext}