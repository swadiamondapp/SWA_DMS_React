import React,{useState}from "react";
import "./WorkDone.css";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import WorkDoneTable from "../WorkDoneTable/WorkDoneTable";

const WorkDone = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="WorkDone">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded}/>
      <WorkDoneTable sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default WorkDone;
