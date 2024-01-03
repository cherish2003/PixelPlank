import React, { useState, useRef } from "react";
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
import { RectCom } from "../Components/CanvasComponents/RectCom";
import { CircleCom } from "../Components/CanvasComponents/CircleCom";
import { Customrec } from "../Components/CanvasComponents/Customshapes/CustomRec";
import { Tool } from "../Components/Tool";

export const Board = () => {
  // const [texts, setTexts] = useState([]);

  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [image, setImage] = useState(null);
  const [shape, setShape] = useState("");
  const [text, setText] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const isDrawing = useRef(false);
  const canvas = useRef(null);
  const [rectanglePos, setRectanglePos] = useState({ x: 20, y: 50 });

  // Load saved state from local storage on mount
  React.useEffect(() => {
    const savedState = localStorage.getItem("drawingApp");
    if (savedState) {
      setLines(JSON.parse(savedState));
    }
  }, []);

  // Save state to local storage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("drawingApp", JSON.stringify(lines));
  }, [lines]);

  const handleMouseDown = (event) => {
    isDrawing.current = true;
    const pos = event.target.getStage().getPointerPosition();
    setTextPosition(pos);

    // Save the initial position for shapes
    if (shape !== "text") {
      // Handle adding a new line for rectangles or circles
      if (shape === "rectangle" || shape === "circle") {
        setLines([
          ...lines,
          {
            id: lines.length,
            points: [pos.x, pos.y, pos.x, pos.y], // Initial position for rectangles or circles
            color,
            brushSize,
            isEraser,
            shape,
            image,
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
            image,
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
          image,
          text,
        },
      ]);
    }
  };

  console.log(shape);

  const handleMouseMove = (event) => {
    if (!isDrawing.current || shape === "text") return;

    const stage = event.target.getStage();
    const pointerPos = stage.getPointerPosition();
    setTextPosition(pointerPos)

    const updatedLines = lines.map((line) => {
      if (line.id === lines.length - 1) {
        if (shape === "rectangle" || shape === "circle") {
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

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleBrushSizeChange = (event) => {
    setBrushSize(parseInt(event.target.value, 10));
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const handleClearCanvas = () => {
    setLines([]);
  };



  const drawShape = (shapeType) => {
    setShape(shapeType);
    if (shapeType == "text") {
      console.log("text is");
    }
    setText(""); // Reset text when drawing shapes
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  console.log(text);

  return (
    <div className="App">
      <h1>React Drawing App</h1>
      {/* <div className="controls">
        <label>Color:</label>
        <CompactPicker color={color} onChange={handleColorChange} />
        <label>Brush Size:</label>
        <input
          type="number"
          value={brushSize}
          onChange={handleBrushSizeChange}
          min="1"
        />
      </div> */}

      <button onClick={toggleEraser}>
        {isEraser ? "Switch to Brush" : "Switch to Eraser"}
      </button>
      <button onClick={() => drawShape("rectangle")}>Draw Rectangle</button>
      <button onClick={() => drawShape("circle")}>Draw Circle</button>
      <label>Text:</label>
      <button onClick={handleClearCanvas}>Clear Canvas</button>
      <button onClick={() => drawShape("text")}>Add Text</button>
      <Tool
        toggleEraser={toggleEraser}
        drawShape={drawShape}
        handleClearCanvas={handleClearCanvas}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 100}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvas}
      >
        <Layer>
          {lines.map((line) => {
            if (line.shape === "rectangle") {
              // console.log(line);
              return (
                <Customrec
                  setShape={setShape}
                  lines={lines}
                  line={line}
                  setLines={setLines}
                />
              );
            } else if (line.shape === "circle") {
              console.log("circle");
              return (
                <CircleCom
                  setShape={setShape}
                  lines={lines}
                  line={line}
                  setLines={setLines}
                />
              );
            } else if (line.shape === "text") {
              console.log("in text");
              console.log(line);
              console.log(line.points);

              return (
                <Test
                  setShape={setShape}
                  lines={lines}
                  line={line}
                  setLines={setLines}
                />
              );
            } else {
              console.log(textPosition);
              return (
                <Line
                  key={line.id}
                  points={line.points}
                  stroke={line.isEraser ? "#ffffff" : line.color}
                  strokeWidth={
                    line.isEraser ? line.brushSize * 2 : line.brushSize
                  }
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
