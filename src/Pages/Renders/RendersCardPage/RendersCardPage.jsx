import React, { useState, useEffect } from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import RenderCard from "../../../Componets/RenderCard/RenderCard";
import { cadDesignList } from "../Apis";

const RendersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designListData, setDesignListData] = useState([]);

  useEffect(() => {
    cadDesignList(setIsLoading, setDesignListData);
  }, []);
  return (
    <div className="Parent_RendersCard">
      <Sidebar />
      <Header />
      <RenderCard designListData={designListData} />
    </div>
  );
};

export default RendersPage;
