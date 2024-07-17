import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { folderItemList } from "../Apis";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import "./RendersPage.css";
import FinishedProjectInner from "../../../Componets/Renders/FinishedProjectInner/FinishedProjectInner";

const RendersPage = () => {
  const { id } = useParams();
  const [isLoadig, setIsLoadig] = useState(false);
  const [folderItem, setFolderItem] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);


  useEffect(() => {
    folderItemList(setIsLoadig, setFolderItem, id);
  }, [id]);

  return (
    <div className="Parent_RendersPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded}/>
      <FinishedProjectInner folderItem={folderItem} sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default RendersPage;
