import { rooms } from "../constants.js";
import { getRoomForUserById } from "../utils/getUseroom.js";
import { handleuserJoin } from "./Roomjoin.js";
import { handleRoomleave } from "./Roomleave.js";

const users = {};
const socketToRoom = {};

export const handleConnection = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-Room", (roomName, username, user_id) => {
      handleuserJoin(socket, io, roomName, username, user_id);
    });

    socket.on("drawing", (room, lines) => {
      socket.to(room).emit("drawing", lines);
    });

    socket.on("clearCanvas", (room, lines) => {
      socket.to(room).emit("clearCanvas", lines);
    });
    socket.on("shapeMoved", (room, updatedLines) => {
      socket.to(room).emit("shapeMoved", updatedLines);
    });
    socket.on("textMoved", (user_id, newPos) => {
      const roomName = getRoomForUserById(user_id);
      console.log(roomName);
      socket.to(roomName).emit("textMoved", newPos);
    });
    socket.on("textChanged", (user_id, newtext) => {
      const roomName = getRoomForUserById(user_id);
      socket.to(roomName).emit("textChanged", newtext);
    });
    socket.on("leave", (user_id, roomName) => {
      handleRoomleave(socket, io, user_id, roomName);
    });

    socket.on("sending signal", (payload) => {
      console.log(payload);
      io.to(payload.userToSignal).emit("user joined", {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });
    socket.on("peerincom", (peerincom) => {
      console.log("erri puka");
      console.log(peerincom);
    });
    socket.on("returning signal", (payload) => {
      console.log(payload);
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        id: socket.id,
      });
    });
  });
};
