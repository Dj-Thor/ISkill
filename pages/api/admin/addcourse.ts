import dbConnect from "../../../modals/db";
import NextCors from 'nextjs-cors';
import type { NextApiRequest, NextApiResponse } from 'next'
import course from '../../../modals/course';

type response = {
 error?: string,
 msg?: string,
 success: boolean
}

const generateId = () => {
 const date = new Date();
 return String(date.getTime());
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

 //-------------------

 if (req.method == "POST") {

  try {
   await dbConnect();
   const { name, description, mentors, img, rating, reviews, price, enrolledCount, likes, playlistId, category} = req.body;

   if (name.length < 3 || name.length > 50) {
    throw "Name length should be between 3 and 50";
   } else if (description.length < 3 || description.length > 1000) {
    throw "Invalid Description";
   }
   else if (mentors.length < 1) {
    throw "Mentors length should be greater than 0";
   }
   else if (!img || !playlistId) {
    throw "Invalid Data";
   }

   const courseId = generateId();

   const newCourse = new course({
    name: name,
    courseId: courseId,
    description: description,
    mentors: mentors,
    img: img,
    rating: rating,
    reviews: reviews,
    enrolledCount: enrolledCount,
    likes: likes,
    playlistId: playlistId,
    price: price,
    category: category
   });
   await newCourse.save();

   res.status(400).json({ msg: "Course Added Successful", success: true });
  }
  catch (err) {
  
   res.status(400).json({ error: String(err), success: false });
  }

 }
 else {
  res.status(400).json({ error: "Invalid Request Method", success: false });
 }


}