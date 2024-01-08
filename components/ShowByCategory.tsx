import React from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import Image from "next/image";






type Prop = {
 Data:[],
 android:[],
 web:[],
 machineLearning:[],
 dataScience:[],
 devops:[]
}

type icon = {
 id: number,
 open: number,
}


export default function ShowByCategory (Props:Prop) {
 const [open, setOpen] = React.useState(0);
 const {Data, android, web, machineLearning, dataScience, devops} = Props;
 const categories = [
 {name:"Android Development", courses: android.length>0?android:Data},
 {name:"Web Development", courses:web.length>0?web:Data},
 {name:"Machine Learning", courses:machineLearning.length>0?machineLearning:Data},
 {name:"Data Science", courses:dataScience.length>0?dataScience:Data},
 {name:"Dev OPS", courses:devops.length>0?devops:Data}
];
 

 const handleOpen = (value: number) => setOpen(open === value ? -1 : value);
 
 function Icon({ id, open }:icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={` ${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform text-pink-400`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
 }
  return (
    <>
  <div className="m-4 my-6 lg:w-3/4 lg:mx-auto">
   <h1 className="text-3xl  font-popoins myColor mb-8 md:text-5xl md:text-center md:py-3">Courses By Category </h1>
   {categories.map((category, idx) => {
  return <Accordion key={idx} className="mb-2 px-1 rounded-lg" open={open === idx} icon={<Icon id={idx} open={open} />} >
        <AccordionHeader className="font-lato text-lg text-black border-gray-200 hover:text-pink-500 hover:border-pink-100" onClick={() => handleOpen(idx)} onMouseOver={() => handleOpen(idx)}>{category.name}</AccordionHeader>
      <AccordionBody className="flex overflow-scroll space-x-4 p-3  transition transition-600 ease-in-out font-poppins">
    
 {
   category.courses.map((item, idx)=>{
 const {name, img, price, likes} = item;
 return <div key={idx} className="flex-shrink-0 w-48 p-2  border shadow rounded bg-gray-100">

 <div className="relative overflow-hidden font-poppins">
     <Image className="object-contain  w-full rounded-lg" src={img} width={500} height={200} alt="img"/>
 </div>
 <div className="py-2 px-2">
  <h1 className="text-md text-pink-500 line-clamp-2 mb-1">{name}</h1>
  <del className="me-1 text-sm">₹{price}</del>     <span className="me-1 text-sm">Free</span>
  <span className="text-sm"> {likes}K+</span>
  <button className="bg-pink-500 w-20 py-1 rounded-lg text-white mt-1">Enroll</button>
 </div>

</div>

})
 }
        </AccordionBody>
      </Accordion>
})}
      
      
  </div>
    </>
  );
 
}