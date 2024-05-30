import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerAssignmentPanel from "../../../Componets/DESIGNER PANEL/Designer Assignment Panel/DesignerAssignmentPanel";

const DesignerAsiignmentPanelPage = () => {
  return (
    <div className="DesignerDashboardPage">
      <Sidebar />
      <Header />
      <DesignerAssignmentPanel />
    </div>
  );
};

export default DesignerAsiignmentPanelPage;
