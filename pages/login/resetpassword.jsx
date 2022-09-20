import { useEffect, useState } from "react"
import LoginLeft from "../../component/login-left/Loginleft"
import Image from 'next/image'
import {BiArrowBack} from "react-icons/bi";
import { AiOutlineMail} from "react-icons/ai";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router'
import Link from "next/link";


const Resetpassword = () => {
  const [email,setEmail] = useState()

  const router = useRouter()


 const resetPass = (e) => {
   e.preventDefault()
   sendPasswordResetEmail(auth, email)
   .then(() => {
       toast.success('reset link send in your email')
       router.push('/login')
   })
   .catch((error) => {
    toast.error('your email is not register please enter register email address')
   });
 }
  return (
    <>
    <Toaster />
    <div className="row login-container">
    <div className="col-md-8 col-lg-9 videoContainer">
       <LoginLeft url={'/video/1.mp4'}/>
      </div>
        <div className="col-md-4 col-lg-3 padding-0">
          <div className="login-box">
            <Link href="/login">
            <div className="back-arrow">
            <BiArrowBack />
            </div>
            </Link>
            <div className="logo-wrapper">
            <Image src='/images/login-images/logo.png' width={200} height={200} alt="logoImage" />
            </div>
            <div className="login-form">
                <form onSubmit={resetPass}>
                     <div className="input-wrapper">
                     <span className='user-icon' ><AiOutlineMail /></span>
                      <input
                       className='input-text'
                        type="text"
                         placeholder='Email'
                         onChange={(e) => setEmail(e.target.value)}
                          />
                     </div>
                      <div className="login-button-wrapper">
                      <button className='btn-meta' type='submit'>Login</button>
                      </div>
                </form>
            </div>
          </div>
        </div>
    </div>
    <style jsx>
      {`
      
     
    
   
      
      `}
      </style>
    </>
  )
}

export default Resetpassword
