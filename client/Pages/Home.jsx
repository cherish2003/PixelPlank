import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import { BannerSec } from "../Components/BannerSec";
import { useRef } from "react";

export const Home = () => {
  const Page = useRef(null);
  const [loginpage, setLoginpage] = useState(true);
  const [signupPage, setSignupPage] = useState(false);
  console.log(loginpage, signupPage);
  const Onloginclick = () => {
    console.log("login", loginpage);
    setLoginpage(true);
    if (!loginpage) {
      Page.current.Loginpage();
      setSignupPage(false);
    }
  };
  const onSignupclick = () => {
    setSignupPage(true);
    if (!signupPage) {
      Page.current.Signuppage();
      setLoginpage(false);
    }
    console.log("signup", signupPage);
  };
  return (
    <div>
      <Navbar
        loginclick={Onloginclick}
        signupclick={onSignupclick}
        setLogin={setLoginpage}
        setSignup={setSignupPage}
      />
      <BannerSec ref={Page} signupclick={onSignupclick} />
    </div>
  );
};
