import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Arrow, Text, Image } from "react-konva";
import useImage from "use-image";
import viewImage from "../../assets/wh_img.png";

const AnnotationCanvas = () => {
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [action, setAction] = useState(null);
  const [image, setImage] = useState(viewImage);
  const [text, setText] = useState("vfvfvdvdfv");
  const stageRef = useRef(null);
  const [loadedImage] = useImage(image);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    if (action === "arrow") {
      setCurrentShape({
        type: "arrow",
        points: [e.evt.layerX, e.evt.layerY, e.evt.layerX, e.evt.layerY],
      });
    } else if (action === "rect") {
      setCurrentShape({
        type: "rect",
        x: e.evt.layerX,
        y: e.evt.layerY,
        width: 0,
        height: 0,
      });
    } else if (action === "text") {
      setText(""); // Clear previous text input
      setCurrentShape({
        type: "text",
        x: e.evt.layerX,
        y: e.evt.layerY,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!currentShape) return;
    if (currentShape.type === "arrow") {
      const newShape = {
        ...currentShape,
        points: [
          currentShape.points[0],
          currentShape.points[1],
          e.evt.layerX,
          e.evt.layerY,
        ],
      };
      setCurrentShape(newShape);
    } else if (currentShape.type === "rect") {
      const newShape = {
        ...currentShape,
        width: e.evt.layerX - currentShape.x,
        height: e.evt.layerY - currentShape.y,
      };
      setCurrentShape(newShape);
    }
  };

  const handleMouseUp = () => {
    if (currentShape) {
      if (currentShape.type === "text") {
        if (text.trim() !== "") {
          const newText = {
            ...currentShape,
            text: text.trim(),
          };
          setShapes([...shapes, newText]);
        }
      } else {
        setShapes([...shapes, currentShape]);
      }
      setCurrentShape(null);
    }
  };

  const renderShapes = () => {
    return shapes.map((shape, i) => {
      if (shape.type === "arrow") {
        return <Arrow key={i} points={shape.points} stroke="black" />;
      } else if (shape.type === "rect") {
        return (
          <Rect
            key={i}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            stroke="black"
          />
        );
      } else if (shape.type === "text") {
        return (
          <Text
            key={i}
            x={shape.x}
            y={shape.y}
            text={shape.text}
            fontSize={16}
            fill="black"
          />
        );
      }
      return null;
    });
  };

  const handleUndo = () => {
    setShapes(shapes.slice(0, -1));
  };

  const handleDelete = () => {
    setShapes([]);
  };

  console.log(currentShape?.type);

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={() => setAction("arrow")}>Arrow</button>
        <button onClick={() => setAction("rect")}>Rectangle</button>
        <button onClick={() => setAction("text")}>Text</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {loadedImage && <Image image={loadedImage} x={0} y={0} />}
          {renderShapes()}
          {currentShape && currentShape.type === "arrow" && (
            <Arrow points={currentShape.points} stroke="black" />
          )}
          {currentShape && currentShape.type === "rect" && (
            <Rect
              x={currentShape.x}
              y={currentShape.y}
              width={currentShape.width}
              height={currentShape.height}
              stroke="black"
            />
          )}
          {currentShape && currentShape.type === "text" && (
            <Text
              x={currentShape.x}
              y={currentShape.y}
              text={text}
              fontSize={16}
              fill="black"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default AnnotationCanvas;
