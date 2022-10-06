import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Serach = ({data}) => {
  return (
    <div 
    id="scrollableDiv"
    className='infinite-scroll-div'
     style={{
      overflow: 'auto',
    }}
    >
      <div className='infine-scroll-padding'>
       <div className="row g-3" style={{paddingBottom:'30px'}}>
       {
          data.map((item,index) => {
            return (
              <div key={index} className='col-md-6'>
                <Link href={{
                   pathname: '/spaces/unity',
                   query: { 
                   type: 'explore',
                   id:item.id,
                   name:item.name.toUpperCase()
                   },
                 }}>
                   <div className='box-height-medium'>
                    <Image priority src={item.img} layout='fill' alt='searchImages' />
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
       </div>
    </div>
  )
}

export default Serach
