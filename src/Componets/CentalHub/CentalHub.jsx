import React, { useState } from "react";
import "./CentalHub.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import { Select } from "antd";
import { upload_cad_design } from "../CAD/Api";
import SuccessModal from "../SuccessModal/SuccessModal";

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
  const [imageFile, setImageFile] = useState(null);
  const [threeDFile, setThreeDFile] = useState(null);
  const [designCode, setDesignCode] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const [successModalOpen,setSuccessModalOpen] = useState(false)
  const [successMessage,setSuccessMessage] = useState("")
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [uploadInstructionsVisibleRender, setUploadInstructionsVisibleRender] =
    useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAssignButton = () => {
    setAssignedButton((prevText) =>
      prevText === "Assign" ? "Unasign" : "Assign"
    );
  };
  const handleCancelButton = () => {
    setImageFile(null);
    setThreeDFile(null);
    setUploadInstructionsVisible(true);
    setUploadInstructionsVisibleRender(true);
    onClose();
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
      setImageFile(file);
      setUploadInstructionsVisible(false);
    }
  };
  // const handleFileUploadRender = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setUploadInstructionsVisibleRender(false);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleFileUploadRender = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThreeDFile(file);
      setUploadInstructionsVisibleRender(false);
    }
  };

  const handleUploadFile = () => {
    upload_cad_design(setIsLoading,designCode,imageFile,threeDFile,onClose,setSuccessModalOpen,setSuccessMessage)
    console.log("Image file:", imageFile);
    console.log("3D file:", threeDFile);
    console.log("Design code:", designCode);
  };

  const handleDesignCodeChange = (event) => {
    setDesignCode(event.target.value.toUpperCase());
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
                        document.getElementById("fileInputImage").click()
                      }
                    >
                      {uploadInstructionsVisible ? (
                        <>
                          <span className="textA">PNG/JPG</span>
                          <span className="textB">
                            Drag & Drop or{" "}
                            <span style={{ color: "#0464D5" }}>
                              choose file
                            </span>{" "}
                            to upload
                          </span>
                        </>
                      ) : (
                        <span style={{fontSize:"10px"}}>PNG/JPG File uploaded successfully!</span>
                      )}
                      <input
                        id="fileInputImage"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                      />
                    </div>
                    <div
                      className="right"
                      onClick={() =>
                        document.getElementById("fileInput3D").click()
                      }
                    >
                      {uploadInstructionsVisibleRender ? (
                        <>
                          <span className="textA">3.DM</span>
                          <span className="textB">
                            Drag & Drop or{" "}
                            <span style={{ color: "#0464D5" }}>
                              choose file
                            </span>{" "}
                            to upload
                          </span>
                        </>
                      ) : (
                        <span style={{fontSize:"10px",width:"100%"}}>3D File uploaded successfully!</span>
                      )}

                      <input
                        id="fileInput3D"
                        type="file"
                        accept=".3dm"
                        style={{ display: "none" }}
                        onChange={handleFileUploadRender}
                      />
                    </div>
                  </div>
                  <div className="inputContainer">
                    <label htmlFor="" className="labelText">
                      ID
                    </label>
                    <input
                      type="text"
                      value={designCode}
                      onChange={handleDesignCodeChange}
                      className="inputFeildUpload"
                    />
                  </div>

                  <div className="buttons">
                    <button
                      className="cancerButton"
                      onClick={handleCancelButton}
                    >
                      cancel
                    </button>
                    <button onClick={handleUploadFile} className="upButton">
                      Upload
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
        <SuccessModal
          successModalOpen={successModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
};

export default CentalHub;
