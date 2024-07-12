import React ,{useState}from "react";
import "./CentralHubDashboard.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CentralDashboard from "../../../Componets/CENTRAL HUB/Central Dashboard/CentralDashboard";

const CentralHubDashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="centralhubDashboard">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded}/>
      <CentralDashboard sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default CentralHubDashboard;
