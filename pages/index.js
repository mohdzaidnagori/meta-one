import { motion } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { exploreData } from '../assets/data/exploreData'
import Navbar from '../component/navbar/Navbar'
import { logout, selectUser } from '../component/redux/UserSlice'
import { auth } from '../firebase'
import {useRef} from 'react';
import Exclusive from '../component/home/Exclusive'


export default function Home() {

  const dispatch = useDispatch();
  
  exploreData.map((item) => {
    console.log(item)
  })
  const ref = useRef(null);
  const handleClick = () => {
    
      window.scrollTo({
          top: window.innerHeight * 0.7,
          behavior: "smooth",
      });
  
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <Navbar />
      <div className="videoConatinerHome">
          <video
          className='videoHome'
           muted
           autoPlay
           loop
          >
            <source src='/video/1.mp4' />
          </video>
          <div className="overlayVideoHome">

          </div>
          <div className="videotext">
            <h1>Meta One</h1>
            <h2>the Metaverse for Experiences</h2>
            <motion.div 
            whileHover={{
              scale: 1.15,
              backgroundColor: "rgba(0, 0, 0)",
          }}
            className='starthomeButton'
            onClick={handleClick}
            >Start Now</motion.div>
          </div>
         
    
      </div>
      <div className="container">
            <Exclusive />
          </div>
        <style jsx>
      {`
       
      `}
      </style>
    </div>
  )
}
