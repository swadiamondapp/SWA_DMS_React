import React, { useLayoutEffect, useState,useRef,useEffect } from "react";
import "./DesignPools.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButtonwhite from "../../assets/whiteClose.svg";
import roundedClose from "../../assets/roundedClose.png";
import { Select } from "antd";
import plusICon from "../../assets/plusIcon.png";
import designpool from "../../assets/designPool.svg";
import arrowright from "../../assets/arrowright.svg";
import squar from "../../assets/squar.svg";
import textt from "../../assets/textt.svg";
import chatB from "../../assets/chatB.svg";
import leftroundA from "../../assets/leftroundA.svg";
import rightroundA from "../../assets/rightroundA.svg";
import dltBut from "../../assets/dltBut.svg";
// import rough from 'roughjs';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 475,
  height: 300,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 0,
  overflowY: "auto",
  borderRadius: 1,
};

const DesignPools = ({openDesignPool,  modalDetails,hadnleCloseDesignPool}) => {
  // create modal

  const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  const [element,setElement] = useState([])
  const [drawing,setDrawing] =useState(false)
  // const [text, setText] = useState(""); // State to track text input
  // const [textPosition, setTextPosition] = useState({ x: 0, y: 0 }); // State to track text position
  // const canvasRef = useRef(null);
  // const [ctx, setCtx] = useState(null);
  // const [imageLoaded, setImageLoaded] = useState(false);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   setCtx(ctx);

  //   const image = new Image();
  //   image.src = modalDetails;
  //   image.onload = () => {
  //     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  //     setImageLoaded(true);
  //   };
  // }, []);

  // const handleMouseDown = (e) => {
  //   if (!imageLoaded) return;
  //   if (e.nativeEvent.shiftKey) {
  //     // If Shift key is pressed, trigger text input
  //     const x = e.nativeEvent.offsetX;
  //     const y = e.nativeEvent.offsetY;
  //     setTextPosition({ x, y });
  //     const inputText = window.prompt("Enter text:");
  //     if (inputText !== null) {
  //       setText(inputText);
  //       drawText(inputText, x, y);
  //     }
  //   } else {
  //     setDrawing(true);
  //     const x = e.nativeEvent.offsetX;
  //     const y = e.nativeEvent.offsetY;
  //     ctx.beginPath();
  //     ctx.moveTo(x, y);
  //   }
  // };

  // const handleMouseMove = (e) => {
  //   if (!imageLoaded || !drawing) return;
  //   const x = e.nativeEvent.offsetX;
  //   const y = e.nativeEvent.offsetY;
  //   ctx.lineTo(x, y);
  //   ctx.stroke();
  // };

  // const handleMouseUp = () => {
  //   setDrawing(false);
  //   ctx.closePath();
  // };

  // const drawText = (text, x, y) => {
  //   const roughCanvas = rough.canvas(canvasRef.current);
  //   roughCanvas.text(x, y, text, {
  //     fontSize: '20px',
  //     fontFamily: 'Arial',
  //     fill: 'black', // Text color
  //     roughness: 1.5, // Adjust the roughness for the sketchy effect
  //   });
  // };






  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAssignButton = () => {
    setAssignedButton((prevText) =>
      prevText === "Assign" ? "Unasign" : "Assign"
    );
  };
  const handleCancelButton = () => {
    setOpen(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <div className="">
        {/* <div className="">
          <Button onClick={handleOpen}>DesignPools</Button>
        </div> */}
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={openDesignPool}
            onClose={hadnleCloseDesignPool}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0px" }}
            className="modal"
          >
            <div>
              <button onClick={hadnleCloseDesignPool} className="overlayCloseButton">
                <img src={closeButtonwhite} />
                CLOSE
              </button>
              <div className="poolIcons">
                <div className="iconContainer">
                  <button className="iconButton">
                    <img src={arrowright} alt="" className="iconImage" />
                  </button>
                </div>
                <div className="iconContainer">
                  <button className="iconButton">
                    <img src={squar} alt="" className="iconImage" />
                  </button>
                </div>
                <div className="iconContainer">
                  <button className="iconButton">
                    <img src={chatB} alt="" className="iconImage" />
                  </button>
                </div>
                <div className="iconContainer">
                  <button className="iconButton">
                    <img src={textt} alt="" className="iconImage" />
                  </button>
                </div>
                <div className="iconContainer">
                  <button className="iconButton">
                    <img src={leftroundA} alt="" className="iconImage" />
                  </button>
                </div>
                <div className="iconContainer">
                  <button className="iconButton">
                    <img src={rightroundA} alt="" className="iconImage" />
                  </button>
                </div>
                <div className="iconContainer">
                  <button className="iconButton">
                    <img src={dltBut} alt="" className="iconImage" />
                  </button>
                </div>
              </div>
              <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ m:1,p:1 }}>
                  <div>
                    {/* <div style={{}}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={modalDetails}
                        alt=""
                      />
                    </div> */}
                     {/* <canvas
                      ref={canvasRef}
                      id="canvas"
                      style={{ backgroundColor: "transparent", width: 400, height: 400 }}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    ></canvas> */}
                  </div>
                </Typography>
              </Box>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DesignPools;
