import React from "react"

type Prop = {
 Start:boolean,
 Stop(val:boolean): void
}
export default function Timer({Start, Stop}:Prop) {

const [minutes, setMinutes] = React.useState(2);
const [seconds, setSeconds] = React.useState(1);

React.useEffect(() =>{
 if (Start) setSeconds(seconds+1);
},[Start]);

React.useEffect(() => {
  const interval = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1); 
    }

    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(interval);
        Stop(false);
        setMinutes(2)
      } else {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
},[seconds]);

  
   return (<>
     <span>{Start?`Resend after ${minutes<10?"0":""}${minutes}:${seconds<10?"0":""}${seconds}`:`Send OTP`}</span>
   </>)
}
