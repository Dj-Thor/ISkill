import React from "react";
import { ToastContainer, toast, Slide, Flip } from 'react-toastify';
import {useSession, signOut} from "next-auth/react";


type Props = {
 userEmail?: string,
 course: string,
 Liked?: boolean
}

const URL = process.env['NEXT_PUBLIC_URL'];



export default function WishList(Data:Props){
const {course} = Data;
const [isLiked, setIsLiked] = React.useState(false);

const { data: session, status } = useSession();
const [user, setUser] = React.useState(false);
 
 React.useEffect(()=>{
  if (status == "authenticated") setUser(true);
  else setUser(false);
 },[status]);

React.useEffect(() => {
 if (user) setIsLiked(true);
 else setIsLiked(false);
},[user])
 
const fetchDetail = async () => {
 let response = await fetch(`${URL}/api/enroll`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({token:"token", courseId: course, query:"checkwishlist"}, null, 2)
 });
 const json = await response.json();
 if (json.success) setIsLiked(true);
 else setIsLiked(false);
}

const addToLiked = async () => {
 if (!user) toast("Please Login",{
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
 if (!user || isLiked) return;
 setIsLiked(false);
 /*
 let response = await fetch(`${URL}/api/enroll`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({token:"token", courseId: course, query:"wishlist"}, null, 2)
 })
 const json = await response.json();
 if (json.success) {
  setIsLiked(true);
 } */
};

const removeFromLiked = async () => {
 if (!user || !isLiked) return;
 setIsLiked(false);
 /*let response = await fetch(`${URL}/api/enroll`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({token:"token", courseId: course, query:"unwishlist"}, null, 2)
 })
 const json = await response.json();
 if (json.success) {
  setIsLiked(false);
 } */
};

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
   transition={Flip}
  />
    {isLiked?<button className="p-2 rounded-full bg-red-100 animate-[ping_.3s_linear_.1s] mx-1" onClick={() => removeFromLiked()}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>


     
    </button>:<button className="border p-2 rounded-full bg-gray-50 mx-1" onClick={() => addToLiked()}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>



    </button>}
   </>)
}
