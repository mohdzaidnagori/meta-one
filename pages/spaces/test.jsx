import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { Unityloader } from '../../component/loader/Unityloader';

const test = () => {
    setTimeout(() => {
        console.log('first')
        setTimeout(()=>{
         console.log('second')
         setTimeout(() => {
            console.log('third')
         }, 3000);
        },3000)
    }, 3000);
    return (
        <></>
    )

    
//     const { unityProvider,sendMessage,loadingProgression, isLoaded,addEventListener, removeEventListener } = useUnityContext({
//         loaderUrl: "/Build/unityJS.loader.js",
//         dataUrl: "/Build/unityJS.data",
//         frameworkUrl: "/Build/unityJS.framework.js",
//         codeUrl: "/Build/unityJS.wasm",
//       });
//       const loading = Math.round(loadingProgression * 100)

//       const unityModel = () => {
//         const unityData = {_id:'5s1l4XbAG5DHtc8UyO51',_type:'explore',}
//         const unityJson = JSON.stringify(unityData)
//         sendMessage("APICaller", "GameController", unityJson);
      
//       }
      
      
//       unityModel()
//   return (
//     <div className="unity-scene">
//         {!isLoaded && (
//         <Unityloader loading={loading} envirometname='test' />
//          )}
        
//         < Unity
//         unityProvider={unityProvider}
//         style={{ visibility: isLoaded ? "visible" : "hidden",width:'100%',height:'100%',overflow:'hidden' }}
//         />
//         </div> 
//   )
}

export default test