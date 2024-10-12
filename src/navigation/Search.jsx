import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SongItem from "../List_album_artist/SongItem";
import AlbumItem from "../List_album_artist/AlbumItem";
import { useUser } from "../UserProvider";
import axios from "axios";
import Footer from "../NavbarNavigation/Footer";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [getSongs, setSongs] = useState([]);
  const [album, setAlbum] = useState([]);
  const { setCurrentPlaying, setAlbumData, list } = useUser(); // Use 'list' from context
  const [selectedTab, setSelectedTab] = useState("All"); // Manage which tab is selected

  // Fetch all songs
  const allSongs = async () => {
    try {
      const response = await axios.get("https://academics.newtonschool.co/api/v1/music/song?limit=16");
      setSongs(response.data.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  // Fetch all albums
  const fetchAlbums = async () => {
    try {
      const response = await axios.get("https://academics.newtonschool.co/api/v1/music/album?limit=16");
      setAlbum(response.data.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  // Play a selected song
  const handlePlaySongs = (song) => {
    setCurrentPlaying(song);
  };

  // Handle album click
  const handleAlbumClick = async (albumId) => {
    try {
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/music/album/${albumId}`);
      setAlbumData(response.data.data);
      navigate(`/album/${albumId}`);
    } catch (error) {
      console.error("Error fetching album details:", error);
    }
  };

  useEffect(() => {
    // Fetch both albums and songs initially
    allSongs();
    fetchAlbums();
  }, []);

  return (
    <>
      <Navbar />

      {/* Tabs for switching between Songs and Albums */}
      <div className="container mx-auto px-4 mt-4">
        <div className="flex space-x-4">
          <button 
            onClick={() => setSelectedTab("All")}
            className={`text-white bg-zinc-800 px-4 py-2 rounded-md ${selectedTab === "All" ? "bg-zinc-700" : ""}`}>
            All
          </button>
          <button 
            onClick={() => setSelectedTab("Songs")}
            className={`text-white bg-zinc-800 px-4 py-2 rounded-md ${selectedTab === "Songs" ? "bg-zinc-700" : ""}`}>
            Songs
          </button>
          <button 
            onClick={() => setSelectedTab("Albums")}
            className={`text-white bg-zinc-800 px-4 py-2 rounded-md ${selectedTab === "Albums" ? "bg-zinc-700" : ""}`}>
            Albums
          </button>
        </div>
      </div>

      {/* Grid layout */}
      <div className="container mx-auto px-4 mb-4">
        <h1 className="my-5 font-bold text-2xl">
          {selectedTab === "Songs" ? "All Songs" : "Albums"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* If a search is performed, display filtered songs or albums */}
  {list.length > 0 ? (
    list.map((item, index) => (
      <div 
        key={index} 
        onClick={() => {
          if (item.type === "album") {
            handleAlbumClick(item._id); // For albums
          } else {
            handlePlaySongs(item); // For songs
          }
        }} 
        className="cursor-pointer"
      >
        {item.type === "album" ? (
          <AlbumItem name={item?.title} image={item?.image} id={item._id} />
        ) : (
          <SongItem name={item?.title} image={item?.thumbnail} id={item._id} />
        )}
      </div>
    ))
  ) : (
    // Otherwise, display all songs/albums based on selected tab
    selectedTab === "Songs" ? (
      getSongs.map((song, index) => (
        <div key={index} onClick={() => handlePlaySongs(song)} className="cursor-pointer">
          <SongItem name={song.title} image={song.thumbnail} id={song._id} />
        </div>
      ))
    ) : (
      album.map((albumItem, index) => (
        <div key={index} onClick={() => handleAlbumClick(albumItem._id)} className="cursor-pointer">
          <AlbumItem name={albumItem.title} image={albumItem.image} id={albumItem._id} />
        </div>
      ))
    )
  )}
</div>

      </div>

      <Footer />
    </>
  );
};

export default Search;
