import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Group } from "react-konva";
import { TextBox } from "./CanvasComponents/Text/TextBox";

export const Test = ({ setShape, lines, line, setLines }) => {
  const [text, setDummpyText] = useState(
    "Click to resize. Double click to edit."
  );
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [selected, setSelected] = useState(false);
  // const
  return (
    <Group>
      <TextBox
        x={line.points[0]}
        y={line.points[1]}
        text={text}
        colour="#FFDAE1"
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
