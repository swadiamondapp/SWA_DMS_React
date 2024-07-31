import React, { useRef } from "react";
import "./FolderDetails.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import CadPrint from "./CadPrint";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LuPrinter } from "react-icons/lu";
import axios from "axios";
import fileDownload from "js-file-download";
import { CircularProgress } from "@mui/material";

const FolderDetailsCard = ({
  folderDetails,
  setIsModalOpen,
  sidebarExpanded,
  setImages,
  isLoading
}) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: printRef.current,
  });

const handleDownload = (imageUrl) => {
    fetch(imageUrl, {
      method: 'GET',
      mode: 'cors'
  })
  .then(response => response.blob())
  .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'downloaded_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  })
  .catch(error => console.error('Error downloading the image:', error));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setImages({ 
      normal: null, 
      threeD: null 
    });
  };

  function formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  }

  console.log("folderDetails?.file_3d",folderDetails?.file_3d)

  return (
    <div className="ParentCad" style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}>
      <div className="Design_FileUpload">
        <div>
          <p className="D__fileUpload">Reupload</p>
          <p className="D__fileUpload2">
            Once any changes needed in the file you can reupload the file
          </p>
        </div>
        <div className="File____uploadbtn">
          <button onClick={handleOpenModal}>
            Re Upload File{" "}
            <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
          </button>
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      {folderDetails?.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop:"50px"
              }}
            >
              <CircularProgress
                size={50} // Set the desired size
                sx={{
                  color: "#126e72",
                  padding: "8px 10px",
                  width: "35px",
                }}
              />
            </div>
          )}

      <div className="parentCentral" style={{ paddingLeft: "0px" }}>
        <div className="CadAssignmentCard">
          <div className="Card_Design_Parent">
            <div className="New_Design_card">
              <div className="Card_Details">
                <div className="Card_img" style={{ borderBottom: "0px", minHeight: "140px" }}>
                  <img src={folderDetails?.file_2d} alt="" />
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <p className="Hub_head" style={{ fontSize: "13px", padding: "5px 0px" }}>
                    Posted on : {formatDate(folderDetails?.updated_at)}
                  </p>
                  <button className="Download_btn_hub" onClick={() => handleDownload(folderDetails?.file_2d)}>
                    DOWNLOAD
                    <GoDownload />
                  </button>
                </div>
              </div>
            </div>
            <div className="New_Design_card">
              <div className="Card_Details">
                <div className="Card_img" style={{ borderBottom: "0px", minHeight: "140px" }}>
                  <img src={folderDetails?.file_3d} alt="" />
                  {/* <ThreeDViewer modelUrl={folderDetails?.file_3d} /> */}
                </div>
                <div className="Card_Details_Inner_cad_Hub">
                  <p className="Hub_head" style={{ fontSize: "13px", padding: "5px 0px" }}>
                    Posted on : {formatDate(folderDetails?.updated_at)}
                  </p>
                  <ReactToPrint
                    trigger={() => (
                      <div className="Prinit_btn_hub" onClick={handlePrint}>
                        <LuPrinter /> Print
                      </div>
                    )}
                    content={() => printRef.current}
                  />{" "}
                  <div style={{ display: "none" }}>
                    <CadPrint ref={printRef} folderDetails={folderDetails} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderDetailsCard;
