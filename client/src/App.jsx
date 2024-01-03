import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import "./App.css";
import { Navbar } from "../Components/Navbar";
import { Home } from "../Pages/Home";
import { Board } from "../Pages/Board";
import { Test } from "../Components/Test";
import { RectCom } from "../Components/CanvasComponents/RectCom";
import { Whiteboard } from "../Pages/Whiteboard";
import { Tool } from "../Components/Tool";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);
  return (
    <>
      {/* <Tool /> */}
      {/* <Home /> */}
      <Board />
      {/* <Whiteboard /> */}
      {/* <Test/> */}
      {/* <RectCom /> */}
    </>
  );
}

export default App;
