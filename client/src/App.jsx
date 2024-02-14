import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import "./App.css";
import { Navbar } from "../Components/Navbar";
import { Home } from "../Pages/Home";
import { Board } from "../Pages/Board";
import { Test } from "../Components/Test";
import { Tool } from "../Components/Tool";
import Cookies from "js-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { tokenApi } from "../Api/userApi";
import { useCookies } from "react-cookie";
import { UserContext } from "../Context/UserProvider";
import { useContext } from "react";

function App() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const getRoomFromURL = () => {
    const pathSegments = window.location.pathname.split("/");
    return pathSegments[2];
  };
  const RoomOwner = getRoomFromURL();
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState(null);
  const [Cookies] = useCookies(["accesstoken"]);

  useEffect(() => {
    if (Object.keys(user).length != 0) {
      navigate(`/whiteboard/${user.username}`, { replace: true });
    }
  }, [user]);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await tokenApi.get("");
        console.log(res.data);
        // setdata(res.data);
      } catch (error) {
        if (error) {
          console.log(error);
          // setdata(error.response.data);
        }
      }
    };
    getAccessToken();
  }, [Cookies.accesstoken && RoomOwner != "anonymous"]);

  // useEffect(() => {
  //   if (data) {
  //     const { logout } = data;
  //     console.log(logout);
  //     if (logout) {
  //       navigate("/", { replace: true });
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard/:username" element={<Board />} />
        <Route path="/whiteboard/anonymous" element={<Board />} />
        <Route path="*" element={<Navigate to="/whiteboard/anonymous" />} />
      </Routes>
    </>
  );
}

export default App;
