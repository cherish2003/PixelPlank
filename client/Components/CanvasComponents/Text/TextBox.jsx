import React, { useState, useEffect, useContext } from "react";
import { Group, Rect } from "react-konva";
import { EditableTextInput } from "./EditableTextInput";
import { ResizableText } from "./ResizableText";
import { UserContext } from "../../../Context/UserProvider";
import { SocketContext } from "../../../Context/SocketProvider";

export function TextBox({
  colour,
  text,
  x,
  y,
  width,
  height,
  onClick,
  onTextResize,
  onTextChange,
  selected,
  onTextClick,
  setShapeState,
  lines,
  line,
  setLines,
  fontSize,
}) {
  
  const RETURN_KEY = 13;
  const ESCAPE_KEY = 27;
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
    setShapeState("");
  }, [selected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }

  function toggleTransforming() {
    setIsTransforming(!isTransforming);
    onTextClick(!isTransforming);
  }
  const [position, setPosition] = useState({ x, y });

  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      toggleEdit(e);
    }
  }

  function handleTextChange(e) {
    const newText = e.currentTarget.value;
    onTextChange(newText);
    console.log(newText);
    socket.emit("textChanged", user._id, newText);
  }

  return isEditing ? (
    <Group x={x} y={y}>
      <EditableTextInput
        x={position.x}
        y={position.y}
        width={width}
        height={height}
        colour={colour}
        value={text}
        fontSize={fontSize}
        onChange={handleTextChange}
        onKeyDown={handleEscapeKeys}
      />
    </Group>
  ) : (
    <Group x={x} y={y}>
      <ResizableText
        position={position}
        setPosition={setPosition}
        isSelected={isTransforming}
        onClick={toggleTransforming}
        onDoubleClick={toggleEdit}
        onResize={onTextResize}
        setShapeState={setShapeState}
        text={text}
        colour={colour}
        width={width}
        lines={lines}
        line={line}
        fontSize={fontSize}
        setLines={setLines}
        socket={socket}
      />
    </Group>
  );
}
