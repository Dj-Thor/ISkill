import dbConnect from "../../modals/db"; 
import NextCors from 'nextjs-cors';
import SendMail from "../../myFunctions/sendOtp";
import type { NextApiRequest, NextApiResponse } from 'next'
import user from '../../modals/user'; 
import { getToken } from "next-auth/jwt"

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
  const {info} = req.body;
   
  const secret = process.env['NEXTAUTH_SECRET'];
   if (!secret) throw "Internal Error";
  const Token = await getToken({ req, secret });
  if (!Token) throw "Invalid Request";
   
  const {name, age, gender} = info;
  

  const updatedUser = await user.findOneAndUpdate({email:Token.email}, {name: name, age: age, gender: gender});

 if (!updatedUser) throw "Some Error Occurred";
   
  return res.status(200).json({msg:"Info Updated Successfully", success:true});
  }
  catch (err) {
   
    res.status(400).json({error:String(err), success:false});
  }
}
else {
    res.status(400).json({error:"Invalid Request Method", success:false});
  }
  
}
   