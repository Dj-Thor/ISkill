import React from "react";
import { Button, Rating, IconButton, Avatar, Typography, Input, Checkbox, Textarea, Spinner} from "@material-tailwind/react";
import Image from "next/image"
import { MdEmail, MdOutlineDriveFileRenameOutline, MdOutlinePassword} from "react-icons/md";
import { ToastContainer, toast, Slide } from 'react-toastify';
import Head from 'next/head'

const Contact = () => {
 const URL = process.env['NEXT_PUBLIC_URL'];
const [field, setField] = React.useState({ email: "", name: "", message: ""});
const [spin, setSpin] = React.useState(false);


 const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setField({ ...field, [e.target.name]: e.target.value })
 }

 const textAreaOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
  setField({ ...field, [e.target.name]: e.target.value })
 }

const sendQuery = async (e:React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 const myPromise = new Promise(async (resolve, reject) => {
   setSpin(true)
   let response = await fetch(`${URL}/api/contact`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: field.email, name: field.name, message: field.message}, null, 2)
   });
   const json = await response.json();
   if (json.success) {
    resolve(json.msg);
    setSpin(false);
    setField({email: "", name: "", message: ""});
   }
   else {
    reject(json.msg);
    setSpin(false);
   }
  });

  const res = await toast.promise(myPromise,
   {
    pending: 'Please Wait',
    success: "Query Send Successfully",
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
  <title>ISkill | Contact Us</title>
  <meta name="description" content="Contact us or share your feedback we are always ready to help or listen" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <link rel="icon" href="/favicon.ico "/>
</Head>
  <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-extrabold myColor1 text-center mb-2">Got a Query</h1>
       <h1 className="text-5xl font-extrabold myColor1 text-center mb-6">Contact Us</h1>
        <p className="text-gray-600 text-center leading-7 md:w-3/4 mx-auto  mb-6">
          We really like to talk about what you need or whether you have a suggestion or your world like say something else, Contact Us
        </p>

        <div className="mt-10">
          <form onSubmit={sendQuery} className="mt-8 mb-2 md:w-96 mx-auto w-full" >
        <div className="mb-4 flex flex-col gap-6">
       <Image src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-3483601-2912018.png"
      width={500}
      height={500}
      alt="Picture of the author"
      className="mx-auto"
    />
         <Input type="text" size="lg" label="Name" name="name" required value={field.name} onChange={onChange} icon={<MdOutlineDriveFileRenameOutline className="text-xl text-pink-500" />} color="pink" style={{"fontFamily":"lato"}}/>
        </div>
        <div className="mb-4 flex flex-col gap-6">
         <Input type="text" size="lg" label="Email" name="email" value={field.email} required  onChange={onChange} icon={<MdEmail className="text-xl text-pink-500" />} color="pink" style={{"fontFamily":"lato"}}/>
        </div>
        <div className="mb-4 flex flex-col gap-6">
         <Textarea variant="outlined" label="Message" name="message" value={field.message} color="pink" onChange={textAreaOnChange}  required style={{"fontFamily":"lato"}} />
        </div>
        <Checkbox
         label={
          <Typography
           variant="small"
           color="pink"
           className="flex items-center font-poppins text-xs"
          >
           I agree to share email only for
           query purpose.
      
          </Typography>
         }
         containerProps={{ className: "-ml-1.5 text-pink-500 text-sm" }}
         color="pink"
         required
        />
        {spin?<Spinner className="mx-auto" />:<Button type="submit" color="pink" className="mt-6 font-poppins" fullWidth>
         Send Query
        </Button>}
       </form>
        
        </div>

        <div className="mt-10 mx-auto md:w-3/4 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 myColor1">Contact Us</h2>
          <p className="text-gray-600 leading-7">
            If your any complaint or any copyright issues you can reach us through the details shown below.
          </p>
          <ul className="list-disc pl-6 mt-3 text-gray-600 text-sm">
            <li>Email: imthakursatyam@gmail.com</li>
            <li>Phone: +91 9528679086</li>
          </ul>
        </div>
      </div>
  </section>

 </>)
}


export default Contact;