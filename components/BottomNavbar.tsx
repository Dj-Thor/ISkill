import React from "react";
import {
  Drawer,
  Button,
  Typography,
} from "@material-tailwind/react";
import {FaHome, FaYoutube,FaUserCog} from 'react-icons/fa';
import { MdOutlineClose } from "react-icons/md";
import { IoIosArrowDropup } from "react-icons/io";
import Link from "next/link";
import {ImBooks} from 'react-icons/im';

type Prop = {
 setTab(val:number): void,
 tab:number
}

export default function BottomNavbar ({setTab, tab}:Prop) {
  
const URL = process.env['NEXT_PUBLIC_URL'];

  const [openBottom, setOpenBottom] = React.useState(true);
  const openDrawerBottom = () => setOpenBottom(!openBottom);
  const closeDrawerBottom = () => setOpenBottom(true);
  

  return (<>
    
   <div className="flex flex-wrap gap-1 z-20 fixed bottom-20 right-5 md:hidden opacity-90">
     <Button className="bg-transparent rounded-full p-2" onClick={openDrawerBottom}>
      {openBottom?<MdOutlineClose className="text-2xl text-bold text-pink-400" />:<IoIosArrowDropup className="text-3xl text-bold text-pink-400" />}
     </Button>
        
      </div>
       <Drawer
        placement="bottom"
        open={openBottom}
        onClose={closeDrawerBottom}
        className="p-3 pt-3 bg-black md:hidden bg-opacity-90"
        size={70}
        overlay={false}
      >
      <div className="flex gap-1 w-full justify-around opacity-100 ">
      
        <Link href={`${URL}/`} onClick={() => {closeDrawerBottom(); setTab(1);}}>
<FaHome className={tab==1?`text-2xl text-pink-500 border-b-2 border-0 pb-0.5 border-pink-500 mx-auto`:`text-2xl text-gray-50 mx-auto`}/>
   <span className={tab==1?`text-gray-50 text-xs text-pink-500`:`text-gray-50 text-xs`}>Home</span>
  </Link>
      

       
        <Link href={`${URL}/courses`} onClick={() => {closeDrawerBottom(); setTab(2);}}>
<ImBooks className={tab==2?`text-2xl text-pink-500 border-b-2 border-0 pb-0.5 border-pink-500 mx-auto`:`text-2xl text-gray-50 mx-auto`}/>
         <span className={tab==2?`text-gray-50 text-xs text-pink-500`:`text-gray-50 text-xs`}>Courses</span>
        </Link>
      
      
       <Link href={`${URL}/enrolled`} onClick={() => {closeDrawerBottom(); setTab(3);}}>
<FaYoutube className={tab==3?`text-2xl text-pink-500 border-b-2 border-0 pb-0.5 border-pink-500 mx-auto`:`text-2xl text-gray-50 mx-auto`} />
        <span className={tab==3?`text-gray-50 text-xs text-pink-500`:`text-gray-50 text-xs`}>Enrolled</span>
        </Link>
      
      
    <Link href={`${URL}/profile`} onClick={() => {closeDrawerBottom(); setTab(4);}}>
<FaUserCog className={tab==4?`text-2xl text-pink-500 border-b-2 border-0 pb-0.5 border-pink-500 mx-auto`:`text-2xl text-gray-50 mx-auto`} />
     <span className={tab==4?`text-gray-50 text-xs text-pink-500`:`text-gray-50 text-xs`}>Account</span>
        </Link>
      
    </div>
        
      </Drawer>
  </>);
 }




