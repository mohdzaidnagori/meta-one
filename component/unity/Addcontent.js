import React, { useState } from 'react'
import { motion } from "framer-motion";
import { AiOutlineClose } from 'react-icons/ai';
import Filedragdrop from './Filedragdrop';
import axios from 'axios';

const Addcontent = ({action,spaceId}) => {
    const [ToggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };
      const getActiveClass = (index, className) => {
          return ToggleState === index ? className : "";
      }
     

    const dropIn = {
        hidden: {
          scale:0.7,
          opacity: 0,
        },
        visible: {
          scale:1,
          opacity: 1,
          transition: {
            default: {
              duration: 0.1,
              ease: [0, 0.71, 0.8, 1]
            },
            scale: {
              duration: 0.2, type: "tween"
            }
          },
        }
      };
      const onUpload = async (files) => {
        console.log(files);
        const url = `https://asia-south1-metaone-ec336.cloudfunctions.net/api/addSpaceObject`
        const data = new FormData()
        data.append('file',files)
        data.append('spaceId',spaceId)
        data.append('name','zaid House')
        data.append('position',"{x:0.y:0.z:0}")
        data.append('rotation','{x:0.y:0.z:0}')
        data.append('scale','{x:1.y:1.z:1}')
        
        await axios.post(url,data,{
          headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            //handle success
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
        console.log(data)
      };
      const formats = ['txt','jpg','png','glb']



  return (
    <motion.div
    className="space-modal add-content-modal"
    variants={dropIn}
    initial="hidden"
    animate="visible"
    >
    <div className='add-tabs-container'>
        <button onClick={() => toggleTab(1)} className={`add-tabs-button ${getActiveClass(1,"tabs-button-active")}`}>RECENT</button>
        <button onClick={() => toggleTab(2)} className={`add-tabs-button ${getActiveClass(2,"tabs-button-active")}`}>STUFF</button>
        <button onClick={() => toggleTab(3)} className={`add-tabs-button ${getActiveClass(3,"tabs-button-active")}`}>NFTS</button>
        <button onClick={() => toggleTab(4)} className={`add-tabs-button ${getActiveClass(4,"tabs-button-active")}`}>INTEGRATIONS</button>
        <button onClick={() => toggleTab(5)} className={`add-tabs-button ${getActiveClass(5,"tabs-button-active")}`}>UPLOAD</button>
    </div>
    <div className='add-tabs-area-container'>
       <div className={`content ${getActiveClass(1,'active-content')}`}>content1</div>
       <div className={`content ${getActiveClass(2,'active-content')}`}>content2</div>
       <div className={`content ${getActiveClass(3,'active-content')}`}>content3</div>
       <div className={`content ${getActiveClass(4,'active-content')}`}>content4</div>
       <div className={`content upload ${getActiveClass(5,'active-content')}`}>
          <Filedragdrop
           toggleoff={action}
           onUpload={onUpload}
           count={1}
           formats={formats}
            />
       </div>
    </div>
    <div onClick={action} className="space-modal-close 1"><AiOutlineClose /></div>
    </motion.div>
  )
}

export default Addcontent






