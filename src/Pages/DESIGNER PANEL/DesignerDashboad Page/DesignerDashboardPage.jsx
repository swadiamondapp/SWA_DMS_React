import React,{useState} from "react";
import "./DesignerDashboardPage.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerDashboard from "../../../Componets/DESIGNER PANEL/Designer Dashboard/DesignerDashboard";

const DesignerDashboadPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div>
      <div className="DesignerDashboardPage">
        <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
        <Header sidebarExpanded={sidebarExpanded}/>
        <DesignerDashboard sidebarExpanded={sidebarExpanded} />
      </div>
    </div>
  );
};

export default DesignerDashboadPage;
