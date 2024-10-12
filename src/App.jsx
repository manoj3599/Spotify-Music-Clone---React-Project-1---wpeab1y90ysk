import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import Display from "./Components/Display";
import Register from "./LoginComponent/Register";
import Login from "./LoginComponent/Login";
import Navbar from "./Components/Navbar";
import axios from "axios";
import { useUser } from "./UserProvider";
import Premium from "./NavbarNavigation/Premiumx";

const App = () => {
  const location = useLocation(); // Get the current location

  // Check if the current path is '/Register' or '/Login'
  const isAuthPage =
    location.pathname === "/Register" ||
    location.pathname === "/Login" ||
    location.pathname === "/Premium";

  axios.interceptors.request.use(async (config) => {
    config.headers["projectid"] = "f104bi07c490";
    return config;
  });

  const {audioRef,currentPlaying} = useUser()

  return (
    <div className="h-screen bg-black">
     <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />

      {/* Only render Sidebar and Player when not on the authentication pages */}

      {!isAuthPage && (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
          <audio ref={audioRef} src={currentPlaying.audio_url} preload="auto" />
        </>
      )}

      {/* Routes for navigating between pages */}
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Premium" element={<Premium/>} />
        {/* Add other routes here if needed */}
      </Routes>
    </div>
  );
};

export default App;
