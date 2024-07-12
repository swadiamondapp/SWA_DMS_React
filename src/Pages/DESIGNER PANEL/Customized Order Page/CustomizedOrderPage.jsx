import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CustomizedOrder from "../../../Componets/DESIGNER PANEL/Customized Order/CustomizedOrder";

const CustomizedOrderPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="DesignerDashboardPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} />
      <CustomizedOrder sidebarExpanded={sidebarExpanded} />
    </div>
  );
};

export default CustomizedOrderPage;
