import { useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import { IoIosWarning } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

import "./App.scss";

export const ResponseToast = ({ response, Open, setToast, type }) => {
  useEffect(() => {
    setTimeout(() => {
      setToast(false);
    }, 3000);
    console.log("called");
  }, [Open]);
  const setSucess = (text) => {
    if (text == "Login successful" || text == "Registration sucessful") {
      return true;
    }
    return false;
  };
  return type == "loginandsignup" ? (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="ToastRoot"
        open={Open}
        onOpenChange={!Open}
        duration={3000}
      >
        <Toast.Title
          className={
            setSucess(response)
              ? "ToastTitle ToastSuccess"
              : "ToastTitle ToastError"
          }
        >
          {setSucess(response) ? (
            <div className="flex justify-center items-center">
              <FaCheckCircle size={20} className="mr-2" /> {response} !!
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <IoIosWarning size={20} className="mr-2" />
              {response} !!
            </div>
          )}
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  ) : (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="ToastRoot"
        open={Open}
        onOpenChange={!Open}
        duration={3000}
      >
        <Toast.Title>{response}</Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};
