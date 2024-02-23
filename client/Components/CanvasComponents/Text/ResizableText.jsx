import React, { useRef, useEffect, useContext } from "react";
import { Text, Transformer } from "react-konva";
import { UserContext } from "../../../Context/UserProvider";
import { SocketContext } from "../../../Context/SocketProvider";

export function ResizableText({
  colour,
  position,
  setPosition,
  text,
  isSelected,
  width,
  onResize,
  onClick,
  onDoubleClick,
  fontSize,
  lines,
  line,
  setLines,
}) {
  const textRef = useRef(null);
  const transformerRef = useRef(null);
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  // Function to handle drag end
  const handleDragEnd = () => {
    if (line) {
      setLines((prevLines) =>
        prevLines.map((l) =>
          l.id === line.id ? { ...l, position: updatedPosition } : l
        )
      );
      const updatedPosition = {
        x: textRef.current.x(),
        y: textRef.current.y(),
      };

      setPosition(updatedPosition);
      socket.emit("textMoved", user._id, updatedPosition);
    }
  };

  // Effect to update transformer nodes when isSelected changes
  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // Function to handle resize
  const handleResize = () => {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      const newHeight = textNode.height() * textNode.scaleY();
      textNode.setAttrs({
        width: newWidth,
        scaleX: 1,
      });
      onResize(newWidth, newHeight);

      if (line) {
        const updatedLines = lines.map((l) =>
          l.id === line.id ? { ...l, width: newWidth, height: newHeight } : l
        );
        setLines(updatedLines);
      }
    }
  };

  // Transformer component for resizing
  const transformer = isSelected ? (
    <Transformer
      ref={transformerRef}
      rotateEnabled={false}
      flipEnabled={false}
      enabledAnchors={["middle-left", "middle-right"]}
      boundBoxFunc={(oldBox, newBox) => {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      }}
    />
  ) : null;

  return (
    <>
      <Text
        x={position.x}
        y={position.y}
        ref={textRef}
        text={text}
        fill={colour}
        fontFamily="sans-serif"
        fontSize={fontSize}
        perfectDrawEnabled={false}
        onTransform={handleResize}
        onClick={onClick}
        onTap={onClick}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        width={width}
        draggable
        onDragEnd={handleDragEnd}
      />
      {transformer}
    </>
  );
}
