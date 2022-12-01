import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../router/AuthContext'
import { LoadingPosts } from './LoadingCard'

const Userspaces = ({userData ,loading,displayName}) => {
  const [list ,setList] = useState([])



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
                  id:item.listid,
                  name:item.name.toUpperCase(),                 
                 },
                 
               }}>
               {/* <Link href={`spaces/0GVMd2Z0ctyFKNfqS9RQ?type=space`}> */}
              <div className='box-height-medium'>
               <Image priority src={item.img} layout='fill' alt='userImages' />
                <div className="exlusive-boxHeading">
                {
                    item.name.length > 23 ? 
                    <h3>{item.name.substring(0,23)}...</h3> :  <h3>{item.name}</h3>
                }
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
