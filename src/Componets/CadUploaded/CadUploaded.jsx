import React, { useState, } from "react";
import "./CadUploaded.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import CADuploadedFiles from "./CADuploadedFiles";

const CadUploaded = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designListData, setDesignListData] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [SearchWithName, setSearchWithName] = useState("");



  return (
    <div className="CadUploaded">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header
        sidebarExpanded={sidebarExpanded}
        setSearchWithName={setSearchWithName}
      />
      <CADuploadedFiles sidebarExpanded={sidebarExpanded} SearchWithName={SearchWithName} />
    </div>
  );
};

export default CadUploaded;
