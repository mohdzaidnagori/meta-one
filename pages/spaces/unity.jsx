import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineDeploymentUnit, AiOutlineHeart, AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai"
import { RiCameraFill } from "react-icons/ri"
import {BsMicMute,BsMic, BsCameraVideo, BsCameraVideoOff} from 'react-icons/bs'
import {GiPauseButton, GiPortal} from 'react-icons/gi'
import {FiPlay} from 'react-icons/fi'
import { IoExitOutline } from "react-icons/io5"
import { useAuth } from "../../component/router/AuthContext"
import { MdAdd, MdEmojiPeople, MdOutlineScreenShare, MdOutlineSpeakerNotes } from "react-icons/md"
import { BiDotsHorizontalRounded, BiHelpCircle, BiPencil } from "react-icons/bi"

import { Unity, useUnityContext } from "react-unity-webgl";
import { Unityloader } from "../../component/loader/Unityloader"
import Addcontent from "../../component/unity/Addcontent"
import { doc, getDoc, query, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import toast, { Toaster } from 'react-hot-toast';
import Sidabarunity from "../../component/unity/Sidabarunity";
import { useCallback } from "react"
import VideoSidebar from "../../component/unity/VideoSidebar"
import dynamic from "next/dynamic"
import { memo } from "react";
import { useSelector } from "react-redux";



export const Unitywrapper = () => {
  return (
    <h1>Zaid nagori unity wrapper</h1>
  )
}


export const Unitypage = ({children,enviroment,UploadData}) => {
 const { user } = useAuth()
 const query = useRouter()

 const [buttons,setButtons] = useState({
    like:false,
    mic:false,
    count:120,
    play:false,
    videoCam:true,
    open:false,
 })



//  const [pathId,setPathId] = useState(query.Id)
//  const [pathType,setPathType] = useState(query.type)
 const [pathName,setPathName] = useState('')
 const [inputName,setInputName] = useState('')
 const [ismodal,setIsmodal] = useState(false)
 const [pathId,setPathId] = useState('')
 const [data,setData] = useState({
  positionX:'0',
  positionY:'0',
  positionZ:'0',
  rotate:'0',
  scale:'0',
 })
 const [joinStream, setjoinStream] = useState(true)
 const [urlData,setUrlData] = useState({})
 const [videoCam ,setVideocam] = useState(false)






const isLoaded = true;





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
      // setButtons(prev => ({...prev, videoCam:!buttons.videoCam}))
      setVideocam(!videoCam)
      // setjoinStream(!joinStream)
    }
}
const playHandle = () => {
    setButtons(prev => ({...prev, play:!buttons.play}))
} 
const nameHandle = (e) =>{
  setInputName(e.target.value)
}
const submitInput = (e) => {
  e.preventDefault()
  // console.log(inputName)
  const docRef = doc(db, "spaces", query.query.id);
  const data = {
    name: inputName,
  };
  
  setDoc(docRef, data,{ merge:true })
  .then(docRef => {
    // console.log(docRef)
    toast.success('Name Update Succesfuuly')
  })
  .catch(error => {
    toast.error('Unexpected Error');
  })

}

 





useEffect( ()=>{
    if(!query.isReady) return;
    setPathName(query.query.name)
    setPathId(query.query.id)
    const dataExists = async () => {
      const docRef = doc(db, "spaces", query.query.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //  console.log("Document data:", docSnap.data());
         setInputName(docSnap.data().name)
      } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
      }
    }
    dataExists()
      // .catch(console.error);
     
     
    // codes using router.query
}, [query.isReady]);
// const handleTransform = useCallback((posData) => {
//     // setButtons(prev => ({...prev,open:show === 1 ? true : false}))
//      const objPosition = {
//       positionX:JSON.parse(posData).posX,
//       positionY:JSON.parse(posData).posY,
//       positionZ:JSON.parse(posData).posZ,
//       rotate:JSON.parse(posData).posRotate,
//       scale:JSON.parse(posData).posScale
//     }
//     setData(objPosition)
// },[]);
// useEffect(() => {
//   addEventListener("sendTransform", handleTransform);
//   return () => {
//     removeEventListener("sendTransform", handleTransform);
//   };
// },[handleTransform,addEventListener,removeEventListener])








const openModal = () => {
  setIsmodal(!ismodal)
}
const closedModalsidebar = (check) => {
  if(check === 'openPosition'){
    setButtons(prev =>(
      {
       ...prev,
       open:false
      }
       ))
  }
  if(check === 'openVideo'){
    // setButtons(prev =>(
    //   {
    //    ...prev,
    //    videoCam:false
    //   }
    //    ))
    setVideocam(false)
  }
  
}
const searchhandle = () => {
  
}
const sidebarVariants = {
  sidebarOpen: {
    width: "350px",
  },

  sidebarClosed: {
    width: "",
  },
};
const getUploadData = (res) => {
  UploadData(res)
}
useEffect(() => {
  // console.log(urlData)
  getUploadData(urlData)
  // console.log(urlData.data?.url)
},[urlData])









   
 

 

  return (
    <div className="unity-scene-spaces">
    <Toaster />
        <div className='SidebarBox-unity'>
        {/* <Sidabarunity sendMessage={sendMessage}  data={data}   open={buttons.open} closedModal={() => closedModalsidebar('openPosition')} /> */}
        </div>
        <div className='SidebarBox-unity-top-left'>
      <motion.div 
          variants={sidebarVariants}
          animate={videoCam ? "sidebarOpen" : "sidebarClosed"}
          className='sidbarBoxunity sidbarBoxunity-border'>
            <div className="sidebar-container">
              {
                joinStream ? 
                children
                : ''
              }
             
            </div>
         <div className="sidebar-container">
           <div className="sidebar-button-submit">
             <button onClick={() => closedModalsidebar('openVideo')} className="sidebar-button">done</button>
           </div>
         </div>
      </motion.div> 
        {/* <VideoSidebar  username={pathName} pathId={pathId} open={buttons.videoCam} closedModal={() => closedModalsidebar('openVideo')} /> */}
         </div>
      {ismodal && 
       <div className="newSpace">
        <Addcontent action={openModal} Urldata={(urlData) =>  setUrlData(urlData)} spaceId={query.query.id} />
      </div> }  
        {
           isLoaded && (
            <div className="unity-interaction-container">
            <div className="unity-interactions">
                 <div className="unity-leave">
            
                 </div>
               
                <div className="unity-people">
                  <div className="unity-flex-child">
                  <div className="unity-people-after" style=
                  {{
                    width:query.query.type === 'explore' ? 'max-content' : '100%'
                  }}>
                     {
                       query.query.type === 'spaces' ?
             
                     
                       <form onSubmit={submitInput}>
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
                      <Image className="space-avtar-img" src={user.photoUrl}  priority={true} layout='fill' alt="avatarImages"/>
                      :
                      <Image src='/images/login-images/thumbnail.png'  priority={true} layout='fill'  alt="thumbnailImages" />
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
            <div className="unity-leave" onClick={() => micHandle('video')}>
            <div className="unity-flex-child">
            <span>Stream</span> <span className="exit-rotate-unity"><AiOutlineDeploymentUnit /> </span> 
                </div>
              {/* <div onClick={() => micHandle('video')} data-name={buttons.videoCam ? 'Turn of camera' : 'Turn on camera'} className="unity-flex-child unity-hover">
              { videoCam ?  <BsCameraVideo /> :<BsCameraVideoOff/> }
              </div>  */}
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
            <div
            onClick={() => setButtons(prev =>(
              {
               ...prev,
               open:!buttons.open
              }
               ))
             }
             className="unity-bottom-center unity-hover" data-name="Sticky note Coming soon"><MdOutlineSpeakerNotes /></div>
             <div onClick={searchhandle} className="unity-bottom-center unity-hover" data-name="Search or URL Coming soon"><AiOutlineSearch /></div>
             <div onClick={openModal} className="unity-bottom-center unity-hover" data-name="Add content" style={{backgroundColor:'#28f'}}><MdAdd /></div>
             <div className="unity-bottom-center unity-hover" data-name="Add portal Coming soon"><GiPortal /></div>
             <div className="unity-bottom-center unity-hover" data-name="Share screen Coming soon"><MdOutlineScreenShare /></div>
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
         {enviroment}

        </div> 
       
    </div>
  
  )
}
export const UnityEnviroment = ({data}) => {
  const notes = useSelector((state) => state.notes.notes);
  const query = useRouter()
 const { unityProvider,sendMessage,loadingProgression, isLoaded,addEventListener, removeEventListener } = useUnityContext({
  loaderUrl: "/Build/meta-one-V1.loader.js",
  dataUrl: "/Build/meta-one-V1.data",
  frameworkUrl: "/Build/meta-one-V1.framework.js",
  codeUrl: "/Build/meta-one-V1.wasm",
});
const loading = Math.round(loadingProgression * 100)
const  EnvironmentLoader = () => {
  const unityData = {id:'DmoakA7G6EMESqE52vUK',type:'spaces',}
  const unityJson = JSON.stringify(unityData)
  sendMessage("EnvironmentLoader", "MainModel", unityJson);

}
EnvironmentLoader()

const  ModelLoader = () => {
  const unityData = {id:'5s1l4XbAG5DHtc8UyO51',type:'spaces',}
  const unityJson = JSON.stringify(unityData)
  sendMessage("ModelLoader", "OtherModel", unityJson);

}
ModelLoader()

const  CreateAndJoinRooms = () => {
  const unityData = {roomId:query.query.id,playerName:query.query.displayName,}
  const unityJson = JSON.stringify(unityData)
  sendMessage("CreateAndJoinRooms", "GetRoomData", unityJson);

}
CreateAndJoinRooms()

// GameObject And Class Name : ImageLoader / Function Name : ImgLoader

const ImageUploader = () => {
  const unityData = {id:notes[notes.length -1]?.id,url:notes[notes.length -1]?.url}
  const unityJson = JSON.stringify(unityData)
  sendMessage("ImageLoader", "ImgLoader", unityJson);
}
ImageUploader()
const reduxfn = (res) => {
  console.log(res.length)
}
useEffect(() => {
reduxfn(notes)
},[notes])

return (
  <>
  {!isLoaded && (
        <Unityloader loading={loading} envirometname={query.query.name} />
         )}
        
        < Unity
        unityProvider={unityProvider}
        style={{ visibility: isLoaded ? "visible" : "hidden",width:'100%',height:'100%',overflow:'hidden' }}
        />
        {/* <h1>{notes[notes.length -1]?.id}</h1>
         <h1>{notes[1]?.url}</h1>
        <h1>{notes[0]?.id}</h1> */} 
  </>
)
}

const Wrapper = () => {
  const App = dynamic(import('../../component/agora/VideoCall'), { ssr:false });
  const query = useRouter()
  const [data,setdata] = useState({})

const AppMemo = memo(App);

const fnUploadData = (UploadData) => {
   setdata(UploadData)
}


// console.log(data)




  return (
    <>
   
    <Unitypage enviroment={<UnityEnviroment data={fnUploadData} />} UploadData={(UploadData) =>  fnUploadData(UploadData)} children={<AppMemo channelName={query.query.name} />} />
    </>
  )
}
export default Wrapper



