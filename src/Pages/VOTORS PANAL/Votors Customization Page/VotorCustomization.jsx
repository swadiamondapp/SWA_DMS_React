import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import VotorsCustomization from "../../../Componets/VOTORS PANEL/Votor Customization/VotorsCustomization";

const VotorCustomization = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [SearchWithName, setSearchWithName] = useState("");

  return (
    <div className="ParentVotorPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} setSearchWithName={setSearchWithName}/>
      <VotorsCustomization  sidebarExpanded={sidebarExpanded} SearchWithName={SearchWithName} />
    </div>
  );
};

export default VotorCustomization;
