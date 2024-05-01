import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import '../../../Componets/FinishedProject/FinishedProject.css'
import FinishedProjects from "../../../Componets/FinishedProject/FinishedProjects";


const FinishedProjectPage = () => {
  return (
    <div className="Parent_FinishedProjectPage">
      <Sidebar />
      <Header />
      <FinishedProjects/>
    </div>
  );
};

export default FinishedProjectPage;
