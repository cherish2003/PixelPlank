import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Stage,
  Layer,
  Line,
  Rect,
  Circle,
  Text as KonvaText,
} from "react-konva";
import { CompactPicker } from "react-color";
import { Test } from "../Components/Test";
import { CircleCom } from "../Components/CanvasComponents/Shapes/CircleCom";
import { RecCom } from "../Components/CanvasComponents/Shapes/RecCom";
import { Tool } from "../Components/Tool";
import { LineSegment } from "../Components/CanvasComponents/Shapes/LineSegment";
import { ArrowCom } from "../Components/CanvasComponents/Shapes/Arrow";
import { Userbar } from "../Components/Userbar";
import { MenuBar } from "../Components/Menu/MenuBar";
import { UserContext } from "../Context/UserProvider";

import { io } from "socket.io-client";

const socket = io("http://localhost:4500");

export const Board = () => {
  const { user } = useContext(UserContext);
  const [lines, setLines] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
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
  const getRoomFromURL = () => {
    const pathSegments = window.location.pathname.split("/");
    return pathSegments[2];
  };

  const updateUndoRedoHistory = () => {
    setUndoHistory((prev) => [...prev, lines.slice()]);
    setRedoHistory([]);
  };
  const owner = getRoomFromURL();
  const emitDrawingEvent = (lines) => {
    socket.emit("drawing", owner, lines);
  };

  useEffect(() => {
    const roomFromURL = getRoomFromURL();
    console.log(roomFromURL);
    if (roomFromURL) {
      socket.emit("join-Room", user.username || "Anonymous");
    }

    const handleDrawandClear = (data) => {
      setLines(data);
    };
    // socket.on("users-list", (data) => {
    //   console.log(data);
    // });
    socket.on("drawing", (data) => {
      handleDrawandClear(data);
    });

    // socket.on("join-Room");
    // socket.on("clearcanvas", handleDrawandClear);

    // return () => {
    //   socket.off("drawing", handleDrawandClear);
    //   socket.off("clearcanvas", handleDrawandClear);
    // };
  }, [socket]);

  useEffect(() => {
    const savedState = localStorage.getItem("drawingApp");
    if (savedState) {
      setLines(JSON.parse(savedState));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("drawingApp", JSON.stringify(lines));
  // }, [lines]);

  const handleMouseDown = (event) => {
    isDrawing.current = true;
    const pos = event.target.getStage().getPointerPosition();
    setTextPosition(pos);

    if (shape !== "text") {
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
            points: [pos.x, pos.y, pos.x, pos.y],
            color,
            brushSize,
            isEraser,
            shape,
            text,
          },
        ]);
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
            text,
          },
        ]);
      }
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
          text,
        },
      ]);
    }

    updateUndoRedoHistory();
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
          const [startX, startY] = line.points.slice(0, 2);
          const [endX, endY] = [pointerPos.x, pointerPos.y];

          return {
            ...line,
            points: [startX, startY, endX, endY],
          };
        } else {
          const newPoints = line.points.slice();
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
    emitDrawingEvent(updatedLines);
  };

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
    socket.emit("clearcanvas", []);
    updateUndoRedoHistory();
  };

  const handleFontsize = (size) => {
    setFontSize(size);
  };

  const drawShape = (shapeType) => {
    setShape(shapeType);
    setColor("#000000");
    setText("");
    updateUndoRedoHistory();
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const undo = () => {
    if (undoHistory.length > 0) {
      const previousState = undoHistory.pop();
      setRedoHistory((prev) => [...prev, lines.slice()]);
      setLines(previousState);
    }
  };

  const redo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory.pop();
      setUndoHistory((prev) => [...prev, lines.slice()]);
      setLines(nextState);
    }
  };

  const downloadImage = () => {
    const dataUrl = canvas.current.toDataURL();
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "your_image_filename.jpeg";
    link.click();
  };

  return (
    <div className="App">
      <MenuBar
        undo={undo}
        redo={redo}
        clearAll={handleClearCanvas}
        downloadImage={downloadImage}
        socket={socket}
      />
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
