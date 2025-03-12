import React,{useState,useEffect} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CustomiseRequiestTable from "../../../Componets/CustomiseRequiestTable/CustomiseRequiestTable";
import "./warehouse.css";


const WareHouseTablePage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [SearchWithName, setSearchWithName] = useState("");
  
 
  return (
    <div className="Parent_WareHouseTable">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header  sidebarExpanded={sidebarExpanded} setSearchWithName={setSearchWithName}/>
      <CustomiseRequiestTable  sidebarExpanded={sidebarExpanded} SearchWithName={SearchWithName}/>
    </div>
  );
};

export default WareHouseTablePage;
