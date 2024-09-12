/* eslint-disable react/prop-types */
import { PiUserCircleFill } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IF } from "../url"

const ProfilePosts = ({ p }) => {
  return (
    <div>
      <div className="w-full flex mt-12 space-x-8">
        {/* left */}
        <div className="flex flex-col w-[65%]">
          <div className="flex mb-2 font-semibold text-black-500 items-center md:mb-4">
            <p>
              <PiUserCircleFill />
            </p>
            <p className="text-sm">{p.username}</p>
          </div>
          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">{p.title}</h1>
          <p className="text-sm md:text-lg text-gray-700 line-clamp-3">{p.description}</p>
          <div className="flex space-x-2 mt-4 text-black-500 font-semibold items-center">
            <p>
              <FaRegCalendarAlt />
            </p>
            {/* Corrected closing tag */}
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
          </div>
        </div>
        {/* right */}
        <div className = "w-[35%] h-[200px] flex justify-center items-center">
            <img src = {IF+p.photo} alt = "post-image" className = "w-[300px] h-[150px] object-cover mt-8" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
