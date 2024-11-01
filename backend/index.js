import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});
import userRoute from "./routes/user.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "i am coming from backened",
    success: true,
  });
});

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOption = {
  origin: "http://localhost:5173",
  Credentials: true,
};

app.use(cors(corsOption));

//yaha par api ayenge------------------
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`app is running on ${PORT}`);
});

//231894ali
