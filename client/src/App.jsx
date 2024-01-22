import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import "./App.css";
import { Navbar } from "../Components/Navbar";
import { Home } from "../Pages/Home";
import { Board } from "../Pages/Board";
import { Test } from "../Components/Test";
import { Tool } from "../Components/Tool";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { tokenApi } from "../Api/userApi";
import { useCookies } from "react-cookie";

function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState();
  const [Cookies] = useCookies(["accesstoken"]);

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
  console.log(data);

  useEffect(() => {
    if (data) {
      const { logout } = data;
      if (!logout) {
        navigate("/whiteboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [data]);
  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard" element={<Board />} />
      </Routes>
    </>
  );
}

export default App;
