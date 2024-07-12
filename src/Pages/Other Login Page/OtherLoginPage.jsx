import React,{useState} from "react";
import "./OtherLoginPage.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import OtherLogin from "../../Componets/Other Login/OtherLogin";

const OtherLoginPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="Parent_OtherLoginPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} />
      <OtherLogin sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default OtherLoginPage;
