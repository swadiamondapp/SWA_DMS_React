import React, { useState, useEffect } from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import RenderCard from "../../../Componets/RenderCard/RenderCard";
import { cadDesignList } from "../Apis";
import AnnotationCanvas from "../../../Componets/AnnotationCanvas/AnnotationCanvas";

const RendersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designListData, setDesignListData] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);



  useEffect(() => {
    cadDesignList(setIsLoading, setDesignListData);
  }, []);
  return (
    <div className="Parent_RendersCard">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header  sidebarExpanded={sidebarExpanded} />
      <RenderCard designListData={designListData}  sidebarExpanded={sidebarExpanded} />
      <AnnotationCanvas />
    </div>
  );
};

export default RendersPage;
