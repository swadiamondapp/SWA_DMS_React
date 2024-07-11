import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import RenderCard from "../../../Componets/RenderCard/RenderCard";
import { cadDesignList } from "../Apis";
import AnnotationCanvas from "../../../Componets/AnnotationCanvas/AnnotationCanvas";
import RendersHome from "../../../Componets/Renders/RendersHome/RendersHome";

const RendersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designListData, setDesignListData] = useState([]);

  useEffect(() => {
    cadDesignList(setIsLoading, setDesignListData);
  }, []);


  return (
    <div className="Parent_RendersCard">
      <Sidebar />
      <Header/>
      {/* <RenderCard designListData={designListData} /> */}
      {/* <AnnotationCanvas /> */}
      <RendersHome designListData={designListData}/>
    </div>
  );
};

export default RendersPage;
