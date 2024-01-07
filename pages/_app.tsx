import '../styles/globals.css'
import React from "react";
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@material-tailwind/react";
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNavbar from "../components/BottomNavbar";
import PageSpinner from "../components/PageSpinner";

function MyApp({ Component, pageProps }: AppProps) {
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const router = useRouter();
 
 const [progress, setProgress] = React.useState(0);
 const [tab, setTab] = React.useState(1);
 
 React.useEffect(() => {
  router.events.on('routeChangeStart', () => {
   setProgress(40);
  })
  router.events.on('routeChangeComplete', () => {
   setProgress(100);
  })
 }, []);
 React.useEffect(() => {
   if (pathname == "/") setTab(1);
   else if (pathname == "/courses") setTab(2);
   else if (pathname == "/enrolled") setTab(3);
   else if (pathname == "/profile") setTab(4);
   else setTab(1);
  }, [pathname]);
 return <>
  
<SessionProvider session={pageProps.session}>
 <ThemeProvider>
 <Nav/>
  <LoadingBar
   color='#f11946'
   waitingTime={400}
   progress={progress}
   onLoaderFinished={() => setProgress(0)}
  /> 
  <PageSpinner Loading={progress==0?false:true}/>
    <Component {...pageProps} />
   <BottomNavbar setTab={setTab} tab={tab} />
    <Footer />
 </ThemeProvider>
</SessionProvider>
 </>
}

export default MyApp

