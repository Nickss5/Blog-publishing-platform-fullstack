import { Link, useNavigate } from "react-router-dom"
import login from '../assets/login.png'
import { useContext, useState } from "react"
import axios from "axios"
import {URL} from "../url" 
import { UserContext } from "../context/UserContext"


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const {setUser} = useContext(UserContext)
    const navigate= useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post(URL+"/api/auth/login", {email,password}, {withCredentials:true})
            //console.log(res.data)
            setUser(res.data)
            navigate("/")
        }
        catch(error) {
            setError(true)
            console.log(error)
        }

    }
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-3xl font-extrabold mr-3 font-serif"><Link to = "/">NClouds</Link></h1>
        <h3><Link to = "/register">Register</Link></h3>
    </div>
    <div className = "flex flex-col md:flex-row md:ml-[130px] justify-center items-center">
        <div className = "flex flex-col justify-center items-center h-[60vh] md:h-[50vh]">
             <h1 className="px-6 py-6 xl:px-[60px] xl:mt-[50px] text-black- font-sans text-4xl md:text-7xl">Human stories & ideas</h1>
             <p className = "px-6 font-serif ">A place to read, write, and deepen your understanding</p> 
            <img src = {login} className = "w-[150px] mt-5 xl:w-[250px]"/>    
        </div>
        <div className="w-full flex justify-center items-center h-[50vh] md:h-[80vh]">
            <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[35%]">
                <h1 className="text-2xl font-serif text-left mb-4">Welcome back.</h1>
                <input onChange = {(e) => setEmail(e.target.value)} className="w-[280px] px-4 py-2 border-2 border-black outline-0" type = "text" placeholder = "Enter your email" />
                <input onChange = {(e) => setPassword(e.target.value)} className="w-[280px] px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
                <button onClick = {handleLogin} className = "w-[280px] px-4 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">Sign in</button>
                
                {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
                <div className = "flex justify-center items-center space-x-3">
                    <p>New here?</p>
                    <p className="text-green-500 font-bold hover:text-black"><Link to = "/register">Register</Link></p>
                </div>
                <div>
            <p><span className="font-bold">Username:</span> john1@gmail.com</p>
            <p><span className="font-bold">Password: </span> john</p>
        </div>
            </div>
        </div>
        
        
    </div>
    </>
  )
}

export default Login