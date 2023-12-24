// import "./styles.css";

import React, { useState, useRef } from "react";
import { Stage, Layer, Circle, Text } from "react-konva";

export default function CircleCom() {
 const [circles, setCircles] = useState([]);
 const stageRef = useRef(null);
 return (
   <Stage width={500} height={500} ref={stageRef}>
     <Layer>
       <Text
         fontSize={20}
         text="Drag & Drop below circle to add more circles to layer"
         align="center"
       />
       <Circle
         name="draggableCircle"
         x={50}
         y={50}
         radius={25}
         fill="green"
         draggable
         onDragEnd={(e) => {
           // push new circle to view
           // note that we must push circle first before returning draggable circle
           // because e.target.x returns draggable circle's positions
           setCircles((prevCircles) => [
             ...prevCircles,
             { x: e.target.x(), y: e.target.y(), fill: "red" },
           ]);

           // return draggable circle to original position
           // notice the dot (.) before "draggableCircle"
           var stage = stageRef.current;
           var draggableCircle = stage.findOne(".draggableCircle");
           draggableCircle.position({ x: 50, y: 50 });
         }}
       />

       {circles.map((eachCircle) => (
         <Circle
           x={eachCircle.x}
           y={eachCircle.y}
           radius={25}
           fill={eachCircle.fill}
         />
       ))}
     </Layer>
   </Stage>
 );
}
