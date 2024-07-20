import React ,{useState}from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import AssignmentView from "../../Componets/Assignment Folder/AssignmentView";
import "./AssignmentViewPage.css";

const AssignmentViewPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="Parent_AssignmentPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header  sidebarExpanded={sidebarExpanded}/>
      <AssignmentView  sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default AssignmentViewPage;
