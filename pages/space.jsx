import Image from "next/image"
import { useAuth } from "../component/router/AuthContext"
import { modalLink } from "../assets/data/modalLink"
import Link from "next/link"
import { auth } from "../firebase"
import {  useState } from "react"
import { motion } from "framer-motion";
import { IoEarth } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import Card from "../component/card/Card"
import LoadingCard, { LoadingPosts } from "../component/card/LoadingCard"




const NUM_PER_PAGE = 6;
const TOTAL_PAGES = 3;


const space = () => {
  const { user } = useAuth()
  const [active,setActive] = useState(false)
  const [isswitch,setisSwitch] = useState(true)

  const handleLogout = () => {
      auth.signOut()
     console.log('logout')
  }
  const modalOpen = () => {
    setActive(!active)
  }
  console.log(active)
 
  const dropIn = {
    hidden: {
      scale:0.8,
      opacity: 0,
    },
    visible: {
      scale:1,
      opacity: 1,
      transition: {
        default: {
          duration: 0.1,
          ease: [0, 0.71, 0.2, 1.01]
        },
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
        }
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  const explorehandle = () => {
    setisSwitch(true)
  }
  const spacehandle = () => {
    setisSwitch(false)
  }

  

  return (
    <>
      <div className="container">
         <div className="space-container">
          <div className="modal-button-conatiner">
            <div onClick={modalOpen} className="modal-space-button">
                  <div className="bg-info rounded-circle image-space">
                    {
                      user.photoUrl ?
                      <Image className="space-avtar-img" src={user.photoUrl} layout='fill'/>
                      :
                      <Image src='/images/login-images/thumbnail.png' layout='fill' />
                    }
                  </div>
                  <h5>{user.displayName}</h5>
                  {
                    active && 
                    <motion.div
                     className="modal-space-open"
                     variants={dropIn}
                     initial="hidden"
                     animate="visible"
                     exit="exit"
                     >
                      <div className="open-modal-avatar">
                      <div className="bg-info rounded-circle image-space image-space-big">
                        {
                      user.photoUrl ?
                      <Image className="space-avtar-img" src={user.photoUrl} layout='fill'/>
                      :
                      <Image src='/images/login-images/thumbnail.png' layout='fill' />
                        }
                     </div>
                       <h5>{user.displayName}</h5>
                    </div>
                    <hr style={{margin:'0 40px'}} />
                    <div className="modal-space-a">
                      {
                         modalLink.map((item) => {
                           return (
                              <Link key={item.path} href={item.path}>
                                <a>{item.name}</a>
                              </Link>                 
                           )
                         })
                      }                    
                    </div>
                    <hr style={{margin:'0 40px'}} />
                    <div className="modal-space-a">
                      <a onClick={handleLogout}>LOGOUT</a>
                    </div>
                  </motion.div>
                  }
            </div>
            </div>
            <div className="space-container-main">
            <div className="spaces-container">
              <div className="spaces-heading">
                <h2>spaces</h2>
              </div>
              <div className="spaces-menu">
                   <div className="spaces-search">
                    Lorem ipsum dolor sit.
                    </div>
                    <div className="spaces-switch">
                      <div onClick={explorehandle} className={isswitch ?  'spaces-explore-button switch' :'spaces-explore-button' }>
                          <span><IoEarth /></span>
                          <p>Explore</p>
                      </div>
                      <div onClick={spacehandle} className={!isswitch ?  'spaces-explore-button switch' :'spaces-explore-button' }>
                          <span><BiUser /></span>
                          <p>Spaces</p>
                      </div>
                    </div>  
                      <div className="spaces-new">
                      Lorem ipsum dolor sit.
                    </div>        
              </div>
              {
              isswitch ? 
              <div className="spaces-explore">
               <div className="spaces-explore-small">
               <Card />
               </div>
              </div>
              :
              <div className="spaces-explore">
                 <div className="spaces-explore-small">
                    <LoadingPosts />
                 </div>
              </div>
              }

            </div>
            </div>
           
         </div>
      </div>
    </>
  )
}

export default space

