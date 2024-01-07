import dbConnect from "../../modals/db"; 
import NextCors from 'nextjs-cors';
import SendMail from "../../myFunctions/sendOtp";
import type { NextApiRequest, NextApiResponse } from 'next'
import user from '../../modals/user'; 
import CryptoJS from "crypto-js";

const GenerateOTP = async () => {
  return Math.floor(Math.random()*1000000).toString();
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
  
  await dbConnect();
   
  const mySecret = process.env['NEXTAUTH_SECRET'];
   if (!mySecret) throw "Internal Error";
  const {email, isNew, password} = req.body;
  if (!(isNew == "yes" || isNew == "no")) {
   throw new Error("Invalid Credentials");
  }
   
  if (!email||!isNew) {
   throw new Error("Invalid Credentials");
  }
   
  let isExist = await user.findOne({
  email: req.body.email
  });

   
   
  if (req.body.isNew == "no") {
    if (isExist == null) throw new Error("Invalid Credentials");
    else {
     const bytes  = CryptoJS.AES.decrypt(isExist.password, mySecret);
     const decrypted = bytes.toString(CryptoJS.enc.Utf8);
     if (decrypted!=password){
      throw new Error("Invalid Credentials");
     }
    }
  } 
   
  let Success = await SendMail(req.body.email, await GenerateOTP());
    
  if (Success) {
   return res.status(200).json({msg:"OTP Send Successfully", success:true}); 
  }
  else {
  return res.status(400).json({msg:"Some Error Occurred", success:false});
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