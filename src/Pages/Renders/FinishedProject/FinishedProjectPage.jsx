import React, { useState, useEffect } from "react";
import { finishedProjectList } from "../Apis";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import "../../../Componets/FinishedProject/FinishedProject.css";
import FinishedProjects from "../../../Componets/FinishedProject/FinishedProjects";

const FinishedProjectPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [finishedProjectData, setFinishedProjectData] = useState([]);

  useEffect(() => {
    finishedProjectList(setIsLoading, setFinishedProjectData);
  }, []);
  return (
    <div className="Parent_FinishedProjectPage">
      <Sidebar />
      <Header />
      <FinishedProjects finishedProjectData={finishedProjectData} />
    </div>
  );
};

export default FinishedProjectPage;
