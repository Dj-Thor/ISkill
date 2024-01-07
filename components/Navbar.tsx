import React from "react";
import { Navbar, Typography, Button, IconButton, Collapse, Textarea} from "@material-tailwind/react";
import { FaUserTie, FaHome, FaInfoCircle, FaLongArrowAltRight, FaArtstation} from 'react-icons/fa';
import {ImBooks} from 'react-icons/im';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useSession, signOut} from "next-auth/react";
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { MdContactSupport } from "react-icons/md";

const URL = process.env['NEXT_PUBLIC_URL'];

export default function Nav () {
  const [openNav, setOpenNav] = React.useState(false);
 const { data: session, status } = useSession();
 const [userStatus, setStatus] = React.useState(false);
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const [path, setPath] = React.useState("/");
 
 React.useEffect(() => {
   setPath(pathname)
  }, [pathname, searchParams]);
 React.useEffect(()=>{
  if (status == "authenticated") setStatus(true);
  else setStatus(false);
 },[status]);
//<FaArtstation className="text-2xl inline mx-1.5 mb-1"/>  
 

 
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

const router = useRouter();

const navListItem = [{title: 'Home', Icon: <FaHome className="mx-1.5 text-xl"/>, to: '/', auth: false}, {title:'About', Icon: <FaInfoCircle className="mx-1.5 text-xl"/>, to: '/about', auth: false}, {title: 'Courses', Icon: <ImBooks className="mx-1.5 text-xl"/>, to: '/courses', auth: false}, {title: 'Enrolled', Icon: <FaUserTie className="mx-1.5 text-xl"/>, to: '/enrolled', auth:true}, {title: 'Profile', Icon: <FaUserTie className="mx-1.5 text-xl"/>, to: '/profile', auth:true}, {title: 'Contact Us', Icon: <MdContactSupport className="mx-1.5 text-xl"/>, to: '/contact', auth:false}]


  
 const navList = (
  <ul className="mb-4 py-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 px-2 ">
{ navListItem.map((Item,idx)=>{
  let returningItem; // prevention from multiple return
  switch (Item.auth) {
   case false:
    returningItem = (<Typography
        as="li"
        variant="small"
        color={path==(Item.to)?"pink":"white"}
        className="p-1 hover:text-pink-400"
        key={idx}
      >
        <Link href={`${URL}${Item.to}`} className="flex items-center  text-lg font-lato">
          {Item.Icon} {Item.title}
        </Link>
      </Typography>)
      break;
    
    case true:
     returningItem = userStatus ?(<Typography
        as="li"
        variant="small"
        color={path==(Item.to)?"pink":"white"} 
        className="p-1  font-normal" 
        key={idx}
      >
        <Link href={`${URL}${Item.to}`} className="flex items-center hover:text-pink-400 text-white text-lg font-lato">
          {Item.Icon} {Item.title}
        </Link>
      </Typography>): null;
      break;
   default:
     returningItem = null;
  }
  return returningItem;
 })
}
    
    </ul>
  );
 
  return <>
  
    <Navbar className="z-40 py-1.5 h-max max-w-full rounded-none w-full top-0 px-0  lg:px-8 lg:py-4 sticky bg-black bg-opacity-100 border-0">
        <div className="flex items-center justify-between text-blue-gray-900 px-2">
          <Typography
            className="mr-4 cursor-pointer  font-medium font-lato text-2xl"
          >
         <img
      src="/ISkillsLogo.jpg"
      width="120"
      height="100"
      alt="logo"
      className="inline mb-1"
    />
       
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
     {userStatus?<Button onClick={() => {signOut({ redirect: false }).then(() => { router.push("/") })}}
              variant="gradient"
              size="md"
              color="pink"
              className="hidden lg:inline-block font-lato">
              Sign Out
            </Button>:<Button onClick={() => router.push(`${URL}/user/SignIn`)}
              variant="gradient"
              size="md"
              color="pink"
              className="hidden lg:inline-block font-lato">
              Sign In
            </Button> }
         
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
      
        <Collapse className="fixed mx-0 text-center z-30 bg-black opacity-100  text-white" open={openNav}>
          {navList}
         {userStatus?<Button color="pink" onClick={() => {signOut({ redirect: false }).then(() => { router.push("/") })}} variant="gradient" size="sm" className="font-spectral bg-pink-500 w-[70%] mx-auto mb-3">
         <span>SignOut</span><FaLongArrowAltRight className="inline text-xl mx-1.5 mb-1"/>
          </Button>:<Button onClick={() => router.push(`${URL}/user/SignIn`)} variant="gradient" color="pink" size="sm" className="font-spectral bg-pink-500 w-[70%] mx-auto mb-3">
         <span>SignIn</span><FaLongArrowAltRight className="inline text-xl mx-1.5 mb-1"/>
          </Button>}
        </Collapse>
      </Navbar>
    </>
}

