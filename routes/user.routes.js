import express from "express";
import { getUser, getUsers, updateUser } from "../controllers/user.controllers.js";
import authorize from "../middleware/auth.middleware.js";
const userRouter = express.Router();

userRouter.get("/",getUsers)
userRouter.get("/:id",authorize ,getUser)
userRouter.post("/", (req, res) => {
  res.json({ message: "User route is working!" });
})

userRouter.put("/:id",updateUser)
userRouter.delete("/:id", (req, res) => {
  res.json({ message: "User route is working!" });
})
export default userRouter;