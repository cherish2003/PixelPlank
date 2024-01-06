import React, { useState } from "react";
import { Rect, Circle } from "react-konva";

export const CircleCom = ({ lines, line, setShape, setLines, radius }) => {
  return (
    <Circle
      key={line.id}
      x={line.points[0]}
      y={line.points[1]}
      radius={radius}
      draggable
      fill="red"
      onDragEnd={(e) => {
        const newPoints = [...line.points];
        newPoints[0] = e.target.x();
        newPoints[1] = e.target.y();
        newPoints[2] = e.target.x() + radius;
        newPoints[3] = e.target.y() + radius;
        const updatedLines = lines.map((l) =>
          l.id === line.id ? { ...l, points: newPoints } : l
        );
        setLines(updatedLines);
      }}
    />
  );
};
