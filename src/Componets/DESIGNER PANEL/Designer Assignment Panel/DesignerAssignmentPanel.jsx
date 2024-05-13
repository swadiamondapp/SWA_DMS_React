import React from "react";
import "./DesignerAssignmentPanel.css";
import { useLocation, Link } from "react-router-dom";
import folderimg from "../../../assets/folder.png";

const DesignerAssignmentPanel = () => {
  return (
    <div className="DesignerAssignmentPanel">
      <div className="Parent_Folder_section_Designer">
        <h3 className="HeadNewdesign">Folders</h3>
        <div className="folderCard_parent">
          <div className="folder__card">
            <Link to="/designerassignview">
              <img src={folderimg} alt="" />
            </Link>

            <p>Akshayathithiya</p>
          </div>
          <div className="folder__card">
            <Link to="">
              <img src={folderimg} alt="" />
            </Link>
            <p>Akshayathithiya</p>
          </div>
          <div className="folder__card">
            <Link to="">
              <img src={folderimg} alt="" />
            </Link>
            <p>Akshayathithiya</p>
          </div>
          <div className="folder__card">
            <Link to="">
              <img src={folderimg} alt="" />
            </Link>
            <p>Akshayathithiya</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerAssignmentPanel;
