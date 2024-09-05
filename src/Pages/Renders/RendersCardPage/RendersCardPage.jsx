import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import RenderCard from "../../../Componets/RenderCard/RenderCard";
import { cadDesignList, cadDesignListApproved } from "../Apis";
import AnnotationCanvas from "../../../Componets/AnnotationCanvas/AnnotationCanvas";
import RendersHome from "../../../Componets/Renders/RendersHome/RendersHome";

const RendersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designListData, setDesignListData] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);


  useEffect(() => {
    cadDesignListApproved(setIsLoading,setDesignListData);
  }, []);

  return (
    <div className="Parent_RendersCard">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header sidebarExpanded={sidebarExpanded} />
      {/* <RenderCard designListData={designListData} /> */}
      {/* <AnnotationCanvas /> */}
      <RendersHome
        designListData={designListData}
        sidebarExpanded={sidebarExpanded}
        setDesignListData={setDesignListData}
      />
    </div>
  );
};

export default RendersPage;
