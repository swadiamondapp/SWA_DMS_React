import React, { useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import CentralhubScanModule from '../CentralhubScanModule/CentralhubScanModule'
import Header from "../../../Componets/Header/Header";


const CentralHubScan = () => {

    const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className='Parent_RendersCard'>
    <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
    <Header sidebarExpanded={sidebarExpanded}/>
    <CentralhubScanModule   sidebarExpanded={sidebarExpanded}/>
  </div>
  )
}

export default CentralHubScan
