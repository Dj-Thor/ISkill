import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import Image from "next/image";
import { FaUserTie, FaRegCalendarAlt, FaShare, FaHeart } from "react-icons/fa";
import LikeButton from "./LikeButton";
import Wishlist from "./Wishlist";
import Link from "next/link";

type Course = {
  name: string;
  courseId: string;
  price: number;
  description: string;
  mentors: [];
  playlistId: string;
  img: string;
  rating: number;
  comments: [];
  enrolledCount: number;
  isVideo: boolean;
  likes: number;
};

type Prop = {
  courseInfo: Course;
};

export default function Cards({ courseInfo }: Prop) {
  const {
    name,
    img,
    mentors,
    description,
    price,
    rating,
    likes,
    enrolledCount,
    courseId,
  } = courseInfo;

  return (
    <div className="flex flex-wrap justify-center p-4 mb-5  mx-2">
      <Card className="mt-6 w-96 lg:w-3/4 shadow-lg  rounded-2xl border mb-4">
        <CardHeader className="w-full m-0">
          <img src={img} alt="img" className="object-cover w-full"></img>
        </CardHeader>
        <CardBody className="">
          <div className="mb-1 font-lato flex justify-between">
            <span>
              <del className="text-red-500">₹{price}</del>
              <span className="mx-2 text-green-500">Free</span>
            </span>
            <div className="flex gap-1 inline">
              <LikeButton course={courseId} />
              <Wishlist course={courseId} />
            </div>
          </div>
          <div className="mb-2 myColor1 font-lato line-clamp-2 text-lg">
            {name}
          </div>
          <div className="mb-2 font-lato myColor1  text-sm">
            <FaUserTie className="m-1 inline myColor1" />{" "}
            {mentors.map((mentor, idx) => {
              return <span key={idx}> {mentor} </span>;
            })}
          </div>
          <div className="mb-1 font-lato text-sm myColor1">
            <FaRegCalendarAlt className="m-1 inline myColor1" /> Started From 23
            Oct, 2023
          </div>
          <div className="flex items-center gap-2 myColor1 w-full my-2">
            {rating}.7
            <Rating value={rating} readonly />
            <Typography color="blue-gray" className="text-xs font-lato">
              1{rating}40 Reviews
            </Typography>
          </div>
          <p className="font-lato text-sm my-0 line-clamp-5 myColor1">
            {description}
          </p>
        </CardBody>
        <div className="w-full flex flex-wrap text-white p-1 justify-center ">
          <Link
            href={`./course/${courseId}`}
            className="rounded-full w-28 font-lato bg-pink-500 block mb-4 py-2 text-center text-md text-white mx-auto"
          >
            Enroll now
          </Link>
        </div>
      </Card>
    </div>
  );
}
