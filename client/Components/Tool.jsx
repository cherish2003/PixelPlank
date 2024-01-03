import React, { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaPencilAlt, FaEraser, FaFillDrip, FaShapes } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";
import * as Menubar from "@radix-ui/react-menubar";

import "./App.scss";
import { MenuRadix } from "./MenuRadix";

export const Tool = () => {
  const divRed = useRef(null);

  const [active, setActive] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const items = [
    {
      name: "Pen",
      icon: <FaPencilAlt size={25} />,
    },
    {
      name: "Eraser",
      icon: <FaEraser size={25} />,
    },
    {
      name: "Text",
      icon: <PiTextTBold size={32} />,
    },
    {
      name: "Color",
      icon: <FaFillDrip />,
    },
    {
      name: "Shapes",
      icon: <FaShapes />,
    },
  ];

  return (
    <nav>
      <div class="nav-box">
        {" "}
        <ul class="nav-container">
          {items.map((item, index) => (
            <li
              key={index}
              className={`nav__item ${index === activeItem ? "active" : ""}`}
              onClick={() => setActiveItem(index)}
            >
              <Menubar.Root className="flex bg-white p-[3px] rounded-md shadow-[0_2px_10px] shadow-blackA4">
                <Menubar.Menu>
                  <Menubar.Trigger className=" nav__item-icon py-2 px-3 outline-none select-none font-medium leading-none rounded text-violet11 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
              <div class="nav__item-icon">{item.icon}</div>
                  </Menubar.Trigger>
                </Menubar.Menu>
              </Menubar.Root>
              <span class="nav__item-text"> {item.name}</span>
            </li>
          ))}
        </ul>
        {/* <MenuRadix /> */}
      </div>
    </nav>
  );
};
