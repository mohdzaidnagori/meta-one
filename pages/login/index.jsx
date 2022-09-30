import Image from 'next/image'
import { motion } from "framer-motion"
import {useEffect, useState} from 'react'
import {BiLockOpen,BiHide,BiShow } from "react-icons/bi";
import { AiOutlineMail} from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import validator from 'validator'
import { useDispatch } from 'react-redux';
// import { loginFailure, loginStart, loginSuccess} from '../../component/redux/userslice';
import {auth,provider,signInWithEmailAndPassword} from '../../firebase';
import LoginLeft from '../../component/login-left/Loginleft';
import Link from 'next/link'
import { useAuth } from '../../component/router/AuthContext';
import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const Index = () => {

  const { user } = useAuth()
  const router = useRouter()


  useEffect(() => {
    if (user) {
      router.push('/spaces')  
    }
  }, [router,user])

  const [passwordType,setPasswordType] = useState('password')
  const [email,setEmail] =  useState('')
  const [password,setPassword] =  useState('')

  // const dispatch = useDispatch()


  const hideShowPassword = () => {
    if(passwordType === 'password'){
      return setPasswordType('text')
    }
    
    setPasswordType('password')
  }
  const googleHandle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    setTimeout(() => {
      router.push('/spaces')
    }, 1000);
   
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    router.push('/login')
  });
  }
  const handleLogin = (e) => {
    e.preventDefault()
    if(email === ''){
      return toast.error('email field is required')
    }
    if(password === ''){
      return toast.error('password field is required')
    }
    if (!validator.isEmail(email)) {
      return toast.error('invalid email address')
    }
    // dispatch(loginStart())
    signInWithEmailAndPassword(auth,email,password).
    then((userAuth) => {
      // dispatch(
      //   loginSuccess({
      //   email:userAuth.user.email,
      //   uid:userAuth.user.uid,
      //   displayName:userAuth.user.displayName,
      //   photoUrl:userAuth.user.photoURL,
      //   emailVerified:userAuth.user.emailVerified
      // })
      // )
    })
    .catch((err) =>{
      toast.error('email or password invalid')
      // dispatch(loginFailure())
    })
  }
 



  return (
    
    <> 
    <Toaster />
    <div className="row login-container">
    <div className="col-md-8 col-lg-9 videoContainer">
       <LoginLeft url={'video/1.mp4'} />
      </div>
        <div className="col-md-4 col-lg-3">
          <div className="login-box">
            <div className="logo-wrapper">
            <Image src='/images/login-images/logo.png' width={200} height={200} alt="logoImage" />
            </div>
            <motion.div
             className="googleButton"
             whileHover={{ scale: 1.1 }}
             onClick={googleHandle}
             >
              <Image src='/images/login-images/Google.png' className='image-google' width={20} height={20} alt="googleImage" />
             <h5 className='login-brand-text'>Google</h5>
            </motion.div>
            <motion.div 
            className="googleButton"
            whileHover={{ scale: 1.1 }}
            >
            <Image src='/images/login-images/Microsoft.png' className='image-google' width={20} height={20} alt="microsoftImage" />
              <h5 className='login-brand-text'>Microsoft</h5>
            </motion.div>
            <div className="login-form">
                <p>Or Login</p>
                <form onSubmit={handleLogin}>
                     <div className="input-wrapper">
                     <span className='user-icon' ><AiOutlineMail /></span>
                      <input
                       className='input-text'
                        type="text"
                         placeholder='Email'
                         onChange={(e) => setEmail(e.target.value)}
                          />
                     </div>
                     <div className="input-wrapper">
                      <span className='user-icon' ><BiLockOpen /></span>
                      <input
                       className='input-text'
                       type={passwordType}
                       placeholder='Password'
                       onChange={(e) => setPassword(e.target.value)}
                          />
                      <span onClick={hideShowPassword} className='hide-show-login'>{passwordType === 'password' ? <BiShow /> : <BiHide />}</span>
                     </div>
                      <div className="login-button-wrapper">
                        <button className='btn-meta' type='submit'>Login</button>
                        <Link href="/login/resetpassword">
                        <a>Forgat password ?</a>
                        </Link>
                      </div>
                      <div className="register-new-account">
                        <Link href='/login/register'>
                        <a className='register-new-account-a'>Register a new user</a>
                        </Link>
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


export default Index
