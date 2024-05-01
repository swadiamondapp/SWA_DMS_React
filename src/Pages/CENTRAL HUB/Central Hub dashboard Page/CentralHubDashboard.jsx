import React from "react";
import "./CentralHubDashboard.css";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CentralDashboard from "../../../Componets/CENTRAL HUB/Central Dashboard/CentralDashboard";

const CentralHubDashboard = () => {
  return (
    <div className="centralhubDashboard">
      <Sidebar />
      <Header />
      <CentralDashboard />
    </div>
  );
};

export default CentralHubDashboard;
