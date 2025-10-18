import mongoose from "mongoose";

export const ConnectDB=async()=>{
    try{
      const conn=  await mongoose.connect(process.env.MONGODB_URL)
      console.log("cconnected",conn.connection.host)
    }
    catch(error){
console.log("error",error)
    }
}