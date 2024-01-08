import { Carousel, IconButton } from "@material-tailwind/react";
import React from "react";
import Cards from  "./Card";

type Prop =  {
  Data: Course[],
}

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


export default function Caro(Props:Prop) {

  return (<>
   <div className="mb-8">
    <h1 className="text-3xl px-3 font-popoins myColor md:text-center md:text-5xl md:my-3">Weekly Most Enrolled Course </h1>
    <Carousel 
      prevArrow={({ loop, handlePrev }) => (
        <IconButton
          variant="gradient"
          color="deep-orange"
          size="md"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton> 
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="gradient"
          color="deep-orange"
          size="md"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
           </svg>
        </IconButton>
      )}
      transition={{ duration: 0.4 }}  
      autoplay={true} 
      autoplayDelay={5000} 
      loop={true} >
      
 {Props.Data.map((item, idx) => {
  return <Cards key={idx} courseInfo={item}/>
})}
  </Carousel>
   </div>
  </>
  );
}
