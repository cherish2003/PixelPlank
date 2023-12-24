import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import "./App.css";
import { Navbar } from "../Components/Navbar";
import { Home } from "../Pages/Home";
import { Board } from "../Pages/Board";
import { Test } from "../Components/Test";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);
  return (
    <>
      <Home />
      {/* <Board /> */}
      {/* <Test/> */}
    </>
  );
}

export default App;
