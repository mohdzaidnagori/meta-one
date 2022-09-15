import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineLeft, AiOutlineRight, AiOutlineUserAdd } from "react-icons/ai"
import { RiCameraFill } from "react-icons/ri"
import {BsMicMute,BsMic} from 'react-icons/bs'
import {GiPauseButton} from 'react-icons/gi'
import {FiPlay} from 'react-icons/fi'
import { IoExitOutline } from "react-icons/io5"
import { useAuth } from "../../component/router/AuthContext"
import { MdEmojiPeople } from "react-icons/md"
import { BiDotsHorizontalRounded, BiHelpCircle } from "react-icons/bi"

const Unity = () => {
 const { user } = useAuth()
 const {query} = useRouter()
 const [buttons,setButtons] = useState({
    like:false,
    mic:false,
    count:120,
    play:false
 })
 console.log(buttons)

 const likeHandle = () => {
    console.log(buttons.like)
    if(!buttons.like){
        setButtons(prev =>(
            {
             ...prev,
             count:buttons.count+1,
             like:true
            }
             ))
        }
    else{
        setButtons(prev =>(
            {
             ...prev,
             count:buttons.count-1,
             like:false
            }
             ))
    }
 }
const micHandle = () => {
    
    setButtons(prev => ({...prev, mic:!buttons.mic}))
}
const playHandle = () => {
    setButtons(prev => ({...prev, play:!buttons.play}))
} 

  return (
    <div className="unity-scene-spaces">
        <div className="unity-interaction-container">
            <div className="unity-interactions">
                <Link href='/spaces'>
                 <div className="unity-leave">
                    <div className="unity-flex-child">
                       <span className="exit-rotate-unity"><IoExitOutline /> </span> <span>LEAVE</span>
                    </div>
                 </div>
                </Link>
                <div className="unity-people">
                  <div className="unity-flex-child" data-name={query.name}>
                  <div className="bg-info rounded-circle image-space unity-avatar-border">
                    {
                      user.photoUrl ?
                      <Image className="space-avtar-img" src={user.photoUrl} layout='fill' alt="avatarImages"/>
                      :
                      <Image src='/images/login-images/thumbnail.png' layout='fill'  alt="thumbnailImages" />
                    }
                  </div>
                  {/* <h4>{query.name}</h4> */}
                  </div>  
                </div>
                <div className="unity-like">
                  <div className="unity-flex-child">
                      <div className="like">
                         <span className={buttons.like ? "like-red" : ''} onClick={likeHandle}>
                            {
                              buttons.like ? <AiFillHeart/> : <AiOutlineHeart /> 
                            }
                         </span> {buttons.count}
                      </div>
                      <div className="camera">
                        <RiCameraFill />
                      </div>
                      <div className="camera">
                        <AiOutlineUserAdd />
                      </div>
                  </div> 
                </div>
            </div>
            <div className="unity-interactions">
            <div className="unity-mic">
              <div onClick={micHandle} className="unity-flex-child">
              { buttons.mic ?  <BsMic /> :<BsMicMute/> }
              </div>
            </div>
            <div className="unity-control">
              <div className="unity-flex-child">
                 <span><AiOutlineLeft /></span>
                 <span className="unity-play" onClick={playHandle}>
                 {
                    buttons.play
                    ? 
                    <GiPauseButton />
                    :
                    <FiPlay/>
                 }
                 </span>
                 <span><AiOutlineRight /></span>
              </div>
            </div>
            <div className="unity-help">
              <div className="unity-flex-child">
                 <span><MdEmojiPeople /></span>
                 <span><BiHelpCircle /></span>
                 <span><BiDotsHorizontalRounded /></span>
              </div>
            </div>
            </div>
        </div>
        <div className="unity-scene">
            
        </div>
    </div>
  )
}

export default Unity



