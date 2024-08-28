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

const fetchUrlAsFile = async (url, index) => {
  if (url.startsWith("blob:")) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], `image_${index}.jpg`, { type: blob.type });
  } else {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], `image_${index}.jpg`, { type: blob.type });
  }
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
  Images,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [id, setId] = useState(pid || "");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (Images) {
      const initialImages = Images.map(
        (img) =>
          img.img1 || img.img2 || img.img3 || img.img4 || img.img5 || img.img6
      ).filter((url) => url);
      setImages(initialImages);
    }
  }, [Images]);

  const handleImageUpload = (index, event) => {
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(event.target.files[0]);
    setImages(newImages);
    event.target.value = null;
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    event.target.value = null;
  };

  const handleClose = () => {
    onClose();
    setImages([]);
    setId("");
    setErrors("");
    setFile(null);
  };

  const handleUpload = async () => {
    setErrors("");
    if (!id.trim()) {
      setErrors("Please enter a Folder ID.");
      return;
    }
    if (images.length === 0) {
      setErrors("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("designcode", id);
    formData.append("name", id);

    for (let i = 0; i < images.length; i++) {
      try {
        const file = await fetchUrlAsFile(images[i], i + 1);
        formData.append(`img${i + 1}`, file);
      } catch (error) {
        setErrors("Failed to process one of the images.");
        return;
      }
    }

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
              <span className="assignTitle" style={{ background: "#FAFAFA" }}>
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
                            src={image}
                            alt={`Preview ${index}`}
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
                    {images.length < 6 &&
                      Array.from({ length: 6 - images.length }).map(
                        (_, index) => (
                          <div
                            key={images.length + index}
                            className="dashedImage"
                          >
                            <div style={{ position: "absolute" }}>
                              <label>
                                <img src={plusICon} alt="add" />
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg"
                                  style={{ display: "none" }}
                                  onChange={(e) =>
                                    handleImageUpload(images.length + index, e)
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        )
                      )}
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


