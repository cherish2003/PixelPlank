import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import canvasRouter from "./routes/canvas.route.js";
import connectDB from "./db/index.js";
import http, { get } from "http";
import { Server } from "socket.io";
import { log } from "console";
const rooms = {};
const userIdToSocketId = {};
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
  socket.on("join-Room", (roomName, username, user_id) => {
    console.log(roomName, username, user_id);

    if (!rooms[roomName]) {
      rooms[roomName] = { users: {} };
    }

    const existingSocketId = rooms[roomName].users[user_id];

    if (existingSocketId && existingSocketId !== socket.id) {
      if (io.sockets.connected && io.sockets.connected[existingSocketId]) {
        io.sockets.connected[existingSocketId].disconnect(true);
        delete rooms[roomName].users[user_id];
        io.emit("status", `${user_id} disconnected from another device`);
      } else {
        console.error(
          `Socket with ID ${existingSocketId} not found or not connected`
        );
      }
    }

    // Join the room and update the mappings
    socket.join(roomName);
    rooms[roomName].users[user_id] = socket.id;
    console.log(rooms);
   io.to(roomName).emit(
     "users-list",
     Object.entries(rooms[roomName].users).map(([id, name]) => ({ id, name }))
   );

    io.emit("status", "Joined");
    // io.emit("status", `${username} joined room ${roomName}`);
  });
  socket.on("drawing", (room, lines) => {
    console.log(room);
    socket.to(room).emit("drawing", lines);
    console.log(rooms);
  });
  socket.on("clearCanvas", (room, lines) => {
    socket.to(room).emit("clearCanvas", lines);
    console.log(rooms);
  });

  socket.on("leave", (user_id) => {
    console.log(user_id);
    const room = Object.keys(rooms).find((roomName) => {
      return rooms[roomName].users[user_id] !== undefined;
    });

    if (room) {
      // Get the user_id associated with the user_id
      const socket_id = rooms[room].users[user_id];
      console.log(socket_id);

      if (socket_id) {
        socket.leave(room);
      }
      // Delete the user from the room
      delete rooms[room].users[user_id];
      delete userIdToSocketId[user_id];

      // Emit userLeft event to the room
      io.to(room).emit("userLeft", user_id);
      io.emit("status", `${user_id} left room ${room}`);

      // Check if the room is empty, if so, delete the room
      if (Object.keys(rooms[room].users).length === 0) {
        delete rooms[room];
        io.emit("status", `Room ${room} deleted as it is empty`);
      }
    }
    console.log(rooms);
  });
});

function getRoomForUserById(user_id) {
  for (const room in rooms) {
    for (const user_id in rooms[room].users) {
      if (rooms[room].users[user_id] === user_id) {
        return room;
      }
    }
  }
  return null;
}

const DB = connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/canvas", canvasRouter);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
