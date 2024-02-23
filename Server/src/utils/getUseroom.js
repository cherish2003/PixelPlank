import { rooms } from "../constants.js";

export const getRoomForUserById = (user_id) => {
  for (let roomName in rooms) {
    if (rooms.hasOwnProperty(roomName)) {
      let users = rooms[roomName].users;
      for (let key in users) {
        if (users.hasOwnProperty(key) && String(key) === user_id) {
          return roomName;
        }
      }
    }
  }
  return null; 
};
