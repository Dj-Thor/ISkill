import type {
 GetServerSidePropsContext,
 InferGetServerSidePropsType,
} from "next"
import { getServerSession } from "next-auth/next"
import React from "react";
import Image from 'next/image'
import { Button, Rating, IconButton, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import LikeButton from "../components/LikeButton";
import WishList from "../components/Wishlist";
import dbConnect from "../modals/db";
import user from '../modals/user';
import course from '../modals/course';
import Carousel from "../components/Carousel"
import ShowByCategory from "../components/ShowByCategory"
import Head from 'next/head'



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






export default function Courses ({
 Data, android, web, dataScience, devops, machineLearning
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

 const [spin, setSpin] = React.useState(false);
 const spinOn = () => {
  setSpin(true);
  setTimeout(()=>{
   setSpin(false);
  },1000*20)
 }
React.useEffect(() => {
 
}, []);

 /* Use Next image tag */
 const CourseItem = ({courseDetails}: Prop) => {
 const {name, img, mentors, description, price, rating, likes, enrolledCount, courseId} = courseDetails;
  return (<>
   <Head>
  <title>ISkill | All Courses</title>
  <meta name="description" content="Explore a diverse range of top-level courses taught by experienced instructors. " />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <link rel="icon" href="/favicon.ico "/>
</Head>
   <div className="lg:w-1/3 sm:w-1/2 p-4 my-auto">
    <div className="flex relative w-full md:h-48">
     <Image alt="gallery" fill={true} className="absolute inset-0 w-full object-contain object-cover rounded-xl" src={img} />
     <div className="px-8 py-10 relative z-0 w-full border-4 border-gray-200 bg-gray-900 opacity-0 hover:opacity-100 transition duration-700 rounded-xl overflow-x-scroll">
      <Rating className="my-1" value={rating} readonly /> 
      <h2 className="tracking-widest text-lg font-poppins text-gray-50 mb-1 w-full text-bold">{name}</h2>
      <h3 className="title-font text-lg font-medium text-gray-50 mb-1">
       {mentors.map((e:string)=>{
        return e+" ";
       })}
      </h3>
      <h3 className="title-font text-sm font-medium text-gray-50 mb-1">
       <del>₹{price}</del> <span className="mx-1">Free</span>|<span className="mx-1">{likes}K+ Likes</span>|<span className="mx-1">{enrolledCount}K+ Enrolled</span>
      </h3>
      
     </div>
    </div>
    
    <h1 className="title-font text-xl font-medium text-pink-500 mb-3 mt-2 mx-3 text-bold">{name}</h1> 

 <div className="flex mx-1">
  <LikeButton course={courseId} />
  <WishList course={courseId}  />
  {/* Share button  */} 
  <button className="p-2 rounded-full bg-gray-100 mx-1" >

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500 text-bold">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>

 </button>
    </div>
 <div className="flex mb-3 mx-2">
  {spin?<Spinner className="mx-auto"/>:<Link href={`./course/${courseId}`} onClick={spinOn} className="rounded-full bg-pink-500 text-white font-poppins mt-4 px-6 py-3 text-sm mx-auto">
Enroll Now
</Link>}
 </div>
   </div>
  </>)
 }

 const CoursesContainer = () => {
 return (<>
  <div className="flex flex-wrap container gap-2 mx-auto md:gap-3 md:px-3 my-6 px-2">
    <h1 className="text-3xl md:text-5xl  font-medium px-3 title-font text-gray-900 w-full mb-6 md:text-center myColor ">All Courses</h1>
   {Data.map((item: Course, idx: number)=>{
      return <SubItem key={idx} courseDetails={item} />
     })}
    </div>
 </>)
 }
 const SubItem = ({courseDetails}: Prop) => {
 const {name, img, mentors, description, price, rating, likes, enrolledCount, courseId} = courseDetails;
  return (<>
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
  <LikeButton course={courseId} />
  <WishList course={courseId}  />
  
  <button className="p-2 rounded-full bg-gray-100 mx-1" >

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500 text-bold">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>

 </button>
    </div>
 <div className="flex mb-3 mx-2">
  <Link href={`./course/${courseId}`} className="rounded-full bg-pink-600 text-white font-poppins mt-4 px-4 py-2 text-xs mx-auto">
       Enroll Now
      </Link>
 </div>
   </div>
  </>)
 }

 

 return (<section className="text-gray-600 body-font min-h-screen">
   <div className="container px-5 py-16 mx-auto">
    <div className="flex flex-col text-center w-full mb-16 ">
     <h1 className=" text-3xl font-medium mb-4 myColor1 ">Explore Our Top Courses from our Top Mentors </h1>
     <p className="lg:w-2/3 mx-auto leading-relaxed text-black text-md">Explore our diverse range of courses designed to empower your learning journey. From foundational subjects to advanced specializations, our curriculum is crafted to meet the dynamic demands of today&apos;s industries.</p>
    </div>
    <div className="flex flex-wrap -m-4 ">
     {Data.map((item:Course, idx:number)=>{
      return <CourseItem key={idx} courseDetails={item} />
     })}
    </div>
   </div>
   <Carousel Data={Data}/>
   <ShowByCategory Data={Data} android={android} web={web} dataScience={dataScience} devops={devops} machineLearning={machineLearning}  />
   <CoursesContainer/>
   
  </section>)
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
 
 await dbConnect();
 
 let allCourses = await course.find({});
 let android = await course.find({category:"android"});
 let web = await course.find({category:"web"});
 let machineLearning = await course.find({category:"machineLearning"});
 let devops = await course.find({category:"devops"});
 let dataScience = await course.find({category:"dataScience"});
 
 return {
  props: { Data: JSON.parse(JSON.stringify(allCourses)) ?? [], android: JSON.parse(JSON.stringify(android)) ?? [], web: JSON.parse(JSON.stringify(web)) ?? [], machineLearning: JSON.parse(JSON.stringify(machineLearning)) ?? [], dataScience: JSON.parse(JSON.stringify(dataScience)) ?? [], devops: JSON.parse(JSON.stringify(devops)) ?? []}
}
}

/** /




*/