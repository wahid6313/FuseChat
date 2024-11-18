import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import { app, server } from "./socket/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// app.get("/", (_, res) => {
//   return res.status(200).json({
//     message: "i am coming from backened",
//     success: true,
//   });
// });

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOption = {
  origin: " http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOption));

//yaha par api ayenge------------------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  connectDB();
  console.log(`app is running on ${PORT}`);
});

//231894ali
