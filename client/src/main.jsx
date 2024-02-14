import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Theme } from "@radix-ui/themes";
import "./index.css";
import "@radix-ui/themes/styles.css";
import UserProvider from "../Context/UserProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { RoomProvider } from "../Context/RoomProvider.jsx";
import { RoomUsers } from "../Components/Room/RoomUsers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RoomProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </RoomProvider>
  </BrowserRouter>
);
