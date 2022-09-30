import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai"
import { RiCameraFill } from "react-icons/ri"
import {BsMicMute,BsMic, BsCameraVideo, BsCameraVideoOff} from 'react-icons/bs'
import {GiPauseButton, GiPortal} from 'react-icons/gi'
import {FiPlay} from 'react-icons/fi'
import { IoExitOutline } from "react-icons/io5"
import { useAuth } from "../../component/router/AuthContext"
import { MdAdd, MdEmojiPeople, MdOutlineScreenShare, MdOutlineSpeakerNotes } from "react-icons/md"
import { BiDotsHorizontalRounded, BiHelpCircle, BiPencil } from "react-icons/bi"
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRef } from "react"
import { Unityloader } from "../../component/loader/Unityloader"
import Addcontent from "../../component/unity/Addcontent"
import axios from "axios"

const unity = () => {
 const { user } = useAuth()
 const query = useRouter()
 const span = useRef();
 const [buttons,setButtons] = useState({
    like:false,
    mic:false,
    count:120,
    play:false,
    videoCam:false
 })

 const [pathId,setPathId] = useState(query.Id)
 const [pathType,setPathType] = useState(query.type)
 const [pathName,setPathName] = useState('')
 const [inputName,setInputName] = useState('')
 const [ismodal,setIsmodal] = useState(false)


 const { unityProvider,sendMessage,loadingProgression, isLoaded } = useUnityContext({
  loaderUrl: "/Build/build.loader.js",
  dataUrl: "/Build/build.data",
  frameworkUrl: "/Build/build.framework.js",
  codeUrl: "/Build/build.wasm",
});
const loading = Math.round(loadingProgression * 100)




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
const micHandle = (type) => {
    
    if(type==='mic'){
      setButtons(prev => ({...prev, mic:!buttons.mic}))
    }
    if(type==='video'){
      setButtons(prev => ({...prev, videoCam:!buttons.videoCam}))
    }
}
const playHandle = () => {
    setButtons(prev => ({...prev, play:!buttons.play}))
} 
const nameHandle = (e) =>{
  setInputName(e.target.value)
}




const unityModel = () => {
  const unityData = {id:'5s1l4XbAG5DHtc8UyO51',type:'explore',}
  const unityJson = JSON.stringify(unityData)
  sendMessage("APICaller", "GameController", unityJson);
}

unityModel()
useEffect(()=>{
    if(!query.isReady) return;
    setPathName(query.query.name)
    setInputName(`${user.displayName}'s ${query.query.name}`)
    const url = `https://asia-south1-metaone-ec336.cloudfunctions.net/api/addnewSpacesInUser`
    const spaceObj = {
      newSpacesID:query.query.id,
      userID:user.uid
    }
    const userFetch = () => {
      console.log('ok')
    }
    // axios.post(url,spaceObj)
    // .then((res) => {
    //   console.log('suscess')
    // })
    // .catch((error)=>{
    //   console.error(error)
    // })
    userFetch()
    console.log('render')
    // codes using router.query
}, [query.isReady]);

const openModal = () => {
  setIsmodal(!ismodal)
}








   
 

 

  return (
    <div className="unity-scene-spaces">

      {ismodal && 
       <div className="newSpace">
        <Addcontent action={openModal} />
      </div> }  
        {
           isLoaded && (
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
                  <div className="unity-people-after" style=
                  {{
                    width:query.query.type === 'explore' ? 'max-content' : '100%'
                  }}>
                     {
                       query.query.type === 'spaces' ?
             
                     
                       <form>
                         <input
                      style={{ width: `${inputName.length}ch`,textAlign:'center'}}
                      onChange={nameHandle}
                       value={inputName}
                       type="text"
                       /> 
                       </form>

                       :query.query.name
                    }
                    {
                        query.query.type === 'spaces' &&
                       <span className="unity-people-pencil" style={{width: `${inputName.length}ch`}}><BiPencil /></span>
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
              <div onClick={() => micHandle('mic')} data-name={buttons.mic ? 'Turn of mic' : 'Turn on mic'} className="unity-flex-child unity-hover">
              { buttons.mic ?  <BsMic /> :<BsMicMute/> }
              </div>
              <div onClick={() => micHandle('video')} data-name={buttons.videoCam ? 'Turn of camera' : 'Turn on camera'} className="unity-flex-child unity-hover">
              { buttons.videoCam ?  <BsCameraVideo /> :<BsCameraVideoOff/> }
              </div>
            </div>
            <div className="unity-control">
             {
              query.query.type === 'explore' ? 
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
           : <div className="unity-bottom-center-flex">
            <div className="unity-bottom-center unity-hover" data-name="Sticky note"><MdOutlineSpeakerNotes /></div>
             <div className="unity-bottom-center unity-hover" data-name="Search or URL"><AiOutlineSearch /></div>
             <div onClick={openModal} className="unity-bottom-center unity-hover" data-name="Add content" style={{backgroundColor:'#28f'}}><MdAdd /></div>
             <div className="unity-bottom-center unity-hover" data-name="Add portal"><GiPortal /></div>
             <div className="unity-bottom-center unity-hover" data-name="Share screen"><MdOutlineScreenShare /></div>
           </div>
             }
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
           )
        }
        <div className="unity-scene">
        {!isLoaded && (
        <Unityloader loading={loading} envirometname={query.query.name} />
        )}
        < Unity
        unityProvider={unityProvider}
        style={{ visibility: isLoaded ? "visible" : "hidden",width:'100%',height:'100%',overflow:'hidden' }}
        />
        </div> 
       
    </div>
  
  )
}

export default unity



