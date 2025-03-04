import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import CustomizedOrder from "../../../Componets/DESIGNER PANEL/Customized Order/CustomizedOrder";

const CustomizedOrderPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [SearchWithName, setSearchWithName] = useState("");
  
  return (
    <div className="DesignerDashboardPage">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} setSearchWithName={setSearchWithName}/>
      <CustomizedOrder sidebarExpanded={sidebarExpanded} SearchWithName={SearchWithName} />
    </div>
  );
};

export default CustomizedOrderPage;
