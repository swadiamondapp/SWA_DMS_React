import React,{useState,useEffect} from "react";
import "./DesignerDashboardPage.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerDashboard from "../../../Componets/DESIGNER PANEL/Designer Dashboard/DesignerDashboard";

const DesignerDashboadPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [SearchWithName, setSearchWithName] = useState("");
  return (
    <div>
      <div className="DesignerDashboardPage">
        <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
        <Header sidebarExpanded={sidebarExpanded} setSearchWithName={setSearchWithName}/>
        <DesignerDashboard sidebarExpanded={sidebarExpanded} SearchWithName={SearchWithName}  />
      </div>
    </div>
  );
};

export default DesignerDashboadPage;
