import React, { useState } from 'react'
import { motion } from "framer-motion";
import Range from './Range';
import { useEffect } from 'react';

const Sidabarunity = ({open,closedModal,data,sendMessage}) => {
// console.log(open)
  const [count ,setCount] = useState({
    positionX:0,
    positionY:0,
    positionZ:0,
    rotate:0,
    scale:1
  })
  
  const sidebarVariants = {
    sidebarOpen: {
      width: "350px",
    },
  
    sidebarClosed: {
      width: "",
    },
  };
// useEffect(() => {
//   setCount(data)
// },[data])

 

  const resethandle = (index) => {
     if(index === 'position'){
      setCount(prev => ({
        ...prev,
        positionX:0,
        positionY:0,
        positionZ:0})) 
     }
     if(index === 'rotation'){
      setCount(prev => ({...prev,rotate:0,})) 
     }
     if(index === 'scale'){
      setCount(prev => ({...prev,scale:0})) 
     }
  }
  // sendMessage("ModelTransform","ChangeXAxis",count.positionX)

// console.log(JSON.stringify(count.positionX))
  const rangehandle = (e,index) => {
    if(index === 'positionX'){
      setCount(prev => ({...prev,positionX:e.target.value}))
    }
    if(index === 'positionY'){
      setCount(prev => ({...prev,positionY:e.target.value}))
      sendMessage("ModelTransform","ChangeYAxis",e.target.value)
    }
    if(index === 'positionZ'){
      setCount(prev => ({...prev,positionZ:e.target.value}))
    }
    if(index === 'scale'){
      setCount(prev => ({...prev,scale:e.target.value}))
    }
    if(index === 'rotate'){
      setCount(prev => ({...prev,rotate:e.target.value}))
    }
  }
  useEffect(() => {
    sendMessage("ModelTransform","ChangeXAxis",~~count.positionX)
    sendMessage("ModelTransform","ChangeYAxis",parseInt(count.positionY))
    sendMessage("ModelTransform","ChangeZAxis",~~count.positionZ)
    sendMessage("ModelTransform","ChangeRotation",~~count.rotate)
    sendMessage("ModelTransform","ChangeScale",~~count.scale)
  },[count])
  // console.log(count)



  return (
    <motion.div 
    variants={sidebarVariants}
    animate={open ? "sidebarOpen" : "sidebarClosed"}
    className='sidbarBoxunity'>
   
     <div className="sidebar-width-container">
     <div className="sidebar-container">
        <div className="sidebarPosition-heading">
          <p>Position</p>
          <span onClick={() => resethandle('position')}>Reset</span>
        </div>
        <div className="sidebar-range">
          <span>x</span>
          <Range min={-100} max={100} handleChange={e => rangehandle(e,'positionX')} value={count.positionX} />
        </div>
        <div className="sidebar-range">
          <span>y</span>
          <Range min={-100} max={100} handleChange={e => rangehandle(e,'positionY')} value={count.positionY} />
        </div>
        <div className="sidebar-range">
          <span>z</span>
          <Range min={-100} max={100} handleChange={e => rangehandle(e,'positionZ')} value={count.positionZ} />
        </div>
    </div>
    <div className="sidebar-container">
        <div className="sidebarPosition-heading">
          <p>Rotation</p>
          <span onClick={() => resethandle('rotation')}>Reset</span>
        </div>
        <div className="sidebar-range">
          <Range min={-180} max={180} handleChange={e => rangehandle(e,'rotate')} value={count.rotate} />
        </div>
    </div>
    <div className="sidebar-container">
        <div className="sidebarPosition-heading">
          <p>Scale</p>
          <span onClick={() => resethandle('scale')}>Reset</span>
        </div>
        <div className="sidebar-range">
          <Range min={0} max={100} handleChange={e => rangehandle(e,'scale')} value={data.scale || 0} />
        </div>
    </div>
    <div className="sidebar-container">
       <div className="sidebar-button-submit">
        <button onClick={closedModal} className="sidebar-button">done</button>
       </div>
    </div>
     </div>
    </motion.div>
  )
}

export default Sidabarunity
