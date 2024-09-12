/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({})


export function UserContextProvider({children}){
    const [user,setUser] = useState(() => {

    // Retrieve the user from local storage when the app loads
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
});

    useEffect(()=>{
      if (!user) {
      // If no user data in local storage, fetch it from the server
      getUser();
    }
  });

    const getUser=async()=>{
      try{
        const res=await axios.get(URL+"/api/auth/refetch",{withCredentials:true})
        setUser(res.data)

      }
      catch(err){
        console.log(err)
      }
    }

     useEffect(() => {
    // Update local storage whenever the user state changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);


     return (
     <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>)
}
