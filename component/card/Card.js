import Image from 'next/image'
import React, { useState } from 'react'
import { LoadingPosts } from './LoadingCard'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'



const Card = () => {

const apiPath = 'https://asia-south1-metaone-ec336.cloudfunctions.net/api/newSpaces'
const PAGE_LIMIT = 2;
const totalCount = 11;
const [enviroment,setEnviroment] = useState([])




const getProductList = () => {


let page_no = enviroment[enviroment.length - 1]?.name
const queryParam = `/${PAGE_LIMIT}/${page_no ? page_no : "0" }`
const finalUrl = apiPath + queryParam

axios.get(finalUrl)
.then((res)=>{
  const resApi = res?.data
  const mergeData = [...enviroment,...resApi]
  setEnviroment(mergeData)

})
.catch((err)=>{
  console.error('error while loading products',err)
})
}



useEffect(() =>{
  getProductList()
},[])

const fetchMoreData = () => {
    getProductList()
}







 

  return (

      
      <div 
      id="scrollableDiv"
      className='infinite-scroll-div'
      style={{
        overflow: 'auto',
      }}>
        <InfiniteScroll
          dataLength={enviroment.length}
          next={fetchMoreData}
          hasMore={enviroment.length < totalCount }
          loader={<LoadingPosts />}
          endMessage={
            <p style={{ textAlign: "center",padding:"10px 0px",color:'#000' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
         
         <div className="infine-scroll-padding">
         <div className="row g-3">
            {
             enviroment && enviroment.length > 0 && enviroment.map((item,index) => {
                return (
               <Link key={index} href={{
                pathname: '/spaces/unity',
                query: { 
                  type: 'explore',
                  id:item.id,
                  name:item.name.toUpperCase()
                 },
               }}>
                 <div className='col-md-6'>
                   <div className='box-height-medium'>
                    <Image priority src={item.img} layout='fill' alt='enviromentImages'/>
                     <div className="exlusive-boxHeading">
                       {
                        item.name.length > 23 ? 
                        <h3>{item.name.substring(0,23)}...</h3> :  <h3>{item.name}</h3>
                       }
                        <p>by {item.author}</p>
                     </div>
                  </div>
               </div>
               </Link>
               
                )
             }) 
            }
             </div>
         </div>
             </InfiniteScroll>   
      </div>    
       
  )
}

export default Card
