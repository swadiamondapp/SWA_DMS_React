import React, { useState } from 'react'
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import RendersUploadedFile from './RendersUploadedFile';


const RendersUploaded = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [designListData, setDesignListDatal] = useState([]);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  return (
    <div className="CadUploaded">
    <Sidebar
      sidebarExpanded={sidebarExpanded}
      setSidebarExpanded={setSidebarExpanded}
    />
    <Header sidebarExpanded={sidebarExpanded} />
    <RendersUploadedFile sidebarExpanded={sidebarExpanded} />
  </div>
  )
}

export default RendersUploaded
