import { useEffect, useState } from "react"
import Image from 'next/image'
import { useRouter } from "next/router"
import Link from "next/link"
import { motion } from "framer-motion"

const Navbar = () => {
    const [navbar ,setNavbar]  = useState(false)
    const router = useRouter()
    const changeBackground = () => {
        if (window.scrollY >= window.innerHeight * 0.60) {
          setNavbar(true)
        } else {
          setNavbar(false)
        }
      }
      useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
      })
  return (
    <>
      
    
      <div className={navbar ? 'navbar active' : 'navbar'}>
          <div className="logo">
            <h3>Meta One</h3>
          </div>
          <div className="navLink">
            <a>Community</a>
            <a>Pricing</a>
            <a>Support</a>
            <a>NFTs</a>
            <Link href='/login'>
            <motion.a whileHover={{ scale: 1.1 }} className="navLogin">Login</motion.a>
            </Link>
          </div>
      </div>
      <style jsx>
      {`
       .navbar{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height: 68px;
        transition: all ease 0.3s;
        color: white;
        display: flex;
        align-items: center;
        padding: 0 20px;
        z-index: 1000;
       }
       .active{
         background:black;
       }
       .navbar .logo h3{
        font-size: 24px;
        text-transform: uppercase;
        font-weight: bold;
        font-family: sans-serif;
        margin-top: 10px;
       }
     
      
      `}
      </style>
    </>
  )
}

export default Navbar
