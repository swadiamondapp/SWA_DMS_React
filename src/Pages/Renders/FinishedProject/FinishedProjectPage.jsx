import React, { useState, useEffect } from "react";
import { finishedProjectList } from "../Apis";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import "../../../Componets/FinishedProject/FinishedProject.css";
import FinishedProjects from "../../../Componets/FinishedProject/FinishedProjects";

const FinishedProjectPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [finishedProjectData, setFinishedProjectData] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    finishedProjectList(setFinishedProjectData,setIsLoading);
  }, []);

  return (
      <div className="Parent_FinishedProjectPage">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header sidebarExpanded={sidebarExpanded} />
      <FinishedProjects
        finishedProjectData={finishedProjectData}
        setFinishedProjectData={setFinishedProjectData}
        sidebarExpanded={sidebarExpanded}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FinishedProjectPage;
