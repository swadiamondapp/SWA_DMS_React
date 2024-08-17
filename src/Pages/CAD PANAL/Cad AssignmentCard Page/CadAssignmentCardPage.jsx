import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CadAssignmentCard from "../../../Componets/CAD/Cad Assignments Card/CadAssignmentCard";

const CadAssignmentCardPage = () => {
  return (
    <div className="ParentVotorPage">
      <Sidebar />
      <Header />
      <CadAssignmentCard />
    </div>
  );
};

export default CadAssignmentCardPage;
