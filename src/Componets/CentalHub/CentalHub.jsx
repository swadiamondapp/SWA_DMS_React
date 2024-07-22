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
import Joi from "joi";

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

const CentalHub = ({
  open,
  onClose,
  productCode,
  images,
  setImages,
  handleUploadFile,
  folderDetails,
  reUpload,
}) => {
  // create modal

  // const [open, setOpen] = useState(false);
  const [AssinedButton, setAssignedButton] = useState("Assign");
  const [tagText, setTagText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [threeDFile, setThreeDFile] = useState(null);
  const [designCode, setDesignCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [uploadInstructionsVisibleRender, setUploadInstructionsVisibleRender] =
    useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(errorMessage, "designCodeEe");

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
    setDesignCode("");
    setUploadInstructionsVisible(true);
    setUploadInstructionsVisibleRender(true);
    onClose();
    setErrorMessage("");
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
      setImages({ ...images, normal: file });
      setUploadInstructionsVisible(false);
    }
  };
  const handleFileUploadRender = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages({ ...images, threeD: file });
      setUploadInstructionsVisibleRender(false);
    }
  };

  const designCodeSchema = Joi.string()
    .regex(/^SWACAD0\d*$/i)
    .required()
    .empty("")
    .messages({
      "string.pattern.base":
        "Design code must start with SWACAD0 followed by digits",
      "string.empty": "Design code cannot be an empty field",
      "any.required": "Design code is required",
    });

  const handleDesignCodeChange = (event) => {
    const value = event.target.value.toUpperCase();
    const { error } = designCodeSchema.validate(value);
    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
    }
    setDesignCode(value);
    console.log("Design code:", value);
    console.log("Error message:", error?.message);
  };
  // const handleUploadFile = () => {
  //   const { error } = designCodeSchema.validate(designCode);
  //   if (error) {
  //     setErrorMessage(error.message);
  //     return;
  //   } else {
  //     setErrorMessage("");
  //   }

  //   if (!imageFile || !threeDFile) {
  //     alert("Please upload both image and 3D files.");
  //     return;
  //   }

  //   upload_cad_design(
  //     setIsLoading,
  //     designCode,
  //     imageFile,
  //     threeDFile,
  //     onClose,
  //     setSuccessModalOpen,
  //     setSuccessMessage,
  //     handleSuccessUpload
  //   );
  //   console.log("Image file:", imageFile);
  //   console.log("3D file:", threeDFile);
  //   console.log("Design code:", designCode);
  // };

  const handleSuccessUpload = (message) => {
    setSuccessModalOpen(true);
    setSuccessMessage(message);

    // Clear all state variables
    setImageFile(null);
    setThreeDFile(null);
    setDesignCode("");
    setUploadInstructionsVisible(true);
    setUploadInstructionsVisibleRender(true);
    setErrorMessage("");
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
                    onClick={() => onClose()}
                    // onClose={onClose}
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
                          <span className="textA">PNG/JPEG</span>
                          <span className="textB">
                            Drag & Drop or{" "}
                            <span style={{ color: "#0464D5" }}>
                              choose file
                            </span>{" "}
                            to upload
                          </span>
                        </>
                      ) : (
                        <span style={{ fontSize: "10px" }}>
                          PNG/JPEG File uploaded successfully!
                        </span>
                      )}
                      <input
                        id="fileInputImage"
                        type="file"
                        // accept="image/*"
                         accept="image/png, image/jpeg, image/jpg"
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
                          <span className="textA">2.DM</span>
                          <span className="textB">
                            Drag & Drop or{" "}
                            <span style={{ color: "#0464D5" }}>
                              choose file
                            </span>{" "}
                            to upload
                          </span>
                        </>
                      ) : (
                        <span style={{ fontSize: "10px", width: "100%" }}>
                          2D File uploaded successfully!
                        </span>
                      )}

                      <input
                        id="fileInput3D"
                        type="file"
                        // accept=".3dm"
                        accept="image/png, image/jpeg, image/jpg"
                        style={{ display: "none" }}
                        onChange={handleFileUploadRender}
                      />
                    </div>
                  </div>
                  <div className="inputContainer">
                    <label htmlFor="" className="labelText">
                      ID
                    </label>
                    {errorMessage && (
                      <div className="error">{errorMessage}</div>
                    )}
                    <input
                      type="text"
                      placeholder="SWACAD0--"
                      value={productCode}
                      disabled={true}
                      // onChange={handleDesignCodeChange}
                      className="inputFeildUpload"
                    />
                  </div>

                  <div className="buttons">
                    <button
                      className="cancerButton"
                      onClick={() => handleCancelButton()}
                    >
                      cancel
                    </button>
                    <button
                      onClick={() => handleUploadFile()}
                      className="upButton"
                    >
                      Upload
                    </button>
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
