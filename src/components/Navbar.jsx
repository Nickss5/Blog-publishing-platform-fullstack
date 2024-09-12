import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoIosSearch } from "react-icons/io";
import { HiMiniBars3 } from "react-icons/hi2";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {

    const [prompt, setPrompt] = useState("")
    const [menu,setMenu] = useState(false)
    const navigate= useNavigate()
    const path = useLocation().pathname

    const showMenu = () => {
      setMenu(!menu)
    }

    const handleSearch = () => {
        navigate(prompt ? `?search=${prompt}` : "/");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch(); // Trigger search when pressing Enter
        }
    };

    const {user} = useContext(UserContext)

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-3xl font-extrabold mr-3 font-serif"><Link to = "/">NClouds</Link></h1>
        {path==="/" && 
        <div className="flex justify-center items-center space-x-0">
          <p onClick={handleSearch} className="cursor-pointer "><IoIosSearch/></p>
           <input value={prompt} onChange={(e)=>setPrompt(e.target.value)}  onKeyDown={handleKeyDown} className="outline-none px-1 " placeholder="Search a post" type="text"/>
        </div>}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
            {user? <h3><Link to = "/write">Write</Link></h3>:<h3><Link to = "/login">Sign in</Link></h3>}
            {user? <div onClick={showMenu}>
              <p className="cursor-pointer relative"><HiMiniBars3/></p>
              {menu && <Menu/>}
            </div>: <h3><Link to="/register">Register</Link></h3>}
        </div>

        <div onClick = {showMenu} className = "md:hidden text-lg">
          <p className="cursor-pointer relative" ><HiMiniBars3 /></p>
          {menu && <Menu/>}
        </div>
    </div>
  )
}

export default Navbar