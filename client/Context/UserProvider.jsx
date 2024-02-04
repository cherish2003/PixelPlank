import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const userState = {};

const initialState = () => {
  const localState = localStorage.getItem("userData");
  return localState ? JSON.parse(localState) : userState;
};
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  useEffect(() => {
    const items = localStorage.setItem("userData",JSON.stringify(user));
    console.log(items);
  }, [user]);

  const logoutUser = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
