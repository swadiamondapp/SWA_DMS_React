import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import JSZip from "jszip"; // Import JSZip
import { saveAs } from "file-saver"; // Import file-saver
import { downloadCadByFileType } from "../../Pages/Renders/Apis";

const DownloadImageModal = ({
  open,
  onClose,
  setFyleType,
  fileType,
  selectedCadFolder,
  is3DSelected,
  is2DSelected,
  setIs2DSelected,
  setIs3DSelected,
}) => {
  const [downloadableImages, setDownloadableImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    downloadCadByFileType(
      setIsLoading,
      setDownloadableImages,
      fileType,
      selectedCadFolder
    );
  }, [fileType]);

  const handleCheckboxChange = (type) => {
    let nextIs2D = is2DSelected;
    let nextIs3D = is3DSelected;
  
    if (type === "2D") {
      nextIs2D = !is2DSelected;
      setIs2DSelected(nextIs2D);
    } else if (type === "3D") {
      nextIs3D = !is3DSelected;
      setIs3DSelected(nextIs3D);
    }
      const newFyleType =
      nextIs2D && nextIs3D
        ? "both"
        : nextIs2D
        ? "2d"
        : nextIs3D
        ? "3d"
        : "";
  
    setFyleType(newFyleType);
  };
  

  // const handleDownloadAsZip = async () => {
  //   if (!is2DSelected && !is3DSelected) {
  //     console.error("No file type selected for download.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   const zip = new JSZip();
  //   let downloadPromises = [];

  //   downloadableImages.forEach((cadItem) => {
  //     const cadFolder = zip.folder(cadItem.name);
  //     const files = Array.isArray(cadItem.file) ? cadItem.file : [cadItem.file];
  //     console.log(files, "files>>");

  //     files.forEach((url, index) => {
  //       const is2DFile = /\.(jpg|jpeg|png)$/i.test(url);
  //       const is3DFile = /\.3dm$/i.test(url);
  //       console.log(is2DFile, "is2DFile>>");
  //       if ((is2DSelected && is2DFile) || (is3DSelected && is3DFile)) {
  //         downloadPromises.push(
  //           fetch(url)
  //             .then((res) => res.blob())
  //             .then((blob) => {
  //               const fileType = blob.type.split("/")[1] || "unknown";
  //               const fileExtension = is3DFile
  //                 ? "3dm"
  //                 : fileType === "png"
  //                 ? "png"
  //                 : fileType;
  //               const fileName = `${is2DFile ? "2D_Image" : "3D_Model"}_${
  //                 index + 1
  //               }.${fileExtension}`;
  //               cadFolder.file(fileName, blob);
  //             })
  //             .catch((error) => console.error("Error downloading file:", error))
  //         );
  //       }
  //     });
  //   });

  //   // Wait for all downloads to complete
  //   await Promise.all(downloadPromises);

  //   // Generate ZIP file and trigger download
  //   zip.generateAsync({ type: "blob" }).then((blob) => {
  //     saveAs(blob, "CAD_Files.zip");
  //     setIsLoading(false);
  //   });
  // };

  const handleDownloadAll = async (downloadableImages) => {
    const zip = new JSZip();
  
    for (const item of downloadableImages) {
      const folder = zip.folder(item.name); // Create folder with the 'name'
  
      // Ensure `file` is always treated as an array
      const files = Array.isArray(item.file) ? item.file : [item.file];
  
      for (const url of files) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
  
          const filename = url.split("/").pop(); // Extract filename from URL
          folder.file(filename, blob);
        } catch (err) {
          console.error(`Failed to fetch: ${url}`, err);
        }
      }
    }
  
    // Generate the zip and trigger download
    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "CAD_Files.zip");
    });
   };
   

  console.log(downloadableImages, "downloadableImages>>>");
  console.log(fileType, "fileType>>>");
  console.log(is2DSelected, "is2DSelected>>>");
  console.log(is3DSelected, "is3DSelected>>>");

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
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
          // onClick={handleDownloadAsZip}
          onClick={()=>handleDownloadAll(downloadableImages)}
          disabled={(!is2DSelected && !is3DSelected) || isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Download ZIP"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default DownloadImageModal;
