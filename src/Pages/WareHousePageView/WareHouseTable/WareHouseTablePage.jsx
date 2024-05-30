import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CustomiseRequiestTable from "../../../Componets/CustomiseRequiestTable/CustomiseRequiestTable";
import "./warehouse.css";

const WareHouseTablePage = () => {
  return (
    <div className="Parent_WareHouseTable">
      <Sidebar />
      <Header />
      <CustomiseRequiestTable />
    </div>
  );
};

export default WareHouseTablePage;
