import React from 'react';

type playerProps = {
  id:string
}


export default function Player (Data:playerProps) {
  
  return (
   <div className="w-full lg:w-3/4 mx-auto flex justify-center pt-8 px-5 box-border">
  <iframe className="w-full aspect-[16/10] rounded-lg" src={`https://www.youtube.com/embed/${Data.id}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
  </div>
  );
}
