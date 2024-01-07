import React from "react";
import Image from "next/image";
import {
 Spinner, Typography
} from "@material-tailwind/react";
import { TypeAnimation } from 'react-type-animation';
type Props = {
 Loading:boolean
}

export default function PageSpinner(Data:Props) {
const { Loading } = Data;
const [hidden, setHidden] = React.useState(Loading);
React.useEffect(() => {
 setHidden(Loading);
}, [Loading]);

 return <>
  <div className={`${hidden?"visible":"invisible"} overlay flex justify-center items-center pb-28 md:pb-0 flex-wrap z-30 min-h-screen`}>
   <Spinner color="pink" className="h-10 w-10" />  
   
   
</div>

 </>
}

