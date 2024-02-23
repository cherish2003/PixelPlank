import React, { createContext, useEffect, useState } from "react";
import { validateToken } from "../Api/userApi";
import { Navigate, useNavigate } from "react-router-dom";

export const UserContext = createContext();

const userState = {};

const initialState = () => {
  const localState = localStorage.getItem("userData");

  return localState ? JSON.parse(localState) : userState;
};
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const validatetoken = async () => {
      const data = await validateToken.get("");
      console.log(data.data);
      if (data.data.logout) {
        setLogout(true);
      }
    };

    validatetoken();
  }, []);
  useEffect(() => {
    if (!logout) {
      setLogout(false);
    }

  }, [logout]);

  useEffect(() => {
    const items = localStorage.setItem("userData", JSON.stringify(user));

    if (Object.keys(user).length != 0) console.log(items);
  }, [user]);

  const logoutUser = () => {
    setLogout(true);
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
