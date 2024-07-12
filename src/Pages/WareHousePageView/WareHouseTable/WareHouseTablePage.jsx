import React,{useState,useEffect} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CustomiseRequiestTable from "../../../Componets/CustomiseRequiestTable/CustomiseRequiestTable";
import "./warehouse.css";


const WareHouseTablePage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
 
  return (
    <div className="Parent_WareHouseTable">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header  sidebarExpanded={sidebarExpanded}/>
      <CustomiseRequiestTable  sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default WareHouseTablePage;
