import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../firebase"

const Verified = () => {
  const [calledPush, setCalledPush] = useState(false)
   const User = auth.currentUser;
  const router = useRouter()
    if(User !== null){
      let interval = setInterval(async () => {
        if (User.emailVerified) {
            clearInterval(interval);
            let calledPushLatest;
            setCalledPush(latest => {
                calledPushLatest = latest;
                return latest;
            })
            if(calledPushLatest) return;
            setCalledPush(true);
            router.push('/spaces')
        }
       await  User.reload();
      }, 1000);
      
    }
 



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

export default Verified
