import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import canvasRouter from "./routes/canvas.route.js";
import connectDB from "./db/index.js";
import http from "http";
import { Server } from "socket.io";
import { log } from "console";
const rooms = {};
dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  // console.log("A user connected");
  // console.log(socket.id);
  socket.on("join-Room", (roomName) => {
    if (!rooms[roomName]) {
      rooms[roomName] = { users: {} };
    }
    socket.join(roomName);
    rooms[roomName].users[socket.id] = roomName;
    io.to(roomName).emit("users-connected", roomName);
    console.log(rooms);
    socket.emit("users-list", Object.values(rooms[roomName].users));
  });
  socket.on("drawing", (room, lines) => {
    // console.log(room, lines);
    socket.to(room).emit("drawing", lines);
  });
  // socket.on("clearcanvas", (data) => {
  //   socket.broadcast.emit("clearcanvas", data);
  // });
  // socket.on("disconnect", () => {
  //   console.log("User disconnected");
  // });
});

const DB = connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/canvas", canvasRouter);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
