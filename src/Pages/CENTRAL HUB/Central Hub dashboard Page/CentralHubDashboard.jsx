import React ,{useState,useEffect, useRef}from "react";
import "./CentralHubDashboard.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CentralDashboard from "../../../Componets/CENTRAL HUB/Central Dashboard/CentralDashboard";
import { listFoldersCentralHub } from "../Api";
import { centralHubSearchById } from "../../../Componets/ADMIN PANEL/Design Pool/Api";

const CentralHubDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

const folders = useRef([])
  // const [Folders, setFolders] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);


  useEffect(() => {
    // list_all_designs_from_cad(setIsLoading, setData);
    listFoldersCentralHub(setIsLoading, folders);
  }, []);

  const [searchListId, setsearchListId] = useState("");

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setsearchListId(value.toUpperCase());
          
  };

  const b =async()=>{
    setIsLoading(true)
    let a = await centralHubSearchById(searchListId);
    folders.current = a
    setIsLoading(false)
  }

  useEffect(()=>{
  b()
  },[searchListId])
  
  // const folderNameCentralHub = Folders.map((item,index))
  return (
    <div className="centralhubDashboard">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded} searchListId={searchListId} handleInputChange={ handleInputChange}/>
      <CentralDashboard sidebarExpanded={sidebarExpanded} Folders={folders.current}/>
    </div>
  );
};

export default CentralHubDashboard;
