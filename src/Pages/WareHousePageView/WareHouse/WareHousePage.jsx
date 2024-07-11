import React, { useState, useEffect } from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import WareHouse from "../../../Componets/WareHouse/WareHouse";
import { list_voted_designs, list_warehouse_design } from "../Api";

const WareHousePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [DesignWareHouse, setDesignWareHouse] = useState([]);
  const [LastVotedDesign,setLastVotedDesigns] = useState([])
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    list_warehouse_design(setIsLoading, setDesignWareHouse);
    list_voted_designs(setIsLoading, setLastVotedDesigns);
  }, []);
  return (
    <div className="Parent_RendersCard">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header  sidebarExpanded={sidebarExpanded} />
      <WareHouse DesignWareHouse={DesignWareHouse} LastVotedDesign={LastVotedDesign}  sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default WareHousePage;
