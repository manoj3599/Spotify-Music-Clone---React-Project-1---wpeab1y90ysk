import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import Register from "../LoginComponent/Register";
import Navbar from "./Navbar";
import DisplayAlbum from "../navigation/DisplayAlbum";
import DisplayArtist from "../navigation/DisplayArtist";
import DisplaySongs from "../navigation/DisplaySongs";
import { ToastContainer } from "react-toastify";
import CommingSoon from "../NavbarNavigation/CommingSoon";
import Search from "../navigation/Search";
import DisplayLikedSongs from "../navigation/DisplayLikedSongs";

const Display = () => {

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album")
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  return (
    <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
        <Route path="/artist/:id" element={<DisplayArtist />} />
        <Route path="/Music" element={<DisplaySongs />} />
        <Route path="/CommingSoon" element={<CommingSoon />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/DisplayLikedSongs" element={<DisplayLikedSongs />} />
       
      </Routes>
    </div>
  );
};

export default Display;
