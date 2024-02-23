import React, { useState, useEffect, useRef, useContext } from "react";
import { Stage, Layer, Line } from "react-konva";
import { TextCom } from "../Components/TextCom";
import { CircleCom } from "../Components/CanvasComponents/Shapes/CircleCom";
import { RecCom } from "../Components/CanvasComponents/Shapes/RecCom";
import { Tool } from "../Components/Tool";
import { LineSegment } from "../Components/CanvasComponents/Shapes/LineSegment";

import { MenuBar } from "../Components/Menu/MenuBar";
import { UserContext } from "../Context/UserProvider";
import { RoomUsers } from "../Components/Room/RoomUsers";
import { Roomcontext } from "../Context/RoomProvider";
import { ResponseToast } from "../Components/ResponseToast";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketProvider";

export const Board = () => {

  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { roomdata, JoinRoom, LeaveRoom, CreateRoom, SetusersList } =
    useContext(Roomcontext);
  const [roomname, setRoomname] = useState("");
  console.log(user);
  console.log(roomdata.users_in_room);
  const [lines, setLines] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [fontSize, setFontSize] = useState(25);
  const [width, setWidth] = useState(5);
  const [radius, setRadius] = useState(50);
  const [shape, setShape] = useState("");
  const [text, setText] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [Toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [audioRef, setAudioRef] = useState(null);

  const [rectangleColor, setRectangleColor] = useState("#000000");
  const [circleColor, setCircleColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");
  const [lineSegColor, setLineSegColor] = useState("#000000");

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
  console.log(roomdata.Room_owner);
  const emitDrawingEvent = (lines) => {
    if (roomdata.InRoom && user.username == roomdata.Room_owner) {
      socket.emit("drawing", roomdata.Room_owner, lines);
    }
    if (roomdata.InRoom && !roomdata.Room_owner) {
      socket.emit("drawing", roomname, lines);
    }
  };

  useEffect(() => {
    const handleDrawandClear = (data) => {
      setLines(data);
    };

    socket.on("status", (status, message) => {
      if (status == "Joined") {
        JoinRoom();
        setMessage(`${message} joined 👦🏻`);
        setToast(true);
      }
      if (status == "Left") {
        LeaveRoom();
      }
    });
    socket.on("shapeMoved", (updatedLines) => {
      handleDrawandClear(updatedLines);
    });
    socket.on("drawing", (data) => {
      handleDrawandClear(data);
    });
    socket.on("clearCanvas", (data) => {
      handleDrawandClear(data);
    });
    socket.on("users-list", (users) => {
      SetusersList(users);
    });
    return () => {
      socket.off("status");
      socket.off("drawing", handleDrawandClear);
      socket.off("clearCanvas", handleDrawandClear);
      socket.off("users-list");
    };
  }, [socket]);

  useEffect(() => {
    if (Object.keys(user).length != 0) {
      socket.emit("join-Room", user.username, user.username, user._id);
      CreateRoom(user.username);
    }
    const savedState = localStorage.getItem("drawingApp");
    if (savedState) {
      setLines(JSON.parse(savedState));
    }
  }, []);

  const handleMouseDown = (event) => {
    if (owner !== "anonymous") {
      isDrawing.current = true;
    } else {
      setToast(true);
      setMessage("Login to draw and access more 🔓");
    }
    const pos = event.target.getStage().getPointerPosition();
    setTextPosition(pos);

    if (shape !== "text") {
      if (shape === "rectangle" || shape === "circle" || shape === "lineseg") {
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
    switch (shape) {
      case "rectangle":
        setRectangleColor(newColor.hex);
        break;
      case "circle":
        setCircleColor(newColor.hex);
        break;
      case "text":
        setTextColor(newColor.hex);
        break;
      case "lineseg":
        setLineSegColor(newColor.hex);
        break;
      default:
        setColor(newColor.hex);
        break;
    }
  };

  const handleBrushSizeChange = (value) => {
    setBrushSize(value);
  };

  const toggleEraser = (value) => {
    setIsEraser(value);
  };

  const handleClearCanvas = () => {
    setLines([]);
    socket.emit("clearCanvas", owner, []);
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
    <div>
      <MenuBar
        undo={undo}
        redo={redo}
        clearAll={handleClearCanvas}
        downloadImage={downloadImage}
        roomname={roomname}
        setRoomname={setRoomname}
        setToast={setToast}
        setMessage={setMessage}
      />
      {owner == "anonymous" ? null : (
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
      )}
      <RoomUsers setToast={setToast} setMessage={setMessage} />
      <ResponseToast Open={Toast} setToast={setToast} response={message} />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvas}
      >
        <Layer>
          {lines.map((line, index) => {
            if (line.shape === "rectangle") {
              return (
                <RecCom
                  color={rectangleColor}
                  index={index}
                  setShape={setShape}
                  lines={lines}
                  line={line}
                  setLines={setLines}
                />
              );
            } else if (line.shape === "circle") {
              return (
                <CircleCom
                  color={circleColor}
                  radius={radius}
                  setShape={setShape}
                  lines={lines}
                  line={line}
                  setLines={setLines}
                />
              );
            } else if (line.shape === "text") {
              return (
                <TextCom
                  color={textColor}
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
                  color={lineSegColor}
                  lines={lines}
                  setLines={setLines}
                  line={line}
                  setShape={setShape}
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
