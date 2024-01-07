import OTP from '../modals/otp';
import nodemailer from "nodemailer";

const SendMail = async (toEmail:string, Code:String) => {
 
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env['NM_Email'],
      pass: process.env['NM_Secret'],
    },
  });

 const htmlTemplate = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Page title</title>
</head>
<body>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:80%vw;overflow:auto;line-height:2;background-color: black;color:white; border-radius:8px;">
  <div style="margin:25px auto;width:70%; max-width:400px; padding:20px 0; border-radius:5px;">
    <div style="">
      <a href="" style="font-size:2.5em;text-decoration:none;font-weight:600; font-family:Verdana;color:#ff0088;letter-spacing:3px;">ISkills</a>
      
      
    </div>
    <p style="font-size:1.1em;font-weight:bold; ">Hi,</p>
    <p style="color:white;">Thank you for choosing ISkills. Use the following OTP to complete your Authentication procedures. OTP is valid for 5 minutes</p>
    <h2 id="myInput"  style="margin: 0 auto;width: max-content;padding: 0 16px;color: #ff0088;border-radius: 4px;font-size:2.5em;letter-spacing:8px;">${Code}</h2>
    
    <p style="font-size:0.9em;">Regards,<br />ISkills</p>
    <hr style="border:none;border-bottom:1px solid #ff0088; opacity:0.4" />
   <h3  style="font-size:1em;text-decoration:none;font-weight:600; font-family:Verdana;color:#ff0088;"> </h3>
  </div>
</div>

</body>
</html>`;
  
 const mailOptions = {
    from: process.env['NM_Email'],
    to: toEmail,
    subject: "Authentication Through OTP",
    html: htmlTemplate,
  };

const status = await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
       
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
 
if (status) {
try {
  // Making A otp Schema for verification 
  let otp = new OTP({
  email: toEmail,
  OTPCode: Code
  });
  await otp.save();
}
 catch (err) {
  return false;
  }
}
  return status;
}

export default SendMail;