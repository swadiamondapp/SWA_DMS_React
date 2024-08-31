import React ,{useContext, useState}from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import FinishedProducts from "../../../Componets/CAD/Finished Products/FinishedProducts";
import { cadLogut } from "../../../Componets/CAD/Api";
import { ContextTime } from "../TimerContext";

const FinishedProductsPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
   
  const {cadTime , setCadTime} = useContext(ContextTime)

  const handleCADLogout =()=>{
    cadLogut(cadTime)
  }

  return (
    <div className="ParentVotorPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded} handleCADLogout={handleCADLogout}/>
      <FinishedProducts sidebarExpanded={sidebarExpanded}  />
    </div>
  );
};

export default FinishedProductsPage;
