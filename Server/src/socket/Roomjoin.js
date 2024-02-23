import { rooms } from "../constants.js";

export const handleuserJoin = async (
  socket,
  io,
  roomName,
  username,
  user_id
) => {
  console.log(roomName, username, user_id);

  if (!rooms[roomName]) {
    rooms[roomName] = { users: {} };
  }

  const existingSocketId = rooms[roomName].users[user_id];

  if (existingSocketId && existingSocketId !== socket.id) {
    if (io.sockets.connected && io.sockets.connected[existingSocketId]) {
      io.sockets.connected[existingSocketId].disconnect(true);
      delete rooms[roomName].users[user_id];
    } else {
      console.error(
        `Socket with ID ${existingSocketId} not found or not connected`
      );
    }
  }

  socket.join(roomName);
  rooms[roomName].users[user_id] = socket.id;
  console.log(rooms);
  io.to(roomName).emit("new user", socket.id);
  io.to(roomName).emit(
    "users-list",
    Object.entries(rooms[roomName].users).map(([id, name]) => ({
      id,
      name,
    }))
  );

  io.to(roomName).emit("status", "Joined", username);
};
