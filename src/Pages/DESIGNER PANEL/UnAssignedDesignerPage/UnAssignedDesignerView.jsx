import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import UnAssignedDesigner from "../../../Componets/DESIGNER PANEL/UnAssignedDesigner/UnAssignedDesigner";

const UnAssignedDesignerView = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="DesignerDashboardPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} />
      <UnAssignedDesigner sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default UnAssignedDesignerView;
