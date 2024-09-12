/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Homeposts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import axios from "axios"
import { URL } from "../url"
import { Link, useLocation } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import Loader from '../components/Loader'


const Home = () => {

  const [posts,setPosts] = useState([])
  const {search} = useLocation()
  const [noResults,setNoResults] = useState(false)
  const [loader,setLoader] = useState(false)
  const {user} = useContext(UserContext)


    const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/"+search)
      // console.log(res.data)
      setPosts(res.data.reverse())
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }


  useEffect(()=>{
    fetchPosts()
  },[search])



  return (
    <>
    <Navbar/>
    <div className="px-8 md:px-[200px] min-h-[70vh]">
      {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader/></div> :!noResults? posts.map((post)=>( 
        <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <Homeposts key={post._id} post={post}/>
          </Link>
          </>
      )): <h3 className = "text-center mt-16 font-bold">No posts available</h3>}
    </div>
    <Footer/>
    </>
    
  )
}

export default Home