import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiUpload } from 'react-icons/bi'

const NewScard = ({data,name}) => {
  return (
    <div className='row'>
      {
        data && data.length > 0 && data.map((item)=>{
            return (
                <div key={item.id} className="col-md-4 newspaces">
               <Link href={{
                pathname: '/spaces/unity',
                query: { 
                  type: 'spaces',
                  id:item.id,
                  name:name.toUpperCase()
                 },
               }}>
                <div className="newSpacesCard-height">
                    <Image src={item.img} layout='fill' priority alt='newspaces' />
                    {
                        item.name === 'Upload Custom Space' && <span><BiUpload /></span>
                    }
                </div>
                </Link>                  
               
                <h5>{item.name}</h5>
               </div>
            )
        })
     }
    </div>
  )
}

export default NewScard
