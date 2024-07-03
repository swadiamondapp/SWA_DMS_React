import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import UnAssignedDesigner from "../../../Componets/DESIGNER PANEL/UnAssignedDesigner/UnAssignedDesigner";

const UnAssignedDesignerView = () => {
  return (
    <div className="DesignerDashboardPage">
      <Sidebar />
      <Header />
      <UnAssignedDesigner />
    </div>
  );
};

export default UnAssignedDesignerView;
