import React, { useContext, useEffect, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { TextBox } from "./CanvasComponents/Text/TextBox";
import { SocketContext } from "../Context/SocketProvider";

export const TextCom = ({
  setShape,
  lines,
  line,
  setLines,
  fontSize,
  color,
}) => {
  const { socket } = useContext(SocketContext);

  const [text, setDummpyText] = useState(
    "Click to resize. Double click to edit."
  );
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [selected, setSelected] = useState(false);
  const [pos, setpos] = useState({ x: 285, y: 100 });

  useEffect(() => {
    socket.on("textChanged", (newText) => {
      setDummpyText(newText);
    });

    socket.on("textMoved", (newPos) => {
      setpos(newPos);
    });
  }, [socket]);

  return (
    <Group>
      <TextBox
        x={pos.x}
        y={pos.y}
        socket={socket}
        text={text}
        colour={color}
        onTextChange={(value) => setDummpyText(value)}
        width={width}
        height={height}
        selected={selected}
        onTextResize={(newWidth, newHeight) => {
          setWidth(newWidth);
          setHeight(newHeight);
        }}
        onClick={() => {
          setSelected(!selected);
        }}
        fontSize={fontSize}
        setShapeState={setShape}
        lines={lines}
        line={line}
        setLines={setLines}
        onTextClick={(newSelected) => {
          setSelected(newSelected);
        }}
      />
    </Group>
  );
};
