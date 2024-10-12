import React from 'react'
import spt from "../assets/spoti.svg";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
const CommingSoon = () => {
  return (
    <div className='bg-[#121212] h-screen w-full '>
<Navbar/>
    <div className='w-full flex items-center p-8'>
     
    </div>
    <div className='border-2 w-3/4 md:w-1/2 h-1/4 rounded-2xl border-gray-400 flex justify-center items-center text-4xl md:text-7xl font-mono font-bold text-green-500 m-auto lg:mt-0 mt-14'>
  COMING SOON
</div>

    <div className='text-white lg:pt-4 lg:pl-10'><Footer/></div>
  </div>
  )
}

export default CommingSoon