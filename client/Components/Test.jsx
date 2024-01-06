import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Group } from "react-konva";
import { TextBox } from "./CanvasComponents/Text/TextBox";

export const Test = ({ setShape, lines, line, setLines, fontSize, color }) => {
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
        x={285}
        y={100}
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
