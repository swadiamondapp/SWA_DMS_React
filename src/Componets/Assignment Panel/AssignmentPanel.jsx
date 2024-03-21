import React, { useState, useEffect, useRef } from "react";
import "../Design Pool/DesignPool.css";
import "./AssignmentPanel.css";
import DesignBtn from "../Design Pool/DesignBtn";
import ring from "../../assets/gold.png";
import like from "../../assets/like.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, Link } from "react-router-dom";
import folderimg from "../../assets/folder.png";

const AssignmentPanel = () => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [showDeleteMoveButtons, setShowDeleteMoveButtons] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const location = useLocation();
  const dotsRef = useRef(null);

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
  const toggleDeleteMoveButtons = () => {
    setShowDeleteMoveButtons(!showDeleteMoveButtons);
    setShowOverlay(!showOverlay);
  };
  const handleClickOutside = (event) => {
    if (dotsRef.current && !dotsRef.current.contains(event.target)) {
      setShowDeleteMoveButtons(false);
      setShowOverlay(false);
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setUploadInstructionsVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  return (
    <div className="Parent_AssignmentView">
      <div
        className="AssignmentPanel_FileUpload"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {uploadInstructionsVisible && !uploadedImage && (
          <>
            <p>Create new assignment</p>
            <p>
              Drag & Drop or{" "}
              <span style={{ color: "#0464D5" }}>choose file</span> to upload
              file <br /> jpg, png
            </p>
          </>
        )}
        {uploadedImage && ( // Check if an image is uploaded
          <img src={uploadedImage} alt="Uploaded" className="uploadedimg" />
        )}
        {/* {!uploadedImage && uploadInstructionsVisible && (
          <>
            <p>Create new assignment</p>
            <p>
              Drag & Drop or choose file to upload file <br /> jpg, png
            </p>
          </>
        )} */}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>

      <div className="Assignment_Panel_desc">
        <DesignBtn
          toggleDownloadOptions={toggleDownloadOptions}
          selectButtonLabel={selectButtonLabel}
          toggleRadioButtons={toggleRadioButtons}
          toggleMoveOptions={toggleMoveOptions}
          showDownloadOptions={showDownloadOptions}
          showMoveOptions={showMoveOptions}
        />
        <div className="Assignment_panel_section">
          <h3 className="HeadNewdesign">Selected</h3>
          <div className="Card_Design_Parent">
            {card.map((item) => (
              <div className="New_Design_card">
                <div className="Card_img">
                  <img src={ring} alt="" />
                  {showDeleteMoveButtons && <div className="Overlay" />}
                </div>
                <div className="Card_Details">
                  <h3>ID : {item.product}</h3>
                  <div className="Card_Details_Inner">
                    <div className="Inner_Left">
                      <p>{item.name}</p>
                      <p>{item.date}</p>
                    </div>
                    <div className="Inner_Right">
                      <p>
                        12 <img src={like} alt="" />
                      </p>
                    </div>
                  </div>
                </div>
                {/* radio btn */}
                {showRadioButtons && (
                  <input
                    className="Radio_select"
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  ></input>
                )}
                {/* radio btn */}
                {!showRadioButtons &&
                  location.pathname === "/assignmentpanel" && (
                    <div onClick={toggleDeleteMoveButtons} ref={dotsRef}>
                      <BsThreeDotsVertical className="A_dots" />
                    </div>
                  )}
                {showDeleteMoveButtons && (
                  <div className="Dots_Delete_DesignPool_btns">
                    <p>Delete</p>
                    <p>Move to Design pool</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Folders */}
        <div className="Parent_Folder_section">
          <h3 className="HeadNewdesign">Folders</h3>
          <div className="folderCard_parent">
            <div className="folder__card">
              <Link to="/assignmentview">
                <img src={folderimg} alt="" />
              </Link>

              <p>Akshayathithiya</p>
            </div>
            <div className="folder__card">
              <Link to="/assignmentview">
                <img src={folderimg} alt="" />
              </Link>
              <p>Akshayathithiya</p>
            </div>
            <div className="folder__card">
              <Link to="/assignmentview">
                <img src={folderimg} alt="" />
              </Link>
              <p>Akshayathithiya</p>
            </div>
            <div className="folder__card">
              <Link to="/assignmentview">
                <img src={folderimg} alt="" />
              </Link>
              <p>Akshayathithiya</p>
            </div>
          </div>
        </div>
        {/* Folders */}
      </div>
    </div>
  );
};

export default AssignmentPanel;
