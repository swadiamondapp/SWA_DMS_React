import React, { useState } from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import AssignmentView from "../../Componets/Assignment Folder/AssignmentView";
import "./AssignmentViewPage.css";

const AssignmentViewPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [headerDetails,setHeaderDetials] = useState([])
  

  return (
    <div className="Parent_AssignmentPage">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <Header
        sidebarExpanded={sidebarExpanded}
        headerDetails={headerDetails}
      
      />
      <AssignmentView sidebarExpanded={sidebarExpanded} setHeaderDetials={setHeaderDetials} />
    </div>
  );
};

export default AssignmentViewPage;
