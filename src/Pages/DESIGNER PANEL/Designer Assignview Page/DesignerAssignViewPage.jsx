import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerDetailView from "../../../Componets/DESIGNER PANEL/Designer Detail View/DesignerDetailView";

const DesignerAssignViewPage = () => {
  return (
    <div className="DesignerDashboardPage">
      <Sidebar />
      <Header />
      <DesignerDetailView />
    </div>
  );
};

export default DesignerAssignViewPage;
