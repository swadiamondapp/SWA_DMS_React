import React from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import AssignmentPanel from "../../Componets/Assignment Panel/AssignmentPanel";
import "./AssignmentPanelPage.css";

const AssignmentPanalPage = () => {
  return (
    <div className="Parent_AssignmentpanalPage">
      <Sidebar />
      <Header />
      <AssignmentPanel />
    </div>
  );
};

export default AssignmentPanalPage;
