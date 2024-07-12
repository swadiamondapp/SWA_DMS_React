import React, { useEffect, useState } from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import WareHouseDetails from "../../../Componets/WareHouseDetails/WareHouseDetails";

const WareHouseDetailsPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="Parent_WareHouseDetailsPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded}/>
      <WareHouseDetails sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default WareHouseDetailsPage;
