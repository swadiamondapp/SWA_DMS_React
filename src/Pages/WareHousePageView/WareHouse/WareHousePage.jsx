import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import WareHouse from "../../../Componets/WareHouse/WareHouse";


const WareHousePage = () => {
  return (
    <div className="Parent_RendersCard">
      <Sidebar />
      <Header />
      <WareHouse />
    </div>
  );
};

export default WareHousePage;
