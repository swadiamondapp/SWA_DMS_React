import React from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import WareHouseDetails from "../../../Componets/WareHouseDetails/WareHouseDetails";



const WareHouseDetailsPage = () => {
  return (
    <div className="Parent_WareHouseDetailsPage">
      <Sidebar />
      <Header />
      <WareHouseDetails />
    </div>
  );
};

export default WareHouseDetailsPage;
