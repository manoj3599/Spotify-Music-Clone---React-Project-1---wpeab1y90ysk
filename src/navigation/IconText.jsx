import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const IconText = ({ iconName, active, displayText }) => {
    return (
        <div className='flex pt-1.2 pl-2 cursor-pointer'>
            <div className='hover:text-white'>
                <Icon 
                    icon={iconName}
                    fontSize={25}
                />
            </div>
            <div className={`${active ? "text-white" : "text-zinc-400"} font-bold p-1 pl-3 hover:text-white`}>
                {displayText}
            </div>
        </div>
    );
}

export default IconText;
