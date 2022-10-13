import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import { useAuth } from '../router/AuthContext'

const NewScard = ({data,name}) => {

  const {user} = useAuth()
  const [newid ,setNewId] = useState('')
  const router = useRouter()

    // console.log(userData) 
    const createScene = (id,name) => {
      const url = `https://asia-south1-metaone-ec336.cloudfunctions.net/api/addnewSpacesInUser`
      const spaceObj = {
        newSpacesID:id,
        userID:user.uid
      }
    
      axios.post(url,spaceObj)
      .then((res) => {
        setNewId(res.data.id)
        console.log(res.data.id)
        router.push(`/spaces/unity?type=spaces&id=${res.data.id}&name=${user.displayName} ${name}`)
      })
      .catch((error)=>{
        console.error(error)
      })
    }


  return (
    <div className='row'>
      {
        data && data.length > 0 && data.map((item)=>{
            return (
                <div onClick={() => createScene(item.id,item.name)}  key={item.id} className="col-md-6 col-lg-4 newspaces">
             
                <div className="newSpacesCard-height">
                    <Image src={item.img} layout='fill' priority={true} alt='newspaces' />
                    {
                        item.name === 'Upload Custom Space' && <span><BiUpload /></span>
                    }
                </div>
                                 
               
                <h5>{item.name}</h5>
               </div>
            )
        })
     }
    </div>
  )
}

export default NewScard
