import Image from 'next/image'
import React from 'react'
import { exploreData } from '../../assets/data/exploreData'

const Exclusive = () => {
  return (
    <>
    <div className="exculsive">
    <div className="text-center exlusive-text-conatiner">
    <h1>Explore the Metaverse</h1>
    <p>Join thousands of users hosting virtual galleries and events in beautiful artist-built spaces</p>      
    </div>
      
        <div className="row g-3">
            
            {
             exploreData.map((item,index) => {
                return (
                <div key={index} className={item.class}>
               <div className={item.height}>
                 <Image src={item.img} layout='fill' alt='homeImages' />
                 <div className="exlusive-boxHeading">
                        <h3>{item.name}</h3>
                        <p>by {item.author}</p>
                 </div>
               </div>
               </div>
                )
             }) 
            }
        </div>
    </div>
    <style jsx>
      {`
      .exculsive{
        padding:30px 0px
       }
      `}
    </style>
    </>
  )
}

export default Exclusive
