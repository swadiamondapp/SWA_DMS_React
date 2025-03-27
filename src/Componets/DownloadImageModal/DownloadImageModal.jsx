import React, { useState, useEffect } from "react";
import { Modal, Box, Button, FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import JSZip from "jszip"; // Import JSZip
import { saveAs } from "file-saver"; // Import file-saver
import { downloadCadByFileType } from "../../Pages/Renders/Apis";

const DownloadImageModal = ({ open, onClose, setFyleType, fileType, selectedCadFolder, is3DSelected, is2DSelected, setIs2DSelected, setIs3DSelected }) => {
  const [downloadableImages, setDownloadableImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    downloadCadByFileType(setIsLoading, setDownloadableImages, fileType, selectedCadFolder);
  }, [fileType]);

  const handleCheckboxChange = (type) => {
    if (type === "2D") {
      setIs2DSelected(!is2DSelected);
      setFyleType(!is2DSelected && is3DSelected ? "both" : !is2DSelected ? "" : "2d");
    } else if (type === "3D") {
      setIs3DSelected(!is3DSelected);
      setFyleType(!is3DSelected && is2DSelected ? "both" : !is3DSelected ? "" : "3d");
    }
  };

  const handleDownloadAsZip = async () => {
    if (!is2DSelected && !is3DSelected) {
      console.error("No file type selected for download.");
      return;
    }

    setIsLoading(true);
    const zip = new JSZip();
    let downloadPromises = [];

    downloadableImages.forEach((cadItem) => {
      const cadFolder = zip.folder(cadItem.name); // Create folder using cad_name
      const files = cadItem.file || [];

      files.forEach((url, index) => {
        const is2DFile = /\.(jpg|jpeg|png)$/i.test(url);
        const is3DFile = /\.3dm$/i.test(url);

        if ((is2DSelected && is2DFile) || (is3DSelected && is3DFile)) {
          downloadPromises.push(
            fetch(url)
              .then((res) => res.blob())
              .then((blob) => {
                const fileType = blob.type.split("/")[1] || "unknown";
                const fileExtension = is3DFile ? "3dm" : fileType === "jpeg" ? "jpg" : fileType;
                const fileName = `${is2DFile ? "2D_Image" : "3D_Model"}_${index + 1}.${fileExtension}`;
                cadFolder.file(fileName, blob);
              })
              .catch((error) => console.error("Error downloading file:", error))
          );
        }
      });
    });

    // Wait for all downloads to complete
    await Promise.all(downloadPromises);

    // Generate ZIP file and trigger download
    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "CAD_Files.zip");
      setIsLoading(false);
    });
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
          <FormControlLabel control={<Checkbox checked={is2DSelected} onChange={() => handleCheckboxChange("2D")} />} label="2D Image" />
          <FormControlLabel control={<Checkbox checked={is3DSelected} onChange={() => handleCheckboxChange("3D")} />} label="3D Image" />
        </div>

        <Button variant="contained" color="primary" onClick={handleDownloadAsZip} disabled={!is2DSelected && !is3DSelected || isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Download ZIP"}
        </Button>
      </Box>
    </Modal>
  );
};

export default DownloadImageModal;
