import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CadAssignment from "../../../Componets/CAD/Cad Assignment Panal/CadAssignment";

const CadAssignmentPage = () => {
  return (
    <div className="ParentVotorPage">
      <Sidebar />
      <Header />
      <CadAssignment />
    </div>
  );
};

export default CadAssignmentPage;
