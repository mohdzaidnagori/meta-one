import clsx from 'clsx'
import Image from 'next/image'
import React, { useState,usePrevious } from 'react'
import  {exploreData} from '../../assets/data/exploreData'
import { LoadingPosts } from './LoadingCard'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from 'react'
import axios from 'axios'



const Card = () => {

const apiPath = 'https://asia-south1-metaone-ec336.cloudfunctions.net/api/spaces'
const PAGE_LIMIT = 2;
const totalCount = 11;
const [enviroment,setEnviroment] = useState([])


// setLastName(enviroment[enviroment.length - 1]?.name)
console.log(enviroment[enviroment.length - 1]?.name)

const getProductList = () => {
// let page_no = Math.ceil((enviroment.length / PAGE_LIMIT)) + 1;

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

      
      <InfiniteScroll
          dataLength={enviroment.length}
          next={fetchMoreData}
          hasMore={enviroment.length < totalCount }
          loader={<LoadingPosts />}
          height={400}
          endMessage={
            <p style={{ textAlign: "center",padding:"10px 0px" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
         
         <div className="infine-scroll-padding">
         <div className="row g-3">
            {
             enviroment && enviroment.length > 0 && enviroment.map((item,index) => {
                return (
                <div key={index} className='col-md-6'>
                   <div className='box-height-medium'>
                    <Image src={item.img} layout='fill'/>
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
             </InfiniteScroll>       
       
  )
}

export default Card
