import React from "react";
import "./DesignerDashboardPage.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import DesignerDashboard from "../../../Componets/DESIGNER PANEL/Designer Dashboard/DesignerDashboard";

const DesignerDashboadPage = () => {
  return (
    <div>
      <div className="DesignerDashboardPage">
        <Sidebar />
        <Header />
        <DesignerDashboard />
      </div>
    </div>
  );
};

export default DesignerDashboadPage;
