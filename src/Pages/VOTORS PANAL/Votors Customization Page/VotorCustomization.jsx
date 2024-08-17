import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import VotorsCustomization from "../../../Componets/VOTORS PANEL/Votor Customization/VotorsCustomization";

const VotorCustomization = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="ParentVotorPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} />
      <VotorsCustomization  sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default VotorCustomization;
