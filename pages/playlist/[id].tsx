import type {
 GetServerSidePropsContext,
 InferGetServerSidePropsType,
} from "next"
import { getServerSession } from "next-auth/next"
import dbConnect from "../../modals/db";
import user from '../../modals/user';
import course from '../../modals/course';
import Player from "../../components/Player";
import Videolist from "../../components/VideoList";
import React from "react";
import {Accordion, AccordionHeader, AccordionBody, Rating, Avatar, Button, Textarea} from "@material-tailwind/react";
 import LikeButton from "../../components/LikeButton";
import WishList from "../../components/Wishlist";
import { ToastContainer, toast, Slide } from 'react-toastify';
import NextAuth from "../api/auth/[...nextauth]";
import Head from 'next/head'

type Repo = {
  name: string
  stargazers_count: number
}
const URL = process.env["NEXT_PUBLIC_URL"];


type Session = {
 user: {
  email: string
 }
}| null;



type icon = {
 id: number,
 open: number,
}

type subItem = {
 courseId: string
}

type playListItem = {
  resourceId: {
  videoId: string
  }
 thumbnails: {
  default: {
   url: string
  }
 },
 title:string
}

type playListInfoItem = {
 snippet: playListItem
}


export default function PlaylistPage ({
 Data, isVideo, currentVideo, playList
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

const {name, img, price, likes, rating, enrolledCount, description, courseId} = Data;
 
const [current, setCurrent] = React.useState(currentVideo);

const [open1, setOpen1] = React.useState(1);
const [open2, setOpen2] = React.useState(1);
  
const handleOpen1 = (value: number) => setOpen1(open1 === value ? 0 : value);

const handleOpen2 = (value: number) => setOpen2(open2 === value ? 0 : value);

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


function Icon({ id, open }: icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform text-pink-500`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
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
  <title>ISkill | Playing Course</title>
  <meta name="description" content="Page for playing Enrolled Course" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <link rel="icon" href="/favicon.ico "/>
</Head>
  <section className="min-h-screen">
   <h1 className="myColor1 text-3xl title-font font-medium mb-2 mt-12 w-full px-4 md:w-3/4 mx-auto">{name}</h1>
     <Player id={current}/>
   { isVideo && <Videolist setCurrent={setCurrent} playList={playList} nowPlaying={current}/> }
   
    <div className="m-4  lg:w-3/4 lg:mx-auto">
<Accordion open={open1 === 1}  icon={<Icon id={1} open={open1} />} >
        <AccordionHeader className=" font-lato myColor1 text-2xl" onClick={() => handleOpen1(1)}>Course Info</AccordionHeader>  
      <AccordionBody className=" transition transition-600 ease-in-out text-sm font-poppins">
  <div className="lg:w-4/5 mx-auto flex flex-wrap ">
      <img
      className="mb-6 mt-6 w-[90%] mx-auto md:w-full rounded-lg object-contain object-center"
      src={img}
      alt="image"
    />
      <div className="w-full lg:pl-10 lg:py-6 md:mt-6 pt-2 lg:mt-0 px-5 ">
        <h2 className="text-sm title-font text-gray-500 tracking-widest text-pink-500">COURSE NAME</h2>
        <h1 className="myColor text-3xl title-font font-medium mb-1">{name}</h1>
       <div className="flex mb-2">
    
         <del className="flex text-xl items-center my-1 mr-2">
          ₹{price}
         </del>
         <span className="flex text-xl items-center my-1">
          Free
         </span>
         
        </div> 
       <div className="flex mb-2">
         <span className="flex items-center mr-1.5 my-1">
          {likes}K+ Likes | 
         </span>
         <span className="flex items-center my-1">
          {enrolledCount}K+ Enrolls  
         </span>
         
         
        </div> 
        <div className="flex mb-2">
         <span className="flex items-center my-1">
           <LikeButton course={courseId}/>
         </span>
         <span className="flex items-center my-1">
           <WishList course={courseId}/>
         </span>
         <Rating className="my-1 ms-3" value={rating} readonly />
         
        </div> 
 
        <p className="leading-relaxed">{description}</p>
        
         
      </div>
    </div>
       
     </AccordionBody>
  </Accordion>

 <Accordion open={open2 === 1} icon={<Icon id={1} open={open2}/>}>
        <AccordionHeader className="font-lato myColor1 text-2xl" onClick={() => handleOpen2(1)}>Comments</AccordionHeader>  
      <AccordionBody className=" transition transition-600 ease-in-out text-sm font-poppins">

  <div className="relative md:w-[50rem] w-full p-4  font-lato mx-auto mt-3 rounded">
   <h3 className="text-xl my-1 font-poppins text-pink-600">Share your thoughts about this course</h3>
   <h3>Add a public comment</h3>
      <Textarea variant="static" placeholder="Your Comment" color="pink" name="textArea" value={comment.textArea}
onChange={commentOnChange} rows={1} />
      <div className="flex w-full justify-between py-1.5">
        
        <div className="flex gap-2">
          <Button onClick={addComment} color="pink" size="sm" className="rounded-md font-lato">
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  <div className="relative md:w-[50rem] w-full p-4 font-lato mt-2 mx-auto">
  <h3 className="my-1 text-xl text-pink-600">Comments</h3>
 <div className="overflow-x-scroll h-[40rem]  my-2 rounded p-1">
  {
   comments.map((item:string, idx:number) => {
   return <div className="my-6 border rounded-lg p-2" key={idx}>
   <Avatar className="my-3 ms-2" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" /><span className="ms-2">Anonymous User</span>
   <p className="p-6 text-sm bg-pink-400 rounded-lg text-white">{item}</p>
  </div>
  
  })
  }
  </div>
 </div>
       
     </AccordionBody>
  </Accordion>
</div>
  </section>
   </>)
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
 
const URL = process.env['NEXT_PUBLIC_URL'];
  const session:Session = await getServerSession(context.req, context.res, NextAuth);

 if (!session) return {
   redirect : {
     permanent: false,
     destination: `${URL}/user/SignIn`
   }
 }
 
try {
 const apiKey = process.env['YTAPIKEY'];
 await dbConnect();
 const courseId = context.query.id;
 const courseInfo = await course.findOne({courseId:courseId});
 let User = await user.findOne({email:session.user.email});

 
 
 
 if (!courseInfo) return {
  redirect : {
     permanent: false,
     destination: `${URL}/`
  }
 }

const idx = User.enrolledCourses.findIndex((item:subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx == -1) return {
  redirect : {
     permanent: false,
     destination: `${URL}/`
  }
 }
 
 

 if (courseInfo.isVideo) {
  
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${courseInfo.playlistId}&key=${apiKey}`);
  const json = await response.json();
  const videoInfo = json.items[0];
  if (!videoInfo) throw new Error("Not Found");
  return {
  props: { Data: JSON.parse(JSON.stringify(courseInfo)) ?? [], isVideo: !courseInfo.isVideo, currentVideo:videoInfo.id, playList:[]},
  }
 }
 else {
  const videoCount = 20; //to be changed as per use
 const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${videoCount}&playlistId=${courseInfo.playlistId}&key=${apiKey}`);
  const playListInfo = await response.json();
  if (!playListInfo) throw new Error("Not Found");
  const playList: playListItem[] = [];
 playListInfo.items.forEach((item:playListInfoItem) => {
  playList.push(item.snippet);
  });

 return {
  props: { Data: JSON.parse(JSON.stringify(courseInfo)) ?? [], isVideo: !courseInfo.isVideo, currentVideo:playList[0].resourceId.videoId,playList: playList
   }
 }
}
 
}
catch (err) {
 return {
  props: { Data: [], isVideo: true, playList: [], currentVideo:""},
 }
}
  
 
} 

