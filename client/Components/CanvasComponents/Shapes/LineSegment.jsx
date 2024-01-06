import React from "react";
import { Line } from "react-konva";

export const LineSegment = ({ lines, line, setLines, setShape, width }) => {
  return (
    <Line
      points={line.points}
      strokeWidth={width}
      stroke="blue"
      draggable
      onDragEnd={(e) => {
        const newPoints = [...line.points];
        newPoints[0] = e.target.x();
        newPoints[1] = e.target.y();
        newPoints[2] = e.target.x() + line.length;
        newPoints[3] = e.target.y();
        const updatedLines = lines.map((l) =>
          l.id === line.id ? { ...l, points: newPoints } : l
        );
        setLines(updatedLines);
        setShape("");
      }}
    />
  );
};
