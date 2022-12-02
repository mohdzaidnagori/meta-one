// same file as the videocall example
import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import {BsMicMute,BsMic, BsCameraVideo, BsCameraVideoOff} from 'react-icons/bs'
import { IoExitOutline } from 'react-icons/io5'
import { useRouter } from "next/router";





const config: ClientConfig = { 
  mode: "rtc", codec: "vp8",
};


const appId: string = "1c25b0229b224c48a05674551e80719b"; //ENTER APP ID HERE
const token: string | null = null;



// the create methods in the wrapper return a hook
// the create method should be called outside the parent component
// this hook can be used the get the client/stream in any component
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()


const VideoCall = (props: {
  setInCall:    React.Dispatch<React.SetStateAction<boolean>>;
  // channelName:  React.Dispatch<React.SetStateAction<String>>;
  displayName:  React.Dispatch<React.SetStateAction<BigInteger>>;
}) => {
  const { setInCall} = props;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  // using the hook to get access to the client object
  const client = useClient();






  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  // useEffect(() => {

  //   leaveChannel()
  //     .catch(console.error);
  // }, [leave])


  useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.warn("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

    
    
        try {
          await client.join(appId, name, token, null);
          if (tracks) await client.publish([tracks[0], tracks[1]]);
          setStart(true);
        
        } catch (error) {
          setStart(true);
        }
    };

    if (ready && tracks) {
      console.log("init ready");
      init('main');
    }

  },[ client, ready, tracks]);


  return (
    <div className="App-1">
      {start && tracks ? <Videos users={users} tracks={tracks} /> : <div style={{width:'300px'}}>Video tracks loading</div>}
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall}   />
      )}
      
    </div>
  );
};

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos-1">
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
        <AgoraVideoPlayer style={{height: '95%', width: '95%'}} className='vid-1' videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <>
                <AgoraVideoPlayer style={{height: '95%', width: '95%'}} className='vid-1' videoTrack={user.videoTrack} key={user.uid} />
                {/* <h1>{user.uid}</h1> */}
                </>
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export const Controls = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const router = useRouter()

 

  const mute = async (type: "audio" | "video"|"test") => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
   
  };
  
  const leaveChannel = async () => {

      await client.leave();
      client.removeAllListeners();
      tracks[0].close();
      tracks[1].close();
      setStart(false);  
  };
 



  
  
 

 

  return (
    <div className="controls-1">
       
              <div className="unity-flex-child unity-hover"  onClick={() => mute("audio")}  data-name={trackState.audio ? 'Turn of mic' : 'Turn on mic'}>
              { trackState.audio ?  <BsMic /> :<BsMicMute/> }
              </div>
              <div className="unity-flex-child unity-hover"  onClick={() => mute("video")} data-name={trackState.video  ? 'Turn of camera' : 'Turn on camera'} >
              { trackState.video ?  <BsCameraVideo /> :<BsCameraVideoOff/> }
              </div>

               <div className="unity-flex-child" onClick={() => leaveChannel()}>
                    <a href="/spaces"><span className="exit-rotate-unity"><IoExitOutline /> </span> <span>LEAVE</span></a>
                </div>
    </div>
  );
};


export default VideoCall;
