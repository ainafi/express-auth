import express from "express";
import connnectDatabase from "./database/mongodb.js";
import { PORT, NODE_ENV } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.listen(PORT,async () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
  await connnectDatabase();
  
});