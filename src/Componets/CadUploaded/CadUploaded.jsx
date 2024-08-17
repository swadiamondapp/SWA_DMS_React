import React, { useState } from "react";
import "./CadUploaded.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import CADuploadedFiles from "./CADuploadedFiles";

const CadUploaded = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designListData, setDesignListData] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="CadUploaded">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header sidebarExpanded={sidebarExpanded} />
      <CADuploadedFiles sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default CadUploaded;
