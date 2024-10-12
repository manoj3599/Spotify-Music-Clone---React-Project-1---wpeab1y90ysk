import { createContext, useContext, useState, useRef, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [getUser, setUser] = useState(
    localStorage.getItem("token")
      ? { token: localStorage.getItem("token"), status: "success" }
      : null
  );

  const [list, setList] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState([]);
  const [playedSongs, setPlayedSongs] = useState([]); // Array to store played songs
  const [currentSongIndex, setCurrentSongIndex] = useState(-1); // Index of the current song in playedSongs
  const [playStatus, SetPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const [artistData, setArtistData] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  const signInUser = (input) => {
    setUser(input);
  };

  const signOutUser = (input) => {
    setUser(input);
  };

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const play = () => {
    audioRef.current.play();
    SetPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    SetPlayStatus(false);
  };

  const playWithId = async (song) => {
    console.log(typeof song);

    // Check if the input is an ID or a song object
    let songToPlay;

    if (typeof song === "string") {
      // If the song is an ID, find the song in playedSongs
      const foundSong = playedSongs.find((s) => s._id === song);

      if (foundSong) {
        // If found, set songToPlay as the found object
        songToPlay = foundSong;
      } else {
        // If not found, create a song object with just the ID
        songToPlay = {
          _id: song,
          audio_url: `${song}.mp3`, // Assuming the audio file is named after the ID
        };
      }
    } else {
      // If the song is an object, use it directly
      songToPlay = song;
    }

    // Set the song to currentPlaying
    setCurrentPlaying(songToPlay);

    // Add the song to the playedSongs array if it's not already present
    const songIndex = playedSongs.findIndex((s) => s._id === songToPlay._id);
    if (songIndex === -1) {
      setPlayedSongs([...playedSongs, songToPlay]); // Add to playedSongs
      setCurrentSongIndex(playedSongs.length); // Update index to the newly added song
    } else {
      setCurrentSongIndex(songIndex); // Update the currentSongIndex if it's already in the array
    }

    // Play the song
    if (audioRef.current) {
      await audioRef.current.setAttribute("src", songToPlay.audio_url); // Use the audio_url property
      await audioRef.current.play(); // Play the song
      SetPlayStatus(true); // Set the play status to true
    }
  };

  // Play the previous song in the array
  const previousSong = async () => {
    if (playedSongs.length > 0) {
      let newIndex = currentSongIndex - 1;
      if (newIndex < 0) {
        newIndex = playedSongs.length - 1; // Rotate to the last song
      }

      const songToPlay = playedSongs[newIndex];
      setCurrentSongIndex(newIndex);
      setCurrentPlaying(songToPlay);

      if (audioRef.current) {
        await audioRef.current.setAttribute("src", songToPlay.audio_url);
        await audioRef.current.play();
        SetPlayStatus(true);
      }
    }
  };

  // Play the next song in the array
  const nextSong = async () => {
    if (playedSongs.length > 0) {
      let newIndex = currentSongIndex + 1;
      if (newIndex >= playedSongs.length) {
        newIndex = 0; // Rotate to the first song
      }

      const songToPlay = playedSongs[newIndex];
      setCurrentSongIndex(newIndex);
      setCurrentPlaying(songToPlay);

      if (audioRef.current) {
        await audioRef.current.setAttribute("src", songToPlay.audio_url);
        await audioRef.current.play();
        SetPlayStatus(true);
      }
    }
  };

  //useEffect(()=>{
  //playWithId(currentPlaying._id)
  //})

  {
    /*const playWithId = (id) => {
    setCurrentPlaying(id); // Set the song ID as current playing
    if (audioRef.current) {
      audioRef.current.play();
      SetPlayStatus(true);
    }
  };*/
  }

  const seekSong = async (e) => {
    audioRef.current.currentTime = 
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
  };

  const seekVol = (e) => {
    const newVolume = e.target.value; // Get the value from the slider input
    audioRef.current.volume = newVolume; // Set the audio volume
  };
  
  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    });
  }, [audioRef]);

  const object = {
    getUser,
    setUser,
    signInUser,
    signOutUser,
    currentPlaying,
    setCurrentPlaying,
    artistData,
    setArtistData,
    albumData,
    setAlbumData,
    audioRef,
    seekBar,
    seekBg,
    playStatus,
    SetPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previousSong,
    nextSong,
    seekSong,
    seekVol,
    list, 
    setList

  };

  return (
    <div>
      <UserContext.Provider value={object}>{children}</UserContext.Provider>
    </div>
  );
};

export function useUser() {
  return useContext(UserContext);
}
