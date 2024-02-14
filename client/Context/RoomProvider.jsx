import React, { createContext, useEffect, useReducer, useState } from "react";

const initialState = {
  InRoom: false,
  Room_owner: null,
  users_in_room: [],
};

const Roomreducer = (state, action) => {
  switch (action.type) {
    case "Create":
      return {
        ...state,
        Room_owner: action.payload,
        InRoom: true,
      };
    case "Join":
      return {
        ...state,
        InRoom: true,
      };
    case "Leave":
      return {
        ...state,
        Room_owner: null,
        InRoom: false,
      };
    case "userList":
      return {
        ...state,
        users_in_room: action.payload,
      };
  }
};
export const Roomcontext = createContext(initialState);
export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Roomreducer, initialState);
  const JoinRoom = () => {
    dispatch({ type: "Join" });
  };
  const CreateRoom = (RoomOwner) => {
    dispatch({ type: "Create", payload: RoomOwner });
  };
  const LeaveRoom = () => {
    dispatch({ type: "Leave" });
  };
  const setRoomUsers = (List) => {
    dispatch({ type: "userList", payload: List });
  };
  const getRoomUsers = () => {
    return state.users_in_room;
  };

  return (
    <Roomcontext.Provider
      value={{
        roomdata: state,
        JoinRoom: JoinRoom,
        CreateRoom: CreateRoom,
        LeaveRoom: LeaveRoom,
        SetusersList: setRoomUsers,
      }}
    >
      {children}
    </Roomcontext.Provider>
  );
};
