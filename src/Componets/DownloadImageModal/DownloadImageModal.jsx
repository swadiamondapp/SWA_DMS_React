import React, { useState,useEffect } from "react";
import { Modal, Box, Button, FormControlLabel, Checkbox,CircularProgress } from "@mui/material";
import { downloadCadByFileType } from "../../Pages/Renders/Apis";

const DownloadImageModal = ({ open, onClose,setFyleType,fileType,designListData,selectedCadFolder,is3DSelected,is2DSelected,setIs2DSelected,setIs3DSelected }) => {
  // const [is2DSelected, setIs2DSelected] = useState(false);
  // const [is3DSelected, setIs3DSelected] = useState(false);
  const [downloadableImages,setDownloadableImages] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const handleCheckboxChange = (type) => {
    if (type === "2D") {
      const new2DState = !is2DSelected;
      setIs2DSelected(new2DState);

      // Check both selections
      if (new2DState && is3DSelected) {
        setFyleType("both");
      } else if (new2DState) {
        setFyleType("2d");
      } else if (!new2DState && is3DSelected) {
        setFyleType("3d");
      } else {
        setFyleType("");
      }
    } else if (type === "3D") {
      const new3DState = !is3DSelected;
      setIs3DSelected(new3DState);

      // Check both selections
      if (new3DState && is2DSelected) {
        setFyleType("both");
      } else if (new3DState) {
        setFyleType("3d");
      } else if (!new3DState && is2DSelected) {
        setFyleType("2d");
      } else {
        setFyleType("");
      }
    }
  };
useEffect(()=>{
  downloadCadByFileType(setIsLoading,setDownloadableImages,fileType,selectedCadFolder)
},[fileType])
console.log(is2DSelected,is3DSelected,fileType,selectedCadFolder,"sdfsd===>")
console.log(downloadableImages,"downloadableImages")




const handleDownloadMultiple = () => {
  if (!is2DSelected && !is3DSelected) {
    console.error("No file type selected for download.");
    return;
  }

  const filteredImages = downloadableImages.flatMap(item => item.file);

  // Separate 2D and 3D files based on file extensions
  const twoDImages = filteredImages.filter(url => /\.(jpg|jpeg|png)$/i.test(url));
  const threeDImages = filteredImages.filter(url => /\.3dm$/i.test(url));

  let filesToDownload = [];

  if (is2DSelected) {
    filesToDownload = [...filesToDownload, ...twoDImages];
  }

  if (is3DSelected) {
    filesToDownload = [...filesToDownload, ...threeDImages];
  }

  filesToDownload.forEach((fileUrl, index) => {
    fetch(fileUrl, { method: "GET", mode: "cors" })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.blob();
      })
      .then(blob => {
        const fileType = blob.type.split("/")[1] || "unknown";
        const fileExtension = fileType === "jpeg" ? "jpg" : fileType;
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        const fileName = `design_${index + 1}.${fileExtension}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => console.error("Error downloading the file:", error));
  });
};

const handleDownload = () => {

};

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <h3>Select Image Type</h3>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px'}}>

        <FormControlLabel
          control={
              <Checkbox
              checked={is2DSelected}
              onChange={() => handleCheckboxChange("2D")}
              />
            }
            label="2D Image"
            />
        <FormControlLabel
          control={
            <Checkbox
              checked={is3DSelected}
              onChange={() => handleCheckboxChange("3D")}
              />
            }
            label="3D Image"
            />
            </div>
        

        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadMultiple}
          disabled={!is2DSelected && !is3DSelected} // Disable button if none is selected
          sx={{ mt: 0 }}
          >
            {isLoading ? (
    <CircularProgress size={24} color="inherit" />
  ) : (
    "Download"
  )}
        </Button>
        
      </Box>
    </Modal>
  );
};

export default DownloadImageModal;
