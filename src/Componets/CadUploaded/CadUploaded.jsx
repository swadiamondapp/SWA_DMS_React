import React, { useEffect, useState } from "react";
import "./CadUploaded.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import CADuploadedFiles from "./CADuploadedFiles";
import { useSearchParams } from "react-router-dom";

const CadUploaded = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designListData, setDesignListData] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true); 
  const [SearchWithName, setSearchWithName] = useState("");

  const [currentLevel, setCurrentLevel] = useState("cad_names");
  const [selectedCadName, setSelectedCadName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to manage URL parameters

  useEffect(() => {
    const cadName = searchParams.get("cad_name");
    const category = searchParams.get("category");

    if (cadName) {
      setSelectedCadName(cadName);
      setCurrentLevel("categories");
    }
    if (category) {
      setSelectedCategory(category);
      setCurrentLevel("items");
    }
  }, [searchParams]);

  // Update URL parameters when state changes
  useEffect(() => {
    const params = {};
    if (selectedCadName) params.cad_name = selectedCadName;
    if (selectedCategory) params.category = selectedCategory;
    setSearchParams(params, { replace: false }); // Add new entry to history stack
  }, [selectedCadName, selectedCategory, setSearchParams]);
  
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
      <CADuploadedFiles
        sidebarExpanded={sidebarExpanded}
        SearchWithName={SearchWithName}
        setSelectedCadName={setSelectedCadName}
        setSelectedCategory={setSelectedCategory}
        selectedCadName={selectedCadName}
        selectedCategory={selectedCategory}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />
    </div>
  );
};

export default CadUploaded;
