/* eslint-disable react/prop-types */
import { PiUserCircleFill } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import {IF} from '../url'


const Homeposts = ({post}) => {
  return (
    <div className="w-full flex mt-12 space-x-8">
        {/* left */}
        <div className="flex flex-col w-[65%]">
            <div className="flex mb-2 font-semibold text-black-500 items-center md:mb-4">
                <p><PiUserCircleFill /></p>
                <p className="text-sm">{post.username}</p>
                
            </div>
            <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                {post.title}
            </h1>
            <p className="text-sm md:text-lg text-gray-700 line-clamp-3">
            {post.description}
            </p>
            <div className="flex space-x-2 mt-4 text-black-500 font-semibold items-center">
                <p><FaRegCalendarAlt /></p>
                    <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
            </div>
        </div>
        {/* right */}
        <div className = "w-[35%] h-[200px] flex justify-center items-center">
            <img src = {IF+post.photo} alt = "post-image" className = "w-[300px] h-[150px] object-cover mt-8" />
        </div>
        
    </div>
  )
}

export default Homeposts