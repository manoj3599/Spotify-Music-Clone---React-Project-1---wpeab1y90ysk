import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react/dist/iconify.js";

const Sidebar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full h-full p-2 flex-col gap-2 text-white lg:w-[25%] lg:flex hidden">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="Home" />
          <p onClick={() => navigate('/')} className="font-bold">Home</p>
        </div>
        <Link to="/Search">
          <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img className="w-6" src={assets.search_icon} alt="Search" />
            <p className="font-bold">Search</p>
          </div>
        </Link>
      </div>

      <div className="bg-[#121212] h-[85%] rounded flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="Your Library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="Expand/Collapse" />
            <img className="w-5 cursor-pointer" src={assets.plus_icon} alt="Add" />
          </div>
        </div>

        {/* Liked Songs Section */}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <div>
          <h1>Liked Song</h1>
          <p className="font-light">It's easy, we will help you</p>
          <Link to="/DisplayLikedSongs">
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Liked Songs
          </button>
          </Link>
        </div>

        {/* Podcasts Section */}
        <div className="mt-5 pb-5">
  <h1>Let's find some podcasts to follow</h1>
  <p className="font-light">We'll keep you updated on new episodes</p>
  <Link to="/CommingSoon">
    <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
      Browse Podcasts
    </button>
  </Link>
</div>

</div>
        {/* Legal Links Section */}
        <div className="flex flex-col gap-2 text-sm text-zinc-400 pl-4 mt-5 pr-2.5">
          <div className="flex justify-between">
            <h5>Legal</h5>
            <h5>Privacy Center</h5>
            <h5>Privacy Policy</h5>
          </div>
          <div className="flex justify-between">
            <h5>Cookies</h5>
            <h5>About Ads</h5>
            <h5>Accessibility</h5>
          </div>
          <div className="flex">
            <h5>Contact</h5>
          </div>
        </div>

        {/* Language Selector */}
        <Link to="/CommingSoon">
          <div className="py-4 p-2.5">
            <div className="mt-4 border rounded-full border-gray-700 text-white font-semibold flex justify-center items-center hover:border-white hover:scale-105 cursor-pointer">
              <Icon icon="lucide:globe" />
              <div className="p-1">English</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
