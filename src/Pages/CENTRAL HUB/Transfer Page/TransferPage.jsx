import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import Transfer from "../../../Componets/CENTRAL HUB/Transfer/Transfer";


const TransferPage = () => {
  return (
    <div className="centralhubDashboard">
      <Sidebar />
      <Header />

      <Transfer/>
    </div>
  );
};

export default TransferPage;
