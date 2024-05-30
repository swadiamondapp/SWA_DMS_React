import React, { useState } from "react";
import "./CentalHub.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import { Select } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  borderRadius: 2,
};

const CentalHub = ({ open, onClose }) => {
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  const [uploadInstructionsVisible, setUploadInstructionsVisible] = useState(true);
  const [uploadInstructionsVisibleRender, setUploadInstructionsVisibleRender] = useState(true);

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

    
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadInstructionsVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileUploadRender = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadInstructionsVisibleRender(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="">
        {/* <div className="">
          <Button onClick={handleOpen}>CentalHub UploadFile</Button>
        </div> */}
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0px" }}
            className="modal"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="headerModal">
                  <span
                    className="assignTitle"
                    style={{ position: "absolute", top: 10, left: 16 }}
                  >
                    Upload file
                  </span>
                  <button
                    // onClick={handleClose}
                    onClose={onClose}
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 15,
                      background: "none",
                      border: "none",
                    }}
                  >
                    <img src={closeButton} />
                  </button>
                </div>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                <div className="uploadContiner">
                  <div className="uploadImageContainerr">
                    <div
                      className="left"
                      onClick={() =>
                        document.getElementById("fileInputt").click()
                      }
                    >
                     {uploadInstructionsVisible? (<>
                      <span className="textA">PNG/JPG</span>
                      <span className="textB">
                        Drag & Drop or{" "}
                        <span style={{ color: "#0464D5" }}>choose file</span> to
                        upload
                      </span>
                    
                     </>):(<>PNG/JPG File uploaded successfully!</>)}
                       <input
                        id="fileInputt"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                      />
                      
                    </div>
                    <div className="right"  onClick={() =>
                        document.getElementById("fileInputtT").click()
                      }>
                        {uploadInstructionsVisibleRender? (<>
                          <span className="textA">3.DM</span>
                      <span className="textB">
                        Drag & Drop or{" "}
                        <span style={{ color: "#0464D5" }}>choose file</span> to
                        upload
                      </span>
                        </>):(<>
                          3D File uploaded successfully!</>)}
                    
                      <input
                        id="fileInputtT"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileUploadRender}
                      />
                    </div>
                  </div>
                  <div className="inputContainer">
                    <label htmlFor="" className="labelText">
                      ID
                    </label>
                    <input type="text" className="inputFeildUpload" />
                  </div>

                  <div className="buttons">
                    <button
                      className="cancerButton"
                      onClick={handleCancelButton}
                    >
                      cancel
                    </button>
                    <button className="upButton">Upload</button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CentalHub;
