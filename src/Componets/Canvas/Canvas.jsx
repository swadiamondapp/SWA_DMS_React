import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Rect, Arrow, Text } from "react-konva";

const Canvas = ({ annotations, onSelect, selectedAnnotationId, imageUrl }) => {
  const imageRef = useRef(null);
  const [arrows, setArrows] = useState([]);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);
  const [drawingArrow, setDrawingArrow] = useState(false); // State to track arrow drawing mode

  const handleMouseDown = (e) => {
    if (drawingArrow) {
      const { layerX, layerY } = e.evt;
      setStartX(layerX);
      setStartY(layerY);
    }
  };

  const handleMouseMove = (e) => {
    if (drawingArrow && startX !== null && startY !== null) {
      const { layerX, layerY } = e.evt;
      setEndX(layerX);
      setEndY(layerY);
    }
  };

  const handleMouseUp = () => {
    if (
      drawingArrow &&
      startX !== null &&
      startY !== null &&
      endX !== null &&
      endY !== null
    ) {
      const newArrow = {
        id: `arrow-${arrows.length + 1}`, // Ensure unique ID
        points: [startX, startY, endX, endY],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 2,
      };
      setArrows([...arrows, newArrow]);
      setStartX(null);
      setStartY(null);
      setEndX(null);
      setEndY(null);
      setDrawingArrow(false); // Disable arrow drawing mode after creating arrow
    }
  };

  useEffect(() => {
    const image = new window.Image();
    image.src = imageUrl;
    image.onload = () => {
      imageRef.current.image(image);
    };
  }, [imageUrl]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        <div style={{ paddingTop: "100px" }}>
          <Image ref={imageRef} />
        </div>
        {arrows.map((arrow) => (
          <Arrow
            key={arrow.id}
            {...arrow}
            draggable
            onClick={() => onSelect(arrow.id)}
            stroke={selectedAnnotationId === arrow.id ? "red" : "black"}
            onDragMove={(e) => {
              const updatedArrows = arrows.map((arr) =>
                arr.id === arrow.id
                  ? {
                      ...arr,
                      points: [
                        arr.points[0] + e.target.x(),
                        arr.points[1] + e.target.y(),
                        arr.points[2] + e.target.x(),
                        arr.points[3] + e.target.y(),
                      ],
                    }
                  : arr
              );
              setArrows(updatedArrows);
            }}
          />
        ))}
        {annotations.map((annotation) => {
          switch (annotation.type) {
            case "rectangle":
              return (
                <Rect
                  key={annotation.id}
                  {...annotation}
                  draggable
                  onClick={() => onSelect(annotation.id)}
                  stroke={
                    selectedAnnotationId === annotation.id ? "red" : "black"
                  }
                  onTransformEnd={(e) => {
                    // Transform logic
                  }}
                />
              );
            case "text":
              return (
                <Text
                  key={annotation.id}
                  {...annotation}
                  onClick={() => onSelect(annotation.id)}
                  fill={
                    selectedAnnotationId === annotation.id ? "red" : "black"
                  }
                />
              );
            default:
              return null;
          }
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
