import React from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import Display from "./Components/Display";
import Register from "./LoginComponent/Register";
import Login from "./LoginComponent/Login";
import Navbar from "./Components/Navbar";
import axios from 'axios';

const App = () => {
  const location = useLocation(); // Get the current location

  // Check if the current path is '/Register' or '/Login'
  const isAuthPage = location.pathname === "/Register" || location.pathname === "/Login";

  axios.interceptors.request.use(async (config) => {
    config.headers['projectid'] = "f104bi07c490";
    return config;
  })

  return (
    <div className="h-screen bg-black">
      {/* Only render Sidebar and Player when not on the authentication pages */}
      
      {!isAuthPage && (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            
            <Display />
          </div>
          <Player />
        </>
      )}
      
      {/* Routes for navigating between pages */}
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        {/* Add other routes here if needed */}
      </Routes>
    </div>
  );
};

export default App;
