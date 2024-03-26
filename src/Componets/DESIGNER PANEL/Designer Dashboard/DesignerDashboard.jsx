import React, { useState } from "react";
import "./DesignerDashboard.css";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import DesignBtn from "../../Design Pool/DesignBtn";
import ring from "../../../assets/ring.png";

const DesignerDashboard = () => {
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");

  const card = [
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
    {
      product: "SWAD3456",
      name: "Shivaprasad Yadav",
      date: "12 june 2023",
    },
  ];
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadInstructionsVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className="DesignerDashboard">
        <div
          className="Design_FileUpload"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {uploadInstructionsVisible ? (
            <>
              <div>
                <p className="D__fileUpload">Upload file</p>
                <p className="D__fileUpload2">
                  you can upload file as single or bulk file
                </p>
              </div>
              <div className="File____uploadbtn">
                <button>
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
                  Upload File{" "}
                  <LiaCloudUploadAltSolid style={{ fontSize: "22px" }} />
                </button>
              </div>
            </div>
          )}

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
        {/* uploaded file list */}
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
              {card.map((item) => (
                <div className="New_Design_card">
                  <div className="Card_img">
                    <img src={ring} alt="" />
                  </div>
                  <div className="Card_Details">
                    <h3>ID : {item.product}</h3>
                    <div className="Card_Details_Inner">
                      <div className="Inner_Left">
                        <p>{item.name}</p>
                        <p>{item.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* uploaded file list */}
      </div>
    </div>
  );
};

export default DesignerDashboard;
