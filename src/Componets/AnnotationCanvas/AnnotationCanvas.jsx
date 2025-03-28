import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Arrow, Text, Image, Line } from "react-konva";
import useImage from "use-image";
import arrowbtn from "../../assets/arrowbtn.png";
import dlt10 from "../../assets/dlt10.png";
import prev from "../../assets/prev.png";
import textAdd from "../../assets/text.png";
import rectangle from "../../assets/rectangle.png";
import pencil from "../../assets/pencil.png";
import pencil2 from "../../assets/drawing.png";
import undo from "../../assets/undo.png";
import "./AnnotationCanvas.css";
import { editedImageUpload } from "../ADMIN PANEL/Design Pool/Api";
import { TfiSave } from "react-icons/tfi";
import { CircularProgress } from "@mui/material";

const AnnotationCanvas = ({
  selectedDesign,
  setSuccessModalOpen,
  setSuccessMessage,
  setanotationModal,
  setData,
}) => {
  const [shapesHistory, setShapesHistory] = useState([]);
  const [undoneShapes, setUndoneShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [action, setAction] = useState(null);
  // const [image, setImage] = useState(selectedDesign.image);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const stageRef = useRef(null);
  const [loadedImage] = useImage(image, "Anonymous");
  const [editedImage, setEditedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [drawingPath, setDrawingPath] = useState([]);

  const [updateImage, setUpadateImage] = useState({
    image: editedImage,
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loadImage = () => {
      setLoader(true); // ✅ Show loader before fetching image

      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const proxiedImageUrl =
        proxyUrl + encodeURIComponent(selectedDesign.image);
      img.src = proxiedImageUrl;

      img.onload = () => {
        setImage(img); // ✅ Set the image after loading
        setLoader(false); // ✅ Hide loader only when the image is loaded
      };

      img.onerror = (e) => {
        console.error("Image loading error", e);
        setLoader(false); // ✅ Hide loader on error
      };
    };

    if (selectedDesign?.image) {
      loadImage();
    }
  }, [selectedDesign.image]);

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
    } else if (action === "draw") {
      setDrawingPath([[e.evt.layerX, e.evt.layerY]]);
    }
  };

  const handleMouseMove = (e) => {
    if (!currentShape && action !== "draw") return;
    if (currentShape?.type === "arrow") {
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
    } else if (currentShape?.type === "rect") {
      const newShape = {
        ...currentShape,
        width: e.evt.layerX - currentShape.x,
        height: e.evt.layerY - currentShape.y,
      };
      setCurrentShape(newShape);
    } else if (action === "draw" && drawingPath.length > 0) {
      const newPath = drawingPath.concat([[e.evt.layerX, e.evt.layerY]]);
      setDrawingPath(newPath);
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
    } else if (action === "draw") {
      setShapesHistory([...shapesHistory, { type: "draw", path: drawingPath }]);
      setDrawingPath([]);
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

  const handleUploadEditedImage = async () => {
    if (!stageRef.current) return;

    const originalWidth = stageRef.current.width();
    const originalHeight = stageRef.current.height();

    const scaleFactor = 2;
    stageRef.current.width(originalWidth * scaleFactor);
    stageRef.current.height(originalHeight * scaleFactor);
    stageRef.current.scale({ x: scaleFactor, y: scaleFactor });

    // Redraw the stage at the higher resolution
    stageRef.current.draw();

    // Get the data URL (higher resolution)
    const uri = stageRef.current.toDataURL();

    // Reset the stage to original size
    stageRef.current.width(originalWidth);
    stageRef.current.height(originalHeight);
    stageRef.current.scale({ x: 1, y: 1 });
    stageRef.current.draw();

    setEditedImage(uri);

    if (!uri) {
      console.error("No edited image to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", uri);

      setIsLoading(true);
      await editedImageUpload(
        setIsLoading,
        uri,
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
      } else if (shape.type === "draw") {
        return <Line key={i} points={shape.path.flat()} stroke="black" />;
      }
      return null;
    });
  };

  console.log(selectedDesign.image, "loadedImage>>>");
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        height: "440px",
        marginTop: "20px",
      }}
    >
      {loader ? (
        <div
          className=""
          style={{
            display: "flex",
            width: "470px",
            height: "400px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={20}
            sx={{
              color: "black",
            }}
          />
        </div>
      ) : (
        <>
          {/* <img src={selectedDesign.image} x={0} y={0} width={470} height={400} /> */}
          <Stage
            width={470}
            height={400}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <Image image={image} x={0} y={0} width={470} height={400} />

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
              {drawingPath.length > 0 && (
                <Line points={drawingPath.flat()} stroke="black" />
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
            <button onClick={() => setAction("draw")}>
              <img
                style={{ width: "17px", height: "17px" }}
                src={pencil2}
                alt="draw"
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
        </>
      )}
    </div>
  );
};

export default AnnotationCanvas;
