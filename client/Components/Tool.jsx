import React, { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaPencilAlt, FaEraser, FaFillDrip, FaShapes } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";
import { FaRegCircle } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import * as HoverCard from "@radix-ui/react-hover-card";
import { PiLineSegmentBold } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";

import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import "./App.scss";
import { CustomSlider } from "./Toolbox/Slider";
import { CompactPicker } from "react-color";

export const Tool = ({
  handleBrushSizeChange,
  toggleEraser,
  drawShape,
  color,
  handleColorChange,
  handleFontsize,
  setRadius,
  setWidth,
}) => {
  const divRed = useRef(null);
  const [currShape, setCurrShape] = useState("");
  const [Eraser, setEraser] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  console.log(activeItem);

  console.log("currSHape value :", currShape);

  useEffect(() => {
    drawShape(currShape);
    if (currShape == "pencil") {
      setActiveItem(0);
    }
  }, [currShape]);

  const handleCLick = (item) => {
    item == "Eraser" ? toggleEraser(true) : toggleEraser(false),
      item == "Text" ? drawShape("text") : null;
  };
  const items = [
    {
      name: "Pen",
      icon: <FaPencilAlt size={25} />,
      silder: true,
    },
    {
      name: "Eraser",
      icon: <FaEraser size={25} />,
      silder: true,
    },
    {
      name: "Text",
      icon: <PiTextTBold size={32} />,
      text: true,
    },
    {
      name: "Color",
      icon: <FaFillDrip />,
      color: true,
    },
    {
      name: "Shapes",
      icon: <FaShapes />,
      shapes: true,
    },
  ];

  return (
    <nav>
      <div class="nav-box">
        <ul class="nav-container">
          {items.map((item, index) => (
            <li
              key={index}
              className={`nav__item ${index === activeItem ? "active" : ""}`}
              onClick={() => {
                handleCLick(item.name);
                setActiveItem(index);
              }}
            >
              <Popover.Root>
                <Popover.Trigger>
                  <button
                    className="nav__item-icon"
                    aria-label="Update dimensions"
                  >
                    {item.icon}
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  {item.color ? (
                    <Popover.Content className="ColorPopver" sideOffset={28}>
                      <CompactPicker
                        onChange={handleColorChange}
                        color={color}
                      />
                      <Popover.Arrow className="PopoverArrow" />
                    </Popover.Content>
                  ) : (
                    <Popover.Content className="PopoverContent" sideOffset={28}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "10px",
                          gap: 10,
                        }}
                      >
                        {item.silder ? (
                          <>
                            <fieldset className="Fieldset">
                              <label className="Label" htmlFor="width">
                                Size
                              </label>
                              <CustomSlider
                                handleBrushSizeChange={handleBrushSizeChange}
                              />
                            </fieldset>
                          </>
                        ) : null}
                        {item.color ? (
                          <fieldset className="Fieldset">
                            <CompactPicker
                              onChange={handleColorChange}
                              color={color}
                            />
                          </fieldset>
                        ) : null}
                        {item.text ? (
                          <fieldset className="Fieldset">
                            <label className="Label" htmlFor="height">
                              Font Size
                            </label>
                            <input
                              className="Input"
                              id="height"
                              defaultValue="25px"
                              onChange={(e) => {
                                handleFontsize(parseInt(e.target.value));
                              }}
                            />
                          </fieldset>
                        ) : null}
                        {item.shapes ? (
                          <fieldset
                            className="Fieldset"
                            style={{ marginTop: "5px" }}
                          >
                            <RiRectangleLine
                              className={`Shape ${
                                currShape == "rectangle" ? "ShapeScale" : ""
                              }`}
                              onClick={() => setCurrShape("rectangle")}
                            />
                            <HoverCard.Root>
                              <HoverCard.Trigger
                                onClick={() => setCurrShape("circle")}
                                className={`Shape ${
                                  currShape == "circle" ? "ShapeScale" : ""
                                }`}
                              >
                                <FaRegCircle size={35} />
                              </HoverCard.Trigger>
                              <HoverCard.Portal>
                                <HoverCard.Content
                                  className="HoverCardContent"
                                  sideOffset={-120}
                                >
                                  <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="height">
                                      Radius
                                    </label>
                                    <input
                                      className="Input"
                                      id="height"
                                      defaultValue="50"
                                      onChange={(e) => {
                                        setRadius(parseInt(e.target.value));
                                      }}
                                    />
                                  </fieldset>
                                </HoverCard.Content>
                              </HoverCard.Portal>
                            </HoverCard.Root>
                            <HoverCard.Root>
                              <HoverCard.Trigger
                                onClick={() => setCurrShape("lineseg")}
                                className={`Shape ${
                                  currShape == "lineseg" ? "ShapeScale" : ""
                                }`}
                              >
                                <PiLineSegmentBold size={35} />
                              </HoverCard.Trigger>
                              <HoverCard.Portal>
                                <HoverCard.Content
                                  className="HoverCardContent"
                                  sideOffset={-120}
                                >
                                  <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="height">
                                      Width
                                    </label>
                                    <input
                                      className="Input"
                                      id="height"
                                      defaultValue="5"
                                      onChange={(e) => {
                                        setWidth(parseInt(e.target.value));
                                      }}
                                    />
                                  </fieldset>
                                </HoverCard.Content>
                              </HoverCard.Portal>
                            </HoverCard.Root>

                            <HoverCard.Root>
                              <HoverCard.Trigger
                                onClick={() => setCurrShape("arrow")}
                                className={`Shape ${
                                  currShape == "arrow" ? "ShapeScale" : ""
                                }`}
                              >
                                <FaArrowRightLong size={25} />
                              </HoverCard.Trigger>
                              <HoverCard.Portal>
                                <HoverCard.Content
                                  className="HoverCardContent"
                                  sideOffset={-120}
                                >
                                  <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="height">
                                      Width
                                    </label>
                                    <input
                                      className="Input"
                                      id="height"
                                      defaultValue="5"
                                      onChange={(e) => {
                                        setWidth(parseInt(e.target.value));
                                      }}
                                    />
                                  </fieldset>
                                </HoverCard.Content>
                              </HoverCard.Portal>
                            </HoverCard.Root>

                            <FaPencilAlt
                              onClick={() => setCurrShape("pencil")}
                              className={`Shape ${
                                currShape == "pencil" ? "ShapeScale" : ""
                              }`}
                            />
                          </fieldset>
                        ) : null}
                      </div>
                      <Popover.Close
                        className="PopoverClose"
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </Popover.Close>
                      <Popover.Arrow className="PopoverArrow" />
                    </Popover.Content>
                  )}
                </Popover.Portal>
              </Popover.Root>

              <span class="nav__item-text">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
