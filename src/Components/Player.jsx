import React from 'react'
import { assets, songsData } from '../assets/assets'
import { useUser } from '../UserProvider'
import { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'

const Player = () => {

  const {getUser, seekVol,seekSong, audioRef, seekBar,seekBg ,playStatus,play,pause,currentPlaying,time,previousSong,nextSong} = useUser([])
  

  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenSmall(window.innerWidth < 1100);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  
  return (
    <>

    {!getUser &&  (<>
    {isScreenSmall ? <><div className='flex justify-between  items-center bg-[#AC2B98] p-1.5 pl-2 mt-11'>
      <div className='font-semibold text-white '>
        <p>Sign up free to get unlimited songs..</p>
      </div>
      <Link to="/signup"><div className='font-semibold border bg-white rounded-3xl pl-4 pr-4 py-1.5 ml-3 mr-3 cursor-pointer'>Signup </div></Link>
    </div></> : <div className='flex justify-between  items-center bg-[#AC2B98] p-3 mt-0 rounded'>
      <div className='font-semibold text-white '>
        <h3>Preview</h3>
        <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit cards nedded.</p>
      </div>
      <Link to="/Register"><div className='font-semibold pr-8 border bg-white rounded-full pl-8 pt-2 pb-2 hover:scale-105 cursor-pointer'>Sign up free</div></Link>
    </div>}
    </>)}





    {getUser && getUser.status === "success" && (
    <div  className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={currentPlaying.thumbnail} alt="" />
            <div>
                <p>{currentPlaying.title}</p>
                <p>{currentPlaying.mood}</p>
            </div>

        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-4'>
                <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
                <img onClick={previousSong} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />

                {playStatus ? <img onClick={pause}  className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
                : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
                }
                
                
                <img onClick={nextSong} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
                <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
            </div>
            <div className="flex items-center gap-5">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div  ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr ref={seekBar} className="h-1 border-none w-10 bg-green-800 rounded-full"></hr>
          </div>

          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
        </div>
        <div className='hidden lg:flex items-center gap-2 opacity-75'>



        <div className='hidden lg:flex items-center gap-2 opacity-75'>
      {/* Volume icon */}
      <img className='w-4' src={assets.volume_icon} alt="Volume" />

      {/* Volume slider */}
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        onChange={seekVol} 
        className='w-20 cursor-pointer'
        defaultValue="0.5" // Initial volume set to 50%
      />
    </div>


        </div>
    </div>)}
   </> 
  )
  
}

export default Player