import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../component/loader/Loader";
import { useAuth } from "../../component/router/AuthContext";
import { auth } from "../../firebase"

const verified = () => {
   const User = auth.currentUser;
   const [loading,setLoading] = useState(true)
   
  const router = useRouter()
    if(User !== null){
      // console.log('false')
      // const checkForVerifiedInterval = setInterval(() => {
      //   User.reload().then(ok => {
      //       if (User.emailVerified) {
      //         clearInterval(checkForVerifiedInterval)
      //         setEmailVerified(true)
      //         // router.push('/space')
      //       }
      //     })
      // }, 1000)
      let interval = setInterval(async () => {
        if (User.emailVerified) {
            clearInterval(interval);
            router.push('/space')
        }
       await  User.reload();
      }, 1000);
      
    }
    // const { user } = useAuth()
    //  useEffect(() => {
    // if (user && user?.emailVerified === true) {
    //   router.push('/space')
    // }
    // }, [router, user])



  const verifiedElement = () =>  {
    return (
      <h1>Your email is not verified</h1>
    )
  }
  return (
    <>
    {
       
       <div className="verified-mes">
        
           {verifiedElement()}
       </div>
    }
       <style jsx>
      {`
.verified-mes{
    display:flex;
    justify-content:center;
    margin-top:30px;
}
      `}
      </style>
    </>
  )
}

export default verified
