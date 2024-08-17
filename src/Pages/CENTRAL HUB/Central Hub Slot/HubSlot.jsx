import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import Slots from "../../../Componets/CENTRAL HUB/Slot/Slots";

const HubSlot = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="centralhubDashboard">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header  sidebarExpanded={sidebarExpanded}  />

      <Slots  sidebarExpanded={sidebarExpanded}  />
    </div>
  );
};

export default HubSlot;
