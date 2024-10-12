import React from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../UserProvider";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Icon } from "@iconify/react/dist/iconify.js";
import Footer from "../NavbarNavigation/Footer";

const DisplayArtist = () => {
  const { getUser, artistData, setCurrentPlaying, playWithId } = useUser();
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const storedLikedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(storedLikedSongs);
  }, []);

  const handlePlaySongs = (song) => {
    setCurrentPlaying(song);
  };

  const addToFavorites = (event, songId) => {
    event.stopPropagation(); // Prevent click from triggering parent onClick
    let isMounted = true; // Flag to track component's mount status

    axios
      .patch(
        "https://academics.newtonschool.co/api/v1/music/favorites/like",
        { songId: songId },
        {
          headers: {
            Authorization: `Bearer ${getUser.token}`,
          },
        }
      )
      .then((response) => {
        if (!isMounted) return; // Check if component is still mounted

        if (response.data.message === "song added to favorites successfully.") {
          toast.success("Added to Liked Songs");
          setLikedSongs((prevLikedSongs) => {
            const updatedLikedSongs = [...prevLikedSongs, songId];
            localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
            return updatedLikedSongs;
          });
        } else if (response.data.message === "song removed from favorites successfully.") {
          toast.success("Removed from Liked Songs");
          setLikedSongs((prevLikedSongs) => {
            const updatedLikedSongs = prevLikedSongs.filter((id) => id !== songId);
            localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
            return updatedLikedSongs;
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update favorites. Please try again.");
      })
      .finally(() => {
        isMounted = false; // Cleanup
      });
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 px-4 sm:px-8">
        <img className="w-full sm:w-48 rounded" src={artistData.image} alt="Artist" />
        <div className="flex flex-col items-start md:items-start">
          <p className="text-sm md:text-base text-[#a7a7a7]">Playlist</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{artistData.name}</h2>
          <p className="mt-1 flex items-center text-sm md:text-base text-[#a7a7a7]">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="Spotify Logo" />
            <b className="ml-2 text-white">Spotify</b>
            <b className="ml-4 text-white">By Manoj Nayak</b>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] px-4 sm:px-8">
        <p className="flex items-center">
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Type</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock Icon" />
      </div>

      <hr className="mx-4 sm:mx-8" />

      {artistData.songs &&
        artistData.songs.map((song, index) => (
          <div
            key={song._id}
            onClick={() => {
              handlePlaySongs(song);
              playWithId(song);
            }}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer px-4 sm:px-8"
          >
            <p className="text-white flex items-center">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={song.thumbnail} alt={song.title} />
            </p>
            <p className="text-[15px]">{song.title}</p>
            <p className="text-[15px] hidden sm:block">{song.mood}</p>
            <p className="text-[15px] flex justify-center">
              <div className="heart" onClick={(event) => addToFavorites(event, song._id)}>
                {likedSongs.includes(song._id) ? (
                  <Icon
                    icon="ri:heart-fill"
                    width="1.5rem"
                    height="1.5rem"
                    style={{ color: "#0aa324" }}
                    className="hover:scale-125 cursor-pointer"
                  />
                ) : (
                  <Icon
                    icon="ri:heart-line"
                    width="1.5rem"
                    height="1.5rem"
                    style={{ color: "#808080" }}
                    className="hover:scale-125 cursor-pointer"
                  />
                )}
              </div>
            </p>
          </div>
        ))}

      <Footer />
    </>
  );
};

export default DisplayArtist;
