import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import './RendersPage.css'
import FinishedProjectInner from "../../../Componets/Renders/FinishedProjectInner/FinishedProjectInner";

const RendersPage = () => {
  return (
    <div className="Parent_RendersPage">
      <Sidebar />
      <Header />
      <FinishedProjectInner />
    </div>
  );
};

export default RendersPage;
