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
import { Tool } from "../Components/Tool";

export const Whiteboard = () => {
  const [texts, setTexts] = useState([]);

  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [image, setImage] = useState(null);
  const [shape, setShape] = useState("");
  const [text, setText] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
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
    setText(false);
    const pos = event.target.getStage().getPointerPosition();

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
    }
  };

  console.log(shape);

  const handleMouseMove = (event) => {
    if (!isDrawing.current || shape === "text") return;

    const stage = event.target.getStage();
    const pointerPos = stage.getPointerPosition();

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const drawShape = (shapeType) => {
    setShape(shapeType);
    // setText(""); // Reset text when drawing shapes
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
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div> */}
      <button onClick={toggleEraser}>
        {isEraser ? "Switch to Brush" : "Switch to Eraser"}
      </button>
      <button onClick={handleClearCanvas}>Clear Canvas</button>
      <button onClick={() => drawShape("rectangle")}>Draw Rectangle</button>
      <button onClick={() => drawShape("circle")}>Draw Circle</button>
      <label>Text:</label>
      {/* <input type="text" value={text} onChange={handleTextChange} /> */}
      <button onClick={() => setText(true)}>Add Text</button>
      <Tool />
    </div>
  );
};
