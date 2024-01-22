import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    sameSite: "none",
  })
);

const DB = connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
