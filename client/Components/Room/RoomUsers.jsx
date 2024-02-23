import React, { useState, useEffect, useRef, useContext } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { motion, AnimatePresence } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Roomcontext } from "../../Context/RoomProvider";
import "../App.scss";
import { getUserdata } from "../../Api/userApi";
import { UserContext } from "../../Context/UserProvider";
import { SocketContext } from "../../Context/SocketProvider";

export const RoomUsers = ({ setToast, setMessage }) => {
  const [users, setUsers] = useState([]);
  const [newlyAdded, setNewlyAdded] = useState([]);
  const { socket } = useContext(SocketContext);

  const [usersData, setusersData] = useState([]);
  const { roomdata } = useContext(Roomcontext);
  const { user } = useContext(UserContext);
  const [left, setleft] = useState(false);

  useEffect(() => {
    // setMessage(`${user.username} left his own room `);
    setNewlyAdded([]);
    setUsers([]);
    // setToast(true);
    setleft(!roomdata.InRoom);
  }, [roomdata.InRoom]);

  useEffect(() => {
    socket.on("userLeft", (user_id, roomName) => {
      const Updatedusers = usersData.filter((usr) => usr._id !== user_id);
      setUsers(Updatedusers);
      setMessage(`${roomName} left the room 👋`);
      setToast(true);
    });
  }, [socket]);

  useEffect(() => {
    setusersData(
      Object.entries(roomdata.users_in_room).map(([id, item]) => {
        return item.id;
      })
    );
    console.log(users);
  }, [roomdata.users_in_room]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all(
          usersData.map(async (element) => {
            const res = await getUserdata(element);
            if (
              !users.some((user) => user.username === res.data.data.username)
            ) {
              // setMessage(`${res.data.data.username} Joined 👦🏻`);
              setUsers((prevUsers) => [...prevUsers, res.data.data]);
              setNewlyAdded((prev) => [...prev, res.data.data]);
            }
          })
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [usersData]);

  const usersContainer = useRef(null);

  useEffect(() => {
    if (newlyAdded.length > 0) {
      setTimeout(() => {
        setNewlyAdded([]);
        if (usersContainer.current) {
          usersContainer.current.scrollTo({
            left: usersContainer.current.scrollWidth,
            behavior: "smooth",
          });
        }
      }, 1000);
    }
  }, [newlyAdded]);

  return (
    <div className="absolute bottom-3 left-5  w-44 h-[70px] users_shadow rounded-lg  flex items-center justify-center ">
      <div
        className="user_scroll flex items-center justify-start -space-x-2 w-[168px] h-3/4"
        ref={usersContainer}
      >
        <AnimatePresence>
          {users.map((item, idx) => {
            const isNewlyAdded = newlyAdded.some(
              (newUser) => newUser.imgURL === item.imgURL
            );
            return (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <motion.div
                    initial={{ x: isNewlyAdded ? 100 : 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: left ? 100 : -100 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tooltip.Trigger asChild>
                      <Avatar.Root className="border-2 border-black h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
                        <Avatar.Image
                          src={item.avatar}
                          className="object-cover"
                        />
                        <Avatar.Fallback>{item.name}</Avatar.Fallback>
                      </Avatar.Root>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="TooltipContent"
                        sideOffset={5}
                      >
                        {item.username}
                        <Tooltip.Arrow className="TooltipArrow" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </motion.div>
                </Tooltip.Root>
              </Tooltip.Provider>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
