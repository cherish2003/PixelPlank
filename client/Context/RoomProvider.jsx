import React, { createContext, useEffect, useReducer, useState } from "react";

const initialState = {
  curr_user_action: "null",
  InRoom: false,
  users_in_room: {},
};

const Roomreducer = (state, action) => {
  switch (action.type) {
    case "Join":
      return {
        ...state,
        curr_user_action: action,
        InRoom: true,
      };
    case "Leave":
      return {
        ...state,
        curr_user_action: action,
        InRoom: false,
      };
    case "Users":
      const { total_users } = action.payload;
      return {
        ...state,
        users_in_room: total_users,
      };
  }
};
export const Roomcontext = createContext(initialState);
export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Roomreducer, initialState);
  return (
    <Roomcontext.Provider value={{ roomdata: state, roomDispatch: dispatch }}>
      {children}
    </Roomcontext.Provider>
  );
};
