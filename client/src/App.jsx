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
  console.log(user);

  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState();
  const [Cookies] = useCookies(["accesstoken"]);
  const getRoomFromURL = () => {
    const pathSegments = window.location.pathname.split("/");
    return pathSegments[2];
  };

  useEffect(() => {
    const url = getRoomFromURL();
    console.log(url);
    if (url && window.location.pathname === "/") {
      navigate(`/whiteboard/${url}`, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await tokenApi.get("");
        setdata(res.data);
      } catch (error) {
        if (error) {
          setdata(error.response.data);
        }
      }
    };
    getAccessToken();
  }, [Cookies.accesstoken]);

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
      </Routes>
    </>
  );
}

export default App;
