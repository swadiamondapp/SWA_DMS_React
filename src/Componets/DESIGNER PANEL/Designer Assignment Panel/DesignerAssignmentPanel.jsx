import React, { useState, useEffect } from "react";
import "./DesignerAssignmentPanel.css";
import { useLocation, Link } from "react-router-dom";
import folderimg from "../../../assets/folder.png";
import { list_designer_folder, list_designer_folder_new } from "./Api";
import { useNavigate } from 'react-router-dom';

const DesignerAssignmentPanel = ({sidebarExpanded,
  designerFolder,
  setDesignerFolder
}) => {
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    list_designer_folder_new(setIsLoading, setDesignerFolder);
  }, []);
  console.log(designerFolder, "folderName");
  const navigate = useNavigate();

  const handleNavigate = (id, name) => {
    navigate(`/designerassignview/${id}`, {
      state: { folderName: name },
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="DesignerAssignmentPanel" style={{paddingLeft:sidebarExpanded? "225px":"130px"}}>
      <div className="Parent_Folder_section_Designer">
        <h3 className="HeadNewdesign">Folders</h3>
        <div className="folderCard_parent">
          {designerFolder.map((item, index) => (
            <div className="folder__card" key={index}  onClick={() => handleNavigate(item.id, item.name)}>
            {/* <Link to={`/designerassignview/${item.id}?name=${encodeURIComponent(item.name)}`}> */}
                <img src={folderimg} alt={item.name} />
              {/* </Link> */}

              <p className="text-truncate" >{truncateText(item.name, 10)}</p>
              <span className="text-truncate_hover" >{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignerAssignmentPanel;
