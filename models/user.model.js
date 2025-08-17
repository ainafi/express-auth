import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:6,
        maxLength:100
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema);
export default User