import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGODB_URI = process.env.MONGODB_URI 

export const JWT_SECRET = process.env.JWT_SECRET 
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1d";