// AlbumItem.jsx
import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import playCircleOutline from '@iconify-icons/mdi/play-circle-outline'; // Importing the play icon
import { useUser } from '../UserProvider';

const AlbumItem = ({ image, name, id }) => {
  const navigate = useNavigate();
  const { playWithId } = useUser();
  
  return (
    <div 
    onClick={() => {{navigate(`/album/${id}`) } }}
      className='relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'
    >
      <img className='rounded w-full h-full' src={image} alt={name} />
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
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

export default AlbumItem;
