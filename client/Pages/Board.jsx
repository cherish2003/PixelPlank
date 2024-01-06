import React, { useState, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Line,
  Rect,
  Circle,
  Image,
  Text as KonvaText,
} from "react-konva";
import { CompactPicker } from "react-color";
// import "./App.scss";
import { Test } from "../Components/Test";
import { CircleCom } from "../Components/CanvasComponents/Shapes/CircleCom";
import { RecCom } from "../Components/CanvasComponents/Shapes/RecCom";
import { Tool } from "../Components/Tool";
import { LineSegment } from "../Components/CanvasComponents/Shapes/LineSegment";
import { ArrowCom } from "../Components/CanvasComponents/Shapes/Arrow";

export const Board = () => {
  // const [texts, setTexts] = useState([]);

  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [fontSize, setFontSize] = useState(25);
  const [width, setWidth] = useState(5);
  const [shapeChange, setShapeChange] = useState(false);
  const [radius, setRadius] = useState(50);
  const [shape, setShape] = useState("");
  const [text, setText] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const canvas = useRef(null);

  // For Loading saved state from local storage
  useEffect(() => {
    const savedState = localStorage.getItem("drawingApp");
    if (savedState) {
      setLines(JSON.parse(savedState));
    }
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("drawingApp", JSON.stringify(lines));
  }, [lines]);

  console.log("shape :", shape);

  const handleMouseDown = (event) => {
    isDrawing.current = true;
    const pos = event.target.getStage().getPointerPosition();
    setTextPosition(pos);

    // Save the initial position for shapes
    if (shape !== "text") {
      // Handle adding a new line for rectangles or circles
      if (
        shape === "rectangle" ||
        shape === "circle" ||
        shape === "lineseg" ||
        shape === "arrow"
      ) {
        setLines([
          ...lines,
          {
            id: lines.length,
            points: [pos.x, pos.y, pos.x, pos.y], // Initial position for rectangles or circles
            color,
            brushSize,
            isEraser,
            shape,
            text,
          },
        ]);
      } else {
        // For other shapes (freehand lines), use cubic Bezier interpolation
        setLines([
          ...lines,
          {
            id: lines.length,
            points: [pos.x, pos.y], // Initial position for freehand lines
            color,
            brushSize,
            isEraser,
            shape,
            text,
          },
        ]);
      }
    } else {
      // Handle adding a new line for text
      setLines([
        ...lines,
        {
          id: lines.length,
          points: [pos.x, pos.y], // Initial position for text
          color,
          brushSize,
          isEraser,
          shape,
          text,
        },
      ]);
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing.current || shape === "text") return;

    const stage = event.target.getStage();
    const pointerPos = stage.getPointerPosition();
    setTextPosition(pointerPos);

    const updatedLines = lines.map((line) => {
      if (line.id === lines.length - 1) {
        if (
          shape === "rectangle" ||
          shape === "circle" ||
          shape === "lineseg" ||
          shape === "arrow"
        ) {
          // For rectangles and circles, use only two points
          const [startX, startY] = line.points.slice(0, 2);
          const [endX, endY] = [pointerPos.x, pointerPos.y];

          return {
            ...line,
            points: [startX, startY, endX, endY],
          };
        } else {
          // For other shapes (freehand lines), use cubic Bezier interpolation
          const newPoints = line.points.slice(); // Copy existing points
          const [lastX, lastY] = newPoints.slice(-2);
          const [controlX, controlY] = [
            (lastX + pointerPos.x) / 2,
            (lastY + pointerPos.y) / 2,
          ];
          newPoints.push(controlX, controlY, pointerPos.x, pointerPos.y);

          return {
            ...line,
            points: newPoints,
          };
        }
      }
      return line;
    });

    setLines(updatedLines);
  };
  console.log(isDrawing.current);
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleBrushSizeChange = (value) => {
    setBrushSize(value);
  };

  const toggleEraser = (value) => {
    setIsEraser(value);
  };

  const handleClearCanvas = () => {
    setLines([]);
  };
  const handleFontsize = (size) => {
    setFontSize(size);
  };

  const drawShape = (shapeType) => {
    setShape(shapeType);
    setColor("#000000");

    setText(""); // Reset text when drawing shapes
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  console.log(isEraser + "in board ");

  return (
    <div className="App">
      <button onClick={() => drawShape("linesegment")}>Add Text</button>
      <button onClick={handleClearCanvas}>Clear Canvas</button>
      
      <Tool
        setShape={setShape}
        shape={shape}
        Drawingstate={isDrawing.current}
        toggleEraser={toggleEraser}
        drawShape={drawShape}
        setIsEraser={setIsEraser}
        setWidth={setWidth}
        handleBrushSizeChange={handleBrushSizeChange}
        handleColorChange={handleColorChange}
        handleFontsize={handleFontsize}
        setRadius={setRadius}
      />

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvas}
      >
        <Layer>
          {lines.map((line) => {
            if (line.shape === "rectangle") {
              return (
                <RecCom setShape={setShape} line={line} setLines={setLines} />
              );
            } else if (line.shape === "circle") {
              return (
                <CircleCom
                  radius={radius}
                  setShape={setShape}
                  lines={lines}
                  line={line}
                  setLines={setLines}
                />
              );
            } else if (line.shape === "text") {
              return (
                <Test
                  color={color}
                  setShape={setShape}
                  lines={lines}
                  line={line}
                  setLines={setLines}
                  textPosition={textPosition}
                  fontSize={fontSize}
                />
              );
            } else if (line.shape === "lineseg") {
              return (
                <LineSegment
                  lines={lines}
                  setLines={setLines}
                  line={line}
                  setShape={setShape}
                  width={width}
                />
              );
            } else if (line.shape === "arrow") {
              return (
                <ArrowCom
                  color={color}
                  lines={lines}
                  setLines={setLines}
                  line={line}
                  width={width}
                />
              );
            } else {
              console.log(line);
              return (
                <Line
                  key={line.id}
                  points={line.points}
                  stroke={line.isEraser ? "#ffffff" : line.color}
                  strokeWidth={line.isEraser ? line.brushSize : line.brushSize}
                  lineCap="round"
                  globalCompositeOperation={
                    line.isEraser ? "destination-out" : "source-over"
                  }
                />
              );
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};
