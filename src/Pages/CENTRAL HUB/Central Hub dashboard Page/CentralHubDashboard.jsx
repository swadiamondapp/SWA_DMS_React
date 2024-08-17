import React ,{useState,useEffect}from "react";
import "./CentralHubDashboard.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CentralDashboard from "../../../Componets/CENTRAL HUB/Central Dashboard/CentralDashboard";
import { listFoldersCentralHub } from "../Api";

const CentralHubDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Folders, setFolders] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  useEffect(() => {
    // list_all_designs_from_cad(setIsLoading, setData);
    listFoldersCentralHub(setIsLoading, setFolders);
  }, []);
  
  // const folderNameCentralHub = Folders.map((item,index))
  return (
    <div className="centralhubDashboard">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded}/>
      <CentralDashboard sidebarExpanded={sidebarExpanded} Folders={Folders}/>
    </div>
  );
};

export default CentralHubDashboard;
