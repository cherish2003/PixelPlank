import React, { useState, useEffect, useRef, useContext } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { motion, AnimatePresence } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Roomcontext } from "../../Context/RoomProvider";
import "../App.scss";
import { getUserData } from "../../../Server/src/controllers/userController";
export const RoomUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersData, setusersData] = useState([]);
  const { roomdata } = useContext(Roomcontext);
  // const getdataofUser = async (id) => {
  //   const data = await getUserData.get(`${id}`);
  //   return data;
  // };

  useEffect(() => {
    setusersData(
      Object.entries(roomdata.users_in_room).map(([id, item]) => {
        return item.id;
      })
    );
  }, [roomdata.users_in_room]);

  // useEffect(() => {
  //   // for (let i = 0; i < usersData.length; i++) {
  //   //   const element = usersData[i];
  //   //   const data = getdataofUser(element);
  //   //   console.log(data);
  //   // }
  // }, [usersData]);

  const [newlyAdded, setNewlyAdded] = useState([]);
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

  const addUser = () => {
    const newUser = {
      name: "New User",
      imgURL: "https://randomuser.me/api/portraits/lego/7.jpg",
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setNewlyAdded((prev) => [...prev, newUser]);
  };

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
            console.log(isNewlyAdded);
            return (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <motion.div
                    key={idx}
                    initial={{ x: isNewlyAdded ? 100 : 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: 100 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tooltip.Trigger asChild>
                      <Avatar.Root className="border-2 border-black h-12 w-12 flex items-center justify-center overflow-hidden rounded-full">
                        <Avatar.Image
                          src={item.imgURL}
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
                        Ayyappa
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
      {/* <button onClick={addUser}>click</button> */}
    </div>
  );
};
