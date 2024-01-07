import dbConnect from "../../modals/db";
import NextCors from 'nextjs-cors';
import type { NextApiRequest, NextApiResponse } from 'next'
import course from '../../modals/course';

type response = {
 error?: string,
 msg?: string,
 success: boolean,
 updated?: {}
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
   const {comment, courseId} = req.body;
   if (!comment || !courseId) throw "Invalid Request";
   const Course = await course.findOne({courseId:courseId});
   if (!Course) throw "Invalid Course";
   Course.comments.push(comment[0]);  
   const Updated = await Course.save();
   
   return res.status(200).json({ msg:"Comment Added Successful" , success: true, updated:Updated});
   
  } catch (err) {
    return res.status(400).json({ error: String(err), success: false });
  }
 } else {
 return res.status(400).json({ error: "Invalid Request Method", success: false });
 }
}