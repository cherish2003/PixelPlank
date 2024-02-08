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
  socket.on("join-Room", (roomName, username) => {
    if (!rooms[roomName]) {
      rooms[roomName] = { users: {} };
    }
    socket.join(roomName);
    console.log(roomName);
    io.to(roomName).emit(
      "users-list",
      Object.entries(rooms[roomName].users).map(([id, name]) => ({ id, name }))
    );
  });
  socket.on("drawing", (room, lines) => {
    socket.to(room).emit("drawing", lines);
    console.log(rooms);
  });
  socket.on("clearCanvas", (room, lines) => {
    socket.to(room).emit("clearCanvas", lines);
    console.log(rooms);
  });
  socket.on("disconnect", () => {
    getUserRooms(socket).forEach((room) => {
      io.to(room).emit("user-disconnected", rooms[room].users[socket.id]);
      delete rooms[room].users[socket.id];
      if (Object.keys(rooms[room].users).length === 0) {
        delete rooms[room];
      }
    });
  });
});

const getUserRooms = (socket) => {
  return Object.entries(socket.rooms)
    .filter(([key, value]) => value !== socket.id)
    .map(([key]) => key);
};

const DB = connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/canvas", canvasRouter);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
