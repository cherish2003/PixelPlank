import { Box, Heading, Text } from "@radix-ui/themes";
import * as HoverCard from "@radix-ui/react-hover-card";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Avatar } from "@radix-ui/react-avatar";
import { IoMdMail } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

import "./App.scss";

export const Navbar = ({ loginclick, signupclick }) => {
  const [DarkModeToggle, setDarkModeToggle] = useState(false);
  const sun =
    "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
  const moon =
    "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg";
  const [color, setColor] = useState("red");

  const ToggleDarkMode = () => {
    setDarkModeToggle(!DarkModeToggle);
  };
  // const [theme, toggleTheme] = useDarkMode();
  // console.log(theme);
  // const themeMode = theme === "light" ? lightTheme : darkTheme;
  const theme = "darsk";
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <nav className="nav flex flex-wrap items-center justify-between px-4 border-b dark:bg-custom-grey">
        <div className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
          <span className="font-semibold text-xl tracking-tight dark:text-white">
            Pixel Plank
          </span>
        </div>

        <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
          for="menu-btn"
        >
          <span className="navicon bg-grey-darkest flex items-center relative"></span>
        </label>
        {/* <div className="absolute h-32 w-full top-12 left-0 blur-xl bg-custom-grey "></div> */}

        <ul className="menu md:border-none flex justify-end list-reset m-0 w-full md:w-auto absolute top-[53px] left-0  sm:static glass">
          <li className="border-t md:border-none navbarItem ">
            <button
              className="block md:inline-block px-1 py-3 no-underline text-grey-darkest text-grey-darker  ease-in dark:text-white dark:after:bg-white "
              onClick={() => loginclick()}
            >
              Log in
            </button>
          </li>

          <li className="border-t md:border-none navbarItem">
            <button
              className="mid block md:inline-block px-1 py-3 no-underline text-grey-darkest hover:text-grey-darker ease-in-out dark:text-white dark:after:bg-white"
              onClick={() => signupclick()}
            >
              Sign up
            </button>
          </li>

          <li className="border-t md:border-none navbarItem">
            <button className="block md:inline-block px-1 py-3 no-underline text-grey-darkest hover:text-grey-darker rl ease-in-out dark:text-white dark:after:bg-white">
              <Text>
                <HoverCard.Root>
                  <HoverCard.Trigger>Author</HoverCard.Trigger>
                  <HoverCard.Content className="HoverCardContent">
                    <div className="flex flex-col items-start justify-between">
                      <Heading size="3" as="h3">
                        Cherish
                      </Heading>
                      <div className="flex justify-start items-center">
                        <IoMdMail size={20} className="mr-4" />
                        <a
                          href="mailto:saicherish90@gmail.com "
                          target="_blank"
                        >
                          Mail
                        </a>
                      </div>
                      <div className="flex justify-center items-center">
                        <FaXTwitter size={20} className="mr-3" />
                        <a
                          href="https://twitter.com/Cherishhere"
                          target="_blank"
                        >
                          Twitter
                        </a>
                      </div>
                      <div className="flex justify-around  items-center">
                        <FaLinkedin className="mr-2" />

                        <a
                          target="_blank"
                          href="https://www.linkedin.com/in/siva-sai-cherish-94688b236/"
                        >
                          Linkedin
                        </a>
                      </div>
                    </div>
                  </HoverCard.Content>
                </HoverCard.Root>
              </Text>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
