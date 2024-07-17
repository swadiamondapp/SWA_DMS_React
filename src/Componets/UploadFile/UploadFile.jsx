import React, { useState } from "react";
import "./UploadFile.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import plusICon from "../../assets/plusIcon.png";

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
  p: 0,
  overflowY: "auto",
  borderRadius: 2,
};

const UploadFile = ({
  open,
  onClose,
  createFinsishedProjects,
  setSuccess,
  setFinishedProjectData,
}) => {
  const initialImageSlots = 6; 
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(Array(initialImageSlots).fill(null));
  const [file, setFile] = useState(null);
  const [id, setId] = useState("");
  const [errors, setErrors] = useState("");

  const handleImageUpload = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);

    if (index === newImages.length - 1 && newImages.every(image => image !== null)) {
      setImages([...newImages, null]);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!id || !images) {
      setErrors("Please fill all fields.");
    } else {
      const formData = new FormData();
      formData.append("designcode", id);
      formData.append("name", id);
      images.forEach((image, index) => {
        if (image) {
          formData.append(`img${index + 1}`, image);
        }
      });
      if (file) {
        formData.append("file1", file);
      }
      createFinsishedProjects(
        setIsLoading,
        formData,
        setSuccess,
        onClose,
        setFinishedProjectData
      );
    }
  };

  console.log("upload images",images)

  return (
    <div>
      <div className="">
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
                <div
                  className="headerModal"
                  style={{ background: "#FAFAFA", padding: "3px 15px" }}
                >
                  <span
                    className="assignTitle"
                    style={{ background: "#FAFAFA" }}
                  >
                    Upload file
                  </span>
                  <button
                    onClick={() => onClose()}
                    style={{ background: "#FAFAFA", border: "none" }}
                  >
                    <img src={closeButton} alt="close" />
                  </button>
                </div>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mx: 2, my: 2 }}>
                <div className="uploadContiner">
                  <div className="uploadImageContainerr"></div>
                  <div className="inputContainer">
                    <label htmlFor="" className="labelText">
                      ID
                    </label>
                    <input
                      type="text"
                      className="inputFeildUpload"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
                  <div className="uploadPNG_Container">
                    <div className="addButton_Container">
                      <span className="title_1">Upload PNG / JPEG file </span>
                      <div className="dashed_imageContainer">
                        {images.map((image, index) => (
                          <div key={index} className="dashedImage">
                            {image && (
                              <img
                                src={URL.createObjectURL(image)}
                                alt=""
                                style={{ height: "64px", width: "64px" }}
                              />
                            )}
                            <div style={{ position: "absolute" }}>
                              <label>
                                <img src={plusICon} alt="add" />
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg"
                                  style={{ display: "none" }}
                                  onChange={(e) => handleImageUpload(index, e)}
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="addButton_Container">
                      <span className="title_1">Upload 3.DM File </span>
                      <div className="dashed_imageContainer">
                        <div className="dashedImage">
                          {file ? (
                            <span>{file.name}</span>
                          ) : (
                            <label>
                              <img src={plusICon} alt="add" />
                              <input
                                type="file"
                                // accept=".3dm"
                                accept="image/png, image/jpeg"
                                style={{ display: "none" }}
                                onChange={handleFileUpload}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="upload_DMFile"></div>
                  {errors && (
                    <p style={{ color: "red", fontSize: "11px" }}>{errors}</p>
                  )}
                  <div className="buttons">
                    <button className="cancelButton" onClick={() => onClose()}>
                      Cancel
                    </button>
                    <button className="upButton" onClick={handleUpload}>
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

export default UploadFile;
