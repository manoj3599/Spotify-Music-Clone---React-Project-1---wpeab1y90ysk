import React from 'react';
import { assets } from '../assets/assets';
import { useUser } from '../UserProvider';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { getUser, signOutUser } = useUser();

  const onChangeHandler = () =>{
    localStorage.removeItem("token")
    signOutUser(null)
  }
  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold p-4'>
        <div className='flex items-center gap-2'>
          <img className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="Previous" />
          <img className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="Next" />
        </div>
        <div className='flex items-center gap-4'>
          <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
          <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
          {!getUser && <>
          <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'> <Link to="/Register">Signup</Link></p>
          <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'> <Link to="/Login">Login</Link></p>
          </>}

          {getUser && getUser.status == "success" && <>
            <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'> <Link to="/" onClick ={onChangeHandler}>Logout</Link></p>
          </>}
          <p className='bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm'>D</p>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='text-white px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        <p className='text-white px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
      </div>
    </>
  );
}

export default Navbar;
