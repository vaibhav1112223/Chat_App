import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";



const SignUpPage = () => {
  
    const[showPassword,setShowPassword]=useState(false)
    const[formData,setFormData]=useState({
        fullName:"",
        email:"",
        password:"",
    })
    const{signUp,isSigningUp}=useAuthStore() 


const handleChange=(e)=>{
  setFormData((currData)=>{
    return {...currData,[e.target.name]:e.target.value}
  })
 
}
const validateForm=()=>{
  if(!formData.fullName.trim()) return toast.error("fullname is required")
      if(!formData.email.trim()) return toast.error("email is required")
        if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("invalid email format")
           if(!formData.password) return toast.error("password is required")
          if(formData.password.length<6) return toast.error("password is required")
            return true
}

const handleSubmit=(e)=>{
e.preventDefault()
const success=validateForm()
if(success===true) signUp(formData)
}
  return (

   <div className="flex items-center justify-center min-h-screen bg-black-100 px-4">
      <div className="w-full max-w-md bg-black rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>

     

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
<div className='flex items-center justify-between w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            
             
           
            required
          />
            <button type='button' onClick={()=>setShowPassword(!showPassword)}> {showPassword ? (
          <EyeOff></EyeOff>)
          : 
        (<Eye></Eye>)}
        </button>
        </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-black py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isSigningUp ? <>
            <Loader2 className='size-5 animate-spin'/>
            loading...
            </>
            : ("create account") } 

       

          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
    
  )
}

export default SignUpPage
