import { create } from "zustand";
import { axiosInstance } from "../axios";
import SignUpPage from "../pages/SignUpPage";
import { toast } from "react-hot-toast";

import { io } from "socket.io-client"
const BASE_URL=import.meta.env.MODE==="development"? "http://localhost:5001":"/"
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket()
        }
        catch(error){
            console.log("error",error)
            set({authUser:null})
            
        }
        finally{
            set({
                isCheckingAuth:false
            })
        }
    },
  signUp:async(data)=>{
    set({isSigningUp:true})
    try{
const res=await axiosInstance.post("/auth/signup",data)
   toast.success("account created successffully")
      
set({authUser:res.data})
 get().connectSocket() }
   catch(error){
toast.error(error.message)
   }
   finally{set({isSigningUp:false})
  }
  

  },
  login:async(data)=>{
    set({isLoggingIn:true});
    try{
        const res=await axiosInstance.post("/auth/login",data)
        
        set({authUser:res.data})
        toast.success("login successfully")
        get().connectSocket()
  }
  catch(error){

toast.error(error.message)
  }
  finally{
    set({isLoggingIn:false})
  }
    },
  
  
  logOut:async()=>{
    try{
        await axiosInstance.post("/auth/logout")
        set({authUser:null})
        get().disconnectSocket()
        toast.success("logout successfully")
  }
  catch(error){

toast.error(error.message)
  }
},
updateProfile:async(data)=>{
  set({isUpdatingProfile:true})
  try{
    const res=await axiosInstance.put("/auth/update-profile",data)
   
    set({authUser:res.data})
    toast.success("profile updated successsffully")
  }
  catch(error){
console.log("error in update profile",error)
toast.error(error.message)
  }

  finally{set({isUpdatingProfile:false})
}
}
,
connectSocket:()=>{
  const{authUser}=get()
  if(!authUser || get().socket?.connected) return
const socket=io(BASE_URL,{query:{
  userId:authUser._id
}})
socket.connect()
set({socket:socket})
socket.on("getOnlineUsers",(userIds)=>{
  console.log(userIds)
  set({onlineUsers:userIds})
})
},
disconnectSocket:()=>{
  if(get().socket?.connected) get().socket.disconnect()
     set({ socket: null }) 
}


}))