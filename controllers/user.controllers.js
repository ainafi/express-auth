import User from "../models/user.model.js";

export const getUsers=async(req,res,next)=>{
    try {
        const users=await User.find();
        res.status(200).json({message:"Users fetched successfully",data:users})
    } catch (error) {
        next(error)
    }
}

export const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id).select("-password");
        if(!user){
            res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:"User fetched successfully",data:user})
    }catch(error){
        next(error)
    }
}

export const updateUser=async(req,res,next)=>{
    try {
        const userId=req.params.id
        const {name,email,password}=req.body
        const user=await User.findById(userId)
        if(!user){
            res.status(400).json({message:"User not found"})
        }
        if(name){
            user.name=name
        }
        if(email){
            user.email=email
        }
        if(password){
            const salt=await bcrypt.genSalt(10)
            const hashPassword=await bcrypt.hash(password,salt)
            user.password=hashPassword
        }
        const updateUser=await user.save()
        res.status(200).json({message:"User updated successfully",data:updateUser})
    } catch (error) {
        next(error)
    }
}

export const deleteUser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        if(!user){
            res.status(400).json({message:"User not found"})
        }
        await user.remove()
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        next(error)
    }
}