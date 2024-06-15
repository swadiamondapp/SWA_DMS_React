import React, { useState, useEffect } from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import RenderCard from "../../../Componets/RenderCard/RenderCard";
import { cadDesignList } from "../Apis";
import PinturaEditorPquina from "../../../Componets/Pintura Editor Pquina/PinturaEditorPquina";

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
      {/* <PinturaEditorPquina /> */}
      <RenderCard designListData={designListData} />
    </div>
  );
};

export default RendersPage;
