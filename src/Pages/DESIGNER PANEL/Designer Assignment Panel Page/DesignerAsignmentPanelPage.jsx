import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerAssignmentPanel from "../../../Componets/DESIGNER PANEL/Designer Assignment Panel/DesignerAssignmentPanel";

const DesignerAsiignmentPanelPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="DesignerDashboardPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded}/>
      <DesignerAssignmentPanel sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default DesignerAsiignmentPanelPage;
