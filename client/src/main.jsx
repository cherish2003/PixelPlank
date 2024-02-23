import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Theme } from "@radix-ui/themes";
import "./index.css";
import "@radix-ui/themes/styles.css";
import UserProvider from "../Context/UserProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { RoomProvider } from "../Context/RoomProvider.jsx";
import { SocketProvider } from "../Context/SocketProvider.jsx";
// import ErrorBoundary from "./ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RoomProvider>
      <UserProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </UserProvider>
    </RoomProvider>
  </BrowserRouter>
);
