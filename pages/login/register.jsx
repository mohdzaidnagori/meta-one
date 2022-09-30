import { useEffect, useState } from "react"
import LoginLeft from "../../component/login-left/Loginleft"
import Image from 'next/image'
import { BiUser,BiShow,BiHide,BiArrowBack,BiLockOpen} from "react-icons/bi";
import { AiOutlineMail} from "react-icons/ai";
import { auth,createUserWithEmailAndPassword,sendEmailVerification ,updateProfile} from "../../firebase";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router'
import Link from "next/link";
import validator from 'validator'
import { useDispatch } from "react-redux";
// import { loginFailure, loginStart, loginSuccess } from "../../component/redux/userslice";
import { useAuth } from "../../component/router/AuthContext";

const Register = () => {
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [cpassword,setCpassword] = useState('')
  const [passwordType,setPasswordType] = useState('password')
  const [cpasswordType,setcPasswordType] = useState('password')

  const router = useRouter()
  // const dispatch = useDispatch()

  const registerHandle =  (e) => {
    e.preventDefault()
     if(name === ''){
        return toast.error('name field is required')
      }
     if(email === ''){
        return toast.error('email field is required')
      }
      if(password === ''){
        return toast.error('password field is required')
      }
      if(cpassword === ''){
        return toast.error('confirm password field is required')
      }
         if (!validator.isEmail(email)) {
            return toast.error('invalid email address')
          }
      
      if(password != cpassword){
        return toast.error('password and confirm password is not same')
      }
      //  dispatch(loginStart())
       createUserWithEmailAndPassword(auth,email,password).then(
        (userAuth) => {
             sendEmailVerification(userAuth.user)
             updateProfile(userAuth.user,{
                displayName: name,
                photoURL:'',
                emailVerified:userAuth.user.emailVerified
            }).then(
                // () => {
                //     dispatch(loginSuccess({
                //         email:userAuth.user.email,
                //         uid:userAuth.user.uid,
                //         displayName:name,
                //         photoURL:'',
                //         emailVerified:userAuth.user.emailVerified
                //     }))
                // }
            )
            router.push('/login/verified')
        }
        
        
      ).catch(
        (error) => {
          alert(error.message)
          // dispatch(loginFailure())
        }
         
     )
     

  }
  const hideShowPassword = () => {
    if(passwordType === 'password'){
      return setPasswordType('text')
    }
    
    setPasswordType('password')
  }
  const hideShowcPassword = () => {
    if(cpasswordType === 'password'){
      return setcPasswordType('text')
    }
    
    setcPasswordType('password')
  }

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      if(user.emailVerified === false){
        router.push('/login/verified')
      }
      else{
        router.push('/')
      }
    }
  }, [router, user])
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
                <form onSubmit={registerHandle}>
                     <div className="input-wrapper">
                         <span className='user-icon' ><BiUser /></span>
                         <input
                           className='input-text'
                           type="text"
                           placeholder='Your Name'
                            onChange={(e) => setName(e.target.value)}
                          />
                     </div>
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
                     <div className="input-wrapper">
                         <span className='user-icon' ><BiLockOpen /></span>
                         <input
                           className='input-text'
                           type={cpasswordType}
                           placeholder='Confrim Password'
                            onChange={(e) => setCpassword(e.target.value)}
                          />
                           <span onClick={hideShowcPassword} className='hide-show-login'>{cpasswordType === 'password' ? <BiShow /> : <BiHide />}</span>
                     </div>
                      <div className="login-button-wrapper">
                      <button className='btn-meta' type='submit'>Login</button>
                      <Link href="/login">
                        <a>login user ?</a>
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

export default Register

