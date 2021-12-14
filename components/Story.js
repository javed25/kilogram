import React from 'react'
import Avatar from 'react-avatar';

function Story(props) {

    return (
        <div>
            <Avatar src={props.img_src} size="70" className='h-14 w-14 rounded-full  border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition-transform duration-200 ease-out'/>
            <p>{props.username.slice(0,9)}</p>
        </div>
    )
}

export default Story;
