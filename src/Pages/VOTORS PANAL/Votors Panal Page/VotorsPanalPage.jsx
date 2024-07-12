import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import VotorsPanal from "../../../Componets/VOTORS PANEL/Votors Panel/VotorsPanal";
import "./VotorsPanalPage.css";

const VotorsPanalPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="ParentVotorPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded} />
      <VotorsPanal sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default VotorsPanalPage;
