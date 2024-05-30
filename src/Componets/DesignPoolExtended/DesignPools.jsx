import React, { useState } from "react";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 475,
  height: "auto",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 0,
  overflowY: "auto",
  borderRadius: 1,
};

const DesignPools = () => {
  // create modal

  const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");

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
        <div className="">
          <Button onClick={handleOpen}>DesignPools</Button>
        </div>
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0px" }}
            className="modal"
          >
            <div>
              <button onClick={handleClose} className="overlayCloseButton">
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
                <Typography id="modal-modal-description" sx={{ mx: 1, pb: 1 }}>
                  <div>
                    <div style={{}}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={designpool}
                        alt=""
                      />
                    </div>
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
