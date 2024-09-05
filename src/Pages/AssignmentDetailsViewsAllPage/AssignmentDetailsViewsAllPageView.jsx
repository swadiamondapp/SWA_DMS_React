import React,{useState} from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import AssignmentPanel from "../../Componets/Assignment Panel/AssignmentPanel";
import "./AssignmentDetailsViewsAllPageView.css";
import AssignmentDetailsViewsAll from "../../Componets/AssignmentDetailsViewsAll/AssignmentDetailsViewsAll";

const AssignmentDetailsViewsAllPageView = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="Parent_AssignmentpanalPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded}  />
      <AssignmentDetailsViewsAll sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default AssignmentDetailsViewsAllPageView;
