import React, { useState } from 'react'
import { motion } from "framer-motion";
import { AiOutlineClose } from 'react-icons/ai';
import Filedragdrop from './Filedragdrop';

const Addcontent = ({action}) => {
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
      const onUpload = (files) => {
        console.log(files);
        const url = `https://asia-south1-metaone-ec336.cloudfunctions.net/api/addSpaceObject`
        const data = new FormData()
        data.append('file',files[0])
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
    <div onClick={action} className="space-modal-close"><AiOutlineClose /></div>
    </motion.div>
  )
}

export default Addcontent




// const Tab = () => {
//   const [ToggleState, setToggleState] = useState(1);

//   const toggleTab = (index) => {
//     setToggleState(index);
//   };

//   const getActiveClass = (index, className) =>
//     ToggleState === index ? className : "";

//   return (
//     <div className="container">
//       <ul className="tab-list">
//         <li
//           className={`tabs ${getActiveClass(1, "active-tabs")}`}
//           onClick={() => toggleTab(1)}
//         >
//           Tab 1
//         </li>
//         <li
//           className={`tabs ${getActiveClass(2, "active-tabs")}`}
//           onClick={() => toggleTab(2)}
//         >
//           Tab 2
//         </li>
//         <li
//           className={`tabs ${getActiveClass(3, "active-tabs")}`}
//           onClick={() => toggleTab(3)}
//         >
//           Tab 3
//         </li>
//       </ul>
//       <div className="content-container">
//         <div className={`content ${getActiveClass(1, "active-content")}`}>
//           <h2>Lorem</h2>
//         </div>
//         <div className={`content ${getActiveClass(2, "active-content")}`}>
//           <h2>Ipsum</h2>
//         </div>
//         <div className={`content ${getActiveClass(3, "active-content")}`}>
//           <h2>Dolor</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

