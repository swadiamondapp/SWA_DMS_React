import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../FinishedProject/FinishedProject.css";
import folderimg from "../../assets/folder.png";
import DesignBtn from "../ADMIN PANEL/Design Pool/DesignBtn";

const FinishedProjects = (props) => {
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
     <div className="Parant_FinishedProject" style={{paddingLeft:props.sidebarExpanded? "225px":"130px"}}>
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
        {props?.finishedProjectData?.map((item, index) => (
          <div className="folder__card">
            <Link to={`/finished/${item.id}`}>
              <img src={folderimg} alt="" />
            </Link>

            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinishedProjects;
