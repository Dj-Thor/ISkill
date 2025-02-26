/*
const ContainerOne = () => {
 const router = useRouter();
 // Top Hero Image
 return (<>
  <div className="flex flex-nowrap  lg:p-8">

 <div className="w-full justify-center hidden flex-wrap pt-10 px-10 md:block ">
  
 <div className="mt-6 p-0">
   <span className="text-4xl text-pink-600 w-full">Embark on a Learning Odyssey –</span><span className="text-4xl w-full"> Where Education Meets Innovation</span>
  <button onClick={()=>{router.push(`${URL}/courses`)}} className="rounded-full w-40 font-lato bg-pink-500 block mt-4 py-3 font-lato text-xl text-white">
        Explore
   </button>
  </div>
 <div className="flex justify-left mt-0 w-full">
   
  </div>
  
 </div>
 
 <div className="w-full text-center  text-sm">
  <Image className="object-contain  rounded" height={400} width={400} src="/homegif.gif" alt="gif" priority/>
 </div>
</div>
<div className="py-5 p-1.5 text-center rounded-lg my-4 mx-5  text-lg ">
   <span className="text-3xl mx-1 text-pink-600">{"<"}</span><TypeAnimation
      sequence={[
        'Skill up',
        700,
        'Be The Very Best',
        1000,
        'Version Of Yourself',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1.5em', display: 'inline-block', }}
      repeat={Infinity}
    /><span className="text-pink-600 text-3xl mx-1">{"/>"}</span>
      <button className="rounded-full w-28 font-lato bg-pink-500 block mt-4 py-2 font-lato text-md text-white mx-auto lg:hidden">
        Explore
   </button>
   </div>
</>)
}
const ContainerTwo = () => {
 const router = useRouter();
 // 4 Images
 return (<>
  <div className="Main container flex flex-wrap gap-5 p-5 mx-auto ">  
    
    
<div className="Sub container flex flex-wrap justify-center pb-4 gap-3 lg:w-[45%] h-92 ">
    
 <div className="p-3">
 <img className="h-72 " src="/Untitled design 2.png" alt=""></img>
 </div>
 <div className="flex flex-wrap p-2 justify-center gap-3">
    <h2 className="text-2xl text-center myColor">Be a Certified Developer</h2>
    <p className="text-center px-2 lg:w-3/4 mx-auto ">Instructors from around the world teach millions of learners on ISkills. We provide the tools and skills to teach what you love.</p>
 </div>
   <button onClick={()=>{router.push(`${URL}/courses`)}} className="w-72 text-xl text-white bg-cyan-500 px-5 py-2">Start Learning</button>
</div>

<div className="Sub container flex flex-wrap justify-center py-4 gap-3 lg:w-[45%]">
    
 <div className="p-3">
 <img className="h-72 " src="/Untitled design 1.png" alt=""></img>
 </div>
 <div className="flex flex-wrap p-2 justify-center gap-3">
    <h2 className="text-2xl text-center myColor">Learn From Experienced Mentors </h2>
    <p className="text-center px-2 lg:w-3/4 mx-auto ">Empowering enthusiasts globally, our expert instructors inspire countless learners. Join us to share your passion, equipped with the tools and skills to ignite curiosity</p>
 </div>
   <button onClick={()=>{router.push(`${URL}/courses`)}} className="w-72 text-xl text-white bg-purple-500 px-5 py-2">Start Learning</button>
</div>
    
<div className="Sub container flex flex-wrap justify-center py-4 gap-3 lg:w-[45%]">
    
 <div className="p-3">
 <img className="h-72 " src="/Untitled design 4.png" alt=""></img>
 </div>
 <div className="flex flex-wrap p-2 justify-center gap-3">
    <h2 className="text-2xl text-center myColor">Learn Popular Softwares</h2>
    <p className="text-center px-2 lg:w-3/4 mx-auto ">Embark on a learning journey with our diverse community of instructors, guiding and inspiring learners worldwide. We equip you with the tools and expertise to share your knowledge and make a meaningful impact.</p>
 </div>
   <button onClick={()=>{router.push(`${URL}/courses`)}} className="w-72 text-xl text-white bg-red-500 px-5 py-2">Start Learning</button>
</div>
   
 <div className="Sub container flex flex-wrap justify-center py-4 gap-3 lg:w-[45%]">
    
 <div className="p-3">
 <img className="h-72 " src="/Untitled design 3.png" alt=""></img>
 </div>
 <div className="flex flex-wrap p-2 justify-center gap-3">
    <h2 className="text-2xl text-center myColor">Work With Professional Teams</h2>
    <p className="text-center px-2 lg:w-3/4 mx-auto ">Dive into the world of knowledge as our international team of educators shapes the learning experience. Fuel your passion and become a beacon of inspiration – because here, teaching what you love is not just a skill, it&apos;s a calling.</p>
 </div>
   <button onClick={()=>{router.push(`${URL}/courses`)}} className="w-72 text-xl text-white bg-yellow-500 px-5 py-2">Start Learning</button>
</div>
    
</div>
 </>)
}
const ContainerThree = () => {
 // 4 Rectangular container 
 return (<>
  <div className="container flex flex-wrap gap-5 p-8 md:flex-unwrap  justify-center mb-6  mx-auto">
 
<div className="container p-4 shadow rounded-lg flex md:w-[40%] mb-3 bg-gray-50">
     <div className="flex px-2 bg-pink-200 items-center text-pink-600 rounded-lg ">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
  <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
</svg>


     </div>
     <div className="ps-4">
         <h3 className="text-xl text-pink-600">300+</h3>
         <h4>Hiring Partners</h4>
     </div>
   </div>  
 <div className="container p-4 shadow rounded-lg flex md:w-[40%] mb-3 bg-gray-50">
     <div className="flex px-2 bg-blue-200 items-center text-blue-500 rounded-lg ">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
  <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
</svg>


     </div>
     <div className="ps-4">
         <h3 className="text-xl text-blue-500">10000+</h3>
         <h4>Successful Placements</h4>
     </div>
   </div>
<div className="container p-4 shadow rounded-lg flex border mb-3 border-orange-50 md:w-[40%] bg-gray-50">
     <div className="flex px-2 bg-orange-200 items-center text-orange-500 rounded-lg ">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
  <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clipRule="evenodd" />
</svg>

     </div>
     <div className="ps-4">
         <h3 className="text-xl text-orange-500">1000+</h3>
         <h4>Companies Trust</h4>
     </div>
   </div>

<div className="container p-4 shadow rounded flex md:w-[40%] mb-3 bg-gray-50">
     <div className="flex px-2 bg-cyan-200 items-center text-cyan-500 rounded-lg ">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
  <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
</svg>

     </div>
     <div className="ps-4">
         <h3 className="text-xl text-cyan-500">4000+</h3>
         <h4>Different Courses</h4>
     </div>
   </div>   
     
</div>
 </>)
}
const ContainerFour = () => {
 // Companies Container
 return (<>
  <div className="container  p-4 mx-auto pt-12 pb-8 mt-6">
 <p className="text-center text-xl md:text-2xl lg:text-3xl md:px-6 myColor">
  Trusted By Over 15000 Companies and millions or learners around the world
 </p>
 <div className="logos flex justify-center p-2 gap-5 lg:gap-8 pt-6 justify-center">
   <img className="w-20 md:w-28 lg:w-36" src="https://www.svgrepo.com/show/303300/new-youtube-logo-logo.svg" alt=""></img>
   <img className="w-20 mt-2 md:w-28 lg:w-36" src="https://www.svgrepo.com/show/303264/amazon-2-logo.svg" alt=""></img>
   <img className="w-20 md:w-28 lg:w-36" src="https://www.svgrepo.com/show/303196/netflix-2-logo.svg" alt=""></img>
    </div>
 <div className="logos flex justify-center gap-4">
   <img className="w-16 md:w-20 lg:w-24" src="https://www.svgrepo.com/show/303472/wordpress-logo.svg" alt=""></img>
   <img className="w-16 md:w-20 lg:w-24" src="https://www.svgrepo.com/show/303685/facebook-5-logo.svg" alt=""></img>
   <img className="w-16 mt-2 md:w-20 lg:w-24" src="https://www.svgrepo.com/show/303674/call-of-duty-logo.svg" alt=""></img>
   <img className="w-16 md:w-20 lg:w-24" src="https://www.svgrepo.com/show/303232/mongodb-logo.svg" alt=""></img>
 </div>
  <div className="logos flex justify-center gap-5 p-2 justify-center">
  <img className="w-24 md:w-32 lg:w-36" src="https://www.svgrepo.com/show/303665/apple-11-logo.svg" alt=""></img>
  <img className="w-24 mt-2 md:w-32 lg:w-36" src="https://www.svgrepo.com/show/303183/google-2015-logo.svg" alt=""></img>

  </div>
</div>



 </>)
}
const ContainerFive = () => {
 // Testimonials 
 return (<>
  <section className="text-gray-600  body-font">
  <div className="md:w-5/6 w-full px-5 py-12 mx-auto">
    <h1 className="md:text-5xl text-3xl font-medium title-font mb-12 text-center myColor ">Success Stories</h1>
   
  <div className="flex flex-unwrap -m-4 overflow-x-scroll h-60">
     <div className="p-2 md:w-1/3  w-full flex-shrink-0  ">
        <div className="h-full shadow p-8 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 myColor mb-4" viewBox="0 0 975.036 975.036">
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
          <p className="leading-relaxed text-xs text-gray-700 ">Carlos&apos;s exploration of AI and machine learning reflects the transformative potential of emerging technologies, highlighting the impact of curiosity and experimentation..</p>
          
        </div>
      </div>
      <div className="p-2 md:w-1/3 w-full flex-shrink-0 ">
        <div className="h-full shadow p-8 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 myColor mb-4" viewBox="0 0 975.036 975.036">
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
          <p className="leading-relaxed text-xs text-gray-700">Olivia&apos;s success as a web developer illustrates the artistry and technical prowess required to create seamless digital experiences, emphasizing the fusion of creativity and coding.</p>
          
        </div>
      </div>
      <div className="p-2 md:w-1/3  w-full flex-shrink-0 ">
        <div className="h-full shadow p-8 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 myColor mb-4" viewBox="0 0 975.036 975.036">
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
          <p className="leading-relaxed text-xs text-gray-700">Michael&apos;s journey into the realm of data science showcases the power of harnessing data for informed decision-making, emphasizing the demand for analytical skills in various industries.</p>
          
        </div>
      </div>
     <div className="p-2 md:w-1/3 w-full flex-shrink-0  ">
        <div className="h-full shadow p-8 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 myColor mb-4" viewBox="0 0 975.036 975.036">
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
          <p className="leading-relaxed text-gray-700 text-xs ">Jason&apos;s story underscores the dynamic landscape of mobile app development, emphasizing the importance of staying attuned to user needs and technological advancements.</p>
          
        </div>
      </div>
   
 </div>

  </div>
</section>
    
 </>)
}
const ContainerSix = (Props:Prop) => {

 return (<>
  <div className="flex flex-wrap  gap-2 mx-auto md:gap-3 md:w-[96%] w-full mt-20 md:px-3 my-16 px-2">
    <h1 className="text-3xl md:text-5xl  font-medium px-3 title-font text-gray-900 w-full mb-6 md:text-center myColor ">Popular Courses</h1>
   {Props.Data.map((item:Course, idx:number)=>{
      return <CourseItem key={idx} CourseDetails={item} />
     })}
    </div>
 </>)
}
*/ 