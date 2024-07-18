import React, { useState, useEffect } from "react";
import "./DesignerDashboard.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import DesignBtn from "../../ADMIN PANEL/Design Pool/DesignBtn";
import ring from "../../../assets/ring.png";
import { list_uploaded_designs, upload_designs_items } from "./Api";
import { CircularProgress } from "@mui/material";

const DesignerDashboard = ({ sidebarExpanded }) => {
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [uploadedDesigns, setUploadedDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState([]);

  const toggleRadioButtons = () => {
    setShowRadioButtons(!showRadioButtons);
    setSelectButtonLabel(showRadioButtons ? "Select" : "Unselect");
  };
  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };
  const toggleMoveOptions = () => {
    setShowMoveOptions(!showMoveOptions);
  };

  const formData = new FormData();
  formData.append("image", uploadImage);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    upload_designs_items(setIsLoading, file, setUploadedDesigns);
  };

  useEffect(() => {
    list_uploaded_designs(setIsLoading, setUploadedDesigns);
  }, []);

  console.log("uploadImage-->", uploadedDesigns);

  return (
    <div>
      <div
        className="DesignerDashboard"
        style={{ paddingLeft: sidebarExpanded ? "225px" : "130px" }}
      >
        <div className="Design_FileUpload">
          {uploadInstructionsVisible ? (
            <>
              <div>
                <p className="D__fileUpload">Upload file</p>
                <p className="D__fileUpload2">you can upload file here </p>
              </div>
              <div className="File____uploadbtn">
                <button
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Upload File{" "}
                  <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
                </button>
              </div>
            </>
          ) : (
            <div className="De__file">
              <p>File uploaded successfully!</p>
              <div className="File____uploadbtn">
                <button>
                  Upload Image
                  <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
                </button>
              </div>
            </div>
          )}

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
        <div className="Uploaded___list">
          <DesignBtn
            toggleDownloadOptions={toggleDownloadOptions}
            selectButtonLabel={selectButtonLabel}
            toggleRadioButtons={toggleRadioButtons}
            toggleMoveOptions={toggleMoveOptions}
            showDownloadOptions={showDownloadOptions}
            showMoveOptions={showMoveOptions}
          />
          <div className="DesignerDashboardcard">
            <h3 className="HeadNewdesign">Uploaded</h3>
            <div className="Card_Design_Parent">
              {isLoading ? (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "rgba(255, 255, 255, 0.8)",
                    // zIndex: 9999,
                  }}
                >
                  <CircularProgress
                    size={60}
                    sx={{
                      color: "#000000",
                      padding: "8px 10px",
                    }}
                  />
                </div>
              ):(<>
                {uploadedDesigns.map((item, index) => (
                <div className="New_Design_card" key={index}>
                  <div className="Card_img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="Card_Details">
                    <h3>ID : {item.designcode}</h3>
                    <div className="Card_Details_Inner">
                      <div className="Inner_Left">
                        <p>{item.name}</p>
                        <p>{item.created_at}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}</>)}
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerDashboard;
