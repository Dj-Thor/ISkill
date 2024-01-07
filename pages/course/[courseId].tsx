import type {
 GetServerSidePropsContext,
 InferGetServerSidePropsType,
} from "next"
import { getServerSession } from "next-auth/next";
import dbConnect from "../../modals/db";
import user from '../../modals/user';
import course from '../../modals/course';
import React from "react";
import Image from 'next/image'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Button, Rating, IconButton, Textarea, Avatar } from "@material-tailwind/react";
import { Square3Stack3DIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import LikeButton from "../../components/LikeButton";
import WishList from "../../components/Wishlist"
import { useRouter } from "next/router";
import { ToastContainer, toast, Slide } from 'react-toastify';
import NextAuth from "../api/auth/[...nextauth]";
import Head from 'next/head'

const URL = process.env["NEXT_PUBLIC_URL"];

type subItem = {
 courseId: string
}
type Session = {
 user: {
  email: string
 }
}| null;

export default function Course ({
 Data, isEnrolled
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

const router = useRouter();

const {name, img, price, likes, rating, enrolledCount, description, courseId} = Data;

const [comment, setComment] = React.useState({textArea:""});
const [comments, setComments] = React.useState(Data.comments.reverse());
const commentOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
 setComment({...comment, [e.target.name]:[e.target.value]});
 }
const addComment = async () => {
 let response = await fetch(`${URL}/api/addComment`,{
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({comment:comment.textArea, courseId:courseId}, null, 2)
   });
 const json = await response.json();
 
 if (json.success){
  toast(json.msg,{
position: "top-center",
autoClose: 1000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins"
 });
  setComments(json.updated.comments.reverse());
 } else {
  toast(json.msg,{
position: "top-center",
autoClose: 1000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins"
  });
 }
 setComment({textArea:""});
 }
 
const addToEnroll = async () => {
 let response = await fetch(`${URL}/api/enroll`,{
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({query:"enroll", courseId:courseId}, null, 2)
   });
 const json = await response.json();

 if (json.success){
  toast(json.msg,{
position: "top-center",
autoClose: 1000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins"
 });
  setTimeout(()=>{router.push("../enrolled")}, 1000);
 } else {
  toast(json.msg,{
position: "top-center",
autoClose: 1000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins"
  });
 }
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
  <title>ISkill | Course Details</title>
  <meta name="description" content="Information about specific course " />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <link rel="icon" href="/favicon.ico "/>
</Head>
 <section className="text-gray-600 body-font overflow-hidden min-h-screen">
  <div className="container md:px-5 md:py-6 mx-auto bg-gray-50">
    <div className="lg:w-4/5 mx-auto flex flex-wrap ">
      <img
      className="mb-6 mt-6 w-[90%] mx-auto md:w-full rounded-lg object-contain object-center"
      src={img}
      alt="image"
    />
      <div className="w-full lg:pl-10 lg:py-6 md:mt-6 pt-2 lg:mt-0 px-5 bg-gray-50">
        <h2 className="text-sm title-font myColor1 tracking-widest">COURSE NAME</h2>
        <h1 className="text-3xl myColor1 title-font font-medium mb-1">{name}</h1>
       <div className="flex mb-2">
    
         <del className="flex text-xl items-center my-1 mr-2 text-red-400">
          ₹{price}
         </del>
         <span className="flex text-xl items-center text-green-500 my-1">
          Free
         </span>
         
        </div> 
       <div className="flex mb-2">
         <span className="flex items-center mr-1.5 my-1 text-pink-500">
          {likes}K+ Likes | 
         </span>
         <span className="flex items-center my-1 text-pink-500">
          {enrolledCount}K+ Enrolls  
         </span>
         
         
        </div> 
        <div className="flex mb-2">
         <span className="flex items-center my-1">
           <LikeButton course={courseId}/>
         </span>
         <span className="flex items-center my-1">
           <WishList  course={courseId}/>
         </span>
         <Rating className="my-1 ms-3" value={rating} readonly />
         
        </div> 
 
        <p className="leading-relaxed">{description}</p>
        
          
        <div className="flex">
          
  {!isEnrolled?<Button onClick={addToEnroll} className="my-3 mt-6 font-lato text-md" fullWidth color="pink">Enroll Now</Button>:<Button onClick={()=>{router.push("../enrolled")}} className="my-3 mt-6 font-lato text-md" color="pink" fullWidth>Watch Now</Button>
   }
        </div>
      </div>
    </div>
  </div>
  <div className="relative md:w-[50rem] w-full p-4 bg-gray-50 font-lato mx-auto mt-3 rounded">
   <h3 className="text-xl my-1 font-poppins text-pink-400">Share your thoughts about this course</h3>
   <h3 className=" my-1 font-poppins text-pink-400">Add a public comment</h3>
      <Textarea variant="static" placeholder="Your Comment" name="textArea" value={comment.textArea}
onChange={commentOnChange} rows={1} />
      <div className="flex w-full justify-between py-1.5">
        
        <div className="flex gap-2">
          <Button onClick={addComment} size="sm" className="rounded-md font-lato" color="pink">
            Add Comment
          </Button>
        </div>
      </div>
    </div>
 <div className="relative md:w-[50rem] w-full p-4 font-lato mt-2 mb-4 mx-auto">
  <h3 className="my-1 text-pink-500">Comments</h3>
 <div className="overflow-x-scroll h-[40rem]  my-2 rounded p-1">
  {
   comments.map((item:string, idx:number) => {
   return <div className="my-6 border rounded-lg p-2 border-pink-100" key={idx}>
   <Avatar className="my-3 ms-2" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" /><span className="ms-2 text-pink-500">Anonymous User</span>
   <p className="p-6 text-sm bg-pink-400 text-white rounded-lg">{item}</p>
  </div>
  
  })
  }
  </div>
 </div>
 
</section>

  </>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
 
 await dbConnect();
 const URL = process.env['NEXT_PUBLIC_URL'];
  const session:Session = await getServerSession(context.req, context.res, NextAuth);


 let courseid = context.query.courseId;
 if (!courseid) courseid = "1699803155283";
 let allCourse = await course.find({courseId:courseid});

 let isEnrolled = false;
 if (session) {
  const User = await user.findOne({email:session.user.email});
  const idx = User.enrolledCourses.findIndex((item:subItem) => {
  if (item.courseId == courseid) return true;
 });
 isEnrolled = idx>0?true:false;
 }
 
 
 
 
 
 
 
 return {
  props: {Data: JSON.parse(JSON.stringify(allCourse[0])) ?? [], isEnrolled: isEnrolled},
 }
} 