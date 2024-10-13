import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import canvasRouter from "./routes/canvas.route.js";
import connectDB from "./db/index.js";
import http from "http";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { handleConnection } from "./socket/handleSocket.js";
import path from "path";
dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true, // Allow credentials
  })
);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
handleConnection(io);

const DB = connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/canvas", canvasRouter);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
