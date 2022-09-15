import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../router/AuthContext'
import { LoadingPosts } from './LoadingCard'

const Userspaces = ({userData ,loading}) => {
    // const [userSpace,setUserSpace] = useState(
    //     {
    //       userspaces :[],
    //       loading:true
    //     }
    //     )
    // const { user } = useAuth()

    // const apiPath = `https://asia-south1-metaone-ec336.cloudfunctions.net/api/userSpaces/${user.uid}`

    // axios.get(apiPath)
    // .then((res)=>{
    //     setUserSpace(
    //         {
    //          userspaces:res.data,
    //          loading:false
    //         }
    //     )
    // })
    // .catch((error)=>{
    //     console.error('error',error)
    // })
    console.log(userData.length > 0 ? 'data  avil' : 'data not avail')

  return (
    <>
    {
     !loading ?
    <div className="infine-scroll-padding space-bottom-height">
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
     : <LoadingPosts />
    }
    </>
    
  )
}

export default Userspaces
