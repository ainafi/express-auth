// controllers/auth.controllers.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier si tous les champs existent
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Vérifier si user existe déjà
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Créer user
        const newUser = await User.create({ name, email, password: hashPassword });

        // Générer JWT
        const token = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        res.status(201).json({
            message: "User signed up successfully",
            data: {
                user: newUser,
                token
            }
        });
    } catch (error) {
        next(error);
        res.status(500).json({
            message: "Error signing up user",
            error: error.message
        });
    }
};

export const signIn=async(req,res,next)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isMatchPassword=await bcrypt.compare(password,user.password)
        if(!isMatchPassword){
            
            return res.status(401).json({
                message:"Invalid email or password"
                
            })
        }
        const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRATION})
        res.status(200).json({
            message:"User signed in successfully",
            data:{
                user,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}

export const signOut=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}