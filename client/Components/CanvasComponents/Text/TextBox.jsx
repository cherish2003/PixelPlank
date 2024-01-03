import React, { useState, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { EditableText } from "./EditableText";
import { EditableTextInput } from "./EditableTextInput";
import { ResizableText } from "./ResizableText";

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
}) {
  const RETURN_KEY = 13;
  const ESCAPE_KEY = 27;

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
    onTextChange(e.currentTarget.value);
  }

  return isEditing ? (
    <Group x={x} y={y}>
      <EditableTextInput
        x={position.x}
        y={position.y}
        width={width}
        height={height}
        value={text}
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
        width={width}
        lines={lines}
        line={line}
        setLines={setLines}
      />
    </Group>
  );
}

{
  /* <EditableText
      x={0}
      y={0}
      text={text}
      width={width}
      height={height}
      onResize={onTextResize}
      isEditing={isEditing}
      isTransforming={isTransforming}
      onToggleEdit={toggleEdit}
      onToggleTransform={toggleTransforming}
      onChange={onTextChange}
      setShapeState={setShapeState}
      lines={lines}
      line={line}
      setLines={setLines}
    /> */
}
// </Group>
