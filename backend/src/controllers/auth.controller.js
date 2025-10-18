import { generateToken } from "../lib/utils.js"

import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js"
export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body
   try{
    if(!fullName || !email || !password){
        return res.status(400).json({message:"all fields are required"})
    }
    if(password.length < 6){
        return res.status(400).json({message:"password must be atleast 6 character"})
    }
    const user=await User.findOne({email})
    if(user) return res.status(400).json({message:"email already exists"})
const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser=new User({
        fullName,
        email,
        password:hashedPassword
    })
    if(newUser){
       generateToken(newUser._id,res)
       await newUser.save();
       res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic
       })
    }
    else{
       return res.status(400).json({message:"invalid user data"})
    }
       
   }catch(error){
console.log("error in signup",error.message)
res.status(500).json({message:"internal server error"})
   }
}



export const login=async (req,res)=>{
  try{
const {email,password}=req.body
const user=await User.findOne({email})
if(!user){
    return res.status(400).json({mesage:"invalid credenttials"})
}
const isPasswordCorrect=await bcrypt.compare(password,user.password)
if(!isPasswordCorrect){
     return res.status(400).json({mesage:"invalid credenttials"})
}
generateToken(user._id,res)
res.status(200).json({
    _id:user._id,
     fullName:user.fullName,
        email:user.email,
        profilePic:user.profilePic

})
  }
  catch(error){
console.log("error in login",error.message)
res.status(500).json({message:"internaal seerver error"})
  }
}


export const logout=(req,res)=>{
   try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logout succesfully"})
   }
   catch(error){
    console.log("error in logout",error.message)
    res.status(400).json({message:"internaal seerver error"})
   }
}



export const updateProfile=async(req,res)=>{
    try{
      const {profilePic}=req.body
    const userID=  req.user._id
    if(!profilePic){
     return  res.status(400).json({message:"profile pic is required"})
    }
    const uploadResponse=await cloudinary.uploader.upload(profilePic)
    const updatedUser=await User.findByIdAndUpdate(userID,{profilePic:uploadResponse.secure_url},{new:true})
res.status(200).json(updatedUser)
    }catch(error){
console.log("error in update profile",error)
      res.status(400).json({message:"internaal seerver error"})
   
    }
}



export const checkAuth =(req,res)=>{
  try{
    res.status(200).json(req.user)
  }
  catch(error){
    console.log("error in checkauth",error)
      res.status(400).json({message:"internaal seerver error"})
  }
}