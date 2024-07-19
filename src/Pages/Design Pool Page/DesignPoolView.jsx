import React ,{useState}from "react";
import "./DesignPoolView.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import DesignPool from "../../Componets/ADMIN PANEL/Design Pool/DesignPool";

const DesignPoolView = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  return (
    <div className="Parent_DesignPoolPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} />
      <DesignPool sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default DesignPoolView;
