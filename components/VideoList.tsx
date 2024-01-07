import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import React from "react";


type Prop = {
  playList: playListItem[] | never[],
  nowPlaying:String,
  setCurrent(id:String): void
}
type icon = {
 id: number,
 open: number,
}

type videoInfo = {
 resourceId: {
  videoId: string,
 },
 thumbnails: {
  default: {
   url: string
  }
 },
 title:string
}

type playListItem = {
  resourceId: {
  videoId: string
  },
 thumbnails: {
  default: {
   url: string
  }
 },
 title:string
}

function Icon({ id, open }:icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform text-pink-500`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function Videolist({playList, setCurrent, nowPlaying}:Prop) {
const [open, setOpen] = React.useState(1);
  
const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  
  return ( <>
   <div className="mx-4 mt-6 lg:w-3/4 lg:mx-auto">
<Accordion open={open === 1} icon={<Icon id={1} open={open}/>}>
        <AccordionHeader className="font-lato myColor1 text-2xl" onClick={() => handleOpen(1)}>  Playlist</AccordionHeader>
      <AccordionBody className=" transition transition-600 ease-in-out text-sm font-poppins">
        
          <Card className="w-full mx-auto max-h-72 overflow-y-scroll shadow-none">
      <List>
        {playList.length > 0 && playList.map((Item:videoInfo, idx) => {
       return <ListItem className={`${nowPlaying==Item.resourceId.videoId?"disabled":""} `} key={idx} onClick={() => setCurrent(Item.resourceId.videoId)}>
          <ListItemPrefix>
            <Avatar className="object-cover bg-black max-w-[75px] max-h-[75px]" alt="img" src={Object.keys(Item.thumbnails).length>0?Item.thumbnails.default.url:""}/>
          </ListItemPrefix>
          <div>



            
            <Typography variant="h6"  className="font-poppins text-sm">
              {Item.title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              
            </Typography>
          </div>
        </ListItem>
    })}
      </List>
    </Card>
  </AccordionBody>
  </Accordion>
</div>
  </>
  );
}
  