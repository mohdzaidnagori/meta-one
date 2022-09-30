import Link from "next/link"
import { AiOutlineClose } from "react-icons/ai"
import { motion } from "framer-motion";
import { useState } from "react";
import NewScard from "./NewScard";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const Newspace = () => {
  const [rightScreen,setRightScreeen] = useState('free')
  const [data,setData] = useState([])
  const [randomName,setrandomName] = useState('')
  const dropIn = {
    hidden: {
      scale:0.7,
      opacity: 0,
    },
    visible: {
      scale:1,
      opacity: 1,
      transition: {
        default: {
          duration: 0.1,
          ease: [0, 0.71, 0.8, 1]
        },
        scale: {
          duration: 0.2, type: "tween"
        }
      },
    }
  };


  useEffect(()=>{
    const newSpaces = query(collection(db,'demoSpace'), orderBy("timeStamp", "asc"));
        const unsub = onSnapshot(
            newSpaces,
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ 
                    id:doc.id,
                 ...doc.data() 
                });
            });
            setData(list);
          },
          (error) => {
            console.error('demospace not found ',error);
          }
        );
        return () => {
          unsub();
          const nameArray = ['Home','Bespoke Area','3D Scene','Lo-Fi Room','Virtuel Meeting',
          'Virtuel Room','Lo-Fi Room','Lo-Fi Place','Next Place','Immersive Room','Immersive Palace',
          'Hi-Fi Place','Hi-Fi Room','Hi-Fi Scene','Virtuel Meetup']
          const random = Math.floor(Math.random() * nameArray.length)
          setrandomName(nameArray[random]);
        };
        
  },[])

 


  const freeHandle = () => {
    setRightScreeen('free')
  }
  const CollectiblesHandle = () => {
    setRightScreeen('collectibles')
  }
  const TemplatesHandle = () => {
    setRightScreeen('templates')
  }





  return (
    <motion.div
    className="space-modal"
    style={{zIndex:'50'}}
    variants={dropIn}
    initial="hidden"
    animate="visible"
    >
    <Link href='/spaces'>
        <div className="space-modal-close"><AiOutlineClose /></div>
    </Link>
    <div className="space-modal-partication">
      <div className="space-modal-left">
         <div className="space-modal-left-mover">
         <h3>Let's Builds</h3>
          <div className='newSpace-switch'>
            <p className={rightScreen === 'free' ? 'activeswitch ' : ''} onClick={freeHandle}>Free</p>
            <p className={rightScreen === 'collectibles' ? 'activeswitch ' : ''} onClick={CollectiblesHandle}>Collectibles</p>
            <p className={rightScreen === 'templates' ? 'activeswitch ' : ''} onClick={TemplatesHandle}>Your Templates</p>
          </div>
         </div>
      </div>
        <div className="space-modal-right">
          {
            rightScreen === 'free'
            ?
            <div className="free-spaces-container">
              <NewScard data={data} name={randomName}/>
            </div>
            :
            rightScreen === 'collectibles'
            ?
            'collectibles'
            : 
            rightScreen === 'templates'
            ? 
            'templates' 
            : 
            ''
          }
        </div>
    </div>
    </motion.div>
    
  )
}

export default Newspace



