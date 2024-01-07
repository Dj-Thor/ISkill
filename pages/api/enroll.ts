import dbConnect from "../../modals/db";
import NextCors from 'nextjs-cors';
import type { NextApiRequest, NextApiResponse } from 'next'
import course from '../../modals/course';
import user from '../../modals/user';
import { getToken } from "next-auth/jwt"



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

type response = {
 error?: string,
 msg?: string,
 success: boolean
}

type propData = {
 email: string,
 courseId: string,
 courseDetail: Course
}

type subItem = {
 courseId: string
}

const checkLiked = async (Data: propData) => {
 const {email, courseId} = Data;
 const User = await user.findOne({email: email});
 if (!User) throw "Some Error Occurred ";
 let isLiked = false;
 const idx = User.likedCourses.findIndex((item: subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx != -1) isLiked=true;
 if (isLiked) return {msg: "Liked", success: true};
 else return {msg: "Not Liked", success: false};
 
}

const checkWishlist = async (Data: propData) => {
 const {email, courseId} = Data;
 const User = await user.findOne({email: email});
 if (!User) throw "Some Error Occurred ";
 let isLiked = false;
  const idx = User.wishlistCourses.findIndex((item:subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx != -1) isLiked = true;
 if (isLiked) return {msg: "Wishlisted", success: true};
 else return {msg: "Not Wishlisted", success: false};
 
}

const findCourse = async (courseId: string) => {
 const detail = await course.findOne({courseId:courseId});
 return detail;
}

const addToEnroll = async (Data: propData) => {
 const {email, courseId, courseDetail} = Data;
 
 const User = await user.findOne({email: email});
 if (!User) throw "Some Error Occurred ";
 
 const idx = User.enrolledCourses.findIndex((item:subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx != -1) throw "Already Enrolled";
 
 const date = new Date();
User.enrolledCourses.push({title:courseDetail.name, enrolledDate:date.toString(), courseId:courseId});
 
 await user.findOneAndUpdate({email:email}, User);

 courseDetail.enrolledCount = courseDetail.enrolledCount + 1;
 
 await course.findOneAndUpdate({courseId:courseId}, courseDetail);
 
 return {msg: "Added To Enrolled Courses", success: true};

}

const removeFromEnroll = async (Data: propData)=> {
 const {email, courseId, courseDetail} = Data;

 const User = await user.findOne({email: email});
 if (!User) throw "Some Error Occurred";
 
 const idx = User.enrolledCourses.findIndex((item:subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx == -1) throw "Course Not Found";

 User.enrolledCourses.splice(idx,1);
 
 await user.findOneAndUpdate({email:email}, User);
 
 if (courseDetail && courseDetail.enrolledCount > 0) courseDetail.enrolledCount = courseDetail.enrolledCount - 1;

 await course.findOneAndUpdate({courseId:courseId}, courseDetail);
 
 
 return {msg: "Remove From Enrolled Courses", success: true};


}

const addToLike = async (Data: propData) => {
 const {email, courseId, courseDetail} = Data;
 
 const User = await user.findOne({email: email});
 if (!User) throw "Some Error Occurred ";
 
 const idx = User.likedCourses.findIndex((item:subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx != -1) throw "Already Liked";
 
 User.likedCourses.push({title:courseDetail.name, courseId:courseId});
 
 await user.findOneAndUpdate({email:email}, User);

 courseDetail.likes = courseDetail.likes + 1;
 
 await course.findOneAndUpdate({courseId:courseId}, courseDetail);
 
 return {msg: "Added To Liked", success: true};
}

const removeFromLike = async (Data: propData) => {
 const {email, courseId, courseDetail} = Data;

 const User = await user.findOne({email: email});
 if (!User) throw "Some Error Occurred";
 
 const idx = User.likedCourses.findIndex((item:subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx == -1) throw "Course Not Found";

 User.likedCourses.splice(idx,1);
 
 await user.findOneAndUpdate({email:email}, User);
 
 if (courseDetail.likes > 0) courseDetail.likes = courseDetail.likes - 1;

 await course.findOneAndUpdate({courseId:courseId}, courseDetail);
 
 
 return {msg: "Remove From Liked", success: true};
}

const addToWishlist = async (Data: propData) => {
  const {email, courseId, courseDetail} = Data;
 
 const User = await user.findOne({email: email});
 if (!User) throw "Some Error Occurred ";
 
 const idx = User.wishlistCourses.findIndex((item:subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx != -1) throw "Already Wishlisted";
 
 User.wishlistCourses.push({title:courseDetail.name, courseId:courseId});
 
 await user.findOneAndUpdate({email:email}, User);

 
 return {msg: "Added To WishList", success: true};
}

const removeFromWishlist = async (Data: propData) => {
  const {email, courseId, courseDetail} = Data;

 const User = await user.findOne({email: email});
 if (!User) throw "Some Error Occurred";
 
 const idx = User.wishlistCourses.findIndex((item:subItem) => {
  if (item.courseId == courseId) return true;
 });
 if (idx == -1) throw "Course Not Found";

 User.wishlistCourses.splice(idx,1);
 
 await user.findOneAndUpdate({email:email}, User);

 return {msg: "Remove From WishList", success: true};
}


export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse<response>
) {
 await NextCors(req, res, {
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: '*',
  optionsSuccessStatus: 200,
 });

 if (req.method == "POST") {

  try {
   await dbConnect();
   const {query, courseId} = req.body;
   
   if (!query || !courseId) throw "Invalid Request";

   const courseDetail = await findCourse(courseId);
   if (!courseDetail) throw "Invalid Course Id";

   const secret = process.env['NEXTAUTH_SECRET'] as string;
   
  const Token = await getToken({ req, secret });
  if (!Token) throw "Invalid Request";
  const email = Token.email;
  if (!email) throw "Invalid Request";
   let response: response;
     
   switch (query) {
    case "enroll":
     response = await addToEnroll({email, courseId, courseDetail});
     break;
    case "unenroll":
     response = await removeFromEnroll({email, courseId, courseDetail});
     break;
    case "like":
     response = await addToLike({email, courseId, courseDetail});
     break;
    case "unlike":
     response = await removeFromLike({email, courseId, courseDetail});
     break;
    case "wishlist":
    response =  await addToWishlist({email, courseId, courseDetail});
     break;
    case "unwishlist":
     response = await removeFromWishlist({email, courseId, courseDetail});
     break;
     case "checkwishlist":
     response = await checkWishlist({email, courseId, courseDetail});
     break;
     case "checkliked":
     response = await checkLiked({email, courseId, courseDetail});
     break;
    default:
     throw "Invalid Request";
   }

   return res.status(200).json(response);
  }
  catch (err) {
   res.status(400).json({ error: String(err), success: false });
  }

 }
 else {
  res.status(400).json({ error: "Invalid Request Method", success: false });
 }

 //--------------------
}