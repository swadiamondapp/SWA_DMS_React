import React,{useState} from "react";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import Header from "../../../Componets/Header/Header";
import Gallery from "../../../Componets/VOTORS PANEL/Gallery/Gallery";
const GalleryPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className="ParentVotorPage">
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} />
      <Gallery sidebarExpanded={sidebarExpanded}/>
    </div>
  );
};

export default GalleryPage;
