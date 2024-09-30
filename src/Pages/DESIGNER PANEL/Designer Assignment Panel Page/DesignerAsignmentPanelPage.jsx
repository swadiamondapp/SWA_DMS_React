import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerAssignmentPanel from "../../../Componets/DESIGNER PANEL/Designer Assignment Panel/DesignerAssignmentPanel";
import {  designerSearchById } from "../../../Componets/ADMIN PANEL/Design Pool/Api";

const DesignerAsiignmentPanelPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
 
  const [searchListId, setsearchListId] = useState("");
  const [designerFolder, setDesignerFolder] = useState([]);
  
  const handleInputChange = async (event) => {
    const { value } = event.target;
    setsearchListId(value.toUpperCase());
    await designerSearchById(value, setDesignerFolder);
  };

  return (
    <div className="DesignerDashboardPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} searchListId={searchListId} setsearchListId={setsearchListId} handleInputChange={handleInputChange}/>
      <DesignerAssignmentPanel sidebarExpanded={sidebarExpanded} designerFolder={designerFolder} setDesignerFolder={setDesignerFolder} handleInputChange={handleInputChange}/>
    </div>
  );
};

export default DesignerAsiignmentPanelPage;
