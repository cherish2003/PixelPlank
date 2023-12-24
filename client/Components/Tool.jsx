import React, { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaPencilAlt, FaEraser, FaFillDrip, FaShapes } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";

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
              <div class="nav__item-icon">{item.icon}</div>
              <span class="nav__item-text"> {item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
