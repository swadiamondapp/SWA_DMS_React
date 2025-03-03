import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import RendersUploadedFile from "./RendersUploadedFile";
import { rendersAllFinishedProjectList } from "../../Pages/Renders/Apis";

const RendersUploaded = () => {
  const [SearchWithName, setSearchWithName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [finishedProjectData, setFinishedProjectData] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    rendersAllFinishedProjectList(setFinishedProjectData,SearchWithName);
  }, [SearchWithName]);

  console.log("finished",finishedProjectData)
   
  return (
    <div className="CadUploaded">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header sidebarExpanded={sidebarExpanded} setSearchWithName={setSearchWithName}/>
      <RendersUploadedFile
        finishedProjectData={finishedProjectData}
        setFinishedProjectData={setFinishedProjectData}
        sidebarExpanded={sidebarExpanded}
      />
    </div>
  );
};

export default RendersUploaded;
