import type {
 GetServerSidePropsContext,
 InferGetServerSidePropsType,
} from "next"
import { getServerSession } from "next-auth/next"
import React from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, List, ListItem, Card, Avatar, Typography, Input, Button, ListItemSuffix, IconButton, Select, Option} from "@material-tailwind/react";
import { Square3Stack3DIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import {BsArrowRight} from "react-icons/bs";
import { BiArrowBack } from 'react-icons/bi';
import dbConnect from "../modals/db";
import user from '../modals/user';
import { useRouter } from "next/router";
import Image from 'next/image'
import { ToastContainer, toast, Slide, Flip } from 'react-toastify';
import {useSession, signOut} from "next-auth/react";
import NextAuth from "./api/auth/[...nextauth]";
import Head from 'next/head'

const Theme = {
 one: {
position: "top-center",
autoClose: 800,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
textColor:"green",
className: "font-poppins"
 },
 two: {
position: "top-center",
autoClose: 800,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins transition-all"
 }
}

type Session = {
 user: {
  email: string
 }
}| null;


type Course = {
 courseId: string,
 title: string,
 enrolledDate: string
} 

type Prop = {
 course: Course[],
 check: number
}


const URL = process.env["NEXT_PUBLIC_URL"];


export default function Profile({
 Data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
 const {name, gender, likedCourses, wishlistCourses, enrolledCourses, age, email, niche} = Data;
 const [subOpen, setSubOpen] = React.useState(0);
 const [update, setUpdate] = React.useState(false);
 const [profile, setProfile] = React.useState({name:name, gender: gender?gender:"male", age:age?age:""});

const router = useRouter();

React.useEffect(()=>{
 setProfile({name:name, gender: gender?gender:"male", age:age?age:""});
},[name, age, gender]);


const updateProfile = async (e:React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 let response = await fetch(`${URL}/api/updateProfile`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({token: "", info:profile}, null, 2)
   });
 const json = await response.json();
 setUpdate(false);
 if (json.success) {
  toast(json.msg,{
position: "top-center",
autoClose: 800,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins"
  });
  setTimeout(()=>{router.push(`${URL}/profile`)}, 1000);
 }
 else {
  toast(json.msg,{
position: "top-center",
autoClose: 800,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins transition-all"
  });
 }
}

 
const on_Change = (e: React.ChangeEvent<HTMLInputElement>) => {
  setProfile({ ... profile, [e.target.name]: e.target.value });
}

const selectOnChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
 const value = e.target.value;
 setProfile({ ... profile, ["gender"]: value });
}

const unEnroll = async (courseId:string) => {
 let response = await fetch(`${URL}/api/enroll`,{
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({query:"unenroll", courseId:courseId}, null, 2)
   });
 const json = await response.json();
 if (json.success){
  toast(json.msg,{
position: "top-center",
autoClose: 800,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins"
  });
  setTimeout(()=>{router.push(`${URL}/profile`)}, 1000);
 } else {
 toast(json.msg, {
position: "top-center",
autoClose: 800,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
className: "font-poppins transition-all"
 });
 }
}

 

const showCourses = (course:Course[], check:number) => {
 return check == 1 ? <div>{course.length > 0 ?course.map((item:Course, idx:number)=>{
    return <ListItem key={idx} className="flex flex-wrap border border-pink-100 mt-3 font-lato">
    <span className="text-sm w-full mb-1 mx-3 text-gray-600">Name</span>
    <span className="text-md w-full mx-3 text-pink-500 mb-3">{item.title}</span>
 <span className="text-sm w-full mb-1 mx-3 text-gray-600">Enroll Date</span>
    <span className="text-sm w-full mx-3 text-pink-500 mb-3 text-xs">{item.enrolledDate}</span>
    <Button onClick={()=>{unEnroll(item.courseId)}} className="mx-auto font-lato" size="sm" color="pink">Delete</Button>
   </ListItem>
   }): <div className="p-2 flex justify-center flex-wrap item-center">
    <Image
      src="/empty.jpg"
      width={500}
      height={500}
      alt="img"
    />
   <span className="text-xl mx-auto my-1">Nothing to Show</span>
   </div>}
  </div> : <div>{course.length > 0 ?course.map((item, idx)=>{
    return <ListItem key={idx} className="flex flex-wrap border border-pink-100 mt-3 font-lato">
    <span className="text-sm w-full mb-1 mx-3 text-gray-600">Name</span>
    <span className="text-md w-full mx-3 text-pink-500 mb-3">{item.title}</span>
    <Button className="mx-auto font-lato" size="sm" color="pink">open</Button>
   </ListItem>
   }):<div className="p-2 flex justify-center flex-wrap item-center">
    <Image
      src="/empty.jpg"
      width={500}
      height={500}
      alt="img"
    />
    <span className="text-xl mx-auto my-1">Nothing to Show</span>
   </div>}
  </div>
}

 
const ProfileBlock = (<Card className="w-full  lg:w-3/4 mx-auto min-h-[550px]">
 {update?<form onSubmit={updateProfile} className="my-6 mb-2 w-80 max-w-screen-lg sm:w-full px-4 mx-auto text-center">
  <BiArrowBack onClick={()=>{setUpdate(false)}} className="my-6 text-xl text-pink-500"/>
  <Avatar
   size="xl"
   alt="avatar"
   src={`${profile.gender=="female"?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17BIhNYsdfGT-wwBmNjX1AWUpG-nOQpG5Tg&usqp=CAU":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrosiN2os16x5XIw-iIJD4nnvncbm34qxcPw&usqp=CAU"}`}
   className="border border-pink-500 shadow-xl shadow-pink-900/20 ring-4 ring-pink-500/30 mx-auto my-1 mb-3 "
  />
<h5 className="text-lg font-lato w-full mx-auto text-pink-500">{name}</h5>
<h5 className="text-sm font-lato w-full mx-auto text-gray-400">{email}</h5>
      <div className="flex flex-col gap-1 mb-4 font-lato mr-4 my-8">
          <Input
           className="mb-0"
            label="Email"
            type="email"
            size="lg"
            name="email"
            value={email}
            color="pink"
            disabled
            />
        <span className="text-sm font-rajdhani text-left text-pink-500 px-2">
            Email can&apos;t be updated. Please Contact us for further query.
           </span>
         </div>
        <div className=" flex flex-col gap-6 mb-4  font-lato mr-4">
          <Input
            className=""
            label="Name"
            type="text"
            size="lg"
            name="name"
            value={profile.name}
            onChange={(e)=>{on_Change(e)}}
            color="pink" 
           style={{"fontFamily":"lato"}}
            />
         </div>

        <div className="flex flex-col gap-6 mb-4 font-lato mr-4">
          <Input
            label="Age"
            size="lg"
            name="age"
            type="number"
            value={profile.age}
            onChange={(e)=>{on_Change(e)}}
            color="pink" 
            style={{"fontFamily":"lato"}}
            />
         </div>
   <div className="flex flex-col font-lato gap-6 mb-4 mr-4">
       <select className="p-2 rounded-md font-lato text-pink-500 bg-white text-center" value={profile.gender} name="gender" onChange={selectOnChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
         </div>
   <Button type="submit" color="pink" variant="gradient" className="rounded-full my-6 w-40 mx-auto font-lato">
        Save
      </Button>
  </form>:<List className="px-4 my-6">
  <Avatar
   size="xl"
   alt="avatar"
   src={`${profile.gender=="female"?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17BIhNYsdfGT-wwBmNjX1AWUpG-nOQpG5Tg&usqp=CAU":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrosiN2os16x5XIw-iIJD4nnvncbm34qxcPw&usqp=CAU"}`}
   className="border border-pink-500 shadow-xl shadow-pink-900/20 ring-4 ring-pink-500/30 mx-auto my-3"
  />
  
   <ListItem className="flex flex-wrap border border-pink-50 mt-3 font-lato">
    <span className="text-sm w-full mb-1 mx-3 text-black">Name</span>
    <span className="text-md w-full mx-3 text-pink-500">{name}</span>
   </ListItem>
  
  <ListItem className="flex flex-wrap border border-pink-50 mt-3 font-lato">
    <span className="text-sm w-full mb-1 mx-3 text-black">Email</span>
    <span className="text-md w-full mx-3 text-pink-500">{email}</span>
   </ListItem>
  <ListItem className="flex flex-wrap border border-pink-50 mt-3 font-lato">
    <span className="text-sm w-full mb-1 mx-3 text-black">Age</span>
    <span className="text-md w-full mx-3 text-pink-500">{age?age+" yr":"Na"}</span>
   </ListItem>
  <ListItem className="flex flex-wrap border border-pink-50 mt-3 font-lato">
    <span className="text-sm w-full mb-1 mx-3 text-black">Gender</span>
    <span className="text-md w-full mx-3 text-pink-500">{gender?gender:"Na"}</span>
   </ListItem>
  <ListItem className="flex flex-wrap border border-pink-50 mt-3 font-lato">
    <span className="text-sm w-full mb-1 mx-3 text-black">Interest</span>
   <span className="text-sm w-full mx-3 text-pink-500">
    {niche.length > 0 ? niche.map((e:string, idx: number) => {
    return <span key={idx} className="mx-.5">{e+", "} </span>
    }): "Na"
    }
   </span>
   </ListItem>
  <Button onClick={()=>{setUpdate(true)}}  variant="gradient" color="pink" className="rounded-full mt-5 w-40 mx-auto font-lato">
        Update Profile
      </Button>
 </List>}
 
</Card>);

const SettingBlock = (<Card className="w-full lg:w-3/4 mx-auto p-2 min-h-[550px]">
 { (subOpen != 0) ? <List className="px-4 my-6">
  <BiArrowBack onClick={()=>{setSubOpen(0)}} className="mb-2 text-xl text-pink-500"/>


 {subOpen == 1 && showCourses(enrolledCourses, 1)}
 {subOpen == 2 && showCourses(wishlistCourses, 2)}
 {subOpen == 3 && showCourses(likedCourses, 3)}

 </List> :<List className="px-4 my-6">
<Avatar
   size="xl"
   alt="avatar"
   src={`${profile.gender=="female"?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17BIhNYsdfGT-wwBmNjX1AWUpG-nOQpG5Tg&usqp=CAU":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrosiN2os16x5XIw-iIJD4nnvncbm34qxcPw&usqp=CAU"}`}
   className="border border-pink-500 shadow-xl shadow-pink-900/20 ring-4 ring-pink-500/30 mx-auto my-3"
  />
  <h5 className="text-lg text-center font-lato w-full text-center text-pink-500">{name}</h5>
<h5 className="text-sm text-center font-lato w-full  text-gray-900">{email}</h5>
<ListItem onClick={()=>{setSubOpen(1)}} ripple={false} className="py-1 pr-1 pl-4 border border-pink-100 text-pink-500 font-lato mt-4">
          Enrolled Courses
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
             <BsArrowRight className="text-xl text-pink-500"/>
            </IconButton>
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={()=>{setSubOpen(2)}} ripple={false} className="py-1 pr-1 pl-4 border font-lato text-pink-500 border-pink-100 mt-3">
          WishList Courses
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
           <BsArrowRight className="text-xl text-pink-500"/>
            </IconButton>
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={()=>{setSubOpen(3)}} ripple={false} className="py-1 pr-1 pl-4 border font-lato text-pink-500 border-pink-100 mt-3">
          Liked Courses
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
            <BsArrowRight className="text-xl text-pink-500"/>
            </IconButton>
          </ListItemSuffix>
        </ListItem>
       <ListItem onClick={() => {signOut({ redirect: false }).then(() => { router.push(`${URL}/user/Forgot`)})}} ripple={false} className="py-1 pr-1 pl-4 border text-pink-500 border-pink-100 font-lato mt-3">
          Change Password
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
            <BsArrowRight className="text-xl text-pink-500"/>
            </IconButton>
          </ListItemSuffix>
        </ListItem>
       <ListItem onClick={() => {signOut({ redirect: false }).then(() => { router.push("/") })}} ripple={false} className="py-1 pr-1 pl-4 border text-red-500 border-red-500 font-lato mt-3">
          Logout
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
            <BsArrowRight className="text-xl text-red-500"/>
            </IconButton>
          </ListItemSuffix>
        </ListItem>
      </List>}
    </Card>);

const data = [
 {
   label: "Profile",
   value: "profile",
   icon: UserCircleIcon,
   desc: ProfileBlock,
  },
  {
   label: "Settings",
   value: "settings",
   icon: Cog6ToothIcon,
   desc: SettingBlock,
  },
 ];
 
 return (<>
  <ToastContainer
   position="top-center"
   autoClose={800}
   hideProgressBar={false}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   limit={3}
   pauseOnFocusLoss
   draggable
   pauseOnHover
   theme="dark"
   transition={Slide}
  />
  <Head>
  <title>ISkill | Profile</title>
  <meta name="description" content="User profile Page" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <link rel="icon" href="/favicon.ico "/>
</Head>
 <section className="min-h-screen">
  <Tabs className="m-2 mt-8 lg:w-3/4 mx-auto px-3" value="profile">
   <TabsHeader className="bg-pink-500 ">
    {data.map(({ label, value, icon }) => (
     <Tab className="" activeClassName="text-pink-500" key={value} value={value}>
      <div className="flex items-center gap-2 font-poppins " >
       {React.createElement(icon, { className: "w-5 h-5 " })}
       {label}
      </div>
     </Tab>
    ))}
   </TabsHeader>
   <TabsBody>
    {data.map(({ value, desc }) => (
     <TabPanel className="" key={value} value={value}>
      {desc}
     </TabPanel>
    ))}
   </TabsBody>
  </Tabs>
 </section>
 </> );
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

 let userDetails = await user.findOne({
  email: session.user.email
  }, "-password");

 return {
  props: { Data: JSON.parse(JSON.stringify(userDetails)) ?? [] },
 }
}

/*


*/