
import type {
 GetServerSidePropsContext,
 InferGetServerSidePropsType,
} from "next"
import { getServerSession } from "next-auth/next"
import dbConnect from "../modals/db";
import user from '../modals/user';
import course from '../modals/course';
import Image from "next/image"
import { Button } from "@material-tailwind/react";
import Link from "next/link"
import LikeButton from "../components/LikeButton";
import WishList from "../components/Wishlist";
import { FaPlay } from "react-icons/fa";
import NextAuth from "./api/auth/[...nextauth]";
import Head from 'next/head'


type Session = {
 user: {
  email: string
 }
}| null;


type Course = {
 name : string,
 courseId : string,
 price:  number,
 description: string,
 mentors: [],
 playlistId:string,
 img: string,
 rating: number,
 comments: [],
 enrolledCount: number,
 isVideo: boolean,
 likes: number,
}

type Prop = {
 courseDetails: Course
}

type Item = {
 courseId: string
}


export default function Enrolled ({
 Data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
 
 const SubItem = ({courseDetails}: Prop) => {
 const {name, img, mentors, description, price, rating, likes, enrolledCount, courseId} = courseDetails;
  return (<>
   <Head>
  <title>ISkill | Enrolled Courses</title>
  <meta name="description" content="This page contains all the courses in which the user is enrolled" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <link rel="icon" href="/favicon.ico "/>
</Head>
   <div className="md:w-[24%] w-[48%] p-1.5 my-auto  rounded">
    <div className="flex relative w-full h-24 md:h-32 ">
     <Image alt="gallery" height={100} width={100} className="absolute w-full inset-0 object-contai object-cover hover:hidden  rounded-xl" src={img} />
     <div className="absolute z-1 h-full p-4 bg-gray-900 opacity-0  hover:opacity-100 transition duration-700 rounded-xl overflow-y-scroll  text-sm md:text-md mx-auto">
      
      
      <h3 className="title-font  font-medium text-gray-50 mb-1">
       {mentors.map((e:string)=>{
        return e+" ";
       })}
      </h3>
      <h3 className="title-font  font-medium text-gray-50 text-xs md:text-md mb-1">
       <del>₹{price}</del> <span className="mx-1">Free</span>|<span className="mx-1">{likes}K+ Likes</span>|<span className="mx-1">{enrolledCount}K+ Enrolled</span>
      </h3>
      
     </div>
    </div>
    
    <h1 className="title-font md:text-lg text-xs font-medium myColor1 mb-3 mt-2 mx-3 line-clamp-2 text-bold">{name}</h1> 

 <div className="flex mx-1">
  <LikeButton  course={courseId} />
  <WishList course={courseId}  />
  
  <button className="p-2 rounded-full bg-gray-100 mx-1" >

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500 text-bold">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>

 </button>
    </div>
 <div className="flex mb-3 mx-2">
  <Link href={`./playlist/${courseId}`} className="rounded-full bg-pink-600 text-white font-poppins mt-4 px-4 py-2 text-xs mx-auto">
   <FaPlay className="m-1 inline text-lg" />    Play Now
      </Link>
 </div>
   </div>
  </>)
 }

 return ( <section className="min-h-screen">
 <div className="flex flex-wrap container gap-2 mx-auto md:gap-3 md:px-3 my-6 px-2">
    <h1 className="text-3xl md:text-5xl  font-medium px-3 title-font text-gray-900 w-full mb-3 md:text-center myColor ">Enrolled Courses</h1>
  <span className="text-sm myColor px-3 font-poppins md:text-center mb-6 w-full">
  You can add or remove courses from profile
 </span>
  { Data.length>0?Data.map((item:Course, idx:number)=>{
    return  <SubItem key={idx} courseDetails={item} />
  }): <div className="container mx-auto p-8 w-full justify-center flex flex-wrap md:w-3/4">
        <h1 className="text-4xl font-extrabold text-center text-pink-500  mb-6">Nothing To Show</h1>
       
      <Image
      src="/empty.jpg"
      width={300}
      height={300}
      alt="img"
    />
      
  <h1 className="text-3xl font-extrabold text-center text-pink-500  mb-6">Currently, You are not Enrolled in any course.</h1>
      
    </div>
  }
  

 </div>
 </section>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const URL = process.env['NEXT_PUBLIC_URL'];
  const session: Session = await getServerSession(context.req, context.res, NextAuth);

 if (!session) return {
   redirect : {
     permanent: false,
     destination: `${URL}/user/SignIn`
   }
 }
 
 await dbConnect();
 
 let User = await user.findOne({email:session.user.email});
 let allCourses: Course[] = [];
 for await (const doc of course.find()) {
 User.enrolledCourses.filter((item:Item) => {
  if (doc.courseId == item.courseId) allCourses.push(doc);
 });
 }

  
 return {
  props: { Data: JSON.parse(JSON.stringify(allCourses)) ?? [] },
 }
} 