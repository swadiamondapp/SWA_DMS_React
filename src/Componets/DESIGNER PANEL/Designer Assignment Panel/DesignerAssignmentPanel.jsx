import React, { useState, useEffect } from "react";
import "./DesignerAssignmentPanel.css";
import { useLocation, Link } from "react-router-dom";
import folderimg from "../../../assets/folder.png";
import { list_designer_folder } from "./Api";

const DesignerAssignmentPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designerFolder, setDesignerFolder] = useState([]);

  useEffect(() => {
    list_designer_folder(setIsLoading, setDesignerFolder);
  }, []);

  return (
    <div className="DesignerAssignmentPanel">
      <div className="Parent_Folder_section_Designer">
        <h3 className="HeadNewdesign">Folders</h3>
        <div className="folderCard_parent">
          {designerFolder.map((item) => (
            <div className="folder__card">
              <Link  to={{
                  pathname: `/designerassignview/${item.id}`,
                  state: { name: item.name, id: item.id },
                }} >
                <img src={folderimg} alt="" />
              </Link>

              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignerAssignmentPanel;
