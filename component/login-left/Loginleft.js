import { useEffect, useRef } from 'react';


const Loginleft = ({url}) => {
  const videoEl = useRef(null);
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
     
  };


// In browsers that don’t yet support this functionality,
// playPromise won’t be defined.


  useEffect(() => {
    attemptPlay();
    // console.log('render')
  }, []);

  return (
    <>
    <video
        className='videoPlayer'
        muted
        autoPlay
        loop
       
        ref={videoEl}
        >
          <source  src={url} type="video/mp4"/>
    </video>
    </>
  )
}

export default Loginleft
