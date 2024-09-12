/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"


const Profile = () => {
    const param=useParams().id
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {user,setUser}=useContext(UserContext)
    const navigate=useNavigate()
    const [posts,setPosts]=useState([])
    const [updated,setUpdated]=useState(false)
    // console.log(user)


    const fetchProfile=async ()=>{
        try{
            const res=await axios.get(URL+"/api/users/"+user._id)
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleUserUpdate=async ()=>{
        setUpdated(false)
        try{
            // eslint-disable-next-line no-unused-vars
            const res=await axios.put(URL+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
            // console.log(res.data)
            setUpdated(true)

        }
        catch(err){
            console.log(err)
            setUpdated(false)
        }

    }

    const handleUserDelete=async()=>{
        try{
            const res=await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
            setUser(null)
            navigate("/")
            // console.log(res.data)

        }
        catch(err){
             console.log(err)
            }
    }
    // console.log(user)

    const fetchUserPosts=async ()=>{
        try{
            const res=await axios.get(URL+"/api/posts/user/"+user._id)
            // console.log(res.data)
            setPosts(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

useEffect(() => {
  if (user?._id) {
    fetchProfile();
  }
}, [user?._id]);

useEffect(() => {
  if (user?._id) {
    fetchUserPosts();
  }
}, [user?._id]);


  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] mt-8 flex xl:flex-row xl:items-start flex-col-reverse">
            <div className="flex flex-col md:w-[70%] w-full mt-9">
                <h1 className="text-xl font-bold mb-4 mt-5 md:mt-0">Your posts:</h1>
                {posts?.map((p)=>(
                  <ProfilePosts key={p._id} p={p}/>
                ))}
            </div>
            <div className="flex justify-start items-start md:w-[30%] w-full md:items-end md:pl-16">
                <div className="flex flex-col space-y-4 items-start">
                    <h1 className="text-xl font-bold mb-4">Profile</h1>
                <input onChange={(e)=>setUsername(e.target.value)} value={username} className="outline outline-1 px-4 py-2 text-gray-500" placeholder="Your username" type = "text"/>
                <input onChange={(e)=>setEmail(e.target.value)} value={email}  className="outline outline-1 px-4 py-2 text-gray-500" placeholder="Your email" type = "text"/>
                <div className="flex items-center space-x-4 mt-8">
                    <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
                    <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
                </div>
                {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default Profile