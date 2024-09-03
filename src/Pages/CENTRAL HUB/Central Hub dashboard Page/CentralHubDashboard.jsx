import React ,{useState,useEffect}from "react";
import "./CentralHubDashboard.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CentralDashboard from "../../../Componets/CENTRAL HUB/Central Dashboard/CentralDashboard";
import { listFoldersCentralHub } from "../Api";
import { centralHubSearchById } from "../../../Componets/ADMIN PANEL/Design Pool/Api";

const CentralHubDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Folders, setFolders] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  useEffect(() => {
    // list_all_designs_from_cad(setIsLoading, setData);
    listFoldersCentralHub(setIsLoading, setFolders);
  }, []);

  const [searchListId, setsearchListId] = useState("");

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setsearchListId(value.toUpperCase());

    await centralHubSearchById(value.toUpperCase(), setFolders ,setIsLoading);
  };

  
  // const folderNameCentralHub = Folders.map((item,index))
  return (
    <div className="centralhubDashboard">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded} searchListId={searchListId} handleInputChange={handleInputChange}/>
      <CentralDashboard sidebarExpanded={sidebarExpanded} Folders={Folders} isLoading={isLoading}/>
    </div>
  );
};

export default CentralHubDashboard;
