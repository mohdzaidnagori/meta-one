import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../router/AuthContext'
import { LoadingPosts } from './LoadingCard'

const Userspaces = ({userData ,loading}) => {

    console.log(userData.length > 0 ? 'data  avil' : 'data not avail')

  return (
    <>
    {
     !loading ?
   <div 
      id="scrollableDiv"
      className='infinite-scroll-div'
      style={{
        overflow: 'auto',
      }}>
      <div className='infine-scroll-padding'>
    {
     userData.length > 0 ? 
     <div className="row g-3" style={{paddingBottom:'30px'}}>
       {
         userData.map((item,index) => {
           return (
           <div key={index} className='col-md-6'>
             <Link href={{
                pathname: '/spaces/unity',
                query: { 
                  type: 'spaces',
                  id:item.id,
                  name:item.name.toUpperCase()
                 },
               }}>
              <div className='box-height-medium'>
               <Image priority src={item.img} layout='fill' alt='userImages' />
                <div className="exlusive-boxHeading">
                   <h3>{item.name}</h3>
                   <p>by {item.author}</p>
                </div>
          </div>
               </Link>
          </div>
          
           )
        }) 
       }
        </div>
        : 
        <div className='No-available-data'>No Data Available</div>
    }
    </div>
    </div>
     : <LoadingPosts />
    }
    </>
    
  )
}

export default Userspaces
