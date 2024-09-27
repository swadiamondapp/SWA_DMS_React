import React, { useState } from 'react'
import Sidebar from '../../../Componets/Sidebar/Sidebar'
import Header from '../../../Componets/Header/Header'
import PreviewTab from './PreviewTab';
import { useLocation } from 'react-router-dom';

const CentralHubSlotPreview = () => {
    const location = useLocation()
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const { soltData } =  location.state || {};
    console.log(soltData,"soltData--")

  return (
    <div className="centralhubDashboard">
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header  sidebarExpanded={sidebarExpanded}  soltData={soltData}/>
      
      <PreviewTab  sidebarExpanded={sidebarExpanded}  soltData={soltData}/>
    </div>
  )
}

export default CentralHubSlotPreview
