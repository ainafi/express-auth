import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";
if(!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}


const connnectDatabase=async()=>{

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

export default connnectDatabase;