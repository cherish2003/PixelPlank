import React, { useState } from "react";
import { Rect, Circle } from "react-konva";

export const CircleCom = ({ lines, line, setShape, setLines }) => {
  return (
    <Circle
      key={line.id}
      x={line.points[0]}
      y={line.points[1]}
      width={100}
      height={100}
      radius={50}
      draggable
      fill="red"
      onDragEnd={(e) => {
        // Update the position of the rectangle
        const newPoints = [...line.points];
        newPoints[0] = e.target.x();
        newPoints[1] = e.target.y();
        newPoints[2] = e.target.x() + 100;
        newPoints[3] = e.target.y() + 100;
        const updatedLines = lines.map((l) =>
          l.id === line.id ? { ...l, points: newPoints } : l
        );
        setLines(updatedLines);
      }}
      onMouseLeave={() => setShape("")}
    />
  );
};
