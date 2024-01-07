import dbConnect from "../../../modals/db";
import NextCors from 'nextjs-cors';
import type { NextApiRequest, NextApiResponse } from 'next'
import course from '../../../modals/course';

type response = {
 error?: string,
 msg?: string,
 success: boolean,
 data?: []
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
   const allCourses = await course.find({});
   
   res.status(400).json({ msg: "Course Added Successful", success: true, data:allCourses});
  }
  catch (err) {
   res.status(400).json({ error: String(err), success: false });
  }

 }
 else {
  res.status(400).json({ error: "Invalid Request Method", success: false });
 }

    }