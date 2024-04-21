import React from "react";
import { ToastContainer, toast, Slide, Flip } from "react-toastify";
import { useSession, signOut } from "next-auth/react";

type Props = {
  userEmail?: string;
  course: string;
  Liked?: boolean;
};
const URL = process.env["NEXT_PUBLIC_URL"];

export default function LikeButton(Data: Props) {
  //const { data: session, status } = useSession();
  //const [user, setUser] = React.useState(false);
  /*
 React.useEffect(()=>{
  if (status == "authenticated") setUser(true);
  else setUser(false);
 },[status]);
 */
  const { course } = Data;
  const [isLiked, setIsLiked] = React.useState(false);
  /*
const fetchDetail = async () => {
 // no use 
 let response = await fetch(`${URL}/api/enroll`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({courseId: course, query:"checkliked"}, null, 2)
 });
 const json = await response.json();
 if (json.success) setIsLiked(true);
 else setIsLiked(false);
};

const checkLiked = async () => {

 if (!likedCourses)  {
  setIsLiked(false);
  return
 }
 const parsed = await JSON.parse(likedCourses);
 if (parsed.length == 0)  {
  setIsLiked(false);
  return;
 }
 let flag = parsed.contains(course);
 if (flag) setIsLiked(true);
 else setIsLiked(false);
} */

  /*
React.useEffect(() => {
 if (user) checkLiked();
 else setIsLiked(false);
},[user])
*/
  const addToLiked = async () => {
    if (isLiked) return;
    setIsLiked(true);
    /*
 if (!user) toast("Please Login", {
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
 else {
 const item = localStorage.getItem("Liked");
 if (!item) {
  let ar = [];
  ar.push(course);
  const value = JSON.stringify(ar);
  localStorage.setItem("Liked",value);
 } else {
  const likedCourses = JSON.parse(item);
  likedCourses.add(course); 
  const value = JSON.stringify(likedCourses);
  localStorage.setItem("Liked",value);
  }
  setIsLiked(true);
 }
 return;
 /*let response = await fetch(`${URL}/api/enroll`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ courseId: course, query:"like"}, null, 2)
 })
 const json = await response.json();
 if (json.success) {
  setIsLiked(true);
 } */
  };

  const removeFromLiked = () => {
    if (!isLiked) return;
    setIsLiked(false);
    /*
 if (!user || !isLiked) return;
 else { 
  const item = localStorage.getItem("Liked");
  if (!item) {
   setIsLiked(false);
 } 
  else {
  const likedCourses = JSON.parse(item);
  const idx = likedCourses.findIndex((item:string) => {
  if (item == course) return true;
  });
  if (idx != -1) {
   likedCourses.splice(idx,1);
   const value = JSON.stringify(likedCourses);
   likedCourses.setItem("Liked",value);
 }
 }
  setIsLiked(false)
 } 
 return;
 /*let response = await fetch(`${URL}/api/enroll`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({token:"token", courseId: course, query:"unlike"}, null, 2)
 })
 const json = await response.json();
 if (json.success) {
  setIsLiked(false);
 } */
  };

  return (
    <>
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
      {isLiked ? (
        <button
          className="p-2 rounded-full bg-blue-100 animate-[ping_.3s_linear_.1s] mx-1"
          onClick={() => removeFromLiked()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </button>
      ) : (
        <button
          className="border p-2 rounded-full bg-gray-50 mx-1"
          onClick={() => addToLiked()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </button>
      )}
    </>
  );
}
