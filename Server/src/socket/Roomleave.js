import { rooms } from "../constants.js";

export const handleRoomleave = (socket, io, user_id, roomName) => {
  const room = rooms[roomName];
  console.log("username", roomName);

  //if the user leaves his own room
  if (room) {
    const socket_id = room.users[user_id];
    if (socket_id) {
      socket.leave(roomName);
      delete room.users[user_id];

      io.to(roomName).emit("userLeft", user_id, roomName);
      io.to(roomName).emit(
        "users-list",
        Object.entries(room.users).map(([id, name]) => ({
          id,
          name,
        }))
      );
      delete rooms[roomName];
    }
  } else {
    //if the user wants to leaves other room

    const room = Object.keys(rooms).find((roomName) => {
      return rooms[roomName].users[user_id] !== undefined;
    });

    if (room) {
      const socket_id = rooms[room].users[user_id];
      console.log(socket_id);

      if (socket_id) {
        socket.leave(room);
      }
      delete rooms[room].users[user_id];

      // io.to(room).emit("userLeft", user_id);
      io.emit("userLeft", user_id, roomName);
      io.to(room).emit(
        "users-list",
        Object.entries(rooms[room].users).map(([id, name]) => ({
          id,
          name,
        }))
      );

      if (Object.keys(rooms[room].users).length === 0) {
        delete rooms[room];
        io.emit("status", `Room ${room} deleted as it is empty`);
      }
    }
  }
  // console.log(rooms);
};
