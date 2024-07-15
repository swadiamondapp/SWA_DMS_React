import React,{useState} from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import "./MastersMainPage.css";
import MastersTable from "../MastersTable/MastersTable";
import { Outlet } from "react-router-dom";

const MastersMainPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="MastersMainPage">
      <Sidebar sidebarExpanded={sidebarExpanded}  setSidebarExpanded={ setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded}/>
      <MastersTable sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default MastersMainPage;
