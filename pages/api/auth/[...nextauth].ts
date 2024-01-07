import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import CryptoJS from "crypto-js";
import dbConnect from "../../../modals/db";
import user from '../../../modals/user';
import VerifyOTP from "../../../myFunctions/verifyOtp";

const randomPassword = () => {

const alpha = "Qwertyuiopasdfghjklzxcvbnm";
const num = "5432167890";
const sym = "@#$&¥€%π£¢";

let password = alpha[Math.floor(10*Math.random())].toUpperCase();

for (let i=0; i<5; i++){
 let random = Math.floor(10*Math.random());
 password = password+alpha[random]+sym[random]+num[random];
}
return password;
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
   CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",

    credentials: {
      name: {
       label: 'Name',
       type: "text"
      },
      email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
        otp: {label: "One-time-password", type: "text"},
        isNew : {type: "text"}
    },
    async authorize(credentials, req) {

try {
  
 await dbConnect();
 
 if ( !credentials || !credentials.email || !credentials.password || !credentials.isNew || !credentials.otp) throw new Error("Invalid Credentials");
 
 if (credentials.isNew == "no") {
 
 const mySecret = process.env['NEXTAUTH_SECRET'];

  let Userdetails = await user.findOne({
  email: credentials.email
  });
  
  if (!Userdetails) throw new Error("Invalid Credentials");
  
  if (!mySecret ) throw new Error("Internal Error");
  const bytes  = CryptoJS.AES.decrypt(Userdetails.password, mySecret);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
 if (decrypted!=credentials.password){
   throw new Error("Invalid Credentials");
 }
  
 let OTPVerification = await VerifyOTP(credentials.email,credentials.otp);

 if (OTPVerification == false) throw new Error("Invalid OTP");
  
  return Userdetails;
 }
 else if (credentials.isNew == "yes") {
  const mySecret = process.env['NEXTAUTH_SECRET']
  

  let OTPVerification = await VerifyOTP(credentials.email, credentials.otp);

 if (OTPVerification == false) throw new Error("Invalid OTP");

  if (!mySecret ) throw new Error("Internal Error");
  
  const encrypted = CryptoJS.AES.encrypt(credentials.password, mySecret).toString();
  
  let User = new user({
  name: credentials.name,
  email: credentials.email,
  password: encrypted
  });
  await User.save();
 
  return User; 
 } else {
  return null;
 }
} 
catch (err) {
  
  return null;
}
 
}
 }),
   GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  })

  ],
  pages: {
    signIn: '/user/SignIn',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
callbacks: {
 async signIn({ account, profile }) {
 try {
 if (account == null || !profile) throw new Error("Internal Error");
if (account.provider === "google") {
  await dbConnect();
  let isExist = await user.findOne({
  email: profile.email
  });
  if (isExist){
   return true;
  } else {
  const mySecret = process.env['NEXTAUTH_SECRET'];
   
   if (!mySecret ) throw new Error("Internal Error");
   
  const encrypted = CryptoJS.AES.encrypt(randomPassword(), mySecret).toString();
  
  let User = new user({
  name: profile.name,
  email: profile.email,
  password: encrypted
  });
  await User.save();
 
  return true; 
  }
}
 return true; 
} catch (error) {
   
 return false; 
}
      
    
 }
}
})