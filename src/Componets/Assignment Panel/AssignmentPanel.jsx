import React, { useState, useEffect, useRef } from "react";
import "../ADMIN PANEL/Design Pool/DesignPool.css";
import "./AssignmentPanel.css";
import DesignBtn from "../ADMIN PANEL/Design Pool/DesignBtn";
import ring from "../../assets/gold.png";
import like from "../../assets/like.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, Link,useNavigate } from "react-router-dom";
import folderimg from "../../assets/folder.png";
import { list_assignment_panel, list_folderDetails } from "./Api";
import { list_assignment_folder } from "../ADMIN PANEL/Design Pool/Api";
// import { useLocation, useNavigate } from "react-router-dom";


const AssignmentPanel = () => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [showDeleteMoveButtons, setShowDeleteMoveButtons] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [Data, setData] = useState([]);
  const [assignmentFolder, setAssignmentFolder] = useState([]);
  const [folderId,setFolderId] = useState([])
  const [uploadInstructionsVisible, setUploadInstructionsVisible] =
    useState(true);
  const location = useLocation();
  const dotsRef = useRef(null);
  const navigate = useNavigate();


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
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    list_assignment_panel(setIsLoading, setData);
    list_assignment_folder(setIsLoading, setAssignmentFolder);
    list_folderDetails()
  }, []);

  const handleFolderClick = (id ) => {
    console.log("id.....>",id)
    if (location.pathname === "/assignmentview") {
      navigate(
        `assignmentview${id}`
      );
    }
    
  }



  console.log(Data, "assignmentDatatat");

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
            {Data.map((item) => (
              <div className="New_Design_card">
                <div className="Card_img">
                  {console.log(
                    "images...?",
                    item && item.items[0].paper_design
                  )}
                  <img src={item && item.items[0].paper_design.image} alt="" />
                  {showDeleteMoveButtons && <div className="Overlay" />}
                </div>
                <div className="Card_Details">
                  <h3>ID : {item && item.items[0].paper_design.designcode}</h3>
                  <div className="Card_Details_Inner">
                    <div className="Inner_Left">
                      <p>{item.name}</p>
                      <p>{item && item.items[0].paper_design.created_at}</p>
                    </div>
                    <div className="Inner_Right">
                      <p>
                        {item && item.items[0].paper_design.likes_count}
                        <img src={like} alt="" />
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
            {console.log("assignment",assignmentFolder)}
            {assignmentFolder.map((item) => (
              <div className="folder__card">
                <Link to={`/assignmentview/${item.id}`} >
                  <img src={folderimg} alt="" />
                </Link>

                <p>{item.name}</p>
              </div>
            ))}
            {/* <div className="folder__card">
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
            </div> */}
          </div>
        </div>
        {/* Folders */}
      </div>
    </div>
  );
};

export default AssignmentPanel;
