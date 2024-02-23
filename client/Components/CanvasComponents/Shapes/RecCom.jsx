import { useContext } from "react";
import { Rect } from "react-konva";
import { Roomcontext } from "../../../Context/RoomProvider";
import { SocketContext } from "../../../Context/SocketProvider";

export const RecCom = ({ lines, line, index, setLines, color }) => {
  const { socket } = useContext(SocketContext);

  const { roomdata } = useContext(Roomcontext);

  const handleDragEnd = (e) => {
    const { x, y, width, height } = e.target.attrs;

    const updatedLines = lines.map((l, i) => {
      if (i === index) {
        return {
          ...l,
          points: [x, y, x + width, y + height],
        };
      }
      return l;
    });
    setLines(updatedLines);
    socket.emit("shapeMoved", roomdata.Room_owner, updatedLines);
  };

  return (
    <Rect
      key={line.id}
      x={line.points[0]}
      y={line.points[1]}
      width={line.points[2] - line.points[0]}
      height={line.points[3] - line.points[1]}
      draggable
      fill={color}
      onDragEnd={handleDragEnd}
    />
  );
};
