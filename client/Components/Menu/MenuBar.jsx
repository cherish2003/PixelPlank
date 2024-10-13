import React, { useContext, useState } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { TextField } from "@radix-ui/themes";

import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { IoMdDownload } from "react-icons/io";
import { IoIosUndo } from "react-icons/io";
import { IoIosRedo } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import "./index.scss";
import { UserContext } from "../../Context/UserProvider";
import { Roomcontext } from "../../Context/RoomProvider";
import { SocketContext } from "../../Context/SocketProvider";
import { useNavigate } from "react-router-dom";
export const MenuBar = ({
  undo,
  redo,
  clearAll,
  downloadImage,
  setRoomname,
  roomname,
  setToast,
  setMessage,
}) => {
  // const getRoomFromURL = () => {
  //   const pathSegments = window.location.pathname.split("/");
  //   return pathSegments[2];
  // };
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { username, email } = user;
  console.log(user);
  const { roomdata, JoinRoom, LeaveRoom } = useContext(Roomcontext);

  const logout = () => {
    logoutUser();
    navigate("/", { replace: true });
  };

  const joinRoom = () => {
    if (!roomdata.InRoom) {
      socket.emit(
        "join-Room",
        roomname,
        user && user._id ? user.username : "anonymous",
        user && user._id ? user._id : "anonymous"
      );
      JoinRoom();
    } else {
      setToast(true);
      setMessage("Already in room 🏠");
    }
  };

  return (
    <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
      <Toolbar.Button className="ToolbarButton" onClick={undo} >
        <IoIosUndo size={20} />
      </Toolbar.Button>
      <Toolbar.Button className="ToolbarButton" onClick={redo}>
        <IoIosRedo size={20} />
      </Toolbar.Button>
      <Toolbar.Button className="ToolbarButton" onClick={clearAll}>
        <MdDelete size={20} />
      </Toolbar.Button>
      <Toolbar.Button className="ToolbarButton" onClick={downloadImage}>
        <IoMdDownload size={22} />
      </Toolbar.Button>
      <Toolbar.Separator className="ToolbarSeparator" />
      <div style={{ display: "flex", gap: 20 }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Avatar.Root className="AvatarRoot">
              {Object.keys(user).length != 0 ? (
                <>
                  <Avatar.Image src={`${user.avatar}`} />
                  <Avatar.Fallback className="AvatarFallback">
                    {user.username.slice(0, 2).toUpperCase()}
                  </Avatar.Fallback>
                </>
              ) : (
                <Avatar.Fallback className="AvatarFallback">AN</Avatar.Fallback>
              )}
            </Avatar.Root>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent">
              <DropdownMenu.Label className="DropdownMenuLabel  font-semibold">
                User Info
              </DropdownMenu.Label>
              <DropdownMenu.Label className="DropdownMenuLabel">
                username: {username ? username : "Anonymous"}
              </DropdownMenu.Label>
              <DropdownMenu.Label className="DropdownMenuLabel">
                email: {email ? email : "Anonymous"}
              </DropdownMenu.Label>

              <DropdownMenu.Separator className="DropdownMenuSeparator" />

              <DropdownMenu.Label className="DropdownMenuLabel  font-semibold">
                Room
              </DropdownMenu.Label>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                  Join room
                  <div className="RightSlot">
                    <ChevronRightIcon />
                  </div>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    className="DropdownMenuSubContent"
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <TextField.Root>
                      <TextField.Input
                        placeholder="Enter username"
                        variant="soft"
                        color="bronze"
                        onChange={(e) => {
                          setRoomname(e.target.value);
                          console.log(roomname);
                        }}
                      />
                    </TextField.Root>

                    <DropdownMenu.Separator className="DropdownMenu.Separator" />
                    <DropdownMenu.Item
                      className="DropdownMenuItem"
                      style={{ textAlign: "center" }}
                      onClick={joinRoom}
                    >
                      Join room
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>

              <DropdownMenu.Item
                className="DropdownMenuItem"
                onClick={() => {
                  if (roomdata.InRoom) {
                    socket.emit("leave", user._id, user.username);
                    LeaveRoom();
                  } else {
                    setToast(true);
                    setMessage("Not in room to leave 😞");
                  }
                }}
              >
                Leave Room
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="DropdownMenuSeparator" />
              <DropdownMenu.Item className="DropdownMenuItem" onClick={logout}>
                Logout
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className="DropdownMenuArrow" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <Toolbar.Separator className="ToolbarSeparator" />
    </Toolbar.Root>
  );
};
