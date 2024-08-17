import React ,{useState}from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import FinishedProducts from "../../../Componets/CAD/Finished Products/FinishedProducts";

const FinishedProductsPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="ParentVotorPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded} />
      <FinishedProducts sidebarExpanded={sidebarExpanded}  />
    </div>
  );
};

export default FinishedProductsPage;
