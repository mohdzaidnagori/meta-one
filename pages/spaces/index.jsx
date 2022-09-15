import Image from "next/image"
import { useAuth } from "../../component/router/AuthContext"
import { modalLink } from "../../assets/data/modalLink"
import Link from "next/link"
import { auth } from "../../firebase"
import {  useState } from "react"
import { motion } from "framer-motion";
import { IoEarth } from "react-icons/io5";
import { BiSearch, BiUser,BiPlus } from "react-icons/bi";
import {MdCancel} from 'react-icons/md'
import Card from "../../component/card/Card"
import Serach from "../../component/card/Serach"
import {BiArrowBack} from "react-icons/bi";
import axios from "axios"
import Userspaces from "../../component/card/Userspaces"
import { useRouter } from "next/router"
import Newspace from "../../component/card/Newspace"






const Space = () => {
  const { user } = useAuth()
  const [active,setActive] = useState(false)
  const [isswitch,setisSwitch] = useState('true')
  const [searchData,setSearchData] = useState("")
  const [arrowVisible,setArrowVisible] = useState(false)
  const [searchResult,setSearchResult] = useState([])
  const [userSpace,setUserSpace] = useState({userspaces :[],loading:true})
  const {query} = useRouter()


  

  const handleLogout = () => {
      auth.signOut()
     console.log('logout')
  }
  const modalOpen = () => {
    setActive(!active)
  }

 
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
    setisSwitch('true')
  }
  const spacehandle = () => {
    setisSwitch('false')

    const apiPath = `https://asia-south1-metaone-ec336.cloudfunctions.net/api/userSpaces/${user.uid}`

    axios.get(apiPath)
    .then((res)=>{
        setUserSpace(
            {
             userspaces:res.data,
             loading:false
            }
        )
    })
    .catch((error)=>{
        console.error('error',error)
    })
  }
  const serachhandle = (e) => {
    e.preventDefault()
    if(searchData === ''){
      alert('blank')
      return;
    }
    const capitalize = searchData.charAt(0).toUpperCase() + searchData.slice(1)
    const url = `https://asia-south1-metaone-ec336.cloudfunctions.net/api/serchSpaces/${capitalize}`
    axios.get(url)
    .then((res)=>{
      setSearchResult(res.data)
    })
    .catch((err)=>{
      console.error('error',err)
    })
    setisSwitch('search')
    setArrowVisible(true)

   
  }



  

  return (
    <>
      <div className="container">
         <div className="space-container">
          {
            query.create && <Newspace />
          }
          <div className="modal-button-conatiner">
            <div onClick={modalOpen} className="modal-space-button">
                  <div className="bg-info rounded-circle image-space">
                    {
                      user.photoUrl ?
                      <Image className="space-avtar-img" src={user.photoUrl} layout='fill' alt="avatarImages" />
                      :
                      <Image src='/images/login-images/thumbnail.png' layout='fill' alt="thumbnailImages" />
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
                      <Image className="space-avtar-img" src={user.photoUrl} layout='fill' alt="avatarImages" />
                      :
                      <Image src='/images/login-images/thumbnail.png' layout='fill' alt="thumbnailImages" />
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
              <div className="spaces-menu infine-scroll-padding">
                <div className="spaces-search-flex">
                   <div className="spaces-search">
    
                      {
                      arrowVisible
                      ?
                      <span onClick={() =>  (setisSwitch('true'),
                      setArrowVisible(false))}>
                      <BiArrowBack />
                      </span>
                      :
                      <span>
                      <BiSearch />
                      </span>
                      }
                      
                    <form>
                      <input 
                      type="text"
                       placeholder="Search"
                       value={searchData}
                       onChange={(e) => setSearchData(e.target.value)}
                        />
                      <button onClick={(e) => serachhandle(e)}></button>
                    </form>
                    <span onClick={() => setSearchData("")} className="search-cancel"><MdCancel /></span>
                  
                    </div>
                    </div>
                    {
                      !arrowVisible &&
                      <div className="spaces-switch-flex">
                      <div className="spaces-switch">
                      <div onClick={explorehandle} className={isswitch === 'true' ?  'spaces-explore-button switch' :'spaces-explore-button' }>
                          <span><IoEarth /></span>
                          <p>Explore</p>
                      </div>
                      <div onClick={spacehandle} className={isswitch !== 'true' && isswitch !== 'search' ?  'spaces-explore-button switch' :'spaces-explore-button' }>
                          <span><BiUser /></span>
                          <p>Spaces</p>
                      </div>
                    </div> 
                    </div> 
                    }
                    {
                    !arrowVisible && 
                    <div  className="spaces-new-flex">
                      <Link  href={{
                               pathname: '/spaces',
                               query: { create: 'true' },
                             }}>
                         <div className="spaces-new">
                            <span className="space-add-icons"> <BiPlus/> </span> New Space
                         </div>
                         </Link> 
                      
                     </div> 
                        
                    }
                 
                            
              </div>
              {
              isswitch === 'true' ? 
              <div className="spaces-explore">
               <div className="spaces-explore-small">
               <Card />
               </div>
              </div>
              : 
              isswitch === 'false' 
              ?
              <div className="spaces-explore">
                 <div className="spaces-explore-small">
                    <Userspaces loading ={userSpace.loading} userData={userSpace.userspaces}/>
                 </div>
              </div>
              :
              isswitch === 'search'
              ?
              <div className="spaces-explore">
              <div className="spaces-explore-small">
                 <Serach data={searchResult} />
              </div>
              </div>
              :
              'error'
              }

            </div>
            </div>
           
         </div>
        
        
      </div>
    </>
  )
}

export default Space
