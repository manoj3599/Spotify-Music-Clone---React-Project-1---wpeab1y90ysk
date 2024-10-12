import React from "react";
import { Icon } from '@iconify/react';
import playCircleOutline from '@iconify-icons/mdi/play-circle-outline'; // Importing the play icon
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const SongItem = ({ image, name, id }) => {
  const navigate = useNavigate();

  const { playWithId } = useUser();

  return (
    <div onClick={()=>{playWithId(id)}}
      className="relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-full h-full" src={image} alt={name} />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-transparent">
      <Icon 
  icon={playCircleOutline}
  className="text-green-500"
  width="150"  // Increase the width
  height="150" // Increase the height
/>
      </div>
    </div>
  );
};

export default SongItem;
