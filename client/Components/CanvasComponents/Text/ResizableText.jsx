import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

export function ResizableText({
  position,
  setPosition,
  text,
  isSelected,
  width,
  onResize,
  onClick,
  onDoubleClick,
  setShapeState,
  lines,
  line,
  setLines,
}) {
  const textRef = useRef(null);
  const transformerRef = useRef(null);

  // Function to handle drag end
  const handleDragEnd = () => {
    if (line) {
      const updatedLines = lines.map((l) =>
        l.id === line.id
          ? {
              ...l,
              points: { x: textRef.current.x(), y: textRef.current.y() },
            }
          : l
      );
      setLines(updatedLines);
      setPosition({ x: textRef.current.x(), y: textRef.current.y() });
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
        fill="black"
        fontFamily="sans-serif"
        fontSize={24}
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
