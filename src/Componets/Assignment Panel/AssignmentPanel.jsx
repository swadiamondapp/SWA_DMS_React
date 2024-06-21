import React, { useState, useEffect, useRef } from "react";
import "../ADMIN PANEL/Design Pool/DesignPool.css";
import "./AssignmentPanel.css";
import DesignBtn from "../ADMIN PANEL/Design Pool/DesignBtn";
import ring from "../../assets/gold.png";
import like from "../../assets/like.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, Link, useNavigate } from "react-router-dom";
import folderimg from "../../assets/folder.png";
import { list_assignment_panel, list_folderDetails } from "./Api";
import { list_assignment_folder } from "../ADMIN PANEL/Design Pool/Api";
import DesignPools from "../DesignPoolExtended/DesignPools";
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
  const [folderId, setFolderId] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
  const [openDesignPool, setOpenDesignPool] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
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
  // const toggleDeleteMoveButtons = () => {
  //   setShowDeleteMoveButtons(!showDeleteMoveButtons);
  //   setShowOverlay(!showOverlay);
  // };
  const toggleDeleteMoveButtons = (id) => {
    if (activeCardId === id) {
      setActiveCardId(null);
      setShowOverlay(false);
    } else {
      setActiveCardId(id);
      setShowOverlay(true);
    }
  };
  const handleClickOutside = (event) => {
    if (dotsRef.current && !dotsRef.current.contains(event.target)) {
      setActiveCardId(null);
      setShowOverlay(false);
    }
  };
  // const handleClickOutside = (event) => {
  //   if (dotsRef.current && !dotsRef.current.contains(event.target)) {
  //     setShowDeleteMoveButtons(false);
  //     setShowOverlay(false);
  //   }
  // };
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
    list_folderDetails();
  }, []);

  const handleFolderClick = (id) => {
    console.log("id.....>", id);
    if (location.pathname === "/assignmentview") {
      navigate(`assignmentview${id}`);
    }
  };

  const handleCheckboxChange = (designcode) => {
    if (selectedAssignment.includes(designcode)) {
      setSelectedAssignment(
        selectedAssignment.filter((item) => item !== designcode)
      );
    } else {
      setSelectedAssignment([...selectedAssignment, designcode]);
    }
  };

  const handleOpenDesignPool = () => {
    setOpenDesignPool(true);
  };
  const hadnleCloseDesignPool = () => {
    setOpenDesignPool(false);
  };

  console.log(Data, "assignmentDatatat");
  console.log(selectedAssignment, "selecte==================>");

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

  const handleDrawModal = (item) => {
    setOpenDesignPool(true);
    setModalDetails(item);
  };
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
          selectedAssignment={selectedAssignment}
          setSelectedAssignment={setSelectedAssignment}
          setAssignmentFolder={setAssignmentFolder}
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
                  <img
                    src={item && item.items[0].paper_design.image}
                    alt=""
                    onClick={() =>
                      handleDrawModal(item && item.items[0].paper_design.image)
                    }
                  />
                  {showDeleteMoveButtons && <div className="Overlay" />}
                </div>
                <div className="Card_Details">
                  <h3>ID : {item && item.items[0].paper_design.designcode}</h3>
                  <div className="Card_Details_Inner">
                    <div className="Inner_Left">
                      <p>{item && item.items[0].paper_design.designer}</p>
                      <p>{item && item.created_at}</p>
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
                    type="checkbox"
                    id={item && item.items[0].id}
                    name="fav_language"
                    value={item && item.items[0].id}
                    onChange={() =>
                      handleCheckboxChange(item && item.items[0].id)
                    }
                    checked={selectedAssignment.includes(
                      item && item.items[0].id
                    )}
                  ></input>
                )}
                {/* radio btn */}
                {!showRadioButtons &&
                  location.pathname === "/assignmentpanel" && (
                    <div
                      onClick={() =>
                        toggleDeleteMoveButtons(item && item.items[0].id)
                      }
                      ref={dotsRef}
                    >
                      <BsThreeDotsVertical
                        className="A_dots"
                        style={{ fontSize: "20px" }}
                      />
                    </div>
                  )}
                {activeCardId === (item && item.items[0].id) && (
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
            {console.log("assignment--===>", assignmentFolder)}
            {assignmentFolder.map((item) => (
              <div className="folder__card">
                <Link
                  to={`/assignmentpaneldetailsview/${
                    item.id
                  }?name=${encodeURIComponent(item.name)}`}
                >
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
      <DesignPools
        handleOpenDesignPool={handleOpenDesignPool}
        hadnleCloseDesignPool={hadnleCloseDesignPool}
        openDesignPool={openDesignPool}
        modalDetails={modalDetails}
      />
    </div>
  );
};

export default AssignmentPanel;
