import { Rect } from "react-konva";

export const Customrec = ({ lines, line, setShape, setLines }) => {
  return (
    <Rect
      key={line.id}
      x={line.points[0]}
      y={line.points[1]}
      width={line.points[2] - line.points[0]}
      height={line.points[3] - line.points[1]}
      draggable
      fill="red"
      onDragEnd={(e) => {
        // Update the position of the rectangle
        const newPoints = [...line.points];
        newPoints[0] = e.target.x();
        newPoints[1] = e.target.y();
        newPoints[2] = e.target.x() + e.target.width();
        newPoints[3] = e.target.y() + e.target.height();
        const updatedLines = lines.map((l) =>
          l.id === line.id ? { ...l, points: newPoints } : l
        );

        setLines(updatedLines);
      }}
      onMouseLeave={() => setShape("")}
    />
  );
};
