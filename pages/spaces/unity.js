import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineLeft, AiOutlineRight, AiOutlineUserAdd } from "react-icons/ai"
import { RiCameraFill } from "react-icons/ri"
import {BsMicMute,BsMic} from 'react-icons/bs'
import {GiPauseButton} from 'react-icons/gi'
import {FiPlay} from 'react-icons/fi'
import { IoExitOutline } from "react-icons/io5"
import { useAuth } from "../../component/router/AuthContext"
import { MdEmojiPeople } from "react-icons/md"
import { BiDotsHorizontalRounded, BiHelpCircle, BiPencil } from "react-icons/bi"
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRef } from "react"

const unity = () => {
 const { user } = useAuth()
 const query = useRouter()
 const span = useRef();
 const [buttons,setButtons] = useState({
    like:false,
    mic:false,
    count:120,
    play:false
 })

 const [visibleName,setVisibleName] = useState(true)
 const [pathId,setPathId] = useState(query.Id)
 const [pathType,setPathType] = useState(query.type)
 const [pathName,setPathName] = useState('')
 const [inputName,setInputName] = useState(user.displayName)
 const [width, setWidth] = useState(0);

//  const { unityProvider,sendMessage,loadingProgression, isLoaded } = useUnityContext({
//   loaderUrl: "/Build/build.loader.js",
//   dataUrl: "/Build/build.data",
//   frameworkUrl: "/Build/build.framework.js",
//   codeUrl: "/Build/build.wasm",
// });




 const likeHandle = () => {
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
const nameHandle = (e) =>{
  setInputName(e.target.value)
}
const nameClick = () => {
  setVisibleName(false)
}



// const unityModel = () => {
//   const unityData = {id:'5s1l4XbAG5DHtc8UyO51',type:'explore',}
//   const unityJson = JSON.stringify(unityData)
//   sendMessage("APICaller", "GameController", unityJson);
// }
useEffect(()=>{
    if(!query.isReady) return;
    setPathName(query.query.name)
    setInputName(`${user.displayName} ${query.query.name}`)
    setWidth(span.current.offsetWidth);
    // codes using router.query

}, [query.isReady,inputName]);
console.log(width)







   
 

 

  return (
    <div className="unity-scene-spaces">
        <div className="unity-interaction-container">
            <div className="unity-interactions">
                <Link href={query.query.type === 'spaces' ? '/spaces?create=true' : '/spaces'}>
                 <div className="unity-leave">
                    <div className="unity-flex-child">
                       <span className="exit-rotate-unity"><IoExitOutline /> </span> <span>LEAVE</span>
                    </div>
                 </div>
                </Link>
                <div className="unity-people">
                  <div className="unity-flex-child">
                  <div className="unity-people-after">
                     {/* <div className="unity-people-name">
                     { visibleName === true ?
                       query.type === 'spaces' ?
                       `${user.displayName}'s ${query.name}`
                       : query.name
                       : ''
                     } 
                     </div> */}
                     {
                       query.query.type === 'spaces' ?
                       <>
                       <span id="hide" style={{position: 'absolute',opacity: '0'}} ref={span}>{inputName}</span>
                      <input
                      onClick={nameClick}
                      style={{ width }}
                      onChange={nameHandle}
                       value={inputName}
                       type="text" /> 
                       </>
                       :query.query.name
                    }
                    {
                       visibleName && <span className="unity-people-pencil"><BiPencil /></span>
                    }
                   
                     
                  </div>
                  
                 
                  <div className="bg-info rounded-circle image-space unity-avatar-border">
                    {
                      user.photoUrl ?
                      <Image className="space-avtar-img" src={user.photoUrl} layout='fill' alt="avatarImages"/>
                      :
                      <Image src='/images/login-images/thumbnail.png' layout='fill'  alt="thumbnailImages" />
                    }
                  </div>
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
        {/* {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
        )}
        <Unity
        unityProvider={unityProvider}
        style={{ visibility: isLoaded ? "visible" : "hidden",width:'100%',height:'100%',overflow:'hidden' }}
        /> */}
        </div>
    </div>
  )
}

export default unity



