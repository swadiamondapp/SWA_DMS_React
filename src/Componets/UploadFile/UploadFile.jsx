import React, { useState, useEffect } from "react";
import "./UploadFile.css";
import Box from "@mui/material/Box";
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
  pid,
  fid,
  setFolderItem,
  Images
}) => {
  const initialImageSlots = 6;
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(Array(initialImageSlots).fill(null));
  const [file, setFile] = useState(null);
  const [id, setId] = useState(pid || "");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      if (Images && Array.isArray(Images)) {
        const updatedImages = Array(initialImageSlots).fill(null);

        await Promise.all(Images.map(async (imageObj) => {
          await Promise.all(Object.keys(imageObj).map(async (key) => {
            if (key.startsWith('img')) {
              const index = parseInt(key.replace('img', '')) - 1;
              if (index >= 0 && index < initialImageSlots) {
                if (imageObj[key]) {
                  const response = await fetch(imageObj[key]);
                  const blob = await response.blob();
                  updatedImages[index] = new File([blob], `image${index + 1}.jpg`, { type: blob.type });
                }
              }
            }
          }));
        }));

        setImages(updatedImages);
      }
    };

    fetchImages();
  }, [Images]);

  const handleImageUpload = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);
    event.target.value = null;
    if (index === newImages.length - 1 && newImages.every((image) => image !== null)) {
      setImages([...newImages, null]);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    event.target.value = null;
  };

  const handleClose = () => {
    onClose();
    setImages(Array(initialImageSlots).fill(null));
    setId("");
    setErrors("");
    setFile(null);
  };

  const handleUpload = () => {
    setErrors("");
    if (!id.trim()) {
      setErrors("Please enter a Folder ID.");
      return;
    }
    if (images.every((image) => image === null)) {
      setErrors("Please upload at least one image.");
      return;
    }
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
      handleClose,
      setFinishedProjectData,
      setErrors,
      fid,
      setFolderItem
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
                onClick={handleClose}
                style={{ background: "#FAFAFA", border: "none" }}
              >
                <img src={closeButton} alt="close" />
              </button>
            </div>
          </Typography>

          <Typography id="modal-modal-description" sx={{ mx: 2, my: 2 }}>
            <div className="uploadContainer">
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
                  <span className="title_1">Upload PNG / JPEG file</span>
                  <div className="dashed_imageContainer">
                    {images.map((image, index) => (
                      <div key={index} className="dashedImage">
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded preview ${index}`}
                            style={{ height: "64px", width: "64px" }}
                          />
                        ) : (
                          <div></div>
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
              </div>

              {errors && (
                <p style={{ color: "red", fontSize: "11px" }}>{errors}</p>
              )}
              <div className="buttons" style={{ marginTop: "10px" }}>
                <button className="cancelButton" onClick={handleClose}>
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
  );
};

export default UploadFile;
