import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Rect, Circle, Image, Text } from "react-konva";
import { CompactPicker } from "react-color";
// import "./App.scss";
import { Test } from "../Components/Test";

export const Board = () => {
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [image, setImage] = useState(null);
  const [shape, setShape] = useState(null);
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const isDrawing = useRef(false);
  const canvas = useRef(null);
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
    if (shape === "text") {
      setTextPosition({ x: pos.x, y: pos.y });
    } else {
      setLines([
        ...lines,
        {
          id: lines.length,
          points: [pos.x, pos.y],
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

  const handleMouseMove = (event) => {
    if (!isDrawing.current) return;

    const stage = event.target.getStage();
    const pointerPos = stage.getPointerPosition();

    if (shape === "text") {
      setTextPosition({ x: pointerPos.x, y: pointerPos.y });
    } else {
      const updatedLines = lines.map((line) => {
        if (line.id === lines.length - 1) {
          return {
            ...line,
            points: [...line.points, pointerPos.x, pointerPos.y],
          };
        }
        return line;
      });

      setLines(updatedLines);
    }
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
    setText(""); // Reset text when drawing shapes
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      <h1>React Drawing App</h1>
      <div className="controls">
        <label>Color:</label>
        <CompactPicker color={color} onChange={handleColorChange} />
        <label>Brush Size:</label>
        <input
          type="number"
          value={brushSize}
          onChange={handleBrushSizeChange}
          min="1"
        />
        <button onClick={toggleEraser}>
          {isEraser ? "Switch to Brush" : "Switch to Eraser"}
        </button>
        <button onClick={handleClearCanvas}>Clear Canvas</button>
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={() => drawShape("rectangle")}>Draw Rectangle</button>
      </div>
      <button onClick={() => drawShape("circle")}>Draw Circle</button>
      <label>Text:</label>
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={() => drawShape("text")}>Add Text</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 120}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvas}
        // ref={}
      >
        <Layer>
          {lines.map((line) => {
            if (line.image) {
              return <Image key={line.id} image={line.image} />;
            } else if (line.shape === "rectangle") {
              return (
                <Rect key={line.id} width={100} height={50} fill={line.color} />
              );
            } else if (line.shape === "circle") {
              // return <Circle;
            } else if (line.shape === "text") {
              console.log("in text");
              return <Test />;
            } else {
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
