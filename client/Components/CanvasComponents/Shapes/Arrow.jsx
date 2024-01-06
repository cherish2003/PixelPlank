import React from "react";
import { Line, Arrow } from "react-konva";

export const ArrowCom = ({ lines, line, setLines, width, color }) => {
  return (
    <>
      <Line
        points={line.points}
        strokeWidth={width}
        stroke={color}
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
        }}
      />
      <Arrow
        points={[
          line.points[2] - line.points,
          line.points[3],
          line.points[2] + width,
          line.points[3],
        ]}
        pointerLength={10 + width}
        pointerWidth={10 + width}
        fill={color}
        draggable
        onDragEnd={(e) => {
          const newPoints = [...line.points];
          newPoints[0] = e.target.x() - line.length + 10 + width;
          newPoints[1] = e.target.y();
          newPoints[2] = e.target.x();
          newPoints[3] = e.target.y();
          const updatedLines = lines.map((l) =>
            l.id === line.id ? { ...l, points: newPoints } : l
          );
          setLines(updatedLines);
        }}
      />
    </>
  );
};
