import React from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import AssignmentView from "../../Componets/Assignment Folder/AssignmentView";
import "./AssignmentViewPage.css";

const AssignmentViewPage = () => {
  return (
    <div className="Parent_AssignmentPage">
      <Sidebar />
      <Header />
      <AssignmentView />
    </div>
  );
};

export default AssignmentViewPage;
