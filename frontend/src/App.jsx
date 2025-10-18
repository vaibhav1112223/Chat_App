import React, { useEffect } from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import Homepage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import Navbar from './componnents/Navbar'
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'


const App = () => {
  const {authUser,checkAuth,isCheckingAuth,isLoggingIn,onlineUsers}=useAuthStore()
 const{theme}= useThemeStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log({authUser})
  if(isCheckingAuth && !authUser )return(<div className='flex items-center justify-center h-screen'>
    <span className="loading loading-spinner loading-xs"></span>
    
  </div>)
 if(isLoggingIn && !authUser )return(<div className='flex items-center justify-center h-screen'>
    <span className="loading loading-spinner loading-xs"></span>
    
  </div>)
  
  return (
    <div data-theme={theme}>
      <Navbar/>
   <Routes>
    <Route path="/" element={authUser ?<Homepage/>:<Navigate to="/login"/>}/>
     <Route path="/signup" element={!authUser ?<SignUpPage/>:<Navigate to="/"/>}/>
      <Route path="/login" element={!authUser ?<LoginPage/>:<Navigate to="/"/>}/>
       <Route path="/settings" element={authUser ?<SettingsPage/>:<Navigate to="/login"/>}/>
        <Route path="/profile" element={authUser ?<ProfilePage/>:<Navigate to="/login"/>}/>
   </Routes>
   
   <Toaster/>
    </div>
  )
}

export default App
