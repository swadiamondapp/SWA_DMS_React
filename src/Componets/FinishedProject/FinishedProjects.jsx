import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../FinishedProject/FinishedProject.css";
import folderimg from "../../assets/folder.png";
import DesignBtn from "../ADMIN PANEL/Design Pool/DesignBtn";

const FinishedProjects = () => {
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectButtonLabel, setSelectButtonLabel] = useState("Select");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);

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
  return (
    <div className="Parant_FinishedProject">
      <div className="filter_Container">
        <DesignBtn
          toggleDownloadOptions={toggleDownloadOptions}
          selectButtonLabel={selectButtonLabel}
          toggleRadioButtons={toggleRadioButtons}
          toggleMoveOptions={toggleMoveOptions}
          showDownloadOptions={showDownloadOptions}
          showMoveOptions={showMoveOptions}
        />
      </div>
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
  );
};

export default FinishedProjects;
