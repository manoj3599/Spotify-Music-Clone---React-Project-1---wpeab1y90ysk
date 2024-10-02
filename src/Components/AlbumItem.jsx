import React from 'react'

const Albumitem = ({image,name}) => {
  return (
    <div className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded' src={image} alt=''/>
        <p className='font-bold mt-2 mb-1'>{name}</p>
        
    </div>
  )
}

export default Albumitem