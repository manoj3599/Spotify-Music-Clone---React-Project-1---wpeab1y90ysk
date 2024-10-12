import React from 'react'

const NavButton = ({displayText, active}) => {
  return (
    <div className='flex cursor-pointer'>
        <div className={`${active ? "text-white" : "text-zinc-400"} font-semibold pl-3 text-base hover:text-white`}>{displayText}</div>
    </div>
  )
}

export default NavButton;
