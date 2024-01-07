import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
const CUSTOM_ANIMATION = {
  mount: { scale: 0.9 },
  unmount: { scale: 1 },
};

type icon = {
 id: number,
 open: number,
}

export default function MyAccordion () {
  const [open, setOpen] = React.useState(0);
  
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
  
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
 
  return (
    <>
  <div className="m-4 my-6 w-full px-4 mx-auto md:w-5/6 lg:mx-auto">
      <Accordion  open={open === 1} icon={<Icon id={1} open={open} />}  >
        <AccordionHeader className="font-lato hover:text-pink-500 text-black hover:border-pink-100 text-md" onClick={() => handleOpen(1)}>What is ISkill?</AccordionHeader>
      <AccordionBody className=" transition transition-600 ease-in-out text-xs px-1 font-poppins">
          Welcome to our ISkills, where we&apos;re passionate about providing you with an exceptional
          Learning experience. Discover a world of high-quality  and in-demand skills.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader className="font-lato hover:text-pink-500 hover:border-pink-100 text-md text-black" onClick={() => handleOpen(2)}>
          How ISkills help me to get Job?
        </AccordionHeader>
        <AccordionBody className="transition transition-600 ease-in-out  text-xs px-1 font-poppins">
          ISkills empowers you to secure a job by providing a comprehensive platform for skill development and professional growth. We work on Skill Enhancement, Industry-Relevant Courses, Certifications Portfolio Building and much more.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader className="font-lato hover:text-pink-500 text-md hover:border-pink-100 text-black" onClick={() => handleOpen(3)}>
          Is ISkill is Trustworthy?
        </AccordionHeader>
        <AccordionBody className=" transition transition-600 ease-in-out text-xs px-1 font-poppins">
          Absolutely, ISkills is committed to maintaining the highest standards of trust and integrity. ISkills is trusted by thousands of companies worldwide.
        </AccordionBody>
      </Accordion>
       <Accordion icon={<Icon id={4} open={open} />} open={open === 4} >
        <AccordionHeader className="font-lato hover:text-pink-500 hover:border-pink-100 text-md text-black" onClick={() => handleOpen(4)}>
          What courses does your website offer?
        </AccordionHeader>
        <AccordionBody className=" transition transition-600 ease-in-out text-xs px-1 font-poppins">
          We offer a diverse range of courses spanning various industries, from technology and business to creative arts and personal development. Explore our catalog to find the perfect course for your goals.
        </AccordionBody>
      </Accordion>
      <Accordion icon={<Icon id={5} open={open} />} open={open === 5} >
        <AccordionHeader className="font-lato hover:text-pink-500 hover:border-pink-100 text-md text-black" onClick={() => handleOpen(5)}>
          Can I access the courses on multiple devices?
        </AccordionHeader>
        <AccordionBody className=" transition transition-600 ease-in-out text-xs px-1 font-poppins">
          Yes, you can access our courses on various devices – desktops, laptops, tablets, and smartphones. Learn at your own pace, anytime, anywhere.
        </AccordionBody>
      </Accordion>
   <Accordion icon={<Icon id={6} open={open} />} open={open === 6} >
        <AccordionHeader className="font-lato hover:text-pink-500 hover:border-pink-100 text-md text-black" onClick={() => handleOpen(6)}>
          How do I enroll in a course? 
        </AccordionHeader>
        <AccordionBody className=" transition transition-600 ease-in-out text-xs px-1 font-poppins">
          Enrolling is simple. Browse our course catalog, select the course you&apos;re interested in, and click on the &quot;Enroll&quot; button. Follow the prompts to create an account, and you&apos;ll be on your way to learning.
        </AccordionBody>
      </Accordion>

  </div>
    </>
  );
}