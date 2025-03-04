import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import UnAssignedDesigner from "../../../Componets/DESIGNER PANEL/UnAssignedDesigner/UnAssignedDesigner";

const UnAssignedDesignerView = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [SearchWithName, setSearchWithName] = useState("");

  return (
    <div className="DesignerDashboardPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} setSearchWithName={setSearchWithName}/>
      <UnAssignedDesigner sidebarExpanded={sidebarExpanded} SearchWithName={SearchWithName} />
    </div>
  );
};

export default UnAssignedDesignerView;
