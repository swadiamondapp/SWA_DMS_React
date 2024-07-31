import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Arrow, Text, Image } from "react-konva";
import useImage from "use-image";
import arrowbtn from "../../assets/arrowbtn.png";
import dlt10 from "../../assets/dlt10.png";
import prev from "../../assets/prev.png";
import textAdd from "../../assets/text.png";
import rectangle from "../../assets/rectangle.png";
import undo from "../../assets/undo.png";
import "./AnnotationCanvas.css";
import { editedImageUpload } from "../ADMIN PANEL/Design Pool/Api";
import { TfiSave } from "react-icons/tfi";

const AnnotationCanvas = ({
  selectedDesign,
  setSuccessModalOpen,
  setSuccessMessage,
  setanotationModal,
  setData
}) => {
  const [shapesHistory, setShapesHistory] = useState([]);
  const [undoneShapes, setUndoneShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [action, setAction] = useState(null);
  const [image, setImage] = useState(selectedDesign.image);
  const [text, setText] = useState("");
  const stageRef = useRef(null);
  const [loadedImage] = useImage(image, "Anonymous");
  const [editedImage, setEditedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const [updateImage,setUpadateImage]= useState({
    image:editedImage
  })

  const handleMouseDown = (e) => {
    if (action === "arrow") {
      setCurrentShape({
        type: "arrow",
        points: [e.evt.layerX, e.evt.layerY, e.evt.layerX, e.evt.layerY],
        text: "",
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
      setText("");
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
          setShapesHistory([...shapesHistory, newText]);
        }
      } else {
        setShapesHistory([...shapesHistory, currentShape]);
      }
      setCurrentShape(null);
      setUndoneShapes([]);
    }
  };

  const handleUndo = () => {
    if (shapesHistory.length > 0) {
      const lastShape = shapesHistory[shapesHistory.length - 1];
      const newShapesHistory = shapesHistory.slice(0, -1);
      setShapesHistory(newShapesHistory);
      setUndoneShapes([...undoneShapes, lastShape]);
    }
  };

  const handleRedo = () => {
    if (undoneShapes.length > 0) {
      const lastUndoneShape = undoneShapes[undoneShapes.length - 1];
      const newUndoneShapes = undoneShapes.slice(0, -1);
      setUndoneShapes(newUndoneShapes);
      setShapesHistory([...shapesHistory, lastUndoneShape]);
    }
  };

  const handleDelete = () => {
    setShapesHistory([]);
    setUndoneShapes([]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMouseUp();
    }
  };

  // Function to capture the canvas as an image and store it in the state
  // const captureCanvasAsImage = () => {
  //   if (stageRef.current) {
  //     const uri = stageRef.current.toDataURL();
  //     setEditedImage(uri);
  //   }
  // };

  const captureCanvasAsImage = () => {
    try {
      if (stageRef.current) {
        const uri = stageRef.current.toDataURL();
        setEditedImage(uri);
        console.log(uri);
      }
    } catch (error) {
      console.error("Error capturing the canvas as an image:", error);
    }
  };



  const handleUploadEditedImage = async () => {
    captureCanvasAsImage();
    if (!editedImage) {
      console.error("No edited image to upload.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', editedImage); 

      console.log("formDataaa",formData)
  
      setIsLoading(true);
      await editedImageUpload(
        setIsLoading,
        editedImage,
        selectedDesign.id,
        setSuccessModalOpen,
        setSuccessMessage,
        setanotationModal,
        setData,
        formData
      );
    } catch (error) {
      console.error("Error uploading the edited image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  console.log("editedImageeee", editedImage);

  const getTextWidth = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;
    return context.measureText(text).width;
  };

  const renderShapes = () => {
    return shapesHistory.map((shape, i) => {
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
          <React.Fragment key={i}>
            <Rect
              x={shape.x}
              y={shape.y}
              width={getTextWidth(shape.text, 11) + 10}
              height={20}
              fill="#E6E6E6"
            />
            <Text
              x={shape.x}
              y={shape.y}
              text={shape.text}
              fontSize={11}
              fill="black"
              align="center"
              padding={5}
            />
          </React.Fragment>
        );
      }
      return null;
    });
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        height: "440px",
        marginTop: "20px",
      }}
    >
      <Stage
        width={470}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {loadedImage && (
            <Image image={loadedImage} x={0} y={0} width={470} height={400} />
          )}
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
              fontSize={10}
              fill="red"
            />
          )}
        </Layer>
      </Stage>
      <div
        className="annotation_buttons"
        style={{ position: "absolute", bottom: "0px", left: "4%" }}
      >
        <button onClick={() => setAction("arrow")}>
          <img
            style={{ width: "16px", height: "15px" }}
            src={arrowbtn}
            alt="arrow"
          />
        </button>
        <button onClick={() => setAction("rect")}>
          <img
            style={{ width: "16px", height: "15px" }}
            src={rectangle}
            alt="rectangle"
          />
        </button>
        <button onClick={() => setAction("text")}>
          <img
            style={{ width: "16px", height: "16px" }}
            src={textAdd}
            alt="text"
          />
        </button>
        <button onClick={handleUndo}>
          <img
            style={{ width: "16px", height: "15px" }}
            src={undo}
            alt="undo"
          />
        </button>
        <button onClick={handleRedo}>
          <img
            style={{ width: "16px", height: "15px" }}
            src={prev}
            alt="prev"
          />
        </button>
        <button onClick={handleDelete}>
          <img
            style={{ width: "16px", height: "15px" }}
            src={dlt10}
            alt="delete"
          />
        </button>
        <button onClick={handleUploadEditedImage}>
          <TfiSave style={{ fontSize: "15px", marginTop: "2px" }} />
        </button>
      </div>
      {currentShape && currentShape.type === "text" && (
        <div
          style={{
            position: "absolute",
            top: currentShape.y,
            left: currentShape.x,
            zIndex: 10,
          }}
        >
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyPress}
            placeholder="Type text here"
            style={{ fontSize: "10px", padding: "5px", width: "120px" }}
          />
        </div>
      )}
    </div>
  );
};

export default AnnotationCanvas;
