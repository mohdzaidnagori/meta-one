import React from 'react'
import { motion } from "framer-motion";
import dynamic from 'next/dynamic'
const VideoSidebar = ({open,closedModal,pathId,username}) => {
    const sidebarVariants = {
        sidebarOpen: {
          width: "350px",
        },
      
        sidebarClosed: {
          width: "",
        },
      };

  return (
    <motion.div 
    variants={sidebarVariants}
    animate={open ? "sidebarOpen" : "sidebarClosed"}
    className='sidbarBoxunity sidbarBoxunity-border'>
           <div className="sidebar-container">
            <Videocall channelName={pathId} username={username} />
           </div>
         <div className="sidebar-container">
       <div className="sidebar-button-submit">
        <button onClick={closedModal} className="sidebar-button">done</button>
       </div>
       
    </div>
    </motion.div>
  )
}

export default VideoSidebar
