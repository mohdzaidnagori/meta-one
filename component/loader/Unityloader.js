import React from 'react'

export const Unityloader = ({loading,envirometname}) => {
  return (
    <>
    <div className='loader-body'>
      <div className="loader--ripple">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
        {
            loading < 10 ? 
            <article>
            <p>Creating Enviroment ....</p> 
            </article>
            : loading < 50 ? 
            <article>
            <p>Creating Enviroment Name.... {envirometname}</p> 
            </article> 
            : loading <= 100 ? 
            <article> 
             <p>The world is full of magical things patiently waiting for our wits to grow sharper.</p>
             <h5>Bertrand Russell</h5>
            </article>
            : ''


        }
       
  
    
      
      </div>
        
   <style jsx>
    {
        `
        article{
            width:90%;
            text-align:center;
            margin-right:20px;
        }
        article > p{
           font-size:24px;
        }
        .loader-body{
            position:relative;
            background:#fff;
            height:100vh;
            width:100vw;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            overflow:hidden;
            z-index:1000;
           }
        .loader--ripple {
         position: relative;
         background:#fff;
         height:200px;
         width:200px;
         overflow:hidden;
     
       }

     .loader--ripple div {
      position: absolute;
      width:100px;
      height:100px;
     animation: loader--ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
     border: 4px solid #00539f;;
     border-radius: 50%;
     opacity: 1;
    
     }

.loader--ripple div:nth-child(2) {
    animation-delay: -0.5s;
    
}
.loader--ripple div:nth-child(3) {
    animation-delay: -0.2s;
    
}
.loader--ripple div:nth-child(4) {
    animation-delay: -0.2s;
}
.loader--ripple div:nth-child(5) {
    animation-delay: -0.2s;
}

@keyframes loader--ripple {
    0% {
        top: 84px;
        left: 84px;
        opacity: 1;
        height: 0;
        width: 0;
    }

    100% {
        top: -1px;
        left: -1px;
        opacity: 0;
        height: 168px;
        width: 168px;
    }
}

        `
    }
 </style>
 </>


  )
}
