import React, { useState, useEffect } from 'react';
import { useUser } from '../UserProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react/dist/iconify.js';
import { assets } from '../assets/assets';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../NavbarNavigation/Footer';

const DisplayLikedSongs = () => {
  const [list, setList] = useState([]);
  const { getUser, setCurrentPlaying, playWithId } = useUser();
  const navigate = useNavigate();

  // Optional: If you want to track liked songs
  const [likedSongs, setLikedSongs] = useState([]);

  const detailsOfLikedSongs = async () => {
    axios.get('https://academics.newtonschool.co/api/v1/music/favorites/like', {
      headers: {
        Authorization: `Bearer ${getUser.token}`,
      },
    })
    .then((response) => {
      setList(response.data.data.songs);
      setLikedSongs(response.data.data.songs.map(song => song._id)); // Store liked song IDs
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const removeLikedSongs = (songId) => {
    axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { songId }, {
      headers: { Authorization: `Bearer ${getUser.token}` },
    })
    .then((response) => {
      setList(response.data.data.songs);
      setLikedSongs(response.data.data.songs.map(song => song._id)); // Update liked songs state
      toast.success('Removed from Liked Songs');
      detailsOfLikedSongs();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    detailsOfLikedSongs();
  }, []);

  const handlePlaySortedSong = (song) => {
    setCurrentPlaying(song);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-10 mb-4 flex flex-col md:flex-row md:items-end gap-8">
        <div className="w-full md:w-48 flex justify-center items-center rounded bg-gray-800">
          <Icon icon="ph:heart-fill" width="10rem" height="10rem" style={{ color: 'white' }} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm md:text-base">Playlist</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Liked Songs</h2>
          <p className="mt-1 flex items-center text-sm md:text-base">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="Spotify Logo" />
            <b className="ml-2">Spotify</b>
            <b className="ml-4">By Manoj Nayak</b>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p className="flex items-center">
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Type</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock Icon" />
      </div>
      <hr />

      {list && list.length > 0 ? (
        list.map((song, index) => (
          <div
            key={song._id}
            onClick={() => {
              handlePlaySortedSong(song);
              playWithId(song);
            }}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white flex items-center">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={song.thumbnail} alt={song.title} />
            </p>
            <p className="text-[15px]">{song.title}</p>
            <p className="text-[15px]">{song.mood}</p>
            <p className="text-[15px] flex justify-center">
              <div
                className="heart"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent triggering parent onClick
                  removeLikedSongs(song._id);
                }}
              >
                {likedSongs.includes(song._id) ? (
                  <Icon
                    icon="ri:heart-fill"
                    width="1.5rem"
                    height="1.5rem"
                    style={{ color: '#0aa324' }}
                    className="hover:scale-125 cursor-pointer"
                  />
                ) : (
                  <Icon
                    icon="ri:heart-line"
                    width="1.5rem"
                    height="1.5rem"
                    style={{ color: '#808080' }}
                    className="hover:scale-125 cursor-pointer"
                  />
                )}
              </div>
            </p>
          </div>
        ))
      ) : (
        <div className='text-center pb-8 pt-8 md:pb-16 md:pt-16 h-full'>
              <h3 className='text-white text-2xl md:text-4xl font-bold'>Songs you like will appear here</h3>
              <h3 className='text-white text-sm md:text-lg font-semibold pt-2 md:pt-4'>Save songs by tapping the heart icon.</h3>
            </div>
      )}
      <div className="mt-4 md:mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default DisplayLikedSongs;
