import {
 Card, Input, Checkbox, Button,
 Typography, Spinner
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { signIn as authSignIn, getProviders } from "next-auth/react"
import type {
 GetServerSidePropsContext,
 InferGetServerSidePropsType,
} from "next"
import { getServerSession } from "next-auth/next"
import NextAuth from "../api/auth/[...nextauth]"
import { BiArrowBack } from 'react-icons/bi';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Timer from "../../components/Timer";
import { MdEmail, MdDriveFileRenameOutline, MdOutlinePassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Head from 'next/head'

const URL = process.env['NEXT_PUBLIC_URL'];

export default function SignUp({
 providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
const router = useRouter();

 const [type, setType] = React.useState("password");
const [signUp, setSignUp] = React.useState({ name: "", email: "", password: "", otp:""});
const [timer, setTimer] = React.useState(false);
const [verify, setVerify] = React.useState(false);
const [spin, setSpin] = React.useState(false);


const resendOTP = async () => {
  const myPromise = new Promise(async (resolve, reject) => {
   setSpin(true)
   let response = await fetch(`${URL}/api/sendotp`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: signUp.email, isNew:"yes"}, null, 2)
   });
   const json = await response.json();
   if (json.success) {
    resolve(json.msg);
    setSpin(false);
    setVerify(true);
    setTimer(true);
   }
   else {
    reject(json.msg);
    setSpin(false);
   }
  });

  const res = await toast.promise(myPromise,
   {
    pending: 'Please Wait',
    success: "OTP Send Successfully",
    error: 'Some Error Occurred'
   });
  
 }


const sendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const myPromise = new Promise(async (resolve, reject) => {
   setSpin(true)
   let response = await fetch(`${URL}/api/sendotp`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: signUp.email, isNew:"yes"}, null, 2)
   });
   const json = await response.json();
   if (json.success) {
    resolve(json.msg);
    setSpin(false);
    setVerify(true);
    setTimer(true);
   }
   else {
    reject(json.msg);
    setSpin(false);
   }
  });

  const res = await toast.promise(myPromise,
   {
    pending: 'Please Wait',
    success: "OTP Send Successfully",
    error: 'Some Error Occurred'
   });
  
 }


 const signUp_OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSignUp({ ...signUp, [e.target.name]: e.target.value })
 }

 const handle_SignUp = async (e: React.FormEvent<HTMLFormElement>, id:string) => {

  e.preventDefault();
  setSpin(true);
const myPromise = new Promise(async (resolve, reject) => {

  const response = await authSignIn(id, { redirect: false, email: signUp.email, password: signUp.password, isNew: "yes", otp: signUp.otp, name:signUp.name, callbackUrl: `${URL}/`});


 if (response && response.ok) {
   resolve("Signup successfully");
   setSpin(false); 
   router.push(`${URL}/`);
  }
 else {
 reject();
 setSpin(false);
 }
});
  const res = await toast.promise(myPromise,
   {
    pending: 'Please Wait',
    success: "Signup Successfully",
    error: 'Some Error Occurred'
   });
  

  
 }



 return (<>
  <ToastContainer
   position="top-center"
   autoClose={1000}
   hideProgressBar={false}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   pauseOnFocusLoss
   draggable
   pauseOnHover
   theme="dark"
   transition={Slide}

  />
  <Head>
  <title>ISkill | Sign-Up</title>
  <meta name="description" content="Sign-Up page for new users" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <link rel="icon" href="/favicon.ico "/>
</Head>
 <section className="min-h-screen">
  <div className="flex justify-center my-8">
   <Card color="transparent" shadow={false}>

    <Typography variant="h2" color="pink" className="font-lato">
     Sign Up
    </Typography>
    <Typography color="pink" className="mt-2 font-poppins text-sm">
     Still don&apos;t have an account.
    </Typography>
    <Typography color="gray" className="mt-1 font-poppins">
     Enter your details to register.
    </Typography>

{Object.values(providers).map((item, idx) => {
 let value;
 switch (item.name) {
 case "Credentials":
 value = verify ? (<form key={idx} onSubmit={(e) => handle_SignUp(e, item.id)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        {timer?"":<Button onClick={() => { setVerify(false) }} color="pink" className=" mb-6 p-1" >
      <BiArrowBack className="text-xl" />
        </Button>}
        <div className="w-full p-1 mb-2">
         {timer?<Timer Start={timer} Stop={setTimer}/>:<Button onClick={()=>{resendOTP()}}  size="sm" variant="text"  color="pink" className="font-poppins" >Resend</Button>}
        </div>
        <div className="mb-4 flex flex-col gap-6">
         <Input type="text" size="lg" label="OTP" name="otp" required value={signUp.otp} onChange={signUp_OnChange} icon={<MdOutlinePassword className="text-xl text-pink-500" />} color="pink" style={{"fontFamily":"lato"}}/>
        </div>
        <Checkbox
         label={
          <Typography
           variant="small"
           color="pink"
           className="flex items-center font-poppins"
          >
           I agree the
           <a
            href="#"
            className="font-medium transition-colors hover:text-gray-900"
           >
            &nbsp;Terms and Conditions
           </a>
          </Typography>
         }
         containerProps={{ className: "-ml-2.5" }}
         required
         color="pink"
        />
        {spin?<Spinner className="mx-auto" />:<Button type="submit" className="mt-6 font-poppins" fullWidth>
         Register
        </Button>}
        <Typography color="gray" className="mt-4 text-center font-poppins">
         Already have an account?{" "}
         <Link href={`${URL}/user/SignUp`} className="font-medium text-pink-500">
          Sign Up
         </Link>
        </Typography>
       </form>) : (<form key={idx} onSubmit={(e)=>{sendOTP(e)}} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
     <div className="mb-4 flex flex-col gap-6">
      <Input type="text" size="lg" label="Name" name="name" value={signUp.name} required minLength={3} onChange={signUp_OnChange} icon={<MdDriveFileRenameOutline className="text-xl text-pink-500" />} color="pink" style={{"fontFamily":"lato"}} />
      <Input type="email" size="lg" label="Email" name="email" required value={signUp.email} icon={<MdEmail className="text-xl text-pink-500" />} onChange={signUp_OnChange} color="pink" style={{"fontFamily":"lato"}} />
         <Input type={type} size="lg" label="Password" name="password" value={signUp.password} required onChange={signUp_OnChange} icon={type=="text"?<FaEyeSlash className="text-xl text-pink-500" onClick={()=>{type=="text"?setType("password"):setType("text")}} />:<FaEye className="text-xl text-pink-500" onClick={()=>{type=="text"?setType("password"):setType("text")}} />} style={{"fontFamily":"lato"}} color="pink" />

     </div>
     
       
     {spin?<Spinner className="mx-auto" />:<Button type="submit" color="pink" className="mt-6 font-poppins" fullWidth>
         Send OTP
        </Button>}
     <Typography color="gray" className="mt-4 text-center font-poppins">
      Already have an account?{" "}
      <Link href={`${URL}/user/SignIn`} className="font-medium text-pink-500">
       Sign In
      </Link>
     </Typography>
    </form>)
   break;
 case "Google":
  value = (<Button
        key={idx}
        size="lg"
        variant="outlined"
        color="pink"
        className="flex items-center font-poppins gap-3 mt-6"
        onClick={() => {authSignIn(item.id, { callbackUrl: `${URL}/` })}} 
        type="submit">
        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
        Continue with Google
      </Button>)
 break;
 default:
 value = (<span key={idx}></span>)
 }
 return value;
})}
    
   </Card>
  </div>
</section>
 </>);
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
 const session = await getServerSession(context.req, context.res, NextAuth)

 // If the user is already logged in, redirect.
 // Note: Make sure not to redirect to the same page
 // To avoid an infinite loop!
 if (session) {
  return { redirect: { destination: "/" } }
 }
 const providers = await getProviders()

 return {
  props: { providers: providers ?? [] },
 }
}
