import React, { useEffect, useState } from "react";
// import "./CentralHubDashboard.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import Header from "../../../Componets/Header/Header";
import CentralHubDetailsView from "../../../Componets/CENTRAL HUB/Central Dashboard/CentralHubDetailsView";
import { centralFolderDetails } from "../Api";

const CentralFolderDetailsPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [CentralFolderDetails, setCentralFolderDetails] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);


  useEffect(() => {
    centralFolderDetails(id, setCentralFolderDetails);
  }, []);

  const designCodesCentralHub = CentralFolderDetails.map((design) => design.designcode);
  return (
    <div className="centralhubDashboard">
      <Sidebar  sidebarExpanded={sidebarExpanded}  setSidebarExpanded={setSidebarExpanded} />
      <Header centralId={id} designCodesCentralHub={designCodesCentralHub} sidebarExpanded={sidebarExpanded} />
      <CentralHubDetailsView CentralFolderDetails={CentralFolderDetails} sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default CentralFolderDetailsPage;
