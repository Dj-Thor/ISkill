import NextCors from 'nextjs-cors';
import SendMail from "../../myFunctions/sendOtp";
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer";

type Parameters = {
 toEmail? : string,
 email : string,
 name: string,
 queryId: string,
 time:string,
 message:string
};

const confirmUser = async ({email, name, queryId, time, message}: Parameters) => {
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
    <p style="font-size:1.5em;font-weight:bold;color:white;">Hi, ${name}</p>
    <p style="color:white;">Thanks for Contacting ISkills. We got Your query <span style="color:#ff0088">${message}</span> </p>
    <p style="color:white; font-size:1em;">We will contact you within 24 hr through your email.  </p>
    <p style="color:white; font-size:0.8em;">Query Id: ${queryId} </p>
    
    <hr style="border:none;border-bottom:1px solid #ff0088; opacity:0.4" />
    <p style="font-size:0.9em; color:white;">Regards,<br />ISkills<br/>${time}<br/>This is a system generated email</p>
    
   <h3  style="font-size:1em;text-decoration:none;font-weight:600; font-family:Verdana;color:#ff0088;"> </h3>
  </div>
</div>

</body>
</html>`;

 const mailOptions = {
    from: process.env['NM_Email'] as string,
    to: email,
    subject: "User Query",
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
  return true;
} else {
 return false;
}
}

const generateQueryId = () => {
 let a: string = "Q";
 let b: string = "E";
 let c: string = Math.floor(Math.random()*10000).toString();
 let d: string = Math.floor(Math.random()*10000).toString();
 let e: string = Math.floor(Math.random()*1000000).toString();
 return a + c + d + e + b;
}


const sendQuery = async ({name, email, message, queryId, time}: Parameters) => {
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
    
    <p style="font-size:1.5em;font-weight:bold; color:white;">Hi, Admin</p>
    <p style="color:white;">We Got a user Query <span style="color:#ff0088;font-size:1em;">${message}</span></p>
    <p style="color:white;"> Please Respond it through Your Admin Account</p>
    
    <hr style="border:none;border-bottom:1px solid #ff0088; opacity:1" />
    <p style="font-size:0.9em; color:white;">User Info<br />${name}<br/>${email}<br/>Query Id : ${queryId}<br/>${time}</p>
    
   <h3  style="font-size:1em;text-decoration:none;font-weight:600; font-family:Verdana;color:#ff0088;"> </h3>
  </div>
</div>

</body>
</html>`;
  
 const mailOptions = {
    from: process.env['NM_Email'],
    to: "imshauryathakur@gmail.com",
    subject: "User Query",
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
  return await confirmUser({email, name, queryId, time, message});
} else {
 return false;
}

}

type response = {
 error?: string,
 msg?: string,
 success: boolean
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response>
)  {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

if (req.method=="POST") {
  try {
  const {email, name, message} = req.body;
  
  if (!email || !name || !message ) throw new Error("Some Error Occurred");    
  const date = new Date();
  const time = date.toString();
  const queryId = generateQueryId();
   
  
  let Success  = await sendQuery({name, email, message, queryId, time});
   
  if (Success) {
   return res.status(200).json({msg:"Query Send Successfully", success:true}); 
  }
  else {
  return res.status(400).json({msg:"Some Error Occurred ", success:false});
  }
    
  }
  catch (err) {
    res.status(400).json({error:"Some Error Occurred", success:false});
  }
}
else {
    res.status(400).json({error:"Invalid Request Method", success:false});
  }
  
}