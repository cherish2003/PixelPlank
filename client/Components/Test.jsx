import React, { useState } from "react";
import { Stage, Layer, Text } from "react-konva";

export const Test = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };
  const changeText = () => {
    console.log("sfsds");
  };
  return (
    <Text
      text="Draggable Text"
      x={position.x}
      y={position.y}
      draggable
      // onClick={() => changeText()}
      fill={isDragging ? "green" : "black"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};
