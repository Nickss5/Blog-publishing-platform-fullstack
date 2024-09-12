/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {  useContext, useEffect, useState } from "react"
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


const EditPost = () => {
    
    const postId=useParams().id
    const {user}=useContext(UserContext)
    const navigate=useNavigate()
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [file,setFile]=useState(null)
    const [category, setCategory] = useState("")
    const [categoryArray, setCategoryArray] = useState([])

    const fetchPost=async()=>{
      try{
        const res=await axios.get(URL+"/api/posts/"+postId)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setFile(res.data.photo)
        setCategoryArray(res.data.categories)

      }
      catch(err){
        console.log(err)
      }
    }

    const handleUpdate=async (e)=>{
      e.preventDefault()
      const post={
        title,
        description,
        username:user.username,
        userId:user._id,
        categories:categoryArray,
        photo: file // Keep existing image if no new file is selected
      }

      if(file instanceof File){  // Check if a new file is uploaded
        const data=new FormData()
        const filename=Date.now()+file.name
        data.append("img",filename)
        data.append("file",file)
        post.photo=filename //Set the new filename
        // console.log(data)
        //img upload
        try{
          const imgUpload=await axios.post(URL+"/api/upload",data)
          // console.log(imgUpload.data)
        }
        catch(err){
          console.log(err)
        }
      }
       
       //post upload
     
      try{
        const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
        navigate("/posts/post/"+res.data._id)
        // console.log(res.data)

      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchPost()
    },[postId])


    const deleteCategory = (i) => {
        let updatedCategoryArray = [...categoryArray]
        updatedCategoryArray.splice(i)
        setCategoryArray(updatedCategoryArray)

    }

    const addCategory = () => {
        let updatedCategoryArray = [...categoryArray]
        updatedCategoryArray.push(category)
        setCategory("")
        setCategoryArray(updatedCategoryArray)
    }

  return (
    <div>
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-3xl font-extrabold mr-3 font-serif"><Link to = "/">NClouds</Link></h1>
        <button onClick={handleUpdate} className = "bg-green-500 w-[80px] text-white px-4 py-2 text-sm rounded-full md:mt-4">Update</button>
        </div>
        <div className="px-6 md:px-[200px] mt-8">
            <form className = "w-full flex flex-col space-y-4 md:space-y-8 mt-4">
                <h1 className = "font-serif md:text-4xl text-2xl">
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} type = "text" placeholder = "Title" className="px-4 py-2 outline-none "/>
                </h1>
                <div className="flex items-center space-x-4">
                    {file && (
                    <img src={`${URL}/images/${file}`} alt="Post" className="h-20 w-20 object-cover rounded" />
                    )}
                    <label className="bg-white-500 text-black border border-black mx-4 px-4 py-2 rounded-full cursor-pointer hover:bg-green-600">
                        + 
                        <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="hidden" />
                    </label>
                </div>
                
                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} rows = {10} cols = {30} className="px-4 py-2 outline-none font-serif" placeholder="Tell your story... " />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-4 md:spcae-x-8">
                        <input value = {category} onChange = {(e) => setCategory(e.target.value)} className="px-4 py-2 outline-none" placeholder="Enter post category" type = "text"/>
                        <div onClick = {addCategory} className="bg-black text-white px-4 py-2 font-smibold cursor-pointer">Add</div>
                    </div>

                  <div className='flex px-4 mt-3'>
                    {categoryArray?.map((c,i)=>(
                        <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                        <p>{c}</p>
                        <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
                    </div>
                    ))}

                    </div>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default EditPost